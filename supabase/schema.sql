-- ConectaTuMundo · Bolsa de CVs con buscador (mini ATS)
-- Pegar entero en Supabase > SQL Editor > New query > Run. Se puede volver a correr sin romper nada.
--
-- Modelo de acceso:
--   · Cualquiera puede SUBIR un CV (PDF) a través de la Edge Function `subir-cv` (con Turnstile),
--     pero nadie puede listarlos ni leerlos directamente.
--   · Solo los usuarios que estén en la tabla `reclutadores` pueden buscar y abrir CVs.
--   · Cada persona recibe un código para borrar su CV cuando quiera (Ley 18.331).

create extension if not exists unaccent with schema extensions;

-- Configuración de búsqueda en español que ignora tildes: "atencion" encuentra "atención"
-- y el fragmento resaltado conserva el texto original con sus tildes.
do $$
begin
  if not exists (select 1 from pg_ts_config where cfgname = 'es_sin_tildes') then
    create text search configuration public.es_sin_tildes (copy = pg_catalog.spanish);
    alter text search configuration public.es_sin_tildes
      alter mapping for hword, hword_part, word with extensions.unaccent, spanish_stem;
  end if;
end $$;

-- Para separar la consulta en palabras sin tildes
create or replace function public.f_unaccent(t text)
returns text language sql immutable parallel safe strict
set search_path = public, extensions
as $$ select extensions.unaccent('extensions.unaccent'::regdictionary, t) $$;

-- ── TABLAS ──────────────────────────────────────────────────────────────

create table if not exists public.cvs (
  id            uuid primary key default gen_random_uuid(),
  creado        timestamptz not null default now(),
  nombre        text not null check (char_length(nombre) between 2 and 120),
  email         text check (char_length(email) <= 200),
  telefono      text check (char_length(telefono) <= 40),
  ciudad        text not null check (ciudad in ('Durazno', 'Rocha', 'Montevideo', 'Otra')),
  puesto        text check (char_length(puesto) <= 120),
  habilidades   text[] not null default '{}' check (cardinality(habilidades) <= 30),
  texto         text not null default '' check (char_length(texto) <= 60000),
  archivo       text not null unique,
  token_borrado uuid not null default gen_random_uuid(),
  busqueda      tsvector
);

create index if not exists cvs_busqueda_idx on public.cvs using gin (busqueda);

-- Puesto y habilidades pesan más que el resto del texto del CV
create or replace function public.cvs_indexar()
returns trigger language plpgsql
set search_path = public, extensions
as $$
begin
  new.busqueda :=
    setweight(to_tsvector('public.es_sin_tildes', coalesce(new.puesto, '')), 'A') ||
    setweight(to_tsvector('public.es_sin_tildes', array_to_string(new.habilidades, ' ')), 'A') ||
    setweight(to_tsvector('public.es_sin_tildes', coalesce(new.texto, '')), 'B');
  return new;
end $$;

drop trigger if exists cvs_indexar on public.cvs;
create trigger cvs_indexar before insert or update on public.cvs
for each row execute function public.cvs_indexar();

-- Lista de reclutadores autorizados. La carga José a mano (ver supabase/README.md).
create table if not exists public.reclutadores (
  user_id  uuid primary key references auth.users (id) on delete cascade,
  nombre   text,
  empresa  text,
  creado   timestamptz not null default now()
);

-- RLS: nadie toca las tablas directamente; todo pasa por las funciones de abajo
alter table public.cvs enable row level security;
alter table public.reclutadores enable row level security;

drop policy if exists "reclutador ve su propia fila" on public.reclutadores;
create policy "reclutador ve su propia fila" on public.reclutadores
  for select to authenticated using (user_id = auth.uid());

create or replace function public.es_reclutador()
returns boolean language sql stable security definer
set search_path = public
as $$ select exists (select 1 from reclutadores where user_id = auth.uid()) $$;

-- La política de Storage no puede leer `cvs` (RLS sin políticas): lo resuelve esta función
create or replace function public.cv_archivo_activo(p_archivo text)
returns boolean language sql stable security definer
set search_path = public
as $$ select exists (select 1 from cvs where archivo = p_archivo) $$;

-- ── STORAGE ─────────────────────────────────────────────────────────────

-- Bucket privado: solo PDF, máximo 2 MB
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('cvs', 'cvs', false, 2097152, array['application/pdf'])
on conflict (id) do update
  set public = false, file_size_limit = 2097152, allowed_mime_types = array['application/pdf'];

-- Nadie sube directo desde el navegador: lo hace la Edge Function `subir-cv` con la service role
drop policy if exists "cualquiera sube un cv" on storage.objects;

drop policy if exists "reclutadores leen cvs" on storage.objects;
create policy "reclutadores leen cvs" on storage.objects
  for select to authenticated
  using (bucket_id = 'cvs' and public.es_reclutador()
         and public.cv_archivo_activo(name));

-- ── FUNCIONES ───────────────────────────────────────────────────────────

-- Registra un CV que la Edge Function `subir-cv` ya guardó en Storage. Devuelve el id y el código para borrarlo.
-- Límites: un CV por contacto cada 24 h ([repetido]) y 30 por hora en todo el sitio ([cupo]).
create or replace function public.subir_cv(
  p_nombre text, p_email text, p_telefono text, p_ciudad text,
  p_puesto text, p_habilidades text[], p_texto text, p_archivo text
)
returns table (id uuid, token_borrado uuid)
language plpgsql security definer
set search_path = public
as $$
declare
  v_email text := lower(nullif(btrim(p_email), ''));
  v_tel text := nullif(regexp_replace(coalesce(p_telefono, ''), '[^0-9]', '', 'g'), '');
begin
  if not exists (select 1 from storage.objects o where o.bucket_id = 'cvs' and o.name = p_archivo) then
    raise exception 'El archivo no se subió correctamente' using errcode = '22023';
  end if;
  if v_email is null and v_tel is null then
    raise exception 'Hace falta un email o un teléfono de contacto' using errcode = '22023';
  end if;

  -- Un CV por persona por día (quien quiere cambiarlo, borra el anterior con su enlace)
  if exists (
    select 1 from cvs c
    where c.creado > now() - interval '24 hours'
      and ((v_email is not null and lower(c.email) = v_email)
        or (v_tel is not null and regexp_replace(coalesce(c.telefono, ''), '[^0-9]', '', 'g') = v_tel))
  ) then
    raise exception '[repetido] Ya hay un CV con ese contacto en las últimas 24 horas' using errcode = 'P0001';
  end if;

  -- Tope para todo el sitio: si alguien automatiza subidas, el daño queda acotado
  if (select count(*) from cvs c where c.creado > now() - interval '1 hour') >= 30 then
    raise exception '[cupo] Demasiados CVs en la última hora' using errcode = 'P0001';
  end if;

  return query
    insert into cvs (nombre, email, telefono, ciudad, puesto, habilidades, texto, archivo)
    values (btrim(p_nombre), v_email, nullif(btrim(p_telefono), ''), p_ciudad,
            nullif(btrim(p_puesto), ''),
            coalesce((select array_agg(distinct btrim(h)) from unnest(p_habilidades) h where btrim(h) <> ''), '{}'),
            left(coalesce(p_texto, ''), 60000), p_archivo)
    returning cvs.id, cvs.token_borrado;
end $$;

-- Borra un CV con su código. El PDF queda huérfano e inaccesible
-- (la política de lectura exige que exista la fila); se limpia desde el panel.
create or replace function public.borrar_cv(p_id uuid, p_token uuid)
returns boolean language plpgsql security definer
set search_path = public
as $$
declare borrados int;
begin
  delete from cvs where id = p_id and token_borrado = p_token;
  get diagnostics borrados = row_count;
  return borrados > 0;
end $$;

-- Buscador para reclutadores. Separa la consulta en palabras, busca cualquiera de ellas
-- (con prefijo: "vent" encuentra "ventas") y ordena por cuántas coinciden y por relevancia.
create or replace function public.buscar_cvs(consulta text default '', p_ciudad text default null)
returns table (
  id uuid, creado timestamptz, nombre text, email text, telefono text, ciudad text,
  puesto text, habilidades text[], archivo text, coincidencias text[], terminos_total int,
  puntaje real, fragmento text
)
language plpgsql stable security definer
set search_path = public, extensions
as $$
declare
  terminos text[];
  q tsquery;
begin
  if not es_reclutador() then
    raise exception 'No autorizado' using errcode = '42501';
  end if;

  select array_agg(distinct t) into terminos
  from regexp_split_to_table(lower(f_unaccent(coalesce(consulta, ''))), '[^a-z0-9ñ+#]+') t
  where char_length(t) > 1;

  -- Descartamos las palabras que el buscador ignora ("de", "al", "con"…)
  select array_agg(t) into terminos
  from unnest(terminos) t
  where numnode(to_tsquery('public.es_sin_tildes', quote_literal(t) || ':*')) > 0;

  if terminos is null then
    return query
      select c.id, c.creado, c.nombre, c.email, c.telefono, c.ciudad, c.puesto, c.habilidades, c.archivo,
             '{}'::text[], 0, 0::real, left(c.texto, 220)
      from cvs c
      where p_ciudad is null or c.ciudad = p_ciudad
      order by c.creado desc
      limit 50;
    return;
  end if;

  select to_tsquery('public.es_sin_tildes', string_agg(quote_literal(t) || ':*', ' | ')) into q from unnest(terminos) t;

  return query
    select c.id, c.creado, c.nombre, c.email, c.telefono, c.ciudad, c.puesto, c.habilidades, c.archivo,
           m.coinc,
           cardinality(terminos),
           ts_rank_cd(c.busqueda, q)::real,
           ts_headline('public.es_sin_tildes', c.texto, q,
                       'MaxFragments=2, MaxWords=16, MinWords=6, FragmentDelimiter= … , StartSel=[[, StopSel=]]')
    from cvs c
    cross join lateral (
      select coalesce(array_agg(t), '{}') as coinc
      from unnest(terminos) t
      where c.busqueda @@ to_tsquery('public.es_sin_tildes', quote_literal(t) || ':*')
    ) m
    where c.busqueda @@ q
      and (p_ciudad is null or c.ciudad = p_ciudad)
    order by cardinality(m.coinc) desc, 12 desc, c.creado desc
    limit 50;
end $$;

revoke all on function public.subir_cv(text, text, text, text, text, text[], text, text) from public;
revoke all on function public.borrar_cv(uuid, uuid) from public;
revoke all on function public.buscar_cvs(text, text) from public;
revoke all on function public.es_reclutador() from public;
revoke all on function public.cv_archivo_activo(text) from public;
-- Supabase da permisos por defecto a anon sobre funciones nuevas: los sacamos donde no corresponden
revoke execute on function public.buscar_cvs(text, text) from anon;
revoke execute on function public.es_reclutador() from anon;
revoke execute on function public.cv_archivo_activo(text) from anon;
grant execute on function public.subir_cv(text, text, text, text, text, text[], text, text) to service_role;
grant execute on function public.borrar_cv(uuid, uuid) to anon, authenticated;
grant execute on function public.buscar_cvs(text, text) to authenticated;
grant execute on function public.es_reclutador() to authenticated;
grant execute on function public.cv_archivo_activo(text) to authenticated;
