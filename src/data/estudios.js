// Opciones para estudiar gratis, con presencia en Durazno, Rocha o Montevideo (o 100 % online).
// Solo cargamos lo que pudimos confirmar en fuentes oficiales o en la prensa; lo que no, queda afuera.
// Las convocatorias cambian cada año: cada ficha manda al sitio oficial para fechas y cupos.
export const REVISADO = 'octubre de 2026';

export const ZONAS = [
  { id: 'durazno', nombre: 'Durazno' },
  { id: 'rocha', nombre: 'Rocha' },
  { id: 'montevideo', nombre: 'Montevideo' },
  { id: 'online', nombre: 'Online' },
];

export const TIPOS = [
  { id: 'liceo', nombre: 'Terminar el liceo' },
  { id: 'tecnica', nombre: 'Carreras técnicas' },
  { id: 'universidad', nombre: 'Universidad' },
  { id: 'docente', nombre: 'Ser docente' },
  { id: 'tecnologia', nombre: 'Programación' },
  { id: 'trabajo', nombre: 'Para el trabajo' },
  { id: 'becas', nombre: 'Becas y alojamiento' },
];

// `zonas`: dónde se puede cursar. `sedes`: el nombre del lugar en cada zona, cuando cambia.
// `logo`: bajado del sitio oficial de cada institución (los blancos de ANEP y UTEC, pasados a oscuro).
export const ESTUDIOS = [
  {
    id: 'liceos', tipo: 'liceo', nombre: 'Liceos públicos', org: 'Secundaria (ANEP)',
    logo: '/img/estudios/liceos.webp',
    resumen: 'Ciclo básico y bachillerato. También hay liceos nocturnos para mayores de edad.',
    para: 'Todas las edades',
    zonas: ['durazno', 'rocha', 'montevideo'],
    url: 'https://www.dges.edu.uy/',
  },
  {
    id: '3f', tipo: 'liceo', nombre: 'Becas 3F', org: 'Fundación 3F',
    logo: '/img/estudios/3f.webp',
    resumen: 'Becas para rendir las materias que te faltan del bachillerato, con tutorías o curso libre asistido.',
    para: 'Jóvenes que deben materias del bachillerato',
    zonas: ['durazno', 'rocha', 'montevideo', 'online'],
    sedes: { online: 'Presencial o virtual' },
    url: 'https://fundacion3f.org/',
  },
  {
    id: 'anima', tipo: 'liceo', nombre: 'Ánima', org: 'Ánima (sin fines de lucro)',
    logo: '/img/estudios/anima.webp',
    resumen: 'Bachillerato tecnológico en formación dual: estudiás y hacés práctica en empresas.',
    para: 'Jóvenes de contextos vulnerables; hay entrevista y sorteo',
    zonas: ['montevideo'],
    url: 'https://anima.edu.uy/',
  },
  {
    id: 'utu', tipo: 'tecnica', nombre: 'UTU', org: 'Educación Técnico Profesional (ANEP)',
    logo: '/img/estudios/utu.webp',
    resumen: 'Cursos técnicos, bachilleratos tecnológicos y carreras terciarias.',
    para: 'Desde los 12 años, según el curso',
    zonas: ['durazno', 'rocha', 'montevideo'],
    url: 'https://www.utu.edu.uy/',
  },
  {
    id: 'utec', tipo: 'universidad', nombre: 'UTEC', org: 'Universidad Tecnológica',
    logo: '/img/estudios/utec.webp',
    resumen: 'Universidad pública y gratuita del interior: ingenierías, Tecnologías de la Información y tecnólogos.',
    para: 'Con bachillerato terminado',
    zonas: ['durazno'],
    sedes: { durazno: 'Instituto Tecnológico Regional Centro-Sur' },
    url: 'https://utec.edu.uy/',
  },
  {
    id: 'udelar', tipo: 'universidad', nombre: 'Udelar', org: 'Universidad de la República',
    logo: '/img/estudios/udelar.webp',
    resumen: 'Todas las facultades: medicina, derecho, ingeniería, ciencias económicas y más.',
    para: 'Con bachillerato terminado',
    zonas: ['montevideo'],
    url: 'https://udelar.edu.uy/',
  },
  {
    id: 'cure', tipo: 'universidad', nombre: 'CURE, Udelar en Rocha', org: 'Centro Universitario Regional del Este',
    logo: '/img/estudios/cure.webp',
    resumen: 'Carreras de la Udelar en el este. Consultá cuáles se dictan en la sede Rocha.',
    para: 'Con bachillerato terminado',
    zonas: ['rocha'],
    sedes: { rocha: 'Sede Rocha' },
    url: 'https://www.cure.edu.uy/',
  },
  {
    id: 'docente', tipo: 'docente', nombre: 'Formación en Educación', org: 'ANEP',
    logo: '/img/estudios/docente.webp',
    resumen: 'Magisterio, profesorado y maestro de primera infancia.',
    para: 'Con bachillerato terminado',
    zonas: ['durazno', 'rocha', 'montevideo'],
    sedes: { durazno: 'IFD de Durazno', rocha: 'IFD de Rocha', montevideo: 'IPA e Institutos Normales' },
    url: 'https://ifddurazno.cfe.edu.uy/',
  },
  {
    id: 'jap', tipo: 'tecnologia', nombre: 'Jóvenes a Programar', org: 'Ceibal',
    logo: '/img/estudios/jap.webp',
    resumen: 'Curso de programación de un año, online. La edición 2025 fue solo para el interior.',
    para: '18 a 30 años, con ciclo básico',
    zonas: ['online'],
    url: 'https://ceibal.edu.uy/jovenes-a-programar',
  },
  {
    id: 'forge', tipo: 'trabajo', nombre: 'Tu Futuro', org: 'Fundación Forge',
    logo: '/img/estudios/forge.webp',
    resumen: 'Entrenamiento online para conseguir tu primer trabajo formal.',
    para: '17 a 24 años, con bachillerato; para Montevideo y otros departamentos del sur',
    zonas: ['montevideo'],
    sedes: { montevideo: 'Online' },
    url: 'https://fforge.org/',
  },
  {
    id: 'inefop', tipo: 'trabajo', nombre: 'Cursos de INEFOP', org: 'Instituto Nacional de Empleo y Formación Profesional',
    logo: '/img/estudios/inefop.webp',
    resumen: 'Capacitación gratuita para personas con y sin trabajo, incluidos cursos de idiomas.',
    para: 'Mayores de 18, según el curso',
    zonas: ['durazno', 'rocha', 'montevideo', 'online'],
    url: 'https://www.inefop.uy/',
  },
  {
    id: 'yeyt', tipo: 'becas', nombre: 'Yo Estudio y Trabajo', org: 'Ministerio de Trabajo',
    resumen: 'Primer trabajo pago, de un año, para quienes estudian. Se asigna por sorteo.',
    para: '16 a 20 años, estudiando y sin experiencia formal',
    zonas: ['durazno', 'rocha', 'montevideo'],
    url: 'https://inscripcion.mtss.gub.uy/',
  },
  {
    id: 'fondo', tipo: 'becas', nombre: 'Beca del Fondo de Solidaridad', org: 'Fondo de Solidaridad',
    logo: '/img/estudios/fondo.webp',
    resumen: 'Apoyo económico mensual para estudiar en Udelar, UTEC o carreras terciarias de UTU. Se postula de noviembre a febrero.',
    para: 'Estudiantes terciarios de hogares de bajos ingresos',
    zonas: ['durazno', 'rocha', 'montevideo', 'online'],
    url: 'https://www.fondodesolidaridad.edu.uy/',
  },
  {
    id: 'aloj-durazno', tipo: 'becas', nombre: 'Beca de alojamiento en Montevideo', org: 'Intendencia de Durazno',
    logo: '/img/estudios/aloj-durazno.webp',
    resumen: 'Alojamiento en Montevideo para estudiantes de Durazno que siguen estudios terciarios públicos.',
    para: '17 a 23 años, con residencia en Durazno',
    zonas: ['durazno'],
    url: 'https://durazno.uy/',
  },
  {
    id: 'toco-venir', tipo: 'becas', nombre: 'Hogar Tocó Venir', org: 'Intendencia de Montevideo',
    logo: '/img/estudios/toco-venir.webp',
    resumen: 'Hogar en Montevideo para estudiantes del interior en estudios terciarios. Consultá si hay convocatoria abierta.',
    para: 'Estudiantes del interior',
    zonas: ['montevideo'],
    url: 'https://www.gub.uy/ministerio-desarrollo-social/node/9353',
  },
];
