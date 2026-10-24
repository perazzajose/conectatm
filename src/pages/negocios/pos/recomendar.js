import { PROVEEDORES, MEDIOS_LABEL } from '../../../data/posProveedores';

// Recomendador de POS. Reglas:
// - Solo se recomienda lo que está confirmado en los datos (un medio de pago sin confirmar no califica).
// - Un dato desconocido es neutro: no suma ni resta. Así no gana "el que publica más", sino el que encaja.
// - Los empatados se muestran todos, y los demás que cumplen se nombran igual.
export const PREGUNTAS = [
  {
    id: 'medios',
    titulo: '¿Cómo te pagan tus clientes?',
    ayuda: 'Podés marcar más de una.',
    multiple: true,
    opciones: [
      { value: 'tarjeta', label: 'Con tarjeta, en el local' },
      { value: 'qr', label: 'Con QR o billetera (Mercado Pago, Prex…)' },
      { value: 'link', label: 'A distancia, por WhatsApp, redes o web' },
      { value: 'pix', label: 'Turistas de Brasil, con Pix' },
    ],
  },
  {
    id: 'negocio',
    titulo: '¿Cómo es tu negocio?',
    opciones: [
      { value: 'chico', label: 'Recién empiezo o vendo en la calle, ferias o a domicilio' },
      { value: 'local', label: 'Local con mostrador' },
      { value: 'caja', label: 'Almacén, autoservicio o tienda con sistema de caja' },
    ],
  },
  {
    id: 'factura',
    titulo: '¿Necesitás emitir factura electrónica desde el mismo sistema?',
    opciones: [
      { value: 'si', label: 'Sí, la necesito' },
      { value: 'no', label: 'No, ya la resuelvo aparte' },
    ],
  },
  {
    id: 'rapidez',
    titulo: '¿Cuándo necesitás tener la plata?',
    opciones: [
      { value: 'ya', label: 'En 24 horas o menos' },
      { value: 'espera', label: 'Puedo esperar los plazos normales' },
    ],
  },
];

const MEDIOS_REQUERIDOS = { tarjeta: ['debito', 'credito'], qr: ['qr'], link: ['link'], pix: ['pix'] };

function evaluar(p, { medios = [], negocio, factura, rapidez }) {
  let puntos = 0;
  const motivos = [];
  const pendientes = [];

  if (medios.includes('qr')) motivos.push('Acepta QR y billeteras.');
  if (medios.includes('link')) motivos.push('Permite cobrar a distancia o vender online.');
  if (medios.includes('pix')) motivos.push('Acepta Pix de turistas brasileños.');

  if (negocio === 'chico' && p.sinTerminal) { puntos += 2; motivos.push('Podés cobrar con el celular, sin comprar terminal.'); }
  if (negocio === 'caja') {
    if (p.sistemaCaja === 'propio') { puntos += 3; motivos.push('Ofrece su propio sistema de caja junto con el cobro.'); }
    else if (p.sistemaCaja === 'integra') { puntos += 2; motivos.push('Se integra con sistemas de caja.'); }
  }

  if (factura === 'si') {
    if (p.facturaE === true) { puntos += 3; motivos.push('Emite factura electrónica desde su sistema.'); }
    else if (p.facturaE === false) motivos.push('No emite factura electrónica: la vas a resolver aparte.');
    else pendientes.push('si integra con tu factura electrónica');
  }

  if (rapidez === 'ya') {
    if (p.liquidaRapido === true) { puntos += 2; motivos.push(`Liquidación: ${p.liquidacion}.`); }
    else if (p.liquidaRapido === null) pendientes.push('el plazo de liquidación');
  }

  if (p.permanenciaLibre === true) motivos.push(`Contrato: ${p.contrato.toLowerCase()}.`);
  if (p.comision_debito === null) pendientes.push('las comisiones');

  if (motivos.length === 0) motivos.push(`Acepta: ${p.medios.map(m => MEDIOS_LABEL[m]).join(', ')}.`);
  return { p, puntos, motivos, pendientes };
}

// Devuelve { destacados, tambien, empate }:
//   destacados  los que mejor encajan (con todos los empatados)
//   tambien     el resto de los que cumplen con los medios de pago pedidos
//   empate      true si ninguno se diferencia con esas respuestas (entonces no se destaca a nadie)
export function recomendar(respuestas) {
  const requeridos = (respuestas.medios || []).flatMap(m => MEDIOS_REQUERIDOS[m]);
  const candidatos = PROVEEDORES
    .filter(p => p.procesaPagos && requeridos.every(m => p.medios.includes(m)))
    .map(p => evaluar(p, respuestas))
    // A igual puntaje, orden alfabético: estable y sin favorecer a nadie
    .sort((a, b) => b.puntos - a.puntos || a.p.nombre.localeCompare(b.p.nombre, 'es'));

  if (candidatos.length === 0) return { destacados: [], tambien: [], empate: false };

  // Si todos sacan lo mismo, ninguna respuesta los diferencia: destacar a algunos sería arbitrario
  const empate = candidatos.length > 2 && candidatos.every(c => c.puntos === candidatos[0].puntos);
  if (empate) return { destacados: [], tambien: candidatos.map(c => c.p), empate: true };

  // Se destacan los que alcanzan el puntaje del 2.º mejor (así un empate nunca deja a nadie afuera)
  const corte = candidatos[Math.min(1, candidatos.length - 1)].puntos;
  const destacados = candidatos.filter(c => c.puntos >= corte);
  const tambien = candidatos.filter(c => !destacados.includes(c)).map(c => c.p);
  return { destacados, tambien, empate: false };
}
