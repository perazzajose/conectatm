import { Link } from 'react-router-dom';
import { waLink } from '../../data/contacto';

const areas = ['Contabilidad', 'Diseño gráfico', 'Marketing digital', 'Informática', 'Fotografía', 'Inglés', 'Matemática'];

export default function RedConecta() {
  return (
    <section id="red-conecta" className="red-conecta">
      <div className="section-inner red-conecta-layout">
        <div>
          <h2>¿Estudiás? Sumate a la Red Conecta</h2>
          <p className="section-sub">Dá clases o ayudá a emprendimientos de la zona. Sumás experiencia y algo de plata.</p>
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
