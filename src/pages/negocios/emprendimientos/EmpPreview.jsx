import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon, { icons } from '../../../components/Icon';

// Redes que se reconocen por dominio, para nombrar bien cada botón
const REDES = [
  { patron: /instagram\.com/i, nombre: 'Instagram' },
  { patron: /facebook\.com|fb\.com/i, nombre: 'Facebook' },
  { patron: /tiktok\.com/i, nombre: 'TikTok' },
  { patron: /wa\.me|whatsapp\.com/i, nombre: 'WhatsApp' },
  { patron: /linkedin\.com/i, nombre: 'LinkedIn' },
  { patron: /(twitter|x)\.com/i, nombre: 'X' },
  { patron: /youtube\.com|youtu\.be/i, nombre: 'YouTube' },
];
const nombreRed = url => REDES.find(r => r.patron.test(url))?.nombre ?? 'Red social';
// Las redes no se dejan mostrar dentro de otra página: para esas va la portada en lugar del sitio
const esRed = url => REDES.some(r => r.patron.test(url));

export default function EmpPreview({ emp, onClose }) {
  const ref = useRef(null);
  const [cargado, setCargado] = useState(false);

  // Abrir como modal (con foco atrapado y fondo inerte) y bloquear el scroll de la página
  useEffect(() => {
    const dialogo = ref.current;
    dialogo.showModal();
    document.body.style.overflow = 'hidden';
    document.documentElement.classList.add('con-modal');
    return () => {
      document.body.style.overflow = '';
      document.documentElement.classList.remove('con-modal');
    };
  }, []);

  const sitio = emp.sitio?.startsWith('https://') ? emp.sitio : null;
  const mostrarSitio = sitio && !esRed(sitio);
  const redes = [...new Set([...(emp.redes || []), ...(sitio && esRed(sitio) ? [sitio] : [])])]
    .filter(u => u.startsWith('https://'));
  const ubicacion = (emp.datos || []).join(', ');

  // Se monta fuera de #root: así el desenfoque de la página (clase con-modal) no la alcanza
  return createPortal(
    <dialog
      ref={ref}
      className="preview"
      aria-labelledby="preview-titulo"
      onClose={onClose}
      // Click en el fondo borroso (fuera de la ventana) cierra
      onClick={e => { if (e.target === ref.current) ref.current.close(); }}
    >
      <div className="preview-caja">
        <header className="preview-cabecera">
          <div className="emp-logo preview-logo" style={{ background: emp.logoColor || 'var(--tinta)' }}>
            {emp.imagenUrl ? <img src={emp.imagenUrl} alt="" /> : (emp.logo || <Icon size="22">{icons.emprendimientos}</Icon>)}
          </div>
          <div className="preview-titulos">
            <h2 id="preview-titulo">{emp.nombre}</h2>
            <p>{[emp.rubro, ubicacion].filter(Boolean).join(', ')}</p>
          </div>
          <button type="button" className="preview-cerrar" onClick={() => ref.current.close()} aria-label="Cerrar vista previa">
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className="preview-cuerpo">
          {mostrarSitio ? (
            <div className="preview-navegador">
              <div className="preview-barra" aria-hidden="true">
                <span className="preview-puntos"><i /><i /><i /></span>
                <span className="preview-url">{emp.nombre}</span>
              </div>
              <div className="preview-marco">
                {!cargado && <p className="preview-cargando">Cargando vista previa…</p>}
                <iframe
                  src={sitio}
                  title={`Vista previa del sitio de ${emp.nombre}`}
                  onLoad={() => setCargado(true)}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>
          ) : (
            <div className="preview-ficha">
              {emp.portadaUrl && <img src={emp.portadaUrl} alt="" className="preview-portada" />}
              {emp.desc && <p>{emp.desc}</p>}
              {(emp.servicios || []).length > 0 && (
                <ul className="emp-servicios">{emp.servicios.map((s, i) => <li key={i}>{s}</li>)}</ul>
              )}
            </div>
          )}
        </div>

        <footer className="preview-acciones">
          {mostrarSitio && <p className="preview-nota">Es una vista previa. Para usar el sitio completo, abrilo en una pestaña nueva.</p>}
          <div className="preview-botones">
            {sitio && !esRed(sitio) && (
              <a className="btn btn-primary" href={sitio} target="_blank" rel="noopener noreferrer">
                Visitar sitio web
              </a>
            )}
            {redes.map(url => (
              <a key={url} className="btn btn-outline" href={url} target="_blank" rel="noopener noreferrer">
                {nombreRed(url)}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </dialog>,
    document.body,
  );
}
