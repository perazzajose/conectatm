import HeroPill from '../../components/HeroPill';
import { icons } from '../../components/Icon';

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-inner">
        <div>
          <div className="hero-tag">Durazno, Uruguay · Servicios digitales</div>
          <h1 className="highlight">
            <span className="highlight r1">Tu negocio merece</span><br />
            <em className="highlight r2">presencia digital</em><br />
            de verdad.
          </h1>
          <p className="hero-sub accent" style={{ color: 'var(--lila-dark)' }}>
            Desarrollo web, asesoría y conexión de talento pensados para el interior. Cercanos, accesibles, con raíces locales.
          </p>
          <div className="hero-btns">
            <a href="#servicios" className="btn-primary">Ver servicios</a>
         <a
  href="#conecta"
  className="btn-primary"
  style={{
    background: "#7d2d9c",
    borderColor: "#D9B7F2",
    color: "#ffffff"
  }}
>
  Red Conecta 
</a>
          </div>
        </div>
        <div className="hero-pills">
          <HeroPill variant="lila" icon={icons.globo} title="Sitio web profesional" sub="Desde el diseño hasta el lanzamiento" />
          <HeroPill variant="verde" icon={icons.conecta} title="Talento accesible — Red Conecta" sub="Estudiantes calificados, precio justo" />
          <HeroPill variant="tierra" icon={icons.taller} title="Asesoría y soporte digital" sub="Acompañamiento continuo" />
          <HeroPill variant="lila" icon={icons.talleres2} title="Talleres de educación digital" sub="Liceos, clubes y comunidades" />
        </div>
      </div>
    </section>
  );
}
