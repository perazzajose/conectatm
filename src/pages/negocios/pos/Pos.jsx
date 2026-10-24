import { useMemo, useState } from 'react';
import PageHeader from '../../../components/PageHeader';
import SumateBanner from '../../../components/SumateBanner';
import { PROVEEDORES, MEDIOS_LABEL, REVISADO, TOPES, glosario } from '../../../data/posProveedores';
import PosRecomendador from './PosRecomendador';
import PosCard from './PosCard';
import PosTabla from './PosTabla';
import '../../../styles/listPage.css';
import './Pos.css';

export default function Pos() {
  const [filtrosActivos, setFiltrosActivos] = useState(new Set());

  const toggleFiltro = (key) => {
    setFiltrosActivos(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const lista = useMemo(() => {
    if (filtrosActivos.size === 0) return PROVEEDORES;
    return PROVEEDORES.filter(p => [...filtrosActivos].every(m => p.medios.includes(m)));
  }, [filtrosActivos]);

  return (
    <>
      <PageHeader
        camino="negocios"
        pagina="Comparador de POS"
        title="¿Con qué POS te conviene cobrar?"
        subtitle={`Respondé cuatro preguntas y te recomendamos entre ${PROVEEDORES.length} proveedores que operan en Uruguay. Abajo tenés la comparación completa.`}
      />

      <section id="recomendador" aria-label="Recomendador de POS">
        <div className="section-inner">
          <PosRecomendador />
        </div>
      </section>

      <section id="comparador" className="pos-comparador">
        <div className="section-inner">
          <h2>Todos los proveedores</h2>
          <p className="section-sub">
            Filtrá por los medios de pago que necesitás. La mayoría no publica comisiones: cuando no hay dato, dice “a cotizar” en vez de inventar un número.
          </p>
        </div>
        <div className="filtros-wrap">
          <div className="filtros-scroll" role="group" aria-label="Filtrar por medio de pago">
            {Object.entries(MEDIOS_LABEL).map(([key, label]) => (
              <button
                key={key}
                className={`filtro-btn${filtrosActivos.has(key) ? ' active' : ''}`}
                aria-pressed={filtrosActivos.has(key)}
                onClick={() => toggleFiltro(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="section-inner">
          <div className="filtros-footer-row">
            <span>{lista.length} de {PROVEEDORES.length} proveedores</span>
            {filtrosActivos.size > 0 && <button className="link limpiar-btn" onClick={() => setFiltrosActivos(new Set())}>Quitar filtros</button>}
          </div>
          {lista.length ? (
            <div className="pos-grid">
              {lista.map(p => <PosCard key={p.id} p={p} />)}
            </div>
          ) : (
            <p className="no-results">Ningún proveedor acepta todos esos medios a la vez. Quitá alguno.</p>
          )}

          <h3 className="tabla-titulo">Comparación lado a lado</h3>
          <PosTabla lista={lista} />

          <p className="pos-topes">
            <strong>Vale para todos:</strong> {TOPES.texto}{' '}
            <a className="link" href={TOPES.fuente} target="_blank" rel="noopener noreferrer">Acuerdo del Ministerio de Economía</a>
          </p>

          <details className="pos-fuentes">
            <summary>De dónde salen estos datos (revisados en {REVISADO})</summary>
            <p>Solo cargamos lo que cada empresa publica o lo que informó la prensa. Lo que no pudimos confirmar figura como “a confirmar” o “a cotizar”.</p>
            <ul>
              {PROVEEDORES.map(p => (
                <li key={p.id}>
                  <strong>{p.nombre}:</strong>{' '}
                  {p.fuentes.map((f, i) => (
                    <span key={f.url}>{i > 0 && ', '}<a className="link" href={f.url} target="_blank" rel="noopener noreferrer">{f.titulo}</a></span>
                  ))}
                </li>
              ))}
            </ul>
          </details>
        </div>
      </section>

      <section id="glosario-pos">
        <div className="section-inner">
          <h2>Antes de firmar</h2>
          <p className="section-sub">Cuatro conceptos que conviene tener claros.</p>
          <dl className="pos-glosario">
            {glosario.map(g => (
              <div key={g.title}>
                <dt>{g.title}</dt>
                <dd>{g.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <SumateBanner
        title="¿Algún dato cambió o falta un proveedor?"
        text="Este comparador se actualiza a mano. Si trabajás con alguno y las condiciones son otras, avisame."
        buttonLabel="Avisar un cambio"
        mensaje="Hola José, quiero avisar un cambio en el comparador de POS"
      />

      <p className="pos-aviso">Comparador independiente, sin relación comercial con los proveedores. Confirmá las condiciones vigentes antes de contratar.</p>
    </>
  );
}
