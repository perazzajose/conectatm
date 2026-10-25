import { useSearchParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import SumateBanner from '../../components/SumateBanner';
import { ESTUDIOS, ZONAS, TIPOS, REVISADO } from '../../data/estudios';
import '../../styles/listPage.css';
import './Estudios.css';

const nombreZona = id => ZONAS.find(z => z.id === id)?.nombre;

// Opciones gratuitas para estudiar, filtrables por zona (?zona=durazno) y por tipo
export default function Estudios() {
  const [params, setParams] = useSearchParams();
  const zona = ZONAS.some(z => z.id === params.get('zona')) ? params.get('zona') : '';
  const tipo = TIPOS.some(t => t.id === params.get('tipo')) ? params.get('tipo') : '';

  const filtrar = (clave, valor) => {
    const p = new URLSearchParams(params);
    if (valor) p.set(clave, valor); else p.delete(clave);
    setParams(p, { replace: true, preventScrollReset: true });
  };

  const lista = ESTUDIOS.filter(e => (!zona || e.zonas.includes(zona)) && (!tipo || e.tipo === tipo));

  return (
    <>
      <PageHeader
        fondo="/fondos/aprende.webp"
        title="Estudiá gratis"
        subtitle="Liceo, UTU, universidad, cursos y becas en Durazno, Rocha, Montevideo y online."
      />

      <div className="filtros-wrap estudios-filtros">
        <div className="filtros-scroll" role="group" aria-label="Zona">
          <button className={`filtro-btn${!zona ? ' active' : ''}`} aria-pressed={!zona} onClick={() => filtrar('zona', '')}>Todas</button>
          {ZONAS.map(z => (
            <button key={z.id} className={`filtro-btn${zona === z.id ? ' active' : ''}`} aria-pressed={zona === z.id} onClick={() => filtrar('zona', z.id)}>{z.nombre}</button>
          ))}
        </div>
        <div className="filtros-scroll" role="group" aria-label="Qué querés estudiar">
          <button className={`filtro-btn${!tipo ? ' active' : ''}`} aria-pressed={!tipo} onClick={() => filtrar('tipo', '')}>Todo</button>
          {TIPOS.map(t => (
            <button key={t.id} className={`filtro-btn${tipo === t.id ? ' active' : ''}`} aria-pressed={tipo === t.id} onClick={() => filtrar('tipo', t.id)}>{t.nombre}</button>
          ))}
        </div>
      </div>

      <section className="estudios" aria-label="Opciones para estudiar">
        <div className="section-inner">
          <p className="estudios-cuenta" aria-live="polite">
            {lista.length} {lista.length === 1 ? 'opción' : 'opciones'}{zona && ` en ${nombreZona(zona)}`}
          </p>
          {lista.length ? (
            <ul className="estudios-grid">
              {lista.map(e => (
                <li key={e.id} className={`estudio estudio-${e.tipo}`}>
                  {/* Sin logo queda el espacio igual, para que los títulos de una fila se alineen */}
                  <span className="estudio-logo">{e.logo && <img src={e.logo} alt="" loading="lazy" />}</span>
                  <span className="estudio-tipo">{TIPOS.find(t => t.id === e.tipo).nombre}</span>
                  <h2>{e.nombre}</h2>
                  <p className="estudio-org">{e.org}</p>
                  <p>{e.resumen}</p>
                  <p className="estudio-para"><strong>Para:</strong> {e.para}</p>
                  {zona && e.sedes?.[zona] && <p className="estudio-para"><strong>Dónde:</strong> {e.sedes[zona]}</p>}
                  <ul className="estudio-zonas" aria-label="Zonas">
                    {e.zonas.map(z => <li key={z}>{nombreZona(z)}</li>)}
                  </ul>
                  <a className="link estudio-link" href={e.url} target="_blank" rel="noopener noreferrer">
                    Ver en el sitio oficial<span className="visually-hidden">: {e.nombre}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-results">No hay opciones con esos filtros. Probá con otra zona o con “Todo”.</p>
          )}
          <p className="estudios-nota">
            Todas son gratuitas. Las fechas de inscripción cambian cada año: confirmalas en el sitio oficial. Revisado en {REVISADO}.
            {' '}Los logos son de cada institución; ConectaTuMundo no tiene relación con ellas.
          </p>
        </div>
      </section>

      <SumateBanner
        title="¿Conocés otra opción gratuita?"
        text="Si falta un curso, beca o programa de tu zona, avisame y lo sumo."
        buttonLabel="Avisar"
        mensaje="Hola José, quiero sumar una opción a la sección Estudios"
      />
    </>
  );
}
