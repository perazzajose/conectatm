export default function AccordionFaqItem({ question, answer, open, onToggle }) {
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-pregunta" onClick={onToggle}>
        <span>{question}</span>
        <span className="faq-icono">+</span>
      </button>
      <div className="faq-respuesta">
        <div className="faq-respuesta-inner" dangerouslySetInnerHTML={{ __html: answer }} />
      </div>
    </div>
  );
}
