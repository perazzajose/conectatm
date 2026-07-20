// Wrapper genérico: todos los íconos del sitio siguen el mismo trazo (stroke lila-dark, 1.7)
export default function Icon({ children, size = '60%' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
      stroke="var(--lila-dark)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

// Set de íconos usados en el sitio (path data extraído del HTML original)
export const icons = {
  web: <><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/></>,
  taller: <><path d="M5 12a9 9 0 0 1 14 0"/><path d="M8.5 15a5 5 0 0 1 7 0"/><circle cx="12" cy="18.5" r="1.4" fill="currentColor" stroke="none"/></>,
  tutores: <><path d="M2 9.5 12 5l10 4.5-10 4.5L2 9.5Z"/><path d="M6.5 11.6V16c0 1.4 2.5 2.6 5.5 2.6s5.5-1.2 5.5-2.6v-4.4"/><path d="M20.5 9.5v5.2"/></>,
  emprendimientos: <><path d="M3.5 9.5 4.7 4h14.6l1.2 5.5"/><path d="M3.5 9.5a2.6 2.6 0 0 0 5.1.6 2.6 2.6 0 0 0 5 0 2.6 2.6 0 0 0 5 0 2.6 2.6 0 0 0 5.1-.6"/><path d="M5 10v9.5h14V10"/><path d="M9.5 19.5V14h5v5.5"/></>,
  conecta: <><path d="M2.5 12.5 6 9l3 2 3-2.3L15.5 11l3-2.7 3 3"/><path d="M6 9l4 6.5 2-1.5 2 2 2-1.7 2 1.7"/><path d="M9.2 14.8 8 17l2 1.6"/></>,
  faq: <><circle cx="12" cy="12" r="9"/><path d="M9.3 9.4a2.7 2.7 0 1 1 3.9 2.4c-.9.5-1.2 1-1.2 2"/><circle cx="12" cy="17" r="0.15" fill="currentColor"/></>,
  sobre: <><circle cx="12" cy="8" r="3.6"/><path d="M5 20c1-3.6 4-5.4 7-5.4s6 1.8 7 5.4"/></>,
  globo: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 4 5.8 4 9s-1.4 6.4-4 9c-2.6-2.6-4-5.8-4-9s1.4-6.4 4-9Z"/></>,
  auditoria: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="M19.5 19.5 15.3 15.3"/></>,
  asesoria: <><path d="M9 18.3h6"/><path d="M9.5 21h5"/><path d="M12 3a6.3 6.3 0 0 0-3.6 11.5c.6.45 1.1 1.2 1.1 2h5c0-.8.5-1.55 1.1-2A6.3 6.3 0 0 0 12 3Z"/></>,
  soporte: <><path d="M15.3 4.2a4.7 4.7 0 0 0-6 5.8L3.5 15.7a1.8 1.8 0 0 0 2.5 2.5L11.7 12a4.7 4.7 0 0 0 5.8-6l-2.9 2.9-2.3-2.3 2.9-2.9Z"/></>,
  redes: <><rect x="6.5" y="2.5" width="11" height="19" rx="2"/><path d="M10.3 18.3h3.4"/></>,
  identidad: <><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/></>,
  talleres2: <><path d="M3 21h18"/><path d="M5 21V9.5L12 5l7 4.5V21"/><path d="M9.5 21v-6h5v6"/><path d="M12 5V2.7"/></>,
  hamburger: null, // se maneja aparte con <span>
};
