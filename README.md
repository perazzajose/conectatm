# ConectaTuMundo — React

Migración del sitio original (HTML/CSS/JS vanilla) a **React + Vite + React Router**, manteniendo Firestore como backend.

## Por qué esta estructura

- `src/styles/tokens.css` — variables de diseño (colores, tipografía) compartidas por toda la app. Cambiás un color acá y se actualiza en todos lados.
- `src/components/` — piezas reutilizables: `Navbar`, `Footer`, `Icon` (set de íconos SVG), `ServiceCard`, `ComCard`, `FaqItem`, `HeroPill`, `WhatsappFloat`. Antes estos elementos estaban copiados y pegados en cada .html; ahora es un solo componente usado en todas las páginas.
- `src/lib/firebase.js` — configuración única de Firebase. Antes estaba repetida en `admin-panel.html`, `comunidad_estudiantes.html` y `vitrina_emprendimientos.html`.
- `src/pages/home/` — la página de inicio, dividida en una sub-sección por archivo (Hero, Servicios, Comunidad, Conecta, Formación, FaqPreview, Sobre, Contacto).
- `src/pages/ComingSoon.jsx` — placeholder para las páginas que faltan migrar (ver abajo).

## Cómo correrlo

```bash
npm install
npm run dev      # desarrollo, http://localhost:5173
npm run build    # build de producción -> carpeta dist/
```

## Desplegar en Cloudflare Pages (GitHub)

1. Subís esta carpeta (`conectatm-react`) como raíz del repo en GitHub.
2. En Cloudflare Pages → conectar el repo → configuración de build:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (o la subcarpeta si el repo tiene otras cosas al lado)
3. Listo. Cloudflare instala dependencias, corre `vite build` y publica `dist/`.

### Por qué hacía falta agregar estos archivos (ya están en `public/`, Vite los copia tal cual a `dist/`)

- **`_redirects`** (`/* /index.html 200`): esto es lo importante. Como ahora las rutas (`/tutores`, `/faq`, etc.) las maneja React Router en el navegador, si alguien entra directo a `conectatumundo.net/tutores` o refresca la página ahí, el servidor de Cloudflare no tiene un archivo `tutores.html` para devolver — sin este archivo te tira 404. `_redirects` le dice "para cualquier ruta que no sea un archivo real, devolvé `index.html`", y ahí React Router toma el control y muestra la página correcta.
- **`_headers`**: mismo header de `Content-Type` para el sitemap que tenías en el sitio original.
- **`sitemap.xml`** y **`robots.txt`**: actualizados con las rutas limpias nuevas (`/tutores` en vez de `comunidad_estudiantes.html`, etc.).
- **`admin-panel.html`**: lo dejé tal cual (HTML plano) directamente en `public/`, así Vite lo copia sin tocarlo a `dist/admin-panel.html`. Queda accesible en `conectatumundo.net/admin-panel.html`, funcionando exactamente igual que antes (con su propio Firebase Auth + CRUD), en paralelo a la SPA de React. Los archivos estáticos siempre tienen prioridad sobre `_redirects`, así que no hay conflicto entre ambos.



✅ Migrado a componentes React:
- Navbar + drawer móvil, Footer, botón flotante de WhatsApp
- Cliente Firebase centralizado (`src/lib/firebase.js`) + hook `useFirestoreCollection`
- **Home** (`/`) — Hero, Servicios, Comunidad, Red Conecta, Formación, FAQ preview, Sobre mí, Contacto con EmailJS
- **Tutores** (`/tutores`) — filtros, buscador, cards, datos desde Firestore
- **Emprendimientos** (`/emprendimientos`) — filtros, buscador, cards, datos desde Firestore
- **FAQ** (`/faq`) — tabs por categoría + acordeón (una pregunta abierta a la vez)
- **POS** (`/pos`) — comparador de terminales: filtros multi-select, grid de cards, tabla comparativa y glosario. Tiene su propio nav (`PosNav`) porque en el sitio original vivía en un subdominio con identidad propia (`pos.conectatumundo.net`)
- **Privacy** (`/privacy`) y **404** (ruta catch-all `*`)

Componentes compartidos entre las páginas de listado (Tutores/Emprendimientos/POS): `PageHeader`, `FilterBar`, `SearchBox`, `SumateBanner`, `NoResults`/`Skeleton`.

⏳ Pendiente (queda como placeholder en `ComingSoon`):
- `admin-panel.html` → `/admin` — requiere Firebase Auth + CRUD completo (login, altas/bajas de tutores y emprendimientos). Es la pieza más grande que falta, se hace en el próximo paso.
