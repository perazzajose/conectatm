// Edge Function de Supabase: recibe un CV desde /laboral/subir, verifica que no sea un robot
// (Cloudflare Turnstile), valida los datos, guarda el PDF en Storage y lo registra con subir_cv().
// Es el único camino para subir: el navegador ya no puede escribir en el bucket ni llamar a subir_cv.
//
// Secretos (Edge Functions > Secrets): TURNSTILE_SECRET. SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY
// los pone Supabase solo. Opcional: ORIGENES (dominios permitidos, separados por coma).
// Sin imports, para poder pegarla en el editor del panel.

declare const Deno: {
  env: { get(nombre: string): string | undefined };
  serve(manejador: (req: Request) => Response | Promise<Response>): void;
};

export const MAX_BYTES = 2 * 1024 * 1024;
const CIUDADES = ['Durazno', 'Rocha', 'Montevideo', 'Otra'];
const ORIGENES_POR_DEFECTO = 'https://conectatumundo.net,http://localhost:5173,http://localhost:4173,http://localhost:4175';

export interface Campos {
  nombre: string; email: string; telefono: string; ciudad: string;
  puesto: string; habilidades: string[]; texto: string;
}

// Devuelve el código del primer problema, o null si está todo bien.
// Los códigos los traduce la página a mensajes para la persona.
export function validar(c: Campos): string | null {
  const nombre = c.nombre.trim();
  if (nombre.length < 2 || nombre.length > 120) return 'nombre';
  const email = c.email.trim();
  const telefono = c.telefono.trim();
  if (!email && !telefono) return 'contacto';
  if (email && (email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))) return 'email';
  if (telefono && (telefono.length > 40 || !/^[+\d][\d\s-]{5,}$/.test(telefono))) return 'telefono';
  if (!CIUDADES.includes(c.ciudad)) return 'ciudad';
  if (c.puesto.trim().length > 120) return 'puesto';
  if (c.habilidades.length > 30 || c.habilidades.some(h => h.length > 60)) return 'habilidades';
  return null;
}

// Los PDF empiezan con "%PDF-": así no alcanza con cambiarle la extensión a otro archivo
export function esPdf(bytes: Uint8Array): boolean {
  return bytes.length > 5 && String.fromCharCode(...bytes.slice(0, 5)) === '%PDF-';
}

async function verificarTurnstile(token: string, ip: string | null): Promise<boolean> {
  const secreto = Deno.env.get('TURNSTILE_SECRET');
  if (!secreto) return true; // Sin configurar todavía: quedan los límites de la base de datos
  if (!token) return false;
  const datos = new FormData();
  datos.append('secret', secreto);
  datos.append('response', token);
  if (ip) datos.append('remoteip', ip);
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: datos });
  return Boolean((await r.json()).success);
}

export async function manejar(req: Request): Promise<Response> {
  const permitidos = (Deno.env.get('ORIGENES') ?? ORIGENES_POR_DEFECTO).split(',').map(o => o.trim());
  const origen = req.headers.get('origin') ?? '';
  const cors = {
    'Access-Control-Allow-Origin': permitidos.includes(origen) ? origen : permitidos[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    Vary: 'Origin',
  };
  const responder = (cuerpo: unknown, status = 200) =>
    new Response(JSON.stringify(cuerpo), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

  if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
  if (req.method !== 'POST') return responder({ error: 'metodo' }, 405);

  let form: FormData;
  try { form = await req.formData(); } catch { return responder({ error: 'datos' }, 400); }
  const texto = (k: string) => String(form.get(k) ?? '');

  const ip = req.headers.get('cf-connecting-ip') ?? req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? null;
  if (!(await verificarTurnstile(texto('token'), ip))) return responder({ error: 'verificacion' }, 403);

  const archivo = form.get('archivo');
  if (!(archivo instanceof File)) return responder({ error: 'archivo' }, 400);
  if (archivo.size > MAX_BYTES) return responder({ error: 'tamano' }, 400);
  const bytes = new Uint8Array(await archivo.arrayBuffer());
  if (!esPdf(bytes)) return responder({ error: 'archivo' }, 400);

  const campos: Campos = {
    nombre: texto('nombre'), email: texto('email'), telefono: texto('telefono'), ciudad: texto('ciudad'),
    puesto: texto('puesto'),
    habilidades: texto('habilidades').split(',').map(h => h.trim()).filter(Boolean),
    texto: texto('texto').slice(0, 60000),
  };
  const problema = validar(campos);
  if (problema) return responder({ error: problema }, 400);

  const url = Deno.env.get('SUPABASE_URL')!;
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const auth: Record<string, string> = { apikey: key };
  if (key.startsWith('eyJ')) auth.Authorization = `Bearer ${key}`;

  const ruta = `${crypto.randomUUID()}.pdf`;
  const subida = await fetch(`${url}/storage/v1/object/cvs/${ruta}`, {
    method: 'POST', headers: { ...auth, 'Content-Type': 'application/pdf', 'x-upsert': 'false' }, body: bytes,
  });
  if (!subida.ok) return responder({ error: 'guardar' }, 500);

  const registro = await fetch(`${url}/rest/v1/rpc/subir_cv`, {
    method: 'POST',
    headers: { ...auth, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      p_nombre: campos.nombre, p_email: campos.email, p_telefono: campos.telefono, p_ciudad: campos.ciudad,
      p_puesto: campos.puesto, p_habilidades: campos.habilidades, p_texto: campos.texto, p_archivo: ruta,
    }),
  });
  const respuesta = await registro.json().catch(() => null);
  if (!registro.ok) {
    // Si no se pudo registrar, el PDF no queda suelto en el bucket
    await fetch(`${url}/storage/v1/object/cvs/${ruta}`, { method: 'DELETE', headers: auth });
    const mensaje = String(respuesta?.message ?? '');
    const codigo = ['repetido', 'cupo'].find(c => mensaje.includes(`[${c}]`)) ?? 'guardar';
    return responder({ error: codigo }, codigo === 'guardar' ? 500 : 429);
  }
  return responder(respuesta[0]);
}

if (typeof Deno !== 'undefined') Deno.serve(manejar);
