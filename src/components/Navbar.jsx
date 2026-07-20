import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon, { icons } from './Icon';
import './Navbar.css';

const drawerLinks = [
  {
    label: 'Servicios',
    items: [
      { to: '/#servicios', icon: icons.web, bg: 'var(--lila-light)', title: 'Agencia digital', sub: 'Web, soporte, asesoría' },
      { to: '/#formacion', icon: icons.taller, bg: 'var(--tierra-dark)', title: 'Talleres', sub: 'Educación digital comunitaria' },
    ],
  },
  {
    label: 'Comunidad',
    items: [
      { to: '/tutores', icon: icons.tutores, bg: 'var(--lila-light)', title: 'Tutores', sub: 'Clases particulares' },
      { to: '/emprendimientos', icon: icons.emprendimientos, bg: 'var(--verde-light)', title: 'Emprendimientos', sub: 'Negocios locales aliados' },
      { to: '/#conecta', icon: icons.conecta, bg: '#E8D0F8', title: 'Red Conecta', sub: 'Cómo funciona' },
    ],
  },
  {
    label: null,
    items: [
      { to: '/faq', icon: icons.faq, bg: 'var(--lila-light)', title: 'Preguntas frecuentes' },
      { to: '/#sobre', icon: icons.sobre, bg: 'var(--tierra-dark)', title: 'Sobre mí' },
    ],
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <nav>
        <Link to="/" className="nav-logo"><img src="/logo.png" alt="ConectaTuMundo" /></Link>
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/tutores">Tutores</Link></li>
          <li><Link to="/emprendimientos">Emprendimientos</Link></li>
          <li><Link to="/#conecta">Red Conecta</Link></li>
          <li><Link to="/#formacion">Formación</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
        </ul>
        <div className="nav-right">
          <Link to="/#contacto" className="nav-cta">Hablemos</Link>
          <button className={`nav-hamburger${open ? ' open' : ''}`} aria-label="Menú" onClick={() => setOpen(o => !o)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className={`nav-drawer${open ? ' open' : ''}`}>
        {drawerLinks.map((group, i) => (
          <div key={i}>
            <div className="drawer-section">
              {group.label && <div className="drawer-label">{group.label}</div>}
              <div className="drawer-links">
                {group.items.map((item, j) => (
                  <Link key={j} to={item.to} className="drawer-link" onClick={close}>
                    <div className="drawer-link-icon" style={{ background: item.bg }}>
                      <Icon>{item.icon}</Icon>
                    </div>
                    <div><span>{item.title}</span>{item.sub && <span className="drawer-link-sub">{item.sub}</span>}</div>
                  </Link>
                ))}
              </div>
            </div>
            {i < drawerLinks.length - 1 && <div className="drawer-divider"></div>}
          </div>
        ))}
        <Link to="/#contacto" className="drawer-cta" onClick={close}>Hablemos</Link>
      </div>
    </>
  );
}
