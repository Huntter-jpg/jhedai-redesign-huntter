import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import HeroTorus from "./HeroTorus";

const partners: { name: string; logo: string; size?: "lg" | "xl" }[] = [
  {
    name: "NVIDIA Inception",
    logo: "/logos-partners/nvidia-inception.png",
    size: "xl",
  },
  { name: "Tenpo", logo: "/logos-partners/tenpo.png" },
  {
    name: "Banco Cuscatlán",
    logo: "/logos-partners/banco-el-salvador-transparente.png",
    size: "xl",
  },
  { name: "Universidad San Sebastián", logo: "/logos-partners/logo-uss.png" },
  { name: "CENIA", logo: "/logos-partners/logo-cenia-v2.png" },
  { name: "NLHPC", logo: "/logos-partners/logo-nlhpc-horiz-rgb.png" },
  { name: "ChileValora", logo: "/logos-partners/chile-valora.png" },
  {
    name: "Datamate",
    logo: "/logos-partners/logo-datamate-removebg-preview.png",
    size: "xl",
  },
  {
    name: "Minverso",
    logo: "/logos-partners/logo-minverso-fondo-transparente--removebg-preview.png",
    size: "lg",
  },
  { name: "ChucAW", logo: "/logos-partners/chucaw.png", size: "lg" },
  {
    name: "Colegio Waldorf de Santiago",
    logo: "/logos-partners/colegio-waldorf-de-santiago.png",
  },
  {
    name: "CRTIC",
    logo: "/logos-partners/crtic-removebg-preview.png",
    size: "lg",
  },
  {
    name: "Municipalidad de Viña del Mar",
    logo: "/logos-partners/muni-vi-a-2.png",
  },
  { name: "EIVA", logo: "/logos-partners/eiva.png", size: "lg" },
  { name: "CChIA", logo: "/logos-partners/cchia.jpg", size: "xl" },
  { name: "CSIAA", logo: "/logos-partners/csiaa.jpg", size: "lg" },
  { name: "Vehice", logo: "/logos-partners/vehice.png" },
  { name: "Latam-GPT", logo: "/logos-partners/latam-gpt.jpg" },
  { name: "Min Ciencia", logo: "/logos-partners/MIN-CIENCIA.png", size: "lg" },
];

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 bg-white">
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
          <div className="w-full h-full rounded-full bg-jhedai-primary/5 blur-[120px]" />
        </div>
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px]">
          <div className="w-full h-full rounded-full bg-jhedai-secondary/10 blur-[100px]" />
        </div>
      </div>

      {/* 3D Visual - absolute overlay on the right half of the section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="absolute inset-0 lg:left-[40%] opacity-30 lg:opacity-100 pointer-events-none z-[1] overflow-visible"
      >
        <HeroTorus />
      </motion.div>

      <div className="container relative z-10">
        <div className="lg:w-1/2 text-center lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-jhedai-primary/5 border border-jhedai-primary/10 text-[14px] font-medium text-jhedai-primary mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-jhedai-secondary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-jhedai-secondary" />
            </span>
            Consultora IA en Chile
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl lg:text-[64px] xl:text-[72px] font-bold leading-[1.1] tracking-tight mb-8"
          >
            <span className="text-jhedai-primary">IA Aplicada</span>
            <br />
            <span className="text-gradient">para la</span>
            <br />
            <span className="text-jhedai-secondary">Industria.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg text-jhedai-primary/60 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            Diagnóstico, implementación y capacitación en inteligencia
            artificial.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center lg:justify-start gap-4"
          >
            <Link
              to="/contacto"
              className="boton-principal inline-flex items-center gap-2"
            >
              Agendar consulta
              <ChevronRight size={16} />
            </Link>
            <a href="/#services" className="boton-secundario inline-block">
              Conocer servicios
            </a>
          </motion.div>
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-20 lg:mt-16 pt-12"
        >
          <p className="text-[14px] font-semibold text-jhedai-primary/40 mb-6 tracking-wide text-center lg:text-left">
            Empresas que potencian su operación con JhedAi
          </p>
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            {/* Carousel track — duplicated for seamless loop */}
            <motion.div
              className="flex items-center gap-16 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 70,
                  ease: "linear",
                },
              }}
            >
              {[...partners, ...partners].map((partner, i) => (
                <div
                  key={`${partner.name}-${i}`}
                  className={`flex-shrink-0 flex items-center justify-center ${partner.size === "xl" ? "h-32 w-56" : partner.size === "lg" ? "h-24 w-48" : "h-16 w-36"}`}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
