import ServiceCard from '../../components/ServiceCard';
import { icons } from '../../components/Icon';

const servicios = [
  {
    icon: icons.web,
    title: 'Tu local en internet',
    desc: 'Un sitio web donde tus clientes te encuentren, vean qué vendés y te contacten — aunque sean de otro barrio o ciudad.',
    badge: 'Desde $250 USD',
    tag: 'Desarrollo web'
  },
  {
    icon: icons.auditoria,
    title: 'Revisión de tu presencia digital',
    desc: 'Como llevar el auto al mecánico antes de salir de viaje: miramos qué está funcionando y qué no, y te decimos qué arreglar primero.',
    badge: 'Diagnóstico gratis',
    tag: 'Auditoría digital'
  },
  {
    icon: icons.asesoria,
    title: 'Sesión de consulta personal',
    desc: 'Una charla con José donde podés preguntar todo sin apuro. Redes, herramientas, estrategia — sin tecnicismos y sin juicios.',
    badge: 'Por sesión o mensual',
    tag: 'Asesoría 1:1'
  },
  {
    icon: icons.soporte,
    title: 'Soporte para tu computadora o red',
    desc: 'La compu no anda, el wifi falló, el sistema se trancó. Llamá y lo resolvemos — rápido, sin vueltas, sin que tengas que saber de tecnología.',
    badge: 'Remoto y presencial',
    tag: 'Soporte IT'
  },
  {
    icon: icons.redes,
    title: 'Redes sociales para tu negocio',
    desc: 'Te ayudamos a aparecer en Instagram, Facebook y Google Maps. Para que cuando alguien busque lo que vendés, te encuentre a vos.',
    badge: 'Pack mensual',
    tag: 'Redes sociales'
  },
  {
    icon: icons.identidad,
    title: 'La imagen de tu marca',
    desc: 'Logo, colores, tarjeta y todo lo que hace que tu negocio se vea igual en todos lados. Profesional y tuyo.',
    badge: 'Pack completo',
    tag: 'Identidad digital'
  },
];

export default function Servicios() {
  return (
    <section id="servicios">
      <div className="section-inner">
        <div className="section-tag">¿Qué hacemos?</div>
        <h2>Servicios para negocios del interior</h2>
        <p className="section-sub">Todo explicado en palabras simples. Precios pensados para emprendedores, no para empresas grandes.</p>
        <div className="servicios-grid">
          {servicios.map((s, i) => <ServiceCard key={i} {...s} />)}
        </div>
      </div>
    </section>
  );
}
