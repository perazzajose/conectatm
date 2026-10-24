import { useState } from 'react';

const CONSEJOS = {
  todos: {
    label: 'Para todos',
    items: [
      { t: 'Una página alcanza', d: 'Con mucha experiencia, dos como máximo. Quien lo lee le dedica menos de un minuto.' },
      { t: 'Lo más reciente primero', d: 'Ordená trabajos y estudios del último al primero.' },
      { t: 'Contá resultados, no solo tareas', d: '“Atendí unos 40 clientes por día” dice más que “atención al público”.' },
      { t: 'Usá las palabras del aviso', d: 'Si piden “caja” o “Excel”, que esas palabras estén en tu CV: los reclutadores (y el buscador de la bolsa de CVs) buscan por palabras clave.' },
      { t: 'Datos justos', d: 'Teléfono, email y ciudad alcanzan. No hace falta cédula, estado civil ni dirección completa.' },
      { t: 'Email serio y foto opcional', d: 'Un email con tu nombre. Si ponés foto: fondo liso, cara visible, sin filtros.' },
      { t: 'Revisalo antes de mandarlo', d: 'Una falta de ortografía resta. Pedile a alguien que lo lea en voz alta.' },
    ],
  },
  primer: {
    label: 'Primer empleo',
    items: [
      { t: 'Todo cuenta como experiencia', d: 'Changas, voluntariado, ayudar en el negocio familiar o proyectos del liceo. Cambiá el título de la sección a “Proyectos y voluntariado”.' },
      { t: 'Estudios en curso', d: 'Poné lo que estás cursando y el año en que pensás terminar.' },
      { t: 'Cursos cortos suman', d: 'INEFOP, UTU, cursos online: si te dieron constancia, ponelos.' },
      { t: 'Carnés y libreta', d: 'Carné de salud, manipulación de alimentos o libreta de conducir: si los tenés, anotalos.' },
      { t: 'Decí qué buscás', d: 'En el perfil, contá qué tipo de trabajo buscás y en qué horario podés.' },
    ],
  },
};

export default function Consejos() {
  const [tab, setTab] = useState('todos');

  return (
    <details className="cv-consejos">
      <summary>Consejos para armar tu CV</summary>
      <div className="cv-consejos-tabs" role="tablist" aria-label="Tipo de consejos">
        {Object.entries(CONSEJOS).map(([k, v]) => (
          <button key={k} type="button" role="tab" aria-selected={tab === k} className={`filtro-btn${tab === k ? ' active' : ''}`} onClick={() => setTab(k)}>
            {v.label}
          </button>
        ))}
      </div>
      <ul className="cv-consejos-lista" role="tabpanel">
        {CONSEJOS[tab].items.map(c => (
          <li key={c.t}><strong>{c.t}.</strong> {c.d}</li>
        ))}
      </ul>
    </details>
  );
}
