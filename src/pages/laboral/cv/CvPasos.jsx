import { Fragment, useEffect, useRef, useState } from 'react';
import { emailValido, faltantes } from './vacios';

// Modo "Paso a paso": completa el mismo CV que la hoja (mismo estado de useCV), de a una sección.
// En celular es más cómodo que tocar sobre la hoja. El PDF sale siempre de la hoja.
const PASOS = ['Tus datos', 'Sobre vos', 'Experiencia', 'Estudios', 'Idiomas y habilidades', 'Listo'];

const NIVELES = [
  { nivel: 2, texto: 'Básico' },
  { nivel: 3, texto: 'Intermedio' },
  { nivel: 4, texto: 'Avanzado' },
  { nivel: 5, texto: 'Nativo' },
];

// Una línea por elemento: así se pueden escribir espacios y comas sin que nada se corte
const aLineas = lista => lista.join('\n');
const deLineas = texto => texto.split('\n');

function Campo({ id, label, ayuda, children }) {
  return (
    <div className="campo">
      <label htmlFor={id}>{label}</label>
      {ayuda && <p className="cv-paso-ayuda" id={`${id}-ayuda`}>{ayuda}</p>}
      {children}
    </div>
  );
}

function Item({ titulo, onQuitar, children }) {
  return (
    <fieldset className="cv-paso-item">
      <legend>{titulo}</legend>
      {children}
      <button type="button" className="link cv-paso-quitar" onClick={onQuitar}>Quitar</button>
    </fieldset>
  );
}

export default function CvPasos({ cv, onFoto, errorFoto, onVerHoja, onDescargar }) {
  const { data } = cv;
  const [paso, setPaso] = useState(0);
  const titulo = useRef(null);
  const primeraVez = useRef(true);

  // Al cambiar de paso, el foco va al título: quien usa lector de pantalla sabe dónde está
  useEffect(() => {
    if (primeraVez.current) { primeraVez.current = false; return; }
    titulo.current?.focus();
  }, [paso]);

  const campo = (nombre, props = {}) => ({
    id: `paso-${nombre}`, value: data[nombre] ?? '', onChange: e => cv.set(nombre, e.target.value), ...props,
  });

  const lista = (seccion, etiquetas) => (
    <>
      {data[seccion].map((it, i) => (
        <Item key={it.id} titulo={`${etiquetas.item} ${i + 1}`} onQuitar={() => cv.quitar(seccion, it.id)}>
          {etiquetas.campos.map(([clave, label, ph]) => (
            <Campo key={clave} id={`${seccion}-${it.id}-${clave}`} label={label}>
              <input id={`${seccion}-${it.id}-${clave}`} value={it[clave]} placeholder={ph}
                onChange={e => cv.editar(seccion, it.id, { [clave]: e.target.value })} />
            </Campo>
          ))}
          {seccion === 'experiencia' && (
            <Campo id={`exp-${it.id}-tareas`} label="¿Qué hacías o qué lograste?" ayuda="Una cosa por línea.">
              <textarea id={`exp-${it.id}-tareas`} rows={3} value={aLineas(it.tareas)}
                placeholder={'Atención al público\nManejo de caja'}
                onChange={e => cv.editar('experiencia', it.id, { tareas: deLineas(e.target.value) })} />
            </Campo>
          )}
        </Item>
      ))}
      <button type="button" className="btn btn-outline" onClick={() => cv.agregar(seccion)}>{etiquetas.agregar}</button>
    </>
  );

  const contenido = [
    // 1. Tus datos
    <Fragment key="datos">
      <Campo id="paso-nombre" label="Nombre y apellido"><input {...campo('nombre')} autoComplete="name" /></Campo>
      <Campo id="paso-cargo" label="¿Qué trabajo buscás o a qué te dedicás?">
        <input {...campo('cargo')} placeholder="Ej. Atención al cliente y ventas" />
      </Campo>
      <div className="cv-paso-fila">
        <Campo id="paso-telefono" label="Teléfono"><input {...campo('telefono')} type="tel" autoComplete="tel" /></Campo>
        <Campo id="paso-email" label="Email">
          <input {...campo('email')} type="email" autoComplete="email" aria-invalid={!emailValido(data.email)}
            aria-describedby={emailValido(data.email) ? undefined : 'paso-email-error'} />
          {!emailValido(data.email) && <p className="cv-paso-error" id="paso-email-error">Al email parece que le falta algo (por ejemplo, “@gmail.com”).</p>}
        </Campo>
      </div>
      <div className="cv-paso-fila">
        <Campo id="paso-ubicacion" label="Ciudad"><input {...campo('ubicacion')} placeholder="Ej. Durazno" /></Campo>
        <Campo id="paso-web" label="LinkedIn o sitio web (opcional)"><input {...campo('web')} /></Campo>
      </div>
      <div className="campo">
        <span className="cv-paso-label">Foto (opcional)</span>
        {data.foto ? (
          <div className="cv-paso-foto">
            <img src={data.foto} alt="Tu foto" />
            <button type="button" className="link" onClick={() => cv.set('foto', null)}>Quitar foto</button>
          </div>
        ) : (
          <input type="file" accept="image/*" onChange={onFoto} aria-label="Elegir foto" />
        )}
        {errorFoto && <p className="cv-paso-error">No se pudo leer esa imagen. Probá con otra en JPG o PNG.</p>}
      </div>
    </Fragment>,
    // 2. Sobre vos
    <Campo key="perfil" id="paso-perfil" label="Contá en dos o tres frases quién sos y qué buscás"
      ayuda="Ej.: “Soy responsable y me gusta el trato con la gente. Terminé el liceo y busco mi primer trabajo en atención al público.”">
      <textarea {...campo('perfil')} rows={5} aria-describedby="paso-perfil-ayuda" />
    </Campo>,
    // 3. Experiencia
    <Fragment key="experiencia">
      <p className="cv-paso-ayuda">¿Es tu primer trabajo? Sumá changas, voluntariados, prácticas o proyectos de estudio: todo cuenta.</p>
      {lista('experiencia', {
        item: 'Trabajo', agregar: data.experiencia.length ? 'Agregar otro trabajo' : 'Agregar un trabajo',
        campos: [['titulo', 'Empresa o lugar', 'Ej. Supermercado del barrio'], ['subtitulo', 'Puesto', 'Ej. Cajera'], ['fecha', 'Desde – hasta', 'Ej. 2022 – 2024']],
      })}
    </Fragment>,
    // 4. Estudios
    <Fragment key="estudios">
      <h3 className="cv-paso-sub">Educación</h3>
      {lista('educacion', {
        item: 'Estudio', agregar: 'Agregar un estudio',
        campos: [['titulo', 'Título o carrera', 'Ej. Bachillerato completo'], ['subtitulo', 'Institución', 'Ej. Liceo de Durazno'], ['fecha', 'Años', 'Ej. 2019 – 2024']],
      })}
      <h3 className="cv-paso-sub">Cursos</h3>
      {lista('cursos', {
        item: 'Curso', agregar: 'Agregar un curso',
        campos: [['titulo', 'Nombre del curso', 'Ej. Excel básico'], ['subtitulo', 'Dónde y cuándo', 'Ej. INEFOP, 2023']],
      })}
    </Fragment>,
    // 5. Idiomas y habilidades
    <Fragment key="idiomas">
      <h3 className="cv-paso-sub">Idiomas</h3>
      {data.idiomas.map((it, i) => (
        <Item key={it.id} titulo={`Idioma ${i + 1}`} onQuitar={() => cv.quitar('idiomas', it.id)}>
          <div className="cv-paso-fila">
            <Campo id={`idioma-${it.id}`} label="Idioma">
              <input id={`idioma-${it.id}`} value={it.nombre} placeholder="Ej. Inglés" onChange={e => cv.editar('idiomas', it.id, { nombre: e.target.value })} />
            </Campo>
            <Campo id={`nivel-${it.id}`} label="Nivel">
              <select id={`nivel-${it.id}`} value={it.nivel}
                onChange={e => { const n = NIVELES.find(x => x.nivel === Number(e.target.value)); cv.editar('idiomas', it.id, { nivel: n.nivel, nivelTexto: n.texto }); }}>
                {NIVELES.map(n => <option key={n.nivel} value={n.nivel}>{n.texto}</option>)}
              </select>
            </Campo>
          </div>
        </Item>
      ))}
      <button type="button" className="btn btn-outline" onClick={() => cv.agregar('idiomas')}>Agregar un idioma</button>
      <h3 className="cv-paso-sub">Habilidades</h3>
      <Campo id="paso-habilidades" label="¿Qué sabés hacer?" ayuda="Una por línea. Ej.: Excel, atención al público, libreta de conducir.">
        <textarea id="paso-habilidades" rows={4} value={aLineas(data.habilidades)} aria-describedby="paso-habilidades-ayuda"
          onChange={e => cv.set('habilidades', deLineas(e.target.value))} />
      </Campo>
    </Fragment>,
    // 6. Listo
    (() => {
      const f = faltantes(data);
      return (
        <Fragment key="listo">
          {f.length ? (
            <p className="cv-paso-aviso">Antes de descargarlo, te conviene sumar: {f.join(', ')}.</p>
          ) : (
            <p className="cv-paso-ok">Tu CV está completo.</p>
          )}
          <p>Las secciones que dejaste vacías no salen en el PDF. Podés ver cómo quedó y retocarlo sobre la hoja.</p>
          <div className="cv-paso-final">
            <button type="button" className="btn btn-primary" onClick={onDescargar}>Descargar PDF</button>
            <button type="button" className="btn btn-outline" onClick={onVerHoja}>Ver cómo quedó</button>
          </div>
        </Fragment>
      );
    })(),
  ];

  return (
    <section className="cv-pasos" aria-labelledby="cv-paso-titulo">
      <ol className="cv-pasos-nav" aria-label="Pasos">
        {PASOS.map((p, i) => (
          <li key={p}>
            <button type="button" className={i === paso ? 'activo' : i < paso ? 'hecho' : ''} aria-current={i === paso ? 'step' : undefined}
              onClick={() => setPaso(i)}>
              <span aria-hidden="true">{i + 1}</span><span className="cv-pasos-nombre">{p}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="cv-paso">
        <p className="cv-paso-num">Paso {paso + 1} de {PASOS.length}</p>
        <h2 id="cv-paso-titulo" tabIndex={-1} ref={titulo}>{PASOS[paso]}</h2>
        {contenido[paso]}
        <div className="cv-paso-botones">
          {paso > 0 && <button type="button" className="btn btn-outline" onClick={() => setPaso(paso - 1)}>Anterior</button>}
          {paso < PASOS.length - 1 && <button type="button" className="btn btn-primary" onClick={() => setPaso(paso + 1)}>Siguiente</button>}
        </div>
      </div>
    </section>
  );
}
