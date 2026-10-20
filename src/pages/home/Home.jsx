import Hero from './Hero';
import Servicios from './Servicios';
import Cobertura from './Cobertura';
import Comunidad from './Comunidad';
import Conecta from './Conecta';
import Formacion from './Formacion';
import Glosario from './Glosario';
import FaqPreview from './FaqPreview';
import Sobre from './Sobre';
import Contacto from './Contacto';
import './Home.css';

export default function Home() {
  return (
    <>
      <Hero />
      <Servicios />
      <Cobertura />
      <Comunidad />
      <Conecta />
      <Formacion />
      <Glosario />
      <FaqPreview />
      <Sobre />
      <Contacto />
    </>
  );
}
