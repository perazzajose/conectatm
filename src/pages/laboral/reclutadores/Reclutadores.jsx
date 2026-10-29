import { useEffect, useState } from 'react';
import PageHeader from '../../../components/PageHeader';
import { supabase, supabaseConfigurado, BUCKET_CVS } from '../../../lib/supabase';
import { waLink } from '../../../data/contacto';
import './Reclutadores.css';

const CIUDADES = ['Durazno', 'Rocha', 'Montevideo', 'Otra'];
const EJEMPLOS = ['ventas atención al público', 'Excel administración', 'depósito stock', 'inglés'];

// Códigos que devuelve la función solicitar_acceso_reclutador, en palabras para la persona
const ERRORES_SOLICITUD = {
  nombre: 'Escribí tu nombre y apellido.',
  empresa: 'Escribí el nombre de tu negocio o empresa.',
  email: 'Revisá el email: parece que le falta algo.',
  repetido: 'Ya recibimos una solicitud con ese email. Te vamos a responder a la brevedad.',
  cupo: 'Se recibieron muchas solicitudes ahora mismo. Probá de nuevo en un rato.',
};

// ts_headline marca las coincidencias con [[ ]]: las convertimos a <mark> sin usar HTML crudo
function Fragmento({ texto }) {
  if (!texto) return null;
  const partes = texto.split(/(\[\[.*?\]\])/g);
  return (
    <p className="rec-fragmento">
      {partes.map((p, i) => (p.startsWith('[[') ? <mark key={i}>{p.slice(2, -2)}</mark> : p))}
    </p>
  );
}

function PedirAcceso() {
  const inicial = { nombre: '', empresa: '', email: '', telefono: '', motivo: '' };
  const [form, setForm] = useState(inicial);
  const [estado, setEstado] = useState('idle'); // idle | enviando | listo
  const [error, setError] = useState('');

  const cambiar = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const enviar = async (e) => {
    e.preventDefault();
    setError('');
    setEstado('enviando');
    const { error: err } = await supabase.rpc('solicitar_acceso_reclutador', {
      p_nombre: form.nombre, p_empresa: form.empresa, p_email: form.email,
      p_telefono: form.telefono, p_motivo: form.motivo,
    });
    if (err) {
      const codigo = Object.keys(ERRORES_SOLICITUD).find(c => err.message?.includes(`[${c}]`));
      setError(codigo ? ERRORES_SOLICITUD[codigo] : 'No se pudo enviar la solicitud. Revisá tu conexión y volvé a intentar.');
      setEstado('idle');
      return;
    }
    setEstado('listo');
  };

  if (estado === 'listo') {
    return (
      <div className="rec-pedir rec-pedir-ok">
        <h2>¡Solicitud enviada!</h2>
        <p>La recibimos. Cuando aprobemos tu acceso, te mandamos tu usuario y contraseña para entrar al buscador.</p>
      </div>
    );
  }

  return (
    <form className="contacto-form rec-pedir" onSubmit={enviar}>
      <h2>¿Buscás personal?</h2>
      <p>El buscador es para emprendimientos y pymes de la zona. Pedí tu acceso y te lo activamos.</p>
      <div className="campo">
        <label htmlFor="sol-nombre">Tu nombre</label>
        <input id="sol-nombre" name="nombre" autoComplete="name" required minLength={2} maxLength={120} value={form.nombre} onChange={cambiar} />
      </div>
      <div className="campo">
        <label htmlFor="sol-empresa">Negocio o empresa</label>
        <input id="sol-empresa" name="empresa" required minLength={2} maxLength={120} value={form.empresa} onChange={cambiar} />
      </div>
      <div className="campo">
        <label htmlFor="sol-email">Email</label>
        <input id="sol-email" name="email" type="email" autoComplete="email" required maxLength={200} value={form.email} onChange={cambiar} />
      </div>
      <div className="campo">
        <label htmlFor="sol-telefono">Teléfono <span className="rec-opcional">(opcional)</span></label>
        <input id="sol-telefono" name="telefono" type="tel" autoComplete="tel" maxLength={40} value={form.telefono} onChange={cambiar} />
      </div>
      <div className="campo">
        <label htmlFor="sol-motivo">¿Qué perfiles buscás? <span className="rec-opcional">(opcional)</span></label>
        <textarea id="sol-motivo" name="motivo" rows={2} maxLength={1000} placeholder="Ej. vendedores, administrativos, depósito" value={form.motivo} onChange={cambiar} />
      </div>
      <button type="submit" className="btn btn-primary" disabled={estado === 'enviando'}>
        {estado === 'enviando' ? 'Enviando…' : 'Pedir acceso'}
      </button>
      <p className="form-estado error" role="alert">{error}</p>
      <p className="rec-pedir-wa">
        ¿Preferís WhatsApp?{' '}
        <a className="link" href={waLink('Hola José, quiero un usuario de reclutador para buscar CVs')} target="_blank" rel="noopener noreferrer">
          Escribinos
        </a>
      </p>
    </form>
  );
}

function Login() {
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const entrar = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setError('');
    const { error: err } = await supabase.auth.signInWithPassword({ email, password: clave });
    if (err) setError('Email o contraseña incorrectos.');
    setEnviando(false);
  };

  return (
    <div className="rec-login-layout">
      <form className="contacto-form rec-login" onSubmit={entrar}>
        <h2>Entrar</h2>
        <div className="campo">
          <label htmlFor="rec-email">Email</label>
          <input id="rec-email" type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="campo">
          <label htmlFor="rec-clave">Contraseña</label>
          <input id="rec-clave" type="password" autoComplete="current-password" required value={clave} onChange={e => setClave(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={enviando}>{enviando ? 'Entrando…' : 'Entrar'}</button>
        <p className="form-estado error" role="alert">{error}</p>
      </form>
      <PedirAcceso />
    </div>
  );
}

function Buscador({ onSalir }) {
  const [consulta, setConsulta] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [resultados, setResultados] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const buscar = async (texto = consulta) => {
    setCargando(true);
    setError('');
    const { data, error: err } = await supabase.rpc('buscar_cvs', { consulta: texto, p_ciudad: ciudad || null });
    setCargando(false);
    if (err) { setError('No se pudo hacer la búsqueda. Volvé a intentar.'); return; }
    setResultados(data);
  };

  const abrirCv = async (archivo) => {
    // Abrimos la pestaña antes del await para que el navegador no la bloquee como popup
    const pestana = window.open('', '_blank');
    const { data, error: err } = await supabase.storage.from(BUCKET_CVS).createSignedUrl(archivo, 300);
    if (err || !data) { pestana?.close(); setError('No se pudo abrir el CV.'); return; }
    if (pestana) pestana.location.href = data.signedUrl; else window.location.href = data.signedUrl;
  };

  // El servidor devuelve cuántas palabras de la búsqueda usó; 0 = listado de recientes
  const terminos = resultados?.[0]?.terminos_total ?? 0;

  return (
    <>
      <form className="rec-busqueda" onSubmit={e => { e.preventDefault(); buscar(); }} role="search">
        <div className="campo rec-campo-consulta">
          <label htmlFor="rec-consulta">¿Qué perfil buscás?</label>
          <input id="rec-consulta" type="search" placeholder="Palabras clave: puesto, habilidades, herramientas" value={consulta} onChange={e => setConsulta(e.target.value)} />
        </div>
        <div className="campo">
          <label htmlFor="rec-ciudad">Ciudad</label>
          <select id="rec-ciudad" value={ciudad} onChange={e => setCiudad(e.target.value)}>
            <option value="">Todas</option>
            {CIUDADES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={cargando}>{cargando ? 'Buscando…' : 'Buscar'}</button>
      </form>
      <div className="rec-ejemplos">
        <span>Probá con:</span>
        {EJEMPLOS.map(ej => (
          <button key={ej} type="button" className="filtro-btn" onClick={() => { setConsulta(ej); buscar(ej); }}>{ej}</button>
        ))}
      </div>

      {error && <p className="form-estado error" role="alert">{error}</p>}

      {resultados && (
        <div aria-live="polite">
          <p className="rec-total">
            {resultados.length === 0
              ? 'Ningún CV coincide. Probá con menos palabras o con sinónimos (ej. "vendedor" en vez de "comercial").'
              : terminos > 0
                ? `${resultados.length} CV${resultados.length > 1 ? 's' : ''}, ordenados por cuántas palabras coinciden`
                : `Los ${resultados.length} CVs más recientes`}
          </p>
          <ol className="rec-lista">
            {resultados.map(r => (
              <li key={r.id} className="rec-cv">
                <div className="rec-cv-cabecera">
                  <div>
                    <h3>{r.nombre}</h3>
                    <p className="rec-cv-sub">{[r.puesto, r.ciudad].filter(Boolean).join(', ')}</p>
                  </div>
                  {terminos > 0 && (
                    <span className={`rec-match${r.coincidencias.length === terminos ? ' completo' : ''}`}>
                      {r.coincidencias.length} de {terminos}
                    </span>
                  )}
                </div>
                {r.coincidencias.length > 0 && (
                  <p className="rec-coinc">Coincide con: {r.coincidencias.join(', ')}</p>
                )}
                {r.habilidades.length > 0 && (
                  <ul className="rec-habilidades" aria-label="Habilidades">
                    {r.habilidades.map(h => <li key={h}>{h}</li>)}
                  </ul>
                )}
                <Fragmento texto={r.fragmento} />
                <div className="rec-acciones">
                  <button type="button" className="btn btn-primary" onClick={() => abrirCv(r.archivo)}>Ver CV</button>
                  {r.email && <a className="link" href={`mailto:${r.email}`}>{r.email}</a>}
                  {r.telefono && <a className="link" href={`tel:${r.telefono}`}>{r.telefono}</a>}
                  <span className="rec-fecha">Subido el {new Date(r.creado).toLocaleDateString('es-UY')}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      <button type="button" className="link rec-salir" onClick={onSalir}>Cerrar sesión</button>
    </>
  );
}

export default function Reclutadores() {
  const [sesion, setSesion] = useState(undefined);
  const [habilitado, setHabilitado] = useState(null);

  useEffect(() => {
    if (!supabaseConfigurado) return;
    supabase.auth.getSession().then(({ data }) => setSesion(data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSesion(s));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!sesion) { setHabilitado(null); return; }
    supabase.rpc('es_reclutador').then(({ data }) => setHabilitado(Boolean(data)));
  }, [sesion]);

  const salir = () => supabase.auth.signOut();

  let contenido;
  if (!supabaseConfigurado) contenido = <p className="section-sub">El buscador se está terminando de configurar.</p>;
  else if (sesion === undefined) contenido = <p className="section-sub">Cargando…</p>;
  else if (!sesion) contenido = <Login />;
  else if (habilitado === null) contenido = <p className="section-sub">Verificando tu acceso…</p>;
  else if (!habilitado) contenido = (
    <div>
      <p className="section-sub">Tu usuario todavía no está habilitado para buscar CVs. Escribile a José para activarlo.</p>
      <button type="button" className="link rec-salir" onClick={salir}>Cerrar sesión</button>
    </div>
  );
  else contenido = <Buscador onSalir={salir} />;

  return (
    <>
      <PageHeader
        camino="laboral"
        pagina="Reclutadores"
        title="Buscá personal en la zona"
        subtitle="Escribí lo que necesitás y te mostramos los CVs que mejor coinciden, de gente de Durazno, Rocha y Montevideo."
      />
      <section className="rec">
        <div className="section-inner">{contenido}</div>
      </section>
    </>
  );
}
