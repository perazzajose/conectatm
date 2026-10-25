import { test, expect } from '@playwright/test';

// La Edge Function se simula: probamos lo que ve la persona en cada respuesta, sin tocar Supabase
const PDF = { name: 'cv.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4\n%prueba\n') };

async function completar(page) {
  await page.getByLabel('Tu CV en PDF').setInputFiles(PDF);
  await page.getByLabel('Nombre y apellido').fill('Ana Pérez');
  await page.getByLabel('Email').fill('ana@ejemplo.com');
  await page.getByLabel('¿Dónde vivís?').selectOption('Durazno');
  await page.getByRole('checkbox').check();
}

test.describe('subir CV a la bolsa', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/laboral/subir');
    const sinConfigurar = page.getByText('La bolsa de CVs se está terminando de configurar');
    test.skip(await sinConfigurar.isVisible(), 'compilado sin las claves de Supabase');
  });

  test('si se sube bien, muestra el enlace para borrarlo', async ({ page }) => {
    await page.route('**/functions/v1/subir-cv', route => route.fulfill({ json: { id: 'abc', token_borrado: 'tok' } }));
    await completar(page);
    await page.getByRole('button', { name: 'Subir mi CV' }).click();
    await expect(page.getByRole('heading', { name: 'Tu CV ya está en la bolsa' })).toBeVisible();
    await expect(page.getByLabel('Enlace para borrar tu CV')).toHaveValue(/\/laboral\/subir\?borrar=abc:tok$/);
  });

  test('si ya subió uno hoy, se lo explica en palabras', async ({ page }) => {
    await page.route('**/functions/v1/subir-cv', route => route.fulfill({ status: 429, json: { error: 'repetido' } }));
    await completar(page);
    await page.getByRole('button', { name: 'Subir mi CV' }).click();
    await expect(page.getByRole('alert')).toHaveText(/Ya subiste un CV con ese email o teléfono hoy/);
    await expect(page.getByRole('button', { name: 'Subir mi CV' })).toBeEnabled();
  });

  test('sin email ni teléfono no llega a enviar', async ({ page }) => {
    let enviado = false;
    await page.route('**/functions/v1/subir-cv', route => { enviado = true; return route.fulfill({ json: {} }); });
    await completar(page);
    await page.getByLabel('Email').fill('');
    await page.getByRole('button', { name: 'Subir mi CV' }).click();
    await expect(page.getByRole('alert')).toHaveText(/Dejá un email o un teléfono/);
    expect(enviado).toBe(false);
  });
});
