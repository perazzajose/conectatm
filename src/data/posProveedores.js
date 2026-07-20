// Mismo esquema que estaba embebido en pos.html — migrable a Firestore
// (colección "pos_proveedores") si en el futuro se agrega un admin panel como el de emprendimientos.
export const MEDIOS_LABEL = { debito: 'Débito', credito: 'Crédito', prepaga: 'Prepaga', qr: 'QR', billetera: 'Billetera', link: 'Link de pago' };

// Valor centinela: cualquier campo que lo use no se muestra como fila individual,
// se resume como "a cotizar" en la tabla en vez de inventar un número.
export const A_COTIZAR = null;

export const PROVEEDORES = [
  { id: 'handy', nombre: 'Handy', tipo: 'Facilitador de pagos', color: '#FF5A1F', modelo: 'smart', imagen: '/img/handy.png',
    medios: ['debito', 'credito', 'prepaga', 'qr', 'billetera', 'link'],
    comision_debito: 'Desde 2%', comision_credito: 'Desde 5%',
    nota: 'Varía según rubro y plan de liquidación; la propia empresa aclara que los valores publicados no son definitivos.',
    liquidacion: '24-48h, o instantánea con Handy Flash',
    terminal_modelo: 'Move 5000 / 2500 / Android', terminal_costo: A_COTIZAR,
    facturaE: true, contrato: 'Libre permanencia', cobertura: 'Nacional', web: 'https://handy.uy' },

  { id: 'mercadopago', nombre: 'Mercado Pago', tipo: 'Fintech · Point Smart', color: '#00B1EA', modelo: 'smart', imagen: '/img/mercadopago.png',
    medios: ['debito', 'credito', 'prepaga', 'qr'],
    comision_debito: A_COTIZAR, comision_credito: A_COTIZAR,
    nota: 'No publica tasas fijas en Uruguay; se conocen al afiliarte desde la app.',
    liquidacion: 'Instantánea a la cuenta digital',
    terminal_modelo: 'Point Smart', terminal_costo: 'Sin costo de alquiler',
    facturaE: false, contrato: 'Sin plazo forzoso', cobertura: 'Nacional', web: 'https://www.mercadopago.com.uy' },

  { id: 'getnet', nombre: 'Getnet', tipo: 'Procesador · Santander/PagoNxt', color: '#EC0000', modelo: 'clasica', imagen: '/img/getnet.png',
    medios: ['debito', 'credito', 'prepaga'],
    comision_debito: A_COTIZAR, comision_credito: A_COTIZAR,
    nota: 'No publica tasas; cotiza según el comercio.',
    liquidacion: A_COTIZAR,
    terminal_modelo: 'Terminales físicas Getnet', terminal_costo: A_COTIZAR,
    facturaE: false, contrato: 'A confirmar', cobertura: 'Nacional', web: 'https://www.getnet.com.uy' },

  { id: 'scanntech', nombre: 'Scanntech', tipo: 'Procesador multiadquirente', color: '#7B2FE0', modelo: 'clasica', imagen: '/img/scanntech.png',
    medios: ['debito', 'credito', 'prepaga'],
    comision_debito: 'Desde 2%', comision_credito: 'Desde 5%',
    nota: 'Rango de referencia con liquidación a 20 días; planes inmediatos tienen comisión más alta.',
    liquidacion: '20 días estándar, planes inmediatos disponibles',
    terminal_modelo: 'Terminales Scanntech', terminal_costo: '$465 a $1.500 + IVA',
    facturaE: false, contrato: 'A confirmar', cobertura: 'Nacional', web: '' },

  { id: 'oca', nombre: 'OCA Comercios', tipo: 'Procesador · grupo Itaú', color: '#0033A0', modelo: 'clasica', imagen: '/img/oca.png',
    medios: ['debito', 'credito', 'prepaga'],
    comision_debito: A_COTIZAR, comision_credito: A_COTIZAR,
    nota: 'No publica tasas fijas.',
    liquidacion: A_COTIZAR,
    terminal_modelo: 'Terminales OCA', terminal_costo: A_COTIZAR,
    facturaE: false, contrato: 'A confirmar', cobertura: 'Nacional', web: '' },

  { id: 'totalnet', nombre: 'TotalNet', tipo: 'Procesador · ex VisaNet', color: '#1A1F71', modelo: 'clasica', imagen: '/img/totalnet.png',
    medios: ['debito', 'credito', 'prepaga'],
    comision_debito: A_COTIZAR, comision_credito: A_COTIZAR,
    nota: 'No publica tasas fijas.',
    liquidacion: A_COTIZAR,
    terminal_modelo: 'Terminales TotalNet', terminal_costo: A_COTIZAR,
    facturaE: false, contrato: 'A confirmar', cobertura: 'Nacional', web: '' },

  { id: 'geocom', nombre: 'Geocom', tipo: 'Procesador multiadquirente', color: '#1FA97A', modelo: 'clasica', imagen: '/img/geocom.png',
    medios: ['debito', 'credito', 'prepaga'],
    comision_debito: A_COTIZAR, comision_credito: A_COTIZAR,
    nota: 'No publica tasas fijas.',
    liquidacion: A_COTIZAR,
    terminal_modelo: 'Terminales Geocom', terminal_costo: A_COTIZAR,
    facturaE: false, contrato: 'A confirmar', cobertura: 'Nacional', web: '' },

  { id: 'fiserv', nombre: 'Fiserv', tipo: 'Procesador internacional', color: '#FF6200', modelo: 'clasica', imagen: '/img/fiserv.png',
    medios: ['debito', 'credito', 'prepaga'],
    comision_debito: A_COTIZAR, comision_credito: A_COTIZAR,
    nota: 'No publica tasas fijas. Ofrece además Débito Automático para cobros recurrentes.',
    liquidacion: A_COTIZAR,
    terminal_modelo: 'POS propio o sistema del comercio', terminal_costo: A_COTIZAR,
    facturaE: false, contrato: 'A confirmar', cobertura: 'Nacional (compañía global)', web: 'https://www.fiserv.com.uy' },
];

export const glosario = [
  { title: 'Liquidación', desc: 'Cuánto tarda en llegarte la plata de una venta. Cuanto más rápida, mejor tu flujo de caja — pero suele costar más comisión.' },
  { title: 'Multiadquirencia', desc: 'Desde 2020 podés aceptar todas las tarjetas con un solo contrato, sin atarte a una marca específica. Por eso hoy se puede comparar como en esta página.' },
  { title: 'Costo de terminal', desc: 'Algunos proveedores no cobran alquiler (lo compensan en la comisión), otros cobran una vez o por mes. Preguntá siempre el costo total.' },
  { title: 'Permanencia', desc: 'Revisá si el contrato te ata por un plazo mínimo. La mayoría del mercado uruguayo ofrece baja libre, pero conviene confirmarlo antes de firmar.' },
];
