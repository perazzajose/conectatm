import { useLayoutEffect, useRef } from 'react';

// Texto editable en el lugar (portado de EditableText de uy-resume-pro).
// En una línea, un <span> invisible empuja el ancho del input para que el texto no se corte.
// Si queda vacío, lleva la clase `vacio` y no se imprime.
export default function Editable({ value, onChange, placeholder, multiline, className = '', label, style }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (multiline && ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [value, multiline]);

  const cls = `editable ${value ? '' : 'vacio'} ${className}`;
  const comunes = {
    value: value || '',
    onChange: e => onChange(e.target.value),
    placeholder,
    'aria-label': label || placeholder,
    spellCheck: true,
    style,
  };

  // Chrome imprime el texto de los textarea aparte del resto, y en el PDF queda desordenado
  // (los ATS leen la educación lejos de su título). Al imprimir se usa una copia en texto plano.
  if (multiline) {
    return (
      <>
        <textarea ref={ref} rows={1} className={`${cls} editable-multi`} {...comunes} />
        <div className={`${cls} editable-impreso`} aria-hidden="true">{value}</div>
      </>
    );
  }

  return (
    <span className={`editable-wrap ${cls}`}>
      <span className="editable-medida" aria-hidden="true">{value || placeholder || ' '}</span>
      <input type="text" className="editable-input" {...comunes} />
    </span>
  );
}
