// Clave PÚBLICA de Cloudflare Turnstile (la secreta vive solo en la Edge Function subir-cv)
export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';
