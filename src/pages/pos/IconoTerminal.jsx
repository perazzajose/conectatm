// Dos modelos genéricos (no reproducen ningún dispositivo de marca puntual), coloreados por proveedor
export default function IconoTerminal({ modelo, color }) {
  if (modelo === 'smart') {
    return (
      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="10" width="60" height="100" rx="10" fill={color} opacity="0.16" />
        <rect x="30" y="10" width="60" height="100" rx="10" fill="none" stroke={color} strokeWidth="3" />
        <rect x="38" y="20" width="44" height="58" rx="4" fill={color} opacity="0.85" />
        <rect x="42" y="26" width="36" height="6" rx="2" fill="#fff" opacity="0.9" />
        <rect x="42" y="36" width="26" height="5" rx="2" fill="#fff" opacity="0.6" />
        <circle cx="60" cy="90" r="5" fill={color} />
        <rect x="20" y="55" width="14" height="34" rx="3" fill={color} opacity="0.5" transform="rotate(-8 27 72)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="24" y="34" width="72" height="66" rx="8" fill={color} opacity="0.16" />
      <rect x="24" y="34" width="72" height="66" rx="8" fill="none" stroke={color} strokeWidth="3" />
      <rect x="32" y="42" width="56" height="30" rx="3" fill={color} opacity="0.85" />
      <rect x="37" y="48" width="40" height="5" rx="2" fill="#fff" opacity="0.9" />
      <rect x="37" y="57" width="28" height="4" rx="2" fill="#fff" opacity="0.6" />
      <rect x="32" y="78" width="12" height="10" rx="2" fill={color} opacity="0.55" />
      <rect x="48" y="78" width="12" height="10" rx="2" fill={color} opacity="0.55" />
      <rect x="64" y="78" width="12" height="10" rx="2" fill={color} opacity="0.55" />
      <rect x="40" y="14" width="40" height="24" rx="3" fill="none" stroke={color} strokeWidth="3" />
      <path d="M42 20 H78" stroke={color} strokeWidth="2" opacity="0.6" />
      <path d="M42 26 H70" stroke={color} strokeWidth="2" opacity="0.4" />
    </svg>
  );
}
