import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const items = [
  {
    image: "/vision/control-calidad.png",
    imageAlt:
      "Sistema de visión automatizada para control de calidad en línea de producción",
    name: "Inspección y Control de Calidad",
    desc: "Detección de defectos y anomalías en líneas de producción y ensamblaje en tiempo real. Precisión superior a la inspección humana con análisis visual automatizado.",
  },
  {
    image: "/vision/seguridad-industrial.png",
    imageAlt:
      "Sistema de seguridad y cumplimiento industrial con IA en tiempo real",
    name: "Seguridad y Cumplimiento Industrial",
    desc: "Monitoreo continuo de EPP, detección de zonas de riesgo y verificación de cumplimiento de protocolos de seguridad en operaciones industriales y portuarias.",
  },
  {
    image: "/vision/logistica.png",
    imageAlt:
      "Monitoreo logístico inteligente en terminal portuario con visión computacional",
    name: "Monitoreo y Logística Inteligente",
    desc: "Gestión automatizada de inventario mediante reconocimiento visual, análisis de flujos de carga en terminales portuarios y optimización logística en tiempo real.",
  },
];

const VisionIndustrial = () => {
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
            VISIÓN INDUSTRIAL
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Visión computacional aplicada a la industria
          </h2>
          <p className="text-white/60 text-[16px] max-w-2xl mx-auto leading-relaxed">
            Convertimos imágenes en información accionable en tiempo real.
            Soluciones de visión por computador que eliminan errores humanos y
            aumentan la precisión operativa.
          </p>
        </motion.div>

        {/* Cards - horizontal stacked */}
        <div className="space-y-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:bg-white/[0.12] hover:shadow-lg hover:shadow-jhedai-secondary/10 transition-all duration-300 flex flex-col md:flex-row"
            >
              {/* Visual area - image */}
              <div className="relative w-full md:w-80 h-52 md:h-auto shrink-0 overflow-hidden">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${item.image.replace(".png", "-640.webp")} 640w, ${item.image.replace(".png", "-1024.webp")} 1024w, ${item.image.replace(".png", "-1600.webp")} 1600w`}
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={320}
                    height={240}
                  />
                </picture>
                {/* Scanning corners overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 border-white/40 rounded-tl-md" />
                  <div className="absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2 border-white/40 rounded-tr-md" />
                  <div className="absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2 border-white/40 rounded-bl-md" />
                  <div className="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 border-white/40 rounded-br-md" />
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex-1 flex flex-col justify-center">
                <h3 className="font-bold text-xl text-white mb-3 group-hover:text-jhedai-secondary transition-colors">
                  {item.name}
                </h3>
                <p className="text-[15px] text-white/50 leading-relaxed mb-4">
                  {item.desc}
                </p>
                <div className="flex items-center gap-2 text-[14px] font-semibold text-white/40 group-hover:text-jhedai-secondary transition-colors">
                  Ver solución{" "}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionIndustrial;
