# Reel "Listo en pocos días" (HyperFrames, marca azul)

Video vertical de 21 s para la página de Facebook. Promociona los tres trabajos cortos de /desarrollo: Google Maps, página de una pantalla y reservas o pedidos por WhatsApp. Hecho el 14/11/2026.

- `compositions/servicios.html`: gancho ("¿Tu comercio aparece cuando lo buscan?", con un mapa genérico de ejemplo), las tres tarjetas reales del sitio (una cada 3 s), el toque en "Pedir presupuesto" y el mensaje que arma ese botón.
- `compositions/end.html`: cierre con WhatsApp, link y logo.
- `assets/card1-3.png`: capturas reales de la sección "Listo en pocos días" (rama `mejoras-servicios`, viewport 400 px a 2,7x). Si cambian los textos de `src/data/rapidos.js`, volver a capturar.
- `assets/musica/tema-ctm.mp3`: **música incluida**, un tema propio generado por código (`generar.py`, 100 bpm, sin derechos de terceros). Va a volumen 0,3 debajo de los efectos. Los cortes caen cada 0,6 s (un tiempo).

Recursos con motivo: el pin que cae en el mapa (lo que hace la ficha), las tarjetas que entran como en la lista del sitio y el mensaje que se escribe solo (lo que hace el botón).

MP4: `npx --yes hyperframes@0.9.23 render --output renders/servicios-rapidos-raw.mp4` y después normalizar a −16 LUFS:
`ffmpeg -i renders/servicios-rapidos-raw.mp4 -c:v copy -af "loudnorm=I=-16:TP=-1.5:LRA=11" -c:a aac -b:a 192k renders/servicios-rapidos.mp4`

Publicar después de que la sección esté en `main` (el reel muestra tarjetas de esa sección).
