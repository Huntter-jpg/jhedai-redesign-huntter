const API_BASE = import.meta.env.VITE_API_URL || "";

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
  linkedin?: string;
  bannerFrom: string;
  bannerTo: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: { name: string; avatar?: string };
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  featured: boolean;
  featuredImage?: string;
  featuredImageAlt?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  totalPages: number;
  total: number;
}

export interface GetPostsParams {
  page?: number;
  limit?: number;
  category?: string;
}

// --- Mock data for development (before API is ready) ---
const mockPosts: BlogPost[] = [
  {
    id: 1,
    slug: "74-empresas-chilenas-aumentara-inversion-ia",
    title: "74% de empresas chilenas aumentará su inversión en IA",
    excerpt:
      "Las grandes empresas en Chile están redefiniendo sus operaciones en minería, retail, finanzas y salud con inteligencia artificial. Análisis del ecosistema IA nacional.",
    content:
      "<h2>El panorama actual de la IA en Chile</h2><p>La inteligencia artificial está transformando la forma en que las empresas chilenas operan. Según un reciente estudio, el <strong>74% de las grandes empresas</strong> planea aumentar significativamente su inversión en tecnologías de IA durante los próximos dos años.</p><h2>Sectores líderes en adopción</h2><p>Los sectores que lideran esta transformación son:</p><ul><li><strong>Minería:</strong> Mantenimiento predictivo y optimización de procesos extractivos</li><li><strong>Retail:</strong> Personalización de experiencia de cliente y gestión de inventario</li><li><strong>Finanzas:</strong> Detección de fraude y scoring crediticio automatizado</li><li><strong>Salud:</strong> Diagnóstico asistido por IA y gestión hospitalaria</li></ul><h2>Desafíos y oportunidades</h2><p>A pesar del optimismo, las empresas enfrentan desafíos importantes como la escasez de talento especializado, la calidad de los datos disponibles y la necesidad de marcos regulatorios claros.</p><blockquote>La adopción de IA no es una opción, es una necesidad competitiva para las empresas que quieren liderar en sus respectivos mercados.</blockquote><h2>¿Qué deben hacer las empresas?</h2><p>Las organizaciones que buscan aprovechar el potencial de la IA deben comenzar con un diagnóstico exhaustivo de su madurez tecnológica, definir una estrategia clara y contar con partners especializados que entiendan el contexto local.</p>",
    category: "Industria",
    tags: ["IA", "Chile", "inversión", "industria"],
    author: { name: "JhedAi" },
    publishedAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
    readTime: "8 min",
    featured: true,
    featuredImage: undefined,
    metaDescription:
      "El 74% de las grandes empresas chilenas planea aumentar su inversión en IA. Análisis completo del ecosistema de inteligencia artificial en Chile.",
  },
  {
    id: 2,
    slug: "regulacion-ia-chile-primer-marco-legal",
    title: "Regulación IA Chile: primer marco legal en Latinoamérica",
    excerpt:
      "El Congreso aprobó el primer marco regulatorio para sistemas de IA en la región. Qué significa para tu empresa.",
    content:
      "<h2>Un hito regulatorio</h2><p>Chile se convierte en el primer país de Latinoamérica en establecer un marco legal específico para la inteligencia artificial. Esta regulación establece principios fundamentales para el desarrollo y uso responsable de sistemas de IA.</p><h2>Principales puntos de la regulación</h2><ul><li><strong>Transparencia:</strong> Las empresas deben informar cuando un sistema de IA toma decisiones que afectan a las personas</li><li><strong>No discriminación:</strong> Los sistemas de IA no pueden perpetuar sesgos injustos</li><li><strong>Responsabilidad:</strong> Se establecen mecanismos claros de responsabilidad ante daños</li><li><strong>Protección de datos:</strong> Se refuerzan los estándares de privacidad en el uso de datos para IA</li></ul><h2>Impacto en las empresas</h2><p>Las empresas que ya utilizan IA deberán adaptarse a los nuevos requisitos. Aquellas que aún no han implementado estas tecnologías tienen la oportunidad de hacerlo desde el inicio con un marco claro.</p>",
    category: "Regulación",
    tags: ["regulación", "Chile", "marco legal", "compliance"],
    author: { name: "JhedAi" },
    publishedAt: "2026-01-28T10:00:00Z",
    updatedAt: "2026-01-28T10:00:00Z",
    readTime: "6 min",
    featured: false,
  },
  {
    id: 3,
    slug: "tendencias-vision-computacional-industria-2026",
    title: "Tendencias en Visión Computacional para la industria",
    excerpt:
      "La visión por computador representa un cambio estructural en el enfoque de desarrollo industrial en Chile.",
    content:
      "<h2>La revolución visual de la industria</h2><p>La visión computacional está experimentando una evolución acelerada que promete transformar fundamentalmente las operaciones industriales. Desde la inspección de calidad hasta la seguridad laboral, las aplicaciones son cada vez más sofisticadas y accesibles.</p><h2>Tendencias clave para 2026</h2><ul><li><strong>Edge Computing:</strong> Procesamiento en el borde para latencia ultra-baja en líneas de producción</li><li><strong>Modelos multimodales:</strong> Combinación de visión, texto y audio para análisis más completo</li><li><strong>Detección en tiempo real:</strong> Inspección de defectos a velocidad de línea de producción</li></ul><h2>Aplicaciones en Chile</h2><p>En Chile, las industrias minera, portuaria y agrícola están liderando la adopción de visión computacional con resultados medibles en eficiencia y seguridad.</p>",
    category: "Tendencias",
    tags: ["visión computacional", "industria", "tendencias", "2026"],
    author: { name: "JhedAi" },
    publishedAt: "2026-02-05T10:00:00Z",
    updatedAt: "2026-02-05T10:00:00Z",
    readTime: "5 min",
    featured: false,
  },
  {
    id: 4,
    slug: "capacitaciones-ia-certificacion-chilevalora",
    title: "Capacitaciones IA con certificación ChileValora",
    excerpt:
      "Chile lidera la región en preparación de talento IA con 74.30 puntos según el Índice Latinoamericano de IA.",
    content:
      "<h2>La importancia de la certificación</h2><p>La certificación ChileValora en perfiles de inteligencia artificial representa un estándar reconocido por el Estado que valida las competencias de los profesionales en IA. JhedAi es pionera como empresa certificadora en estos perfiles.</p><h2>Perfiles certificables</h2><p>Los 5 perfiles de certificación abarcan desde fundamentos de IA hasta aplicaciones avanzadas en Machine Learning y procesamiento de lenguaje natural, cubriendo las necesidades más demandadas del mercado.</p><h2>Beneficios para las empresas</h2><ul><li>Personal certificado con estándares nacionales</li><li>Mejora en la capacidad de adopción tecnológica</li><li>Ventaja competitiva en licitaciones y proyectos gubernamentales</li></ul>",
    category: "Formación",
    tags: ["ChileValora", "certificación", "capacitación", "talento IA"],
    author: { name: "JhedAi" },
    publishedAt: "2026-02-12T10:00:00Z",
    updatedAt: "2026-02-12T10:00:00Z",
    readTime: "4 min",
    featured: false,
  },
  {
    id: 5,
    slug: "mantenimiento-predictivo-ia-mineria-chile",
    title: "Mantenimiento predictivo con IA en minería chilena",
    excerpt:
      "Cómo la inteligencia artificial está reduciendo las paradas no planificadas en operaciones mineras de gran escala.",
    content:
      "<h2>El costo de las paradas no planificadas</h2><p>En la minería chilena, una parada no planificada puede costar millones de dólares por día. El mantenimiento predictivo basado en IA permite anticipar fallas antes de que ocurran.</p><h2>Tecnologías aplicadas</h2><p>Los sistemas combinan sensores IoT, análisis vibracional y modelos de machine learning para predecir con precisión cuándo un equipo necesitará mantenimiento.</p>",
    category: "Industria",
    tags: ["minería", "mantenimiento predictivo", "IoT", "Chile"],
    author: { name: "JhedAi" },
    publishedAt: "2025-12-20T10:00:00Z",
    updatedAt: "2025-12-20T10:00:00Z",
    readTime: "7 min",
    featured: false,
  },
  {
    id: 6,
    slug: "ia-generativa-documentos-industriales",
    title: "IA Generativa para documentación industrial",
    excerpt:
      "Automatización de reportes técnicos y análisis documental con modelos de lenguaje adaptados al contexto industrial.",
    content:
      "<h2>El desafío documental</h2><p>Las industrias generan enormes volúmenes de documentación técnica. La IA generativa permite automatizar la creación, revisión y análisis de estos documentos.</p><h2>Aplicaciones prácticas</h2><ul><li>Generación automática de reportes de inspección</li><li>Análisis de contratos y documentos legales</li><li>Resumen ejecutivo de informes técnicos extensos</li></ul>",
    category: "Tendencias",
    tags: ["IA generativa", "documentación", "NLP", "automatización"],
    author: { name: "JhedAi" },
    publishedAt: "2025-11-15T10:00:00Z",
    updatedAt: "2025-11-15T10:00:00Z",
    readTime: "5 min",
    featured: false,
  },
  {
    id: 7,
    slug: "roi-proyectos-ia-como-medirlo",
    title: "ROI de la IA: cómo medir el retorno real de tus proyectos",
    excerpt:
      "Métricas y frameworks para evaluar el impacto económico de la inteligencia artificial en tu empresa.",
    content:
      "<h2>Más allá de la promesa tecnológica</h2><p>Medir el ROI de proyectos de IA requiere un enfoque estructurado que considere tanto los beneficios directos como los indirectos de la implementación.</p><h2>Framework de medición</h2><p>Un framework efectivo debe incluir métricas de eficiencia operativa, reducción de costos, mejora en calidad y generación de nuevos ingresos.</p>",
    category: "Industria",
    tags: ["ROI", "métricas", "estrategia", "negocio"],
    author: { name: "JhedAi" },
    publishedAt: "2025-10-08T10:00:00Z",
    updatedAt: "2025-10-08T10:00:00Z",
    readTime: "6 min",
    featured: false,
  },
  {
    id: 8,
    slug: "etica-ia-empresas-chilenas",
    title: "Ética en IA: guía práctica para empresas chilenas",
    excerpt:
      "Principios y buenas prácticas para implementar inteligencia artificial de forma ética y responsable.",
    content:
      "<h2>¿Por qué importa la ética en IA?</h2><p>La implementación ética de la IA no es solo una responsabilidad moral, sino una ventaja competitiva y un requisito regulatorio cada vez más relevante.</p>",
    category: "Regulación",
    tags: ["ética", "IA responsable", "gobernanza", "Chile"],
    author: { name: "JhedAi" },
    publishedAt: "2025-09-22T10:00:00Z",
    updatedAt: "2025-09-22T10:00:00Z",
    readTime: "5 min",
    featured: false,
  },
  {
    id: 9,
    slug: "transformacion-digital-pymes-ia",
    title: "Transformación digital de PyMEs con inteligencia artificial",
    excerpt:
      "La IA ya no es solo para grandes empresas. Cómo las PyMEs chilenas pueden aprovechar estas tecnologías.",
    content:
      "<h2>IA accesible para PyMEs</h2><p>Los avances en IA generativa y herramientas low-code han democratizado el acceso a la inteligencia artificial, abriendo oportunidades para pequeñas y medianas empresas.</p>",
    category: "Industria",
    tags: ["PyMEs", "transformación digital", "accesibilidad", "Chile"],
    author: { name: "JhedAi" },
    publishedAt: "2025-08-10T10:00:00Z",
    updatedAt: "2025-08-10T10:00:00Z",
    readTime: "6 min",
    featured: false,
  },
  {
    id: 10,
    slug: "formacion-talento-ia-chile-2026",
    title: "Formación de talento IA: el desafío de Chile para 2026",
    excerpt:
      "Análisis de la brecha de talento en inteligencia artificial y las estrategias para cerrarla.",
    content:
      "<h2>La brecha de talento</h2><p>Chile enfrenta una creciente demanda de profesionales especializados en IA que supera ampliamente la oferta actual del mercado laboral.</p>",
    category: "Formación",
    tags: ["talento", "formación", "educación", "mercado laboral"],
    author: { name: "JhedAi" },
    publishedAt: "2025-07-05T10:00:00Z",
    updatedAt: "2025-07-05T10:00:00Z",
    readTime: "5 min",
    featured: false,
  },
];

// --- API functions (use mock data when API is not available) ---

// Normalize a raw blog post from the jhedai-cards API to the BlogPost interface
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizePost(raw: any): BlogPost {
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt || "",
    content: raw.content || "",
    category: raw.category || "",
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    author: {
      name: raw.author?.name || raw.author_name || "JhedAI",
      avatar: raw.author?.avatar || raw.author_avatar || undefined,
    },
    publishedAt: raw.published_at || raw.publishedAt || "",
    updatedAt: raw.updated_at || raw.updatedAt || "",
    readTime: raw.read_time || raw.readTime || "5 min",
    featured: raw.featured === true || raw.featured === 1,
    featuredImage: raw.featured_image || raw.featuredImage || undefined,
    featuredImageAlt:
      raw.featured_image_alt || raw.featuredImageAlt || undefined,
    metaTitle: raw.meta_title || raw.metaTitle || undefined,
    metaDescription: raw.meta_description || raw.metaDescription || undefined,
  };
}

export async function getPosts(
  params: GetPostsParams = {},
): Promise<PaginatedResponse<BlogPost>> {
  const { page = 1, limit = 9, category } = params;

  if (API_BASE) {
    const searchParams = new URLSearchParams();
    searchParams.set("page", String(page));
    searchParams.set("limit", String(limit));
    if (category) searchParams.set("category", category);

    const res = await fetch(`${API_BASE}/api/blog/posts?${searchParams}`);
    if (!res.ok) throw new Error("Error fetching posts");
    const json = await res.json();
    // jhedai-cards returns { error, data: { data, page, totalPages, total } }
    const payload = json.data || json;
    return {
      data: (payload.data || []).map(normalizePost),
      page: payload.page || page,
      totalPages: payload.totalPages || 1,
      total: payload.total || 0,
    };
  }

  // Mock: filter, paginate
  let filtered = [...mockPosts];
  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }
  filtered.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  return { data, page, totalPages, total };
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  if (API_BASE) {
    const res = await fetch(`${API_BASE}/api/blog/posts/${slug}`);
    if (!res.ok) return null;
    const json = await res.json();
    return normalizePost(json.data || json);
  }

  return mockPosts.find((p) => p.slug === slug) || null;
}

export async function getRelatedPosts(
  category: string,
  excludeSlug: string,
): Promise<BlogPost[]> {
  if (API_BASE) {
    const res = await fetch(
      `${API_BASE}/api/blog/posts/${excludeSlug}/related`,
    );
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data || []).map(normalizePost);
  }

  return mockPosts
    .filter((p) => p.category === category && p.slug !== excludeSlug)
    .slice(0, 3);
}

export async function getCategories(): Promise<string[]> {
  if (API_BASE) {
    const res = await fetch(`${API_BASE}/api/blog/categories`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  }
  return ["Industria", "Regulación", "Tendencias", "Formación"];
}

// Mock fallback for team members
const mockTeamMembers: TeamMember[] = [
  {
    name: "Nombre del Miembro 1",
    role: "CEO & Fundador",
    image: "/team/member1.jpg",
    description:
      "Especialista en IA con más de 10 años de experiencia en transformación digital.",
    linkedin: "",
    bannerFrom: "#0a1628",
    bannerTo: "#00b4d8",
  },
  {
    name: "Nombre del Miembro 2",
    role: "CTO",
    image: "/team/member2.jpg",
    description:
      "Experto en Machine Learning y arquitectura de sistemas de IA.",
    linkedin: "",
    bannerFrom: "#00b4d8",
    bannerTo: "#0077b6",
  },
  {
    name: "Nombre del Miembro 3",
    role: "Director de Innovación",
    image: "/team/member3.jpg",
    description:
      "Líder en investigación y desarrollo de soluciones de IA aplicada.",
    linkedin: "",
    bannerFrom: "#4338ca",
    bannerTo: "#00b4d8",
  },
  {
    name: "Nombre del Miembro 4",
    role: "Head of Data Science",
    image: "/team/member4.jpg",
    description:
      "Científico de datos con especialización en NLP y Computer Vision.",
    linkedin: "",
    bannerFrom: "#0a1628",
    bannerTo: "#4338ca",
  },
];

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (API_BASE) {
    const res = await fetch(`${API_BASE}/api/members`);
    if (!res.ok) return mockTeamMembers;
    const json = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (json.data || []).map(
      (m: any): TeamMember => ({
        name: `${m.first_name} ${m.last_name}`.trim(),
        role: m.role || "",
        image: m.photo_url || "",
        description: m.bio || "",
        linkedin: m.socials?.linkedin || m.linkedin_url || "",
        bannerFrom: m.banner_from || "#0a1628",
        bannerTo: m.banner_to || "#00b4d8",
      }),
    );
  }
  return mockTeamMembers;
}
