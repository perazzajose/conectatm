-- ConectaTuMundo · Solicitudes de acceso de reclutadores
-- Pegar entero en Supabase > SQL Editor > New query > Run. Se puede volver a correr sin romper nada.
-- Requiere que ya esté corrido schema.sql (usa la tabla `reclutadores`).
--
-- Flujo:
--   · Cualquiera puede ENVIAR una solicitud desde /laboral/reclutadores (función `solicitar_acceso_reclutador`),
--     con límites para que un robot no la inunde. La solicitud queda en estado 'pendiente'.
--   · José la ve y la aprueba/rechaza desde el panel admin, a través de la Edge Function `admin-reclutadores`,
--     que es la única que puede leer o cambiar esta tabla (usa la service role). Nadie la lee desde el navegador.
--   · Al aprobar, se crea el usuario en Supabase Auth y se agrega a `reclutadores`.

create table if not exists public.solicitudes_reclutador (
  id        uuid primary key default gen_random_uuid(),
  creado    timestamptz not null default now(),
  nombre    text not null check (char_length(nombre) between 2 and 120),
  empresa   text not null check (char_length(empresa) between 2 and 120),
  email     text not null check (char_length(email) <= 200),
  telefono  text check (char_length(telefono) <= 40),
  motivo    text check (char_length(motivo) <= 1000),
  estado    text not null default 'pendiente' check (estado in ('pendiente', 'aprobada', 'rechazada')),
  procesado timestamptz
);

create index if not exists solicitudes_reclutador_estado_idx
  on public.solicitudes_reclutador (estado, creado desc);

-- RLS sin políticas: nadie lee ni escribe la tabla directamente desde el navegador.
-- La escritura pública pasa por la función de abajo; la lectura y la gestión, por la Edge Function.
alter table public.solicitudes_reclutador enable row level security;

-- ── ENVIAR UNA SOLICITUD ────────────────────────────────────────────────
-- Devuelve el código del primer problema entre [corchetes]; la página lo traduce a un mensaje.
-- Límites: una solicitud por email cada 24 h ([repetido]) y 20 por hora en todo el sitio ([cupo]).
create or replace function public.solicitar_acceso_reclutador(
  p_nombre text, p_empresa text, p_email text,
  p_telefono text default '', p_motivo text default ''
)
returns void
language plpgsql security definer
set search_path = public
as $$
declare
  v_nombre  text := btrim(coalesce(p_nombre, ''));
  v_empresa text := btrim(coalesce(p_empresa, ''));
  v_email   text := lower(nullif(btrim(p_email), ''));
begin
  if char_length(v_nombre) < 2 or char_length(v_nombre) > 120 then
    raise exception '[nombre] Falta el nombre' using errcode = 'P0001';
  end if;
  if char_length(v_empresa) < 2 or char_length(v_empresa) > 120 then
    raise exception '[empresa] Falta el negocio o empresa' using errcode = 'P0001';
  end if;
  if v_email is null or char_length(v_email) > 200
     or v_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]{2,}$' then
    raise exception '[email] Email inválido' using errcode = 'P0001';
  end if;

  -- Una solicitud por email cada 24 h (o si ya hay una pendiente de ese email)
  if exists (
    select 1 from solicitudes_reclutador s
    where lower(s.email) = v_email
      and (s.estado = 'pendiente' or s.creado > now() - interval '24 hours')
  ) then
    raise exception '[repetido] Ya hay una solicitud con ese email' using errcode = 'P0001';
  end if;

  -- Tope para todo el sitio: si alguien automatiza envíos, el daño queda acotado
  if (select count(*) from solicitudes_reclutador s where s.creado > now() - interval '1 hour') >= 20 then
    raise exception '[cupo] Demasiadas solicitudes en la última hora' using errcode = 'P0001';
  end if;

  insert into solicitudes_reclutador (nombre, empresa, email, telefono, motivo)
  values (v_nombre, v_empresa, v_email,
          nullif(btrim(coalesce(p_telefono, '')), ''),
          nullif(btrim(coalesce(p_motivo, '')), ''));
end $$;

-- Solo esta función puede escribir en la tabla; la gestión la hace la Edge Function con la service role.
revoke all on function public.solicitar_acceso_reclutador(text, text, text, text, text) from public;
revoke execute on function public.solicitar_acceso_reclutador(text, text, text, text, text) from authenticated;
grant execute on function public.solicitar_acceso_reclutador(text, text, text, text, text) to anon, authenticated;
