import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import { PAGINAS, datosMiga, urlAbsoluta } from './seo';
import { DEPARTAMENTOS } from './departamentos';

// Rutas fijas declaradas en App.jsx (sin las redirecciones, la de departamento ni la de 404)
const rutasApp = [...readFileSync(new URL('../App.jsx', import.meta.url), 'utf8')
  .matchAll(/<Route path="([^"]+)" element=\{<(?!Navigate)/g)]
  .map(m => m[1])
  .filter(r => r !== '*' && !r.includes(':'));

describe('fichas de SEO', () => {
  test('cada ruta de App.jsx tiene ficha (si falta, en producción da 404)', () => {
    expect(rutasApp.length).toBeGreaterThan(10);
    for (const r of rutasApp) expect(PAGINAS, `falta ${r} en src/data/seo.js`).toHaveProperty([r]);
  });

  test('hay una página por cada departamento', () => {
    for (const d of DEPARTAMENTOS) expect(PAGINAS).toHaveProperty([`/${d.id}`]);
  });

  test('títulos de hasta 60 caracteres y descripciones de 50 a 165, para que Google no los corte', () => {
    for (const [ruta, p] of Object.entries(PAGINAS)) {
      expect(p.titulo.length, `título de ${ruta}`).toBeLessThanOrEqual(60);
      expect(p.descripcion.length, `descripción de ${ruta}`).toBeLessThanOrEqual(165);
      if (!p.noindex) expect(p.descripcion.length, `descripción de ${ruta}`).toBeGreaterThanOrEqual(50);
    }
  });

  test('no hay dos páginas indexables con el mismo título', () => {
    const titulos = Object.values(PAGINAS).filter(p => !p.noindex).map(p => p.titulo);
    expect(new Set(titulos).size).toBe(titulos.length);
  });

  test('el padre de cada página existe', () => {
    for (const [ruta, p] of Object.entries(PAGINAS)) {
      if (p.padre) expect(PAGINAS, `padre de ${ruta}`).toHaveProperty([p.padre]);
    }
  });
});

describe('miga de pan para buscadores', () => {
  test('arma Inicio > Trabajo > Armá tu CV con URLs absolutas', () => {
    const miga = datosMiga('/laboral/cv');
    expect(miga.itemListElement.map(i => i.name)).toEqual(['Inicio', 'Trabajo', 'Armá tu CV']);
    expect(miga.itemListElement.map(i => i.position)).toEqual([1, 2, 3]);
    expect(miga.itemListElement[2].item).toBe('https://conectatumundo.net/laboral/cv');
  });

  test('la home y las rutas desconocidas no llevan miga', () => {
    expect(datosMiga('/')).toBeNull();
    expect(datosMiga('/no-existe')).toBeNull();
  });

  test('la URL de la home termina en barra y las demás no', () => {
    expect(urlAbsoluta('/')).toBe('https://conectatumundo.net/');
    expect(urlAbsoluta('/faq')).toBe('https://conectatumundo.net/faq');
  });
});
