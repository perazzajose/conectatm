import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import './NotFound.css';

export default function NotFound() {
  return (
    <>
      <PageHeader
        tag="Error"
        title={<>Página<br /><em>no encontrada</em></>}
        subtitle="Lo sentimos, la página que estás buscando no existe o ha sido movida."
      />
      <div className="notfound-wrap">
        <div className="error-code">404</div>
        <div className="error-message">
          <p>La página que estás buscando podría haber sido:</p>
          <ul>
            <li>Eliminada permanentemente</li>
            <li>Movida a otra ubicación</li>
            <li>Cambiada de nombre</li>
            <li>Temporalmente no disponible</li>
          </ul>
        </div>
        <div className="nav-buttons">
          <Link to="/" className="btn-primary">Ir a la página principal</Link>
          <Link to="/faq" className="btn-primary">Ver preguntas frecuentes</Link>
        </div>
      </div>
    </>
  );
}
