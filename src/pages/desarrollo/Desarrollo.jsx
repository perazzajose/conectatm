import PageHeader from '../../components/PageHeader';
import ContactoForm from '../../components/ContactoForm';
import Rapidos from './Rapidos';
import Servicios from './Servicios';
import ComoTrabajo from './ComoTrabajo';
import { waLink } from '../../data/contacto';
import './Desarrollo.css';

export default function Desarrollo() {
  return (
    <>
      <PageHeader
        camino="desarrollo"
        title="Web, Google Maps y sistemas para tu negocio"
        subtitle="Soy José, desarrollador. Te dejo el comercio bien puesto en Google Maps, con su página y sus redes, y hago sistemas a medida. La primera charla es gratis."
      >
        <div className="header-ctas">
          <a href={waLink('Hola José, quiero pedirte un presupuesto')} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">Pedir presupuesto por WhatsApp</a>
          <a href="#rapidos" className="btn btn-outline">Ver qué hago</a>
        </div>
      </PageHeader>
      <Rapidos />
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
