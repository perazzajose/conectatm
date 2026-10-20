import HeroPill from '../../components/HeroPill';
import { icons } from '../../components/Icon';

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-inner">
        <div>
          <div className="hero-tag">📍 Durazno, Uruguay</div>
          <h1>
            <span className="highlight r1">¿Tu negocio todavía</span><br />
            <em className="highlight r2">no está en internet?</em><br />
            <span style={{ fontSize: '0.75em', fontFamily: "'DM Sans', sans-serif", fontWeight: 400, color: 'var(--texto-suave)' }}>No pasa nada — eso tiene solución.</span>
          </h1>
          <p className="hero-sub">
            Soy José, de Durazno. Te explico qué necesita tu negocio en internet, sin tecnicismos, y lo armamos juntos a precio justo.
          </p>
          <div className="hero-nota">🤝 Sin contratos raros, sin letras chicas. Hablamos primero, presupuestamos después.</div>
          <div className="hero-btns">
            <a href="#servicios" className="btn-primary">¿Qué hacemos?</a>
            <a href="#contacto" className="btn-outline">Hablemos sin compromiso</a>
          </div>
        </div>
        <div className="hero-pills">
          <HeroPill variant="lila" icon={icons.globo} title="Tu local en internet" sub="Sitio web desde el diseño hasta el lanzamiento" />
          <HeroPill variant="verde" icon={icons.conecta} title="Red Conecta" sub="Estudiantes que ayudan a tu negocio, a precio justo" />
          <HeroPill variant="tierra" icon={icons.taller} title="Soporte IT cercano" sub="Te atendemos sin que tengas que explicar todo dos veces" />
          <HeroPill variant="lila" icon={icons.talleres2} title="Talleres de tecnología" sub="Para liceos, clubes y vecinos de la región" />
        </div>
      </div>
    </section>
  );
}
