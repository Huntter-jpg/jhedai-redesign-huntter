import Hero from '../components/Hero';
import ServiceGrid from '../components/ServiceGrid';
import AgentesAutonomos from '../components/AgentesAutonomos';
import VisionIndustrial from '../components/VisionIndustrial';
import AcademiaJhedai from '../components/AcademiaJhedai';
import DeepLab from '../components/DeepLab';
import Methodology from '../components/Methodology';
import NosotrosSimple from '../components/NosotrosSimple';
import Blog from '../components/Blog';
import Assessment from '../components/Assessment';
import SEOHead from '../components/SEOHead';
import ParticleSphere from '../components/ParticleSphere';
import Analytics from '../components/Analytics';
import { OrganizationSchema } from '../components/schemas/OrganizationSchema';

const HomePage = () => {
    return (
        <>
            <SEOHead
                title="Consultora de Inteligencia Artificial en Chile"
                description="Diagnóstico, implementación y capacitación en inteligencia artificial para la industria y gobierno en Chile."
                canonical="/"
            />
            <Analytics />
            <OrganizationSchema />
            <main className="bg-abstract">
                <Hero />
                <ServiceGrid />

                {/* Elegant visual separator */}
                <div className="relative py-20 overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white">
                    {/* Subtle decorative elements */}
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-jhedai-secondary/10 blur-3xl" />
                        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-jhedai-primary/10 blur-3xl" />
                    </div>

                    {/* Decorative line pattern */}
                    <div className="container relative">
                        <div className="flex items-center justify-center gap-2">
                            <div className="h-px w-20 bg-gradient-to-r from-transparent to-jhedai-secondary/30" />
                            <div className="w-2 h-2 rounded-full bg-jhedai-secondary/40" />
                            <div className="h-px w-32 bg-gradient-to-r from-jhedai-secondary/30 via-jhedai-primary/30 to-jhedai-secondary/30" />
                            <div className="w-2 h-2 rounded-full bg-jhedai-primary/40" />
                            <div className="h-px w-20 bg-gradient-to-l from-transparent to-jhedai-primary/30" />
                        </div>
                    </div>
                </div>

                <Methodology />

                {/* Ecosistema — with giant particle sphere */}
                <div className="relative bg-jhedai-primary">
                    <ParticleSphere />
                    <div className="relative z-10">
                        <AgentesAutonomos />
                        <div className="container"><div className="h-px bg-white/10" /></div>
                        <VisionIndustrial />
                        <div className="container"><div className="h-px bg-white/10" /></div>
                        <AcademiaJhedai />
                        <div className="container"><div className="h-px bg-white/10" /></div>
                        <DeepLab />
                    </div>
                </div>

                <NosotrosSimple />
                <Blog />
                <Assessment />
            </main>
        </>
    );
};

export default HomePage;
