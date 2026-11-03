// Nombre con el que se guarda el PDF: CV_Nombre_Apellido.pdf.
// Sin tildes ni símbolos, para que no se rompa al mandarlo por WhatsApp o por mail.
export function nombreArchivo(nombre) {
  const limpio = String(nombre || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  return limpio ? `CV_${limpio}.pdf` : 'CV.pdf';
}
