import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">Conecta<span>Tu</span>Mundo</div>
      <ul className="footer-links">
        <li><Link to="/#servicios">Servicios</Link></li>
        <li><Link to="/emprendimientos">Emprendimientos</Link></li>
        <li><Link to="/#conecta">Red Conecta</Link></li>
        <li><Link to="/#formacion">Talleres</Link></li>
        <li><Link to="/#glosario">¿Qué significa eso?</Link></li>
        <li><Link to="/faq">Preguntas frecuentes</Link></li>
      </ul>
      <p>joseperazza@conectatumundo.net · (+598) 097 154 271 · Durazno, Uruguay · 2026</p>
    </footer>
  );
}
