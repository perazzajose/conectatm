import { Link } from 'react-router-dom';
import FaqItem from '../../components/FaqItem';

const faqs = [
  { q: '¿Qué es ConectaTuMundo exactamente?', a: 'ConectaTuMundo es una plataforma de servicios digitales y conexión de talento con base en Durazno. Desarrollamos sitios web, conectamos negocios con estudiantes calificados y damos talleres de educación digital en el interior.' },
  { q: '¿Cómo funciona la Red Conecta para mi negocio?', a: 'Nos contás qué necesitás, buscamos al estudiante o profesional adecuado en nuestra red y coordinamos la primera reunión. Acompañamos todo el proceso para que salga bien. Sin burocracia, sin procesos largos.' },
  { q: '¿Solo operan en Durazno?', a: 'Estamos basados en Durazno pero trabajamos con emprendimientos de toda la región centro. Los talleres los damos presencial en Durazno o virtual para todo el país. La Red Conecta también funciona de forma remota.' },
  { q: '¿Qué pasa si el estudiante no cumple?', a: 'Validamos cada perfil antes de presentarlo y acompañamos el proceso. Si hay algún problema, lo resolvemos. No dejamos a ningún emprendimiento sin respuesta.' },
];

export default function FaqPreview() {
  return (
    <section id="faq-preview">
      <div className="section-inner">
        <div className="section-tag">Preguntas frecuentes</div>
        <h2>Las dudas más comunes</h2>
        <p className="section-sub">Respondemos antes de que tengas que preguntar.</p>
        <div className="faq-list">
          {faqs.map((f, i) => <FaqItem key={i} question={f.q} answer={f.a} />)}
        </div>
        <Link to="/faq" className="ver-mas">Ver todas las preguntas →</Link>
      </div>
    </section>
  );
}
