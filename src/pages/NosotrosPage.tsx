import { useState, useEffect } from "react";
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
  UserPlus,
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import { getTeamMembers, type TeamMember } from "../lib/api";

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
    date: "2022",
    title: "Fundación de JhedAI",
    description:
      "Inicio de operaciones como consultora especializada en IA aplicada para industria y gobierno en Chile. Nos establecimos con la misión de democratizar el acceso a soluciones de inteligencia artificial de clase mundial.",
    icon: <Rocket size={20} />,
    category: "Fundación",
    position: "right",
  },
  {
    date: "2023",
    title: "Lanzamiento DeepLab",
    description:
      "Creación del programa DeepLab, nuestra metodología propietaria para diagnóstico, capacitación y soluciones integrales de IA. Este programa marca un hito en nuestra capacidad de entregar proyectos end-to-end.",
    icon: <Lightbulb size={20} />,
    category: "Producto",
    position: "left",
  },
  {
    date: "2024",
    title: "Academia JhedAI",
    description:
      "Inicio de programas de capacitación certificados por ChileValora en Machine Learning, NLP y Computer Vision. Nos convertimos en la primera certificadora oficial de perfiles de IA reconocidos por el Estado de Chile.",
    icon: <GraduationCap size={20} />,
    category: "Formación",
    position: "right",
  },
  {
    date: "Febrero 2025",
    title: "Cámara Chilena de Inteligencia Artificial (CCHIA)",
    description:
      "Participación protagonista en la fundación de CCHIA, impulsando la regulación y desarrollo ético de IA en Chile. Este hito consolida nuestro liderazgo en la industria nacional de inteligencia artificial.",
    icon: <Award size={20} />,
    category: "Reconocimiento",
    position: "left",
  },
  {
    date: "Diciembre 2025",
    title: "Centro de Supercómputo e IA Aplicada (CSIIA)",
    description:
      "Protagonistas en la creación del CSIIA, fortaleciendo la investigación y capacidad computacional para IA en Chile. Este centro marca un antes y después en la infraestructura de IA del país.",
    icon: <Cpu size={20} />,
    category: "Infraestructura",
    position: "right",
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

const stats = [
  {
    value: "100+",
    label: "Proyectos Completados",
    icon: <Building2 size={20} />,
  },
  { value: "50+", label: "Empresas Atendidas", icon: <Users size={20} /> },
  { value: "3", label: "Años de Experiencia", icon: <Award size={20} /> },
  {
    value: "1ra",
    label: "Certificadora ChileValora IA",
    icon: <GraduationCap size={20} />,
  },
];

const NosotrosPage = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(true);

  useEffect(() => {
    getTeamMembers()
      .then(setTeamMembers)
      .finally(() => setLoadingTeam(false));
  }, []);

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
                Desde 2022, impulsamos la adopción de inteligencia artificial en
                la industria chilena con soluciones de clase mundial y
                metodología propietaria.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="relative -mt-16 mb-24">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-xl border border-jhedai-neutral/20 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-jhedai-secondary/10 flex items-center justify-center text-jhedai-secondary mx-auto mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-jhedai-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-jhedai-primary/60">
                    {stat.label}
                  </div>
                </div>
              ))}
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
              TRAYECTORIA
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-jhedai-primary mb-4">
              Nuestro Recorrido
            </h2>
            <p className="text-jhedai-primary/60 text-lg max-w-3xl mx-auto leading-relaxed">
              Desde nuestra fundación, hemos marcado hitos clave que definen
              nuestra evolución como líderes en inteligencia artificial aplicada
              en Chile.
            </p>
          </motion.div>

          {/* Timeline Container */}
          <div className="max-w-5xl mx-auto relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-jhedai-secondary via-jhedai-primary to-jhedai-accent transform -translate-x-1/2 hidden lg:block" />

            {/* Milestones */}
            <div className="space-y-16">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    x: milestone.position === "left" ? -50 : 50,
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
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
                        delay: i * 0.15 + 0.3,
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loadingTeam
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 animate-pulse"
                  >
                    <div className="w-full h-52 bg-gray-200" />
                    <div className="px-5 pt-4 pb-6 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                      <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto" />
                      <div className="h-3 bg-gray-100 rounded w-full" />
                      <div className="h-3 bg-gray-100 rounded w-5/6 mx-auto" />
                      <div className="h-8 bg-gray-200 rounded-full mt-4" />
                    </div>
                  </div>
                ))
              : teamMembers.map((member, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-jhedai-secondary/40">
                      {/* Photo area - full width with wave bottom */}
                      <div className="relative w-full h-52 overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#0a1628,#00b4d8);color:white;font-size:3rem;font-weight:700">${member.name.charAt(0)}</div>`;
                            }
                          }}
                        />
                        {/* Wave SVG overlay */}
                        <div className="absolute bottom-0 left-0 w-full">
                          <svg
                            viewBox="0 0 400 40"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full"
                            style={{ display: "block" }}
                          >
                            <path
                              d="M0,20 C100,40 300,0 400,20 L400,40 L0,40 Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="px-5 pt-4 pb-6 text-center">
                        <h3 className="text-[15px] font-bold text-jhedai-primary leading-tight group-hover:text-jhedai-secondary transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-[13px] text-jhedai-secondary font-medium mt-0.5 mb-3 leading-tight">
                          {member.role}
                        </p>
                        <p className="text-[12px] text-jhedai-primary/60 leading-relaxed border-t border-gray-100 pt-3 mb-4">
                          {member.description}
                        </p>

                        {/* Connect button */}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-full border-2 border-jhedai-primary/80 text-jhedai-primary text-[13px] font-semibold hover:bg-jhedai-primary hover:text-white transition-all duration-200"
                          >
                            <UserPlus size={14} />
                            Conectar
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
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
                Únete a las +50 empresas que ya confían en nosotros para su
                transformación digital con inteligencia artificial.
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
