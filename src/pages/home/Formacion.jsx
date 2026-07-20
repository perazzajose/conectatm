const items = [
  { num: '01', title: 'Seguridad en internet', desc: 'Estafas, contraseñas, privacidad y cómo proteger tu información.' },
  { num: '02', title: 'Herramientas para emprendedores', desc: 'Google Workspace, facturación digital y redes para negocios.' },
  { num: '03', title: 'Uso responsable de redes', desc: 'Derechos digitales, fake news y huella digital para jóvenes y adultos.' },
];

export default function Formacion() {
  return (
    <section id="formacion">
      <div className="section-inner">
        <div className="section-tag">Formación comunitaria</div>
        <h2>Educación digital para el interior</h2>
        <p className="section-sub">Talleres en liceos, escuelas y organizaciones. Porque la tecnología tiene que llegar a todos.</p>
        <div className="form-grid">
          {items.map(it => (
            <div className="form-card" key={it.num}>
              <div className="form-num">{it.num}</div>
              <div className="form-title">{it.title}</div>
              <p className="form-desc">{it.desc}</p>
            </div>
          ))}
        </div>
        <div className="taller-cta">
          <div>
            <strong>¿Querés un taller para tu institución?</strong>
            <p>Presencial en Durazno o virtual para todo el país.</p>
          </div>
          <button className="btn-primary" style={{ whiteSpace: 'nowrap' }}
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}>
            Solicitar taller
          </button>
        </div>
      </div>
    </section>
  );
}
