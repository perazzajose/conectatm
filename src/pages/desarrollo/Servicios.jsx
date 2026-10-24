import Icon, { icons } from '../../components/Icon';

const servicios = [
  {
    icon: icons.web,
    title: 'Sitio web para tu negocio',
    desc: 'Un sitio donde te encuentren, vean qué vendés y te escriban, aunque estén en otra ciudad.',
    precio: 'Desde USD 250',
  },
  {
    icon: icons.stock,
    title: 'Sistema a medida',
    desc: 'Control de stock, ventas, turnos, pedidos: un sistema hecho para cómo trabaja tu negocio, no al revés.',
    precio: 'Presupuesto según el proyecto',
  },
  {
    icon: icons.soporte,
    title: 'Soporte técnico',
    desc: 'La compu no arranca, el wifi se cae, el sistema se trancó. Lo resolvemos a distancia o voy hasta tu local.',
    precio: 'Remoto o presencial',
  },
  {
    icon: icons.auditoria,
    title: 'Revisión de tu presencia digital',
    desc: 'Miro tu sitio, tus redes y cómo te encuentran en Google, y te digo qué conviene arreglar primero.',
    precio: 'Gratis',
  },
  {
    icon: icons.redes,
    title: 'Redes e imagen de marca',
    desc: 'Logo, colores y tus perfiles de Instagram, Facebook y Google Maps bien armados, para que te vean igual en todos lados.',
    precio: 'Por paquete',
  },
  {
    icon: icons.asesoria,
    title: 'Asesoría uno a uno',
    desc: 'Una charla para preguntar todo lo que necesites sobre tecnología para tu negocio, sin tecnicismos.',
    precio: 'Por sesión o mensual',
  },
];

export default function Servicios() {
  return (
    <section id="servicios">
      <div className="section-inner">
        <h2>Qué hago</h2>
        <p className="section-sub">Precios pensados para emprendimientos y pymes. Antes de cobrar nada, te paso un presupuesto cerrado.</p>
        <ul className="servicios-lista">
          {servicios.map(s => (
            <li key={s.title} className="servicio">
              <span className="servicio-icono"><Icon size="26">{s.icon}</Icon></span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
              <span className="servicio-precio">{s.precio}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
