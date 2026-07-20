import Icon from './Icon';

export default function HeroPill({ variant, icon, title, sub }) {
  return (
    <div className="hero-pill">
      <div className={`pill-icon ${variant}`}><Icon>{icon}</Icon></div>
      <div className="pill-text">{title}<span>{sub}</span></div>
    </div>
  );
}
