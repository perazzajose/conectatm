import { Link } from 'react-router-dom';
import Hero from './Hero';
import Sobre from './Sobre';
import Icon, { icons } from '../../components/Icon';
import Proximamente from '../../components/Proximamente';
import ContactoForm from '../../components/ContactoForm';
import { CAMINOS } from '../../data/caminos';
import { HERRAMIENTAS } from '../../data/herramientas';
import './Home.css';

// Lo que ya se puede usar hoy, sin hablar con nadie
const disponibles = [
  { to: '/laboral/cv', icon: icons.cv, titulo: 'Armá tu CV', desc: 'Completalo en el navegador y descargalo en PDF. Gratis.' },
  { to: '/negocios/pos', icon: icons.pos, titulo: 'Elegí con qué cobrar', desc: 'Cuatro preguntas y te decimos qué POS le sirve a tu negocio.' },
  { to: '/negocios/emprendimientos', icon: icons.emprendimientos, titulo: 'Emprendimientos de la zona', desc: 'Negocios locales que ya forman parte de la red.' },
  { to: '/laboral/tutores', icon: icons.tutores, titulo: 'Profes particulares', desc: 'Estudiantes que dan clases a precio accesible.' },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="caminos" aria-labelledby="caminos-titulo">
        <div className="section-inner">
          <h2 id="caminos-titulo">¿Qué venís a buscar?</h2>
          <ul className="caminos-lista">
            {CAMINOS.map(c => (
              <li key={c.id} style={{ '--c': c.color, '--c-suave': c.suave }}>
                <Link to={c.to} className="camino">
                  <span className="camino-icono"><Icon size="28">{c.icon}</Icon></span>
                  <span className="camino-texto">
                    <strong>{c.pregunta}</strong>
                    <span>{c.resumen}</span>
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
