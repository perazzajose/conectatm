import { waLink } from '../../data/contacto';

const talleres = [
  {
    title: 'No caigas en una estafa online',
    desc: 'Cómo reconocer mensajes falsos, cuidar tus contraseñas y no entregar datos a desconocidos. Para cualquiera que use WhatsApp.',
  },
  {
    title: 'Herramientas digitales para tu negocio',
    desc: 'Google, WhatsApp Business, facturación digital y redes para vender más. Con ejemplos reales de negocios de acá.',
  },
  {
    title: 'Usá internet con cabeza',
    desc: 'Noticias falsas, privacidad y huella digital, para que chicos y grandes naveguen seguros.',
  },
];

export default function Talleres() {
  return (
    <section id="talleres">
      <div className="section-inner">
        <h2>Talleres</h2>
        <p className="section-sub">
          Para liceos, escuelas rurales, clubes de adultos mayores, cooperativas y gremios. Presenciales en Durazno y la región,
          o virtuales para todo el país. Sin costo para centros educativos públicos.
        </p>
        <ul className="talleres-lista">
          {talleres.map(t => (
            <li key={t.title}>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
            </li>
          ))}
        </ul>
        <a href={waLink('Hola José, quiero pedir un taller para mi institución o grupo')} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Pedir un taller
        </a>
      </div>
    </section>
  );
}
