import { Link } from 'react-router-dom';
import logoJhedai from '../logo-jhedai.png';

const Footer = () => {
    return (
        <footer className="bg-jhedai-primary text-white border-t border-white/5">
            <div className="container py-20">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="-mt-4">
                        <a href="/" className="flex items-center gap-2.5 inline-block">
                            <img src={logoJhedai} alt="JhedAi" className="h-32 w-auto brightness-0 invert" />
                        </a>
                        <p className="text-[14px] text-white/50 leading-relaxed max-w-xs -mt-4">
                            Consultora de inteligencia artificial aplicada a la industria y gobierno en Chile.
                            Metodología propietaria con enfoque en resultados medibles.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-[14px] font-bold text-jhedai-secondary mb-6 uppercase tracking-wider">Ecosistema</h4>
                        <ul className="space-y-4 text-[14px] text-white/60">
                            <li><a href="#ecosistema" className="hover:text-jhedai-secondary transition-colors">Agentes Autónomos</a></li>
                            <li><a href="#ecosistema" className="hover:text-jhedai-secondary transition-colors">Visión Industrial</a></li>
                            <li><a href="#ecosistema" className="hover:text-jhedai-secondary transition-colors">Academia JhedAi</a></li>
                            <li><a href="#ecosistema" className="hover:text-jhedai-secondary transition-colors">DeepLab</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[14px] font-bold text-jhedai-secondary mb-6 uppercase tracking-wider">Compañía</h4>
                        <ul className="space-y-4 text-[14px] text-white/60">
                            <li><a href="/#methodology" className="hover:text-jhedai-secondary transition-colors">Metodología</a></li>
                            <li><a href="/#services" className="hover:text-jhedai-secondary transition-colors">Servicios</a></li>
                            <li><a href="/#nosotros" className="hover:text-jhedai-secondary transition-colors">Nosotros</a></li>
                            <li><Link to="/blog" className="hover:text-jhedai-secondary transition-colors">Blog</Link></li>
                            <li><a href="/#assessment" className="hover:text-jhedai-secondary transition-colors">Assessment</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[14px] font-bold text-jhedai-secondary mb-6 uppercase tracking-wider">Legal</h4>
                        <ul className="space-y-4 text-[14px] text-white/60">
                            <li><Link to="/privacidad" className="hover:text-jhedai-secondary transition-colors">Privacidad</Link></li>
                            <li><Link to="/terminos" className="hover:text-jhedai-secondary transition-colors">Términos</Link></li>
                            <li><Link to="/contacto" className="hover:text-jhedai-secondary transition-colors">Contacto</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] text-white/40">
                    <p>© {new Date().getFullYear()} JhedAi. Todos los derechos reservados.</p>
                    <div className="flex gap-8">
                        <a href="https://www.linkedin.com/company/jhedai/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                        <a href="https://www.instagram.com/jhedai/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                        <a href="https://www.youtube.com/@jhedai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
