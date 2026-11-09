# Reel "5 errores del CV", estilo de los diseños de Canva

Video vertical de 25,6 s. Arranca directo con "¿Tu CV tiene estos errores?" y la lupa ya sobre el CV (cuadro 0 = gancho), sigue la revisión con lupa de `reels/errores-cv` con el CV más grande (escala `S` en `compositions/revisar.html`) y cierra con el cartel "Te ayudo con tu CV gratis para la Expo Empleo Binacional del 19/11" (cintas en movimiento, WhatsApp y sello). `compositions/intro.html` y `sello-intro.html` (el cartel al inicio) quedan sin usar en `index.html`. Usa el estilo de los reels que José hizo en Canva: fondo morado #5C3D8A, títulos en mayúscula (Oswald), etiquetas en píldora azul noche #171D58, cintas lila #C4A8E8 con "GRATIS", puntos decorativos, @conectatumundo y botón verde de WhatsApp en el cierre.

Vista previa: `npm run dev`. MP4: `npm run render`.

## Versión con música (estados de WhatsApp)

`renders/errores-cv-canva-whatsapp.mp4` = el render normal + el tema "Upbeat" de atlasaudio (Pixabay, en `C:\Users\P.C\Music\atlasaudio-upbeat-613343.mp3`; no se sube al repo) desde el segundo 15, a mitad de volumen, con entrada de 0,3 s y salida de 1,8 s, normalizado a −14 LUFS. Desde `renders/`:

```
ffmpeg -y -i errores-cv-canva.mp4 -ss 15 -t 25.6 -i "%USERPROFILE%\Music\atlasaudio-upbeat-613343.mp3" -filter_complex "[1:a]aresample=48000,volume=0.5,afade=t=in:st=0:d=0.3,afade=t=out:st=23.8:d=1.8[m];[0:a][m]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -movflags +faststart errores-cv-canva-whatsapp.mp4
```
