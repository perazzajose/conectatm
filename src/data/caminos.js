import { icons } from '../components/Icon';

// Fotos de fondo del encabezado de cada parte, en public/fondos/: 1600 px de ancho, horizontal, WebP de menos de 300 KB.
// Las tres partes de la plataforma. Cada una vive hoy en una ruta (/laboral, /negocios, /desarrollo)
// y está pensada para mudarse a su propio subdominio (laboral.conectatumundo.net, etc.)
// cuando tenga contenido suficiente: alcanza con cambiar `to` acá.
export const CAMINOS = [
  {
    id: 'laboral',
    to: '/laboral',
    color: 'var(--palmera)',
    suave: 'var(--palmera-suave)',
    icon: icons.cv,
    pregunta: 'Busco trabajo',
    resumen: 'Armá tu CV gratis y descargalo en PDF. Si sos estudiante, sumate a la Red Conecta.',
    nav: 'Trabajo',
    fondo: '/fondos/laboral.webp',
    fondoPos: 'center 15%',
  },
  {
    id: 'negocios',
    to: '/negocios',
    color: 'var(--buganvilia)',
    suave: 'var(--buganvilia-suave)',
    icon: icons.emprendimientos,
    pregunta: 'Tengo un negocio',
    resumen: 'Elegí con qué cobrar, ordená tu stock y aparecé en la vitrina de emprendimientos.',
    nav: 'Negocios',
    fondo: '/fondos/negocios.webp',
  },
  {
    id: 'desarrollo',
    to: '/desarrollo',
    color: 'var(--cielo)',
    suave: 'var(--cielo-suave)',
    icon: icons.codigo,
    pregunta: 'Necesito un sitio o un sistema',
    resumen: 'Sitios web, sistemas a medida y soporte técnico. La primera charla es gratis.',
    nav: 'Desarrollo',
    fondo: '/fondos/desarrollo.webp',
  },
];
