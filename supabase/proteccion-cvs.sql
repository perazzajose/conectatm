-- ConectaTuMundo · Protección de la bolsa de CVs contra robots y abusos
-- Correr DESPUÉS de publicar la Edge Function `subir-cv` (ver supabase/README.md, "Protección").
-- Pegar entero en Supabase > SQL Editor > Run. Se puede volver a correr sin romper nada.
--
-- Qué cambia:
--   · El navegador ya no puede subir archivos al bucket ni llamar a subir_cv: solo la Edge Function
--     (que verifica Turnstile) usando la service role.
--   · subir_cv rechaza un segundo CV con el mismo email o teléfono en 24 horas  -> [repetido]
--   · y frena si en la última hora se subieron demasiados CVs en todo el sitio  -> [cupo]

-- 1. Sin subida directa desde el navegador
drop policy if exists "cualquiera sube un cv" on storage.objects;

-- 2. subir_cv con límites (misma firma que antes)
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

-- 3. Solo la Edge Function (service_role) puede registrar CVs
revoke all on function public.subir_cv(text, text, text, text, text, text[], text, text) from public, anon, authenticated;
grant execute on function public.subir_cv(text, text, text, text, text, text[], text, text) to service_role;

-- Para revisar: estas consultas deberían dar false y 0 filas
-- select has_function_privilege('anon', 'public.subir_cv(text,text,text,text,text,text[],text,text)', 'execute');
-- select policyname from pg_policies where tablename = 'objects' and policyname = 'cualquiera sube un cv';
