import { describe, expect, test } from 'vitest';
import { recomendar } from './recomendar';
import { PROVEEDORES } from '../../../data/posProveedores';

const nombres = lista => lista.map(x => (x.p ?? x).nombre);

describe('recomendador de POS', () => {
  test('a un almacén con caja que necesita factura le recomienda Handy y Getnet', () => {
    const r = recomendar({ medios: ['tarjeta'], negocio: 'caja', factura: 'si', rapidez: 'espera' });
    expect(nombres(r.destacados)).toEqual(['Handy', 'Getnet']);
    expect(r.empate).toBe(false);
  });

  test('a quien vende a domicilio y necesita la plata rápido le recomienda Mercado Pago y TotalNet', () => {
    const r = recomendar({ medios: ['tarjeta'], negocio: 'chico', factura: 'no', rapidez: 'ya' });
    expect(nombres(r.destacados)).toEqual(['Mercado Pago', 'TotalNet']);
  });

  test('con turistas que pagan con Pix solo quedan los que aceptan Pix', () => {
    const r = recomendar({ medios: ['tarjeta', 'pix'], negocio: 'local', factura: 'no', rapidez: 'espera' });
    expect(nombres(r.destacados)).toEqual(['Fiserv', 'Handy']);
    expect(r.tambien).toEqual([]);
  });

  test('si ninguna respuesta los diferencia, avisa empate y no destaca a nadie', () => {
    const r = recomendar({ medios: ['tarjeta'], negocio: 'local', factura: 'no', rapidez: 'espera' });
    expect(r.empate).toBe(true);
    expect(r.destacados).toEqual([]);
    expect(r.tambien.length).toBeGreaterThan(2);
  });

  test('sin respuestas también es empate (no favorece a nadie por orden)', () => {
    expect(recomendar({}).empate).toBe(true);
  });

  test('todo lo recomendado acepta los medios de pago pedidos', () => {
    const r = recomendar({ medios: ['qr', 'link'], negocio: 'chico' });
    for (const p of [...r.destacados.map(d => d.p), ...r.tambien]) {
      expect(p.medios).toEqual(expect.arrayContaining(['qr', 'link']));
    }
  });

  test('nunca recomienda a quien no procesa pagos (Geocom)', () => {
    const noProcesan = PROVEEDORES.filter(p => !p.procesaPagos).map(p => p.nombre);
    expect(noProcesan).toContain('Geocom');
    const todos = [{}, { medios: ['tarjeta'], negocio: 'caja', factura: 'si' }, { medios: ['qr'] }].flatMap(resp => {
      const r = recomendar(resp);
      return [...nombres(r.destacados), ...nombres(r.tambien)];
    });
    for (const n of noProcesan) expect(todos).not.toContain(n);
  });
});
