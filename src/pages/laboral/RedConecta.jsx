import { Link } from 'react-router-dom';
import { waLink } from '../../data/contacto';

const areas = ['Contabilidad', 'Diseño gráfico', 'Marketing digital', 'Informática', 'Fotografía', 'Inglés', 'Matemática'];

export default function RedConecta() {
  return (
    <section id="red-conecta" className="red-conecta">
      <div className="section-inner red-conecta-layout">
        <div>
          <h2>Red Conecta: experiencia real mientras estudiás</h2>
          <p className="section-sub">
            Si estás estudiando, podés dar clases particulares o ayudar a emprendimientos de la zona con lo que ya sabés.
            Ganás experiencia para tu CV y algo de plata; ellos consiguen ayuda a un precio que pueden pagar.
          </p>
          <ul className="areas" aria-label="Áreas que más se piden">
            {areas.map(a => <li key={a}>{a}</li>)}
          </ul>
        </div>
        <div className="red-conecta-acciones">
          <a className="btn btn-whatsapp" href={waLink('Hola José, soy estudiante y quiero sumarme a la Red Conecta')} target="_blank" rel="noopener noreferrer">
            Quiero sumarme
          </a>
          <Link className="btn btn-outline" to="/laboral/tutores">Ver profes de la red</Link>
        </div>
      </div>
    </section>
  );
}
