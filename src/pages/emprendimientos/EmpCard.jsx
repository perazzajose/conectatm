import Icon, { icons } from '../../components/Icon';

const badgeLabels = {
  aliado: { text: '✦ Aliado', cls: 'badge-aliado' },
  nuevo: { text: '★ Nuevo', cls: 'badge-nuevo' },
  destacado: { text: '⬡ Destacado', cls: 'badge-destacado' },
};

export default function EmpCard({ emp, delay }) {
  const b = badgeLabels[emp.badge] || badgeLabels.aliado;
  const servicios = emp.servicios || [];
  const datos = emp.datos || [];
  const bannerStyle = {
    backgroundColor: emp.bannerColor || '#9E78CC',
    ...(emp.portadaUrl ? { backgroundImage: `url('${emp.portadaUrl}')` } : {}),
  };

  return (
    <div className="emp-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="card-banner" style={bannerStyle}>
        <span className="banner-emoji">
          {emp.emoji || <Icon>{icons.emprendimientos}</Icon>}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.6rem' }}>
        <div className="card-logo" style={{ background: emp.logoColor || '#7A58AC' }}>
          {emp.imagenUrl
            ? <img src={emp.imagenUrl} alt={emp.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '11px' }} />
            : emp.logo}
        </div>
        <div className="card-head-row" style={{ flex: 1, paddingRight: '1.2rem', paddingTop: '.5rem' }}>
          <div>
            <div className="card-nombre">{emp.nombre}</div>
            <div className="card-rubro">{emp.rubro}</div>
          </div>
          <div className="card-badge-wrap">
            <span className={`badge ${b.cls}`}>{b.text}</span>
          </div>
        </div>
      </div>
      <div className="card-body">
        {emp.desc && <p className="card-desc">{emp.desc}</p>}
        {servicios.length > 0 && (
          <div className="card-servicios">
            {servicios.map((s, i) => <span className="serv-tag" key={i}>{s}</span>)}
          </div>
        )}
        {datos.length > 0 && (
          <div className="card-datos">
            {datos.map((d, i) => <span className="dato" key={i}>{d}</span>)}
          </div>
        )}
        {emp.sitio && (
          <a href={emp.sitio} target="_blank" rel="noopener noreferrer" className="card-sitio-btn">
            <Icon size="20">{icons.globo}</Icon> Ver sitio →
          </a>
        )}
      </div>
    </div>
  );
}
