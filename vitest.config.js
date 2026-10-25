import { defineConfig } from 'vitest/config';

// Tests unitarios (lógica pura, sin navegador). Los de punta a punta están en e2e/ y usan Playwright.
export default defineConfig({
  test: {
    include: ['src/**/*.test.{js,jsx}', 'supabase/functions/**/*.test.ts'],
    environment: 'node',
  },
});
