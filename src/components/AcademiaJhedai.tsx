import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";


const levelColors: Record<string, string> = {
  Certificación: "bg-white/10 text-white",
  Empresarial: "bg-jhedai-secondary/20 text-jhedai-secondary",
  Técnico: "bg-jhedai-accent/20 text-jhedai-accent",
};

const borderColors: Record<string, string> = {
  Certificación: "border-jhedai-primary",
  Empresarial: "border-jhedai-secondary",
  Técnico: "border-jhedai-accent",
};

const items = [
  {
    name: "Certificación ChileValora",
    desc: "Certificación oficial en 5 perfiles de IA reconocidos por el Estado. Primera empresa certificadora en Chile.",
    level: "Certificación",
    audience: "Profesionales",
  },
  {
    name: "Fundamentos y Estrategia IA",
    desc: "Visión estratégica de la IA, fundamentos de Machine Learning e IA Generativa aplicada al negocio.",
    level: "Empresarial",
    audience: "Líderes y equipos",
  },
  {
    name: "Talleres Técnicos Aplicados",
    desc: "IA Generativa, Machine Learning, análisis de datos y automatización con casos prácticos empresariales.",
    level: "Técnico",
    audience: "Equipos técnicos",
  },
];

const AcademiaJhedai = () => {
  return (
    <section className="py-24 relative">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/3 lg:sticky lg:top-32 lg:self-start"
          >
            <p className="text-[14px] text-jhedai-secondary font-bold tracking-widest mb-3">
              ACADEMIA JHEDAI
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Formación especializada en IA
            </h2>
            <p className="text-white/60 text-[16px] leading-relaxed mb-8">
              Capacitación empresarial en IA con certificación oficial y
              programas a medida para tu organización.
            </p>
            <a
              href="https://academy.jhedai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white/30 text-white px-6 py-2.5 rounded-md font-bold transition-all duration-300 hover:bg-white hover:text-jhedai-primary text-[14px] inline-flex items-center gap-2"
            >
              Ver catálogo completo <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Right - Cards */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`group bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:bg-white/[0.12] hover:-translate-y-1 hover:shadow-lg hover:shadow-jhedai-secondary/10 transition-all duration-300 border-t-4 ${borderColors[item.level]}`}
              >
                <div className="p-8">
                  {/* Level badge */}
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-6 ${levelColors[item.level]}`}
                  >
                    {item.level}
                  </span>

                  {/* Content */}
                  <h3 className="font-bold text-lg text-white mb-3 group-hover:text-jhedai-secondary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[15px] text-white/50 leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-xs text-white/40 font-medium">
                    <span className="inline-flex items-center gap-1">
                      <Users size={12} />
                      {item.audience}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademiaJhedai;
