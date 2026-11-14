import Icon from '../../components/Icon';
import { RAPIDOS } from '../../data/rapidos';
import { waLink } from '../../data/contacto';

// Lo que se resuelve en pocos días: va primero porque es por donde suele arrancar un comercio chico
export default function Rapidos() {
  return (
    <section id="rapidos" className="rapidos" aria-labelledby="rapidos-titulo">
      <div className="section-inner">
        <h2 id="rapidos-titulo">Listo en pocos días</h2>
        <p className="section-sub">Para arrancar por lo que más se nota. Me escribís, te paso el presupuesto en el día y lo dejo funcionando.</p>
        <ul className="rapidos-lista">
          {RAPIDOS.map(r => (
            <li key={r.id} className="rapido">
              <span className="rapido-icono"><Icon size="26">{r.icon}</Icon></span>
              <h3>{r.titulo}</h3>
              <p>{r.desc}</p>
              <a href={waLink(r.mensaje)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                Pedir presupuesto
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
