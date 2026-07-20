import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Icon from '../../components/Icon';
import AccordionFaqItem from './AccordionFaqItem';
import { faqTabs, faqGroups } from '../../data/faqData';
import '../../styles/listPage.css';
import './Faq.css';

export default function Faq() {
  const [tab, setTab] = useState('todos');
  const [openId, setOpenId] = useState(null);
  const navigate = useNavigate();

  const grupos = useMemo(
    () => (tab === 'todos' ? faqGroups : faqGroups.filter(g => g.grupo === tab)),
    [tab],
  );

  const toggle = (id) => setOpenId(prev => (prev === id ? null : id));

  return (
    <>
      <PageHeader
        tag="Ayuda"
        title={<>Preguntas<br /><em>frecuentes</em></>}
        subtitle="Todo lo que necesitás saber sobre nuestros servicios, la Red Conecta y los talleres."
      />
      <div className="filtros-wrap">
        <div className="filtros-scroll">
          {faqTabs.map(t => (
            <button key={t.value} className={`tab-btn${tab === t.value ? ' active' : ''}`} onClick={() => setTab(t.value)}>
              {t.icon && <Icon size="16">{t.icon}</Icon>} {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="faq-wrap">
        {grupos.map(g => (
          <div className="faq-grupo" key={g.grupo}>
            <div className="grupo-titulo"><Icon size="22">{g.icon}</Icon> {g.grupoLabel}</div>
            {g.items.map((item, i) => {
              const id = `${g.grupo}-${i}`;
              return (
                <AccordionFaqItem
                  key={id}
                  question={item.q}
                  answer={item.a}
                  open={openId === id}
                  onToggle={() => toggle(id)}
                />
              );
            })}
          </div>
        ))}

        <div className="faq-cta">
          <h3>¿No encontraste tu respuesta?</h3>
          <p>Escribinos por WhatsApp o dejanos tu consulta. Te respondemos en el día.</p>
          <button className="cta-btn" onClick={() => navigate('/#contacto')}>Escribinos →</button>
        </div>
      </div>
    </>
  );
}
