import { describe, expect, test } from 'vitest';
import { urlSegura } from './urls';

describe('urlSegura', () => {
  test('deja pasar enlaces https comunes', () => {
    expect(urlSegura('https://instagram.com/negocio')).toBe('https://instagram.com/negocio');
  });

  test('descarta http, javascript: y data:', () => {
    expect(urlSegura('http://sitio.com')).toBeNull();
    expect(urlSegura('javascript:alert(1)')).toBeNull();
    expect(urlSegura('data:text/html,<script>alert(1)</script>')).toBeNull();
  });

  test('descarta URLs con comillas o etiquetas metidas', () => {
    expect(urlSegura('https://x.com/"><script>alert(1)</script>')).toBeNull();
    expect(urlSegura('https://x.com/a b')).toBeNull();
  });

  test('descarta lo que no es texto', () => {
    expect(urlSegura(undefined)).toBeNull();
    expect(urlSegura(null)).toBeNull();
    expect(urlSegura(['https://x.com'])).toBeNull();
  });
});
