import { useMemo, useState } from 'react';
import { PREGUNTAS, recomendar } from './recomendar';
import './PosRecomendador.css';

export default function PosRecomendador() {
  const [resp, setResp] = useState({ medios: [] });

  const elegir = (pregunta, value) => {
    setResp(r => {
      if (!pregunta.multiple) return { ...r, [pregunta.id]: value };
      const actual = r[pregunta.id] || [];
      return { ...r, [pregunta.id]: actual.includes(value) ? actual.filter(v => v !== value) : [...actual, value] };
    });
  };

  const completo = resp.medios.length > 0 && PREGUNTAS.every(q => q.multiple || resp[q.id]);
  const resultado = useMemo(() => (completo ? recomendar(resp) : null), [completo, resp]);
  const nombres = lista => lista.map(p => p.nombre).join(', ');

  return (
    <div className="recomendador">
      <div className="reco-preguntas">
        {PREGUNTAS.map(q => (
          <fieldset key={q.id} className="reco-pregunta">
            <legend>{q.titulo}</legend>
            {q.ayuda && <p className="reco-ayuda">{q.ayuda}</p>}
            <div className="reco-opciones">
              {q.opciones.map(o => {
                const marcada = q.multiple ? (resp[q.id] || []).includes(o.value) : resp[q.id] === o.value;
                return (
                  <label key={o.value} className={`reco-opcion${marcada ? ' marcada' : ''}`}>
                    <input
                      type={q.multiple ? 'checkbox' : 'radio'}
                      name={q.id}
                      checked={marcada}
                      onChange={() => elegir(q, o.value)}
                    />
                    {o.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="reco-resultado" aria-live="polite">
        {!resultado && <p className="reco-espera">Respondé las cuatro preguntas y te muestro cuáles encajan con tu negocio.</p>}

        {resultado && resultado.destacados.length === 0 && !resultado.empate && (
          <p className="reco-espera">Ningún proveedor de la lista tiene confirmados todos esos medios de pago a la vez. Probá desmarcando uno.</p>
        )}

        {resultado?.empate && (
          <>
            <h3>Todos encajan igual</h3>
            <p>Con lo que contestaste, ninguno se diferencia de los demás: {nombres(resultado.tambien)}.</p>
            <p className="reco-nota">Lo que los va a diferenciar es la comisión y el plazo de pago. Pedí cotización a dos o tres y compará con estos datos en la mano.</p>
          </>
        )}

        {resultado?.destacados.length > 0 && (
          <>
            <h3>{resultado.destacados.length === 1 ? 'Te conviene' : 'Te convienen'}</h3>
            <ol className="reco-lista">
              {resultado.destacados.map(({ p, motivos, pendientes }) => (
                <li key={p.id} style={{ '--marca': p.color }}>
                  <div className="reco-nombre">
                    <strong>{p.nombre}</strong>
                    <span>{p.tipo}</span>
                  </div>
                  <ul>{motivos.map(m => <li key={m}>{m}</li>)}</ul>
                  {pendientes.length > 0 && <p className="reco-pendiente">Preguntales {pendientes.join(' y ')}.</p>}
                  {p.web && <a className="link" href={p.web} target="_blank" rel="noopener noreferrer">Ir al sitio de {p.nombre}</a>}
                </li>
              ))}
            </ol>
            {resultado.tambien.length > 0 && (
              <p className="reco-tambien">También aceptan esos medios de pago: {nombres(resultado.tambien)}.</p>
            )}
            <p className="reco-nota">Es una orientación con datos públicos revisados a mano. Las comisiones casi nunca se publican: pedí la cotización antes de firmar.</p>
          </>
        )}
      </div>
    </div>
  );
}
