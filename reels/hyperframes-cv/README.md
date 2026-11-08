# Reel del generador de CV (HyperFrames)

Video vertical de 19,8 s: gancho con el CV terminado, el generador funcionando en un celular, el CV final a pantalla completa y cierre con el link.

- `index.html`: arma las tres escenas y los efectos de sonido.
- `compositions/`: `hook.html` (gancho), `demo.html` (celular y resultado), `end.html` (cierre).
- `assets/`: grabación del generador, CV final, logo, efectos de sonido y GSAP (incluido para renderizar sin internet).

Para editar con vista previa: `npm run dev`. Para generar el MP4: `npm run render`.
El link del cierre se cambia desde la variable `url` o en `compositions/end.html`.
