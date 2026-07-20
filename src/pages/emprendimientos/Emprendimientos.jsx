import { useMemo, useState } from 'react';
import useFirestoreCollection from '../../hooks/useFirestoreCollection';
import PageHeader from '../../components/PageHeader';
import FilterBar from '../../components/FilterBar';
import SearchBox from '../../components/SearchBox';
import SumateBanner from '../../components/SumateBanner';
import { NoResults, Skeleton } from '../../components/NoResults';
import EmpCard from './EmpCard';
import Icon, { icons } from '../../components/Icon';
import '../../styles/listPage.css';
import './Emprendimientos.css';

const filtros = [
  { value: 'todos', label: 'Todos' },
  { value: 'gastronomia', label: 'Gastronomía' },
  { value: 'comercio', label: 'Comercio' },
  { value: 'servicios', label: 'Servicios' },
  { value: 'artesanal', label: 'Artesanal' },
  { value: 'salud', label: 'Salud y bienestar' },
  { value: 'educacion', label: 'Educación' },
];

export default function Emprendimientos() {
  const { data: emps, loading, error } = useFirestoreCollection('emprendimientos', 'nombre');
  const [filtro, setFiltro] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  const lista = useMemo(() => {
    let l = emps;
    if (filtro !== 'todos') l = l.filter(e => e.categoria === filtro);
    const q = busqueda.toLowerCase().trim();
    if (q) l = l.filter(e => `${e.nombre} ${e.rubro}`.toLowerCase().includes(q));
    return l;
  }, [emps, filtro, busqueda]);

  const catCount = useMemo(() => new Set(emps.map(e => e.categoria).filter(Boolean)).size, [emps]);

  const noResultsText = error
    ? 'No pudimos cargar los emprendimientos en este momento.'
    : emps.length
      ? 'No encontramos emprendimientos con ese filtro.<br>Probá con otro término.'
      : 'Todavía no hay emprendimientos cargados.<br>¡Volvé pronto!';

  return (
    <>
      <PageHeader
        tag="Red Conecta · Emprendimientos"
        title={<>Negocios locales que<br /><em>confían en nosotros</em></>}
        subtitle="Emprendimientos de Durazno y la región que ya trabajan con ConectaTuMundo o forman parte de la red. Apoyalos, son de acá."
        gradient="linear-gradient(150deg,var(--tierra) 0%,var(--lila-light) 100%)"
        stats={[
          <><span>{emps.length}</span> emprendimientos</>,
          <><span>{catCount}</span> rubros distintos</>,
          <><Icon size="14">{icons.sobre}</Icon> Durazno y región</>,
        ]}
      />
      <FilterBar filtros={filtros} active={filtro} onChange={setFiltro} />
      <SearchBox value={busqueda} onChange={setBusqueda} placeholder="Buscá por nombre o rubro..." />

      <div className="grid-wrap">
        {loading ? (
          <div className="emp-grid"><Skeleton count={3} /></div>
        ) : lista.length ? (
          <div className="emp-grid">
            {lista.map((e, i) => <EmpCard key={e.id} emp={e} delay={i * 50} />)}
          </div>
        ) : (
          <NoResults text={noResultsText} />
        )}
      </div>

      <SumateBanner
        title="¿Tenés un emprendimiento?"
        text="Sumate a la red ConectaTuMundo y aparecé en esta vitrina. Te ayudamos a crecer con servicios digitales y conexiones reales."
        buttonLabel="Quiero sumarme"
      />
    </>
  );
}
