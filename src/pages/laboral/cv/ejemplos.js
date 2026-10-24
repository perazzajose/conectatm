import { CV_VACIO } from './useCV';

// CVs de ejemplo para arrancar. Personas inventadas; los datos de contacto son de ejemplo.
export const EJEMPLOS = [
  {
    id: 'con-experiencia',
    titulo: 'Con experiencia',
    desc: 'Para quien ya trabajó y quiere mostrar lo que hizo.',
    data: {
      ...CV_VACIO,
      nombre: 'Lucía Fernández',
      cargo: 'Atención al cliente y ventas',
      email: 'lucia.fernandez@ejemplo.com',
      telefono: '099 000 000',
      ubicacion: 'Durazno',
      perfil: 'Vendedora con 5 años de experiencia en comercio. Me gusta el trato con la gente y resolver problemas rápido. Busco un puesto en atención al cliente o ventas, de lunes a sábado.',
      color: '#245E9E',
      experiencia: [
        {
          id: 'e1', titulo: 'Tienda de ropa del centro', subtitulo: 'Vendedora', fecha: '2021 – actualidad',
          tareas: [
            'Atención de unos 40 clientes por día en mostrador y por WhatsApp.',
            'Manejo de caja, cobros con POS y cierre diario.',
            'Armado de vidriera y control de stock de temporada.',
          ],
        },
        {
          id: 'e2', titulo: 'Supermercado de barrio', subtitulo: 'Cajera', fecha: '2019 – 2021',
          tareas: [
            'Cobro en caja y atención de reclamos.',
            'Reposición de góndolas y control de vencimientos.',
          ],
        },
      ],
      educacion: [
        { id: 'ed1', titulo: 'Bachillerato completo', subtitulo: 'Liceo público, Durazno', fecha: '2013 – 2018', tareas: [] },
      ],
      cursos: [
        { id: 'c1', titulo: 'Atención al cliente', subtitulo: 'Curso presencial, 2022', fecha: '', tareas: [] },
        { id: 'c2', titulo: 'Excel básico', subtitulo: 'Curso online, 2020', fecha: '', tareas: [] },
      ],
      idiomas: [
        { id: 'i1', nombre: 'Español', nivel: 5, nivelTexto: 'Nativo' },
        { id: 'i2', nombre: 'Inglés', nivel: 2, nivelTexto: 'Básico' },
      ],
      habilidades: ['Caja y cobros', 'Excel', 'Ventas por WhatsApp', 'Trabajo en equipo'],
    },
  },
  {
    id: 'sin-experiencia',
    titulo: 'Primer empleo',
    desc: 'Para estudiantes o quien busca su primer trabajo.',
    data: {
      ...CV_VACIO,
      nombre: 'Matías Pereira',
      cargo: 'Estudiante, busco mi primer empleo',
      email: 'matias.pereira@ejemplo.com',
      telefono: '098 000 000',
      ubicacion: 'Rocha',
      perfil: 'Estudiante de bachillerato tecnológico en informática. Responsable y con ganas de aprender. Busco trabajo de medio horario, de tarde, en comercio o atención al público.',
      color: '#2F5B3A',
      titulos: { ...CV_VACIO.titulos, experiencia: 'Proyectos y voluntariado' },
      experiencia: [
        {
          id: 'e1', titulo: 'Club deportivo del barrio', subtitulo: 'Voluntario en la cantina', fecha: '2023 – 2024',
          tareas: [
            'Atención y cobro en la cantina los fines de semana.',
            'Organización de rifas para juntar fondos para el club.',
          ],
        },
        {
          id: 'e2', titulo: 'Proyecto del curso', subtitulo: 'Página web para un comercio', fecha: '2024',
          tareas: ['Armé con dos compañeros la página web de una panadería de la zona.'],
        },
      ],
      educacion: [
        { id: 'ed1', titulo: 'Bachillerato tecnológico en Informática', subtitulo: 'UTU, Rocha (cursando)', fecha: '2023 – 2025', tareas: [] },
      ],
      cursos: [
        { id: 'c1', titulo: 'Manipulación de alimentos', subtitulo: 'Carné vigente', fecha: '', tareas: [] },
      ],
      idiomas: [
        { id: 'i1', nombre: 'Español', nivel: 5, nivelTexto: 'Nativo' },
        { id: 'i2', nombre: 'Inglés', nivel: 3, nivelTexto: 'Intermedio' },
      ],
      habilidades: ['Computación', 'Redes sociales', 'Puntualidad', 'Atención al público'],
    },
  },
];
