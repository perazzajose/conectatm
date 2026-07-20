import { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const EMAILJS_PUBLIC_KEY = 'EBaQ7CHxo114SzA_-';
const EMAILJS_SERVICE_ID = 'service_u1td04m';
const EMAILJS_TEMPLATE_ID = 'template_th43thh';

const initialForm = { nombre: '', contacto: '', interes: '', mensaje: '', terminos: false };

export default function Contacto() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

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

  const btnLabel = { idle: 'Enviar mensaje', sending: 'Enviando...', sent: '¡Mensaje enviado!', error: 'Error al enviar' }[status];
  const btnStyle = status === 'sent' ? { background: 'var(--verde)' } : status === 'error' ? { background: '#e74c3c' } : {};

  return (
    <section id="contacto">
      <div className="section-inner">
        <div className="section-tag">Contacto</div>
        <h2>¿Hablamos?</h2>
        <p className="section-sub" style={{ marginBottom: 0 }}>Contame qué necesita tu negocio. Te respondo a la brevedad, sin compromiso.</p>
        <div className="contacto-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre *</label>
              <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required value={form.nombre} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="contacto">WhatsApp / Email *</label>
              <input type="text" id="contacto" name="contacto" placeholder="Tu contacto" required value={form.contacto} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="interes">¿Qué te interesa?</label>
              <select id="interes" name="interes" value={form.interes} onChange={handleChange}>
                <option value="">Seleccioná una opción</option>
                <option>Desarrollo web</option>
                <option>Auditoría digital gratis</option>
                <option>Red Conecta — soy emprendedor</option>
                <option>Red Conecta — soy estudiante</option>
                <option>Taller o charla</option>
                <option>Asesoría 1:1</option>
                <option>Otro</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="mensaje">Mensaje *</label>
              <textarea id="mensaje" name="mensaje" placeholder="Contame brevemente sobre tu negocio o consulta..." required value={form.mensaje} onChange={handleChange}></textarea>
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" id="terminos" name="terminos" required checked={form.terminos} onChange={handleChange} />
                Acepto la <Link to="/privacy" target="_blank">política de privacidad</Link> *
              </label>
            </div>
            <button type="submit" className="form-submit" style={btnStyle} disabled={status === 'sending'}>{btnLabel}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
