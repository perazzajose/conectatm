import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Icon, { icons } from './Icon';
import { CAMINOS } from '../data/caminos';
import { waLink } from '../data/contacto';
import './Navbar.css';

const extras = [
  { to: '/negocios/emprendimientos', label: 'Emprendimientos' },
  { to: '/aprende', label: 'Aprendé' },
  { to: '/faq', label: 'Preguntas' },
];

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
          {CAMINOS.map(c => (
            <li key={c.id}>
              <NavLink to={c.to} end={c.id === 'negocios'} style={{ '--c': c.color }}>{c.nav}</NavLink>
            </li>
          ))}
          {extras.map(e => <li key={e.to}><NavLink to={e.to}>{e.label}</NavLink></li>)}
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
          {CAMINOS.map(c => (
            <li key={c.id}>
              <Link to={c.to} className="drawer-camino" style={{ '--c': c.color }} tabIndex={open ? 0 : -1}>
                <strong>{c.pregunta}</strong>
                <span>{c.resumen}</span>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="drawer-extras">
          <li><Link to="/" tabIndex={open ? 0 : -1}>Inicio</Link></li>
          {extras.map(e => <li key={e.to}><Link to={e.to} tabIndex={open ? 0 : -1}>{e.label}</Link></li>)}
        </ul>
        <a href={waLink()} className="btn btn-whatsapp drawer-cta" target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
          <Icon size="20">{icons.whatsapp}</Icon> Escribime por WhatsApp
        </a>
      </div>
    </>
  );
}
