import { Link } from 'react-router-dom';
import Icon, { icons } from '../../components/Icon';
import { ZONAS_TEXTO, waLink } from '../../data/contacto';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-titulo">
      <img
        src="/hero.webp"
        width="1024"
        height="768"
        alt="Plaza de Durazno: palmeras, buganvilias y la pérgola al final del camino"
        className="hero-foto"
        fetchPriority="high"
      />
      <div className="hero-texto">
        <p className="hero-etiqueta">Desde 2024 · {ZONAS_TEXTO}</p>
        <h1 id="hero-titulo">ConectaTuMundo ayuda a los comercios chicos de Uruguay a digitalizarse sin complicarse.</h1>
        <p>Elegí con qué cobrar, aparecé en Google Maps, capacitá a tu equipo y encontrá a quién contratar.</p>
        <div className="hero-ctas">
          <a href={waLink('Hola José, tengo un comercio y quiero pedirte un presupuesto')} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <Icon size="20">{icons.whatsapp}</Icon> Pedir presupuesto
          </a>
          <Link to="/desarrollo#rapidos" className="btn hero-btn-claro">Ver servicios</Link>
        </div>
      </div>
    </section>
  );
}
