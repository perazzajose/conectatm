# Reel cuaderno contra punto de venta (HyperFrames)

Video vertical de 21,5 s. Compara un cuaderno con un punto de venta genérico en cuatro situaciones (precio, stock, vencimientos y cierre de caja) y cierra con la página de negocios.

- `compositions/comparar.html`: las cinco escenas con la pantalla dividida. El POS es una pantalla de ejemplo sin marca.
- `compositions/end.html`: cierre con captura real de /negocios, logo y link.
- `assets/fonts/`: Caveat (letra a mano del cuaderno, licencia OFL).

Vista previa: `npm run dev`. MP4: `npm run render`.

## Publicación de temporada (09/11)

Se publica tal cual con el texto de `texto-publicacion.txt` ("¿Arrancás la temporada con el cuaderno?"). La versión para los estados de WhatsApp, `renders/cuaderno-vs-pos-whatsapp.mp4`, lleva `grumpynora-happy-walker-loop` de `C:\Users\P.C\Music` repetido hasta 21,5 s, a un cuarto de volumen (`volume=0.25`, `-stream_loop 1`, `atrim=0:21.5`), con entrada de 0,3 s, salida de 1,8 s y normalizado con objetivo −16 LUFS.
