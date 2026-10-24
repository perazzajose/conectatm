import { useState } from 'react';
import { MEDIOS_LABEL } from '../../../data/posProveedores';
import IconoTerminal from './IconoTerminal';

export default function PosCard({ p }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="pos-card" style={{ '--marca': p.color }}>
      <div className="card-banner">
        {p.imagen && !imgError ? (
          <img src={p.imagen} alt={`Terminal de ${p.nombre}`} className="card-banner-img" loading="lazy" onError={() => setImgError(true)} />
        ) : (
          <IconoTerminal modelo={p.modelo} color={p.color} />
        )}
      </div>
      <h3 className="card-nombre">{p.nombre}</h3>
      <p className="card-tipo">{p.tipo}</p>
      <ul className="card-medios" aria-label="Medios de pago">
        {p.medios.map(m => <li key={m}>{MEDIOS_LABEL[m]}</li>)}
      </ul>
      {p.web
        ? <a href={p.web} target="_blank" rel="noopener noreferrer" className="link">Sitio de {p.nombre}</a>
        : <span className="card-sin-sitio">Sin sitio público</span>}
    </article>
  );
}
