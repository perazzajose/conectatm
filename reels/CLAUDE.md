# Reels de ConectaTuMundo: cómo los quiere José

Notas para retomar los reels sin volver a preguntar. Escrito el 09/11/2026, después de terminar `errores-cv-canva`. Complementa el skill `reels-conectatumundo` (el proceso) y las skills de HyperFrames de `.claude/skills/`. **Si este archivo y el skill no coinciden en el estilo, manda este archivo**: refleja lo que José aprobó.

## Quién es y cómo trabaja

- José Perazza, de Chuy (Rocha). ConectaTuMundo (conectatumundo.net, @conectatumundo) ofrece CV gratis, herramientas para comercios (comparador de POS) y talleres (/aprende).
- WhatsApp de contacto en los reels: **097 154 271** (confirmado).
- Pide cambios cortos y concretos ("el mail mejor más genérico"). Hacer el cambio, renderizar y mandarle el MP4 con `SendUserFile`.
- Publica en **Instagram, compartido a Facebook**, en grupos locales de empleo y compraventa de Chuy y Rocha, y en estados de WhatsApp. **No tiene TikTok.**
- La **Expo Empleo Binacional (19/11)** no es un evento suyo: la usa como gancho para ofrecer la revisión de CV gratis. No sabe si va a tener stand. No hacer contenido "del evento" (cuenta regresiva, checklist, cobertura), solo de sus servicios.

## Los reels que hay (rama `reels`, carpeta `reels/<id>/`)

| Reel | Estilo | Duración | Estado |
|---|---|---|---|
| `errores-cv-canva` | Canva morado | 25,6 s | **Terminado** 09/11. Para publicar antes del 19/11 |
| `primer-empleo` | Canva morado | 26,3 s | **Terminado** 09/11. El CV es una hoja A4 que parece impresa (José pidió que no fuera "cuadrado": **los CV de los reels van siempre en proporción A4**). "Primer trabajo: qué poner en el CV", 5 secciones con los conceptos que dio José. Sirve toda la temporada. Recursos: hueco que se llena, tarjetas que bajan del consejo al CV, "?" → ✓ y acercamiento a la sección que se lee |
| `cv-expo-chuy` | Lila web | 18 s | Hecho. Nombra la Expo: publicar antes del 19/11 |
| `cuaderno-vs-pos` | Marca azul + letra a mano | 21,5 s | Hecho, sin revisar con José |
| `todo-avanza` | Marca azul | 22,4 s | Hecho, sin revisar con José |
| `hyperframes-cv` | Marca azul | 19,8 s | Hecho, el primero |
| `errores-cv` | Lila web | 26,2 s | Reemplazado por `errores-cv-canva`; no publicar |

Plan acordado para la semana del 9 al 15/11: lun `errores-cv-canva`, mar `cuaderno-vs-pos`, mié `cv-expo-chuy`, jue `todo-avanza`, vie `hyperframes-cv`, sáb un reel nuevo (POS para turistas, con el guion `guiones/pos-turistas.json`, o la Guía del Chuy, a elegir con José), dom estado de WhatsApp "te reviso el CV gratis". Revisar cada uno con el protocolo de abajo antes de mandarlo.

## Estilo preferido: "Canva" (`errores-cv-canva`)

Es el último que aprobó y copia los diseños que José hace en Canva. Usarlo para todo lo de CV y empleo, salvo que pida otra cosa.

**Colores**
- Fondo: degradé radial morado, `#74509F` en el centro → `#5C3D8A` → `#4A2F73` en los bordes.
- Títulos en blanco; segunda línea de acento: lila `#C4A8E8` (neutro), rosado `#FFB4A8` (error), verde `#7EE2A8` (arreglado).
- Píldoras de etiqueta (arriba del título): azul noche `#171D58` (neutra), roja `#E0452F` ("ERROR 1 DE 5"), verde `#1F8F4E` ("ARREGLADO").
- Cintas diagonales lila `#C4A8E8` con texto `#2B1D4A`.
- WhatsApp: verde `#25D366` con texto `#0B2B17`.
- Documento: hoja `#FBFAF8`, cabecera `#8E3A86`, barra de archivo `#22162B`, marcas de error con borde rojo `#C0392B` de 5 px.

**Tipografía** (archivos en `assets/fonts/`, con `@font-face` en cada escena)
- Títulos: **Oswald 700, en mayúscula**: 80 px en escenas, 120 px en el cartel; interlineado 1,02.
- Resto: **IBM Plex Sans** 400/700. Etiquetas 32 px con espaciado 0,08 em.

**Elementos fijos**
- `@conectatumundo` arriba a la derecha (30 px, blanco al 85 %).
- Etiqueta en x 80 / y 178 y título en x 80 / y 232, alineados a la izquierda.
- Grillas de puntos blancos (cada 40 px) que se mueven despacio en vertical.
- Sombra diagonal azul noche al 35 % detrás del documento.
- Sello circular "100 % GRATIS · CV EXPO" (blanco, borde `#171D58`, anillo punteado que gira) en el cierre.
- Cartel de cierre: dos cintas cruzadas que corren ("GRATIS · GRATIS…" y "EXPO EMPLEO BINACIONAL · 19/11…"), título "TE AYUDO CON TU CV GRATIS", caja azul noche con "¡ESCRIBIME!", ícono y píldora de WhatsApp, y `conectatumundo.net`.

**Composición**
- 1080x1920 a 30 fps. Lo importante ocupa al menos el 60 % del ancho (el CV va a escala 1,2 = 672 px).
- Dejar libres unos 260 px abajo, donde Instagram pone el texto y los botones.
- La lupa nunca tapa el título: su borde superior queda debajo de y ≈ 400.

## Las otras dos líneas visuales (para reels que no son de CV)

- **Marca azul** (`hyperframes-cv`, `todo-avanza`, `cuaderno-vs-pos`): azul noche `#0B1D3E`, celeste `#0CCDD9` y azul `#1766D1` sobre fondo claro, con la fuente **Inter**. `todo-avanza` suma el rojo `#E0452F` para las alertas. `cuaderno-vs-pos` usa **Caveat** como letra de cuaderno.
- **Lila web** (`cv-expo-chuy`, `errores-cv`): buganvilia `#8E3A86` sobre lila suave `#F4E8F2`, IBM Plex Sans y bloques rectos.

Para comercios y talleres seguir con la marca azul. Si José pide "como los de Canva", usar el estilo Canva.

## Animación (GSAP local en `assets/vendor/gsap.min.js`)

- **Cuadro 0 = gancho.** Una pregunta grande y el resultado o el objeto ya visible. En `errores-cv-canva`: "¿TU CV TIENE ESTOS ERRORES?" con la lupa ya sobre el CV, y el primer error a los 2,4 s. José eligió esto en lugar de arrancar con el cartel de oferta: **el cartel va al final, no al principio.**
- **Cambio de título:** sale con blur de 10 px (0,18 s, `power2.in`); entra desde y +24 con blur de 10 px a 0 (0,3 s, `power4.out`). La etiqueta entra desde x −30 (0,25 s, `power3.out`).
- **Marcas:** de escala 1,3 a 1 con `back.out(2)`, en cascada de 0,12 s; después laten (escala 1,07, yoyo).
- **Siempre algo se mueve:** mientras se lee, el título crece del 1 al 1,06 (`sine.inOut`), la lupa sigue derivando despacio, las cintas corren lineales y los puntos se desplazan. **Ninguna pausa de más de 0,6 s, salvo el cierre.**
- **Lupa:** una copia del documento dentro de un círculo. Constantes en `revisar.html`: `S` (escala del CV en pantalla), `M` (escala dentro de la lupa, aumento visible = M/S ≈ 1,25), `R` (radio 300) y los puntos `P`.
- **Arreglo:** cada parte "mal" se apaga y su versión "ok" aparece en cascada de 0,18 s. Después la hoja crece y aparece el chip verde "Listo para la Expo" con `back.out`.
- **Salidas rápidas:** `power3.in`, de 0,4 s, sacando todo de cuadro (y −1600 o x ±1600).
- **Cierre:** las cintas entran de los costados (`expo.out`); el título baja de escala 1,25 y blur a nítido; la caja sube; WhatsApp aparece con `back.out(1.8)` y late. Queda quieto y legible unos 3 s.

## Sonido

- Un efecto por cada acción visible (`assets/sfx/`): `whoosh-short` cuando se mueve la lupa, `click` en cada marca, `sparkle` en el arreglo, `pop` en el chip y en WhatsApp, `impact-bass-1` en el sello y `whoosh` en las transiciones.
- **Sin música en el render.** José la agrega desde Instagram o Facebook al publicar: tiene licencia y puede usar sonidos de moda.
- **Excepción, estados de WhatsApp:** ahí no se puede agregar música, así que se hace una versión `-whatsapp.mp4` mezclando con ffmpeg un tema de Pixabay que José baja a `C:\Users\P.C\Music`. Al 09/11 hay cuatro: `atlasaudio-upbeat` (102 s, el elegido, desde el segundo 15), `reachingup` (30 s, va creciendo), `grumpynora-happy-walker-loop` (21 s, loop) y `crimecomic` (20 s, bajo). Los MP3 no se suben al repo; la receta está en `errores-cv-canva/README.md`. La música va a **un cuarto de volumen** (`volume=0.25`; a mitad, a José le pareció muy fuerte), debajo de los efectos, y todo se normaliza con objetivo −16 LUFS.

## Contenido

- Español rioplatense con "vos"; máximo 5 o 6 palabras por línea.
- Datos de ejemplo **ficticios y genéricos**: Lucía Fernández, vendedora, tel 099 000 000. Nada que apunte a gente o lugares reales de la zona. José cambió `lacapa_del_chuy99@hotmail.com` por **`luciabolso1899@hotmail.com`**.
- Nada inventado: ni testimonios, ni cifras, ni clientes.
- Texto para publicar: gancho con pregunta, 1 o 2 líneas de explicación, la oferta con WhatsApp y hashtags `#Chuy #Empleo #CV #ExpoEmpleo #Rocha #ConectaTuMundo` (en Facebook alcanza con `#Chuy #ConectaTuMundo`).

## Técnica en esta PC (Windows 11)

- Node 26 LTS y ffmpeg 9 instalados con winget; Playwright con Chromium y el Chrome de HyperFrames ya bajados. En PowerShell, si `node` no aparece: `$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')`.
- Cada reel fija `hyperframes@0.9.23` en su `package.json` (`npm run dev`, `check`, `render`). Desde la carpeta del reel:
  - `npx --yes hyperframes@0.9.23 check`
  - `npx --yes hyperframes@0.9.23 snapshot --at 0,3.6,...`
  - `npx --yes hyperframes@0.9.23 render --output renders/<id>.mp4` (unos 90 s)
- Avisos que se aceptan: `text_below_floor` en el CV en miniatura (se lee con la lupa) y `line_unread` en las cintas que corren.
- **Revisión antes de entregar:** hoja de contactos con un cuadro por segundo y detección de pausas (comandos en el skill `reels-conectatumundo`, paso 5). Mirar a tamaño real los cuadros que cambiaste.
- Los MP4 están en `.gitignore`. Commit y push solo de las fuentes, a la rama `reels`, que todavía no está unida a `main`.

## Música de stock

El skill `media-use` de HyperFrames puede buscar música en el catálogo de HeyGen (`--type bgm`) o generarla. Para eso hace falta iniciar sesión gratis: José lo hizo el 09/11 (plan Free; la sesión vence el 19/11; para renovarla, `npx.cmd --yes hyperframes@0.9.23 auth login`). En PowerShell, `npx` está bloqueado por la política de scripts: usar `npx.cmd` y no cambiar la política, que es decisión de José. **Pero el catálogo necesita el CLI `heygen`, que no tiene versión para Windows** (al 09/11 HeyGen recomienda WSL), así que en esta PC no anda. Para la música, usar los temas de Pixabay que baja José.
