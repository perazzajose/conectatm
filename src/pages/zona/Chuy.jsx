import { Link } from 'react-router-dom';
import Icon, { icons } from '../../components/Icon';
import { TEMAS, LUGARES, FUENTES, CON_PIX, REVISADO } from '../../data/chuy';
import { WHATSAPP_VISIBLE, waLink } from '../../data/contacto';
import '@fontsource/barlow-condensed/latin-600.css';
import '@fontsource/barlow-condensed/latin-700.css';
import '@fontsource/barlow/latin-400.css';
import '@fontsource/barlow/latin-600.css';
import './Chuy.css';

// Guía del Chuy: una sección aparte del sitio, con su propio estilo (sin el menú ni el pie de ConectaTuMundo,
// ver App.jsx). Primero, información práctica de la frontera; al final, los servicios.
// El contenido y sus fuentes están en src/data/chuy.js.

function Fuentes({ ids }) {
  return (
    <p className="ch-fuente">
      {ids.length > 1 ? 'Fuentes: ' : 'Fuente: '}
      {ids.map((id, i) => (
        <span key={id}>{i > 0 && ' · '}<a href={FUENTES[id].url} target="_blank" rel="noopener noreferrer">{FUENTES[id].titulo}</a></span>
      ))}
    </p>
  );
}

const datosFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: TEMAS.map(t => ({ '@type': 'Question', name: t.pregunta, acceptedAnswer: { '@type': 'Answer', text: t.parrafos.join(' ') } })),
};

export default function Chuy() {
  return (
    <div className="guia-chuy">
      <header className="ch-barra">
        <span className="ch-marca">Chuy · Chuí <small>guía de frontera</small></span>
        <Link to="/" className="ch-volver">ConectaTuMundo</Link>
      </header>

      <section className="ch-portada" aria-labelledby="ch-titulo">
        <div className="ch-portada-imagen">
          <img
            src="/fondos/monumento.webp"
            width="1600"
            height="900"
            alt="Ilustración del monumento de bienvenida en la avenida, con las banderas de Uruguay y Brasil"
            className="ch-portada-foto"
            fetchPriority="high"
          />
          <div className="ch-ancho ch-portada-texto">
            <h1 id="ch-titulo">Chuy · Chuí</h1>
            <p className="ch-bajada">Una ciudad, dos países. Lo básico para comprar, pagar y moverte en la frontera.</p>
          </div>
        </div>
        {/* La avenida vista en corte: vereda uruguaya, calzada con la doble amarilla, vereda brasileña */}
        <div className="ch-avenida" role="img" aria-label="La avenida que comparten: del lado uruguayo se llama Avenida Brasil y del brasileño, Avenida Uruguai">
          <div className="ch-lado ch-uy"><b>Uruguay</b><span>Avenida Brasil</span></div>
          <div className="ch-calzada" aria-hidden="true"><i /><i className="ch-centro" /><i /></div>
          <div className="ch-lado ch-br"><b>Brasil</b><span>Avenida Uruguai</span></div>
        </div>
        <p className="ch-ancho ch-nota">Sin muro, barrera ni puesto de migración en el medio: se cruza caminando.</p>
      </section>

      <nav className="ch-indice ch-ancho" aria-label="Temas de la guía">
        <h2>Qué necesitás saber</h2>
        <ul>
          {TEMAS.map(t => <li key={t.id}><a href={`#${t.id}`} className="ch-cartel">{t.corto}</a></li>)}
          <li><a href="#donde-ir" className="ch-cartel">Dónde ir</a></li>
        </ul>
      </nav>

      <div className="ch-temas">
        {TEMAS.map(t => (
          <section key={t.id} id={t.id} className="ch-tema ch-ancho" aria-labelledby={`${t.id}-titulo`}>
            <h2 id={`${t.id}-titulo`}>{t.pregunta}</h2>
            <p className="ch-pt" lang="pt-BR"><abbr title="En portugués">PT</abbr> {t.pt}</p>
            {t.parrafos.map(p => <p key={p.slice(0, 24)}>{p}</p>)}
            <Fuentes ids={t.fuentes} />
          </section>
        ))}

        <section id="donde-ir" className="ch-tema ch-ancho" aria-labelledby="donde-ir-titulo">
          <h2 id="donde-ir-titulo">¿Dónde ir?</h2>
          <ul className="ch-lugares">
            {LUGARES.map(l => (
              <li key={l.nombre}>
                <span className="ch-mojon" aria-label={l.km === 0 ? 'En el Chuy' : l.km ? `A ${l.km} km del Chuy` : 'Cerca del Chuy'}>
                  {l.km != null ? <>km<b>{l.km}</b></> : <b className="ch-cerca">cerca</b>}
                </span>
                <div>
                  <h3>{l.nombre}</h3>
                  <p>{l.texto}</p>
                  <Fuentes ids={l.fuentes} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="ch-comercio" aria-labelledby="ch-comercio-titulo">
        <div className="ch-ancho">
          <h2 id="ch-comercio-titulo">¿Tenés un comercio en el Chuy?</h2>
          <p className="ch-comercio-bajada">Soy José, de ConectaTuMundo. Ayudo a comercios chicos a atender a clientes de los dos lados de la avenida.</p>
          <ul className="ch-servicios">
            <li>
              <Icon size="26">{icons.pos}</Icon>
              <h3>Cobrar con Pix</h3>
              <p>Compará los proveedores que cobran con Pix ({CON_PIX.map(p => p.nombre).join(' y ')}) con el resto de los POS.</p>
              <Link to="/negocios/pos">Ver el comparador</Link>
            </li>
            <li>
              <Icon size="26">{icons.web}</Icon>
              <h3>Que te encuentren</h3>
              <p>Tu ficha de Google Maps, tu página y tus redes, también con textos en portugués.</p>
              <Link to="/desarrollo#servicios">Servicios y precios</Link>
            </li>
            <li>
              <Icon size="26">{icons.cv}</Icon>
              <h3>Contratar personal</h3>
              <p>Quien se postula arma su CV gratis desde el celular y te lo manda en PDF por WhatsApp.</p>
              <Link to="/laboral/cv">Editor de CV</Link>
            </li>
          </ul>
          <a className="ch-whatsapp" href={waLink('Hola José, tengo un comercio en el Chuy')} target="_blank" rel="noopener noreferrer">
            <Icon size="22">{icons.whatsapp}</Icon> Escribime al {WHATSAPP_VISIBLE}
          </a>
        </div>
      </section>

      <footer className="ch-pie">
        <div className="ch-ancho">
          <p>Guía hecha por <Link to="/">ConectaTuMundo</Link>. Revisada en <time dateTime={REVISADO.fecha}>{REVISADO.texto}</time>. Las reglas de frontera cambian: confirmá lo importante antes de viajar.</p>
          <p className="ch-pie-enlaces">
            <Link to="/">Volver a ConectaTuMundo</Link>
            <Link to="/rocha">Rocha</Link>
            <Link to="/privacy">Privacidad</Link>
          </p>
        </div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datosFaq).replace(/</g, '\\u003c') }} />
    </div>
  );
}
