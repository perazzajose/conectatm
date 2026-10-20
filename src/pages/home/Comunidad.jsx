import ComCard from '../../components/ComCard';
import { icons } from '../../components/Icon';

export default function Comunidad() {
  return (
    <section id="comunidad">
      <div className="section-inner">
        <div className="section-tag">Comunidad local</div>
        <h2>Emprendimientos de la región</h2>
        <p className="section-sub">Negocios reales de Durazno y alrededores. Vecinos que ya están en la red — apoyalos, son de acá.</p>
        <div className="comunidad-cards">
          <ComCard to="/emprendimientos" variant="emprendimientos" icon={icons.emprendimientos} title="Emprendimientos aliados"
            desc="Negocios locales de Durazno y la región que trabajan con ConectaTuMundo. Ven su perfil, cómo trabajan y cómo contactárlos."
            linkLabel="Ver emprendimientos" />
        </div>
      </div>
    </section>
  );
}
