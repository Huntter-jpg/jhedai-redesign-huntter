import { motion } from "framer-motion";
import { Cpu, FlaskConical, Microscope, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const pillars = [
  {
    icon: <Cpu size={24} />,
    num: "01",
    name: "Entrenamiento y Fine-tuning",
    desc: "Entrenamos y afinamos modelos de IA adaptados a tus datos operativos y contexto de negocio. Desde LLMs especializados hasta modelos de visión custom.",
  },
  {
    icon: <FlaskConical size={24} />,
    num: "02",
    name: "Prototipado y Validación",
    desc: "Prototipamos y validamos hipótesis de IA en ciclos cortos con datos reales antes de escalar a producción. Reducimos riesgo de implementación.",
  },
  {
    icon: <Microscope size={24} />,
    num: "03",
    name: "Investigación Aplicada",
    desc: "Exploramos fronteras tecnológicas para resolver desafíos que aún no tienen solución estándar. Redes neuronales profundas, arquitecturas transformer y más.",
  },
];

const DeepLab = () => {
  return (
    <section className="py-24 relative">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[14px] text-jhedai-secondary font-bold tracking-widest mb-4">
            DEEPLAB
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Investigación, desarrollo y experimentación IA
          </h2>
          <p className="text-white/60 text-[16px] max-w-3xl mx-auto leading-relaxed">
            Tu desafío es nuestro punto de partida. Desarrollamos, entrenamos y
            afinamos modelos de inteligencia artificial a medida para resolver
            problemas que aún no tienen solución.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="group bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-2xl p-8 relative overflow-hidden cursor-pointer hover:bg-white/[0.12] hover:-translate-y-1 hover:shadow-lg hover:shadow-jhedai-secondary/10 transition-all duration-300 border-l-4 border-l-transparent hover:border-l-jhedai-secondary"
            >
              {/* Number */}
              <span className="absolute top-4 right-4 text-2xl font-black text-white/10 group-hover:text-jhedai-secondary/30 transition-colors font-mono">
                {pillar.num}
              </span>

              <div className="w-12 h-12 rounded-xl bg-jhedai-secondary/20 flex items-center justify-center text-jhedai-secondary mb-6 group-hover:bg-jhedai-secondary group-hover:text-white transition-all duration-300">
                {pillar.icon}
              </div>
              <h3 className="font-bold text-lg text-white mb-3 group-hover:text-jhedai-secondary transition-colors">
                {pillar.name}
              </h3>
              <p className="text-[15px] text-white/50 leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <Link
            to="/contacto"
            className="border-2 border-white/30 text-white px-6 py-2.5 rounded-md font-bold transition-all duration-300 hover:bg-white hover:text-jhedai-primary text-[14px] inline-flex items-center gap-2"
          >
            Agendar consulta DeepLab <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default DeepLab;
