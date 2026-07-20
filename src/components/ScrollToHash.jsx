import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// React Router no hace scroll automático a los #anclas al navegar entre rutas
// (a diferencia de un <a href> nativo). Sin esto, un link como "/#conecta" desde
// otra página te deja en el tope de Home en vez de llevarte a la sección.
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Esperamos un tick a que la página (y sus imágenes/altura) se asiente antes de medir.
      const id = hash.slice(1);
      const scroll = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      const t = setTimeout(scroll, 60);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
}
