import { motion } from "framer-motion";
import {
  Rocket,
  Lightbulb,
  GraduationCap,
  Award,
  Cpu,
  Users,
  Target,
  Zap,
  Heart,
  TrendingUp,
  Globe,
  Building2,
  Handshake,
  Presentation,
  Landmark,
  Server,
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import { BreadcrumbSchema } from "../components/schemas/BreadcrumbSchema";

interface Milestone {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  position: "left" | "right";
}

const milestones: Milestone[] = [
  {
    date: "Marzo 2024",
    title: "Constitución Legal de JhedAI",
    description:
      "Se constituyó legalmente JhedAI SpA, marcando el inicio formal de operaciones como consultora especializada en IA aplicada.",
    icon: <Building2 size={20} />,
    category: "Fundación",
    position: "right",
  },
  {
    date: "Julio 2024",
    title: "100 Soluciones para la Ciudad",
    description:
      "Seleccionados para el Catálogo '100 Soluciones para la Ciudad', lo que llevó a exponer en Smart City Expo Santiago, ganando visibilidad nacional.",
    icon: <Globe size={20} />,
    category: "Reconocimiento",
    position: "left",
  },
  {
    date: "Agosto 2024",
    title: "AI Hackathon 2024 - OpenAI LATAM",
    description:
      "Participación en la primera hackathon de OpenAI en Latinoamérica, 'AI Hackathon 2024', demostrando expertise en desarrollo de soluciones IA.",
    icon: <Cpu size={20} />,
    category: "Innovación",
    position: "right",
  },
  {
    date: "Octubre 2024",
    title: "MOU con Centro Nacional de IA (CENIA)",
    description:
      "Firma de MOU con el Centro Nacional de IA (CENIA), estableciendo alianzas estratégicas para investigación y aplicación IA.",
    icon: <Handshake size={20} />,
    category: "Alianza",
    position: "left",
  },
  {
    date: "Noviembre 2024",
    title: "Stand en EtMday 2024",
    description:
      "Presencia con stand en EtMday 2024, el mayor encuentro de innovación, emprendimiento e inversión de Latinoamérica.",
    icon: <Presentation size={20} />,
    category: "Evento",
    position: "right",
  },
  {
    date: "Enero 2025",
    title: "Perfiles Profesionales de IA - ChileValora",
    description:
      "JhedAI participa activamente en el desarrollo y creación de los perfiles profesionales de IA de Chile Valora, junto al Ministerio de Ciencia.",
    icon: <GraduationCap size={20} />,
    category: "Formación",
    position: "left",
  },
  {
    date: "Enero 2025",
    title: "Cámara Chilena de Inteligencia Artificial",
    description:
      "Constitución de la Cámara Chilena de Inteligencia Artificial A.G., con Edison Vásquez (CEO de JhedAI) como presidente, para acelerar adopción responsable de IA.",
    icon: <Landmark size={20} />,
    category: "Liderazgo",
    position: "right",
  },
  {
    date: "Abril 2025",
    title: "Colaborador en Proyecto LATAM GPT",
    description:
      "JhedAI ingresa como colaborador al proyecto LATAM GPT, el primer modelo de inteligencia artificial regional coordinado por CENIA, aportando capacidades técnicas para el desarrollo de un LLM abierto diseñado desde y para Latinoamérica.",
    icon: <Globe size={20} />,
    category: "Colaboración",
    position: "left",
  },
  {
    date: "Junio 2025",
    title: "Fondo CORFO - CSIAA",
    description:
      "Adjudicación de fondo CORFO para el Centro de Supercómputo e IA Aplicada (CSIAA), con JhedAI como empresa asociada fundadora en Viña del Mar.",
    icon: <Server size={20} />,
    category: "Infraestructura",
    position: "right",
  },
  {
    date: "Agosto 2025",
    title: "StartUp Day en Congreso Nacional",
    description:
      "Seleccionados para StartUp Day en el Congreso Nacional de Chile, organizado por la Bancada StartUp.",
    icon: <Rocket size={20} />,
    category: "Reconocimiento",
    position: "left",
  },
  {
    date: "Noviembre 2025",
    title: "Doble Presencia en EtMday 2025",
    description:
      "Presencia en EtMday por segundo año consecutivo, con 2 stands: uno de JhedAI y otro de la Cámara Chilena de IA.",
    icon: <Award size={20} />,
    category: "Evento",
    position: "right",
  },
  {
    date: "Noviembre 2025",
    title: "MOU entre AMD y CSIAA",
    description:
      "Firma de Memorándum de Entendimiento entre AMD y CSIAA, abriendo colaboración en supercómputo IA como empresa asociada.",
    icon: <Handshake size={20} />,
    category: "Alianza",
    position: "left",
  },
  {
    date: "Enero 2026",
    title: "Círculo de StartUp EIVA",
    description:
      "Seleccionados como miembros del Círculo de StartUp de EIVA, impulsando innovación en la Región de Valparaíso.",
    icon: <Users size={20} />,
    category: "Comunidad",
    position: "right",
  },
  {
    date: "Febrero 2026",
    title: "Lanzamiento Oficial de LATAM GPT",
    description:
      "Se lanza oficialmente LATAM GPT, el primer Gran Modelo de Lenguaje abierto de América Latina y el Caribe, desarrollado colaborativamente por más de 60 instituciones y 200 especialistas de 15 países, coordinado por CENIA con el respaldo de CAF, el Gobierno de Chile, AWS y Data Observatory. JhedAI participó como colaborador técnico en este hito regional.",
    icon: <Rocket size={20} />,
    category: "Hito Regional",
    position: "left",
  },
];

const valores = [
  {
    icon: <Target size={24} />,
    title: "Precisión Técnica",
    desc: "Cada solución está diseñada con rigor ingenieril para la complejidad industrial real del mercado chileno. No comprometemos la calidad técnica por velocidad de implementación.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Zap size={24} />,
    title: "Innovación Aplicada",
    desc: "No perseguimos tendencias, resolvemos problemas reales con tecnología de vanguardia y metodología propietaria. Nuestra innovación tiene impacto medible en negocio.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: <Heart size={24} />,
    title: "Compromiso con Chile",
    desc: "Creemos en el desarrollo tecnológico nacional. Cada proyecto contribuye a fortalecer el ecosistema de IA en Chile y formar talento local de clase mundial.",
    color: "from-blue-600 to-indigo-600",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Impacto Medible",
    desc: "Nos comprometemos con resultados cuantificables. Generación de valor tangible y ROI demostrable en cada proyecto. Los números hablan por nosotros.",
    color: "from-indigo-600 to-purple-600",
  },
];


interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
  linkedin?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Edison Vásquez",
    role: "CEO & Fundador",
    image: "/team/edison-vasquez.jpg",
    description:
      "Lidera la visión estratégica de JhedAI, impulsando la construcción del ecosistema de IA en Chile. Presidente de la Cámara Chilena de Inteligencia Artificial y promotor de la adopción responsable de IA en la región.",
    linkedin: "https://www.linkedin.com/in/edisonvasquezd/",
  },
  {
    name: "Julio Hofflinger",
    role: "Director de Operaciones",
    image: "/team/Julio_Hofflinger_JhedAI.png",
    description:
      "Ingeniero Forestal (U. de Chile) y diplomado en Hidrógeno Verde (PUC). Director de Operaciones y responsable de la vertical de Computer Vision. Socio Fundador de la Cámara Chilena de IA, integrante de las comisiones AGORA e I+D+i. Professional Scrum Master experto en gobernanza, colaboró en el diseño del estándar de «Auditor de Ética en IA» para ChileValora y el Ministerio de Ciencias.",
    linkedin: "https://www.linkedin.com/in/julio-hofflinger/?locale=es",
  },
  {
    name: "Héctor Vásquez",
    role: "Director de Desarrollo",
    image: "/team/Hector_Vasquez_JhedAI.png",
    description:
      "Director de Desarrollo y gestor en AWS. Especialista en React, Computer Vision y Prompt Engineering. Curioso de nacimiento y entusiasta de la vanguardia tecnológica, lidera la arquitectura de soluciones en la nube y el despliegue de sistemas de inteligencia artificial.",
    linkedin: "",
  },
  {
    name: "Ignacio Rojas",
    role: "Director de Marketing",
    image: "/team/Ignacio_Rojas_JhedAI.png",
    description:
      "Ingeniero civil industrial, estratega de marketing digital e innovación, y consultor de transformación basada en Inteligencia Artificial. Conecta las capacidades técnicas de JhedAI con las necesidades del mercado.",
    linkedin: "https://www.linkedin.com/in/ignacio-rojas-ici/",
  },
];

const NosotrosPage = () => {
  return (
    <>
      <SEOHead
        title="Nosotros | Consultora de Inteligencia Artificial en Chile"
        description="Conoce la historia de JhedAI, la consultora líder en inteligencia artificial aplicada para industria y gobierno en Chile."
        canonical="/nosotros"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "Nosotros - JhedAI",
          description: "Historia y trayectoria de JhedAI",
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "https://jhedai.com" },
          { name: "Nosotros", url: "https://jhedai.com/nosotros" },
        ]}
      />

      <div className="pt-28 pb-24 bg-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-jhedai-primary via-jhedai-primary to-jhedai-secondary py-32 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px]" />
          </div>

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <p className="text-[14px] text-jhedai-secondary font-bold tracking-widest mb-4 text-white/80">
                NOSOTROS
              </p>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Liderando la Transformación de IA en Chile
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                Impulsamos la adopción de inteligencia artificial en la
                industria chilena con soluciones de clase mundial y metodología
                propietaria.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="container mb-32">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-10 rounded-2xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-jhedai-primary to-jhedai-secondary flex items-center justify-center text-white mb-6">
                <Globe size={32} />
              </div>
              <h2 className="text-2xl font-bold text-jhedai-primary mb-4">
                Nuestra Misión
              </h2>
              <p className="text-jhedai-primary/70 leading-relaxed mb-4">
                Democratizar el acceso a soluciones de inteligencia artificial
                de clase mundial para la industria y gobierno chileno,
                impulsando la transformación digital con tecnología de
                vanguardia y metodología propietaria.
              </p>
              <p className="text-jhedai-primary/70 leading-relaxed">
                Nos comprometemos a generar valor tangible en cada proyecto,
                formando talento local y fortaleciendo el ecosistema tecnológico
                nacional.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-10 rounded-2xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-jhedai-secondary to-jhedai-accent flex items-center justify-center text-white mb-6">
                <Lightbulb size={32} />
              </div>
              <h2 className="text-2xl font-bold text-jhedai-primary mb-4">
                Nuestra Visión
              </h2>
              <p className="text-jhedai-primary/70 leading-relaxed mb-4">
                Ser la consultora de referencia en inteligencia artificial para
                América Latina, reconocida por nuestra excelencia técnica,
                metodología innovadora y compromiso con el desarrollo
                tecnológico regional.
              </p>
              <p className="text-jhedai-primary/70 leading-relaxed">
                Aspiramos a posicionar a Chile como un hub de innovación en IA,
                exportando talento y soluciones al mundo entero.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 py-24 mb-32">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-[14px] text-jhedai-secondary font-bold tracking-widest mb-4">
                VALORES
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-jhedai-primary mb-4">
                Lo Que Nos Define
              </h2>
              <p className="text-jhedai-primary/60 text-lg max-w-2xl mx-auto">
                Principios que guían cada proyecto, decisión y relación con
                nuestros clientes.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {valores.map((valor, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Gradient background on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${valor.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-jhedai-primary/10 to-jhedai-secondary/10 flex items-center justify-center text-jhedai-secondary mb-6 group-hover:scale-110 transition-transform duration-300">
                      {valor.icon}
                    </div>
                    <h3 className="text-xl font-bold text-jhedai-primary mb-3">
                      {valor.title}
                    </h3>
                    <p className="text-jhedai-primary/70 leading-relaxed">
                      {valor.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <p className="text-[14px] text-jhedai-secondary font-bold tracking-widest mb-4">
              HISTORIA
            </p>
            <h2 className="text-2xl lg:text-4xl font-bold text-jhedai-primary mb-4">
              Nuestra Trayectoria: Hitos que Definen el Futuro de la IA en Chile
            </h2>
            <p className="text-jhedai-primary/60 text-lg max-w-3xl mx-auto leading-relaxed mb-4">
              JhedAI ha recorrido un camino acelerado de innovación y liderazgo
              en inteligencia artificial aplicada, desde su fundación hasta
              consolidarnos como referente nacional.
            </p>
            <p className="text-jhedai-primary/50 text-base max-w-3xl mx-auto leading-relaxed">
              Esta línea de tiempo destaca los logros clave que posicionan a
              JhedAI como impulsor de la transformación digital para empresas y
              sector público.
            </p>
          </motion.div>

          {/* Timeline Container */}
          <div className="max-w-5xl mx-auto relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-jhedai-secondary via-jhedai-primary to-jhedai-accent transform -translate-x-1/2 hidden lg:block" />

            {/* Milestones */}
            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    x: milestone.position === "left" ? -50 : 50,
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`relative flex items-center gap-8 ${
                    milestone.position === "left"
                      ? "lg:flex-row-reverse lg:text-right"
                      : "lg:flex-row"
                  } flex-col lg:flex-row`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex items-center justify-center z-20">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.1 + 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="w-4 h-4 rounded-full bg-gradient-to-br from-jhedai-secondary to-jhedai-accent ring-8 ring-white shadow-lg"
                    />
                  </div>

                  {/* Spacer */}
                  <div className="hidden lg:block lg:w-[calc(50%-2rem)]" />

                  {/* Card */}
                  <div
                    className={`lg:w-[calc(50%-2rem)] w-full ${
                      milestone.position === "left" ? "lg:pr-12" : "lg:pl-12"
                    }`}
                  >
                    <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-jhedai-neutral/20 hover:border-jhedai-secondary/30 transition-all duration-300">
                      {/* Category Badge */}
                      <div
                        className={`inline-block mb-4 ${
                          milestone.position === "left" ? "lg:ml-auto" : ""
                        }`}
                      >
                        <span className="text-xs bg-gradient-to-r from-jhedai-secondary/10 to-jhedai-primary/10 text-jhedai-secondary px-4 py-2 rounded-full font-bold tracking-wider">
                          {milestone.category}
                        </span>
                      </div>

                      {/* Date */}
                      <p className="text-sm font-bold text-jhedai-accent mb-4">
                        {milestone.date}
                      </p>

                      {/* Icon + Title */}
                      <div
                        className={`flex items-center gap-4 mb-4 ${
                          milestone.position === "left"
                            ? "lg:flex-row-reverse lg:justify-end"
                            : ""
                        }`}
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-jhedai-secondary/20 to-jhedai-primary/20 flex items-center justify-center text-jhedai-secondary shrink-0 group-hover:scale-110 transition-transform duration-300">
                          {milestone.icon}
                        </div>
                        <h3 className="font-bold text-xl text-jhedai-primary group-hover:text-jhedai-secondary transition-colors">
                          {milestone.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-[15px] text-jhedai-primary/70 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="container mt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[14px] text-jhedai-secondary font-bold tracking-widest mb-4">
              NUESTRO EQUIPO
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-jhedai-primary mb-4">
              Conoce a Nuestros Expertos
            </h2>
            <p className="text-jhedai-primary/60 text-lg max-w-2xl mx-auto">
              Un equipo de profesionales apasionados por la inteligencia
              artificial y comprometidos con tu éxito.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {teamMembers.map((member, i) => {
              const CardContent = (
                <div className="bg-white h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-jhedai-neutral/20 hover:border-jhedai-secondary/40 flex flex-col">
                  {/* Photo area */}
                  <div className="relative w-full h-72 overflow-hidden bg-gradient-to-br from-jhedai-primary to-jhedai-secondary">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#003865,#00A9E0);color:white;font-size:3rem;font-weight:700">${member.name.charAt(0)}</div>`;
                        }
                      }}
                    />
                    {/* Subtle bottom edge */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="px-5 pt-3 pb-6 flex flex-col flex-1">
                    <div className="mb-3">
                      <h3 className="text-base font-bold text-jhedai-primary leading-tight group-hover:text-jhedai-secondary transition-colors">
                        {member.name}
                      </h3>
                      <span className="inline-block mt-1.5 text-[12px] font-bold text-jhedai-secondary bg-jhedai-secondary/10 px-2.5 py-0.5 rounded-full">
                        {member.role}
                      </span>
                    </div>
                    <p className="text-[12px] text-jhedai-primary/60 leading-relaxed flex-1">
                      {member.description}
                    </p>
                  </div>
                </div>
              );

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="group w-full sm:w-[calc(50%-12px)] lg:w-[calc(20%-19.2px)]"
                >
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full no-underline"
                    >
                      {CardContent}
                    </a>
                  ) : (
                    CardContent
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}

        <div className="container mt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-jhedai-primary to-jhedai-secondary rounded-3xl p-12 lg:p-16 text-center overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                ¿Listo para Transformar tu Empresa con IA?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Únete a las empresas y organismos que ya confían en nosotros
                para su transformación digital con inteligencia artificial.
              </p>
              <a
                href="/contacto"
                className="inline-block bg-white text-jhedai-primary px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Agenda una Consulta Gratuita
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NosotrosPage;
