import Icon, { icons } from './Icon';

export default function SearchBox({ value, onChange, placeholder }) {
  return (
    <div className="search-wrap">
      <div className="search-box">
        <span className="search-icon"><Icon size="20">{icons.auditoria}</Icon></span>
        <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
      </div>
    </div>
  );
}
