import Icon from './Icon';

export default function ServiceCard({ icon, title, desc, badge }) {
  return (
    <div className="serv-card">
      <div className="serv-icon"><Icon>{icon}</Icon></div>
      <div className="serv-title">{title}</div>
      <p className="serv-desc">{desc}</p>
      {badge && <span className="serv-badge">{badge}</span>}
    </div>
  );
}
