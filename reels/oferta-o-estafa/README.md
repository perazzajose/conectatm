# Reel "¿Oferta o estafa?" (estilo Canva)

Video vertical de 24 s sobre cómo reconocer una oferta de trabajo falsa. Hecho el 15/11/2026. No nombra la Expo: sirve toda la temporada. Mismo estilo que `reels/errores-cv-canva` (ver `reels/CLAUDE.md`).

- `compositions/chat.html` (0–15,6 s): un mensaje de WhatsApp **inventado** (lleva la etiqueta "EJEMPLO · MENSAJE INVENTADO" y el número `+598 9X XXX XXX`). Cada 2,2 s se marca una señal en el mensaje y se llena un punto rojo: sueldo demasiado alto, te piden pagar, te piden la cédula, te apuran, ni empresa ni dirección. A los 13,2 s el mensaje se apaga y cae el sello "ESTAFA · 5 DE 5 SEÑALES".
- `compositions/portales.html` (15,6–20 s): "Buscá en portales conocidos" con la **captura real** de la sección de ofertas de /laboral con Rocha elegido (`assets/ofertas-rocha.png`, viewport 400 px a 2,7x, sitio local sin datos de Supabase, por eso muestra los enlaces a LinkedIn, BuscoJobs, Computrabajo y Google Empleos). Un toque en Rocha y cada portal se marca en verde.
- `compositions/final.html` (20–24 s): cintas "NUNCA PAGUES PARA TRABAJAR" y "REVISIÓN GRATIS", "¿Dudás de una oferta? Mandámela y la revisamos gratis", WhatsApp y conectatumundo.net/laboral.
- `texto-publicacion.txt`: descripción para Instagram y Facebook.
- `assets/musica/tema-estafa.mp3`: **música incluida** (José la pidió el 15/11), un tema propio generado por código (`generar.py`, sin derechos de terceros). Un compás dura 2,2 s, igual que cada señal: La menor con tensión durante las señales, corte de la base en el sello y Do mayor desde "Buscá en portales conocidos". Va a volumen 0,3 debajo de los efectos.

Recursos con motivo: el chat de WhatsApp (las estafas llegan por ahí), el resaltador sobre cada frase sospechosa y el sello que cae cuando se juntan las cinco señales.

MP4: `npx --yes hyperframes@0.9.23 render --output renders/oferta-o-estafa-raw.mp4` y después normalizar a −16 LUFS:
`ffmpeg -i renders/oferta-o-estafa-raw.mp4 -c:v copy -af "loudnorm=I=-16:TP=-1.5:LRA=11" -c:a aac -b:a 192k renders/oferta-o-estafa.mp4`
