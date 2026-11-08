# Generador de reels

Convierte un guion en un reel vertical (1080x1920, MP4) grabando la web como si fuera un celular. Le agrega subtítulos, una portada y un cierre. Sirve para Instagram, Facebook, TikTok y estados de WhatsApp.

## Instalar (una sola vez)

1. Instalar ffmpeg. En Windows: `winget install Gyan.FFmpeg` (cerrá y abrí la terminal después).
2. En la carpeta del proyecto: `npm install` y `npx playwright install chromium ffmpeg`.

## Hacer un reel

```bash
npm run reel -- reels/guiones/pos-turistas.json
```

El video queda en `reels/salida/pos-turistas.mp4`. Tarda menos de un minuto.

Por defecto graba la web publicada (conectatumundo.net). Para grabar una versión que todavía no subiste, levantá el sitio con `npm run dev` y agregá `--web http://localhost:5173`.

## Escribir un guion

Copiá un guion de `reels/guiones/` y cambiá los textos. Cada guion es una lista de escenas:

```json
{
  "nombre": "mi-reel",
  "escenas": [
    { "tipo": "portada", "texto": "Título grande", "subtexto": "Una línea más", "segundos": 3 },
    {
      "tipo": "pagina",
      "ruta": "/negocios/pos",
      "pasos": [
        { "accion": "esperar", "segundos": 1.5, "subtitulo": "Texto que aparece arriba" },
        { "accion": "tocar", "texto": "Local con mostrador", "subtitulo": "Elegí tu negocio" },
        { "accion": "escribir", "selector": "#paso-nombre", "valor": "Lucía Pereira" },
        { "accion": "bajar", "pixeles": 400, "segundos": 1.4 },
        { "accion": "ir-a", "texto": "Preguntas frecuentes" }
      ]
    },
    { "tipo": "cierre", "texto": "Llamado a la acción", "pie": "conectatumundo.net/pos", "segundos": 3 }
  ]
}
```

| Acción | Qué hace | Datos |
|---|---|---|
| `esperar` | Se queda quieto | `segundos` |
| `tocar` | Toca un botón u opción y muestra el toque | `texto` (lo que se lee en pantalla) o `selector` |
| `escribir` | Escribe en un campo letra por letra | `selector` o `texto`, `valor` |
| `bajar` | Baja la página suavemente | `pixeles`, `segundos` |
| `ir-a` | Baja hasta un elemento | `texto` o `selector` |

Todas aceptan `subtitulo` y `pausa` (segundos de espera al terminar).

## Opciones del guion

- `"musica": "musica/tema.mp3"`: agrega música de fondo (ruta relativa al guion). `"volumenMusica": 0.3` la baja.
- `"estilo": { "subtitulos": "abajo" }`: subtítulos `arriba` (por defecto), `medio` o `abajo`.
- `"estilo": { "fondo": "#0B1D3E", "acento": "#0CCDD9" }`: colores de portada, cierre y subtítulos.
- `"web": "https://otro-sitio.com"`: grabar otro sitio, por ejemplo la web de un cliente.

Usá música libre de derechos (la biblioteca de audio de YouTube o la de Instagram al publicar).
