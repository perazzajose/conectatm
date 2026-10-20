const items = [
  {
    num: '01',
    title: 'No caigas en una estafa online',
    emoji: '🔒',
    desc: 'Cómo reconocer mensajes falsos, proteger tus contraseñas y no entregar datos a desconocidos. Para adultos, jóvenes y cualquiera que use WhatsApp.',
  },
  {
    num: '02',
    title: 'Herramientas digitales para tu negocio',
    emoji: '📱',
    desc: 'Google, WhatsApp Business, facturación digital, redes para vender más. En palabras simples, con ejemplos reales del interior.',
  },
  {
    num: '03',
    title: 'Usá internet con cabeza',
    emoji: '🧠',
    desc: 'Noticias falsas, privacidad, huella digital. Para que chicos y adultos mayores naveguen seguros y sin caer en trampas.',
  },
];

export default function Formacion() {
  return (
    <section id="formacion">
      <div className="section-inner">
        <div className="section-tag">Talleres comunitarios</div>
        <h2>Tecnología explicada para todos</h2>
        <p className="section-sub">
          Para la directora del liceo que quiere que sus alumnos no caigan en estafas. Para el club de adultos mayores. Para el gremio, la cooperativa, la escuela rural.
          <br /><strong style={{color: 'var(--lila-dark)'}}>Si hay personas, hay taller.</strong>
        </p>
        <div className="form-grid">
          {items.map(it => (
            <div className="form-card" key={it.num}>
              <div className="form-num">{it.emoji}</div>
              <div className="form-title">{it.title}</div>
              <p className="form-desc">{it.desc}</p>
            </div>
          ))}
        </div>
        <div className="taller-cta">
          <div>
            <strong>¿Querés un taller para tu institución o grupo?</strong>
            <p>Presencial en Durazno y la región, o virtual para cualquier lugar del país. Sin costo para centros educativos públicos.</p>
          </div>
          <button className="btn-primary" style={{ whiteSpace: 'nowrap' }}
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}>
            Pedí tu taller
          </button>
        </div>
      </div>
    </section>
  );
}
