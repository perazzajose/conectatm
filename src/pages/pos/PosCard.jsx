import { useState } from 'react';
import { MEDIOS_LABEL } from '../../data/posProveedores';
import IconoTerminal from './IconoTerminal';

export default function PosCard({ p, delay }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="pos-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="card-banner">
        {p.imagen && !imgError ? (
          <img src={p.imagen} alt={`Terminal ${p.nombre}`} className="card-banner-img" onError={() => setImgError(true)} />
        ) : (
          <div className="card-banner-fallback"><IconoTerminal modelo={p.modelo} color={p.color} /></div>
        )}
      </div>
      <div className="card-marca">
        <span className="card-dot" style={{ background: p.color }}></span>
        <div className="card-nombre">{p.nombre}</div>
        <div className="card-tipo">{p.tipo}</div>
      </div>
      <div className="card-medios">
        {p.medios.map(m => <span className="serv-tag" key={m}>{MEDIOS_LABEL[m]}</span>)}
      </div>
      <div className="card-footer-row">
        {p.web
          ? <a href={p.web} target="_blank" rel="noopener noreferrer" className="card-sitio-btn">🌐 Ver sitio →</a>
          : <span className="card-sitio-btn disabled">Sin sitio público</span>}
      </div>
    </div>
  );
}
