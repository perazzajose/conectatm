export default function Sobre() {
  return (
    <section id="sobre" className="sobre">
      <div className="section-inner sobre-layout">
        <img src="/avatar.webp" width="220" height="220" alt="Ilustración de José trabajando en su computadora" className="sobre-avatar" loading="lazy" />
        <div className="sobre-texto">
          <h2>Quién está detrás</h2>
          <p>
            Soy José, desarrollador. ConectaTuMundo es un proyecto mío, de una sola persona: escribo el código,
            respondo los mensajes y voy a verte si estás cerca.
          </p>
          <p>
            Crecí en el interior y sé lo que cuesta encontrar a alguien que te explique la tecnología sin vueltas.
            Por eso las herramientas de acá son simples, y las que se pueden dar gratis, se dan gratis.
          </p>
        </div>
      </div>
    </section>
  );
}
