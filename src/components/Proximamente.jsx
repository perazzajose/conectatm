import Icon from './Icon';
import { waLink } from '../data/contacto';

// Herramientas que todavía están en desarrollo. Sin backend: el "avisame" abre WhatsApp
// con un mensaje que ya dice qué herramienta le interesa a la persona.
export default function Proximamente({ items }) {
  return (
    <ul className="proximas">
      {items.map(it => (
        <li key={it.titulo} className="proxima">
          <span className="proxima-icono"><Icon size="26">{it.icon}</Icon></span>
          <div className="proxima-texto">
            <h3>{it.titulo} <span className="estado">En desarrollo</span></h3>
            <p>{it.desc}</p>
          </div>
          <a className="link" href={waLink(`Hola José, avisame cuando esté lista la herramienta: ${it.titulo}`)}
            target="_blank" rel="noopener noreferrer">
            Avisame cuando esté
          </a>
        </li>
      ))}
    </ul>
  );
}

