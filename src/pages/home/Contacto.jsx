import { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const EMAILJS_PUBLIC_KEY = 'EBaQ7CHxo114SzA_-';
const EMAILJS_SERVICE_ID = 'service_u1td04m';
const EMAILJS_TEMPLATE_ID = 'template_th43thh';

const initialForm = { nombre: '', contacto: '', interes: '', mensaje: '', terminos: false };

export default function Contacto() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        nombre: form.nombre,
        contacto: form.contacto,
        interes: form.interes,
        mensaje: form.mensaje,
        time: new Date().toLocaleString('es-UY'),
      }, { publicKey: EMAILJS_PUBLIC_KEY });
      setStatus('sent');
      setForm(initialForm);
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const btnLabel = {
    idle: 'Mandá tu consulta',
    sending: 'Enviando...',
    sent: '¡Listo! Te respondo pronto 👋',
    error: 'Algo falló, intentá de nuevo'
  }[status];
  const btnStyle = status === 'sent' ? { background: 'var(--verde)' } : status === 'error' ? { background: '#e74c3c' } : {};

  return (
    <section id="contacto">
      <div className="section-inner">
        <div className="section-tag">Contacto</div>
        <h2>¿Hablamos?</h2>
        <p className="section-sub" style={{ marginBottom: '1rem' }}>
          No hay bot del otro lado. Te respondo yo, José, generalmente el mismo día.
        </p>
        <a
          href="https://wa.me/59897154271?text=Hola%20Jos%C3%A9%2C%20vi%20tu%20sitio%20y%20quiero%20consultar%20algo"
          target="_blank"
          rel="noopener noreferrer"
          className="contacto-whatsapp"
        >
          <span>📱</span>
          <div>
            <strong>¿Preferís hablar por WhatsApp?</strong>
            <span>Escribime directo al 097 154 271</span>
          </div>
        </a>
        <div className="contacto-form">
          <p className="contacto-form-title">O completá el formulario:</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">¿Cómo te llamás? *</label>
              <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required value={form.nombre} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="contacto">¿Cómo te contacto? *</label>
              <input type="text" id="contacto" name="contacto" placeholder="Tu WhatsApp o email" required value={form.contacto} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="interes">¿En qué te puedo ayudar?</label>
              <select id="interes" name="interes" value={form.interes} onChange={handleChange}>
                <option value="">Elejí una opción</option>
                <option>Quiero un sitio web para mi negocio</option>
                <option>Quiero que revisen mi presencia digital (gratis)</option>
                <option>Tengo un problema con mi computadora o red</option>
                <option>Red Conecta — soy emprendedor</option>
                <option>Red Conecta — soy estudiante</option>
                <option>Quiero un taller para mi institución</option>
                <option>Quiero una sesión de consulta</option>
                <option>Otra consulta</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="mensaje">Contáme un poco más *</label>
              <textarea
                id="mensaje"
                name="mensaje"
                placeholder="¿En qué andás? No hace falta que sea largo, con que me cuentes lo básico alcanzo para ayudarte..."
                required
                value={form.mensaje}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" id="terminos" name="terminos" required checked={form.terminos} onChange={handleChange} />
                Leí la <Link to="/privacy" target="_blank">política de privacidad</Link> *
              </label>
            </div>
            <button type="submit" className="form-submit" style={btnStyle} disabled={status === 'sending'}>
              {btnLabel}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
