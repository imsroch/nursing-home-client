export const site = {
  name: 'Geriátrico Neuquén',
  location: 'Caballito, Buenos Aires',
  taglineLead: 'Juntos, en un espacio de ',
  taglineAccent: 'respeto y dedicación',
  taglineTail: ' para una vida en plenitud.',
  trustBadges: [
    'Equipo profesional las 24 hs',
    '36 habitaciones en Caballito',
    'Trabajamos con PAMI',
  ],
} as const;

export const navItems = [
  { label: 'Inicio', id: 'inicio', kind: 'section' },
  { label: 'Institucional', id: 'institucional', kind: 'section' },
  { label: 'Servicios', id: 'servicios', kind: 'section' },
  { label: 'Contacto', id: 'contacto', kind: 'section' },
  { label: 'Formulario', id: 'formulario', kind: 'route', href: '/formulario' },
] as const;

export const formularioPage = {
  kicker: 'Asesoramiento',
  title: 'Completá el formulario',
  intro:
    'Te ayudamos a encontrar el cuidado adecuado. Para tu tranquilidad y privacidad, en esta etapa inicial no solicitamos nombres, apellidos ni datos personales sensibles del adulto mayor ni de tu familia.',
  address: 'Dr. Gregorio Aráoz Alfaro 258, Caballito, CABA',
  whatsappDisplay: '11-6150-4440',
  whatsappLink: 'https://wa.me/5491161504440',
  email: 'giocar.neuquen@gmail.com',
  subtitle:
    'Establecimiento geriátrico habilitado. Atención profesional y cálida, con tarifas accesibles.',
} as const;

export const serviciosPage = {
  kicker: 'Cómo cuidamos',
  title: 'Nuestro plan de trabajo.',
  intro:
    'Descubrí nuestro enfoque integral para el bienestar de nuestros residentes, donde fusionamos cuidados médicos, atención de enfermería, asesoramiento nutricional y terapias físicas. Nuestro plan de trabajo incluye un abordaje psicológico y social, ofreciendo tratamientos especializados y talleres que se adaptan a las necesidades individuales. Las actividades del Área Psicológica/Social pueden ser individuales, familiares, grupales o comunitarias, diseñadas con objetivos específicos para abordar desafíos particulares, brindar orientación y contención. Este enfoque interdisciplinario se refleja en nuestras reuniones mensuales de Equipo Interdisciplinario, donde los directivos médicos y administrativos colaboran para garantizar una atención personalizada y efectiva para cada residente.',
} as const;

export const services = [
  {
    id: 'salud',
    title: 'Área de Salud',
    subtitle: 'Director Médico',
    roles: [
      'Médico Gerontólogo',
      'Enfermera Profesional',
      'Enfermera 24hs.',
      'Nutricionista',
      'Kinesióloga',
    ],
  },
  {
    id: 'social',
    title: 'Área Preventivo Social',
    subtitle: 'Asistente Social',
    roles: [
      'Psicóloga',
      'Musicoterapeuta',
      'Yoga ó Actividad Física',
      'Terapia ocupacional',
      'Asistente Social',
    ],
  },
  {
    id: 'servicios',
    title: 'Área de Servicios',
    subtitle: 'Director Administrativo',
    roles: [
      'Asistentes geriátricas',
      'Cocinera',
      'Mucamas',
      'Peluquera',
      'Podóloga',
      'Personal de mantenimiento',
    ],
  },
] as const;

export const institucionalPage = {
  kicker: 'Quiénes somos',
  title: 'Nuestras misiones y objetivos.',
  sections: [
    {
      title: 'Misión y Enfoque Institucional.',
      body: 'El Establecimiento Geriátrico Neuquén se compromete a brindar un entorno cálido y respetuoso para los adultos mayores, reconociendo la complejidad de su situación al enfrentar los desafíos del envejecimiento y la adaptación a una nueva etapa de vida. Nuestra misión se centra en mejorar la calidad de vida de los residentes a través de un enfoque interdisciplinario, promoviendo la autonomía, la reflexión y la adaptación activa al entorno institucional. Buscamos ser un lugar donde la atención integral y el bienestar de los residentes son prioritarios.',
    },
    {
      title: 'Instalaciones y Servicios.',
      body: 'Ubicado en el Barrio de Caballito, en la Ciudad Autónoma de Buenos Aires, el hogar geriátrico cuenta con instalaciones modernas y adaptadas a las necesidades de los adultos mayores. Con treinta y seis camas en total, distribuidas en distintos pisos, el establecimiento ofrece habitaciones cómodas, espacios de convivencia, salones de actividades y patios para promover un ambiente agradable. Nuestro equipo interdisciplinario, formado por profesionales comprometidos, se esfuerza por proporcionar servicios de calidad, contribuyendo así al bienestar integral de los residentes.',
    },
    {
      title: 'Objetivo General y Compromiso Continuo.',
      body: 'El objetivo fundamental del Establecimiento Geriátrico Neuquén es favorecer el bienestar integral de los residentes a través de seguimientos continuos y estrategias de intervención personalizadas. Nos esforzamos por crear un ambiente donde cada adulto mayor se sienta cuidado, apoyado y respetado en su individualidad. Al promover la calidad de vida en el contexto institucional, buscamos establecer acciones que no solo aborden las necesidades físicas, sino también aquellas relacionadas con el desarrollo cognitivo, la autonomía y la adaptación activa, manteniendo siempre un enfoque humano y ético en nuestra labor diaria.',
    },
  ],
} as const;

export const contactPage = {
  kicker: 'Estamos cerca',
  title: 'Contactános',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3283.527435998273!2d-58.4359707353868!3d-34.61610936447341!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca4180e4bec9%3A0x9b4bd5d87c109119!2sEstablecimiento%20Geri%C3%A1trico%20Neuqu%C3%A9n!5e0!3m2!1ses!2sar!4v1707244939232!5m2!1ses!2sar',
} as const;

export const footer = {
  copyright: 'Derechos reservados por Geriátrico Neuquén.',
} as const;
