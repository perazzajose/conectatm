import { describe, expect, test } from 'vitest';
import { lleno, itemLleno, vacio } from './vacios';

describe('qué se oculta del PDF del CV', () => {
  test('un campo con solo espacios cuenta como vacío', () => {
    expect(lleno('   ')).toBe(false);
    expect(lleno('')).toBe(false);
    expect(lleno(null)).toBe(false);
    expect(lleno(undefined)).toBe(false);
    expect(lleno('Durazno')).toBe(true);
  });

  test('un ítem con alguna tarea escrita no se oculta aunque no tenga título', () => {
    expect(itemLleno({ titulo: '', subtitulo: '', fecha: '', tareas: ['', 'Atención al público'] })).toBe(true);
  });

  test('un ítem sin nada escrito se oculta, tenga o no lista de tareas', () => {
    expect(itemLleno({ titulo: ' ', subtitulo: '', fecha: '', tareas: ['', ' '] })).toBe(false);
    expect(itemLleno({ titulo: '', subtitulo: '', fecha: '' })).toBe(false);
  });

  test('vacio() agrega la clase solo cuando no hay contenido', () => {
    expect(vacio(false)).toBe(' vacio');
    expect(vacio(true)).toBe('');
  });
});
