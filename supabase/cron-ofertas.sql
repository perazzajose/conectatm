-- ConectaTuMundo · Actualizar las ofertas todos los lunes a las 9:00 (hora de Uruguay)
-- Correr DESPUÉS de publicar la Edge Function `actualizar-ofertas` (ver supabase/README.md).
-- Antes de correrlo, reemplazá los dos valores marcados con <<< >>>.

create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Guardamos la URL de la función y el secreto en Vault (cifrados), no en texto plano en el cron.
-- Si ya existen, se actualizan.
do $$
declare
  v_url    text := '<<<https://TU-PROYECTO.supabase.co/functions/v1/actualizar-ofertas>>>';
  v_secret text := '<<<EL-MISMO-CRON_SECRET-QUE-PUSISTE-EN-LA-FUNCION>>>';
begin
  if exists (select 1 from vault.secrets where name = 'ofertas_url') then
    perform vault.update_secret((select id from vault.secrets where name = 'ofertas_url'), v_url);
  else
    perform vault.create_secret(v_url, 'ofertas_url');
  end if;
  if exists (select 1 from vault.secrets where name = 'ofertas_cron_secret') then
    perform vault.update_secret((select id from vault.secrets where name = 'ofertas_cron_secret'), v_secret);
  else
    perform vault.create_secret(v_secret, 'ofertas_cron_secret');
  end if;
end $$;

-- pg_cron usa hora UTC: lunes 12:00 UTC = lunes 9:00 en Uruguay (UTC-3)
select cron.unschedule('actualizar-ofertas-lunes')
where exists (select 1 from cron.job where jobname = 'actualizar-ofertas-lunes');

select cron.schedule('actualizar-ofertas-lunes', '0 12 * * 1', $$
  select net.http_post(
    url := (select decrypted_secret from vault.decrypted_secrets where name = 'ofertas_url'),
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'ofertas_cron_secret')
    ),
    body := '{}'::jsonb,
    timeout_milliseconds := 120000
  );
$$);
