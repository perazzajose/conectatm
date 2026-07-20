const chips = ['Desarrollo web', 'Firebase', 'Diseño UI', 'Operaciones', 'Durazno'];

export default function Sobre() {
  return (
    <section id="sobre">
      <div className="section-inner">
        <div className="sobre-layout">
          <div className="sobre-blob">
            <div className="sobre-blob">
   <img
    src="/avatar.png"
    alt="José Perazza"
    className="sobre-avatar"
  />
</div>
          </div>
          <div>
            <div className="section-tag">Sobre mí</div>
            <h2>Un emprendedor del interior, para el interior</h2>
            <div className="sobre-chips">
              {chips.map(c => <span className="sobre-chip" key={c}>{c}</span>)}
            </div>
            <div className="sobre-texto">
              <p>Hola, soy José. Nací y crecí en el interior, y sé bien lo que cuesta encontrar ayuda tecnológica cercana, accesible y que entienda cómo funciona un negocio de barrio.</p>
              <p>Estoy aquí para ayudarte a que tu negocio crezca junto con la comunidad. Y la comunidad junto a tu negocio.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
