import { useState } from 'react';

const terminos = [
  {
    emoji: '🌐',
    term: '¿Qué es un sitio web?',
    plain: 'Tu local en internet',
    desc: 'Es como tener una vidriera o una tarjeta personal, pero visible para cualquiera del mundo. Cuando alguien googlea tu negocio, el sitio aparece ahí — con fotos, precios, horarios y contacto. Funciona las 24 horas, aunque vos estés durmiendo.',
  },
  {
    emoji: '🏠',
    term: '¿Qué es un dominio?',
    plain: 'La dirección de tu sitio',
    desc: 'Es el nombre que escribís para encontrar un sitio, tipo "tunegocio.com". Lo alquilás por año (cuesta muy poco) y es como el número de tu casa en internet. Sin dominio, nadie sabe dónde buscarte.',
  },
  {
    emoji: '☁️',
    term: '¿Qué es la nube?',
    plain: 'Un cajón gigante en internet',
    desc: 'No es nada raro. Es guardar tus fotos, documentos y archivos en internet en vez de solo en el celular o la compu. Así podés abrir tus cosas desde cualquier dispositivo y no perdés nada si se rompe el equipo.',
  },
  {
    emoji: '📱',
    term: '¿Qué es WhatsApp Business?',
    plain: 'WhatsApp, pero para tu negocio',
    desc: 'Es la misma aplicación que ya usás, pero con funciones extra para vender: podés poner el horario, tu dirección, fotos de tus productos y respuestas automáticas. Se ve más profesional y te ayuda a ordenar los pedidos.',
  },
  {
    emoji: '🔍',
    term: '¿Qué es el SEO?',
    plain: 'Lo que hace que te encuentren en Google',
    desc: 'SEO es el trabajo que se hace para que cuando alguien escriba en Google "panadería en Durazno" o "ropa en Soriano", tu negocio aparezca entre los primeros resultados. No es magia, es técnica — y nosotros lo hacemos.',
  },
  {
    emoji: '📊',
    term: '¿Qué es una red social de negocios?',
    plain: 'Tu negocio en Facebook, Instagram y Google Maps',
    desc: 'Son las plataformas donde la gente busca productos, lee opiniones y decide si confía en un negocio. Tener tu negocio bien configurado ahí es hoy tan importante como tener un cartel en la puerta.',
  },
];

export default function Glosario() {
  const [abierto, setAbierto] = useState(null);

  return (
    <section id="glosario">
      <div className="section-inner">
        <div className="section-tag">Glosario para todos</div>
        <h2>¿Qué significa eso?</h2>
        <p className="section-sub">Si escuchás palabras de tecnología y no entendés nada, este es tu lugar. Todo explicado como si se lo contaras a un vecino.</p>
        <div className="glosario-grid">
          {terminos.map((t, i) => (
            <div
              key={i}
              className={`glosario-card${abierto === i ? ' open' : ''}`}
              onClick={() => setAbierto(abierto === i ? null : i)}
            >
              <div className="glosario-head">
                <span className="glosario-emoji">{t.emoji}</span>
                <div>
                  <div className="glosario-term">{t.term}</div>
                  <div className="glosario-plain">{t.plain}</div>
                </div>
                <span className="glosario-arrow">{abierto === i ? '−' : '+'}</span>
              </div>
              {abierto === i && (
                <p className="glosario-desc">{t.desc}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
