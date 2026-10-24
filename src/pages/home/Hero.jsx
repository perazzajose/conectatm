import { ZONAS_TEXTO } from '../../data/contacto';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-titulo">
      <img
        src="/hero.jpg"
        alt="Plaza de Durazno: palmeras, buganvilias y la pérgola al final del camino"
        className="hero-foto"
        fetchPriority="high"
      />
      <div className="hero-texto">
        <h1 id="hero-titulo">Conseguí trabajo, ordená tu negocio, salí en internet.</h1>
        <p>
          Herramientas simples para arrancar gratis, y un desarrollador cerca para cuando necesitás algo a medida.
          Trabajo en {ZONAS_TEXTO}.
        </p>
      </div>
    </section>
  );
}
