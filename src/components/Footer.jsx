import { Link } from 'react-router-dom';
import { RAMAS, OTRAS_HERRAMIENTAS } from '../data/ramas';
import Logo from './Logo';
import { EMAIL, WHATSAPP_VISIBLE, waLink } from '../data/contacto';
import { DEPARTAMENTOS } from '../data/departamentos';
import './Footer.css';

// Una columna por rama (todas para el comercio). Lo que quedó fuera del foco va en "Otras herramientas".
const subpaginas = {
  comparadores: [{ to: '/negocios/pos', label: 'Comparador de POS' }, { to: '/negocios/pos#recomendador', label: '¿Qué POS me conviene?' }, { to: '/negocios', label: 'Herramientas para negocios' }],
  servicios: [{ to: '/desarrollo#servicios', label: 'Web, Google Maps y redes' }, { to: '/desarrollo#contacto', label: 'Pedí presupuesto' }],
  capacitacion: [{ to: '/aprende#talleres', label: 'Talleres para comercios' }, { to: '/aprende#glosario', label: 'Glosario digital' }],
  contratar: [{ to: '/laboral/cv', label: 'Editor de CV gratis' }, { to: '/laboral/reclutadores', label: 'Buscar personal' }, { to: '/laboral', label: 'Trabajo en tu zona' }],
};

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-marca">
          <Link to="/" className="footer-logo" aria-label="ConectaTuMundo, inicio"><Logo size={44} /><span>Conecta<br />Tu Mundo</span></Link>
          <p>Ayudo a los comercios chicos de Uruguay a digitalizarse sin complicarse.</p>
        </div>
        <nav className="footer-cols" aria-label="Pie de página">
          {RAMAS.map(r => (
            <div key={r.id}>
              <Link to={r.to} className="footer-col-titulo">{r.nav}</Link>
              <ul>
                {subpaginas[r.id].map(s => <li key={s.to}><Link to={s.to}>{s.label}</Link></li>)}
              </ul>
            </div>
          ))}
          <div>
            <span className="footer-col-titulo">Otras herramientas</span>
            <ul>
              {OTRAS_HERRAMIENTAS.map(o => <li key={o.to}><Link to={o.to}>{o.label}</Link></li>)}
              <li><Link to="/privacy">Privacidad</Link></li>
            </ul>
          </div>
        </nav>
        <nav className="footer-zonas" aria-label="Departamentos">
          <span>En todo Uruguay:</span>
          <ul>
            {DEPARTAMENTOS.map(d => <li key={d.id}><Link to={`/${d.id}`}>{d.nombre}</Link></li>)}
            <li><Link to="/chuy">Chuy</Link></li>
          </ul>
        </nav>
        <div className="footer-contacto">
          <a href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp {WHATSAPP_VISIBLE}</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <span>En línea desde 2024 · © 2024–{new Date().getFullYear()} José</span>
        </div>
      </div>
    </footer>
  );
}
