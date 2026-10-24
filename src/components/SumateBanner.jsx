import { waLink } from '../data/contacto';

export default function SumateBanner({ title, text, buttonLabel, mensaje }) {
  return (
    <aside className="sumate">
      <div className="sumate-inner">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <a href={waLink(mensaje)} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">{buttonLabel}</a>
      </div>
    </aside>
  );
}
