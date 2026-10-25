import { test, expect } from '@playwright/test';

// Las ofertas vienen de Supabase: en los tests respondemos con datos fijos, sin red
test.beforeEach(async ({ page }) => {
  await page.route('**/rest/v1/ofertas_externas**', route => route.fulfill({ json: [] }));
});

test('una dirección que no existe devuelve 404 y lo dice', async ({ page }) => {
  const res = await page.goto('/esto-no-existe');
  expect(res.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'Esta página no existe' })).toBeVisible();
});

test('las rutas viejas llevan a las nuevas', async ({ page }) => {
  await page.goto('/pos');
  await expect(page).toHaveURL(/\/negocios\/pos$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('POS');
});

test('cada página llega con su título y su H1 en el HTML (sin esperar a JavaScript)', async ({ request }) => {
  const html = await (await request.get('/negocios/pos')).text();
  expect(html).toContain('<title>¿Qué POS me conviene? Comparador de POS en Uruguay</title>');
  expect(html).toMatch(/<h1[^>]*>¿Con qué POS te conviene cobrar\?/);
  expect(html).not.toContain('cargando-pagina');
});

test('la página de un departamento dice dónde trabaja José', async ({ page }) => {
  await page.goto('/rocha');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Desarrollo web y herramientas digitales en Rocha');
  const bajada = () => page.locator('.page-header-sub');
  await expect(bajada()).toContainText('Trabajo en persona en Rocha');

  await page.goto('/artigas');
  await expect(bajada()).toContainText('Trabajo a distancia');
});

test('en Estudios, filtrar por zona muestra solo opciones de esa zona', async ({ page }) => {
  await page.goto('/estudios?zona=rocha');
  const tarjetas = page.locator('.estudios-grid > li');
  const cantidad = await tarjetas.count();
  expect(cantidad).toBeGreaterThan(0);
  await expect(page.getByText(`${cantidad} opciones en Rocha`)).toBeVisible();
  for (const tarjeta of await tarjetas.all()) {
    await expect(tarjeta.getByRole('list', { name: 'Zonas' })).toContainText('Rocha');
  }
});
