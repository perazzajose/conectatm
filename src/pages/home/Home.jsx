import Hero from './Hero';
import Servicios from './Servicios';
import Comunidad from './Comunidad';
import Conecta from './Conecta';
import Formacion from './Formacion';
import FaqPreview from './FaqPreview';
import Sobre from './Sobre';
import Contacto from './Contacto';
import './Home.css';

export default function Home() {
  return (
    <>
      <Hero />
      <Servicios />
      <Comunidad />
      <Conecta />
      <Formacion />
      <FaqPreview />
      <Sobre />
      <Contacto />
    </>
  );
}
