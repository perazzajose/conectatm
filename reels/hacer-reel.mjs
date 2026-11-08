#!/usr/bin/env node
// Generador de reels de ConectaTuMundo.
// Lee un guion (JSON), graba la web en vertical como si fuera un celular, agrega
// subtítulos y placas de portada y cierre, y entrega un MP4 1080x1920 listo para
// Instagram, Facebook o TikTok.
//
// Uso:  npm run reel -- reels/guiones/pos-turistas.json
//       npm run reel -- reels/guiones/pos-turistas.json --web http://localhost:5173
//
// Requiere ffmpeg instalado (en Windows: winget install Gyan.FFmpeg) y el Chromium
// de Playwright (npx playwright install chromium).

import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

// Por defecto usa el Playwright del proyecto. REEL_PLAYWRIGHT permite apuntar a otra instalación.
const { chromium } = await import(process.env.REEL_PLAYWRIGHT || '@playwright/test')

const ANCHO = 432 // ancho del "celular" en px CSS
const ALTO = 768 // 432x768 con densidad 2.5 = 1080x1920
const DENSIDAD = 2.5

// ---------- Argumentos y guion ----------
const args = process.argv.slice(2)
const archivoGuion = args.find((a) => !a.startsWith('--') && a.endsWith('.json'))
if (!archivoGuion) {
  console.error('Uso: npm run reel -- <guion.json> [--web https://conectatumundo.net] [--salida carpeta]')
  process.exit(1)
}
const opcion = (nombre) => {
  const i = args.indexOf(`--${nombre}`)
  return i >= 0 ? args[i + 1] : undefined
}

const guion = JSON.parse(fs.readFileSync(archivoGuion, 'utf8'))
const web = (opcion('web') || guion.web || 'https://conectatumundo.net').replace(/\/$/, '')
const nombre = guion.nombre || path.basename(archivoGuion, '.json')
const carpetaSalida = path.resolve(opcion('salida') || 'reels/salida')
const carpetaTemp = path.join(carpetaSalida, `.tmp-${nombre}`)
fs.rmSync(carpetaTemp, { recursive: true, force: true })
fs.mkdirSync(carpetaTemp, { recursive: true })

const estilo = {
  fondo: '#0B1D3E',
  acento: '#0CCDD9',
  texto: '#FFFFFF',
  fuente: 'Arial',
  subtitulos: 'arriba', // arriba | medio | abajo
  ...guion.estilo,
}
// Alineación ASS (8 = arriba al centro, 2 = abajo al centro) y distancia al borde, en px del video
const posicionSub = { arriba: [8, 190], medio: [8, 860], abajo: [2, 260] }[estilo.subtitulos] || [8, 190]

// ---------- Placas (portada, cierre o texto suelto) ----------
const escapar = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const htmlPlaca = ({ texto = '', subtexto = '', pie = '' }) => `<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  html,body{margin:0;height:100%;background:${estilo.fondo};color:${estilo.texto};font-family:'IBM Plex Sans',system-ui,Arial,sans-serif}
  .placa{height:100%;display:flex;flex-direction:column;justify-content:center;padding:0 34px;box-sizing:border-box;gap:18px}
  .barra{width:56px;height:6px;background:${estilo.acento};animation:entra .5s ease-out both}
  h1{font-size:40px;line-height:1.08;margin:0;font-weight:800;letter-spacing:-.01em;animation:sube .6s .1s ease-out both}
  p{font-size:21px;line-height:1.35;margin:0;opacity:.85;animation:sube .6s .35s ease-out both}
  .pie{position:absolute;bottom:56px;left:34px;right:34px;font-size:21px;font-weight:700;color:${estilo.acento};animation:sube .6s .6s ease-out both}
  @keyframes sube{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
  @keyframes entra{from{width:0}to{width:56px}}
</style></head><body><div class="placa"><div class="barra"></div>
<h1>${escapar(texto)}</h1>${subtexto ? `<p>${escapar(subtexto)}</p>` : ''}</div>
${pie ? `<div class="pie">${escapar(pie)}</div>` : ''}</body></html>`

// ---------- Ayudas para animar la página ----------
// Círculo donde "toca" el dedo, para que se entienda el click en el video
const marcarToque = (page, x, y) =>
  page.evaluate(
    ([x, y]) => {
      const d = document.createElement('div')
      d.style.cssText = `position:fixed;left:${x - 22}px;top:${y - 22}px;width:44px;height:44px;border-radius:50%;
        background:rgba(12,205,217,.35);border:3px solid #0CCDD9;z-index:2147483647;pointer-events:none;
        transition:transform .45s ease-out,opacity .45s ease-out`
      document.body.appendChild(d)
      requestAnimationFrame(() => requestAnimationFrame(() => {
        d.style.transform = 'scale(1.6)'
        d.style.opacity = '0'
      }))
      setTimeout(() => d.remove(), 700)
    },
    [x, y]
  )

const desplazarSuave = async (page, pixeles, segundos = 1.2) => {
  const pasos = Math.max(1, Math.round(segundos * 30))
  for (let i = 0; i < pasos; i++) {
    // curva suave: arranca y frena despacio
    const a = 0.5 - Math.cos((Math.PI * i) / pasos) / 2
    const b = 0.5 - Math.cos((Math.PI * (i + 1)) / pasos) / 2
    await page.evaluate((dy) => window.scrollBy(0, dy), pixeles * (b - a))
    await page.waitForTimeout(1000 / 30)
  }
}

const localizar = (page, paso) => {
  if (paso.selector) return page.locator(paso.selector).first()
  if (paso.texto) return page.getByText(paso.texto, { exact: false }).first()
  throw new Error(`El paso "${paso.accion}" necesita "selector" o "texto"`)
}

// ---------- Grabador ----------
// Captura los cuadros directo de Chromium en alta resolución. Mientras carga una
// página se pausa, así el video no muestra pantallas en blanco.
class Grabador {
  constructor(page) {
    this.page = page
    this.cuadros = [] // { archivo, t } con t en segundos de video
    this.pausado = true
    this.desfase = 0 // segundos de pausa acumulados
    this.inicio = null
    this.pausaDesde = null
    this.n = 0
  }
  reloj() {
    return Date.now() / 1000 - this.inicio - this.desfase
  }
  async conectar() {
    this.cdp = await this.page.context().newCDPSession(this.page)
    this.cdp.on('Page.screencastFrame', async ({ data, metadata, sessionId }) => {
      this.cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {})
      if (this.pausado || this.inicio === null) return
      const t = metadata.timestamp - this.inicio - this.desfase
      if (t < (this.cuadros.at(-1)?.t ?? 0)) return // cuadro viejo que llegó tarde
      const archivo = path.join(carpetaTemp, `c${String(++this.n).padStart(5, '0')}.jpg`)
      fs.writeFileSync(archivo, Buffer.from(data, 'base64'))
      this.cuadros.push({ archivo, t })
    })
    await this.cdp.send('Page.startScreencast', {
      format: 'jpeg',
      quality: 92,
      maxWidth: ANCHO * DENSIDAD,
      maxHeight: ALTO * DENSIDAD,
    })
  }
  pausar() {
    if (this.pausado) return
    this.pausado = true
    this.pausaDesde = Date.now() / 1000
  }
  async reanudar() {
    // Reinicia la captura: al cambiar de página Chromium puede cortarla
    await this.cdp.send('Page.stopScreencast').catch(() => {})
    await this.cdp.send('Page.startScreencast', {
      format: 'jpeg',
      quality: 92,
      maxWidth: ANCHO * DENSIDAD,
      maxHeight: ALTO * DENSIDAD,
    })
    const ahora = Date.now() / 1000
    if (this.inicio === null) this.inicio = ahora
    else if (this.pausaDesde !== null) this.desfase += ahora - this.pausaDesde
    this.pausaDesde = null
    this.pausado = false
    // fuerza un cuadro inicial aunque la página esté quieta
    await this.page.evaluate(() => document.body && (document.body.style.outline = '0 solid transparent'))
  }
  async terminar() {
    const fin = this.reloj()
    this.pausar()
    await this.cdp.send('Page.stopScreencast').catch(() => {})
    return fin
  }
}

// ---------- Grabación ----------
const navegador = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
)
const contexto = await navegador.newContext({
  viewport: { width: ANCHO, height: ALTO },
  deviceScaleFactor: DENSIDAD,
  isMobile: true,
  hasTouch: true,
  locale: 'es-UY',
})
const page = await contexto.newPage()
const grabador = new Grabador(page)
await grabador.conectar()
const subtitulos = [] // { desde, hasta, texto }

const conSubtitulo = async (texto, accion) => {
  const desde = grabador.reloj()
  await accion()
  if (texto) subtitulos.push({ desde, hasta: grabador.reloj(), texto })
}

for (const [n, escena] of guion.escenas.entries()) {
  console.log(`Escena ${n + 1}/${guion.escenas.length}: ${escena.tipo}${escena.ruta ? ' ' + escena.ruta : ''}`)
  grabador.pausar()

  if (['placa', 'portada', 'cierre'].includes(escena.tipo)) {
    await page.setContent(htmlPlaca(escena))
    await grabador.reanudar()
    await conSubtitulo(escena.subtitulo, () => page.waitForTimeout((escena.segundos ?? 3) * 1000))
    continue
  }

  if (escena.tipo === 'pagina') {
    await page.goto(web + escena.ruta, { waitUntil: 'networkidle' })
    await page.addStyleTag({ content: '::-webkit-scrollbar{display:none} html{scroll-behavior:auto!important}' })
    await page.waitForTimeout(300)
    await grabador.reanudar()

    for (const paso of escena.pasos ?? [{ accion: 'esperar', segundos: 2 }]) {
      await conSubtitulo(paso.subtitulo, async () => {
        switch (paso.accion) {
          case 'esperar':
            await page.waitForTimeout((paso.segundos ?? 1.5) * 1000)
            break
          case 'bajar':
            await desplazarSuave(page, paso.pixeles ?? 500, paso.segundos ?? 1.2)
            await page.waitForTimeout((paso.pausa ?? 0.6) * 1000)
            break
          case 'ir-a': {
            const caja = await localizar(page, paso).boundingBox()
            await desplazarSuave(page, caja ? caja.y - (paso.margen ?? 90) : 0, paso.segundos ?? 1.2)
            await page.waitForTimeout((paso.pausa ?? 0.6) * 1000)
            break
          }
          case 'tocar': {
            const el = localizar(page, paso)
            const caja0 = await el.boundingBox()
            // si no está a la vista, baja suave hasta el elemento
            if (caja0 && (caja0.y < 70 || caja0.y + caja0.height > ALTO - 90)) {
              await desplazarSuave(page, caja0.y - ALTO * 0.4, 0.8)
            }
            const caja = await el.boundingBox()
            if (caja) await marcarToque(page, caja.x + caja.width / 2, caja.y + caja.height / 2)
            await page.waitForTimeout(250)
            await el.click()
            await page.waitForTimeout((paso.pausa ?? 0.9) * 1000)
            break
          }
          case 'escribir': {
            const el = localizar(page, paso)
            await el.scrollIntoViewIfNeeded()
            await el.click()
            await el.pressSequentially(paso.valor ?? '', { delay: paso.velocidad ?? 70 })
            await page.waitForTimeout((paso.pausa ?? 0.6) * 1000)
            break
          }
          default:
            throw new Error(`Acción desconocida: ${paso.accion}`)
        }
      })
    }
    continue
  }
  throw new Error(`Tipo de escena desconocido: ${escena.tipo}`)
}

const duracion = await grabador.terminar()
await contexto.close()
await navegador.close()
if (grabador.cuadros.length === 0) throw new Error('No se capturó ningún cuadro')
console.log(`Capturados ${grabador.cuadros.length} cuadros, ${duracion.toFixed(1)} s`)

// ---------- Lista de cuadros para ffmpeg (cada cuadro dura hasta el siguiente) ----------
const cuadros = grabador.cuadros
cuadros[0].t = 0
const lista = cuadros
  .map((c, i) => {
    const hasta = i + 1 < cuadros.length ? cuadros[i + 1].t : duracion
    return `file '${c.archivo.split(path.sep).join('/')}'\nduration ${Math.max(0.001, hasta - c.t).toFixed(3)}`
  })
  .join('\n')
const archivoLista = path.join(carpetaTemp, 'cuadros.txt')
fs.writeFileSync(archivoLista, `${lista}\nfile '${cuadros.at(-1).archivo.split(path.sep).join('/')}'\n`)

// ---------- Subtítulos (ASS) ----------
const tiempoAss = (s) => {
  s = Math.max(0, s)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const seg = (s % 60).toFixed(2).padStart(5, '0')
  return `${h}:${String(m).padStart(2, '0')}:${seg}`
}
const colorAss = (hex, alfa = '00') => `&H${alfa}${hex.slice(5, 7)}${hex.slice(3, 5)}${hex.slice(1, 3)}`.toUpperCase()
const ass = `[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Sub,${estilo.fuente},70,${colorAss('#FFFFFF')},${colorAss('#FFFFFF')},${colorAss(estilo.fondo, '00')},${colorAss(estilo.fondo, '00')},-1,0,0,0,100,100,0,0,3,22,0,${posicionSub[0]},60,60,${posicionSub[1]},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
${subtitulos
  .map((s) => `Dialogue: 0,${tiempoAss(s.desde)},${tiempoAss(s.hasta)},Sub,,0,0,0,,${s.texto.replace(/\n/g, '\\N')}`)
  .join('\n')}
`
const archivoAss = path.join(carpetaTemp, 'subtitulos.ass')
fs.writeFileSync(archivoAss, ass)

// ---------- Armado final con ffmpeg ----------
fs.mkdirSync(carpetaSalida, { recursive: true })
const mp4 = path.join(carpetaSalida, `${nombre}.mp4`)
const musica = guion.musica ? path.resolve(path.dirname(archivoGuion), guion.musica) : null
// En el filtro de ffmpeg la ruta va relativa y con barras normales (evita problemas con "C:\" en Windows)
const assRelativo = path.relative(process.cwd(), archivoAss).split(path.sep).join('/')

const audio = musica
  ? ['-stream_loop', '-1', '-i', musica]
  : ['-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=44100']
const filtroAudio = musica
  ? ['-af', `volume=${guion.volumenMusica ?? 0.35},afade=t=out:st=${Math.max(0, duracion - 1.5).toFixed(2)}:d=1.5`]
  : []

execFileSync(
  'ffmpeg',
  [
    '-y', '-hide_banner', '-loglevel', 'error',
    '-f', 'concat', '-safe', '0', '-i', archivoLista,
    ...audio,
    '-vf', `scale=1080:1920:flags=lanczos,fps=30,ass=${assRelativo}`,
    '-map', '0:v', '-map', '1:a',
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '128k', ...filtroAudio,
    '-t', duracion.toFixed(2), '-movflags', '+faststart',
    mp4,
  ],
  { stdio: 'inherit' }
)
fs.rmSync(carpetaTemp, { recursive: true, force: true })
console.log(`\nListo: ${mp4}`)
