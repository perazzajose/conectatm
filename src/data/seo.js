import { WHATSAPP, EMAIL } from './contacto';
import { DEPARTAMENTOS } from './departamentos';

// Título y descripción de cada página. Lo usan el componente <Seo> (en el navegador)
// y scripts/prerender.mjs (que arma un HTML por ruta al compilar, para buscadores y vistas previas
// de WhatsApp o Facebook, que no ejecutan JavaScript). Al agregar una página, sumala acá.
// Títulos de hasta ~60 caracteres y descripciones de ~150: Google corta lo que sobra.
export const SITIO = {
  nombre: 'ConectaTuMundo',
  url: 'https://conectatumundo.net',
  imagen: '/og.jpg',
  idioma: 'es_UY',
};

export const PAGINAS = {
  '/': {
    titulo: 'ConectaTuMundo | CV gratis, POS y desarrollo web en Uruguay',
    descripcion: 'Armá tu CV gratis, elegí con qué POS cobrar y contratá un sitio o sistema para tu negocio. Herramientas digitales para Durazno, Rocha y Montevideo.',
  },
  '/laboral': {
    titulo: 'Trabajo: armá tu CV y mirá ofertas en tu departamento',
    descripcion: 'Creá tu CV gratis y sin registrarte, subilo para que te encuentren empresas de la zona y mirá las últimas ofertas de LinkedIn, Computrabajo y BuscoJobs.',
    padre: null,
    nombre: 'Trabajo',
  },
  '/laboral/cv': {
    titulo: 'Crear CV gratis online y descargarlo en PDF | Uruguay',
    descripcion: 'Armá tu currículum gratis, sin registrarte y desde el celular. Ejemplos con y sin experiencia, consejos para el primer empleo y descarga en PDF lista para enviar.',
    padre: '/laboral',
    nombre: 'Armá tu CV',
    // Datos estructurados extra de esta página
    esquema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Editor de CV de ConectaTuMundo',
      url: 'https://conectatumundo.net/laboral/cv',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      inLanguage: 'es-UY',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'UYU' },
      publisher: { '@id': 'https://conectatumundo.net/#negocio' },
    },
  },
  '/laboral/subir': {
    titulo: 'Subí tu CV y que te encuentren empresas de tu zona',
    descripcion: 'Dejá tu CV en la bolsa de ConectaTuMundo. No queda publicado: solo lo ven reclutadores autorizados de Durazno, Rocha y Montevideo cuando coincide con lo que buscan.',
    padre: '/laboral',
    nombre: 'Subí tu CV',
  },
  '/laboral/tutores': {
    titulo: 'Profes particulares a precio accesible | Red Conecta',
    descripcion: 'Estudiantes avanzados que dan clases particulares presenciales o por videollamada, a precio accesible. Encontrá profe o sumate a la Red Conecta.',
    padre: '/laboral',
    nombre: 'Profes particulares',
  },
  '/laboral/reclutadores': {
    titulo: 'Buscar personal | ConectaTuMundo',
    descripcion: 'Acceso para reclutadores autorizados.',
    padre: '/laboral',
    nombre: 'Buscar personal',
    noindex: true,
  },
  '/negocios': {
    titulo: 'Herramientas para emprendimientos y pymes en Uruguay',
    descripcion: 'Elegí con qué POS cobrar en cuatro preguntas, ordená tu stock y mostrá tu negocio en la vitrina de emprendimientos de Durazno, Rocha y Montevideo.',
    padre: null,
    nombre: 'Negocios',
  },
  '/negocios/pos': {
    titulo: '¿Qué POS me conviene? Comparador de POS en Uruguay',
    descripcion: 'Compará Handy, Getnet, Fiserv, Mercado Pago, OCA y más: medios de pago, liquidación, factura electrónica y contrato. Respondé cuatro preguntas y te recomendamos.',
    padre: '/negocios',
    nombre: 'Comparador de POS',
  },
  '/negocios/emprendimientos': {
    titulo: 'Emprendimientos de Durazno, Rocha y Montevideo',
    descripcion: 'Vitrina de negocios locales: gastronomía, comercio, servicios, artesanías y más. Mirá sus sitios y redes, y sumá tu emprendimiento gratis.',
    padre: '/negocios',
    nombre: 'Emprendimientos',
  },
  '/desarrollo': {
    titulo: 'Desarrollo web y sistemas a medida en Uruguay',
    descripcion: 'Sitios web, tiendas online, sistemas a medida y soporte técnico para emprendimientos y pymes de Durazno, Rocha y Montevideo. La primera charla es gratis.',
    padre: null,
    nombre: 'Desarrollo',
  },
  '/estudios': {
    titulo: 'Estudiar gratis en Uruguay: liceo, UTU, universidad y becas',
    descripcion: 'Opciones gratuitas para estudiar en Durazno, Rocha, Montevideo y online: liceos, UTU, UTEC, Udelar, formación docente, programación, cursos y becas.',
    padre: null,
    nombre: 'Estudiá gratis',
  },
  '/aprende': {
    titulo: 'Talleres de tecnología y glosario digital',
    descripcion: 'Talleres para grupos e instituciones sobre WhatsApp Business, facturación digital y seguridad online, y un glosario de términos explicados sin vueltas.',
    padre: null,
    nombre: 'Aprendé',
  },
  '/faq': {
    titulo: 'Preguntas frecuentes | ConectaTuMundo',
    descripcion: 'Respuestas sobre el editor de CV, la bolsa de CVs, la Red Conecta, el comparador de POS, los servicios de desarrollo y los talleres.',
    padre: null,
    nombre: 'Preguntas frecuentes',
  },
  '/privacy': {
    titulo: 'Política de privacidad | ConectaTuMundo',
    descripcion: 'Qué datos guarda ConectaTuMundo, para qué los usa y cómo pedir que se borren, según la Ley 18.331 de protección de datos personales.',
    padre: null,
    nombre: 'Privacidad',
  },
};

// Una página por departamento (src/pages/zona/Zona.jsx), misma plantilla
for (const { id, nombre: n } of DEPARTAMENTOS) {
  PAGINAS[`/${id}`] = {
    titulo: `Desarrollo web en ${n} | Páginas web y sistemas`,
    descripcion: `Páginas web, tiendas online y sistemas para negocios de ${n}. Además: CV gratis, ofertas de trabajo en ${n} y profes particulares.`,
    padre: null,
    nombre: n,
    esquema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Desarrollo web en ${n}`,
      serviceType: 'Desarrollo web',
      url: `https://conectatumundo.net/${id}`,
      areaServed: { '@type': 'AdministrativeArea', name: n, containedInPlace: { '@type': 'Country', name: 'Uruguay' } },
      provider: { '@id': 'https://conectatumundo.net/#negocio' },
    },
  };
}

export const NO_ENCONTRADA = {
  titulo: 'Página no encontrada | ConectaTuMundo',
  descripcion: 'Esta página no existe.',
  noindex: true,
};

export const urlAbsoluta = ruta => SITIO.url + (ruta === '/' ? '/' : ruta);

// Datos estructurados (schema.org) del negocio: quién es, qué zona cubre y cómo contactarlo
export const DATOS_NEGOCIO = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITIO.url}/#negocio`,
  name: SITIO.nombre,
  url: `${SITIO.url}/`,
  logo: `${SITIO.url}/logo-ctm.png`,
  image: `${SITIO.url}${SITIO.imagen}`,
  description: PAGINAS['/'].descripcion,
  email: EMAIL,
  telephone: `+${WHATSAPP}`,
  priceRange: '$',
  address: { '@type': 'PostalAddress', addressLocality: 'Durazno', addressRegion: 'Durazno', addressCountry: 'UY' },
  areaServed: ['Durazno', 'Rocha', 'Montevideo'].map(name => ({ '@type': 'AdministrativeArea', name, containedInPlace: { '@type': 'Country', name: 'Uruguay' } })),
  founder: { '@type': 'Person', name: 'José', jobTitle: 'Desarrollador' },
  knowsAbout: ['Desarrollo web', 'Sistemas a medida', 'POS', 'Control de stock', 'Currículum vitae'],
};

export const DATOS_SITIO = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITIO.url}/#sitio`,
  name: SITIO.nombre,
  url: `${SITIO.url}/`,
  inLanguage: 'es-UY',
  publisher: { '@id': `${SITIO.url}/#negocio` },
};

// Miga de pan para buscadores: Inicio > Trabajo > Armá tu CV
export function datosMiga(ruta) {
  const cadena = [];
  for (let r = ruta; r && PAGINAS[r]; r = PAGINAS[r].padre) cadena.unshift(r);
  if (cadena.length === 0 || ruta === '/') return null;
  const items = [['/', 'Inicio'], ...cadena.map(r => [r, PAGINAS[r].nombre])];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([r, name], i) => ({ '@type': 'ListItem', position: i + 1, name, item: urlAbsoluta(r) })),
  };
}
