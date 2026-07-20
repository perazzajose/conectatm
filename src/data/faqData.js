import { icons } from '../components/Icon';

// Mismo contenido que estaba embebido como HTML en el <script> de faq_conectatumundo.html,
// ahora como datos estructurados que el componente FaqPage renderiza.
export const faqTabs = [
  { value: 'todos', label: 'Todos', icon: null },
  { value: 'general', label: 'General', icon: icons.globo },
  { value: 'emprendimiento', label: 'Emprendimientos', icon: icons.emprendimientos },
  { value: 'estudiante', label: 'Estudiantes', icon: icons.tutores },
  { value: 'agencia', label: 'Agencia web', icon: icons.web },
  { value: 'talleres', label: 'Talleres', icon: icons.taller },
];

export const faqGroups = [
  {
    grupo: 'general',
    grupoLabel: 'General',
    icon: icons.globo,
    items: [
      {
        q: '¿Qué es ConectaTuMundo exactamente?',
        a: 'ConectaTuMundo es una plataforma de servicios digitales y conexión de talento con base en Durazno, Uruguay. Hacemos tres cosas: <strong>desarrollamos sitios web y asesoramos emprendimientos</strong>, <strong>conectamos negocios locales con estudiantes calificados</strong> que ofrecen servicios a precio accesible, y <strong>damos talleres de educación digital</strong> en liceos, escuelas y organizaciones.<br><br>En pocas palabras: somos el puente digital del interior.',
      },
      {
        q: '¿Solo operan en Durazno?',
        a: 'Estamos basados en Durazno y eso es nuestra ventaja — conocemos el territorio. Pero trabajamos con emprendimientos de toda la región centro del Uruguay y los talleres los podemos dar de forma <strong>presencial en Durazno</strong> o <strong>virtual para todo el país</strong>. La Red Conecta también funciona de forma remota.',
      },
      {
        q: '¿ConectaTuMundo es una empresa formal?',
        a: 'Estamos en proceso de formalización. Contamos con el <strong>visto bueno de INEFOP</strong> y estamos en tratativas con ANDE (Agencia Nacional de Desarrollo). Todos los servicios que ofrecemos tienen respaldo real y compromiso de nuestra parte.<div class="nota">Si necesitás factura o documentación formal para contratar, escribinos y lo coordinamos.</div>',
      },
      {
        q: '¿Cómo me contacto?',
        a: 'Por WhatsApp es lo más rápido. También podés usar el formulario de contacto del sitio y te respondemos en el día. No tenemos horario de oficina — somos del interior, trabajamos a mate y buena onda.',
      },
    ],
  },
  {
    grupo: 'emprendimiento',
    grupoLabel: 'Para emprendimientos',
    icon: icons.emprendimientos,
    items: [
      {
        q: '¿Cómo funciona la Red Conecta para mi negocio?',
        a: 'Simple. Vos nos contás qué necesitás — un contador para ordenar las finanzas, un diseñador para el logo, alguien que maneje las redes — y nosotros buscamos en nuestra red al estudiante o profesional más adecuado para tu caso.<br><br>El proceso es:<ul><li>Nos contactás y nos contás tu necesidad</li><li>Te presentamos opciones de nuestra red</li><li>Coordinamos la primera reunión</li><li>Acompañamos el proceso para que todo salga bien</li></ul><span class="highlight">✓ Sin burocracia, sin proceso largo</span>',
      },
      {
        q: '¿Cuánto cuesta acceder a la Red Conecta?',
        a: 'El costo varía según el servicio y el perfil que necesitás. En todos los casos va a ser <strong>significativamente menor</strong> que contratar un profesional independiente en el mercado formal. Los estudiantes fijan un precio accesible porque también les interesa sumar experiencia.<br><br>ConectaTuMundo cobra una <strong>comisión de intermediación</strong> pequeña sobre la transacción — así sostenemos la plataforma y garantizamos la calidad del servicio.<div class="nota">Consultanos sin compromiso. Te damos un presupuesto antes de arrancar.</div>',
      },
      {
        q: '¿Qué pasa si el estudiante no cumple o el resultado no es bueno?',
        a: 'Eso es exactamente para lo que estamos nosotros. ConectaTuMundo actúa como <strong>garantía y coordinador</strong> del proceso. Validamos cada perfil antes de presentarlo y acompañamos la relación de principio a fin.<br><br>Si hay algún problema, lo resolvemos. No dejamos a ningún emprendimiento tirado.',
      },
      {
        q: '¿Puedo aparecer en la vitrina de emprendimientos del sitio?',
        a: 'Sí, y es gratis para emprendimientos que trabajen con nosotros. Tu negocio aparece en la vitrina con descripción, rubro, servicios y datos de contacto. Es visibilidad real para clientes de la zona.<br><br>Los emprendimientos que contraten servicios de la agencia o usen la Red Conecta quedan automáticamente invitados a sumarse.',
      },
    ],
  },
  {
    grupo: 'estudiante',
    grupoLabel: 'Para estudiantes',
    icon: icons.tutores,
    items: [
      {
        q: '¿Cómo me sumo como tutor o prestador de servicios?',
        a: 'Completás el formulario de registro con tu nombre, institución, carrera o técnico que estás cursando, las materias o servicios que ofrecés y tu disponibilidad. Nosotros revisamos el perfil y si cumple con los requisitos te damos el OK para aparecer en la red.<br><br>No pedimos título terminado — sí pedimos que estés en un nivel avanzado de tu formación y que tengas conocimiento real para ofrecer.',
      },
      {
        q: '¿Qué gano yo como estudiante?',
        a: 'Tres cosas concretas:<ul><li><strong>Dinero:</strong> cobrás por los servicios que prestás, a un precio que vos acordás</li><li><strong>Experiencia:</strong> trabajar con emprendimientos reales es lo que diferencia un CV del montón</li><li><strong>Contactos:</strong> conectarse con empresarios locales antes de graduarse vale oro</li></ul>Además, si participás en los talleres o charlas del Ciclo Digital Durazno, podés sumar eso también a tu historial.<span class="highlight">✓ Experiencia práctica antes de recibirse</span>',
      },
      {
        q: '¿Necesito saber todo el tema para poder ofrecerme?',
        a: 'No hace falta ser el experto máximo. Hace falta saber más que la persona que te contrata y poder explicarlo bien. Un emprendedor que nunca usó una planilla de Excel necesita a alguien que le enseñe a usarla — no a un contador con 20 años de experiencia.<br><br>Lo importante es ser <strong>honesto con lo que sabés y lo que no</strong>. En ConectaTuMundo no mandamos a nadie a un trabajo que no puede hacer.',
      },
      {
        q: '¿Puedo dar clases particulares a través de la plataforma?',
        a: 'Sí, esa es una de las formas más pedidas. Estudiantes avanzados que ayudan a otros con matemática, contabilidad, inglés, informática y más. Aparecés en la sección Comunidad del sitio con tu perfil, materias y las reseñas que vayas acumulando.',
      },
    ],
  },
  {
    grupo: 'agencia',
    grupoLabel: 'Agencia web',
    icon: icons.web,
    items: [
      {
        q: '¿Cuánto cuesta un sitio web?',
        a: 'Depende de lo que necesitás. Un sitio informático básico (landing page) arranca en <strong>$250 USD</strong>. Una tienda online o sitio con funcionalidades más complejas tiene otro precio.<br><br>Siempre hacemos una reunión previa sin costo para entender tu negocio y darte un presupuesto justo. No cobramos de más por cosas que no necesitás.<div class="nota">También ofrecemos planes de mantenimiento mensual para que tu sitio siempre esté actualizado.</div>',
      },
      {
        q: '¿Cuánto tiempo lleva tener el sitio listo?',
        a: 'Un sitio sencillo puede estar en <strong>1 a 2 semanas</strong>. Uno más complejo con tienda online o funcionalidades especiales puede llevar 3 a 4 semanas. Siempre te decimos los tiempos reales antes de arrancar — sin promesas vacías.',
      },
      {
        q: '¿Qué pasa después de que me entregan el sitio?',
        a: 'El sitio es tuyo. Te enseñamos a usarlo y actualizarlo. Si preferís que lo manejemos nosotros, tenemos planes de mantenimiento mensual que incluyen actualizaciones, soporte y pequeños cambios.<br><br>No te dejamos con un sitio que no sabés cómo manejar.',
      },
      {
        q: '¿Hacen diagnóstico digital gratis?',
        a: 'Sí. Si no sabés bien qué necesita tu negocio digitalmente, hacemos una <strong>auditoría sin costo</strong> donde analizamos tu presencia actual (redes, Google Maps, sitio web si tenés) y te decimos concretamente qué mejorar primero y en qué orden. Sin compromiso de contratar nada.',
      },
    ],
  },
  {
    grupo: 'talleres',
    grupoLabel: 'Talleres y formación',
    icon: icons.taller,
    items: [
      {
        q: '¿Qué temas cubren los talleres?',
        a: 'Los talleres principales son:<ul><li><strong>Seguridad en internet:</strong> estafas, contraseñas, privacidad y phishing</li><li><strong>Herramientas digitales para emprendedores:</strong> Google, facturación, redes para negocios</li><li><strong>Uso responsable de redes sociales:</strong> para jóvenes y adultos</li></ul>También podemos adaptar el contenido a lo que necesite tu institución o empresa.',
      },
      {
        q: '¿Los talleres son gratuitos?',
        a: 'Los talleres en liceos, escuelas y organizaciones comunitarias tienen <strong>costo accesible o gratuito</strong> dependiendo del contexto — apoyamos la educación del interior sin que sea una barrera económica.<br><br>Los talleres para empresas o instituciones privadas tienen un costo que se define según el alcance y la audiencia.',
      },
      {
        q: '¿Pueden venir a mi liceo o escuela?',
        a: 'Sí, eso es exactamente lo que hacemos. Coordinamos con la dirección del centro educativo, adaptamos el contenido a la edad y nivel del grupo, y vamos. En Durazno es presencial; fuera de Durazno podemos hacerlo de forma virtual.<br><br>Escribinos y lo organizamos sin complicaciones.',
      },
    ],
  },
];
