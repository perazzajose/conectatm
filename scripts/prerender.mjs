// Después de `vite build`: arma un HTML por ruta con el contenido ya renderizado y su propio
// título, descripción, canónica, etiquetas para compartir y datos estructurados.
// Así buscadores, IAs y las vistas previas de WhatsApp o Facebook ven cada página tal cual,
// sin tener que ejecutar JavaScript. Las rutas salen de src/data/seo.js, y con ellas se arma sitemap.xml.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { createServer } from 'vite';
import react from '@vitejs/plugin-react';

process.env.NODE_ENV = 'production';
const DIST = 'dist';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const jsonLd = datos => `<script type="application/ld+json">${JSON.stringify(datos).replace(/</g, '\\u003c')}</script>`;

// Vite solo para cargar el código de React en Node (sin el plugin de Cloudflare)
const vite = await createServer({
  configFile: false,
  plugins: [react()],
  appType: 'custom',
  mode: 'production',
  logLevel: 'error',
  server: { middlewareMode: true, hmr: false, ws: false },
});

try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');
  const seo = await vite.ssrLoadModule('/src/data/seo.js');
  const { SITIO, PAGINAS, NO_ENCONTRADA, DATOS_NEGOCIO, DATOS_SITIO, datosMiga, urlAbsoluta } = seo;
  const plantilla = await readFile(join(DIST, 'index.html'), 'utf8');
  if (!plantilla.includes('<div id="root"></div>')) throw new Error('dist/index.html ya está pre-renderizado: corré `npm run build` (vite build regenera la plantilla).');

  const cabecera = (ruta, p) => {
    const url = urlAbsoluta(ruta);
    const imagen = SITIO.url + SITIO.imagen;
    const datos = [...(ruta === '/' ? [DATOS_NEGOCIO, DATOS_SITIO] : [datosMiga(ruta)]), p.esquema].filter(Boolean);
    return [
      `<title>${esc(p.titulo)}</title>`,
      `<meta name="description" content="${esc(p.descripcion)}">`,
      `<meta name="robots" content="${p.noindex ? 'noindex, follow' : 'index, follow'}">`,
      p.noindex && ruta === '/404' ? '' : `<link rel="canonical" href="${url}">`,
      `<meta property="og:type" content="website">`,
      `<meta property="og:site_name" content="${SITIO.nombre}">`,
      `<meta property="og:locale" content="${SITIO.idioma}">`,
      `<meta property="og:title" content="${esc(p.titulo)}">`,
      `<meta property="og:description" content="${esc(p.descripcion)}">`,
      `<meta property="og:url" content="${url}">`,
      `<meta property="og:image" content="${imagen}">`,
      `<meta property="og:image:width" content="1200">`,
      `<meta property="og:image:height" content="630">`,
      `<meta property="og:image:alt" content="Plaza de Durazno con el logo de ConectaTuMundo">`,
      `<meta name="twitter:card" content="summary_large_image">`,
      ...datos.map(jsonLd),
    ].filter(Boolean).join('\n    ');
  };

  const rutas = [...Object.keys(PAGINAS).map(r => [r, PAGINAS[r]]), ['/404', NO_ENCONTRADA]];
  for (const [ruta, p] of rutas) {
    const cuerpo = await render(ruta);
    const html = plantilla
      .replace(/<title>[\s\S]*?<\/title>\s*/, '')
      .replace(/<meta name="description"[^>]*>\s*/, '')
      .replace('</head>', `  ${cabecera(ruta, p)}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${cuerpo}</div>`);

    // /laboral -> dist/laboral.html: Cloudflare la sirve en /laboral, sin redirigir a /laboral/
    const archivo = ruta === '/' ? 'index.html' : `${ruta.slice(1)}.html`;
    await mkdir(dirname(join(DIST, archivo)), { recursive: true });
    await writeFile(join(DIST, archivo), html);
    console.log(`  ${ruta.padEnd(28)} ${archivo} (${Math.round(html.length / 1024)} KB)`);
  }

  // Sitemap con las páginas indexables; la fecha es la del build
  const hoy = new Date().toISOString().slice(0, 10);
  const urls = Object.entries(PAGINAS).filter(([, p]) => !p.noindex)
    .map(([ruta]) => `  <url><loc>${urlAbsoluta(ruta)}</loc><lastmod>${hoy}</lastmod></url>`);
  await writeFile(join(DIST, 'sitemap.xml'), [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n'));
  console.log(`  sitemap.xml con ${urls.length} páginas`);
} finally {
  await vite.close();
}
