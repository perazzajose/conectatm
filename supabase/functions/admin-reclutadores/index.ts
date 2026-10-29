// Edge Function de Supabase: gestiona las solicitudes de acceso de reclutadores desde el panel admin.
// Es el único camino para leer o cambiar `solicitudes_reclutador` y para dar/quitar acceso: usa la
// service role, así que está protegida por una clave de admin (header x-admin-key). El navegador no
// puede tocar estas tablas directamente.
//
// Acciones (JSON en el body): { accion: "listar" | "aprobar" | "rechazar" | "quitar", ... }
//   · listar   → { solicitudes: [...], reclutadores: [...] }
//   · aprobar  { id }        → crea/activa el usuario y lo agrega a reclutadores. Devuelve { email, password, nuevo }
//   · rechazar { id }        → marca la solicitud como rechazada
//   · quitar   { user_id }   → le saca el acceso a un reclutador (borra su fila de reclutadores)
//
// Secretos (Edge Functions > Secrets): ADMIN_RECLUTADORES_KEY (una contraseña larga inventada por vos).
// SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY los pone Supabase solo. Opcional: ORIGENES.
// En Settings de la función hay que DESACTIVAR "Enforce JWT verification": el panel usa su propia
// clave (x-admin-key), no un usuario logueado de Supabase.
// Sin imports, para poder pegarla en el editor del panel.

declare const Deno: {
  env: { get(nombre: string): string | undefined };
  serve(manejador: (req: Request) => Response | Promise<Response>): void;
};

const ORIGENES_POR_DEFECTO = 'https://conectatumundo.net,http://localhost:5173,http://localhost:4173,http://localhost:4175';

const url = () => Deno.env.get('SUPABASE_URL')!;
function auth(): Record<string, string> {
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const h: Record<string, string> = { apikey: key, Authorization: `Bearer ${key}` };
  return h;
}

// Contraseña temporal legible para pasarle al reclutador por WhatsApp. Ej: "Ctm-7k9m2p-4821"
function generarPassword(): string {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  const letras = Array.from(bytes, b => 'abcdefghijkmnpqrstuvwxyz23456789'[b % 32]).join('');
  const num = String(100 + (crypto.getRandomValues(new Uint32Array(1))[0] % 9900));
  return `Ctm-${letras}-${num}`;
}

async function buscarUsuarioPorEmail(email: string): Promise<{ id: string } | null> {
  // GoTrue admin: filtra por email (devuelve coincidencias exactas o parecidas)
  const r = await fetch(`${url()}/auth/v1/admin/users?email=${encodeURIComponent(email)}`, { headers: auth() });
  if (!r.ok) return null;
  const data = await r.json().catch(() => null);
  const lista: Array<{ id: string; email?: string }> = data?.users ?? [];
  return lista.find(u => (u.email ?? '').toLowerCase() === email.toLowerCase()) ?? null;
}

async function listar() {
  const [sols, recs, users] = await Promise.all([
    fetch(`${url()}/rest/v1/solicitudes_reclutador?select=*&order=creado.desc&limit=200`, { headers: auth() })
      .then(r => r.json()).catch(() => []),
    fetch(`${url()}/rest/v1/reclutadores?select=user_id,nombre,empresa,creado&order=creado.desc`, { headers: auth() })
      .then(r => r.json()).catch(() => []),
    fetch(`${url()}/auth/v1/admin/users?per_page=1000`, { headers: auth() })
      .then(r => r.json()).then(d => d?.users ?? []).catch(() => []),
  ]);
  const emails = new Map<string, string>((users as Array<{ id: string; email?: string }>).map(u => [u.id, u.email ?? '']));
  const reclutadores = (Array.isArray(recs) ? recs : []).map((r: Record<string, unknown>) => ({
    ...r, email: emails.get(String(r.user_id)) ?? '',
  }));
  return { solicitudes: Array.isArray(sols) ? sols : [], reclutadores };
}

async function aprobar(id: string) {
  const r = await fetch(`${url()}/rest/v1/solicitudes_reclutador?id=eq.${id}&select=*`, { headers: auth() });
  const filas = await r.json().catch(() => []);
  const sol = Array.isArray(filas) ? filas[0] : null;
  if (!sol) return { error: 'no-existe' };

  const email = String(sol.email).toLowerCase();
  const password = generarPassword();

  // Crear el usuario (ya confirmado). Si ya existe, le reponemos la contraseña.
  let usuario = await buscarUsuarioPorEmail(email);
  let nuevo = false;
  if (!usuario) {
    const crear = await fetch(`${url()}/auth/v1/admin/users`, {
      method: 'POST',
      headers: { ...auth(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, email_confirm: true }),
    });
    const creado = await crear.json().catch(() => null);
    if (crear.ok && creado?.id) { usuario = { id: creado.id }; nuevo = true; }
    else usuario = await buscarUsuarioPorEmail(email); // carrera: alguien más lo creó
  }
  if (!usuario) return { error: 'usuario' };

  if (!nuevo) {
    await fetch(`${url()}/auth/v1/admin/users/${usuario.id}`, {
      method: 'PUT',
      headers: { ...auth(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, email_confirm: true }),
    });
  }

  // Alta en reclutadores (idempotente) y marca la solicitud como aprobada
  await fetch(`${url()}/rest/v1/reclutadores?on_conflict=user_id`, {
    method: 'POST',
    headers: { ...auth(), 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates' },
    body: JSON.stringify({ user_id: usuario.id, nombre: sol.nombre, empresa: sol.empresa }),
  });
  await fetch(`${url()}/rest/v1/solicitudes_reclutador?id=eq.${id}`, {
    method: 'PATCH',
    headers: { ...auth(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado: 'aprobada', procesado: new Date().toISOString() }),
  });

  return { email, password, nuevo };
}

async function rechazar(id: string) {
  const r = await fetch(`${url()}/rest/v1/solicitudes_reclutador?id=eq.${id}`, {
    method: 'PATCH',
    headers: { ...auth(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado: 'rechazada', procesado: new Date().toISOString() }),
  });
  return r.ok ? { ok: true } : { error: 'guardar' };
}

async function quitar(userId: string) {
  const r = await fetch(`${url()}/rest/v1/reclutadores?user_id=eq.${userId}`, {
    method: 'DELETE', headers: auth(),
  });
  return r.ok ? { ok: true } : { error: 'guardar' };
}

async function manejar(req: Request): Promise<Response> {
  const permitidos = (Deno.env.get('ORIGENES') ?? ORIGENES_POR_DEFECTO).split(',').map(o => o.trim());
  const origen = req.headers.get('origin') ?? '';
  const cors = {
    'Access-Control-Allow-Origin': permitidos.includes(origen) ? origen : permitidos[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-key',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    Vary: 'Origin',
  };
  const responder = (cuerpo: unknown, status = 200) =>
    new Response(JSON.stringify(cuerpo), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

  if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
  if (req.method !== 'POST') return responder({ error: 'metodo' }, 405);

  const clave = Deno.env.get('ADMIN_RECLUTADORES_KEY');
  if (!clave) return responder({ error: 'sin-configurar' }, 503);
  if (req.headers.get('x-admin-key') !== clave) return responder({ error: 'no-autorizado' }, 401);

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return responder({ error: 'datos' }, 400); }
  const accion = String(body.accion ?? '');

  try {
    if (accion === 'listar') return responder(await listar());
    if (accion === 'aprobar') return responder(await aprobar(String(body.id ?? '')));
    if (accion === 'rechazar') return responder(await rechazar(String(body.id ?? '')));
    if (accion === 'quitar') return responder(await quitar(String(body.user_id ?? '')));
    return responder({ error: 'accion' }, 400);
  } catch (e) {
    return responder({ error: 'servidor', detalle: String((e as Error)?.message ?? e) }, 500);
  }
}

if (typeof Deno !== 'undefined') Deno.serve(manejar);
