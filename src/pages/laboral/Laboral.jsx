import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Icon, { icons } from '../../components/Icon';
import RedConecta from './RedConecta';
import { waLink } from '../../data/contacto';
import './Laboral.css';

// Usa Supabase: se carga aparte para no sumar peso al resto del sitio
const OfertasEmpleo = lazy(() => import('../../components/OfertasEmpleo'));

export default function Laboral() {
  return (
    <>
      <PageHeader
        camino="laboral"
        title="Tu próximo trabajo empieza por un buen CV"
        subtitle="Gratis y sin registrarte."
      />

      <section className="cv-opciones" aria-label="Opciones de CV">
        <div className="section-inner cv-opciones-grid">
          <article className="cv-opcion principal">
            <Icon size="34">{icons.cv}</Icon>
            <h2>Armá tu CV</h2>
            <p>Completalo en el celular y descargalo en PDF.</p>
            <Link to="/laboral/cv" className="btn btn-primary">Empezar mi CV</Link>
          </article>

          <article className="cv-opcion">
            <Icon size="34">{icons.subir}</Icon>
            <h2>Subí tu CV</h2>
            <p>Que te encuentren empresas de la zona. No queda público.</p>
            <Link to="/laboral/subir" className="btn btn-outline">Subir mi CV</Link>
          </article>
        </div>
      </section>

      <section id="ofertas" className="laboral-ofertas" aria-label="Ofertas de trabajo">
        <div className="section-inner">
          <Suspense fallback={<p className="section-sub">Cargando ofertas…</p>}>
            <OfertasEmpleo />
          </Suspense>
        </div>
      </section>

      <RedConecta />

      <section className="laboral-reclutadores" aria-labelledby="reclutadores-titulo">
        <div className="section-inner laboral-reclutadores-layout">
          <div>
            <h2 id="reclutadores-titulo">¿Tenés un negocio y buscás personal?</h2>
            <p>Buscá en la bolsa de CVs por palabras clave.</p>
          </div>
          <div className="laboral-reclutadores-acciones">
            <Link to="/laboral/reclutadores" className="btn btn-primary">Buscar CVs</Link>
            <a href={waLink('Hola José, tengo un negocio y quiero acceso al buscador de CVs')} className="link" target="_blank" rel="noopener noreferrer">
              ¿No tenés acceso? Pedilo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
