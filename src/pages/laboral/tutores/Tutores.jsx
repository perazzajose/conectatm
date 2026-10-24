import { useMemo, useState } from 'react';
import useFirestoreCollection from '../../../hooks/useFirestoreCollection';
import PageHeader from '../../../components/PageHeader';
import FilterBar from '../../../components/FilterBar';
import SearchBox from '../../../components/SearchBox';
import SumateBanner from '../../../components/SumateBanner';
import { NoResults, Skeleton } from '../../../components/NoResults';
import TutorCard from './TutorCard';
import '../../../styles/listPage.css';
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

  const noResultsText = error
    ? 'No se pudieron cargar los profes. Revisá tu conexión y volvé a intentar.'
    : tutores.length
      ? 'Ningún profe coincide con esa búsqueda.<br>Probá con otra materia.'
      : 'Todavía no hay profes cargados.<br>Si das clases, sumate con el botón de abajo.';

  return (
    <>
      <PageHeader
        camino="laboral"
        pagina="Red Conecta"
        title="Profes particulares de la Red Conecta"
        subtitle="Estudiantes avanzados que dan clases a precio accesible, presenciales o por videollamada."
      >
        {!loading && tutores.length > 0 && <p className="header-dato">{tutores.length} profes en la red</p>}
      </PageHeader>
      <FilterBar filtros={filtros} active={filtro} onChange={setFiltro} />
      <SearchBox value={busqueda} onChange={setBusqueda} placeholder="Buscá por nombre o materia" />

      <div className="grid-wrap">
        {loading ? (
          <div className="perfiles-grid"><Skeleton count={3} /></div>
        ) : lista.length ? (
          <div className="perfiles-grid">
            {lista.map((t, i) => <TutorCard key={t.id} tutor={t} index={i} />)}
          </div>
        ) : (
          <NoResults text={noResultsText} />
        )}
      </div>

      <SumateBanner
        title="¿Estudiás y querés dar clases?"
        text="Sumate a la Red Conecta: ganás experiencia para tu CV y ayudás a gente de tu zona."
        buttonLabel="Quiero dar clases"
        mensaje="Hola José, quiero sumarme a la Red Conecta como profe"
      />
    </>
  );
}
