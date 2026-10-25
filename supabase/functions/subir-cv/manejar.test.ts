import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { manejar } from './index';

// Supabase y Turnstile simulados: se registra cada llamada para ver qué hizo la función
let llamadas: { url: string; method: string }[] = [];
let turnstileOk = true;
let rpc: { status: number; body: unknown } = { status: 200, body: [{ id: 'id-1', token_borrado: 'tok-1' }] };

beforeEach(() => {
  llamadas = [];
  turnstileOk = true;
  rpc = { status: 200, body: [{ id: 'id-1', token_borrado: 'tok-1' }] };
  const env: Record<string, string> = {
    SUPABASE_URL: 'https://proyecto.supabase.co', SUPABASE_SERVICE_ROLE_KEY: 'eyJservice', TURNSTILE_SECRET: 'secreto',
  };
  vi.stubGlobal('Deno', { env: { get: (k: string) => env[k] } });
  vi.stubGlobal('fetch', vi.fn(async (url: string, init: RequestInit = {}) => {
    llamadas.push({ url, method: init.method ?? 'GET' });
    if (url.includes('turnstile')) return Response.json({ success: turnstileOk });
    if (url.includes('/rpc/subir_cv')) return Response.json(rpc.body, { status: rpc.status });
    return new Response('{}', { status: 200 });
  }));
});
afterEach(() => vi.unstubAllGlobals());

function pedido(cambios: Record<string, string> = {}, pdf = '%PDF-1.7 contenido') {
  const form = new FormData();
  const campos = { nombre: 'Lucía Fernández', email: 'lucia@mail.com', telefono: '', ciudad: 'Durazno', puesto: '', habilidades: 'Excel, Ventas', texto: 'hola', token: 'tok', ...cambios };
  for (const [k, v] of Object.entries(campos)) form.append(k, v);
  form.append('archivo', new File([pdf], 'cv.pdf', { type: 'application/pdf' }));
  return new Request('https://fn/subir-cv', { method: 'POST', body: form, headers: { origin: 'https://conectatumundo.net' } });
}

describe('subir-cv', () => {
  test('con todo bien, guarda el PDF, lo registra y devuelve el enlace de borrado', async () => {
    const r = await manejar(pedido());
    expect(r.status).toBe(200);
    expect(await r.json()).toEqual({ id: 'id-1', token_borrado: 'tok-1' });
    expect(llamadas.map(l => l.method + ' ' + l.url.replace(/[0-9a-f-]{36}/, 'UUID'))).toEqual([
      'POST https://challenges.cloudflare.com/turnstile/v0/siteverify',
      'POST https://proyecto.supabase.co/storage/v1/object/cvs/UUID.pdf',
      'POST https://proyecto.supabase.co/rest/v1/rpc/subir_cv',
    ]);
    expect(r.headers.get('Access-Control-Allow-Origin')).toBe('https://conectatumundo.net');
  });

  test('si Turnstile no lo verifica, no guarda nada', async () => {
    turnstileOk = false;
    const r = await manejar(pedido());
    expect(r.status).toBe(403);
    expect(await r.json()).toEqual({ error: 'verificacion' });
    expect(llamadas.some(l => l.url.includes('storage'))).toBe(false);
  });

  test('un archivo que no es PDF se rechaza aunque diga .pdf', async () => {
    const r = await manejar(pedido({}, '<html>hola</html>'));
    expect(await r.json()).toEqual({ error: 'archivo' });
    expect(llamadas.some(l => l.url.includes('storage'))).toBe(false);
  });

  test('datos inválidos se rechazan antes de guardar', async () => {
    const r = await manejar(pedido({ email: 'mal', telefono: '' }));
    expect(r.status).toBe(400);
    expect(await r.json()).toEqual({ error: 'email' });
  });

  test('si la base dice [repetido], borra el PDF que acababa de guardar y lo avisa', async () => {
    rpc = { status: 400, body: { message: '[repetido] Ya hay un CV con ese contacto' } };
    const r = await manejar(pedido());
    expect(r.status).toBe(429);
    expect(await r.json()).toEqual({ error: 'repetido' });
    expect(llamadas.at(-1)?.method).toBe('DELETE');
    expect(llamadas.at(-1)?.url).toMatch(/storage\/v1\/object\/cvs\/[0-9a-f-]{36}\.pdf$/);
  });

  test('responde el preflight de CORS', async () => {
    const r = await manejar(new Request('https://fn/subir-cv', { method: 'OPTIONS', headers: { origin: 'http://localhost:5173' } }));
    expect(r.status).toBe(200);
    expect(r.headers.get('Access-Control-Allow-Origin')).toBe('http://localhost:5173');
  });
});
