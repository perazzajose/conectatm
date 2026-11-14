import { icons } from '../components/Icon';

// Trabajos cortos, de pocos días: lo que un comercio puede pedir hoy sin encarar un proyecto grande.
// Se muestran en Servicios (/desarrollo#rapidos). No llevan precio fijo: se presupuestan en el día.
export const RAPIDOS = [
  {
    id: 'maps',
    icon: icons.ubicacion,
    titulo: 'Tu comercio en Google Maps',
    desc: 'Ficha con horario, fotos, teléfono y botón de WhatsApp, para que te encuentre quien busca desde el celular.',
    mensaje: 'Hola José, quiero que mi comercio aparezca bien en Google Maps',
  },
  {
    id: 'pagina',
    icon: icons.web,
    titulo: 'Página de una pantalla',
    desc: 'Qué vendés, dónde estás y un botón para escribirte. Sin vueltas y lista para compartir en tus redes.',
    mensaje: 'Hola José, quiero una página simple para mi comercio',
  },
  {
    id: 'reservas',
    icon: icons.whatsapp,
    titulo: 'Reservas y pedidos por WhatsApp',
    desc: 'Para hostels, posadas, cabañas y locales de comida: un botón que te manda la consulta ya armada, con fechas o pedido.',
    mensaje: 'Hola José, quiero recibir reservas o pedidos por WhatsApp',
  },
];
