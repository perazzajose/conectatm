import { icons } from '../components/Icon';

// Foco del sitio: ayudar a los comercios chicos de Uruguay a digitalizarse sin complicarse.
// Las cuatro ramas son para el mismo cliente (el comercio) y apuntan a páginas que ya existen:
// las direcciones no cambian (son las que Google ya indexó). Las usan la portada, el menú y el pie.
// Colores de la paleta (src/styles/tokens.css): los de cada camino donde la página ya tiene ese color.
export const RAMAS = [
  {
    id: 'comparadores',
    to: '/negocios/pos',
    nav: 'Comparadores',
    titulo: 'Comparadores',
    resumen: 'Elegí con qué POS cobrar: comisiones publicadas, liquidación, terminal y contrato, lado a lado.',
    icon: icons.pos,
    color: 'var(--buganvilia)',
  },
  {
    id: 'servicios',
    to: '/desarrollo',
    nav: 'Servicios',
    titulo: 'Servicios para tu comercio',
    resumen: 'Página web, tu ficha en Google Maps y tus redes bien armadas. Te paso un presupuesto cerrado.',
    icon: icons.web,
    color: 'var(--cielo)',
  },
  {
    id: 'capacitacion',
    to: '/aprende',
    nav: 'Capacitación',
    titulo: 'Capacitación',
    resumen: 'Talleres para vos y tu equipo: WhatsApp Business, facturación digital y seguridad online.',
    icon: icons.taller,
    color: 'var(--tinta)',
  },
  {
    id: 'contratar',
    to: '/laboral/cv',
    nav: 'Contratar personal',
    titulo: 'Contratar personal',
    resumen: 'Pediles a quienes se postulan que armen su CV gratis acá, o buscá gente en la bolsa de CVs.',
    icon: icons.cv,
    color: 'var(--palmera)',
  },
];

// Fuera del foco: siguen funcionando en su dirección, pero no van en el menú principal.
// En el pie de página quedan en "Otras herramientas".
export const OTRAS_HERRAMIENTAS = [
  { to: '/negocios/emprendimientos', label: 'Vitrina de emprendimientos' },
  { to: '/laboral/subir', label: 'Subí tu CV' },
  { to: '/laboral/tutores', label: 'Profes particulares' },
  { to: '/estudios', label: 'Estudiá gratis' },
  { to: '/faq', label: 'Preguntas frecuentes' },
];

export const CONTACTO = { to: '/#contacto', label: 'Contacto' };
