import { Link } from 'react-router-dom';
import Hero from './Hero';
import Sobre from './Sobre';
import Icon, { icons } from '../../components/Icon';
import Proximamente from '../../components/Proximamente';
import ContactoForm from '../../components/ContactoForm';
import { RAMAS } from '../../data/ramas';
import { HERRAMIENTAS } from '../../data/herramientas';
import './Home.css';

// Lo que un comercio ya puede usar hoy, sin hablar con nadie
const disponibles = [
  { to: '/negocios/pos#recomendador', icon: icons.pos, titulo: 'Elegí con qué cobrar', desc: 'Cuatro preguntas y te decimos qué POS le sirve a tu comercio.' },
  { to: '/negocios/emprendimientos', icon: icons.emprendimientos, titulo: 'Mostrá tu comercio', desc: 'Sumalo gratis a la vitrina de negocios locales, con tu web y tus redes.' },
  { to: '/laboral/cv', icon: icons.cv, titulo: 'CV gratis para quien se postula', desc: 'Se arma desde el celular y se manda en PDF por WhatsApp.' },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="caminos" aria-labelledby="caminos-titulo">
        <div className="section-inner">
          <h2 id="caminos-titulo">¿En qué te ayudo?</h2>
          <ul className="caminos-lista">
            {RAMAS.map(r => (
              <li key={r.id} style={{ '--c': r.color }}>
                <Link to={r.to} className="camino">
                  <span className="camino-icono"><Icon size="28">{r.icon}</Icon></span>
                  <span className="camino-texto">
                    <strong>{r.titulo}</strong>
                    <span>{r.resumen}</span>
                  </span>
                  <span className="camino-flecha"><Icon size="26">{icons.flecha}</Icon></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="disponibles" aria-labelledby="disponibles-titulo">
        <div className="section-inner">
          <h2 id="disponibles-titulo">Ya podés usar</h2>
          <p className="section-sub">Sin registrarte y sin pagar.</p>
          <ul className="disponibles-lista">
            {disponibles.map(d => (
              <li key={d.to}>
                <Link to={d.to} className="disponible">
                  <Icon size="24">{d.icon}</Icon>
                  <strong>{d.titulo}</strong>
                  <span>{d.desc}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="en-camino" aria-labelledby="en-camino-titulo">
        <div className="section-inner">
          <h2 id="en-camino-titulo">Lo que estoy construyendo</h2>
          <p className="section-sub">Sistemas para que emprendimientos y pymes dejen el cuaderno y la planilla. Si te interesa alguno, avisame y te escribo cuando esté.</p>
          <Proximamente items={HERRAMIENTAS} />
        </div>
      </section>

      <Sobre />
      <ContactoForm />
    </>
  );
}
