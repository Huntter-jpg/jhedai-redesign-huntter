import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Assessment = () => {
  return (
    <section id="assessment" className="py-32 relative bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-jhedai-primary" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-jhedai-secondary/[0.2] to-transparent rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-jhedai-accent/[0.1] to-transparent rounded-full blur-[100px]" />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

          <div className="relative z-10 px-8 py-20 lg:px-20 lg:py-28 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[14px] font-bold text-white mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-jhedai-secondary animate-pulse" />
              Assessment Gratuito
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              ¿Qué tan lista está tu empresa
              <br />
              para el próximo nivel?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-white/70 text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Realiza nuestro Assessment de Madurez de IA y obtén un diagnóstico
              profesional sobre tu arquitectura de datos y potencial de
              innovación.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <button className="group bg-jhedai-primary text-white px-8 py-3.5 rounded-lg font-bold text-[16px] hover:brightness-125 transition-all inline-flex items-center gap-2 shadow-xl shadow-jhedai-primary/30">
                Iniciar Assessment
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button className="px-8 py-3.5 rounded-lg font-bold text-[16px] border border-white/20 text-white hover:bg-white/10 transition-all">
                Hablar con un consultor
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Assessment;
