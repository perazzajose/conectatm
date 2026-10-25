import { existsSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import { ESTUDIOS, ZONAS, TIPOS } from './estudios';

const zonas = ZONAS.map(z => z.id);
const tipos = TIPOS.map(t => t.id);

describe('opciones de Estudios', () => {
  test('cada opción tiene id único', () => {
    expect(new Set(ESTUDIOS.map(e => e.id)).size).toBe(ESTUDIOS.length);
  });

  test('tipo y zonas son de las listas conocidas (si no, el filtro las esconde)', () => {
    for (const e of ESTUDIOS) {
      expect(tipos, e.id).toContain(e.tipo);
      expect(e.zonas.length, e.id).toBeGreaterThan(0);
      for (const z of e.zonas) expect(zonas, e.id).toContain(z);
    }
  });

  test('las sedes solo nombran zonas donde está la opción', () => {
    for (const e of ESTUDIOS) {
      for (const z of Object.keys(e.sedes ?? {})) expect(e.zonas, `${e.id}: sede en ${z}`).toContain(z);
    }
  });

  test('todas mandan a un sitio con https', () => {
    for (const e of ESTUDIOS) expect(e.url, e.id).toMatch(/^https:\/\//);
  });

  test('cada logo existe en public/', () => {
    for (const e of ESTUDIOS.filter(x => x.logo)) {
      expect(existsSync(new URL(`../../public${e.logo}`, import.meta.url)), `${e.id}: ${e.logo}`).toBe(true);
    }
  });

  test('cada zona donde trabaja José tiene opciones', () => {
    for (const z of ['durazno', 'rocha', 'montevideo']) {
      expect(ESTUDIOS.filter(e => e.zonas.includes(z)).length, z).toBeGreaterThanOrEqual(5);
    }
  });
});
