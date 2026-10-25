# Bolsa de CVs: configurar Supabase

La bolsa de CVs (`/laboral/subir`) y el buscador para reclutadores (`/laboral/reclutadores`) guardan los datos en Supabase. Mientras no esté configurado, esas páginas muestran "se está terminando de configurar" y un botón de WhatsApp. El resto del sitio funciona igual.

## Cuánto cuesta

El plan gratis alcanza de sobra para 100 personas (y para bastantes más):

| Recurso | Plan gratis | Uso estimado con 100 CVs |
|---|---|---|
| Base de datos | 500 MB | menos de 5 MB (texto de los CVs) |
| Archivos | 1 GB | unos 100 MB (PDFs de hasta 2 MB) |
| Transferencia | 5 GB por mes | depende de cuántos CVs abran los reclutadores |
| Usuarios activos | 50.000 por mes | solo los reclutadores |

Dos cosas a tener en cuenta:
- **Si el proyecto pasa una semana sin uso, Supabase lo pausa.** Los datos no se pierden; se reactiva con un botón desde el panel. Con uso real esto no pasa.
- El plan pago arranca en USD 25 por mes. Solo haría falta con mucho más volumen.

## Pasos (una sola vez, unos 15 minutos)

1. **Crear el proyecto.** Entrá a [supabase.com](https://supabase.com), creá una cuenta y un proyecto nuevo (región: São Paulo, la más cercana). Guardá la contraseña de la base de datos.
2. **Crear las tablas.** En el panel: *SQL Editor* > *New query*. Pegá todo el contenido de [`schema.sql`](schema.sql) y tocá *Run*. Se puede volver a correr sin problema.
3. **Desactivar el registro público.** *Authentication* > *Sign In / Providers* > desactivá *Allow new users to sign up*. Así nadie puede crearse una cuenta solo: los reclutadores los creás vos.
4. **Copiar las claves.** Tocá el botón **Connect** (arriba, en la barra del proyecto): ahí están la *Project URL* (`https://xxxx.supabase.co`) y la *publishable key* (`sb_publishable_...`). También aparecen en *Settings* > *API Keys*.
   - La *publishable key* va en `VITE_SUPABASE_ANON_KEY`. Es pública por diseño (va dentro del sitio). Si tu proyecto muestra la clave vieja *anon* (empieza con `eyJ`) también sirve, pero Supabase la retira a fines de 2026.
   - **Nunca** uses la *secret* / *service_role key* en el sitio.
5. **Cargar las claves en Cloudflare.** Las variables `VITE_...` se pegan en el código al **compilar** el sitio, por eso van en la configuración de *build* y no en las de runtime (ahí Cloudflare dice *"Variables cannot be added to a Worker that only has static assets"*, y está bien).
   - Si el Worker todavía no está conectado a GitHub: *Workers & Pages* > tu Worker > *Settings* > *Build* > *Connect* y elegí el repo `perazzajose/conectatm`, rama `main`. Comando de build: `npm run build`. Comando de deploy: `npx wrangler deploy`.
   - En esa misma sección *Build*, en **Variables and secrets** (las de build), agregá `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` con los valores del paso 4.
   - Hacé un push (o *Retry build* en *Deployments*) para que se publique con las claves. Desde ahí, cada push a `main` publica solo.
6. **Para probar en tu computadora** (opcional): copiá `.env.example` como `.env`, pegá los mismos dos valores y corré `npm run dev`. El `.env` no se sube a GitHub.

## Dar acceso a un reclutador

1. *Authentication* > *Users* > *Add user* > *Create new user*. Poné su email y una contraseña, y marcá *Auto Confirm User*. No se manda ningún mail.
2. Copiá el *UID* del usuario recién creado.
3. *SQL Editor*, corré (cambiando los datos):
   ```sql
   insert into reclutadores (user_id, nombre, empresa)
   values ('PEGAR-EL-UID', 'Nombre de la persona', 'Nombre del negocio');
   ```
4. Mandale el email y la contraseña por WhatsApp. Entra en `conectatumundo.net/laboral/reclutadores`.

Para quitarle el acceso: `delete from reclutadores where user_id = 'UID';`

## Tareas de mantenimiento

**Ver cuántos CVs hay:**
```sql
select count(*), ciudad from cvs group by ciudad;
```

**Borrar un CV a pedido** (si alguien perdió su enlace y te lo pide por WhatsApp o email):
```sql
delete from cvs where email = 'correo@de.la.persona' returning archivo;
```
Después borrá ese archivo en *Storage* > *cvs*.

**Limpiar PDFs huérfanos.** Cuando alguien borra su CV, la fila se borra y el PDF deja de ser accesible, pero el archivo queda en Storage. Para listarlos:
```sql
select o.name from storage.objects o
where o.bucket_id = 'cvs' and not exists (select 1 from cvs c where c.archivo = o.name);
```
y borralos desde *Storage* > *cvs*.

## Protección contra robots (Turnstile + límites)

Desde octubre de 2026 la subida pasa por la Edge Function [`subir-cv`](functions/subir-cv/index.ts), que verifica con **Cloudflare Turnstile** que no sea un robot, valida los datos, guarda el PDF y lo registra. El navegador ya no puede subir directo. Además, la base de datos acepta **un CV por email o teléfono cada 24 horas** y **30 CVs por hora** en todo el sitio. **Hacelo en este orden** (si corrés el SQL antes de publicar la función, la subida deja de andar hasta que la publiques):

1. **Crear el widget de Turnstile** (gratis): en Cloudflare, *Turnstile* > *Add widget*. Nombre: `ConectaTuMundo`. Dominios: `conectatumundo.net` y `localhost`. Modo: *Managed*. Te da dos claves: **Site Key** (pública) y **Secret Key** (secreta).
2. **Publicar la función:** en Supabase, *Edge Functions* > *Deploy a new function* > *Via Editor*. Nombre: `subir-cv`. Pegá el contenido de `functions/subir-cv/index.ts` y tocá *Deploy*.
3. **Cargar el secreto:** *Edge Functions* > *Secrets* > agregá `TURNSTILE_SECRET` con la **Secret Key**. Nunca la pongas en el repo ni en el `.env`.
4. **Correr el SQL:** *SQL Editor*, pegá [`proteccion-cvs.sql`](proteccion-cvs.sql) entero y *Run*.
5. **Clave pública en el sitio:** en Cloudflare, en el Worker, *Settings* > *Build* > *Variables*, agregá `VITE_TURNSTILE_SITE_KEY` con la **Site Key**, y también en tu `.env` local. Hacé un push o *Retry build*.
6. **Probar:** subí un CV de prueba desde `conectatumundo.net/laboral/subir` (vas a ver el recuadro de Cloudflare arriba del botón) y borralo con el enlace que te da.

Si la función no tiene `TURNSTILE_SECRET`, igual funciona y quedan los límites de la base de datos. Pero con el secreto cargado, nadie puede subir sin pasar la verificación.

## Cómo funciona por dentro

- Cualquiera puede **subir** un PDF a través de la Edge Function `subir-cv` (con Turnstile), pero nadie puede listar ni leer la tabla ni los archivos directamente: todo pasa por funciones con permisos controlados (`subir_cv`, `borrar_cv`, `buscar_cvs`).
- Al subir, el navegador extrae el texto del PDF (con pdf.js) y lo guarda junto con el puesto y las habilidades. Si el PDF es una foto escaneada no hay texto, y el CV solo se encuentra por puesto y habilidades.
- El buscador separa lo que escribe el reclutador en palabras, ignora tildes y palabras como "de" o "con", reconoce variantes ("vendedor" encuentra "vendedora") y ordena por cuántas palabras coinciden y por relevancia. El puesto y las habilidades pesan más que el resto del texto.
- Los PDFs se abren con enlaces firmados que vencen a los 5 minutos.

---

# Ofertas de empleo por departamento

En `/laboral` y debajo del editor de CV, la persona elige su departamento y ve las **5 ofertas más recientes de LinkedIn, Computrabajo y BuscoJobs**. Las ofertas salen de Google Empleos a través de [SerpApi](https://serpapi.com), y una función de Supabase las actualiza **todos los lunes a las 9:00** (hora de Uruguay). Si un departamento no tiene ofertas esa semana, se muestran enlaces directos a cada portal.

## Cuánto cuesta

SerpApi gratis: 250 búsquedas por mes. Cada lunes se usan entre 19 y 38 búsquedas (19 departamentos, con una segunda página solo cuando la primera no alcanza): **unas 80 a 165 por mes**. Supabase sigue en el plan gratis.

## Pasos (una sola vez)

1. **Clave de SerpApi.** Creá la cuenta en [serpapi.com](https://serpapi.com) y copiá tu *API Key* (en *Your Account* / *Api Key*).
2. **Crear la tabla.** *SQL Editor* > pegá [`ofertas.sql`](ofertas.sql) > *Run*.
3. **Publicar la función.** *Edge Functions* > *Deploy a new function* > *Via Editor*. Nombre: `actualizar-ofertas`. Borrá el código de ejemplo, pegá todo [`functions/actualizar-ofertas/index.ts`](functions/actualizar-ofertas/index.ts) y tocá *Deploy*.
4. **Desactivar la verificación JWT de esa función.** En la función > *Settings*: desactivá *Enforce JWT verification* (o *Verify JWT*) y guardá. La protege otra clave propia (el paso siguiente), porque el cron no manda un usuario logueado.
5. **Secrets de la función.** *Edge Functions* > *Secrets* > agregá:
   - `SERPAPI_KEY` = tu clave de SerpApi.
   - `CRON_SECRET` = una contraseña larga inventada por vos (por ejemplo, 40 letras y números al azar). Guardala para el paso 7.
6. **Probar con un departamento** (gasta 1 o 2 búsquedas). En una terminal:
   ```bash
   curl -X POST "https://TU-PROYECTO.supabase.co/functions/v1/actualizar-ofertas?departamento=durazno" -H "x-cron-secret: TU_CRON_SECRET"
   ```
   Responde algo como `{ "durazno": 4 }` (cuántas ofertas guardó). Abrí `/laboral`, elegí Durazno y deberían aparecer.
7. **Programar los lunes.** *SQL Editor* > abrí [`cron-ofertas.sql`](cron-ofertas.sql), reemplazá los dos valores marcados con `<<< >>>` (la URL de tu función y tu `CRON_SECRET`) y tocá *Run*. La URL y el secreto quedan guardados cifrados en Vault.

Si no querés esperar al lunes para llenar todos los departamentos, corré el `curl` del paso 6 sin `?departamento=durazno` (gasta 19 a 38 búsquedas).

## Revisar que anda

- **Últimas corridas del cron:**
  ```sql
  select status, return_message, start_time from cron.job_run_details
  where jobid = (select jobid from cron.job where jobname = 'actualizar-ofertas-lunes')
  order by start_time desc limit 5;
  ```
- **Respuesta de la función** (cuántas ofertas guardó por departamento, o el error):
  ```sql
  select created, status_code, content from net._http_response order by created desc limit 5;
  ```
- **Ofertas guardadas por departamento:**
  ```sql
  select departamento, count(*), max(actualizado) from ofertas_externas group by departamento order by 1;
  ```

Si un departamento falla una semana (por ejemplo, SerpApi no responde), conserva las ofertas de la semana anterior.

## Detalles

- Solo se guardan ofertas cuyo portal es LinkedIn, Computrabajo o BuscoJobs y cuya ubicación menciona el departamento.
- Se guarda solo título, empresa, ubicación, portal, fecha aproximada y el enlace al aviso original. El botón "Ver en …" lleva siempre a la oferta en el portal.
- La fecha es aproximada: Google informa "hace 3 días", no una fecha exacta.
- El enlace de respaldo de Computrabajo lleva a su portada porque su sitio no permite verificar las URLs por departamento. Si las querés filtradas, abrí "empleos en Durazno" en Computrabajo desde el navegador y cambiá el patrón en `src/data/departamentos.js`.
