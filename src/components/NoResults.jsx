import Icon, { icons } from './Icon';

export function NoResults({ text }) {
  return (
    <div className="no-results">
      <span><Icon size="40">{icons.auditoria}</Icon></span>
      <span dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}

export function Skeleton({ count = 3, className = 'skeleton' }) {
  return Array.from({ length: count }).map((_, i) => <div className={className} key={i} />);
}
