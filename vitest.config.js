import { defineConfig } from 'vitest/config';

// Tests unitarios (lógica pura, sin navegador). Los de punta a punta están en e2e/ y usan Playwright.
export default defineConfig({
  // JSX sin importar React en cada archivo, como en la app
  esbuild: { jsx: 'automatic' },
  test: {
    include: ['src/**/*.test.{js,jsx}', 'supabase/functions/**/*.test.ts'],
    environment: 'node',
  },
});
