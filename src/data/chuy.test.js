import { describe, expect, test } from 'vitest';
import { TEMAS, LUGARES, FUENTES, CON_PIX } from './chuy';

describe('guía del Chuy', () => {
  test('cada tema y cada lugar cita fuentes que existen', () => {
    for (const t of [...TEMAS, ...LUGARES]) {
      expect(t.fuentes.length, t.pregunta ?? t.nombre).toBeGreaterThan(0);
      for (const f of t.fuentes) expect(FUENTES, `${f} en ${t.pregunta ?? t.nombre}`).toHaveProperty([f]);
    }
  });

  test('los que cobran con Pix salen del comparador de POS', () => {
    expect(CON_PIX.length).toBeGreaterThan(0);
    const pix = TEMAS.find(t => t.id === 'pix').parrafos.join(' ');
    for (const p of CON_PIX) expect(pix).toContain(p.nombre);
  });

  test('ids únicos para los enlaces del índice', () => {
    const ids = TEMAS.map(t => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
