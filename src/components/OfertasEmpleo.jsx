import { useEffect, useState } from 'react';
import { supabase, supabaseConfigurado } from '../lib/supabase';
import { DEPARTAMENTOS, enlacesPortales } from '../data/departamentos';
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
export default function OfertasEmpleo({ titulo = 'Ofertas de trabajo en tu departamento' }) {
  const [depto, setDepto] = useState(leerDepto);
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
    ? new Date(ofertas[0].actualizado).toLocaleDateString('es-UY', { weekday: 'long', day: 'numeric', month: 'long' })
    : null;

  return (
    <div className="ofertas">
      <h2>{titulo}</h2>
      <p className="section-sub">Las más recientes de LinkedIn, Computrabajo y BuscoJobs. Se actualizan todos los lunes.</p>

      <div className="campo ofertas-selector">
        <label htmlFor="ofertas-depto">¿Dónde buscás trabajo?</label>
        <select id="ofertas-depto" value={depto} onChange={elegir}>
          <option value="">Elegí tu departamento</option>
          <optgroup label="Donde trabaja ConectaTuMundo">
            {DEPARTAMENTOS.slice(0, 3).map(x => <option key={x.id} value={x.id}>{x.nombre}</option>)}
          </optgroup>
          <optgroup label="Resto del país">
            {DEPARTAMENTOS.slice(3).map(x => <option key={x.id} value={x.id}>{x.nombre}</option>)}
          </optgroup>
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
                    <h3>{o.titulo}</h3>
                    <p>{[o.empresa, o.ubicacion].filter(Boolean).join(', ')}</p>
                    <p className="oferta-meta">
                      <span className={`oferta-portal portal-${o.portal.toLowerCase()}`}>{o.portal}</span>
                      {tiempoDesde(o.publicado_aprox) && <span>Publicada {tiempoDesde(o.publicado_aprox)}</span>}
                    </p>
                  </div>
                  <a className="btn btn-outline oferta-ver" href={o.enlace} target="_blank" rel="noopener noreferrer">
                    Ver en {o.portal}<span className="visually-hidden">: {o.titulo}</span>
                  </a>
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
          {actualizado && <p className="ofertas-fuente">Actualizado el {actualizado}. Fuente: Google Empleos. Las ofertas son de cada portal; ConectaTuMundo no las publica ni las verifica.</p>}
        </div>
      )}
    </div>
  );
}
