export const portfolioData = {
  profile: {
    name: "Joseph García Jiménez",
    avatar: "./assets/portfolio/User.jpg",
    statImage: "./assets/portfolio/campuslands-jovenes.jpg",
    canvaCvUrl: "https://www.canva.com/design/DAGvTmNEeHA/ejTS5YTMxwGZwJby_jYBgw/edit?utm_content=DAGvTmNEeHA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
    linkedinUrl: "https://www.linkedin.com/in/joseph-guilliani-garcia-jim%C3%A9nez-95b650398/",
    githubUrl: "https://github.com/sephty",
  },
  projects: [
    {
      id: "n8n",
      title: "n8n Absence System",
      year: "2026",
      desc_es: "Sistema automatizado con n8n que utiliza IA para analizar y clasificar justificaciones de inasistencias. Integra OpenAI, Google Sheets, Google Drive y notificaciones automatizadas por Telegram.",
      desc_en: "Automated pipeline utilizing n8n and AI to analyze and classify absence justifications. Integrates OpenAI, Google Sheets, Google Drive, and automated Telegram dispatch.",
      techStack: ["JavaScript", "n8n", "OpenAI", "Google APIs", "Telegram Bot"],
      githubUrl: "https://github.com/sephty/n8nAutomatization_JosephGarcia",
      images: [
        "./assets/portfolio/projects/n8n/image.png",
        "./assets/portfolio/projects/n8n/n8nworkflow.png"
      ],
      featured: true
    },
    {
      id: "abc-campus",
      title: "ABC Campus LMS",
      year: "2026",
      desc_es: "LMS educativo integral con gestión de cursos, módulos, lecciones y usuarios con panel administrativo protegido y autenticación por roles.",
      desc_en: "Comprehensive educational LMS featuring course, module, lesson, and user lifecycle management with role-based access security.",
      techStack: ["JavaScript", "HTML5", "CSS3", "Local/Session Auth"],
      githubUrl: "https://github.com/sephty/ABC_campusProject",
      images: [
        "./assets/portfolio/projects/abc/abc_campus.webp",
        "./assets/portfolio/projects/abc/abc_campus_2.webp"
      ],
      featured: true
    },
    {
      id: "delrincon",
      title: "DelRincón Hotel",
      year: "2025",
      desc_es: "Plataforma de reservaciones y gestión hotelera con consumo de REST API, panel administrativo, manejo de estados de habitaciones y filtros dinámicos.",
      desc_en: "Full-fledged hotel booking system powered by a Node.js REST API with reservation state management and real-time availability filters.",
      techStack: ["Node.js", "Express", "JavaScript", "RESTful API"],
      githubUrl: "https://github.com/sephty/DelRinconJScriptJ3FIXED",
      images: [
        "./assets/portfolio/projects/delrincon/delrincon.webp"
      ],
      featured: true
    },
    {
      id: "luxtime",
      title: "LuxTime Watch Shop",
      year: "2025",
      desc_es: "E-commerce boutique de relojes de lujo construido exclusivamente con CSS3 puro, simulando transiciones complejas y carrusel sin requerir JavaScript.",
      desc_en: "Luxury timepiece concept boutique engineered purely in vanilla CSS3, simulating complex carousel transitions without a single line of JS.",
      techStack: ["HTML5", "CSS3", "Pure CSS Animations", "Responsive"],
      githubUrl: "https://github.com/sephty/RelojCSS",
      images: [
        "./assets/portfolio/projects/luxtime/luxtime1.gif",
        "./assets/portfolio/projects/luxtime/luxtime2.gif"
      ],
      featured: false
    },
    {
      id: "library-management",
      title: "Library Management",
      year: "2025",
      desc_es: "Aplicación de consola en Python para la administración y clasificación de colecciones multimedia (libros, películas y música) con algoritmos de valoración.",
      desc_en: "Modular Python console CRUD application managing diverse multimedia catalogs (literature, cinematography, audio) with ranking algorithms.",
      techStack: ["Python", "CLI Architecture", "Data Structures", "File I/O"],
      githubUrl: "https://github.com/sephty/Proyecto_Python_GarciaJoseph.git",
      images: [
        "./assets/portfolio/projects/library_python/library.png",
        "./assets/portfolio/projects/library_python/library1.webp"
      ],
      featured: false
    }
  ],
  skills: {
    primary: [
      { name: "Java", category: "Core Backend", icon: "Code", highlight: "Enterprise Core" },
      { name: "Spring Boot", category: "Framework", icon: "Server", highlight: "Microservices & APIs" },
      { name: "JavaScript (ES6+)", category: "Language & Web Logic", icon: "Zap", highlight: "Fullstack Agility" }
    ],
    secondary: [
      { name: "REST APIs", category: "Architecture", icon: "Network" },
      { name: "MySQL", category: "Database", icon: "Database" },
      { name: "MongoDB", category: "Database", icon: "Database" },
      { name: "Node.js", category: "Backend", icon: "Server" },
      { name: "Python", category: "Backend", icon: "Code" },
      { name: "n8n Automation", category: "Workflow & AI", icon: "Workflow" },
      { name: "HTML5 / CSS3", category: "Frontend", icon: "Layout" },
      { name: "C++", category: "Systems", icon: "Cpu" },
      { name: "Scrum / Agile", category: "Methodology", icon: "ListChecks" }
    ],
    soft: [
      {
        key: "soft1",
        es: "Resolución de Problemas",
        en: "Problem Solving",
        desc_es: "Análisis riguroso de causa raíz y descomposición lógica de problemas técnicos complejos.",
        desc_en: "Rigorous root-cause analysis and logical decomposition of complex engineering edge cases."
      },
      {
        key: "soft2",
        es: "Pensamiento Arquitectural",
        en: "Architectural Thinking",
        desc_es: "Diseño de sistemas modulares, escalables y desacoplados con código limpio y mantenible.",
        desc_en: "Designing decoupled, scalable modular architectures with clean and maintainable codebases."
      },
      {
        key: "soft3",
        es: "Sentido de Propiedad",
        en: "Ownership & Accountability",
        desc_es: "Compromiso integral con la estabilidad, calidad y entrega de cada solución de software.",
        desc_en: "End-to-end responsibility for code quality, system resilience, and on-time delivery."
      },
      {
        key: "soft4",
        es: "Colaboración Técnica",
        en: "Technical Collaboration",
        desc_es: "Comunicación asertiva, code reviews constructivos y sincronización activa en equipo.",
        desc_en: "Constructive code reviews, proactive communication, and agile team synergy."
      },
      {
        key: "soft5",
        es: "Aprendizaje Continuo",
        en: "Continuous Mastery",
        desc_es: "Asimilación rápida y profunda de nuevos frameworks, lenguajes y mejores prácticas de la industria.",
        desc_en: "Rapid, self-directed mastery of emerging frameworks, languages, and modern industry paradigms."
      },
      {
        key: "soft6",
        es: "Adaptabilidad",
        en: "Adaptability",
        desc_es: "Flexibilidad operativa para pivotar y optimizar ante requerimientos cambiantes y nuevos retos.",
        desc_en: "Operational agility to adapt, refactor, and thrive under shifting requirements and constraints."
      }
    ]
  },
  orbitalNodes: [
    {
      key: "about",
      label_es: "SOBRE MÍ",
      label_en: "ABOUT ME",
      sub_es: "IDENTIDAD & FILOSOFÍA",
      sub_en: "IDENTITY & PHILOSOPHY",
      color: "#f2c14e",
      gradient: "from-amber-200 via-amber-400 to-amber-700",
      orbitR: 0,
      size: 54
    },
    {
      key: "projects",
      label_es: "PROYECTOS",
      label_en: "PROJECTS",
      sub_es: "SISTEMAS & APIS",
      sub_en: "SYSTEMS & APIS",
      color: "#7c87ea",
      gradient: "from-indigo-200 via-indigo-500 to-indigo-800",
      orbitR: 160,
      size: 28,
      ringColor: null
    },
    {
      key: "skills",
      label_es: "HABILIDADES",
      label_en: "SKILLS",
      sub_es: "JAVA, SPRING & CLOUD",
      sub_en: "JAVA, SPRING & CLOUD",
      color: "#f59e0b",
      gradient: "from-orange-200 via-amber-500 to-amber-800",
      orbitR: 235,
      size: 25,
      ringColor: null
    },
    {
      key: "experience",
      label_es: "TRAYECTORIA",
      label_en: "EXPERIENCE",
      sub_es: "FORMACIÓN & HITOS",
      sub_en: "FORMATION & TRACK",
      color: "#4dcca0",
      gradient: "from-emerald-200 via-emerald-500 to-emerald-900",
      orbitR: 305,
      size: 30,
      ringColor: "#4dcca0"
    },
    {
      key: "contact",
      label_es: "CONTACTO",
      label_en: "CONTACT",
      sub_es: "GABINETE & RECURSOS",
      sub_en: "CABINET & CHANNELS",
      color: "#d1233a",
      gradient: "from-red-200 via-rose-500 to-rose-900",
      orbitR: 375,
      size: 24,
      ringColor: null
    }
  ]
};
