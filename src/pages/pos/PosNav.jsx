import { useState } from 'react';
import { Link } from 'react-router-dom';
import './PosNav.css';

export default function PosNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <nav>
        <Link to="/pos" className="nav-logo">Conecta<span>Tu</span>Mundo <span className="sub-badge">POS</span></Link>
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/emprendimientos">Emprendimientos</Link></li>
          <li><a href="#comparador">Comparador</a></li>
          <li><a href="#tabla">Tabla completa</a></li>
          <li><a href="#glosario">Glosario</a></li>
        </ul>
        <div className="nav-right">
          <Link to="/#contacto" className="nav-cta">Hablemos</Link>
          <button className={`nav-hamburger${open ? ' open' : ''}`} aria-label="Menú" onClick={() => setOpen(o => !o)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
      <div className={`nav-drawer${open ? ' open' : ''}`}>
        <div className="drawer-links">
          <Link to="/" className="drawer-link" onClick={close}>🏠 <span>Volver a ConectaTuMundo</span></Link>
          <Link to="/emprendimientos" className="drawer-link" onClick={close}>🏪 <span>Emprendimientos</span></Link>
          <a href="#comparador" className="drawer-link" onClick={close}>💳 <span>Comparador</span></a>
          <a href="#tabla" className="drawer-link" onClick={close}>📊 <span>Tabla completa</span></a>
          <a href="#glosario" className="drawer-link" onClick={close}>📖 <span>Glosario</span></a>
        </div>
        <div className="drawer-divider"></div>
        <Link to="/#contacto" className="drawer-cta" onClick={close}>Hablemos 💬</Link>
      </div>
    </>
  );
}
