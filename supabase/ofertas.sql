-- ConectaTuMundo · Ofertas de empleo de LinkedIn, Computrabajo y BuscoJobs (vía Google Empleos)
-- Pegar en Supabase > SQL Editor > Run. Se puede volver a correr sin romper nada.
-- La tabla la llena la Edge Function `actualizar-ofertas` todos los lunes; el sitio solo la lee.

create table if not exists public.ofertas_externas (
  id              bigint generated always as identity primary key,
  departamento    text not null,
  titulo          text not null check (char_length(titulo) <= 200),
  empresa         text,
  ubicacion       text,
  portal          text not null check (portal in ('LinkedIn', 'Computrabajo', 'BuscoJobs')),
  publicado_texto text,
  publicado_aprox timestamptz,
  enlace          text not null check (enlace ~ '^https://'),
  actualizado     timestamptz not null default now()
);

create index if not exists ofertas_externas_depto_idx
  on public.ofertas_externas (departamento, publicado_aprox desc nulls last);

-- Son avisos públicos: cualquiera puede leerlos. Solo la Edge Function (con la service key) escribe.
alter table public.ofertas_externas enable row level security;

drop policy if exists "lectura publica de ofertas" on public.ofertas_externas;
create policy "lectura publica de ofertas" on public.ofertas_externas
  for select to anon, authenticated using (true);
