import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PAGINAS, NO_ENCONTRADA, SITIO, urlAbsoluta } from '../data/seo';

// Cambia título, descripción, canónica y etiquetas para compartir al navegar entre páginas.
// El primer HTML ya llega con todo esto desde scripts/prerender.mjs; acá solo se mantiene al día.
function fijar(selector, crear, valor) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(crear.tag);
    Object.entries(crear.attrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute(crear.tag === 'link' ? 'href' : 'content', valor);
}

const meta = (atributo, nombre, valor) =>
  fijar(`meta[${atributo}="${nombre}"]`, { tag: 'meta', attrs: { [atributo]: nombre } }, valor);

export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const ruta = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
    const p = PAGINAS[ruta] ?? NO_ENCONTRADA;
    const url = urlAbsoluta(PAGINAS[ruta] ? ruta : '/');
    const imagen = SITIO.url + SITIO.imagen;

    document.title = p.titulo;
    meta('name', 'description', p.descripcion);
    meta('name', 'robots', p.noindex ? 'noindex, follow' : 'index, follow');
    fijar('link[rel="canonical"]', { tag: 'link', attrs: { rel: 'canonical' } }, url);
    meta('property', 'og:title', p.titulo);
    meta('property', 'og:description', p.descripcion);
    meta('property', 'og:url', url);
    meta('property', 'og:image', imagen);
  }, [pathname]);

  return null;
}
