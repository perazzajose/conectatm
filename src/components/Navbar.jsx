import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Icon, { icons } from './Icon';
import { RAMAS, CONTACTO } from '../data/ramas';
import { waLink } from '../data/contacto';
import './Navbar.css';

// Menú principal: solo las cuatro ramas para comercios y contacto.
// El resto de las páginas sigue en su dirección y aparece en el pie ("Otras herramientas").

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Cerrar el menú al cambiar de página
  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <nav className="site-nav" aria-label="Principal">
        <Link to="/" className="nav-marca"><img src="/logo-ctm.webp" alt="ConectaTuMundo" width="115" height="40" /></Link>
        <ul className="nav-links">
          {RAMAS.map(r => (
            <li key={r.id}>
              <NavLink to={r.to} style={{ '--c': r.color }}>{r.nav}</NavLink>
            </li>
          ))}
          <li><Link to={CONTACTO.to}>{CONTACTO.label}</Link></li>
        </ul>
        <div className="nav-right">
          <a href={waLink()} className="nav-cta" target="_blank" rel="noopener noreferrer">
            <Icon size="18">{icons.whatsapp}</Icon> Escribime
          </a>
          <button
            className={`nav-hamburger${open ? ' open' : ''}`}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className={`nav-drawer${open ? ' open' : ''}`} aria-hidden={!open}>
        <ul className="drawer-caminos">
          {RAMAS.map(r => (
            <li key={r.id}>
              <Link to={r.to} className="drawer-camino" style={{ '--c': r.color }} tabIndex={open ? 0 : -1}>
                <strong>{r.titulo}</strong>
                <span>{r.resumen}</span>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="drawer-extras">
          <li><Link to="/" tabIndex={open ? 0 : -1}>Inicio</Link></li>
          <li><Link to={CONTACTO.to} tabIndex={open ? 0 : -1}>{CONTACTO.label}</Link></li>
        </ul>
        <a href={waLink()} className="btn btn-whatsapp drawer-cta" target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
          <Icon size="20">{icons.whatsapp}</Icon> Escribime por WhatsApp
        </a>
      </div>
    </>
  );
}
