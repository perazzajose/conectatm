import { useState } from 'react';

export default function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-q" onClick={() => setOpen(o => !o)}>
        <span>{question}</span>
        <span className="faq-ico">+</span>
      </button>
      <div className="faq-a" style={{ maxHeight: open ? '600px' : '0' }}>
        <div className="faq-a-inner">{answer}</div>
      </div>
    </div>
  );
}
