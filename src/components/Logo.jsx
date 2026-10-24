// Símbolo de ConectaTuMundo (globo con flechas y red) en vector, con los colores del logo oficial
// (public/LOGOCTM.svg). Se usa donde el logo completo no se lee, como el footer oscuro.
export default function Logo({ size = 30, color = 'var(--marca-azul)', acento = 'var(--marca-celeste)' }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none" aria-hidden="true"
      strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="logo-simbolo">
      <g stroke={color}>
        {/* Arco izquierdo con flechas arriba y abajo */}
        <path d="M28.5 6.6A18 18 0 1 0 28.5 41.4" />
        <path d="M25 3.2 28.8 6.6 25 10" />
        <path d="M25 38 28.8 41.4 25 44.8" />
        {/* Arco derecho */}
        <path d="M33 8.4A18 18 0 0 1 33 39.6" />
        {/* Meridiano y paralelos */}
        <path d="M21 7.5C11.5 15 11.5 33 21 40.5" />
        <path d="M8.5 17h4.5M16.5 17h2.5M6.5 24h12.5M8.5 31h4.5M16.5 31h2.5" />
      </g>
      <g stroke={acento}>
        {/* Red: nodo central con tres ramas */}
        <circle cx="22" cy="24" r="3" />
        <path d="M24.2 21.8 28 17M25 24h8.5M24.2 26.2 28 31" />
        <circle cx="30" cy="15" r="2.5" />
        <circle cx="36" cy="24" r="2.5" />
        <circle cx="30" cy="33" r="2.5" />
      </g>
    </svg>
  );
}
