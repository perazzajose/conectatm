import { useMemo, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import SumateBanner from '../../components/SumateBanner';
import FaqItem from '../../components/FaqItem';
import Icon from '../../components/Icon';
import { faqTabs, faqGroups } from '../../data/faqData';
import '../../styles/listPage.css';
import './Faq.css';

export default function Faq() {
  const [tab, setTab] = useState('todos');
  const [openId, setOpenId] = useState(null);

  const grupos = useMemo(
    () => (tab === 'todos' ? faqGroups : faqGroups.filter(g => g.grupo === tab)),
    [tab],
  );

  const toggle = (id) => setOpenId(prev => (prev === id ? null : id));

  return (
    <>
      <PageHeader
        fondo="/fondos/preguntas.webp"
        title="Preguntas frecuentes"
        subtitle="Sobre las herramientas, la Red Conecta, los servicios de desarrollo y los talleres."
      />
      <div className="filtros-wrap">
        <div className="filtros-scroll" role="group" aria-label="Filtrar preguntas">
          {faqTabs.map(t => (
            <button key={t.value} className={`filtro-btn${tab === t.value ? ' active' : ''}`} aria-pressed={tab === t.value} onClick={() => setTab(t.value)}>
              {t.icon && <Icon size="18">{t.icon}</Icon>} {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="faq-wrap">
        {grupos.map(g => (
          <section className="faq-grupo" key={g.grupo} aria-labelledby={`grupo-${g.grupo}`}>
            <h2 id={`grupo-${g.grupo}`} className="grupo-titulo">{g.grupoLabel}</h2>
            <div className="faq-list">
              {g.items.map((item, i) => {
                const id = `${g.grupo}-${i}`;
                return (
                  <FaqItem key={id} question={item.q} answer={item.a} html open={openId === id} onToggle={() => toggle(id)} />
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <SumateBanner
        title="¿No encontraste tu respuesta?"
        text="Escribime y te respondo, normalmente el mismo día."
        buttonLabel="Preguntar por WhatsApp"
        mensaje="Hola José, tengo una pregunta"
      />
    </>
  );
}
