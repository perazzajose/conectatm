// Edge Function de Supabase: busca en Google Empleos (vía SerpApi) las ofertas de cada departamento,
// se queda con las de LinkedIn, Computrabajo y BuscoJobs, y guarda las más recientes en `ofertas_externas`.
// La dispara pg_cron todos los lunes (ver supabase/cron-ofertas.sql). Sin imports: se puede pegar
// tal cual en el editor del panel de Supabase.
//
// Secrets que necesita (Edge Functions > Secrets): SERPAPI_KEY y CRON_SECRET.
// SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY los pone Supabase automáticamente.

export const DEPARTAMENTOS = [
  { id: 'durazno', nombre: 'Durazno' }, { id: 'rocha', nombre: 'Rocha' }, { id: 'montevideo', nombre: 'Montevideo' },
  { id: 'artigas', nombre: 'Artigas' }, { id: 'canelones', nombre: 'Canelones' }, { id: 'cerro-largo', nombre: 'Cerro Largo' },
  { id: 'colonia', nombre: 'Colonia' }, { id: 'flores', nombre: 'Flores' }, { id: 'florida', nombre: 'Florida' },
  { id: 'lavalleja', nombre: 'Lavalleja' }, { id: 'maldonado', nombre: 'Maldonado' }, { id: 'paysandu', nombre: 'Paysandú' },
  { id: 'rio-negro', nombre: 'Río Negro' }, { id: 'rivera', nombre: 'Rivera' }, { id: 'salto', nombre: 'Salto' },
  { id: 'san-jose', nombre: 'San José' }, { id: 'soriano', nombre: 'Soriano' }, { id: 'tacuarembo', nombre: 'Tacuarembó' },
  { id: 'treinta-y-tres', nombre: 'Treinta y Tres' },
];

const PORTALES = [
  { nombre: 'LinkedIn', patron: /linkedin/i },
  { nombre: 'Computrabajo', patron: /computrabajo/i },
  { nombre: 'BuscoJobs', patron: /buscojobs/i },
];

const GUARDAR_POR_DEPARTAMENTO = 10; // se muestran 5; guardamos algunas más por si alguna vence
const PAGINAS_MAX = 2; // 19 departamentos x 2 páginas x ~4,3 lunes = ~165 búsquedas/mes (plan gratis: 250)

// Tipos mínimos de lo que devuelve SerpApi (engine=google_jobs)
type OpcionPostulacion = { title?: string; link?: string };
type ResultadoGoogle = {
  job_id?: string; title?: string; company_name?: string; location?: string; via?: string;
  share_link?: string; extensions?: string[]; detected_extensions?: { posted_at?: string }; apply_options?: OpcionPostulacion[];
};
export type Oferta = {
  departamento: string; titulo: string; empresa: string | null; ubicacion: string | null; portal: string;
  publicado_texto: string | null; publicado_aprox: string | null; enlace: string;
};

// Quita las marcas de tilde (rango Unicode U+0300 a U+036F) después de separarlas con NFD
const MARCAS_TILDE = new RegExp('[\\u0300-\\u036f]', 'g');
export const sinTildes = (s = '') => s.normalize('NFD').replace(MARCAS_TILDE, '').toLowerCase();

// "hace 3 días" / "3 days ago" / "hace una hora" -> fecha aproximada de publicación
export function fechaAprox(texto: string | undefined, ahora: Date): Date | null {
  if (!texto) return null;
  const t = sinTildes(texto);
  const m = t.match(/(\d+|un|una|an|a)\+?\s*(minuto|minute|hora|hour|dia|day|semana|week|mes|month)/);
  if (!m) return /(hoy|today|recien|just)/.test(t) ? ahora : null;
  const n = /^\d+$/.test(m[1]) ? Number(m[1]) : 1;
  const horas = { minuto: 1 / 60, minute: 1 / 60, hora: 1, hour: 1, dia: 24, day: 24, semana: 168, week: 168, mes: 720, month: 720 }[m[2]] ?? 24;
  return new Date(ahora.getTime() - n * horas * 3600_000);
}

// Filtra, normaliza y ordena los resultados de un departamento
export function procesarResultados(resultados: ResultadoGoogle[], depto: { id: string; nombre: string }, ahora: Date): Oferta[] {
  const vistos = new Set<string>();
  const ofertas: (Oferta & { _orden: number })[] = [];

  for (const r of resultados) {
    if (!r.title) continue;
    // Solo ofertas de este departamento (Google a veces mezcla otras zonas)
    if (!sinTildes(r.location).includes(sinTildes(depto.nombre))) continue;

    const opciones = r.apply_options ?? [];
    const portal = PORTALES.find(p => p.patron.test(r.via ?? '') || opciones.some(o => p.patron.test(`${o.title} ${o.link}`)));
    if (!portal) continue;

    const enlace = opciones.find(o => portal.patron.test(`${o.title} ${o.link}`))?.link ?? r.share_link;
    if (!enlace || !enlace.startsWith('https://')) continue;

    const clave = r.job_id ?? sinTildes(`${r.title}|${r.company_name}`);
    if (vistos.has(clave)) continue;
    vistos.add(clave);

    // En español Google suele traer "hace 3 días" solo en `extensions`, no en detected_extensions
    const textoFecha = r.detected_extensions?.posted_at ?? r.extensions?.find(e => fechaAprox(e, ahora));
    const fecha = fechaAprox(textoFecha, ahora);
    ofertas.push({
      departamento: depto.id,
      titulo: r.title.slice(0, 200),
      empresa: r.company_name?.slice(0, 120) ?? null,
      ubicacion: r.location?.slice(0, 120) ?? null,
      portal: portal.nombre,
      publicado_texto: textoFecha ?? null,
      publicado_aprox: fecha?.toISOString() ?? null,
      enlace,
      _orden: fecha?.getTime() ?? 0,
    });
  }

  return ofertas
    .sort((a, b) => b._orden - a._orden)
    .slice(0, GUARDAR_POR_DEPARTAMENTO)
    .map(({ _orden, ...o }) => o);
}

async function buscarDepartamento(depto: { id: string; nombre: string }, apiKey: string): Promise<Oferta[]> {
  const ahora = new Date();
  let resultados: ResultadoGoogle[] = [];
  let token: string | undefined;

  for (let pagina = 0; pagina < PAGINAS_MAX; pagina++) {
    const params = new URLSearchParams({
      engine: 'google_jobs', q: `empleos en ${depto.nombre}, Uruguay`, gl: 'uy', hl: 'es', api_key: apiKey,
    });
    if (token) params.set('next_page_token', token);
    const res = await fetch(`https://serpapi.com/search.json?${params}`);
    if (!res.ok) throw new Error(`SerpApi ${res.status} en ${depto.nombre}`);
    const data = await res.json();
    resultados = resultados.concat(data.jobs_results ?? []);
    token = data.serpapi_pagination?.next_page_token;
    // Si ya hay suficientes ofertas de los tres portales, no gastamos otra búsqueda
    if (!token || procesarResultados(resultados, depto, ahora).length >= 5) break;
  }
  return procesarResultados(resultados, depto, ahora);
}

// Reemplaza las ofertas guardadas de un departamento (vía la API REST de Supabase)
async function guardar(depto: string, ofertas: Oferta[]) {
  const url = Deno.env.get('SUPABASE_URL');
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? Deno.env.get('SERVICE_KEY');
  const headers: Record<string, string> = { apikey: key!, 'Content-Type': 'application/json' };
  if (key!.startsWith('eyJ')) headers.Authorization = `Bearer ${key}`;

  const borrar = await fetch(`${url}/rest/v1/ofertas_externas?departamento=eq.${depto}`, { method: 'DELETE', headers });
  if (!borrar.ok) throw new Error(`No se pudo limpiar ${depto}: ${await borrar.text()}`);
  if (ofertas.length === 0) return;
  const insertar = await fetch(`${url}/rest/v1/ofertas_externas`, { method: 'POST', headers, body: JSON.stringify(ofertas) });
  if (!insertar.ok) throw new Error(`No se pudo guardar ${depto}: ${await insertar.text()}`);
}

async function manejar(req: Request): Promise<Response> {
  if (req.headers.get('x-cron-secret') !== Deno.env.get('CRON_SECRET')) {
    return new Response('No autorizado', { status: 401 });
  }
  const apiKey = Deno.env.get('SERPAPI_KEY');
  if (!apiKey) return new Response('Falta el secret SERPAPI_KEY', { status: 500 });

  // ?departamento=durazno actualiza uno solo (para probar sin gastar 19 búsquedas)
  const solo = new URL(req.url).searchParams.get('departamento');
  const lista = solo ? DEPARTAMENTOS.filter(d => d.id === solo) : DEPARTAMENTOS;

  const resumen: Record<string, number | string> = {};
  // De a 5 en paralelo: rápido, sin saturar a SerpApi
  for (let i = 0; i < lista.length; i += 5) {
    await Promise.all(lista.slice(i, i + 5).map(async (d) => {
      try {
        const ofertas = await buscarDepartamento(d, apiKey);
        await guardar(d.id, ofertas);
        resumen[d.id] = ofertas.length;
      } catch (e) {
        // Si falla un departamento, se conservan sus ofertas anteriores
        resumen[d.id] = `error: ${(e as Error).message}`;
      }
    }));
  }
  return new Response(JSON.stringify(resumen, null, 2), { headers: { 'Content-Type': 'application/json' } });
}

// En Supabase corre Deno; en las pruebas locales (Node) solo se importan las funciones de arriba
if (typeof Deno !== 'undefined') Deno.serve(manejar);
