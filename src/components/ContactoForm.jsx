import { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Icon, { icons } from './Icon';
import { WHATSAPP_VISIBLE, waLink } from '../data/contacto';

const EMAILJS_PUBLIC_KEY = 'EBaQ7CHxo114SzA_-';
const EMAILJS_SERVICE_ID = 'service_u1td04m';
const EMAILJS_TEMPLATE_ID = 'template_th43thh';

const OPCIONES_INTERES = [
  'Quiero un sitio web para mi negocio',
  'Quiero un sistema a medida (stock, ventas, turnos…)',
  'Quiero que revisen mi presencia digital (gratis)',
  'Tengo un problema con mi computadora o red',
  'Red Conecta: soy emprendedor',
  'Red Conecta: soy estudiante',
  'Quiero un taller para mi institución',
  'Otra consulta',
];

const initialForm = { nombre: '', contacto: '', interes: '', mensaje: '', terminos: false };

// Formulario de contacto (EmailJS) + atajo a WhatsApp. `interesInicial` preselecciona el motivo
// según la página desde donde se abre.
export default function ContactoForm({ interesInicial = '', titulo = '¿Hablamos?', bajada }) {
  const [form, setForm] = useState({ ...initialForm, interes: interesInicial });
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
      setForm({ ...initialForm, interes: interesInicial });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contacto" className="contacto">
      <div className="section-inner contacto-layout">
        <div>
          <h2>{titulo}</h2>
          <p className="section-sub">
            {bajada || 'Del otro lado no hay un bot: te respondo yo, José, normalmente el mismo día.'}
          </p>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp contacto-wa">
            <Icon size="22">{icons.whatsapp}</Icon> WhatsApp {WHATSAPP_VISIBLE}
          </a>
        </div>

        <form onSubmit={handleSubmit} className="contacto-form">
          <div className="campo">
            <label htmlFor="nombre">Tu nombre</label>
            <input type="text" id="nombre" name="nombre" autoComplete="name" required value={form.nombre} onChange={handleChange} />
          </div>
          <div className="campo">
            <label htmlFor="contacto-medio">WhatsApp o email para responderte</label>
            <input type="text" id="contacto-medio" name="contacto" autoComplete="email" required value={form.contacto} onChange={handleChange} />
          </div>
          <div className="campo">
            <label htmlFor="interes">¿Sobre qué es?</label>
            <select id="interes" name="interes" value={form.interes} onChange={handleChange}>
              <option value="">Elegí una opción</option>
              {OPCIONES_INTERES.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="campo">
            <label htmlFor="mensaje">Contame qué necesitás</label>
            <textarea id="mensaje" name="mensaje" required value={form.mensaje} onChange={handleChange}
              placeholder="Con lo básico alcanza, después lo charlamos." />
          </div>
          <label className="campo-check">
            <input type="checkbox" name="terminos" required checked={form.terminos} onChange={handleChange} />
            <span>Leí la <Link to="/privacy" target="_blank">política de privacidad</Link></span>
          </label>
          <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Enviando…' : 'Enviar consulta'}
          </button>
          <p className={`form-estado ${status}`} role="status">
            {status === 'sent' && 'Consulta enviada. Te respondo a la brevedad.'}
            {status === 'error' && 'No se pudo enviar. Revisá tu conexión o escribime por WhatsApp.'}
          </p>
        </form>
      </div>
    </section>
  );
}
