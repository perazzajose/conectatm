# Reel "Primer trabajo: qué poner en el CV" (estilo Canva)

Video vertical de 26,3 s para la temporada. No nombra la Expo. Mismo estilo que `reels/errores-cv-canva` (ver `reels/CLAUDE.md`).

- `compositions/cv.html`: todo menos el cierre.
  - **Gancho:** "¿Nunca trabajaste?", con el CV de Sofía Rodríguez (datos ficticios; hoja A4 de 800 x 1131 con contacto, títulos con raya y referencias, como un CV impreso) y la experiencia vacía con un "?".
  - **"5 cosas para poner en vez de experiencia":** se tacha "Experiencia", el "?" sube a la insignia y aparecen los 5 renglones.
  - **Una sección cada 3 s:** perfil, estudios y cursos, proyectos, actividades y voluntariado, habilidades. Cada una trae su consejo y una tarjeta que sale de abajo del consejo, baja a su renglón y después pierde el fondo y queda como texto del CV.
  - **Cierre de la escena:** el "?" pasa a ✓ con "Listo para la temporada".
  - Los tiempos están en `T`, `A` y `F`; los renglones, en `SLOT`.
- `compositions/final.html` y `sello-final.html`: cartel "Te ayudo con tu primer CV gratis", WhatsApp y sello "100 % GRATIS · TU CV".
- `texto-publicacion.txt`: descripción para Instagram y Facebook.

Vista previa: `npm run dev`. MP4: `npx.cmd --yes hyperframes@0.9.23 render --output renders/primer-empleo.mp4`.

## Versión con música (estados de WhatsApp)

Usa `reachingup.mp3` de `C:\Users\P.C\Music`, que va creciendo y llega al pico en el CV completo. Se toma desde el inicio y se mezcla a un cuarto de volumen. Desde `renders/`:

```
ffmpeg -y -i primer-empleo.mp4 -t 26.3 -i "%USERPROFILE%\Music\reachingup.mp3" -filter_complex "[1:a]aresample=48000,volume=0.25,afade=t=in:st=0:d=0.3,afade=t=out:st=24.5:d=1.8[m];[0:a][m]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=11[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -movflags +faststart primer-empleo-whatsapp.mp4
```
