// Las URLs que vienen de Firestore (imágenes, sitios) se usan solo si son https y no traen
// caracteres raros. Si no, se ignoran: así una carga maliciosa no mete un javascript: o una imagen por http.
export const urlSegura = u => (typeof u === 'string' && /^https:\/\/[^\s"'<>`]+$/.test(u) ? u : null);
