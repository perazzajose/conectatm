import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function ComCard({ to, variant, icon, title, desc, linkLabel }) {
  return (
    <Link to={to} className={`com-card ${variant}`}>
      <div className="com-card-head">
        <div className="com-icon"><Icon>{icon}</Icon></div>
        <div className="com-title">{title}</div>
      </div>
      <p className="com-desc">{desc}</p>
      <span className="com-link">{linkLabel} →</span>
    </Link>
  );
}
