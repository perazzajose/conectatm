---
name: nueva-pagina
description: Crear una página nueva en ConectaTuMundo. Usar cuando pida agregar una página, sección o ruta al sitio.
---

# Nueva página en ConectaTuMundo

El sitio es una plataforma con tres "caminos", definidos en `src/data/caminos.js`:
- **laboral** (`/laboral`): CV y Red Conecta
- **negocios** (`/negocios`): POS, stock, emprendimientos
- **desarrollo** (`/desarrollo`): servicios de José

Cada camino va a mudarse a su propio subdominio (laboral.conectatumundo.net, etc.), así que todo lo de un camino vive bajo su prefijo de ruta y su carpeta.

## Pasos
1. Decidir a qué camino pertenece y crear el componente en `src/pages/<camino>/<nombre>/` (o `src/pages/<nombre>/` si es general, como `aprende` o `faq`). Seguir el patrón de las existentes: `Nombre.jsx` + `Nombre.css`.
2. Arrancar con `<PageHeader camino="..." pagina="..." title="..." subtitle="..." />`: le da el color del camino y arma la miga de pan.
3. Reutilizar los componentes de `src/components/` antes de crear otros: `PageHeader`, `ContactoForm`, `Proximamente`, `SumateBanner`, `FaqItem`, `FilterBar`, `SearchBox`, `NoResults`.
4. Los datos de contacto salen de `src/data/contacto.js` (`waLink(mensaje)`, `ZONAS_TEXTO`); nunca escribir el número a mano.
5. Si lee datos de Firestore, usar `useFirestoreCollection` (`src/hooks/`) y el cliente de `src/lib/firebase.js`.
   Si guarda datos de personas (CVs, formularios con datos personales), usar Supabase vía `src/lib/supabase.js`, con acceso solo por funciones y RLS (ver `supabase/schema.sql`), y cargar la página con `lazy()` en `App.jsx`.
6. Agregar la ruta en `src/App.jsx` (bajo el prefijo del camino), los enlaces en `Footer.jsx` (objeto `subpaginas`) y la página en `src/data/seo.js` (`PAGINAS`): título de hasta 60 caracteres, descripción de ~150, `padre` y `nombre` para la miga. Con eso el build genera su HTML, la suma al sitemap y le pone las etiquetas para compartir. Si es privada, `noindex: true` y agregarla en `public/robots.txt`. Una ruta que no esté en `PAGINAS` da 404 en producción.
7. Correr `npm run build` (compila y pre-renderiza cada ruta con `scripts/prerender.mjs`) y `npm run lint`, y revisar que no haya errores. El código que corre al renderizar no puede usar `window`, `document` ni `localStorage` sin `try` o sin estar dentro de un `useEffect`: el prerender lo ejecuta en Node.

## Diseño (tokens en `src/styles/tokens.css`)
- Paleta tomada de la foto de la plaza de Durazno: `--buganvilia` (negocios), `--palmera` (laboral), `--cielo` (desarrollo), `--camino` (rojo, solo detalles), `--baldosa`, `--tinta`. No inventar colores nuevos.
- Tipografías: `--font-display` (Bricolage Grotesque) para títulos y `--font-texto` (Atkinson Hyperlegible Next) para texto.
- Bordes redondeados solo en lo que se toca (botones, campos: `--r-control`); los bloques y las tarjetas van rectos.
- Mobile-first: probar a 390px de ancho. Botones y opciones de al menos 44px de alto.
- Nada de mayúsculas sostenidas en etiquetas, emojis decorativos ni flechas "→" en los botones.
- Textos en español rioplatense (vos), cortos y concretos. No inventar precios ni condiciones.
- Ojo: `section` tiene padding global. Si anidás un `<section>` dentro de otro, sacale el padding.
