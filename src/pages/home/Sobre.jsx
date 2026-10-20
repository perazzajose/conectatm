const chips = ['Desarrollo web', 'Diseño UI', 'Soporte IT', 'Emprendedor', 'Durazno 🌿'];

export default function Sobre() {
  return (
    <section id="sobre">
      <div className="section-inner">
        <div className="sobre-layout">
          <div className="sobre-blob">
            <img
              src="/avatar.png"
              alt="José Perazza"
              className="sobre-avatar"
            />
          </div>
          <div>
            <div className="section-tag">Sobre mí</div>
            <h2>Un vecino que sabe de tecnología</h2>
            <div className="sobre-chips">
              {chips.map(c => <span className="sobre-chip" key={c}>{c}</span>)}
            </div>
            <div className="sobre-texto">
              <p>Hola, soy José. Nací y crecí en el interior, y sé bien lo que cuesta cuando tenés una duda sobre tecnología y no hay nadie cerca que te la explique sin cobrarte una fortuna o hacerte sentir que sos el único que no entiende.</p>
              <p>Eso me pasó a mí. Le pasó a mis vecinos. Y le pasa a la mayoría de los emprendedores del interior todos los días.</p>
              <p>Por eso armé ConectaTuMundo: para ser ese vecino que sí puede explicarte, armarte el sitio, ayudarte con la compu, o simplemente decirte qué necesitás de verdad — sin venderte de más.</p>
              <blockquote className="sobre-quote">"No hace falta que entiendas de tecnología. Para eso estoy yo."</blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
