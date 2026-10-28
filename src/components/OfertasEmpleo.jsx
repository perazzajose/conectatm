import { useEffect, useState } from 'react';
import { supabase, supabaseConfigurado } from '../lib/supabase';
import { DEPARTAMENTOS, enlacesPortales, limpiarUbicacion } from '../data/departamentos';
import './OfertasEmpleo.css';

const CLAVE_DEPTO = 'ctm-departamento';
const hace = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });

// "hace 3 días" calculado desde la fecha aproximada (el texto de Google es relativo al lunes en que se buscó)
function tiempoDesde(fecha) {
  if (!fecha) return null;
  const horas = Math.round((new Date(fecha) - Date.now()) / 3600_000);
  if (horas > -24) return hace.format(Math.min(horas, 0), 'hour');
  const dias = Math.round(horas / 24);
  return dias > -30 ? hace.format(dias, 'day') : 'hace más de un mes';
}

function leerDepto() {
  try { return localStorage.getItem(CLAVE_DEPTO) || ''; } catch { return ''; }
}

// Las 5 ofertas más recientes de LinkedIn, Computrabajo y BuscoJobs para el departamento elegido.
// Se actualizan los lunes (Edge Function `actualizar-ofertas`); acá solo se leen.
// `departamento` lo deja elegido de entrada (páginas por departamento); igual se puede cambiar.
export default function OfertasEmpleo({ titulo = 'Ofertas de trabajo en tu departamento', departamento }) {
  // Sin departamento guardado arranca en Durazno: si no, la sección quedaba vacía y parecía rota
  const [depto, setDepto] = useState(() => departamento || leerDepto() || DEPARTAMENTOS[0].id);
  const [ofertas, setOfertas] = useState([]);
  const [estado, setEstado] = useState('idle');

  useEffect(() => {
    if (!depto || !supabaseConfigurado) return;
    let cancelado = false;
    setEstado('cargando');
    supabase
      .from('ofertas_externas')
      .select('id, titulo, empresa, ubicacion, portal, publicado_aprox, enlace, actualizado')
      .eq('departamento', depto)
      .order('publicado_aprox', { ascending: false, nullsFirst: false })
      .limit(5)
      .then(({ data, error }) => {
        if (cancelado) return;
        setOfertas(data || []);
        setEstado(error ? 'error' : 'listo');
      });
    return () => { cancelado = true; };
  }, [depto]);

  const elegir = (e) => {
    setDepto(e.target.value);
    try { localStorage.setItem(CLAVE_DEPTO, e.target.value); } catch { /* sin almacenamiento: solo no se recuerda */ }
  };

  const d = DEPARTAMENTOS.find(x => x.id === depto);
  const actualizado = ofertas[0]?.actualizado
    ? new Date(ofertas[0].actualizado).toLocaleDateString('es-UY', { day: 'numeric', month: 'long' })
    : null;

  return (
    <div className="ofertas">
      <h2>{titulo}</h2>
      <p className="ofertas-aviso">
        <span aria-hidden="true" className="ofertas-aviso-punto" />
        {actualizado ? `Actualizadas el ${actualizado} · Se renuevan cada lunes` : 'Se actualizan todos los lunes'}
      </p>

      <div className="ofertas-elegir" role="group" aria-label="¿Dónde buscás trabajo?">
        {DEPARTAMENTOS.slice(0, 3).map(x => (
          <button key={x.id} type="button" className={`ofertas-zona${depto === x.id ? ' active' : ''}`} aria-pressed={depto === x.id}
            onClick={() => elegir({ target: { value: x.id } })}>{x.nombre}</button>
        ))}
        <label className="visually-hidden" htmlFor="ofertas-depto">Otro departamento</label>
        <select id="ofertas-depto" className={DEPARTAMENTOS.slice(3).some(x => x.id === depto) ? 'active' : ''}
          value={DEPARTAMENTOS.slice(3).some(x => x.id === depto) ? depto : ''} onChange={elegir}>
          <option value="">Otro departamento</option>
          {DEPARTAMENTOS.slice(3).map(x => <option key={x.id} value={x.id}>{x.nombre}</option>)}
        </select>
      </div>

      {d && (
        <div aria-live="polite">
          {supabaseConfigurado && estado === 'cargando' && <p className="ofertas-nota">Buscando ofertas…</p>}
          {supabaseConfigurado && estado === 'error' && <p className="ofertas-nota">No se pudieron cargar las ofertas. Probá con los enlaces de abajo.</p>}
          {supabaseConfigurado && estado === 'listo' && ofertas.length === 0 && (
            <p className="ofertas-nota">Esta semana no aparecieron ofertas de estos portales en {d.nombre}. Buscá directo en cada uno:</p>
          )}

          {ofertas.length > 0 && (
            <ol className="ofertas-lista">
              {ofertas.map(o => (
                <li key={o.id} className="oferta">
                  <div className="oferta-texto">
                    {/* El título es el enlace y cubre toda la oferta: se toca en cualquier parte */}
                    <h3><a className="oferta-link" href={o.enlace} target="_blank" rel="noopener noreferrer">{o.titulo}</a></h3>
                    <p>{[o.empresa, limpiarUbicacion(o.ubicacion)].filter(Boolean).join(', ')}</p>
                    <p className="oferta-meta">
                      <span className={`oferta-portal portal-${o.portal.toLowerCase()}`}>{o.portal}</span>
                      {tiempoDesde(o.publicado_aprox) && <span>Publicada {tiempoDesde(o.publicado_aprox)}</span>}
                      <span className="oferta-ver-movil" aria-hidden="true">Ver en {o.portal}</span>
                    </p>
                  </div>
                  <span className="btn btn-outline oferta-ver" aria-hidden="true">Ver en {o.portal}</span>
                </li>
              ))}
            </ol>
          )}

          <div className="ofertas-portales">
            <span>{ofertas.length > 0 ? 'Ver más en:' : 'Buscar en:'}</span>
            {enlacesPortales(d).map(p => (
              <a key={p.portal} className="link" href={p.url} target="_blank" rel="noopener noreferrer">{p.portal}</a>
            ))}
          </div>
          {ofertas.length > 0 && <p className="ofertas-fuente">Las ofertas son de cada portal; ConectaTuMundo no las publica ni las verifica.</p>}
        </div>
      )}
    </div>
  );
}
