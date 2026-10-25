import { urlSegura } from '../../../lib/urls';

const avatarColores = ['#2F5B3A', '#245E9E', '#8E3A86', '#B04A3C', '#4A6670', '#6B4E2E'];

export default function TutorCard({ tutor, index }) {
  const color = tutor.color || avatarColores[index % avatarColores.length];
  const materias = tutor.materias || [];

  return (
    <article className="perfil-card">
      <div className="avatar" style={{ background: color }}>
        {urlSegura(tutor.imagenUrl)
          ? <img src={urlSegura(tutor.imagenUrl)} alt="" onError={e => { e.target.style.display = 'none'; }} />
          : tutor.avatar}
      </div>
      <div className="card-info">
        <h3 className="card-nombre">{tutor.nombre}</h3>
        {tutor.institucion && <p className="card-inst">{tutor.institucion}</p>}
        {materias.length > 0 && (
          <ul className="card-materias" aria-label="Materias">
            {materias.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
        )}
      </div>
    </article>
  );
}
