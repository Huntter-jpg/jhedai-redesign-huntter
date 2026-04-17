import { motion } from "framer-motion";
import {
  Target,
  GraduationCap,
  TrendingUp,
  Cpu,
  Brain,
  Eye,
  MessageSquare,
  CheckCircle2,
  FlaskConical,
  Bot,
  Zap,
  PieChart,
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import { BreadcrumbSchema } from "../components/schemas/BreadcrumbSchema";

interface Phase {
  num: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: { label: string; text: string }[];
  closing?: string;
}

const phases: Phase[] = [
  {
    num: "01",
    icon: <Target size={28} />,
    title: "Diagnóstico Estratégico de IA",
    description:
      "El primer paso de nuestra consultoría de Inteligencia Artificial consiste en un diagnóstico de madurez de IA, diseñado para evaluar el estado actual de la empresa en términos de:",
    bullets: [
      {
        label: "Talento humano",
        text: "Nivel de conocimientos y habilidades en IA.",
      },
      {
        label: "Infraestructura tecnológica",
        text: "Disponibilidad y capacidad de hardware y software para IA.",
      },
      {
        label: "Gestión y calidad de datos",
        text: "Evaluación de datos disponibles para la implementación de IA.",
      },
      {
        label: "Implementación de IA",
        text: "Uso actual y potencial de IA en los procesos de negocio.",
      },
    ],
    closing:
      "Tras la evaluación, se entrega un informe ejecutivo con un análisis de brechas, oportunidades y un plan estratégico de implementación basado en benchmarking sectorial.",
  },
  {
    num: "02",
    icon: <GraduationCap size={28} />,
    title: "Capacitación y Transferencia de Conocimiento",
    description:
      "Para garantizar una integración efectiva de IA, ofrecemos programas de formación en IA adaptados a las necesidades empresariales, abordando fundamentos, IA generativa y casos de uso en la industria.",
    bullets: [
      {
        label: "Seminarios y conferencias",
        text: "Estratégicas para la alta dirección.",
      },
      {
        label: "Talleres prácticos",
        text: "Con simulaciones de IA en procesos de negocio.",
      },
      {
        label: "Cursos especializados",
        text: "Con módulos progresivos adaptados a distintos niveles de conocimiento.",
      },
    ],
    closing:
      "Al finalizar esta fase, se realizará un levantamiento de oportunidades de mejora y se establecerán KPIs para medir el impacto de la capacitación en la organización.",
  },
  {
    num: "03",
    icon: <TrendingUp size={28} />,
    title: "Identificación de Oportunidades y KPI",
    description:
      "Una vez que el equipo ha sido capacitado, se procede a identificar las áreas de mayor impacto y definir métricas de éxito:",
    bullets: [
      {
        label: "Áreas clave de impacto",
        text: "Análisis de dónde la IA puede generar mayor valor.",
      },
      {
        label: "Métricas de éxito y KPIs",
        text: "Para medir eficiencia, reducción de costos y mejora en la toma de decisiones.",
      },
      {
        label: "Roadmap de implementación",
        text: "Escalonado con entregables medibles en cada fase.",
      },
    ],
  },
  {
    num: "04",
    icon: <Cpu size={28} />,
    title: "Implementación de Soluciones con IA",
    description:
      "Las oportunidades detectadas en la fase anterior se convierten en soluciones prácticas mediante nuestras líneas de acción especializadas.",
    bullets: [],
  },
];

const solutions = [
  {
    icon: <Brain size={32} />,
    title: "Análisis de Datos y Machine Learning",
    gradient: "from-blue-500 to-cyan-500",
    items: [
      "Implementación de modelos predictivos para optimización de recursos.",
      "Uso de machine learning en toma de decisiones estratégicas.",
    ],
  },
  {
    icon: <Eye size={32} />,
    title: "Computer Vision",
    gradient: "from-cyan-500 to-blue-600",
    items: [
      "Automatización de control de calidad mediante visión por computadora.",
      "Uso de reconocimiento visual para procesos de seguridad y monitoreo.",
    ],
  },
  {
    icon: <MessageSquare size={32} />,
    title: "IA Conversacional y NLP",
    gradient: "from-blue-600 to-indigo-600",
    items: [
      "Chatbots y asistentes virtuales adaptados a procesos de negocio.",
      "Análisis de sentimiento y reputación de marca en tiempo real.",
    ],
  },
  {
    icon: <Bot size={32} />,
    title: "Agentes Autónomos",
    gradient: "from-indigo-500 to-purple-600",
    items: [
      "Diseño de agentes autónomos capaces de ejecutar flujos de trabajo complejos.",
      "Integración de flujos inteligentes en sistemas empresariales existentes.",
    ],
  },
  {
    icon: <Zap size={32} />,
    title: "Automatización Inteligente",
    gradient: "from-violet-500 to-fuchsia-600",
    items: [
      "Automatización inteligente de procesos operativos con IA generativa.",
      "Orquestación de flujos de trabajo entre múltiples sistemas y plataformas.",
    ],
  },
  {
    icon: <PieChart size={32} />,
    title: "Business Intelligence",
    gradient: "from-green-500 to-emerald-500",
    items: [
      "Dashboards ejecutivos y reportería automatizada en tiempo real.",
      "Analítica avanzada para toma de decisiones basada en datos.",
    ],
  },
  {
    icon: <FlaskConical size={32} />,
    title: "I+D y Laboratorio de Innovación",
    gradient: "from-purple-500 to-pink-500",
    items: [
      "Investigación aplicada para desarrollar soluciones IA de vanguardia.",
      "Prototipado rápido y validación de conceptos en entornos controlados.",
    ],
  },
];

const MetodologiaPage = () => {
  return (
    <>
      <SEOHead
        title="Metodología Introgresiva | Consultoría IA Chile - JhedAI"
        description="Conoce nuestra metodología Introgresiva: un enfoque integral de 4 fases para la adopción de Inteligencia Artificial en tu empresa. Diagnóstico, capacitación, KPIs e implementación."
        canonical="/metodologia"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Metodología Introgresiva - JhedAI",
          description:
            "Enfoque integral para la adopción de Inteligencia Artificial",
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "https://jhedai.com" },
          { name: "Metodologia", url: "https://jhedai.com/metodologia" },
        ]}
      />

      <div className="pt-28 pb-24 bg-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-jhedai-primary via-jhedai-primary to-jhedai-secondary py-32 overflow-hidden">
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
              <p className="text-[14px] text-white/80 font-bold tracking-widest mb-4">
                METODOLOGIA
              </p>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Nuestros Servicios
              </h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                La transformaci&oacute;n digital es clave para la
                innovaci&oacute;n y eficiencia empresarial, y la Inteligencia
                Artificial redefine la operaci&oacute;n y toma de decisiones.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Diagrama del Tril de Metodología */}
        <div className="container py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-[14px] text-jhedai-secondary font-bold tracking-widest mb-4">
              METODOLOG&Iacute;A INTROGRESIVA
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-jhedai-primary mb-4">
              Un enfoque integral para la adopci&oacute;n de Inteligencia
              Artificial
            </h2>
            <p className="text-lg text-jhedai-primary/70 leading-relaxed max-w-3xl mx-auto">
              Nuestra propuesta facilita su adopci&oacute;n con un enfoque
              integral, asegurando una transici&oacute;n eficiente y
              convirti&eacute;ndola en un diferenciador estrat&eacute;gico.
            </p>
          </motion.div>

          {/* Tril Diagram - Visual Triangle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto mb-16"
          >
            <div className="relative bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-3xl p-8 lg:p-12 border border-jhedai-neutral/20">
              <svg
                viewBox="0 0 600 480"
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Triangle outline */}
                <motion.path
                  d="M300 60 L520 400 L80 400 Z"
                  fill="none"
                  stroke="url(#trilGradient)"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                />

                {/* Inner connecting lines */}
                <motion.line
                  x1="300" y1="60" x2="300" y2="400"
                  stroke="#00A9E0" strokeWidth="1" strokeDasharray="6 4" opacity="0.3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
                <motion.line
                  x1="190" y1="230" x2="410" y2="230"
                  stroke="#00A9E0" strokeWidth="1" strokeDasharray="6 4" opacity="0.3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 1 }}
                />

                {/* Gradient def */}
                <defs>
                  <linearGradient id="trilGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#003865" />
                    <stop offset="50%" stopColor="#00A9E0" />
                    <stop offset="100%" stopColor="#FF585D" />
                  </linearGradient>
                </defs>

                {/* Phase 1 - Top (Diagnóstico) */}
                <motion.g
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <circle cx="300" cy="60" r="32" fill="#003865" />
                  <text x="300" y="56" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">01</text>
                  <text x="300" y="70" textAnchor="middle" fill="white" fontSize="7" fontWeight="500">DIAGNÓSTICO</text>
                  <text x="300" y="110" textAnchor="middle" fill="#003865" fontSize="11" fontWeight="600">Diagnóstico</text>
                  <text x="300" y="124" textAnchor="middle" fill="#003865" fontSize="11" fontWeight="600">Estratégico</text>
                </motion.g>

                {/* Phase 2 - Left middle (Capacitación) */}
                <motion.g
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  <circle cx="160" cy="300" r="32" fill="#00A9E0" />
                  <text x="160" y="296" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">02</text>
                  <text x="160" y="310" textAnchor="middle" fill="white" fontSize="6.5" fontWeight="500">CAPACITACIÓN</text>
                  <text x="90" y="350" textAnchor="middle" fill="#003865" fontSize="11" fontWeight="600">Capacitación y</text>
                  <text x="90" y="364" textAnchor="middle" fill="#003865" fontSize="11" fontWeight="600">Transferencia</text>
                </motion.g>

                {/* Phase 3 - Right middle (KPIs) */}
                <motion.g
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 }}
                >
                  <circle cx="440" cy="300" r="32" fill="#00A9E0" />
                  <text x="440" y="296" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">03</text>
                  <text x="440" y="310" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="500">KPIs</text>
                  <text x="510" y="350" textAnchor="middle" fill="#003865" fontSize="11" fontWeight="600">Oportunidades</text>
                  <text x="510" y="364" textAnchor="middle" fill="#003865" fontSize="11" fontWeight="600">y KPI</text>
                </motion.g>

                {/* Phase 4 - Bottom center (Implementación) */}
                <motion.g
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.1 }}
                >
                  <circle cx="300" cy="400" r="32" fill="#FF585D" />
                  <text x="300" y="395" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">04</text>
                  <text x="300" y="409" textAnchor="middle" fill="white" fontSize="6" fontWeight="500">IMPLEMENTACIÓN</text>
                  <text x="300" y="450" textAnchor="middle" fill="#003865" fontSize="11" fontWeight="600">Implementación</text>
                  <text x="300" y="464" textAnchor="middle" fill="#003865" fontSize="11" fontWeight="600">de Soluciones</text>
                </motion.g>

                {/* Center label */}
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.3 }}
                >
                  <text x="300" y="220" textAnchor="middle" fill="#00A9E0" fontSize="10" fontWeight="700" letterSpacing="3">METODOLOGÍA</text>
                  <text x="300" y="240" textAnchor="middle" fill="#003865" fontSize="14" fontWeight="800">INTROGRESIVA</text>
                </motion.g>
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Gráfica de Metodología */}
        <div className="container pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <img
              src="/grafica_metodologia.jpg"
              alt="Gráfica de la Metodología Introgresiva de JhedAI"
              className="w-full h-auto rounded-2xl shadow-lg border border-jhedai-neutral/20"
            />
          </motion.div>
        </div>

        {/* Phases */}
        {phases.map((phase, i) => (
          <div
            key={phase.num}
            className={
              i % 2 === 1
                ? "bg-gradient-to-br from-gray-50 to-blue-50/30 py-20"
                : "py-20"
            }
          >
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                {/* Phase Header */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-jhedai-primary to-jhedai-secondary flex items-center justify-center text-white shrink-0">
                    {phase.icon}
                  </div>
                  <div>
                    <span className="text-sm font-bold text-jhedai-secondary tracking-wider">
                      FASE {phase.num}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-bold text-jhedai-primary">
                      {phase.title}
                    </h3>
                  </div>
                </div>

                {/* Phase Description */}
                <p className="text-jhedai-primary/70 text-lg leading-relaxed mb-8">
                  {phase.description}
                </p>

                {/* Bullets */}
                {phase.bullets.length > 0 && (
                  <div className="space-y-4 mb-8">
                    {phase.bullets.map((bullet, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: j * 0.1, duration: 0.5 }}
                        className="flex items-start gap-4"
                      >
                        <div className="w-6 h-6 rounded-full bg-jhedai-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2
                            size={14}
                            className="text-jhedai-secondary"
                          />
                        </div>
                        <p className="text-jhedai-primary/70 leading-relaxed">
                          <span className="font-bold text-jhedai-primary">
                            {bullet.label}:
                          </span>{" "}
                          {bullet.text}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Closing text */}
                {phase.closing && (
                  <div className="bg-white border border-jhedai-neutral/20 rounded-2xl p-6">
                    <p className="text-jhedai-primary/70 leading-relaxed">
                      {phase.closing}
                    </p>
                  </div>
                )}

                {/* Phase 4: Solutions Grid */}
                {phase.num === "04" && (
                  <div className="flex flex-wrap justify-center gap-6 mt-8">
                    {solutions.map((sol, k) => (
                      <motion.div
                        key={k}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: k * 0.1 }}
                        className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-jhedai-neutral/20 hover:border-jhedai-secondary/30 transition-all duration-300 overflow-hidden w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${sol.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                        />

                        <div className="relative z-10">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-jhedai-primary/10 to-jhedai-secondary/10 flex items-center justify-center text-jhedai-secondary mb-6 group-hover:scale-110 transition-transform duration-300">
                            {sol.icon}
                          </div>
                          <h4 className="text-lg font-bold text-jhedai-primary mb-4 group-hover:text-jhedai-secondary transition-colors">
                            {sol.title}
                          </h4>
                          <ul className="space-y-3">
                            {sol.items.map((item, m) => (
                              <li
                                key={m}
                                className="flex items-start gap-3 text-[15px] text-jhedai-primary/60 leading-relaxed"
                              >
                                <CheckCircle2
                                  size={14}
                                  className="text-jhedai-secondary shrink-0 mt-1"
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Phase 4: Closing */}
                {phase.num === "04" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-jhedai-primary/70 leading-relaxed mt-8 text-center italic"
                  >
                    Cada soluci&oacute;n ser&aacute; dise&ntilde;ada a la medida
                    de la empresa y alineada con sus objetivos
                    estrat&eacute;gicos.
                  </motion.p>
                )}
              </motion.div>
            </div>
          </div>
        ))}

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
                &iquest;Listo para Implementar IA en tu Empresa?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Comienza con un diagn&oacute;stico gratuito y descubre
                c&oacute;mo nuestra metodolog&iacute;a Introgresiva puede
                transformar tu negocio.
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

export default MetodologiaPage;
