import { describe, expect, test } from 'vitest';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import { crearPdf } from './pdfCv';
import { nombreArchivo } from './archivo';
import { EJEMPLOS } from './ejemplos';
import { CV_VACIO } from './useCV';

async function textoDe(blob) {
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await blob.arrayBuffer()), verbosity: 0 }).promise;
  const paginas = [];
  for (let n = 1; n <= doc.numPages; n += 1) {
    const { items } = await (await doc.getPage(n)).getTextContent();
    paginas.push(items.map(i => i.str).join(' '));
  }
  return { texto: paginas.join(' '), paginas: doc.numPages };
}

describe('nombre del archivo', () => {
  test('CV_ y el nombre que escribió la persona', () => {
    expect(nombreArchivo('Lucía Fernández')).toBe('CV_Lucia_Fernandez.pdf');
    expect(nombreArchivo('  María José  Peña ')).toBe('CV_Maria_Jose_Pena.pdf');
  });
  test('sin nombre queda CV.pdf', () => {
    expect(nombreArchivo('')).toBe('CV.pdf');
    expect(nombreArchivo('  ')).toBe('CV.pdf');
  });
});

describe('PDF del CV', () => {
  // Los ATS y el buscador de la bolsa leen el texto en el orden en que está escrito
  test('tiene texto real, arranca por el nombre y cada cosa queda bajo su sección', async () => {
    const { texto } = await textoDe(crearPdf(EJEMPLOS[0].data));
    const pos = t => texto.indexOf(t);
    expect(texto.trim().startsWith('Lucía Fernández')).toBe(true);
    const orden = ['EXPERIENCIA', 'Tienda de ropa del centro', 'Manejo de caja', 'Supermercado de barrio',
      'EDUCACIÓN', 'Bachillerato completo', 'CURSOS', 'Excel básico', 'IDIOMAS', 'Español', 'HABILIDADES', 'Caja y cobros'];
    for (const t of orden) expect(pos(t), t).toBeGreaterThan(-1);
    expect(orden.map(pos)).toEqual(orden.map(pos).toSorted((a, b) => a - b));
  });

  test('las secciones vacías no salen', async () => {
    const { texto } = await textoDe(crearPdf({ ...CV_VACIO, nombre: 'Ana Pérez', telefono: '099 123 456' }));
    expect(texto).toContain('Ana Pérez');
    expect(texto).toContain('099 123 456');
    for (const t of ['EXPERIENCIA', 'EDUCACIÓN', 'CURSOS', 'IDIOMAS', 'HABILIDADES', 'PERFIL']) expect(texto).not.toContain(t);
  });

  test('si no entra en una hoja, sigue en otra sin perder nada', async () => {
    const tareas = Array.from({ length: 6 }, (_, i) => `Tarea número ${i + 1} con una descripción bastante larga para ocupar más de una línea en la hoja.`);
    const experiencia = Array.from({ length: 8 }, (_, i) => ({ id: `e${i}`, titulo: `Empresa ${i + 1}`, subtitulo: 'Puesto', fecha: '2020 – 2021', tareas }));
    const { texto, paginas } = await textoDe(crearPdf({ ...EJEMPLOS[0].data, experiencia }));
    expect(paginas).toBeGreaterThan(1);
    expect(texto).toContain('Empresa 8');
  });

  test('las comillas y guiones del celular no rompen el texto', async () => {
    const { texto } = await textoDe(crearPdf({ ...CV_VACIO, nombre: 'Ana', perfil: 'Busco trabajo “de tarde” – medio horario 😀' }));
    expect(texto).toContain('Busco trabajo "de tarde" - medio horario');
  });
});
