import { waLink } from '../../data/contacto';

// Es un proceso en orden, así que acá sí van números
const pasos = [
  { title: 'Me escribís', desc: 'Contame qué tenés o qué querés lograr. No hace falta saber de tecnología.' },
  { title: 'Charlamos, gratis', desc: 'Miro tu negocio y te digo qué necesitás de verdad, y qué no.' },
  { title: 'Presupuesto cerrado', desc: 'Sabés qué vas a recibir, cuánto cuesta y para cuándo. Si no te sirve, no pasa nada.' },
  { title: 'Lo construyo y te lo explico', desc: 'Te entrego funcionando y te enseño a usarlo. Si algo falla, lo arreglo.' },
];

export default function ComoTrabajo() {
  return (
    <section id="como-trabajo" className="como-trabajo">
      <div className="section-inner">
        <h2>Cómo trabajo</h2>
        <ol className="pasos">
          {pasos.map((p, i) => (
            <li key={p.title}>
              <span className="paso-num" aria-hidden="true">{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </li>
          ))}
        </ol>
        <a href={waLink('Hola José, quiero agendar la primera charla gratis')} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
          Agendar la charla gratis
        </a>
      </div>
    </section>
  );
}
