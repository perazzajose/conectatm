import { test, expect } from '@playwright/test';

const elegirModo = (page, nombre) => page.getByRole('radio', { name: nombre }).click();
// En modo paso a paso la hoja sigue en la página (oculta, para el PDF): buscamos dentro del formulario
const formulario = page => page.locator('.cv-pasos');
const irAPaso = (page, nombre) => formulario(page).getByRole('list', { name: 'Pasos' }).getByRole('button', { name: nombre }).click();

test.describe('editor de CV, sobre la hoja', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/laboral/cv');
    await elegirModo(page, 'Sobre la hoja');
  });

  test('cargar un ejemplo completa la hoja y queda guardado al recargar', async ({ page }) => {
    const nombre = page.getByLabel('Tu nombre y apellido');
    await expect(nombre).toHaveValue('');

    await page.getByRole('button', { name: /Con experiencia/ }).click();
    await expect(nombre).toHaveValue('Lucía Fernández');

    await page.reload();
    await expect(nombre).toHaveValue('Lucía Fernández');
  });

  test('lo que escribís se guarda solo en este navegador y "Borrar todo" lo limpia', async ({ page }) => {
    const nombre = page.getByLabel('Tu nombre y apellido');
    await nombre.fill('Ana Pérez');
    await page.reload();
    await expect(nombre).toHaveValue('Ana Pérez');

    page.once('dialog', d => d.accept());
    await page.getByRole('button', { name: 'Borrar todo' }).click();
    await expect(nombre).toHaveValue('');
  });

  test('si cancelás "Borrar todo", no se pierde nada', async ({ page }) => {
    const nombre = page.getByLabel('Tu nombre y apellido');
    await nombre.fill('Ana Pérez');
    page.once('dialog', d => d.dismiss());
    await page.getByRole('button', { name: 'Borrar todo' }).click();
    await expect(nombre).toHaveValue('Ana Pérez');
  });

  test('en celular el nombre va antes que los datos de contacto', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'el orden solo cambia en celular');
    const nombre = await page.getByLabel('Tu nombre y apellido').boundingBox();
    const telefono = await page.getByLabel('Teléfono').boundingBox();
    expect(nombre.y).toBeLessThan(telefono.y);
  });

  test('los campos tienen letra de 16px o más en celular (si no, el iPhone hace zoom)', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'solo aplica en celular');
    const tamano = await page.getByLabel('Tu nombre y apellido').evaluate(el => parseFloat(getComputedStyle(el).fontSize));
    const cargo = await page.getByLabel('A qué te dedicás o qué buscás').evaluate(el => parseFloat(getComputedStyle(el).fontSize));
    expect(tamano).toBeGreaterThanOrEqual(16);
    expect(cargo).toBeGreaterThanOrEqual(16);
  });

  // Los ATS leen el texto del PDF en el orden en que está escrito, no como se ve.
  // Tiene que arrancar por el nombre y cada ítem tiene que quedar bajo su sección.
  test('el texto del PDF sale en orden para los ATS', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'page.pdf solo existe en Chromium');
    await page.getByRole('button', { name: /Con experiencia/ }).click();
    await page.emulateMedia({ media: 'print' });
    const pdf = await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true });

    const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
    const doc = await pdfjs.getDocument({ data: new Uint8Array(pdf) }).promise;
    const { items } = await (await doc.getPage(1)).getTextContent();
    const texto = items.map(i => i.str).join(' ');
    const pos = t => texto.indexOf(t);

    expect(texto.trim().startsWith('Lucía Fernández')).toBe(true);
    const orden = ['EXPERIENCIA', 'Tienda de ropa del centro', 'Manejo de caja', 'Supermercado de barrio',
      'EDUCACIÓN', 'Bachillerato completo', 'CURSOS', 'Excel básico', 'IDIOMAS', 'Español', 'HABILIDADES'];
    for (const t of orden) expect(pos(t), t).toBeGreaterThan(-1);
    expect(orden.map(pos)).toEqual(orden.map(pos).toSorted((a, b) => a - b));
  });
});

test.describe('editor de CV, paso a paso', () => {
  test('en celular arranca paso a paso y en compu sobre la hoja', async ({ page, isMobile }) => {
    await page.goto('/laboral/cv');
    await expect(page.getByRole('radio', { name: isMobile ? 'Paso a paso' : 'Sobre la hoja' })).toHaveAttribute('aria-checked', 'true');
  });

  test('lo que completás en el formulario aparece en la hoja, y al revés', async ({ page }) => {
    await page.goto('/laboral/cv');
    await elegirModo(page, 'Paso a paso');
    const pasos = formulario(page);
    await pasos.getByLabel('Nombre y apellido').fill('Ana Pérez');
    await pasos.getByLabel('Teléfono').fill('099 123 456');

    await elegirModo(page, 'Sobre la hoja');
    await expect(page.getByLabel('Tu nombre y apellido')).toHaveValue('Ana Pérez');
    await expect(page.getByLabel('Teléfono')).toHaveValue('099 123 456');

    await page.getByLabel('Tu nombre y apellido').fill('Ana María Pérez');
    await elegirModo(page, 'Paso a paso');
    await expect(formulario(page).getByLabel('Nombre y apellido')).toHaveValue('Ana María Pérez');
  });

  test('las tareas, una por línea, quedan como lista en la hoja', async ({ page }) => {
    await page.goto('/laboral/cv');
    await elegirModo(page, 'Paso a paso');
    await irAPaso(page, /Experiencia/);
    await formulario(page).getByRole('button', { name: 'Agregar un trabajo' }).click();
    await formulario(page).getByLabel('Empresa o lugar').fill('Supermercado del barrio');
    await formulario(page).getByLabel('¿Qué hacías o qué lograste?').fill('Atención al público\nManejo de caja');

    await elegirModo(page, 'Sobre la hoja');
    const tareas = page.getByLabel('Qué hacías o qué lograste');
    await expect(tareas).toHaveCount(2);
    await expect(tareas.nth(1)).toHaveValue('Manejo de caja');
  });

  test('avisa si el email está mal y qué falta antes de descargar', async ({ page }) => {
    await page.goto('/laboral/cv');
    await elegirModo(page, 'Paso a paso');
    await formulario(page).getByLabel('Email').fill('ana@gmail');
    await expect(page.getByText('Al email parece que le falta algo')).toBeVisible();

    await irAPaso(page, /Listo/);
    await expect(page.getByText(/te conviene sumar: tu nombre, revisar el email/)).toBeVisible();
  });

  test('se recuerda el modo elegido', async ({ page }) => {
    await page.goto('/laboral/cv');
    await elegirModo(page, 'Paso a paso');
    await page.reload();
    await expect(page.getByRole('radio', { name: 'Paso a paso' })).toHaveAttribute('aria-checked', 'true');
  });

  test('aunque estés en el formulario, el PDF sale de la hoja', async ({ page }) => {
    await page.goto('/laboral/cv');
    await elegirModo(page, 'Paso a paso');
    await formulario(page).getByLabel('Nombre y apellido').fill('Ana Pérez');
    await expect(page.locator('#cv-hoja')).toBeHidden();

    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('#cv-hoja')).toBeVisible();
    await expect(page.locator('.cv-pasos')).toBeHidden();
  });
});
