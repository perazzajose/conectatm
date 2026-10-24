import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Icon, { icons } from '../../components/Icon';
import RedConecta from './RedConecta';
import './Laboral.css';

// Usa Supabase: se carga aparte para no sumar peso al resto del sitio
const OfertasEmpleo = lazy(() => import('../../components/OfertasEmpleo'));

export default function Laboral() {
  return (
    <>
      <PageHeader
        camino="laboral"
        title="Tu próximo trabajo empieza por un buen CV"
        subtitle="Armalo acá, gratis y sin registrarte. Si sos estudiante, sumá experiencia con la Red Conecta."
      />

      <section className="cv-opciones" aria-label="Opciones de CV">
        <div className="section-inner cv-opciones-grid">
          <article className="cv-opcion principal">
            <Icon size="34">{icons.cv}</Icon>
            <h2>Armá tu CV <span className="estado listo">Disponible</span></h2>
            <p>
              Completás tus datos en una hoja con formato profesional y la descargás en PDF.
              Lo que escribís se guarda solo en tu navegador: nadie más lo ve.
            </p>
            <Link to="/laboral/cv" className="btn btn-primary">Empezar mi CV</Link>
          </article>

          <article className="cv-opcion">
            <Icon size="34">{icons.subir}</Icon>
            <h2>Subí tu CV para que te encuentren <span className="estado listo">Disponible</span></h2>
            <p>
              Una bolsa de CVs para que emprendimientos y pymes de Durazno, Rocha y Montevideo encuentren gente cuando
              necesiten contratar. Tu CV no queda publicado: solo lo ven reclutadores autorizados que buscan tu perfil.
            </p>
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
        <div className="section-inner">
          <h2 id="reclutadores-titulo">¿Buscás personal?</h2>
          <p className="section-sub">Si tenés un emprendimiento o una pyme, podés buscar en la bolsa de CVs por palabras clave y ver primero a quienes mejor coinciden.</p>
          <Link to="/laboral/reclutadores" className="link">Entrar al buscador de CVs</Link>
        </div>
      </section>
    </>
  );
}
