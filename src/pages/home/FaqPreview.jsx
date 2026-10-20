import { Link } from 'react-router-dom';
import FaqItem from '../../components/FaqItem';

const faqs = [
  {
    q: '¿Para qué me sirve esto si yo no sé nada de tecnología?',
    a: 'Justamente para eso estamos. No necesitás saber nada. José te explica todo desde cero, sin apuro y sin hacerte sentir que es obvio. Si tenés un negocio o una consulta, con eso alcanza.'
  },
  {
    q: '¿Cuánto cuesta tener un sitio web?',
    a: 'Un sitio básico para tu negocio arranca en $250 USD. Pero antes de cobrar nada, hacemos una reunión gratis para entender qué necesitás y darte un presupuesto claro. Sin sorpresas.'
  },
  {
    q: '¿Solo atienden en Durazno?',
    a: 'Estamos en Durazno pero trabajamos con emprendimientos de toda la región centro. Los talleres los damos presencial o por video para todo Uruguay. La Red Conecta también funciona a distancia.'
  },
  {
    q: '¿Y si pago y después no quedo conforme?',
    a: 'Hablamos antes de arrancar y dejamos todo claro. No cobré nada sin que primero entiendas qué vas a recibir. Y si algo no sale como esperabas, lo arreglamos — no te dejamos tirado.'
  },
];

export default function FaqPreview() {
  return (
    <section id="faq-preview">
      <div className="section-inner">
        <div className="section-tag">Preguntas frecuentes</div>
        <h2>Las dudas que todos tienen</h2>
        <p className="section-sub">Preguntas reales de vecinos y emprendedores del interior.</p>
        <div className="faq-list">
          {faqs.map((f, i) => <FaqItem key={i} question={f.q} answer={f.a} />)}
        </div>
        <Link to="/faq" className="ver-mas">Ver todas las preguntas →</Link>
      </div>
    </section>
  );
}
