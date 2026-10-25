import { describe, expect, test } from 'vitest';
import { DEPARTAMENTOS, enlacesPortales, limpiarUbicacion } from './departamentos';

describe('departamentos', () => {
  test('están los 19, sin repetir, y los tres donde trabaja José van primero', () => {
    expect(DEPARTAMENTOS).toHaveLength(19);
    expect(new Set(DEPARTAMENTOS.map(d => d.id)).size).toBe(19);
    expect(DEPARTAMENTOS.slice(0, 3).map(d => d.id)).toEqual(['durazno', 'rocha', 'montevideo']);
  });

  test('los ids sirven como URL (/durazno, /treinta-y-tres)', () => {
    for (const d of DEPARTAMENTOS) expect(d.id).toMatch(/^[a-z]+(-[a-z]+)*$/);
  });

  test('el enlace de BuscoJobs usa el id de cada departamento', () => {
    const rocha = DEPARTAMENTOS.find(d => d.id === 'rocha');
    const bj = enlacesPortales(rocha).find(e => e.portal === 'BuscoJobs');
    expect(bj.url).toBe('https://www.buscojobs.com.uy/ofertas/rd445/trabajo-en-rocha');
  });
});

describe('limpiarUbicacion', () => {
  test('saca el "Departamento de…" que repite Google', () => {
    expect(limpiarUbicacion('Durazno, Departamento de Durazno')).toBe('Durazno');
    expect(limpiarUbicacion('Sarandí del Yí, Departamento de Durazno')).toBe('Sarandí del Yí');
  });

  test('deja igual lo que no lo tiene', () => {
    expect(limpiarUbicacion('Montevideo')).toBe('Montevideo');
  });

  test('si no queda nada o no hay dato, devuelve null', () => {
    expect(limpiarUbicacion('Departamento de Rocha')).toBeNull();
    expect(limpiarUbicacion(null)).toBeNull();
    expect(limpiarUbicacion(undefined)).toBeNull();
  });
});
