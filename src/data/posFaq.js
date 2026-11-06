import { PROVEEDORES } from './posProveedores';

// Preguntas frecuentes del comparador de POS (/negocios/pos), con lo que más se busca en Google.
// Regla: se responde solo con lo que ya está en posProveedores.js. Si un dato no está,
// la respuesta lo dice y remite a la tabla. posFaq.test.js revisa que cada número
// de las respuestas figure en esos datos.
export const ACTUALIZADO = { texto: 'noviembre 2026', fecha: '2026-11' };

const p = id => PROVEEDORES.find(x => x.id === id);
const handy = p('handy');
const getnet = p('getnet');
const scanntech = p('scanntech');
const cobran = PROVEEDORES.filter(x => x.procesaPagos);
const masMedios = cobran.reduce((a, b) => (b.medios.length > a.medios.length ? b : a));
const sinTerminal = cobran.filter(x => x.sinTerminal).map(x => x.nombre);
const ySeparado = l => (l.length > 1 ? `${l.slice(0, -1).join(', ')} y ${l.at(-1)}` : l.join(''));

export const POS_FAQ = [
  {
    q: '¿Cuál es el mejor POS en Uruguay?',
    a: `No hay uno mejor para todos: depende de qué medios de pago necesitás, qué tan rápido querés cobrar y si ya tenés sistema de caja. ${masMedios.nombre} es el que acepta más medios con un solo contrato (${masMedios.medios.length}, incluido Pix), y ${ySeparado(sinTerminal)} te dejan cobrar sin terminal. Respondé las cuatro preguntas del recomendador y te sugerimos uno.`,
  },
  {
    q: '¿Cuál es el mejor POS sin alquiler para pymes?',
    a: `Con los datos publicados, ${ySeparado(sinTerminal)} te dejan cobrar sin comprar ni alquilar terminal: Mercado Pago con QR o Point Smart sin costo de alquiler, y TotalNet con una app en un celular Android con NFC. En el resto, el costo de la terminal es a cotizar: preguntá el costo total antes de firmar.`,
  },
  {
    q: '¿Getnet o Handy?',
    a: `Los dos emiten factura electrónica. ${handy.nombre} suma QR, billeteras y Pix, tiene sistema de caja propio y libre permanencia, y liquida en ${handy.liquidacion.split(',')[0]} (o en segundos con Handy Flash). ${getnet.nombre}, del grupo Santander, trabaja con más de 70 integradores de sistemas de caja y acredita en 24 h hábiles con anticipación. ${getnet.nombre} no publica tasas; la de Handy (${handy.comision_debito.toLowerCase()} en débito y ${handy.comision_credito.toLowerCase()} en crédito) no se pudo confirmar en su página actual.`,
  },
  {
    q: '¿Qué aranceles cobran Getnet y OCA para un kiosco?',
    a: 'Ninguno de los dos publica sus tasas: cotizan según el comercio, así que no hay un número para kioscos. Lo que vale para todos: en débito rige un arancel máximo acordado con el Ministerio de Economía (1,15% en 2020, y puede haber bajado) y te tienen que pagar en 1 día como máximo. Pedí cotización a los dos y comparalas con la tabla.',
  },
  {
    q: '¿Hay POS sin cuota mensual?',
    a: `La tabla no tiene la cuota mensual de cada proveedor, pero sí el costo de la terminal: Mercado Pago figura sin costo de alquiler y con TotalNet cobrás con la app, sin terminal. ${scanntech.nombre} figura con un costo de terminal de ${scanntech.terminal_costo}, y en el resto es a cotizar. Mirá la columna “Terminal” de la tabla.`,
  },
];

// Datos estructurados schema.org para la sección (los inserta el componente de la página)
export const datosFaq = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: POS_FAQ.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});
