import { lazy, Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import ContactoForm from '../../components/ContactoForm';
import FaqItem from '../../components/FaqItem';
import Icon, { icons } from '../../components/Icon';
import NotFound from '../NotFound';
import { DEPARTAMENTOS } from '../../data/departamentos';
import { ZONAS_TEXTO, waLink } from '../../data/contacto';
import './Zona.css';

const OfertasEmpleo = lazy(() => import('../../components/OfertasEmpleo'));

// Donde José va en persona; en el resto del país trabaja a distancia
const PRESENCIAL = ['durazno', 'rocha', 'montevideo'];
// Foto real de la zona, cuando la hay
const FOTOS = { durazno: '/hero.webp', rocha: '/fondos/rocha.webp', montevideo: '/fondos/laboral.webp' };

// Una página por departamento (/durazno, /rocha…): misma plantilla, con las ofertas de trabajo
// y los enlaces de búsqueda de ese departamento. Títulos y descripciones en src/data/seo.js.
export default function Zona() {
  const { depto } = useParams();
  const d = DEPARTAMENTOS.find(x => x.id === depto);
  if (!d) return <NotFound />;

  const n = d.nombre;
  const presencial = PRESENCIAL.includes(d.id);
  const modalidad = presencial
    ? `Trabajo en persona en ${n}, y también a distancia.`
    : `Trabajo a distancia, por WhatsApp y videollamada: no hace falta estar cerca.`;

  const ayudas = [
    {
      color: 'var(--palmera)', icon: icons.cv, titulo: 'Trabajo',
      texto: `Armá tu CV gratis, dejalo en la bolsa de CVs y mirá las últimas ofertas de ${n}.`,
      enlaces: [{ to: '/laboral/cv', label: 'Armá tu CV' }, { href: '#ofertas', label: `Ofertas en ${n}` }],
    },
    {
      color: 'var(--cielo)', icon: icons.tutores, titulo: 'Estudios',
      texto: `Liceo, UTU, universidad, cursos y becas gratuitos${presencial ? ` en ${n}` : ''}, y profes particulares.`,
      enlaces: [{ to: presencial ? `/estudios?zona=${d.id}` : '/estudios', label: 'Estudiá gratis' }, { to: '/laboral/tutores', label: 'Profes particulares' }],
    },
    {
      color: 'var(--buganvilia)', icon: icons.emprendimientos, titulo: 'Emprendimiento',
      texto: 'Tu sitio web o sistema a medida, con qué POS te conviene cobrar y un lugar en la vitrina de emprendimientos.',
      enlaces: [{ to: '/desarrollo', label: 'Sitio web o sistema' }, { to: '/negocios/pos', label: 'Elegí tu POS' }],
    },
  ];

  const preguntas = [
    {
      q: `¿Hacés páginas web en ${n}?`,
      a: `Sí. Hago sitios web, tiendas online y sistemas a medida para emprendimientos y pymes de ${n}. ${modalidad}`,
    },
    {
      q: '¿Cuánto cuesta una página web?',
      a: 'Un sitio web arranca desde USD 250; los sistemas a medida se presupuestan según el proyecto. La primera charla es gratis y sin compromiso.',
    },
    {
      q: `¿Las herramientas sirven si estoy en ${n}?`,
      a: `Sí. El editor de CV, el comparador de POS y las ofertas de trabajo funcionan en todo Uruguay y son gratis. Las ofertas de esta página son de ${n} y se actualizan todos los lunes.`,
    },
  ];

  return (
    <>
      <PageHeader
        pagina={n}
        fondo={FOTOS[d.id] ?? null}
        title={`Desarrollo web y herramientas digitales en ${n}`}
        subtitle={`Sitios web y sistemas para negocios de ${n}, y herramientas gratis para buscar trabajo y estudiar. ${modalidad}`}
      >
        <a href={waLink(`Hola José, te escribo desde ${n}`)} className="btn btn-primary header-cta" target="_blank" rel="noopener noreferrer">
          Escribime por WhatsApp
        </a>
      </PageHeader>

      <section className="zona-ayudas" aria-labelledby="zona-ayudas-titulo">
        <div className="section-inner">
          <h2 id="zona-ayudas-titulo">¿En qué te puedo ayudar?</h2>
          <ul className="zona-cards">
            {ayudas.map(a => (
              <li key={a.titulo} className="zona-card" style={{ '--c': a.color }}>
                <span className="zona-card-icono"><Icon size="26">{a.icon}</Icon></span>
                <h3>{a.titulo}</h3>
                <p>{a.texto}</p>
                <div className="zona-card-enlaces">
                  {a.enlaces.map(e => e.to
                    ? <Link key={e.label} to={e.to} className="link">{e.label}</Link>
                    : <a key={e.label} href={e.href} className="link">{e.label}</a>)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="ofertas" className="zona-ofertas" aria-label={`Ofertas de trabajo en ${n}`}>
        <div className="section-inner">
          <Suspense fallback={<p className="section-sub">Cargando ofertas…</p>}>
            <OfertasEmpleo key={d.id} departamento={d.id} titulo={`Ofertas de trabajo en ${n}`} />
          </Suspense>
        </div>
      </section>

      <section className="zona-preguntas" aria-labelledby="zona-preguntas-titulo">
        <div className="section-inner">
          <h2 id="zona-preguntas-titulo">Preguntas frecuentes en {n}</h2>
          <div className="faq-list">
            {preguntas.map(p => <FaqItem key={p.q} question={p.q} answer={p.a} />)}
          </div>
          {!presencial && <p className="zona-nota">Voy en persona a {ZONAS_TEXTO}. Para el resto del país, todo se resuelve a distancia.</p>}
        </div>
      </section>

      <ContactoForm
        titulo={`¿Tenés un negocio en ${n}?`}
        bajada="Contame qué necesitás. Te respondo yo, normalmente el mismo día."
        interesInicial="Quiero un sitio web para mi negocio"
      />
    </>
  );
}
