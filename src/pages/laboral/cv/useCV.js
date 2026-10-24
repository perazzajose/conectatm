import { useEffect, useState } from 'react';

// Estado del CV, guardado solo en el navegador de la persona (localStorage).
// Portado de uy-resume-pro (zustand + persist) a un hook sin dependencias.
const KEY = 'ctm-cv-v1';

export const CV_VACIO = {
  nombre: '',
  cargo: '',
  email: '',
  telefono: '',
  ubicacion: '',
  web: '',
  foto: null,
  perfil: '',
  color: '#2F5B3A',
  titulos: {
    contacto: 'Contacto',
    educacion: 'Educación',
    cursos: 'Cursos',
    idiomas: 'Idiomas',
    habilidades: 'Habilidades',
    perfil: 'Perfil',
    experiencia: 'Experiencia',
  },
  experiencia: [],
  educacion: [],
  cursos: [],
  habilidades: [],
  idiomas: [],
};

const nuevoId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

const leer = () => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return CV_VACIO;
    const guardado = JSON.parse(raw);
    return { ...CV_VACIO, ...guardado, titulos: { ...CV_VACIO.titulos, ...guardado.titulos } };
  } catch {
    return CV_VACIO;
  }
};

export default function useCV() {
  const [data, setData] = useState(leer);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {
      // Sin espacio o almacenamiento bloqueado (modo privado): el editor sigue funcionando en memoria.
    }
  }, [data]);

  const mapLista = (seccion, fn) => setData(d => ({ ...d, [seccion]: fn(d[seccion]) }));
  const mapItem = (seccion, id, fn) => mapLista(seccion, l => l.map(i => (i.id === id ? fn(i) : i)));

  return {
    data,
    set: (campo, valor) => setData(d => ({ ...d, [campo]: valor })),
    setTitulo: (seccion, valor) => setData(d => ({ ...d, titulos: { ...d.titulos, [seccion]: valor } })),
    agregar: (seccion) => mapLista(seccion, l => [...l, seccion === 'idiomas'
      ? { id: nuevoId(), nombre: '', nivel: 3, nivelTexto: 'Intermedio' }
      : { id: nuevoId(), titulo: '', subtitulo: '', fecha: '', tareas: seccion === 'experiencia' ? [''] : [] }]),
    quitar: (seccion, id) => mapLista(seccion, l => l.filter(i => i.id !== id)),
    editar: (seccion, id, cambios) => mapItem(seccion, id, i => ({ ...i, ...cambios })),
    agregarTarea: (id) => mapItem('experiencia', id, i => ({ ...i, tareas: [...i.tareas, ''] })),
    quitarTarea: (id, n) => mapItem('experiencia', id, i => ({ ...i, tareas: i.tareas.filter((_, k) => k !== n) })),
    editarTarea: (id, n, valor) => mapItem('experiencia', id, i => ({ ...i, tareas: i.tareas.map((t, k) => (k === n ? valor : t)) })),
    agregarHabilidad: () => mapLista('habilidades', l => [...l, '']),
    quitarHabilidad: (n) => mapLista('habilidades', l => l.filter((_, k) => k !== n)),
    editarHabilidad: (n, valor) => mapLista('habilidades', l => l.map((h, k) => (k === n ? valor : h))),
    reiniciar: () => setData(CV_VACIO),
    cargar: (nuevo) => setData(nuevo),
  };
}
