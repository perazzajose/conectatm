import { ZONAS_TEXTO } from '../../data/contacto';

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
      </div>
    </section>
  );
}
