import Icon, { icons } from '../../../components/Icon';
import { urlSegura } from '../../../lib/urls';

const badgeLabels = {
  aliado: 'Aliado',
  nuevo: 'Nuevo',
  destacado: 'Destacado',
};

export default function EmpCard({ emp, onPreview }) {
  const servicios = emp.servicios || [];
  const datos = emp.datos || [];
  const bannerStyle = {
    backgroundColor: emp.bannerColor || 'var(--buganvilia)',
    ...(urlSegura(emp.portadaUrl) ? { backgroundImage: `url("${urlSegura(emp.portadaUrl)}")` } : {}),
  };

  return (
    <article className="emp-card">
      <div className="emp-banner" style={bannerStyle}>
        <span className={`badge badge-${emp.badge || 'aliado'}`}>{badgeLabels[emp.badge] || badgeLabels.aliado}</span>
      </div>
      <div className="emp-cabecera">
        <div className="emp-logo" style={{ background: emp.logoColor || 'var(--tinta)' }}>
          {urlSegura(emp.imagenUrl) ? <img src={urlSegura(emp.imagenUrl)} alt="" /> : (emp.logo || <Icon size="26">{icons.emprendimientos}</Icon>)}
        </div>
        <div>
          <h3 className="emp-nombre">{emp.nombre}</h3>
          <p className="emp-rubro">{emp.rubro}</p>
        </div>
      </div>
      <div className="emp-cuerpo">
        {emp.desc && <p className="emp-desc">{emp.desc}</p>}
        {servicios.length > 0 && (
          <ul className="emp-servicios" aria-label="Qué ofrece">
            {servicios.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        )}
        {datos.length > 0 && (
          <ul className="emp-datos">
            {datos.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        )}
        {(emp.sitio || (emp.redes || []).length > 0) && (
          <button type="button" className="btn btn-outline emp-ver" onClick={() => onPreview(emp)}>
            Ver vista previa<span className="visually-hidden"> de {emp.nombre}</span>
          </button>
        )}
      </div>
    </article>
  );
}
