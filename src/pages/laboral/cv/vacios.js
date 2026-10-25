// Reglas para ocultar en el PDF lo que quedó sin completar (clase `vacio` en CvEditor.css)
// y para avisar qué falta antes de descargar (modo paso a paso).
export const lleno = v => Boolean(v && String(v).trim());
export const itemLleno = it => [it.titulo, it.subtitulo, it.fecha, ...(it.tareas || [])].some(lleno);
export const vacio = condicion => (condicion ? '' : ' vacio');

export const emailValido = e => !lleno(e) || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim());

// Lo que conviene completar antes de descargar
export function faltantes(d) {
  const f = [];
  if (!lleno(d.nombre)) f.push('tu nombre');
  if (!lleno(d.telefono) && !lleno(d.email)) f.push('un teléfono o un email');
  if (!emailValido(d.email)) f.push('revisar el email');
  if (!lleno(d.perfil)) f.push('unas líneas sobre vos');
  if (!d.experiencia.some(itemLleno) && !d.educacion.some(itemLleno)) f.push('experiencia o estudios');
  return f;
}
