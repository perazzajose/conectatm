import PageHeader from '../../components/PageHeader';
import Talleres from './Talleres';
import Glosario from './Glosario';
import './Aprende.css';

export default function Aprende() {
  return (
    <>
      <PageHeader
        fondo="/fondos/aprende.webp"
        title="Tecnología explicada para todos"
        subtitle="Talleres para grupos e instituciones, y un glosario para cuando escuchás una palabra y no sabés qué significa."
      />
      <Talleres />
      <Glosario />
    </>
  );
}
