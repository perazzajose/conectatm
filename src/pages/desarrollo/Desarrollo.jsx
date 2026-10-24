import PageHeader from '../../components/PageHeader';
import ContactoForm from '../../components/ContactoForm';
import Servicios from './Servicios';
import ComoTrabajo from './ComoTrabajo';
import './Desarrollo.css';

export default function Desarrollo() {
  return (
    <>
      <PageHeader
        camino="desarrollo"
        title="Sitios web y sistemas para tu negocio"
        subtitle="Soy José, desarrollador. Hago sitios, sistemas a medida y soporte técnico para emprendimientos y pymes. La primera charla es gratis."
      >
        <a href="#contacto" className="btn btn-primary header-cta">Pedir presupuesto</a>
      </PageHeader>
      <Servicios />
      <ComoTrabajo />
      <ContactoForm
        titulo="Contame tu proyecto"
        bajada="Con lo básico alcanza. Te respondo yo, normalmente el mismo día, con preguntas o un presupuesto."
        interesInicial="Quiero un sitio web para mi negocio"
      />
    </>
  );
}
