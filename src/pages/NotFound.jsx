import { Link } from 'react-router-dom';
import { CAMINOS } from '../data/caminos';
import './NotFound.css';

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="section-inner">
        <p className="error-code">404</p>
        <h1>Esta página no existe</h1>
        <p className="notfound-sub">Puede que el enlace esté mal escrito o que la página se haya movido. Elegí por dónde seguir:</p>
        <ul className="notfound-caminos">
          {CAMINOS.map(c => (
            <li key={c.id} style={{ '--c': c.color }}>
              <Link to={c.to}>{c.pregunta}</Link>
            </li>
          ))}
          <li><Link to="/">Ir al inicio</Link></li>
        </ul>
      </div>
    </section>
  );
}
