import { useMemo, useState } from 'react';
import useFirestoreCollection from '../../../hooks/useFirestoreCollection';
import PageHeader from '../../../components/PageHeader';
import FilterBar from '../../../components/FilterBar';
import SearchBox from '../../../components/SearchBox';
import SumateBanner from '../../../components/SumateBanner';
import { NoResults, Skeleton } from '../../../components/NoResults';
import EmpCard from './EmpCard';
import EmpPreview from './EmpPreview';
import '../../../styles/listPage.css';
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
  const [preview, setPreview] = useState(null);

  const lista = useMemo(() => {
    let l = emps;
    if (filtro !== 'todos') l = l.filter(e => e.categoria === filtro);
    const q = busqueda.toLowerCase().trim();
    if (q) l = l.filter(e => `${e.nombre} ${e.rubro}`.toLowerCase().includes(q));
    return l;
  }, [emps, filtro, busqueda]);

  const catCount = useMemo(() => new Set(emps.map(e => e.categoria).filter(Boolean)).size, [emps]);

  const noResultsText = error
    ? 'No se pudieron cargar los emprendimientos. Revisá tu conexión y volvé a intentar.'
    : emps.length
      ? 'Ningún emprendimiento coincide con esa búsqueda.\nProbá con otro rubro.'
      : 'Todavía no hay emprendimientos cargados.\nSi tenés uno, sumalo con el botón de abajo.';

  return (
    <>
      <PageHeader
        camino="negocios"
        pagina="Emprendimientos"
        fondo="/fondos/emprendimientos.webp"
        title="Emprendimientos de la zona"
        subtitle="Negocios de Durazno, Rocha, Montevideo y alrededores que forman parte de la red. Comprales: son de acá."
      >
        {!loading && emps.length > 0 && <p className="header-dato">{emps.length} emprendimientos en {catCount} rubros</p>}
      </PageHeader>
      <FilterBar filtros={filtros} active={filtro} onChange={setFiltro} />
      <SearchBox value={busqueda} onChange={setBusqueda} placeholder="Buscá por nombre o rubro" />

      <div className="grid-wrap">
        {loading ? (
          <div className="emp-grid"><Skeleton count={3} /></div>
        ) : lista.length ? (
          <div className="emp-grid">
            {lista.map(e => <EmpCard key={e.id} emp={e} onPreview={setPreview} />)}
          </div>
        ) : (
          <NoResults text={noResultsText} />
        )}
      </div>

      {preview && <EmpPreview emp={preview} onClose={() => setPreview(null)} />}

      <SumateBanner
        title="¿Tenés un emprendimiento?"
        text="Sumalo a la vitrina. Si además necesitás sitio web, redes o un sistema, lo charlamos."
        buttonLabel="Sumar mi emprendimiento"
        mensaje="Hola José, quiero sumar mi emprendimiento a la vitrina de ConectaTuMundo"
      />
    </>
  );
}
