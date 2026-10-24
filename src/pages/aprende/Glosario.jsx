import { useState } from 'react';
import FaqItem from '../../components/FaqItem';

const terminos = [
  {
    term: '¿Qué es un sitio web?',
    plain: 'Tu local en internet',
    desc: 'Es como tener una vidriera, pero visible para cualquiera. Cuando alguien busca tu negocio en Google, aparece con fotos, precios, horarios y contacto. Funciona las 24 horas.',
  },
  {
    term: '¿Qué es un dominio?',
    plain: 'La dirección de tu sitio',
    desc: 'Es el nombre que escribís para llegar a un sitio, como "tunegocio.com.uy". Se paga por año, cuesta poco y es como el número de tu casa en internet.',
  },
  {
    term: '¿Qué es la nube?',
    plain: 'Un cajón en internet',
    desc: 'Es guardar fotos, documentos y archivos en internet en vez de solo en el celular o la compu. Así los abrís desde cualquier lado y no los perdés si se rompe el equipo.',
  },
  {
    term: '¿Qué es WhatsApp Business?',
    plain: 'WhatsApp, pero para tu negocio',
    desc: 'La misma aplicación que ya usás, con funciones para vender: horario, dirección, catálogo de productos y respuestas automáticas.',
  },
  {
    term: '¿Qué es un POS?',
    plain: 'La maquinita para cobrar con tarjeta',
    desc: 'Es el aparato (o la app) con el que tus clientes pagan con débito, crédito o QR. Cada empresa cobra una comisión distinta por venta.',
  },
  {
    term: '¿Qué es el SEO?',
    plain: 'Lo que hace que te encuentren en Google',
    desc: 'Es el trabajo para que cuando alguien busque "panadería en Durazno", tu negocio aparezca entre los primeros resultados.',
  },
  {
    term: '¿Qué es un WMS?',
    plain: 'Un sistema para ordenar el depósito',
    desc: 'Sirve para saber dónde está cada producto, qué entra, qué sale y qué hay que preparar para cada pedido. Útil cuando el depósito ya no entra en la cabeza.',
  },
];

export default function Glosario() {
  const [abierto, setAbierto] = useState(null);

  return (
    <section id="glosario" className="glosario">
      <div className="section-inner">
        <h2>¿Qué significa eso?</h2>
        <p className="section-sub">Palabras de tecnología explicadas como se las contarías a un vecino.</p>
        <div className="faq-list">
          {terminos.map((t, i) => (
            <FaqItem
              key={t.term}
              question={<>{t.term} <span className="glosario-plain">{t.plain}</span></>}
              answer={t.desc}
              open={abierto === i}
              onToggle={() => setAbierto(abierto === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
