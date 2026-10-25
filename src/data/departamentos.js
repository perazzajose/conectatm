// Los 19 departamentos de Uruguay. Primero las zonas donde trabaja ConectaTuMundo.
// `bj` es el id de BuscoJobs para su listado por departamento (verificado contra su sitemap).
export const DEPARTAMENTOS = [
  { id: 'durazno', nombre: 'Durazno', bj: 437 },
  { id: 'rocha', nombre: 'Rocha', bj: 445 },
  { id: 'montevideo', nombre: 'Montevideo', bj: 451 },
  { id: 'artigas', nombre: 'Artigas', bj: 433 },
  { id: 'canelones', nombre: 'Canelones', bj: 434 },
  { id: 'cerro-largo', nombre: 'Cerro Largo', bj: 435 },
  { id: 'colonia', nombre: 'Colonia', bj: 436 },
  { id: 'flores', nombre: 'Flores', bj: 438 },
  { id: 'florida', nombre: 'Florida', bj: 439 },
  { id: 'lavalleja', nombre: 'Lavalleja', bj: 440 },
  { id: 'maldonado', nombre: 'Maldonado', bj: 441 },
  { id: 'paysandu', nombre: 'Paysandú', bj: 442 },
  { id: 'rio-negro', nombre: 'Río Negro', bj: 443 },
  { id: 'rivera', nombre: 'Rivera', bj: 444 },
  { id: 'salto', nombre: 'Salto', bj: 446 },
  { id: 'san-jose', nombre: 'San José', bj: 447 },
  { id: 'soriano', nombre: 'Soriano', bj: 448 },
  { id: 'tacuarembo', nombre: 'Tacuarembó', bj: 449 },
  { id: 'treinta-y-tres', nombre: 'Treinta y Tres', bj: 450 },
];

// Enlaces para seguir buscando en cada portal, ya filtrados por departamento cuando el portal lo permite
export const enlacesPortales = (d) => [
  { portal: 'LinkedIn', url: `https://www.linkedin.com/jobs/search/?location=${encodeURIComponent(`${d.nombre}, Uruguay`)}&sortBy=DD` },
  { portal: 'BuscoJobs', url: `https://www.buscojobs.com.uy/ofertas/rd${d.bj}/trabajo-en-${d.id}` },
  { portal: 'Computrabajo', url: 'https://uy.computrabajo.com/' },
  { portal: 'Google Empleos', url: `https://www.google.com/search?q=${encodeURIComponent(`empleos en ${d.nombre} Uruguay`)}&ibp=htl;jobs` },
];

// Google devuelve "Durazno, Departamento de Durazno": nos quedamos con "Durazno"
export const limpiarUbicacion = u => u?.replace(/,?\s*Departamento de [^,]+/i, '').trim() || null;
