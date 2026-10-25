import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import App from './App.jsx';

// Renderiza una ruta a HTML al compilar (lo usa scripts/prerender.mjs). Espera las páginas
// cargadas con lazy(), así el HTML sale con el contenido completo y no con "Cargando…".
export async function render(url) {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
    {
      // Sin esto, React manda las secciones grandes aparte ("Cargando…" + un script que las reemplaza)
      progressiveChunkSize: Infinity,
      onError: e => console.error('[prerender]', url, e?.stack || e),
    },
  );
  let html = '';
  for await (const parte of prelude) html += parte;
  return html;
}
