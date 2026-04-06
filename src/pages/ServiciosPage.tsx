import { motion } from "framer-motion";
import {
  BarChart3,
  Brain,
  PieChart,
  MessageSquare,
  Eye,
  Workflow,
  FlaskConical,
  ShoppingCart,
  GraduationCap,
  ExternalLink,
  Database,
  Cpu,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import { BreadcrumbSchema } from "../components/schemas/BreadcrumbSchema";
import { ServiceSchema } from "../components/schemas/ServiceSchema";
import ServiceFlowDiagram from "../components/ServiceFlowDiagram";

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  benefits: string[];
  gradient: string;
  category: string;
  flowType: "linear" | "branching" | "circular" | "hierarchical";
}

const services: Service[] = [
  {
    id: "analisis-datos",
    icon: <BarChart3 size={48} strokeWidth={1.5} />,
    title: "Análisis de Datos",
    desc: "Transformamos datos brutos en insights accionables mediante análisis estadístico avanzado, minería de datos y modelado predictivo que impulsa decisiones estratégicas.",
    benefits: [
      "Dashboards interactivos en tiempo real",
      "Detección automática de patrones",
      "Modelado estadístico avanzado",
      "Visualización de datos complejos",
    ],
    gradient: "from-blue-500 via-cyan-500 to-blue-600",
    category: "Data",
    flowType: "linear",
  },
  {
    id: "machine-learning",
    icon: <Brain size={48} strokeWidth={1.5} />,
    title: "Machine Learning",
    desc: "Desarrollo de modelos de ML personalizados para clasificación, regresión, clustering y forecasting con aprendizaje supervisado y no supervisado de última generación.",
    benefits: [
      "Modelos predictivos de alta precisión",
      "Sistemas de recomendación",
      "Detección de anomalías",
      "AutoML y optimización",
    ],
    gradient: "from-purple-500 via-pink-500 to-red-500",
    category: "AI",
    flowType: "branching",
  },
  {
    id: "business-intelligence",
    icon: <PieChart size={48} strokeWidth={1.5} />,
    title: "Business Intelligence",
    desc: "Soluciones empresariales de BI con reporting interactivo, seguimiento de KPIs en tiempo real y analítica estratégica para liderazgo basado en datos.",
    benefits: [
      "Dashboards ejecutivos personalizados",
      "Reporting automatizado",
      "Data warehousing y ETL",
      "Analítica self-service",
    ],
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    category: "Data",
    flowType: "circular",
  },
  {
    id: "nlp",
    icon: <MessageSquare size={48} strokeWidth={1.5} />,
    title: "Procesamiento de Lenguaje Natural",
    desc: "Análisis avanzado de texto, detección de sentimiento, extracción de entidades y desarrollo de IA conversacional usando transformers y LLMs de última generación.",
    benefits: [
      "Clasificación de texto multilingüe",
      "Análisis de sentimiento",
      "Extracción de entidades",
      "Chatbots y asistentes virtuales",
    ],
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    category: "AI",
    flowType: "linear",
  },
  {
    id: "computer-vision",
    icon: <Eye size={48} strokeWidth={1.5} />,
    title: "Computer Vision",
    desc: "Reconocimiento de imágenes, detección de objetos, control de calidad visual y sistemas de inspección automatizada para industria y retail.",
    benefits: [
      "Detección y tracking de objetos",
      "Clasificación de imágenes CNN",
      "Inspección de calidad",
      "Reconocimiento facial",
    ],
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    category: "AI",
    flowType: "hierarchical",
  },
  {
    id: "automatizaciones",
    icon: <Workflow size={48} strokeWidth={1.5} />,
    title: "Automatizaciones y Agentes",
    desc: "Desarrollo de agentes autónomos de IA y automatización de workflows para optimización de procesos de negocio y orquestación inteligente de tareas complejas.",
    benefits: [
      "RPA con inteligencia artificial",
      "Agentes autónomos multi-objetivo",
      "Optimización de procesos",
      "Integración con sistemas legacy",
    ],
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    category: "Automation",
    flowType: "branching",
  },
  {
    id: "data-science",
    icon: <FlaskConical size={48} strokeWidth={1.5} />,
    title: "Data Science",
    desc: "Ciclo completo de data science desde formulación de hipótesis hasta deployment en producción, incluyendo experimentación rigurosa y validación de modelos.",
    benefits: [
      "Testing estadístico de hipótesis",
      "Feature engineering automatizado",
      "Experimentación y A/B testing",
      "MLOps y deployment continuo",
    ],
    gradient: "from-rose-500 via-red-500 to-orange-500",
    category: "Data",
    flowType: "circular",
  },
];

const externalPlatforms = [
  {
    name: "Marketplace de Agentes",
    desc: "Explora nuestro catálogo de agentes autónomos listos para implementar",
    icon: <ShoppingCart size={28} />,
    url: "#",
    badge: "Ecosistema",
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    name: "Academia JhedAI",
    desc: "Certificaciones ChileValora y capacitaciones técnicas especializadas",
    icon: <GraduationCap size={28} />,
    url: "#",
    badge: "Formación",
    gradient: "from-purple-600 to-pink-600",
  },
  {
    name: "Visión Industrial",
    desc: "Soluciones completas de computer vision para la industria",
    icon: <Eye size={28} />,
    url: "#",
    badge: "Ecosistema",
    gradient: "from-orange-600 to-red-600",
  },
];

const pillars = [
  {
    icon: <Database size={32} />,
    title: "Data-Driven",
    desc: "Decisiones basadas en datos verificables",
  },
  {
    icon: <Cpu size={32} />,
    title: "IA Avanzada",
    desc: "Tecnologías de última generación",
  },
  {
    icon: <Sparkles size={32} />,
    title: "Innovación",
    desc: "Metodología propietaria comprobada",
  },
  {
    icon: <TrendingUp size={32} />,
    title: "Resultados",
    desc: "ROI medible desde el día uno",
  },
];

const ServiciosPage = () => {
  return (
    <>
      <SEOHead
        title="Servicios de IA | Machine Learning, NLP, Computer Vision"
        description="Soluciones tecnológicas de inteligencia artificial: análisis de datos, machine learning, business intelligence, NLP, computer vision, automatización y data science."
        canonical="/servicios"
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "https://jhedai.com" },
          { name: "Servicios", url: "https://jhedai.com/servicios" },
        ]}
      />
      <ServiceSchema />

      <div className="pt-28 pb-24 bg-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-jhedai-primary via-jhedai-primary to-jhedai-secondary py-24 overflow-hidden mb-16">
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
                SERVICIOS
              </p>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Tecnologías de Inteligencia Artificial
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                Tecnologías avanzadas de IA para transformar datos en valor
                estratégico.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container">
          {/* Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-24"
          >
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="group text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50/30 border border-jhedai-neutral/20 hover:border-jhedai-secondary/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-jhedai-secondary/10 to-jhedai-primary/5 flex items-center justify-center text-jhedai-secondary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  {pillar.icon}
                </div>
                <h3 className="font-bold text-jhedai-primary mb-1 text-sm">
                  {pillar.title}
                </h3>
                <p className="text-xs text-jhedai-primary/60">{pillar.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Services - Zigzag Layout */}
          <div className="mb-24 space-y-40">
            {services.map((service, i) => {
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className={`flex flex-col ${
                    isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-16 items-start`}
                >
                  {/* Content Side */}
                  <div className="lg:w-5/12 space-y-8">
                    <div>
                      <span className="inline-block text-xs font-bold tracking-widest text-jhedai-secondary mb-3 bg-jhedai-secondary/10 px-3 py-1 rounded-full">
                        {service.category}
                      </span>
                      <div
                        className={`flex items-center gap-4 mb-4 ${!isLeft ? "lg:flex-row-reverse" : ""}`}
                      >
                        <div
                          className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white shadow-xl shrink-0`}
                        >
                          {service.icon}
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-jhedai-primary">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-lg text-jhedai-primary/70 leading-relaxed">
                      {service.desc}
                    </p>

                    <div className="space-y-4">
                      {service.benefits.map((benefit, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 + 0.3 }}
                          className="flex items-start gap-3 group"
                        >
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-jhedai-secondary to-jhedai-primary shrink-0 group-hover:scale-150 transition-transform mt-2" />
                          <span className="text-jhedai-primary/80 group-hover:text-jhedai-primary transition-colors leading-relaxed">
                            {benefit}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Flow Diagram Side */}
                  <div className="lg:w-7/12 w-full">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-jhedai-primary/5 to-jhedai-secondary/5 rounded-3xl blur-2xl" />
                      <div className="relative glass-card p-12 lg:p-16 rounded-3xl border-2 border-jhedai-neutral/20 bg-white/80 backdrop-blur-sm min-h-[400px] flex items-center justify-center">
                        <ServiceFlowDiagram
                          type={service.flowType}
                          gradient={service.gradient}
                        />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* External Platforms Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-[14px] text-jhedai-secondary font-bold tracking-widest mb-4">
              ECOSISTEMA
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-jhedai-primary mb-4">
              Explora Nuestras Plataformas
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-24">
            {externalPlatforms.map((platform, i) => (
              <motion.a
                key={i}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative bg-white rounded-2xl overflow-hidden border border-jhedai-neutral/20 hover:border-jhedai-secondary/30 hover:shadow-2xl transition-all duration-300 block"
              >
                <div
                  className={`h-32 bg-gradient-to-br ${platform.gradient} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:16px_16px]" />
                  <div className="absolute top-4 right-4">
                    <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full font-bold">
                      {platform.badge}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {platform.icon}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-lg text-jhedai-primary mb-2 group-hover:text-jhedai-secondary transition-colors">
                    {platform.name}
                  </h3>
                  <p className="text-[14px] text-jhedai-primary/60 leading-relaxed mb-4">
                    {platform.desc}
                  </p>

                  <div className="flex items-center gap-2 text-[13px] font-semibold text-jhedai-secondary">
                    Visitar plataforma
                    <ExternalLink
                      size={14}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-jhedai-primary to-jhedai-secondary rounded-3xl p-12 lg:p-16 text-center overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                ¿Listo para Transformar tu Empresa?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Agenda una consulta gratuita y descubre cómo nuestras soluciones
                de IA pueden impulsar tu negocio.
              </p>
              <Link
                to="/contacto"
                className="inline-block bg-white text-jhedai-primary px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Agendar Consulta Gratuita
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ServiciosPage;
