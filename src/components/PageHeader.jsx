import { Link } from 'react-router-dom';
import { CAMINOS } from '../data/caminos';

// Encabezado de página. `camino` (laboral | negocios | desarrollo) le da el color de esa parte
// de la plataforma; `pagina` es el nombre de la subpágina, y arma la miga Inicio / Trabajo / Armá tu CV.
// `fondo` (o el `fondo` del camino, con su encuadre `fondoPos`) es una foto que se funde con el color de la sección.
export default function PageHeader({ camino, pagina, title, subtitle, fondo, children }) {
  const c = CAMINOS.find(x => x.id === camino);
  const imagen = fondo ?? (pagina ? null : c?.fondo);
  const style = {
    ...(c ? { '--c': c.color, '--c-suave': c.suave } : {}),
    ...(imagen ? { '--fondo-img': `url("${imagen}")` } : {}),
    ...(imagen && !fondo && c?.fondoPos ? { '--fondo-pos': c.fondoPos } : {}),
  };

  return (
    <header className={`page-header${c ? ' con-camino' : ''}${imagen ? ' con-fondo' : ''}`} style={style}>
      <div className="page-header-inner">
        <nav className="miga" aria-label="Estás en">
          <Link to="/">Inicio</Link>
          {c && pagina && <><span aria-hidden="true">/</span><Link to={c.to}>{c.nav}</Link></>}
          <span aria-hidden="true">/</span>
          <span aria-current="page">{pagina || c?.nav || title}</span>
        </nav>
        <h1>{title}</h1>
        {subtitle && <p className="page-header-sub">{subtitle}</p>}
        {children}
      </div>
    </header>
  );
}
