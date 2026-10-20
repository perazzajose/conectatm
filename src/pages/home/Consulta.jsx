const WA_URL = `https://wa.me/59897154271?text=${encodeURIComponent('Hola José, quiero mi primera consulta gratuita')}`;

const pasos = [
  {
    icon: '💬',
    title: 'Me escribís',
    desc: 'Contame qué tenés o qué querés lograr. No hace falta que sepas de tecnología, alcanza con lo básico.',
  },
  {
    icon: '☕',
    title: 'Charlamos, gratis',
    desc: 'Miro tu negocio, tus redes y cómo te encuentran en Google, y te cuento qué necesitás de verdad.',
  },
  {
    icon: '🗺️',
    title: 'Te llevás un plan claro',
    desc: 'Qué conviene arreglar primero y cuánto costaría. Si no te sirve, no pasa nada.',
  },
];

export default function Consulta() {
  return (
    <section id="consulta">
      <div className="section-inner">
        <div className="section-tag">Primer paso</div>
        <h2>Tu primera consulta es gratuita</h2>
        <p className="section-sub">Tres pasos simples, sin compromiso y sin letra chica.</p>
        <ol className="consulta-grid">
          {pasos.map((p, i) => (
            <li className="consulta-card" key={p.title}>
              <div className="consulta-num" aria-hidden="true">{i + 1}</div>
              <div className="consulta-icon" aria-hidden="true">{p.icon}</div>
              <h3 className="consulta-title">{p.title}</h3>
              <p className="consulta-desc">{p.desc}</p>
            </li>
          ))}
        </ol>
        <div className="consulta-cta">
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Quiero mi consulta gratis
          </a>
          <span className="consulta-nota">Respondo yo, generalmente el mismo día.</span>
        </div>
      </div>
    </section>
  );
}