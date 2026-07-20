import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { PROVEEDORES, MEDIOS_LABEL, glosario } from '../../data/posProveedores';
import PosCard from './PosCard';
import PosTabla from './PosTabla';
import './Pos.css';

export default function Pos() {
  const [filtrosActivos, setFiltrosActivos] = useState(new Set());
  const navigate = useNavigate();

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
        tag="ConectaTuMundo · Durazno, Uruguay"
        title={<>Antes de elegir con qué <em>cobrar</em>,<br />mirá el ticket completo.</>}
        subtitle="Handy, Mercado Pago, Getnet, Scanntech y otros procesadores compiten por tu comercio. Comparamos medios de pago, velocidad de liquidación, costo de terminal y condiciones de contrato — sin relleno comercial."
        stats={[
          <><span>{PROVEEDORES.length}</span> proveedores</>,
          <><span>{Object.keys(MEDIOS_LABEL).length}</span> medios de pago</>,
          <>Actualizado <span>2026</span></>,
        ]}
      />

      <div className="notice-wrap">
        <div className="notice">
          <strong>Sobre las comisiones:</strong> la mayoría de estos proveedores no publica tasas fijas — cotizan según tu rubro, facturación mensual y plan de liquidación elegido. Cuando una empresa publica rangos de referencia los mostramos tal cual, aclarando que son estimativos. Para el resto marcamos <em>"a cotizar"</em> en vez de inventar un número.
        </div>
      </div>

      <div className="filtros-wrap" id="comparador">
        <div className="filtros-scroll">
          {Object.entries(MEDIOS_LABEL).map(([key, label]) => (
            <button
              key={key}
              className={`filtro-btn${filtrosActivos.has(key) ? ' active' : ''}`}
              onClick={() => toggleFiltro(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="filtros-footer-row">
          <span className="resultado-count">{lista.length} de {PROVEEDORES.length} proveedores</span>
          <button className="limpiar-btn" onClick={() => setFiltrosActivos(new Set())}>Limpiar filtros</button>
        </div>
      </div>

      <div className="grid-wrap">
        {lista.length ? (
          <div className="pos-grid">
            {lista.map((p, i) => <PosCard key={p.id} p={p} delay={i * 50} />)}
          </div>
        ) : (
          <div className="no-results">Ningún proveedor cumple esa combinación de filtros.</div>
        )}
      </div>

      <section id="tabla">
        <h2>Vista de tabla completa</h2>
        <p className="section-sub-center">Todos los datos lado a lado, para escanear rápido.</p>
        <PosTabla lista={lista} />
      </section>

      <section id="glosario">
        <h2>Antes de decidir</h2>
        <p className="section-sub-center">Cuatro conceptos que conviene tener claros antes de firmar.</p>
        <div className="form-grid">
          {glosario.map(g => (
            <div className="form-card" key={g.title}>
              <div className="form-title">{g.title}</div>
              <div className="form-desc">{g.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="sumate-banner">
        <h3>¿Tenés un dato para sumar o corregir?</h3>
        <p>Este comparador se actualiza a mano. Si trabajás con alguno de estos proveedores y las condiciones cambiaron, o falta uno en la lista, contanos.</p>
        <button className="sumate-btn" onClick={() => navigate('/#contacto')}>Escribinos →</button>
      </div>

      <p style={{ textAlign: 'center', fontSize: '.75rem', color: 'var(--texto-suave)', padding: '0 1.2rem 2rem' }}>
        Comparador independiente, no afiliado a los proveedores listados. Confirmá condiciones vigentes antes de contratar.
      </p>
    </>
  );
}
