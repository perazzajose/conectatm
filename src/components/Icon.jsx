// Wrapper genérico: todos los íconos del sitio siguen el mismo trazo (1.7) y toman el color del texto
export default function Icon({ children, size = '60%' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

// Set de íconos usados en el sitio
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
  cv: <><path d="M6 2.5h8.5L19 7v14.5H6Z"/><path d="M14 2.5V7h5"/><circle cx="11" cy="10.5" r="2"/><path d="M8 16c.6-1.6 1.7-2.4 3-2.4s2.4.8 3 2.4"/><path d="M9 19h7"/></>,
  subir: <><path d="M12 15V4"/><path d="m7.5 8.5 4.5-4.5 4.5 4.5"/><path d="M4 15v4.5h16V15"/></>,
  codigo: <><path d="m8 8-4.5 4L8 16"/><path d="m16 8 4.5 4-4.5 4"/><path d="m13.5 5-3 14"/></>,
  pos: <><rect x="6" y="2.5" width="12" height="19" rx="2"/><rect x="8.5" y="5" width="7" height="5" rx=".5"/><path d="M9 13.5h.01M12 13.5h.01M15 13.5h.01M9 16.5h.01M12 16.5h.01M15 16.5h.01"/></>,
  stock: <><path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5Z"/><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9"/></>,
  deposito: <><path d="M2.5 21V9l9.5-5.5L21.5 9v12"/><path d="M6 21v-8h12v8"/><path d="M6 16.5h12"/></>,
  whatsapp: <><path d="M4 20l1.2-3.6A8 8 0 1 1 8 19.2Z"/><path d="M9 9.5c.3 2 2.2 4.2 4.5 5l1.3-1.3-1.8-1-.7.6c-.9-.4-1.6-1.1-2-2l.6-.7-1-1.8Z"/></>,
  flecha: <path d="M5 12h14m-5-5 5 5-5 5"/>,
  descarga: <><path d="M12 4v11"/><path d="m7.5 10.5 4.5 4.5 4.5-4.5"/><path d="M4 19.5h16"/></>,
  mas: <path d="M12 5v14M5 12h14"/>,
  basura: <><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></>,
  camara: <><path d="M3 8h4l2-3h6l2 3h4v12H3Z"/><circle cx="12" cy="13.5" r="3.5"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3.5 6 8.5 7 8.5-7"/></>,
  telefono: <path d="M5 3.5h4l2 5-2.5 1.5a11 11 0 0 0 5.5 5.5L15.5 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5.5a2 2 0 0 1 2-2Z"/>,
  ubicacion: <><path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></>,
  enlace: <><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></>,
};
