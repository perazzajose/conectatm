import { describe, expect, test } from 'vitest';
import { validar, esPdf, type Campos } from './index';

const base: Campos = {
  nombre: 'Lucía Fernández', email: 'lucia@mail.com', telefono: '', ciudad: 'Durazno',
  puesto: 'Ventas', habilidades: ['Excel'], texto: '',
};
const con = (cambios: Partial<Campos>) => validar({ ...base, ...cambios });

describe('validación de la subida de CVs', () => {
  test('un CV completo pasa', () => {
    expect(validar(base)).toBeNull();
  });

  test('alcanza con email o con teléfono, pero hace falta uno', () => {
    expect(con({ email: '', telefono: '099 123 456' })).toBeNull();
    expect(con({ email: '  ', telefono: '' })).toBe('contacto');
  });

  test('rechaza emails y teléfonos que no lo son', () => {
    expect(con({ email: 'lucia@' })).toBe('email');
    expect(con({ email: 'no es un email' })).toBe('email');
    expect(con({ email: '', telefono: 'llamame' })).toBe('telefono');
    expect(con({ email: '', telefono: '+598 99 123 456' })).toBeNull();
  });

  test('el nombre tiene entre 2 y 120 caracteres', () => {
    expect(con({ nombre: 'L' })).toBe('nombre');
    expect(con({ nombre: 'x'.repeat(121) })).toBe('nombre');
  });

  test('la ciudad tiene que ser una de la lista', () => {
    expect(con({ ciudad: 'Salto' })).toBe('ciudad');
    expect(con({ ciudad: 'Otra' })).toBeNull();
  });

  test('limita la cantidad y el largo de las habilidades', () => {
    expect(con({ habilidades: Array.from({ length: 31 }, (_, i) => `h${i}`) })).toBe('habilidades');
    expect(con({ habilidades: ['x'.repeat(61)] })).toBe('habilidades');
  });
});

describe('detección de PDF', () => {
  const bytes = (s: string) => new TextEncoder().encode(s);
  test('reconoce un PDF por su encabezado, no por la extensión', () => {
    expect(esPdf(bytes('%PDF-1.7\n...'))).toBe(true);
    expect(esPdf(bytes('<html>no soy un pdf</html>'))).toBe(false);
    expect(esPdf(new Uint8Array())).toBe(false);
  });
});
