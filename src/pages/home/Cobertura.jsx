const zonas = [
  { emoji: '📍', lugar: 'Durazno', detalle: 'Presencial y digital' },
  { emoji: '🗺️', lugar: 'Región centro', detalle: 'Florida, Flores, Soriano, Tacuarembó, Treinta y Tres' },
  { emoji: '🇺🇾', lugar: 'Todo Uruguay', detalle: 'Talleres virtuales y asesoría online' },
];

export default function Cobertura() {
  return (
    <section id="cobertura" className="cobertura-section">
      <div className="cobertura-img-wrap">
        <img src="/interior.jpg" alt="Paisaje del interior de Uruguay" className="cobertura-img" />
        <div className="cobertura-overlay" />
      </div>
      <div className="section-inner cobertura-content">
        <div className="section-tag" style={{ color: '#D9B7F2' }}>¿Hasta dónde llegamos?</div>
        <h2 style={{ color: '#fff' }}>Del interior, para el interior</h2>
        <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
          Nacimos en Durazno y conocemos cómo funciona la vida en el interior. Por eso sabemos que el servicio tiene que ser
          cercano, sin vueltas y a precio que tenga sentido.
        </p>
        <div className="cobertura-zonas">
          {zonas.map((z, i) => (
            <div key={i} className="cobertura-zona">
              <span className="cobertura-zona-emoji">{z.emoji}</span>
              <div>
                <div className="cobertura-zona-lugar">{z.lugar}</div>
                <div className="cobertura-zona-detalle">{z.detalle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
