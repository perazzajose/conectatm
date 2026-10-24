// Datos del comparador de POS. Migrable a Firestore (colección "pos_proveedores") si se suma al admin panel.
//
// Regla: solo se carga lo que está publicado por el proveedor o en prensa confiable, con su fuente.
// Lo que no se pudo verificar va como null ("a confirmar"): nunca se asume que algo falta o existe.
export const REVISADO = 'octubre de 2026';

export const MEDIOS_LABEL = {
  debito: 'Débito', credito: 'Crédito', prepaga: 'Prepaga', qr: 'QR', billetera: 'Billetera',
  link: 'Link o venta online', pix: 'Pix (turistas de Brasil)',
};

// Valor centinela: el campo se muestra como "a cotizar" en la tabla en vez de inventar un número.
export const A_COTIZAR = null;

// Campos que usa el recomendador (además de `medios`):
//   liquidaRapido   true si puede acreditar en 24 h o menos (aunque sea con anticipación opcional)
//   sinTerminal     true si se puede cobrar con el celular, sin comprar ni alquilar terminal
//   facturaE        true / false / null (a confirmar): emite e-ticket o e-factura desde su sistema
//   sistemaCaja     'propio' (vende su sistema de caja), 'integra' (se conecta con sistemas de caja) o null
//   permanenciaLibre true / null
//   procesaPagos    false para quien no cobra por sí mismo (no entra en las recomendaciones)
export const PROVEEDORES = [
  { id: 'handy', nombre: 'Handy', tipo: 'Facilitador de pagos', color: '#FF5A1F', modelo: 'smart', imagen: '/img/handy.png',
    medios: ['debito', 'credito', 'prepaga', 'qr', 'billetera', 'link', 'pix'],
    comision_debito: 'Desde 2%', comision_credito: 'Desde 5%',
    nota: 'Rango que figuraba en el comparador anterior; su página de planes hoy no muestra tasas. Pedí cotización.',
    liquidacion: '24-48 h, o en segundos con Handy Flash (requiere cuenta OCA Blue, Prex o empresa)',
    liquidaRapido: true, sinTerminal: null,
    terminal_modelo: 'Move 5000 / 2500 / Android', terminal_costo: A_COTIZAR,
    facturaE: true, sistemaCaja: 'propio', contrato: 'Libre permanencia', permanenciaLibre: true,
    extras: ['Más de 25 medios de pago con un solo contrato', 'Sistema de caja propio'],
    procesaPagos: true, cobertura: 'Nacional', web: 'https://handy.uy',
    fuentes: [{ titulo: 'handy.uy', url: 'https://handy.uy' }] },

  { id: 'mercadopago', nombre: 'Mercado Pago', tipo: 'Fintech', color: '#00B1EA', modelo: 'smart', imagen: '/img/mercadopago.png',
    medios: ['debito', 'credito', 'prepaga', 'qr', 'billetera'],
    comision_debito: A_COTIZAR, comision_credito: A_COTIZAR,
    nota: 'No publica tasas fijas en Uruguay; se conocen al afiliarte desde la app.',
    liquidacion: 'Instantánea a la cuenta de Mercado Pago',
    liquidaRapido: true, sinTerminal: true,
    terminal_modelo: 'Point Smart, o cobro con QR sin terminal', terminal_costo: 'Sin costo de alquiler',
    facturaE: null, sistemaCaja: null, contrato: 'Sin plazo forzoso', permanenciaLibre: true,
    extras: ['Cobro con QR desde que te registrás'],
    procesaPagos: true, cobertura: 'Nacional', web: 'https://www.mercadopago.com.uy',
    fuentes: [{ titulo: 'Documentación de QR de Mercado Pago', url: 'https://www.mercadopago.com.uy/developers/es/docs/qr-code/landing' }] },

  { id: 'getnet', nombre: 'Getnet', tipo: 'Adquirente · grupo Santander', color: '#EC0000', modelo: 'smart', imagen: '/img/getnet.png',
    medios: ['debito', 'credito', 'prepaga', 'link'],
    comision_debito: A_COTIZAR, comision_credito: A_COTIZAR,
    nota: 'No publica tasas; cotiza según el comercio.',
    liquidacion: '24 h hábiles con anticipación (se puede pedir el plazo habitual)',
    liquidaRapido: true, sinTerminal: null,
    terminal_modelo: 'Get Smart POS (Android)', terminal_costo: A_COTIZAR,
    facturaE: true, sistemaCaja: 'integra', contrato: 'A confirmar', permanenciaLibre: null,
    extras: ['Emite e-tickets y CFE', 'Trabaja con más de 70 integradores de sistemas de caja', 'Cobro en moneda del turista (DCC)'],
    procesaPagos: true, cobertura: 'Nacional', web: 'https://www.getnet.net/uy/',
    fuentes: [
      { titulo: 'getnet.net/uy', url: 'https://www.getnet.net/uy/' },
      { titulo: 'Montevideo Portal, 2022', url: 'https://www.montevideo.com.uy/Negocios-y-Tendencias/La-nueva-competencia-por-procesar-las-ventas-de-los-comercios-uruguayos-uc817940' },
    ] },

  { id: 'scanntech', nombre: 'Scanntech', tipo: 'Sistema de caja y adquirente', color: '#7B2FE0', modelo: 'clasica', imagen: '/img/scanntech.png',
    medios: ['debito', 'credito', 'prepaga'],
    comision_debito: 'Desde 2%', comision_credito: 'Desde 5%',
    nota: 'Rango del comparador anterior, con liquidación a 20 días; no se pudo verificar en 2026. Pedí cotización.',
    liquidacion: '20 días estándar, con planes inmediatos',
    liquidaRapido: null, sinTerminal: false,
    terminal_modelo: 'Cajas registradoras, autocobro y POS Scanntech', terminal_costo: '$465 a $1.500 + IVA',
    facturaE: null, sistemaCaja: 'propio', contrato: 'A confirmar', permanenciaLibre: null,
    extras: ['Sistema de caja y cobro con tarjeta del mismo proveedor', 'Pensado para almacenes y supermercados'],
    procesaPagos: true, cobertura: 'Nacional', web: '',
    fuentes: [
      { titulo: 'Montevideo Portal, 2022', url: 'https://www.montevideo.com.uy/Negocios-y-Tendencias/La-nueva-competencia-por-procesar-las-ventas-de-los-comercios-uruguayos-uc817940' },
      { titulo: 'BBVA Uruguay, 2022', url: 'https://www.bbva.com/es/uy/brou-y-bbva-alcanzan-un-acuerdo-con-scanntech-para-acercar-soluciones-a-los-comercios-minoristas/' },
    ] },

  { id: 'oca', nombre: 'OCA Comercios', tipo: 'Adquirente · grupo Itaú', color: '#0033A0', modelo: 'clasica', imagen: '/img/oca.png',
    medios: ['debito', 'credito', 'prepaga'],
    comision_debito: A_COTIZAR, comision_credito: A_COTIZAR,
    nota: 'No publica tasas fijas.',
    liquidacion: A_COTIZAR,
    liquidaRapido: null, sinTerminal: null,
    terminal_modelo: 'Terminales OCA (red Resonance)', terminal_costo: A_COTIZAR,
    facturaE: null, sistemaCaja: null, contrato: 'A confirmar', permanenciaLibre: null,
    extras: ['Liquidación unificada de todas las tarjetas'],
    procesaPagos: true, cobertura: 'Nacional', web: '',
    fuentes: [{ titulo: 'Montevideo Portal, 2022', url: 'https://www.montevideo.com.uy/Negocios-y-Tendencias/La-nueva-competencia-por-procesar-las-ventas-de-los-comercios-uruguayos-uc817940' }] },

  { id: 'totalnet', nombre: 'TotalNet', tipo: 'Adquirente · ex VisaNet', color: '#1A1F71', modelo: 'smart', imagen: '/img/totalnet.png',
    medios: ['debito', 'credito', 'prepaga'],
    comision_debito: A_COTIZAR, comision_credito: A_COTIZAR,
    nota: 'No publica tasas fijas.',
    liquidacion: '24 h hábiles con la app en el celular',
    liquidaRapido: true, sinTerminal: true,
    terminal_modelo: 'App en celular Android con NFC, o POS Android (Gertec)', terminal_costo: 'Sin terminal con la app',
    facturaE: null, sistemaCaja: null, contrato: 'A confirmar', permanenciaLibre: null,
    extras: ['Cobrás acercando la tarjeta a tu celular', 'Socio de BROU para pagos digitales'],
    procesaPagos: true, cobertura: 'Nacional', web: '',
    fuentes: [
      { titulo: 'LatamFintech', url: 'https://www.latamfintech.co/articles/fintech-totalnet-uruguay-lanza-aplicacion-movil-para-pagos-con-tarjetas' },
      { titulo: 'Montevideo Portal', url: 'https://www.montevideo.com.uy/Negocios-y-Tendencias/BROU-elige-a-Totalnet-como-socio-estrategico-para-liderar-el-mercado-de-pagos-digitales-uc900139' },
    ] },

  { id: 'fiserv', nombre: 'Fiserv', tipo: 'Adquirente internacional', color: '#FF6200', modelo: 'smart', imagen: '/img/fiserv.png',
    medios: ['debito', 'credito', 'prepaga', 'pix'],
    comision_debito: A_COTIZAR, comision_credito: A_COTIZAR,
    nota: 'No publica tasas fijas. La anticipación de crédito tiene su propia tabla de coeficientes.',
    liquidacion: 'Crédito a 24 h hábiles con el servicio de anticipación',
    liquidaRapido: true, sinTerminal: false,
    terminal_modelo: 'Express Pos y Terminal Android (red Geocom)', terminal_costo: A_COTIZAR,
    facturaE: null, sistemaCaja: null, contrato: 'A confirmar', permanenciaLibre: null,
    extras: ['Cobro con Pix para turistas de Brasil', 'Débito automático para cobros recurrentes'],
    procesaPagos: true, cobertura: 'Nacional (compañía global)', web: 'https://www.fiserv.com.uy',
    fuentes: [
      { titulo: 'fiserv.com.uy', url: 'https://www.fiserv.com.uy' },
      { titulo: 'El Observador, 2023 (Pix)', url: 'https://www.elobservador.com.uy/nota/fiserv-habilito-los-pagos-con-pix-en-comercios-de-uruguay-20231212172115' },
    ] },

  { id: 'geocom', nombre: 'Geocom', tipo: 'Red de terminales y sistema de caja (cobra a través de Fiserv)', color: '#1FA97A', modelo: 'clasica', imagen: '/img/geocom.png',
    medios: ['debito', 'credito', 'prepaga'],
    comision_debito: A_COTIZAR, comision_credito: A_COTIZAR,
    nota: 'No procesa pagos por sí mismo: sus terminales cobran a través de Fiserv. Ofrece el sistema de caja GEOPos.',
    liquidacion: 'Según el adquirente (Fiserv)',
    liquidaRapido: null, sinTerminal: false,
    terminal_modelo: 'Terminales de la red Geocom', terminal_costo: A_COTIZAR,
    facturaE: null, sistemaCaja: 'propio', contrato: 'A confirmar', permanenciaLibre: null,
    extras: ['Sistema de caja GEOPos', 'Autocobro con QR (GEOPos Self-scan)'],
    procesaPagos: false, cobertura: 'Nacional', web: 'https://www.geocom.com.uy',
    fuentes: [
      { titulo: 'geocom.com.uy', url: 'https://www.geocom.com.uy' },
      { titulo: 'Montevideo Portal, 2023', url: 'https://www.montevideo.com.uy/Noticias/Caida-en-sistema-de-terminales-POS-de-la-red-Geocom-afecta-pagos-con-tarjeta-en-Uruguay-uc867584' },
    ] },
];

// Reglas que valen para todos los proveedores (acuerdo del MEF de setiembre de 2018).
// El tope de débito baja por escalones según crece el uso: en 2020 se informó 1,15%; puede ser menor hoy.
export const TOPES = {
  texto: 'Para tarjetas de débito emitidas en Uruguay rige un arancel máximo acordado con el Ministerio de Economía (en 2020 era 1,15% y puede haber bajado), y te tienen que pagar en 1 día como máximo, hábil o no. Si te ofrecen algo peor, preguntá por qué.',
  fuente: 'https://www.gub.uy/ministerio-economia-finanzas/comunicacion/noticias/acuerdo-sobre-aranceles-y-otras-condiciones-de-uso-de-medios-de-pago',
};

export const glosario = [
  { title: 'Liquidación', desc: 'Cuánto tarda en llegarte la plata de una venta. Cuanto más rápida, mejor para tu caja, pero la anticipación del crédito suele costar comisión extra.' },
  { title: 'Multiadquirencia', desc: 'Hoy podés aceptar todas las tarjetas con un solo contrato, sin atarte a una marca. Por eso se puede comparar como en esta página.' },
  { title: 'Costo de terminal', desc: 'Algunos no cobran alquiler (lo compensan en la comisión), otros cobran una vez o por mes, y algunos te dejan cobrar con el celular. Preguntá siempre el costo total.' },
  { title: 'Permanencia', desc: 'Revisá si el contrato te ata por un plazo mínimo. Varios ofrecen baja libre, pero conviene confirmarlo antes de firmar.' },
];
