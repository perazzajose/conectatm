import { defineConfig, devices } from '@playwright/test';

// Tests de punta a punta sobre el sitio compilado (npm run test:e2e compila primero).
// En local usa el Chrome instalado; en CI, el Chromium que instala Playwright.
const navegador = process.env.CI ? {} : { channel: 'chrome' };

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4175',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'compu', use: { ...devices['Desktop Chrome'], ...navegador } },
    { name: 'celular', use: { ...devices['Pixel 7'], ...navegador } },
  ],
  webServer: {
    command: 'npx vite preview --port 4175 --strictPort',
    url: 'http://localhost:4175',
    reuseExistingServer: !process.env.CI,
  },
});
