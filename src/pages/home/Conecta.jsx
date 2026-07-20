import Icon, { icons } from '../../components/Icon';

const chips = ['Contabilidad', 'Diseño gráfico', 'Marketing digital', 'Asesoría legal', 'Fotografía', 'Inglés'];

const cards = [
  { dot: 'a', icon: icons.emprendimientos, title: 'Para tu emprendimiento', desc: 'Talento calificado por una fracción del costo de un profesional. Sin burocracia.' },
  { dot: 'b', icon: icons.tutores, title: 'Para estudiantes', desc: 'Experiencia práctica real antes de graduarte. Contactos con empresarios locales.' },
  { dot: 'a', icon: icons.conecta, title: 'Con garantía de calidad', desc: 'Validamos cada perfil y acompañamos el proceso de principio a fin.' },
];

export default function Conecta() {
  return (
    <section id="conecta">
      <div className="section-inner">
        <div className="section-tag">Red Conecta</div>
        <h2>Conectamos mundos que se necesitan</h2>
        <p className="section-sub">Tu emprendimiento necesita apoyo. Hay estudiantes con el conocimiento justo. Los conectamos.</p>
        <div className="conecta-chips">
          {chips.map(c => <span className="chip" key={c}>{c}</span>)}
        </div>
        <div className="conecta-cards">
          {cards.map((c, i) => (
            <div className="cc-card" key={i}>
              <div className={`cc-dot ${c.dot}`}><Icon>{c.icon}</Icon></div>
              <div><div className="cc-title">{c.title}</div><div className="cc-desc">{c.desc}</div></div>
            </div>
          ))}
        </div>
        <button className="conecta-cta" onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}>
          Quiero conectarme →
        </button>
      </div>
    </section>
  );
}
