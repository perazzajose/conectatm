// Extrae el texto de un PDF en el navegador para que el buscador de reclutadores pueda encontrarlo.
// pdf.js pesa bastante: se carga recién cuando alguien sube un archivo.
const MAX_PAGINAS = 6;

export default async function leerPdf(file) {
  const [pdfjs, { default: workerUrl }] = await Promise.all([
    import('pdfjs-dist'),
    import('pdfjs-dist/build/pdf.worker.min.mjs?url'),
  ]);
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

  const doc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  const paginas = [];
  for (let n = 1; n <= Math.min(doc.numPages, MAX_PAGINAS); n++) {
    const pagina = await doc.getPage(n);
    const { items } = await pagina.getTextContent();
    paginas.push(items.map(i => i.str).join(' '));
  }
  return paginas.join('\n').replace(/\s+/g, ' ').trim();
}
