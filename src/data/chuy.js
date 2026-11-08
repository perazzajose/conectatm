import { PROVEEDORES } from './posProveedores';

// Guía del Chuy (/chuy). Primero información práctica de la frontera; al final, los servicios.
// Regla: cada dato sale de una fuente de FUENTES. Lo que no está confirmado por una fuente oficial
// se dice con "confirmá antes de viajar". Revisar las fuentes antes de cada temporada.
export const REVISADO = { texto: 'noviembre 2026', fecha: '2026-11' };

export const FUENTES = {
  pix: { titulo: 'Pix, Banco Central do Brasil', url: 'https://www.bcb.gov.br/estabilidadefinanceira/pix' },
  freeShopRocha: { titulo: 'Turismo de compras en Rocha (Intendencia de Rocha)', url: 'https://turismorocha.gub.uy/de-interes/turismo-de-compras-en-rocha-free-shops-tiendas-y-ferias-artesanales-15' },
  aduanas: { titulo: 'Normas sobre free shop en Rivera y Chuy (Aduanas)', url: 'https://www.aduanas.gub.uy/innovaportal/v/5778/3/innova.front/normas-sobre-free-shop-en-rivera-y-chuy.html' },
  gazeta: { titulo: 'Fronteira sem muro entre Brasil e Uruguai (Gazeta do Povo, julio 2026)', url: 'https://www.gazetadopovo.com.br/brasil/fronteira-sem-muro-entre-brasil-uruguai-mistura-quatro-idiomas-tres-moedas/' },
  cpf: { titulo: 'Inscribirse en el CPF desde el exterior (gov.br)', url: 'https://www.gov.br/pt-br/servicos/inscrever-no-cpf-no-exterior' },
  viajar: { titulo: 'Requisitos para viajar a Brasil desde Uruguay (ViajareSIM, 2026)', url: 'https://www.viajaresim.com/blog/requisitos-para-viajar-a-brasil-desde-uruguay/' },
  santaTeresa: { titulo: 'Fortaleza de Santa Teresa (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Fortaleza_de_Santa_Teresa' },
  sanMiguel: { titulo: 'Fuerte San Miguel (Turismo Rocha)', url: 'https://turismorocha.gub.uy/en/attractions/historical/san-miguel-fort-historical-monument-of-rocha-uruguay' },
  barra: { titulo: 'Barra del Chuy (Viaje a Uruguay)', url: 'https://sitioanterior.viajeauruguay.com/barra-del-chuy/que-ver/' },
};

// Proveedores del comparador que cobran con Pix (se actualiza solo si cambia posProveedores.js)
export const CON_PIX = PROVEEDORES.filter(p => p.procesaPagos && p.medios.includes('pix'));
const nombres = l => (l.length > 1 ? `${l.slice(0, -1).join(', ')} y ${l.at(-1)}` : l.join(''));

// Cada tema: `pt` es cómo se dice o se escribe del otro lado de la avenida.
export const TEMAS = [
  {
    id: 'pix',
    corto: 'Pix',
    pregunta: '¿Qué es Pix?',
    pt: 'Pix · chave Pix · QR Code',
    parrafos: [
      'Es el sistema de pagos instantáneos de Brasil, creado y operado por el Banco Central do Brasil. Funciona desde noviembre de 2020: la plata pasa de una cuenta a otra en segundos, a cualquier hora y cualquier día.',
      'Para cobrar se usa una "chave Pix" (puede ser el CPF, un celular, un email o una clave aleatoria) o un código QR. Es uno de los medios de pago más usados en Brasil.',
      `En Uruguay, para cobrarle con Pix a un turista hace falta un proveedor que lo ofrezca. En el comparador de ConectaTuMundo figuran ${nombres(CON_PIX.map(p => p.nombre))}.`,
    ],
    fuentes: ['pix'],
  },
  {
    id: 'free-shop',
    corto: 'Free shops',
    pregunta: '¿Qué es un free shop?',
    pt: 'free shop · loja franca',
    parrafos: [
      'Son tiendas que venden mercadería importada sin impuestos. En Chuy están del lado uruguayo de la avenida y, según Turismo Rocha, venden únicamente a extranjeros.',
      'Tienen ropa y calzado deportivo, electrónica, cámaras de fotos, electrodomésticos, perfumes, cosméticos, artículos de pesca y camping, y bebidas importadas. Del lado uruguayo y del brasileño también hay supermercados y comercios del barrio.',
      'Para los brasileños, la Receita Federal fija una cuota de compras de US$ 500 por persona cada 30 días. Si vas a comprar mucho, confirmá la cuota antes de viajar.',
    ],
    fuentes: ['freeShopRocha', 'aduanas', 'gazeta'],
  },
  {
    id: 'cpf',
    corto: 'CPF',
    pregunta: '¿Qué es el CPF?',
    pt: 'CPF · Cadastro de Pessoas Físicas',
    parrafos: [
      'Es el número de registro de las personas en Brasil (Cadastro de Pessoas Físicas), que da la Receita Federal. Se usa como identificación en cuentas bancarias, compras y trámites, y puede ser la chave Pix de una persona.',
      'Un extranjero también lo puede pedir: desde afuera de Brasil, por los canales de la Receita Federal o en un consulado brasileño. El paso a paso está en gov.br.',
    ],
    fuentes: ['cpf'],
  },
  {
    id: 'migraciones',
    corto: 'Migraciones',
    pregunta: '¿Tengo que hacer migraciones?',
    pt: 'imigração · Polícia Federal',
    parrafos: [
      'Para moverte por la ciudad, no. Chuy y Chuí comparten la avenida sin muro, barrera ni puesto de migración: se cruza caminando.',
      '"Hacer migraciones" es registrar la salida de un país y la entrada al otro en los controles de frontera. Hace falta si seguís viaje hacia el interior de Brasil o, viniendo de Brasil, hacia el interior de Uruguay.',
      'Los uruguayos pueden viajar a Brasil con la cédula vigente y en buen estado; si la foto está muy vieja o la cédula está dañada, llevá también el pasaporte. Los menores que viajan con un solo padre necesitan un permiso de la Dirección Nacional de Migración. Confirmá los requisitos antes de viajar.',
    ],
    fuentes: ['gazeta', 'viajar'],
  },
  {
    id: 'monedas',
    corto: 'Monedas',
    pregunta: '¿Con qué moneda pago?',
    pt: 'real · peso uruguaio · dólar',
    parrafos: [
      'En los comercios de la avenida se aceptan reales, pesos uruguayos y dólares. Antes de pagar, preguntá a qué cambio te toman cada moneda.',
    ],
    fuentes: ['gazeta'],
  },
];

// Lugares, con la distancia desde Chuy solo cuando la fuente la da (null: cerca, sin distancia confirmada)
export const LUGARES = [
  { nombre: 'Avenida Brasil · Avenida Uruguai', km: 0, texto: 'La misma avenida con dos nombres: Brasil del lado uruguayo, Uruguai del lado brasileño. Ahí están los free shops, los supermercados y los comercios.', fuentes: ['gazeta', 'freeShopRocha'] },
  { nombre: 'Barra del Chuy', km: 10, texto: 'La playa más cerca, sobre el arroyo Chuy, en el límite con Brasil.', fuentes: ['barra'] },
  { nombre: 'Fuerte San Miguel', km: null, texto: 'Fortaleza de 1734, dentro del Parque Nacional San Miguel, cerca de la ciudad.', fuentes: ['sanMiguel'] },
  { nombre: 'Fortaleza de Santa Teresa', km: 36, texto: 'Al sur por Ruta 9, dentro del Parque Nacional Santa Teresa.', fuentes: ['santaTeresa'] },
];
