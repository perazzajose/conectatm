import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Proximamente from '../../components/Proximamente';
import PosRecomendador from './pos/PosRecomendador';
import { HERRAMIENTAS } from '../../data/herramientas';
import './Negocios.css';

export default function Negocios() {
  return (
    <>
      <PageHeader
        camino="negocios"
        title="Herramientas para que tu negocio venda y se ordene"
        subtitle="Para emprendimientos y pymes que quieren cobrar mejor, saber qué tienen en stock y dejar de depender del cuaderno."
      />

      <section id="pos" aria-labelledby="pos-titulo">
        <div className="section-inner">
          <h2 id="pos-titulo">¿Con qué POS te conviene cobrar?</h2>
          <p className="section-sub">
            Cuatro preguntas y te decimos qué proveedores encajan con tu negocio.{' '}
            <Link to="/negocios/pos#comparador" className="link">Ver la comparación completa</Link>
          </p>
          <PosRecomendador />
        </div>
      </section>

      <section className="negocios-herramientas" aria-labelledby="herramientas-titulo">
        <div className="section-inner">
          <h2 id="herramientas-titulo">Sistemas en desarrollo</h2>
          <p className="section-sub">
            Herramientas propias, pensadas para negocios de acá. Si te anotás, te escribo cuando puedas probarlas,
            y tu opinión ayuda a decidir qué se hace primero.
          </p>
          <Proximamente items={HERRAMIENTAS} />
        </div>
      </section>

      <section aria-labelledby="mas-titulo">
        <div className="section-inner negocios-mas">
          <h2 id="mas-titulo" className="visually-hidden">Más para tu negocio</h2>
          <Link to="/negocios/emprendimientos" className="negocios-enlace">
            <strong>Vitrina de emprendimientos</strong>
            <span>Mostrá tu negocio junto a otros de la zona.</span>
          </Link>
          <Link to="/aprende" className="negocios-enlace">
            <strong>Talleres para tu equipo</strong>
            <span>WhatsApp Business, facturación digital, seguridad online.</span>
          </Link>
          <Link to="/desarrollo" className="negocios-enlace">
            <strong>¿Necesitás algo a medida?</strong>
            <span>Sitio web, tienda online o un sistema hecho para tu negocio.</span>
          </Link>
        </div>
      </section>
    </>
  );
}
