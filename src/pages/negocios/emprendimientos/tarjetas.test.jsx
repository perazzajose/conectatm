import { describe, expect, test } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import EmpCard from './EmpCard';
import TutorCard from '../../laboral/tutores/TutorCard';

// Lo que llega de Firestore se muestra tal cual: si alguien carga datos maliciosos,
// no tienen que convertirse en HTML, scripts ni imágenes por http.
const malicioso = {
  nombre: '<img src=x onerror=alert(1)>',
  rubro: '<script>alert(1)</script>',
  imagenUrl: 'javascript:alert(1)',
  portadaUrl: 'http://rastreo.example/pixel.png',
  servicios: ['<b>negrita</b>'],
};

describe('tarjetas con datos maliciosos de Firestore', () => {
  test('EmpCard muestra el texto escapado y no usa URLs que no sean https', () => {
    const html = renderToStaticMarkup(<EmpCard emp={malicioso} onPreview={() => {}} />);
    expect(html).not.toContain('<script>');
    expect(html).not.toContain('<img src=x');
    expect(html).toContain('&lt;script&gt;');
    expect(html).not.toContain('javascript:');
    expect(html).not.toContain('rastreo.example');
  });

  test('EmpCard sí muestra las imágenes https', () => {
    const html = renderToStaticMarkup(
      <EmpCard emp={{ nombre: 'Panadería', imagenUrl: 'https://ok.example/logo.png', portadaUrl: 'https://ok.example/portada.jpg' }} onPreview={() => {}} />,
    );
    expect(html).toContain('src="https://ok.example/logo.png"');
    expect(html).toContain('https://ok.example/portada.jpg');
  });

  test('TutorCard tampoco usa imágenes que no sean https', () => {
    const html = renderToStaticMarkup(<TutorCard tutor={{ nombre: 'Ana', imagenUrl: 'javascript:alert(1)', materias: ['Inglés'] }} index={0} />);
    expect(html).not.toContain('javascript:');
    expect(html).toContain('Ana');
  });
});
