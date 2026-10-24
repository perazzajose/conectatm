import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHeader from '../../../components/PageHeader';
import { supabase, supabaseConfigurado, BUCKET_CVS } from '../../../lib/supabase';
import leerPdf from '../../../lib/leerPdf';
import { waLink } from '../../../data/contacto';
import './SubirCv.css';

const MAX_BYTES = 2 * 1024 * 1024;
const CIUDADES = ['Durazno', 'Rocha', 'Montevideo', 'Otra'];
const inicial = { nombre: '', email: '', telefono: '', ciudad: '', puesto: '', habilidades: '', acepto: false };

function Borrar({ valor }) {
  const [id, token] = valor.split(':');
  const [estado, setEstado] = useState('idle');

  const borrar = async () => {
    setEstado('borrando');
    const { data, error } = await supabase.rpc('borrar_cv', { p_id: id, p_token: token });
    setEstado(error ? 'error' : data ? 'borrado' : 'no-existe');
  };

  return (
    <section className="subir-borrar">
      <div className="section-inner">
        <h2>Borrar mi CV</h2>
        {estado === 'borrado' ? (
          <p>Listo: tu CV se borró de la bolsa y ya no aparece en ninguna búsqueda.</p>
        ) : estado === 'no-existe' ? (
          <p>Ese enlace no corresponde a ningún CV. Puede que ya lo hayas borrado.</p>
        ) : (
          <>
            <p>Si lo borrás, deja de aparecer en las búsquedas de reclutadores. No se puede deshacer.</p>
            <button type="button" className="btn btn-primary" onClick={borrar} disabled={estado === 'borrando'}>
              {estado === 'borrando' ? 'Borrando…' : 'Borrar mi CV'}
            </button>
            {estado === 'error' && <p className="form-estado error">No se pudo borrar. Revisá tu conexión y volvé a intentar.</p>}
          </>
        )}
      </div>
    </section>
  );
}

export default function SubirCv() {
  const [params] = useSearchParams();
  const [form, setForm] = useState(inicial);
  const [archivo, setArchivo] = useState(null);
  const [estado, setEstado] = useState('idle');
  const [error, setError] = useState('');
  const [resultado, setResultado] = useState(null);

  const cambiar = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const elegirArchivo = (e) => {
    const f = e.target.files?.[0] || null;
    setError('');
    if (f && f.type !== 'application/pdf') { setError('El archivo tiene que ser un PDF.'); setArchivo(null); return; }
    if (f && f.size > MAX_BYTES) { setError('El PDF pesa más de 2 MB. Exportalo de nuevo con menos imágenes.'); setArchivo(null); return; }
    setArchivo(f);
  };

  const enviar = async (e) => {
    e.preventDefault();
    setError('');
    if (!archivo) { setError('Elegí tu CV en PDF.'); return; }
    if (!form.email.trim() && !form.telefono.trim()) { setError('Dejá un email o un teléfono para que te puedan contactar.'); return; }

    try {
      setEstado('leyendo');
      let texto = '';
      try { texto = await leerPdf(archivo); } catch { texto = ''; }

      setEstado('subiendo');
      const ruta = `${crypto.randomUUID()}.pdf`;
      const subida = await supabase.storage.from(BUCKET_CVS).upload(ruta, archivo, { contentType: 'application/pdf', upsert: false });
      if (subida.error) throw subida.error;

      const { data, error: rpcError } = await supabase.rpc('subir_cv', {
        p_nombre: form.nombre,
        p_email: form.email,
        p_telefono: form.telefono,
        p_ciudad: form.ciudad,
        p_puesto: form.puesto,
        p_habilidades: form.habilidades.split(',').map(h => h.trim()).filter(Boolean),
        p_texto: texto,
        p_archivo: ruta,
      });
      if (rpcError) throw rpcError;

      const fila = data[0];
      setResultado({ enlace: `${window.location.origin}/laboral/subir?borrar=${fila.id}:${fila.token_borrado}`, sinTexto: texto.length < 40 });
      setEstado('listo');
    } catch (err) {
      setEstado('idle');
      setError(err?.message?.includes('contacto')
        ? 'Dejá un email o un teléfono para que te puedan contactar.'
        : 'No se pudo subir el CV. Revisá tu conexión y volvé a intentar.');
    }
  };

  const borrar = params.get('borrar');

  return (
    <>
      <PageHeader
        camino="laboral"
        pagina="Subí tu CV"
        title="Subí tu CV para que te encuentren"
        subtitle="Emprendimientos y pymes de Durazno, Rocha y Montevideo buscan gente por palabras clave. Tu CV no queda publicado: solo lo ven reclutadores autorizados cuando coincide con lo que buscan."
      />

      {!supabaseConfigurado ? (
        <section>
          <div className="section-inner">
            <p className="section-sub">La bolsa de CVs se está terminando de configurar.</p>
            <a className="btn btn-whatsapp" href={waLink('Hola José, quiero subir mi CV a la bolsa')} target="_blank" rel="noopener noreferrer">
              Avisame cuando esté
            </a>
          </div>
        </section>
      ) : borrar ? (
        <Borrar valor={borrar} />
      ) : estado === 'listo' ? (
        <section className="subir-listo">
          <div className="section-inner">
            <h2>Tu CV ya está en la bolsa</h2>
            <p>Cuando un reclutador busque palabras que aparecen en tu CV, le va a aparecer tu perfil y te va a contactar por {form.email ? 'email' : 'teléfono'}.</p>
            {resultado.sinTexto && (
              <p className="subir-aviso">
                No pudimos leer el texto del PDF (puede ser una foto escaneada). Se guardó igual, pero solo te van a encontrar por el puesto
                y las habilidades que escribiste. Si podés, exportalo desde Word, Google Docs o nuestro <Link to="/laboral/cv" className="link">editor de CV</Link>.
              </p>
            )}
            <div className="subir-enlace">
              <p><strong>Guardá este enlace.</strong> Es la única forma de borrar tu CV más adelante:</p>
              <input type="text" readOnly value={resultado.enlace} onFocus={e => e.target.select()} aria-label="Enlace para borrar tu CV" />
              <button type="button" className="btn btn-outline" onClick={() => navigator.clipboard?.writeText(resultado.enlace)}>Copiar enlace</button>
            </div>
          </div>
        </section>
      ) : (
        <section>
          <div className="section-inner subir-layout">
            <form className="contacto-form" onSubmit={enviar}>
              <div className="campo">
                <label htmlFor="cv-archivo">Tu CV en PDF (máximo 2 MB)</label>
                <input id="cv-archivo" type="file" accept="application/pdf" onChange={elegirArchivo} required />
              </div>
              <div className="campo">
                <label htmlFor="cv-nombre">Nombre y apellido</label>
                <input id="cv-nombre" name="nombre" autoComplete="name" required minLength={2} maxLength={120} value={form.nombre} onChange={cambiar} />
              </div>
              <div className="subir-fila">
                <div className="campo">
                  <label htmlFor="cv-email">Email</label>
                  <input id="cv-email" name="email" type="email" autoComplete="email" maxLength={200} value={form.email} onChange={cambiar} />
                </div>
                <div className="campo">
                  <label htmlFor="cv-telefono">Teléfono</label>
                  <input id="cv-telefono" name="telefono" type="tel" autoComplete="tel" maxLength={40} value={form.telefono} onChange={cambiar} />
                </div>
              </div>
              <div className="campo">
                <label htmlFor="cv-ciudad">¿Dónde vivís?</label>
                <select id="cv-ciudad" name="ciudad" required value={form.ciudad} onChange={cambiar}>
                  <option value="">Elegí una opción</option>
                  {CIUDADES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="campo">
                <label htmlFor="cv-puesto">¿Qué trabajo buscás?</label>
                <input id="cv-puesto" name="puesto" maxLength={120} placeholder="Ej. atención al cliente, cadete, administración" value={form.puesto} onChange={cambiar} />
              </div>
              <div className="campo">
                <label htmlFor="cv-habilidades">Habilidades, separadas por coma</label>
                <input id="cv-habilidades" name="habilidades" placeholder="Ej. Excel, caja, inglés, libreta de conducir" value={form.habilidades} onChange={cambiar} />
              </div>
              <label className="campo-check">
                <input type="checkbox" name="acepto" required checked={form.acepto} onChange={cambiar} />
                <span>
                  Acepto que ConectaTuMundo guarde mi CV y que reclutadores autorizados lo encuentren y me contacten.
                  Puedo borrarlo cuando quiera. Más info en la <Link to="/privacy" target="_blank">política de privacidad</Link>.
                </span>
              </label>
              <button type="submit" className="btn btn-primary" disabled={estado !== 'idle'}>
                {estado === 'leyendo' ? 'Leyendo tu CV…' : estado === 'subiendo' ? 'Subiendo…' : 'Subir mi CV'}
              </button>
              <p className="form-estado error" role="alert">{error}</p>
            </form>

            <aside className="subir-info">
              <h2>Cómo funciona</h2>
              <ol>
                <li>Subís tu CV y contás qué trabajo buscás.</li>
                <li>Un reclutador busca, por ejemplo, “ventas Excel Durazno”.</li>
                <li>Si tu CV coincide, ve tu nombre y tu contacto, y te escribe.</li>
              </ol>
              <p>¿Todavía no tenés CV? <Link to="/laboral/cv" className="link">Armalo acá</Link> y descargalo en PDF.</p>
            </aside>
          </div>
        </section>
      )}
    </>
  );
}
