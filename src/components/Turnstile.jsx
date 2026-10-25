import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { TURNSTILE_SITE_KEY } from '../lib/turnstile';

// "No soy un robot" de Cloudflare Turnstile. Gratis y casi siempre invisible para la persona.
// La clave pública sale de src/lib/turnstile.js; la secreta está en la Edge Function que verifica el token.
const SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

let cargando;
function cargarScript() {
  if (window.turnstile) return Promise.resolve();
  cargando ??= new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = SCRIPT;
    s.async = true;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return cargando;
}

// onToken recibe el token cuando la verificación pasa ('' si vence). ref.reset() pide uno nuevo
// (cada token sirve una sola vez: hay que pedir otro después de un envío fallido).
const Turnstile = forwardRef(function Turnstile({ onToken }, ref) {
  const caja = useRef(null);
  const widget = useRef(null);
  const avisar = useRef(onToken);
  avisar.current = onToken;

  useImperativeHandle(ref, () => ({
    reset: () => { if (widget.current != null) { window.turnstile.reset(widget.current); avisar.current(''); } },
  }));

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    let cancelado = false;
    cargarScript().then(() => {
      if (cancelado || !caja.current) return;
      widget.current = window.turnstile.render(caja.current, {
        sitekey: TURNSTILE_SITE_KEY,
        language: 'es',
        callback: t => avisar.current(t),
        'expired-callback': () => avisar.current(''),
        'error-callback': () => avisar.current(''),
      });
    }).catch(() => avisar.current(''));
    return () => {
      cancelado = true;
      if (widget.current != null) window.turnstile?.remove(widget.current);
    };
  }, []);

  if (!TURNSTILE_SITE_KEY) return null;
  return <div ref={caja} className="turnstile" />;
});

export default Turnstile;
