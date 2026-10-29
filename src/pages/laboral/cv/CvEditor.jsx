import { lazy, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon, { icons } from '../../../components/Icon';
import FaqItem from '../../../components/FaqItem';
import Editable from './Editable';
import useCV, { CV_VACIO } from './useCV';
import Consejos from './Consejos';
import CvPasos from './CvPasos';
import { EJEMPLOS } from './ejemplos';
import { lleno, itemLleno, vacio } from './vacios';
import './CvEditor.css';

// Responden lo que la gente busca antes de usar el editor (y le dan contexto a Google)
const PREGUNTAS = [
  { q: '¿Es gratis?', a: 'Sí. Armás el CV, lo descargás en PDF las veces que quieras y no hay que pagar ni registrarse. El PDF sale sin marcas ni publicidad.' },
  { q: '¿Puedo hacerlo desde el celular?', a: 'Sí. Tocá cualquier texto de la hoja para escribir. Al tocar “Descargar PDF” se abre la opción de imprimir: en Android elegí “Guardar como PDF”; en iPhone, tocá el botón de compartir y elegí “Guardar en Archivos”.' },
  { q: '¿Dónde quedan mis datos?', a: 'Solo en tu navegador, en este dispositivo. No se suben a ningún servidor. Si borrás los datos del navegador o cambiás de celular, no vas a encontrarlo: guardá siempre el PDF.' },
  { q: '¿Qué pasa con las secciones que no completo?', a: 'No salen en el PDF. Si no tenés idiomas o cursos, dejalos vacíos y el CV queda prolijo igual.' },
  { q: 'No tengo experiencia, ¿qué pongo?', a: 'Tocá el ejemplo “Primer empleo” para ver uno armado. Changas, voluntariados, proyectos de estudio y cursos cortos cuentan; en “Consejos para armar tu CV” hay más ideas.' },
  { q: '¿Y después de tenerlo listo?', a: 'Abajo de la hoja te mostramos las últimas ofertas de tu departamento en LinkedIn, Computrabajo y BuscoJobs. También podés subir tu CV a la bolsa para que te encuentren empresas de Durazno, Rocha y Montevideo.' },
];

const OfertasEmpleo = lazy(() => import('../../../components/OfertasEmpleo'));

const COLORES = [
  { hex: '#2F5B3A', nombre: 'Verde' },
  { hex: '#245E9E', nombre: 'Azul' },
  { hex: '#8E3A86', nombre: 'Violeta' },
  { hex: '#B04A3C', nombre: 'Rojo teja' },
  { hex: '#22162B', nombre: 'Casi negro' },
  { hex: '#4A6670', nombre: 'Gris azulado' },
];

// Achica la foto antes de guardarla: una foto de celular en base64 llenaría el localStorage.
const leerFoto = (file) => new Promise((resolve, reject) => {
  const img = new Image();
  img.onload = () => {
    const lado = 360;
    const escala = Math.min(1, lado / Math.min(img.width, img.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.width * escala);
    canvas.height = Math.round(img.height * escala);
    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(img.src);
    resolve(canvas.toDataURL('image/jpeg', 0.85));
  };
  img.onerror = reject;
  img.src = URL.createObjectURL(file);
});

// Paso a paso o sobre la hoja. Se recuerda la elección; si no hay, en celular arranca paso a paso.
const CLAVE_MODO = 'ctm-cv-modo';
function modoInicial() {
  if (typeof window === 'undefined') return 'hoja';
  try { const m = localStorage.getItem(CLAVE_MODO); if (m === 'pasos' || m === 'hoja') return m; } catch { /* sin almacenamiento */ }
  return window.matchMedia?.('(max-width: 759px)').matches ? 'pasos' : 'hoja';
}

const tieneDatos = d => JSON.stringify({ ...d, color: '' }) !== JSON.stringify({ ...CV_VACIO, color: '' });

function Titulo({ icon, value, onChange, onAgregar, agregarLabel }) {
  return (
    <div className="cv-titulo">
      <span className="cv-titulo-icono"><Icon size="15">{icon}</Icon></span>
      <Editable value={value} onChange={onChange} label="Título de la sección" />
      {onAgregar && (
        <button type="button" className="cv-control cv-agregar" onClick={onAgregar} aria-label={agregarLabel}>
          <Icon size="16">{icons.mas}</Icon>
        </button>
      )}
    </div>
  );
}

function Quitar({ onClick, label }) {
  return (
    <button type="button" className="cv-control cv-quitar" onClick={onClick} aria-label={label}>
      <Icon size="15">{icons.basura}</Icon>
    </button>
  );
}

export default function CvEditor() {
  const cv = useCV();
  const { data } = cv;
  const [errorFoto, setErrorFoto] = useState(false);
  const [modo, setModoEstado] = useState(modoInicial);
  const setModo = (m) => {
    setModoEstado(m);
    try { localStorage.setItem(CLAVE_MODO, m); } catch { /* solo no se recuerda */ }
  };
  const verHoja = () => {
    setModo('hoja');
    requestAnimationFrame(() => document.getElementById('cv-hoja')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const handleFoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      cv.set('foto', await leerFoto(file));
      setErrorFoto(false);
    } catch {
      setErrorFoto(true);
    }
  };

  const reiniciar = () => {
    if (window.confirm('¿Borrar todo el CV y empezar de cero? No se puede deshacer.')) cv.reiniciar();
  };

  const usarEjemplo = (ej) => {
    if (tieneDatos(data) && !window.confirm('Esto reemplaza lo que escribiste por el ejemplo. ¿Seguir?')) return;
    cv.cargar(ej.data);
  };

  // El título de la página es el nombre que el navegador propone al guardar el PDF
  const descargar = () => {
    const anterior = document.title;
    document.title = lleno(data.nombre) ? `CV ${data.nombre.trim()}` : 'Mi CV';
    window.print();
    document.title = anterior;
    // Con el CV listo, el siguiente paso es postularse
    document.getElementById('cv-ofertas')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const contactos = [
    { campo: 'telefono', icon: icons.telefono, ph: 'Teléfono' },
    { campo: 'email', icon: icons.mail, ph: 'Email' },
    { campo: 'web', icon: icons.enlace, ph: 'LinkedIn o sitio web' },
    { campo: 'ubicacion', icon: icons.ubicacion, ph: 'Ciudad' },
  ];

  return (
    <div className="cv-pagina" style={{ '--cv': data.color }}>
      <div className="cv-intro">
        <nav className="miga" aria-label="Estás en">
          <Link to="/">Inicio</Link><span aria-hidden="true">/</span>
          <Link to="/laboral">Trabajo</Link><span aria-hidden="true">/</span>
          <span aria-current="page">Armá tu CV</span>
        </nav>
        <h1>Armá tu CV gratis</h1>
        <p>Completá tu currículum desde el celular o la compu, sin registrarte y sin pagar, y descargalo en PDF listo para mandar. Se guarda solo en este navegador.</p>

        <div className="cv-ejemplos">
          <h2>Empezá con un ejemplo</h2>
          <div className="cv-ejemplos-grid">
            {EJEMPLOS.map(ej => (
              <button key={ej.id} type="button" className={`cv-ejemplo cv-ejemplo-${ej.id}`} onClick={() => usarEjemplo(ej)} style={{ '--ej': ej.data.color }}>
                <span className="cv-mini" aria-hidden="true">
                  <span className="cv-mini-lateral"><i /><b /><b /><b /></span>
                  <span className="cv-mini-principal"><i /><b /><b className="largo" /><b /><b className="largo" /><b /></span>
                </span>
                <span className="cv-ejemplo-texto">
                  <strong>{ej.titulo}</strong>
                  <span>{ej.desc}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <Consejos />
      </div>

      <div className="cv-modo" role="radiogroup" aria-label="¿Cómo querés completarlo?">
        <span className="cv-modo-label" aria-hidden="true">¿Cómo querés completarlo?</span>
        {[['pasos', 'Paso a paso'], ['hoja', 'Sobre la hoja']].map(([m, label]) => (
          <button key={m} type="button" role="radio" aria-checked={modo === m} className={modo === m ? 'activo' : ''} onClick={() => setModo(m)}>{label}</button>
        ))}
      </div>

      {modo === 'pasos' && <CvPasos cv={cv} onFoto={handleFoto} errorFoto={errorFoto} onVerHoja={verHoja} onDescargar={descargar} />}

      {/* En modo paso a paso la hoja no se ve en pantalla, pero sigue ahí para imprimir el PDF */}
      <div className={`cv-hoja${modo === 'pasos' ? ' cv-hoja-oculta' : ''}`} id="cv-hoja">
        {/* La columna principal va primero en el código: así el PDF arranca por el nombre y los ATS lo leen en orden.
            Se ve a la derecha por la ubicación en la grilla (CvEditor.css). */}
        <div className="cv-principal">
          <header className="cv-cabecera">
            <Editable value={data.nombre} onChange={v => cv.set('nombre', v)} placeholder="Tu nombre y apellido" className="cv-nombre" />
            <Editable value={data.cargo} onChange={v => cv.set('cargo', v)} placeholder="A qué te dedicás o qué buscás" className="cv-cargo" />
          </header>

          <section className={`cv-seccion${vacio(lleno(data.perfil))}`}>
            <Titulo icon={icons.sobre} value={data.titulos.perfil} onChange={v => cv.setTitulo('perfil', v)} />
            <Editable multiline value={data.perfil} onChange={v => cv.set('perfil', v)} className="cv-perfil"
              placeholder="Dos o tres frases sobre vos: qué sabés hacer, qué te interesa y qué tipo de trabajo buscás." />
          </section>

          <section className={`cv-seccion${vacio(data.experiencia.some(itemLleno))}`}>
            <Titulo icon={icons.emprendimientos} value={data.titulos.experiencia} onChange={v => cv.setTitulo('experiencia', v)}
              onAgregar={() => cv.agregar('experiencia')} agregarLabel="Agregar experiencia" />
            {data.experiencia.length === 0 && (
              <p className="cv-ayuda">Tocá el + para agregar un trabajo. Si es tu primer empleo, sumá changas, voluntariados o proyectos de estudio.</p>
            )}
            {data.experiencia.map(it => (
              <div key={it.id} className={`cv-item cv-exp${vacio(itemLleno(it))}`}>
                <Quitar onClick={() => cv.quitar('experiencia', it.id)} label="Quitar experiencia" />
                <div className="cv-exp-fila">
                  <Editable value={it.titulo} onChange={v => cv.editar('experiencia', it.id, { titulo: v })} placeholder="Empresa o lugar" className="cv-exp-empresa" />
                  <Editable value={it.fecha} onChange={v => cv.editar('experiencia', it.id, { fecha: v })} placeholder="Desde – hasta" className="cv-item-fecha" />
                </div>
                <Editable value={it.subtitulo} onChange={v => cv.editar('experiencia', it.id, { subtitulo: v })} placeholder="Puesto" className="cv-exp-puesto" multiline />
                <ul className="cv-tareas">
                  {it.tareas.map((t, n) => (
                    <li key={n} className={t ? '' : 'vacio'}>
                      <Editable multiline value={t} onChange={v => cv.editarTarea(it.id, n, v)} placeholder="Qué hacías o qué lograste" />
                      <Quitar onClick={() => cv.quitarTarea(it.id, n)} label="Quitar tarea" />
                    </li>
                  ))}
                </ul>
                <button type="button" className="cv-control cv-agregar-texto" onClick={() => cv.agregarTarea(it.id)}>+ Agregar tarea</button>
              </div>
            ))}
          </section>
        </div>

        <aside className="cv-lateral">
          <div className="cv-foto">
            {data.foto ? (
              <>
                <img src={data.foto} alt="Tu foto" />
                <button type="button" className="cv-control cv-foto-quitar" onClick={() => cv.set('foto', null)}>Quitar foto</button>
              </>
            ) : (
              <label className="cv-foto-subir">
                <Icon size="28">{icons.camara}</Icon>
                <span>Agregar foto (opcional)</span>
                <input type="file" accept="image/*" onChange={handleFoto} className="visually-hidden" />
              </label>
            )}
            {errorFoto && <p className="cv-error">No se pudo leer esa imagen. Probá con otra en JPG o PNG.</p>}
          </div>

          <section className={`cv-seccion${vacio(contactos.some(c => lleno(data[c.campo])))}`}>
            <Titulo icon={icons.mail} value={data.titulos.contacto} onChange={v => cv.setTitulo('contacto', v)} />
            <ul className="cv-contacto">
              {contactos.map(c => (
                <li key={c.campo} className={data[c.campo] ? '' : 'vacio'}>
                  <Icon size="14">{c.icon}</Icon>
                  <Editable value={data[c.campo]} onChange={v => cv.set(c.campo, v)} placeholder={c.ph} />
                </li>
              ))}
            </ul>
          </section>

          <section className={`cv-seccion${vacio(data.educacion.some(itemLleno))}`}>
            <Titulo icon={icons.tutores} value={data.titulos.educacion} onChange={v => cv.setTitulo('educacion', v)}
              onAgregar={() => cv.agregar('educacion')} agregarLabel="Agregar estudio" />
            {data.educacion.map(it => (
              <div key={it.id} className={`cv-item${vacio(itemLleno(it))}`}>
                <Quitar onClick={() => cv.quitar('educacion', it.id)} label="Quitar estudio" />
                <Editable value={it.titulo} onChange={v => cv.editar('educacion', it.id, { titulo: v })} placeholder="Título o carrera" className="cv-item-titulo" multiline />
                <Editable value={it.subtitulo} onChange={v => cv.editar('educacion', it.id, { subtitulo: v })} placeholder="Institución" className="cv-item-sub" multiline />
                <Editable value={it.fecha} onChange={v => cv.editar('educacion', it.id, { fecha: v })} placeholder="Años (ej. 2019 – 2023)" className="cv-item-fecha" />
              </div>
            ))}
          </section>

          <section className={`cv-seccion${vacio(data.cursos.some(itemLleno))}`}>
            <Titulo icon={icons.asesoria} value={data.titulos.cursos} onChange={v => cv.setTitulo('cursos', v)}
              onAgregar={() => cv.agregar('cursos')} agregarLabel="Agregar curso" />
            {data.cursos.map(it => (
              <div key={it.id} className={`cv-item${vacio(itemLleno(it))}`}>
                <Quitar onClick={() => cv.quitar('cursos', it.id)} label="Quitar curso" />
                <Editable value={it.titulo} onChange={v => cv.editar('cursos', it.id, { titulo: v })} placeholder="Nombre del curso" className="cv-item-titulo" multiline />
                <Editable value={it.subtitulo} onChange={v => cv.editar('cursos', it.id, { subtitulo: v })} placeholder="Dónde lo hiciste" className="cv-item-sub" multiline />
              </div>
            ))}
          </section>

          <section className={`cv-seccion${vacio(data.idiomas.some(it => lleno(it.nombre)))}`}>
            <Titulo icon={icons.globo} value={data.titulos.idiomas} onChange={v => cv.setTitulo('idiomas', v)}
              onAgregar={() => cv.agregar('idiomas')} agregarLabel="Agregar idioma" />
            {data.idiomas.map(it => (
              <div key={it.id} className={`cv-item cv-idioma${vacio(lleno(it.nombre))}`}>
                <Quitar onClick={() => cv.quitar('idiomas', it.id)} label="Quitar idioma" />
                <div className="cv-idioma-fila">
                  <Editable value={it.nombre} onChange={v => cv.editar('idiomas', it.id, { nombre: v })} placeholder="Idioma" className="cv-item-titulo" />
                  <Editable value={it.nivelTexto} onChange={v => cv.editar('idiomas', it.id, { nivelTexto: v })} placeholder="Nivel" className="cv-item-fecha" />
                </div>
                <div className="cv-nivel" role="group" aria-label={`Nivel de ${it.nombre || 'idioma'}`}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <button key={n} type="button" className={n <= it.nivel ? 'on' : ''} aria-label={`Nivel ${n} de 5`}
                      aria-pressed={n <= it.nivel} onClick={() => cv.editar('idiomas', it.id, { nivel: n })} />
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className={`cv-seccion${vacio(data.habilidades.some(lleno))}`}>
            <Titulo icon={icons.soporte} value={data.titulos.habilidades} onChange={v => cv.setTitulo('habilidades', v)}
              onAgregar={cv.agregarHabilidad} agregarLabel="Agregar habilidad" />
            <ul className="cv-habilidades">
              {data.habilidades.map((h, n) => (
                <li key={n} className={h ? '' : 'vacio'}>
                  <Editable value={h} onChange={v => cv.editarHabilidad(n, v)} placeholder="Ej. Excel, atención al público" />
                  <Quitar onClick={() => cv.quitarHabilidad(n)} label="Quitar habilidad" />
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <div className="cv-barra" role="toolbar" aria-label="Acciones del CV">
        <div className="cv-colores" role="radiogroup" aria-label="Color del CV">
          {COLORES.map(c => (
            <button key={c.hex} type="button" role="radio" aria-checked={data.color === c.hex} aria-label={c.nombre}
              style={{ background: c.hex }} onClick={() => cv.set('color', c.hex)} />
          ))}
        </div>
        <button type="button" className="btn btn-outline cv-borrar" onClick={reiniciar}>Borrar todo</button>
        <button type="button" className="btn btn-primary" onClick={descargar}>
          <Icon size="20">{icons.descarga}</Icon> Descargar PDF
        </button>
      </div>
      <p className="cv-pdf-ayuda">
        Para descargar: tocá “Descargar PDF” y en la ventana de impresión elegí “Guardar como PDF”. Las secciones que dejes vacías no salen en el PDF.
        {' '}¿Ya lo tenés? <Link to="/laboral/subir" className="link">Subilo a la bolsa de CVs</Link> para que te encuentren.
      </p>

      <section id="cv-ofertas" className="cv-ofertas" aria-label="Ofertas de trabajo">
        <Suspense fallback={<p>Cargando ofertas…</p>}>
          <OfertasEmpleo titulo="Con tu CV listo, postulate" />
        </Suspense>
      </section>

      <section className="cv-preguntas" aria-labelledby="cv-preguntas-titulo">
        <h2 id="cv-preguntas-titulo">Preguntas sobre el editor de CV</h2>
        <div className="faq-list">
          {PREGUNTAS.map(p => <FaqItem key={p.q} question={p.q} answer={p.a} />)}
        </div>
      </section>
    </div>
  );
}
