import { motion } from "framer-motion";
import { Crosshair, Lightbulb, TrendingUp } from "lucide-react";

const valores = [
  {
    icon: <Crosshair size={20} />,
    title: "Precisión Técnica",
    desc: "Cada solución está diseñada con rigor ingenieril para la complejidad industrial real del mercado chileno.",
  },
  {
    icon: <Lightbulb size={20} />,
    title: "Innovación Aplicada",
    desc: "No perseguimos tendencias, resolvemos problemas reales con tecnología de vanguardia y metodología propietaria.",
  },
  {
    icon: <TrendingUp size={20} />,
    title: "Impacto Medible",
    desc: "Nos comprometemos con resultados cuantificables. Generación de valor tangible y ROI demostrable en cada proyecto.",
  },
];

const NosotrosSimple = () => {
  return (
    <section id="nosotros" className="py-24 relative bg-white">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left - Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <p className="text-[14px] text-jhedai-secondary font-bold tracking-widest mb-4">
              NOSOTROS
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-jhedai-primary mb-6">
              Consultora IA en Chile
            </h2>
            <p className="text-jhedai-primary/60 text-[16px] leading-relaxed mb-4">
              Somos expertos en inteligencia artificial aplicada a la industria
              y el gobierno. Integramos progresivamente soluciones inteligentes
              en las empresas, asegurando una evolución sostenible alineada con
              sus objetivos estratégicos.
            </p>
            <p className="text-jhedai-primary/60 text-[16px] leading-relaxed mb-8">
              Con profundo contexto del mercado nacional y una metodología
              propietaria integral, garantizamos la adopción exitosa de cada
              proyecto. No solo ofrecemos soluciones de IA — entregamos la
              ventaja estratégica que tu empresa necesita para liderar en su
              sector.
            </p>
          </motion.div>

          {/* Right - Values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 space-y-4"
          >
            {valores.map((valor, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.3 }}
                className="group glass-card p-6 flex items-start gap-4 hover:bg-jhedai-primary/[0.02] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-jhedai-secondary/10 flex items-center justify-center text-jhedai-secondary shrink-0 group-hover:bg-jhedai-secondary group-hover:text-white transition-all duration-300">
                  {valor.icon}
                </div>
                <div>
                  <h3 className="font-bold text-jhedai-primary mb-1 group-hover:text-jhedai-secondary transition-colors">
                    {valor.title}
                  </h3>
                  <p className="text-[15px] text-jhedai-primary/60 leading-relaxed">
                    {valor.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NosotrosSimple;
