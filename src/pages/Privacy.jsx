import PageHeader from '../components/PageHeader';
import './StaticPage.css';

const secciones = [
  {
    h: 'Información que recopilamos',
    body: (
      <>
        <p>Cuando utilizas nuestros servicios, podemos recopilar la siguiente información:</p>
        <ul>
          <li>Nombre y apellido</li>
          <li>Dirección de correo electrónico o número de teléfono</li>
          <li>Información sobre tu negocio o necesidades educativas</li>
          <li>Información proporcionada voluntariamente en formularios de contacto</li>
        </ul>
      </>
    ),
  },
  {
    h: '¿Cómo utilizamos tu información?',
    body: (
      <>
        <p>Utilizamos la información recolectada para:</p>
        <ul>
          <li>Responder a tus consultas y solicitudes</li>
          <li>Facilitar la conexión entre emprendimientos y estudiantes</li>
          <li>Brindar los servicios solicitados</li>
          <li>Mejorar nuestros servicios y experiencia de usuario</li>
          <li>Enviar información relevante relacionada con nuestros servicios</li>
        </ul>
      </>
    ),
  },
  {
    h: 'Editor de CV',
    body: <p>Lo que escribís en “Armá tu CV” se guarda únicamente en tu navegador, en tu dispositivo. No lo recibimos ni lo almacenamos en nuestros servidores. Si borrás los datos del navegador, el CV se borra también.</p>,
  },
  {
    h: 'Bolsa de CVs',
    body: (
      <>
        <p>Si subís tu CV a la bolsa, guardamos el archivo PDF, el texto que contiene y los datos que completás (nombre, contacto, ciudad, puesto y habilidades). Lo hacemos solo con tu consentimiento, que das al marcar la casilla del formulario.</p>
        <ul>
          <li>Tu CV no es público: solo pueden buscarlo y abrirlo reclutadores a los que ConectaTuMundo les dio acceso.</li>
          <li>Los datos se guardan en Supabase, un servicio de base de datos en la nube.</li>
          <li>Podés borrar tu CV cuando quieras con el enlace que recibís al subirlo, o pidiéndolo por WhatsApp o email.</li>
          <li>Podés pedir acceso, corrección o eliminación de tus datos en cualquier momento, según la Ley 18.331 de Protección de Datos Personales.</li>
        </ul>
      </>
    ),
  },
  {
    h: 'Protección de datos',
    body: <p>Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger tu información contra acceso no autorizado, alteración, divulgación o destrucción. Solo el personal autorizado tiene acceso a tus datos personales.</p>,
  },
  {
    h: 'Compartición de información',
    body: <p>No vendemos, comerciamos ni transferimos tus datos personales a terceros sin tu consentimiento expreso, excepto cuando sea requerido por ley o para facilitar los servicios que has solicitado.</p>,
  },
  {
    h: 'Derechos del usuario',
    body: (
      <>
        <p>Tienes derecho a:</p>
        <ul>
          <li>Acceder a tus datos personales</li>
          <li>Solicitar la corrección de información inexacta</li>
          <li>Solicitar la eliminación de tus datos personales</li>
          <li>Limitar el procesamiento de tus datos personales</li>
          <li>Retirar tu consentimiento en cualquier momento</li>
        </ul>
      </>
    ),
  },
  {
    h: 'Contacto',
    body: (
      <>
        <p>Si tienes preguntas sobre esta política de privacidad o deseas ejercer tus derechos, puedes contactarnos en:</p>
        <p>joseperazza@conectatumundo.net</p>
        <p>(+598) 097 154 271</p>
      </>
    ),
  },
];

export default function Privacy() {
  return (
    <>
      <PageHeader
        title="Política de privacidad"
        subtitle="En ConectaTuMundo valoramos tu privacidad y nos comprometemos a proteger tus datos personales."
      />
      <div className="content-wrap">
        {secciones.map((s, i) => (
          <div className="content-section" key={i}>
            <h2>{s.h}</h2>
            {s.body}
          </div>
        ))}
      </div>
    </>
  );
}
