import Icon from './Icon';

export default function ServiceCard({ icon, title, desc, badge, tag }) {
  return (
    <div className="serv-card">
      <div className="serv-icon"><Icon>{icon}</Icon></div>
      <div className="serv-title">{title}</div>
      <p className="serv-desc">{desc}</p>
      {badge && <span className="serv-badge">{badge}</span>}
      {tag && <span className="serv-tag">{tag}</span>}
    </div>
  );
}
