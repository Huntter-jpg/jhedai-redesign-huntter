import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroTorus from './HeroTorus';

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
                            Diagnóstico, implementación y capacitación en inteligencia artificial.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-4"
                        >
                            <Link to="/contacto" className="boton-principal inline-flex items-center gap-2">
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
                    className="mt-20 lg:mt-16 pt-12 border-t border-jhedai-neutral/30"
                >
                    <p className="text-[14px] font-semibold text-jhedai-primary/40 mb-6 tracking-wide text-center lg:text-left">
                        Empresas que potencian su operación con JhedAi
                    </p>
                    <div className="flex justify-center lg:justify-start items-center gap-10 flex-wrap opacity-40 grayscale">
                        {['MINING CO.', 'ENERDEX', 'GOB DIGITAL', 'LOGITEC', 'FUNDACION IA'].map((name, i) => (
                            <span key={i} className="text-xs font-bold tracking-[0.2em] text-jhedai-primary">{name}</span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
