import { motion } from "framer-motion";
import {
  MessageSquare,
  BrainCircuit,
  FileSearch,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const items = [
  {
    icon: <MessageSquare size={24} />,
    num: "01",
    name: "Agentes Cognitivos",
    desc: "Asistentes de IA soberanos para gestionar bases de conocimiento industrial y automatizar decisiones técnicas 24/7 con integración multicanal.",
    status: "Activo",
  },
  {
    icon: <BrainCircuit size={24} />,
    num: "02",
    name: "Automatización de Procesos",
    desc: "Orquestación de flujos de trabajo críticos mediante agentes que interactúan con tus sistemas internos, ERP y plataformas legacy.",
    status: "Activo",
  },
  {
    icon: <FileSearch size={24} />,
    num: "03",
    name: "Análisis Documental Inteligente",
    desc: "Extracción y procesamiento automático de datos críticos desde documentos legales, técnicos y operativos con NLP avanzado.",
    status: "Activo",
  },
];

const AgentesAutonomos = () => {
  return (
    <section id="ecosistema" className="py-24 relative">
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
              AGENTES AUTÓNOMOS
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Agentes de IA que trabajan por ti
            </h2>
            <p className="text-white/60 text-[16px] leading-relaxed mb-8">
              Despliega agentes especializados que automatizan procesos de
              negocio críticos con autonomía e inteligencia. Integración nativa
              con tus sistemas existentes.
            </p>
            <Link
              to="/contacto"
              className="border-2 border-white/30 text-white px-6 py-2.5 rounded-md font-bold transition-all duration-300 hover:bg-white hover:text-jhedai-primary text-[14px] inline-flex items-center gap-2"
            >
              Ver todos los agentes <ArrowRight size={16} />
            </Link>
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
                className="group bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-2xl p-8 relative overflow-hidden cursor-pointer hover:bg-white/[0.12] hover:-translate-y-1 hover:shadow-lg hover:shadow-jhedai-secondary/10 transition-all duration-300 border-l-4 border-l-transparent hover:border-l-jhedai-secondary"
              >
                {/* Number */}
                <span className="absolute top-4 right-4 text-2xl font-black text-white/10 group-hover:text-jhedai-secondary/30 transition-colors font-mono">
                  {item.num}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-jhedai-secondary/20 flex items-center justify-center text-jhedai-secondary mb-6 group-hover:bg-jhedai-secondary group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>

                {/* Content */}
                <h3 className="font-bold text-lg text-white mb-3 group-hover:text-jhedai-secondary transition-colors">
                  {item.name}
                </h3>
                <p className="text-[15px] text-white/50 leading-relaxed mb-6">
                  {item.desc}
                </p>

                {/* Status */}
                <div className="flex items-center gap-2 text-xs font-semibold text-white/30">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  {item.status}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentesAutonomos;
