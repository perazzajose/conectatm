import { jsPDF } from 'jspdf';
import { lleno, itemLleno } from './vacios';

// Arma el PDF del CV a partir de los datos (no de la pantalla), con texto real:
// los ATS y el buscador de la bolsa de CVs lo pueden leer. Copia el diseño de la hoja
// (CvEditor.css, @media print): A4, columna lateral de color a la izquierda.
// El texto se escribe en el mismo orden que el PDF impreso: primero el nombre y la
// columna principal, después la lateral.

const ANCHO = 210;
const ALTO = 297;
const LATERAL = ANCHO * 0.34;
const PIE = 12; // margen inferior
const ARRIBA_SIGUIENTES = 12; // margen superior desde la página 2
const MM_POR_PT = 25.4 / 72;

const TINTA = '#2A2430';
const NOMBRE = '#22162B';
const SUAVE = '#5E5466';
const FECHA = '#857C8B';
const PERFIL = '#4A4250';

// Las fuentes estándar del PDF no tienen comillas tipográficas, guiones largos ni emojis
const limpiar = t => String(t ?? '')
  .replace(/[“”«»]/g, '"').replace(/[‘’]/g, "'")
  .replace(/[–—]/g, '-').replace(/…/g, '...').replace(/[•·]/g, '-')
  .replace(/[^\n\x20-\x7E¡-ÿ]/g, '')
  .trim();

const rgb = hex => {
  const h = hex.replace('#', '');
  return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
};
// Igual que color-mix(in srgb, color X%, #fff)
const mezclar = (hex, pct) => rgb(hex).map(c => Math.round(c * pct / 100 + 255 * (1 - pct / 100)));

export function crearPdf(d, { fotoRedonda } = {}) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const cv = /^#[0-9a-f]{6}$/i.test(d.color) ? d.color : '#2F5B3A';
  const fondoLateral = mezclar(cv, 8);
  doc.setProperties({ title: lleno(d.nombre) ? `CV ${limpiar(d.nombre)}` : 'CV', creator: 'ConectaTuMundo' });

  const pintarFondo = () => {
    doc.setFillColor(...fondoLateral);
    doc.rect(0, 0, LATERAL, ALTO, 'F');
  };
  pintarFondo();

  // Una columna escribe hacia abajo y pasa de página cuando no entra
  function columna(x, ancho, arriba) {
    let y = arriba;
    let pagina = 1;
    const col = {
      get y() { return y; },
      espacio: mm => { y += mm; },
      asegurar(alto) {
        if (y + alto <= ALTO - PIE) return;
        pagina += 1;
        if (doc.getNumberOfPages() < pagina) { doc.addPage(); pintarFondo(); }
        doc.setPage(pagina);
        y = ARRIBA_SIGUIENTES;
      },
      // Escribe un texto con salto de línea automático. Devuelve el alto usado.
      texto(t, { pt = 9.75, bold = false, color = TINTA, x: dx = 0, ancho: w = ancho - dx, interlineado = 1.4 } = {}) {
        const s = limpiar(t);
        if (!s) return;
        doc.setFont('helvetica', bold ? 'bold' : 'normal');
        doc.setFontSize(pt);
        doc.setTextColor(color);
        const alto = pt * MM_POR_PT * interlineado;
        for (const linea of doc.splitTextToSize(s, w)) {
          col.asegurar(alto);
          doc.text(linea, x + dx, y, { baseline: 'top' });
          y += alto;
        }
      },
      titulo(t) {
        col.asegurar(14);
        col.texto(String(t || '').toUpperCase(), { pt: 9.75, bold: true, color: cv });
        doc.setDrawColor(...mezclar(cv, 25));
        doc.setLineWidth(0.5);
        doc.line(x, y + 0.3, x + ancho, y + 0.3);
        y += 3.2;
      },
      // Una línea con texto a la izquierda y otro a la derecha (empresa y fecha, idioma y nivel)
      fila(izq, der, { pt = 9.75, bold = true, color = TINTA } = {}) {
        const d2 = limpiar(der);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        const anchoDer = d2 ? doc.getTextWidth(d2) + 3 : 0;
        const inicio = y;
        const paginaInicio = pagina;
        col.texto(izq, { pt, bold, color, ancho: ancho - anchoDer });
        if (d2) {
          const fin = y;
          const paginaFin = pagina;
          doc.setPage(paginaInicio);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);
          doc.setTextColor(FECHA);
          doc.text(d2, x + ancho, inicio + 0.4, { baseline: 'top', align: 'right' });
          doc.setPage(paginaFin);
          if (!lleno(izq)) y = inicio + 9 * MM_POR_PT * 1.4; else y = fin;
        }
      },
      vineta(t, { pt = 9.75, color = TINTA } = {}) {
        const s = limpiar(t);
        if (!s) return;
        const alto = pt * MM_POR_PT * 1.4;
        col.asegurar(alto);
        doc.setFillColor(cv);
        doc.circle(x + 1.1, y + alto / 2 - 0.2, 0.7, 'F');
        col.texto(s, { pt, color, x: 3.4 });
        y += 0.6;
      },
    };
    return col;
  }

  // Columna principal: nombre, cargo, perfil y experiencia
  const anchoPrincipal = ANCHO - LATERAL - 19;
  const m = columna(LATERAL + 9, anchoPrincipal, 14);
  m.texto(d.nombre, { pt: 25.5, bold: true, color: NOMBRE, interlineado: 1.1 });
  if (lleno(d.cargo)) {
    m.espacio(2.5);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.75);
    const lineas = doc.splitTextToSize(limpiar(d.cargo), anchoPrincipal - 7);
    const alto = lineas.length * 9.75 * MM_POR_PT * 1.3 + 3;
    const ancho = Math.max(...lineas.map(l => doc.getTextWidth(l))) + 7;
    doc.setFillColor(cv);
    doc.roundedRect(LATERAL + 9, m.y, ancho, alto, Math.min(alto / 2, 4), Math.min(alto / 2, 4), 'F');
    m.espacio(1.5);
    m.texto(d.cargo, { pt: 9.75, bold: true, color: '#FFFFFF', x: 3.5, ancho: anchoPrincipal - 7, interlineado: 1.3 });
    m.espacio(1.5);
  }

  if (lleno(d.perfil)) {
    m.espacio(6);
    m.titulo(d.titulos.perfil);
    m.texto(d.perfil, { pt: 10, color: PERFIL, interlineado: 1.45 });
  }

  const experiencia = d.experiencia.filter(itemLleno);
  if (experiencia.length) {
    m.espacio(6);
    m.titulo(d.titulos.experiencia);
    experiencia.forEach((it, i) => {
      if (i) m.espacio(4);
      m.asegurar(16); // que la empresa no quede sola al pie de la hoja
      m.fila(it.titulo, it.fecha, { pt: 11.25 });
      if (lleno(it.subtitulo)) { m.espacio(0.4); m.texto(it.subtitulo, { bold: true, color: cv }); }
      m.espacio(1);
      (it.tareas || []).filter(lleno).forEach(t => m.vineta(t));
    });
  }

  // Columna lateral: foto, contacto, estudios, cursos, idiomas y habilidades
  doc.setPage(1);
  const l = columna(10, LATERAL - 17, 12);
  const seccion = (titulo, dibujar) => { l.titulo(titulo); dibujar(); l.espacio(5); };

  if (fotoRedonda) {
    const lado = 32;
    doc.addImage(fotoRedonda, 'JPEG', 10 + (LATERAL - 17 - lado) / 2, l.y, lado, lado);
    l.espacio(lado + 7);
  }

  const contactos = ['telefono', 'email', 'web', 'ubicacion'].filter(c => lleno(d[c]));
  if (contactos.length) seccion(d.titulos.contacto, () => contactos.forEach(c => { l.texto(d[c], { pt: 9.25 }); l.espacio(0.8); }));

  const educacion = d.educacion.filter(itemLleno);
  if (educacion.length) seccion(d.titulos.educacion, () => educacion.forEach((it, i) => {
    if (i) l.espacio(2.5);
    l.texto(it.titulo, { bold: true });
    l.texto(it.subtitulo, { color: SUAVE });
    l.texto(it.fecha, { pt: 9, color: FECHA });
  }));

  const cursos = d.cursos.filter(itemLleno);
  if (cursos.length) seccion(d.titulos.cursos, () => cursos.forEach((it, i) => {
    if (i) l.espacio(2.5);
    l.texto(it.titulo, { bold: true });
    l.texto(it.subtitulo, { color: SUAVE });
  }));

  const idiomas = d.idiomas.filter(it => lleno(it.nombre));
  if (idiomas.length) seccion(d.titulos.idiomas, () => idiomas.forEach((it, i) => {
    if (i) l.espacio(2.5);
    l.fila(it.nombre, it.nivelTexto);
    l.asegurar(3);
    for (let n = 1; n <= 5; n += 1) {
      doc.setFillColor(...(n <= it.nivel ? rgb(cv) : rgb('#E2DDE5')));
      doc.circle(10 + 1.6 + (n - 1) * 4.4, l.y + 1.8, 1.6, 'F');
    }
    l.espacio(4);
  }));

  const habilidades = d.habilidades.filter(lleno);
  if (habilidades.length) seccion(d.titulos.habilidades, () => habilidades.forEach(h => { l.texto(h); l.espacio(0.6); }));

  return doc.output('blob');
}

// En el navegador: recorta la foto en círculo sobre el color de la columna, con el borde del color del CV
export function fotoEnCirculo(dataUrl, colorCv) {
  const color = /^#[0-9a-f]{6}$/i.test(colorCv) ? colorCv : '#2F5B3A';
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const lado = 360;
      const borde = 9;
      const c = document.createElement('canvas');
      c.width = c.height = lado;
      const ctx = c.getContext('2d');
      const [r, g, b] = mezclar(color, 8);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(0, 0, lado, lado);
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(lado / 2, lado / 2, lado / 2, 0, Math.PI * 2); ctx.fill();
      ctx.save();
      ctx.beginPath(); ctx.arc(lado / 2, lado / 2, lado / 2 - borde, 0, Math.PI * 2); ctx.clip();
      const corte = Math.min(img.width, img.height);
      ctx.drawImage(img, (img.width - corte) / 2, (img.height - corte) / 2, corte, corte, 0, 0, lado, lado);
      ctx.restore();
      resolve(c.toDataURL('image/jpeg', 0.9));
    };
    img.onerror = () => resolve(null); // sin foto antes que sin PDF
    img.src = dataUrl;
  });
}
