export default function FilterBar({ filtros, active, onChange }) {
  return (
    <div className="filtros-wrap">
      <div className="filtros-scroll">
        {filtros.map(f => (
          <button
            key={f.value}
            className={`filtro-btn${active === f.value ? ' active' : ''}`}
            onClick={() => onChange(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
