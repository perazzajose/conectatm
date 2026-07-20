import { useMemo, useState } from 'react';
import useFirestoreCollection from '../../hooks/useFirestoreCollection';
import PageHeader from '../../components/PageHeader';
import FilterBar from '../../components/FilterBar';
import SearchBox from '../../components/SearchBox';
import SumateBanner from '../../components/SumateBanner';
import { NoResults, Skeleton } from '../../components/NoResults';
import TutorCard from './TutorCard';
import Icon, { icons } from '../../components/Icon';
import '../../styles/listPage.css';
import './Tutores.css';

const filtros = [
  { value: 'todos', label: 'Todos' },
  { value: 'matematica', label: 'Matemática' },
  { value: 'informatica', label: 'Informática' },
  { value: 'contabilidad', label: 'Contabilidad' },
  { value: 'lengua', label: 'Lengua' },
  { value: 'ingles', label: 'Inglés' },
  { value: 'fisica', label: 'Física' },
];

export default function Tutores() {
  const { data: tutores, loading, error } = useFirestoreCollection('tutores', 'nombre');
  const [filtro, setFiltro] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  const lista = useMemo(() => {
    let l = tutores;
    if (filtro !== 'todos') l = l.filter(t => (t.materias || []).join(' ').toLowerCase().includes(filtro));
    const q = busqueda.toLowerCase().trim();
    if (q) l = l.filter(t => t.nombre.toLowerCase().includes(q) || (t.materias || []).join(' ').toLowerCase().includes(q));
    return l;
  }, [tutores, filtro, busqueda]);

  const materiaCount = useMemo(() => {
    const set = new Set();
    tutores.forEach(t => (t.materias || []).forEach(m => set.add(m.toLowerCase())));
    return set.size;
  }, [tutores]);

  const noResultsText = error
    ? 'No pudimos cargar los tutores en este momento.'
    : tutores.length
      ? 'No encontramos tutores con ese filtro. <br>Probá con otra materia o término.'
      : 'Todavía no hay tutores cargados.<br>¡Volvé pronto!';

  return (
    <>
      <PageHeader
        tag="Red Conecta · Comunidad"
        title={<>Encontrá tu<br /><em>profe particular</em></>}
        subtitle="Estudiantes avanzados del interior que comparten lo que saben. Clases accesibles, trato cercano y horarios flexibles."
        stats={[
          <><span>{tutores.length}</span> tutores activos</>,
          <><span>{materiaCount}</span> materias disponibles</>,
          <><Icon size="20">{icons.sobre}</Icon> Durazno y alrededores</>,
        ]}
      />
      <FilterBar filtros={filtros} active={filtro} onChange={setFiltro} />
      <SearchBox value={busqueda} onChange={setBusqueda} placeholder="Buscá por nombre o materia..." />

      <div className="grid-wrap">
        {loading ? (
          <div className="perfiles-grid"><Skeleton count={3} /></div>
        ) : lista.length ? (
          <div className="perfiles-grid">
            {lista.map((t, i) => <TutorCard key={t.id} tutor={t} index={i} delay={i * 50} />)}
          </div>
        ) : (
          <NoResults text={noResultsText} />
        )}
      </div>

      <SumateBanner
        title="¿Sos estudiante y querés dar clases?"
        text="Sumate a la comunidad ConectaTuMundo. Compartí tu conocimiento, ganás experiencia y ayudás a tu comunidad."
        buttonLabel="Quiero ser tutor"
      />
    </>
  );
}
