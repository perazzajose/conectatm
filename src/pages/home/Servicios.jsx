import ServiceCard from '../../components/ServiceCard';
import { icons } from '../../components/Icon';

const servicios = [
  { icon: icons.web, title: 'Desarrollo web', desc: 'Sitios modernos y rápidos. Desde una landing hasta tiendas online completas, con dominio y soporte.', badge: 'Desde $250 USD' },
  { icon: icons.auditoria, title: 'Auditoría digital', desc: 'Analizamos tu presencia online y te entregamos un informe con qué mejorar primero.', badge: 'Diagnóstico gratis' },
  { icon: icons.asesoria, title: 'Asesoría 1:1', desc: 'Sesiones personalizadas de estrategia digital, redes y herramientas para crecer.', badge: 'Por sesión o mensual' },
  { icon: icons.soporte, title: 'Soporte IT', desc: 'Computadoras, redes o software. Atención rápida para que tu negocio no se detenga.', badge: 'Remoto y presencial' },
  { icon: icons.redes, title: 'Redes sociales', desc: 'Estrategia y acompañamiento para Instagram, Facebook y Google Mi Negocio.', badge: 'Pack mensual' },
  { icon: icons.identidad, title: 'Identidad digital', desc: 'Logo, colores y materiales para que tu marca tenga coherencia en todos lados.', badge: 'Pack completo' },
];

export default function Servicios() {
  return (
    <section id="servicios">
      <div className="section-inner">
        <div className="section-tag">Agencia digital local</div>
        <h2>Servicios para emprendimientos que quieren crecer</h2>
        <p className="section-sub">Todo lo que tu negocio necesita en el mundo digital, con precios pensados para el interior.</p>
        <div className="servicios-grid">
          {servicios.map((s, i) => <ServiceCard key={i} {...s} />)}
        </div>
      </div>
    </section>
  );
}
