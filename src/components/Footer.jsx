import { Link } from 'react-router-dom';
import { CAMINOS } from '../data/caminos';
import Logo from './Logo';
import { EMAIL, WHATSAPP_VISIBLE, ZONAS_TEXTO, waLink } from '../data/contacto';
import './Footer.css';

const subpaginas = {
  laboral: [{ to: '/laboral/cv', label: 'Armá tu CV' }, { to: '/laboral/subir', label: 'Subí tu CV' }, { to: '/laboral/tutores', label: 'Red Conecta' }, { to: '/laboral/reclutadores', label: 'Buscar personal' }],
  negocios: [{ to: '/negocios/pos', label: 'Comparador de POS' }, { to: '/negocios/emprendimientos', label: 'Emprendimientos' }],
  desarrollo: [{ to: '/desarrollo#servicios', label: 'Servicios' }, { to: '/desarrollo#contacto', label: 'Pedí presupuesto' }],
};

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-marca">
          <Link to="/" className="footer-logo" aria-label="ConectaTuMundo, inicio"><Logo size={44} /><span>Conecta<br />Tu Mundo</span></Link>
          <p>Herramientas digitales para personas, emprendimientos y pymes de {ZONAS_TEXTO}.</p>
        </div>
        <nav className="footer-cols" aria-label="Pie de página">
          {CAMINOS.map(c => (
            <div key={c.id}>
              <Link to={c.to} className="footer-col-titulo">{c.nav}</Link>
              <ul>
                {subpaginas[c.id].map(s => <li key={s.to}><Link to={s.to}>{s.label}</Link></li>)}
              </ul>
            </div>
          ))}
          <div>
            <span className="footer-col-titulo">Más</span>
            <ul>
              <li><Link to="/aprende">Talleres y glosario</Link></li>
              <li><Link to="/faq">Preguntas frecuentes</Link></li>
              <li><Link to="/privacy">Privacidad</Link></li>
            </ul>
          </div>
        </nav>
        <div className="footer-contacto">
          <a href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp {WHATSAPP_VISIBLE}</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <span>© {new Date().getFullYear()} José</span>
        </div>
      </div>
    </footer>
  );
}
