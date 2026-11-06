import { describe, expect, test } from 'vitest';
import { POS_FAQ, datosFaq } from './posFaq';
import { PROVEEDORES, TOPES } from './posProveedores';

// Las respuestas no pueden traer datos que el comparador no tiene
const fuente = JSON.stringify({ PROVEEDORES, TOPES });

describe('preguntas frecuentes del comparador de POS', () => {
  test('cada número de las respuestas está en los datos del comparador', () => {
    for (const { q, a } of POS_FAQ) {
      for (const n of a.match(/\d[\d.,]*%?/g) ?? []) {
        const limpio = n.replace(/[.,]$/, '');
        expect(fuente.includes(limpio), `"${limpio}" en "${q}"`).toBe(true);
      }
    }
  });

  test('cada proveedor nombrado existe en el comparador', () => {
    const nombres = PROVEEDORES.map(p => p.nombre.split(' ')[0]);
    for (const { a } of POS_FAQ) {
      for (const marca of ['Handy', 'Getnet', 'OCA', 'Mercado', 'TotalNet', 'Scanntech', 'Fiserv', 'Geocom']) {
        if (a.includes(marca)) expect(nombres).toContain(marca);
      }
    }
  });

  test('respuestas cortas (2 o 3 líneas) y sin datos vacíos', () => {
    for (const { q, a } of POS_FAQ) {
      expect(a.length, q).toBeLessThanOrEqual(480);
      expect(a, q).not.toMatch(/undefined|null|NaN/);
    }
  });

  test('el JSON-LD tiene una pregunta por cada una visible', () => {
    const d = datosFaq();
    expect(d['@type']).toBe('FAQPage');
    expect(d.mainEntity.map(e => e.name)).toEqual(POS_FAQ.map(f => f.q));
  });
});
