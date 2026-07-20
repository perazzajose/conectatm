const avatarColores = ['#5C3D8A', '#9E78CC', '#7CB98A', '#C4875A', '#4A7FA8', '#A85C7A', '#6A8A4A', '#8A6A4A'];

export default function TutorCard({ tutor, index, delay }) {
  const color = tutor.color || avatarColores[index % avatarColores.length];
  const materias = tutor.materias || [];

  return (
    <div className="perfil-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="card-banner" style={{ background: color }}>
        <span className="banner-deco"></span>
        <span className="banner-deco-2"></span>
      </div>
      <div className="avatar" style={{ background: color }}>
        {tutor.imagenUrl
          ? <img src={tutor.imagenUrl} alt={tutor.nombre} onError={e => { e.target.style.display = 'none'; }} />
          : tutor.avatar}
      </div>
      <div className="card-body">
        <div className="card-info">
          <div className="card-nombre">{tutor.nombre}</div>
          {tutor.institucion && <div className="card-inst">{tutor.institucion}</div>}
        </div>
        {materias.length > 0 && (
          <div className="card-materias">
            {materias.map((m, i) => <span className="materia-tag" key={i}>{m}</span>)}
          </div>
        )}
      </div>
    </div>
  );
}
