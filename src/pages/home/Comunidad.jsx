import ComCard from '../../components/ComCard';
import { icons } from '../../components/Icon';

export default function Comunidad() {
  return (
    <section id="comunidad">
      <div className="section-inner">
        <div className="section-tag">Red Conecta · Comunidad</div>
        <h2>Explorá la comunidad</h2>
        <p className="section-sub">Tutores que enseñan y emprendimientos que crecen — todos parte de la misma red.</p>
        <div className="comunidad-cards">
          <ComCard to="/tutores" variant="tutores" icon={icons.tutores} title="Tutores & clases"
            desc="Estudiantes avanzados del interior que dan clases particulares a precio accesible. Matemática, contabilidad, inglés, informática y más."
            linkLabel="Ver tutores" />
          <ComCard to="/emprendimientos" variant="emprendimientos" icon={icons.emprendimientos} title="Emprendimientos"
            desc="Negocios locales de Durazno y la región que trabajan con ConectaTuMundo. Apoyalos, son de acá."
            linkLabel="Ver emprendimientos" />
        </div>
      </div>
    </section>
  );
}
