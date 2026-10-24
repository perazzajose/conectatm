import { useId, useState } from 'react';

// Pregunta desplegable. Controlada (open/onToggle) o autónoma si no se pasan esas props.
// `html` permite respuestas con marcado (las de faqData vienen como HTML).
export default function FaqItem({ question, answer, html, open: openProp, onToggle }) {
  const [openLocal, setOpenLocal] = useState(false);
  const open = openProp ?? openLocal;
  const toggle = onToggle ?? (() => setOpenLocal(o => !o));
  const id = useId();

  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <h3>
        <button className="faq-q" aria-expanded={open} aria-controls={id} onClick={toggle}>
          <span>{question}</span>
          <span className="faq-ico" aria-hidden="true">+</span>
        </button>
      </h3>
      <div className="faq-a" id={id} hidden={!open}>
        {html
          ? <div className="faq-a-inner" dangerouslySetInnerHTML={{ __html: answer }} />
          : <div className="faq-a-inner">{answer}</div>}
      </div>
    </div>
  );
}
