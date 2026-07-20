export default function PageHeader({ tag, title, subtitle, stats, gradient }) {
  return (
    <div className="page-header" style={gradient ? { background: gradient } : undefined}>
      <div className="section-tag">{tag}</div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {stats && (
        <div className="header-stats">
          {stats.map((s, i) => (
            <div className="hstat" key={i}>{s}</div>
          ))}
        </div>
      )}
    </div>
  );
}
