import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const categoryColors: Record<string, string> = {
  Industria: "bg-jhedai-primary/10 text-jhedai-primary",
  Regulación: "bg-jhedai-secondary/10 text-jhedai-secondary",
  Formación: "bg-jhedai-accent/10 text-jhedai-accent",
  Tendencias: "bg-emerald-500/10 text-emerald-600",
};

const articles = [
  {
    featured: true,
    slug: "74-empresas-chilenas-aumentara-inversion-ia",
    category: "Industria",
    title: "74% de empresas chilenas aumentará su inversión en IA",
    excerpt:
      "Las grandes empresas en Chile están redefiniendo sus operaciones en minería, retail, finanzas y salud con inteligencia artificial. Análisis del ecosistema IA nacional.",
    readTime: "8 min",
  },
  {
    featured: false,
    slug: "regulacion-ia-chile-primer-marco-legal",
    category: "Regulación",
    title: "Regulación IA Chile: primer marco legal en Latinoamérica",
    excerpt:
      "El Congreso aprobó el primer marco regulatorio para sistemas de IA en la región. Qué significa para tu empresa.",
    readTime: "6 min",
  },
  {
    featured: false,
    slug: "tendencias-vision-computacional-industria-2026",
    category: "Tendencias",
    title: "Tendencias en Visión Computacional para la industria",
    excerpt:
      "La visión por computador representa un cambio estructural en el enfoque de desarrollo industrial en Chile.",
    readTime: "5 min",
  },
  {
    featured: false,
    slug: "capacitaciones-ia-certificacion-chilevalora",
    category: "Formación",
    title: "Capacitaciones IA con certificación ChileValora",
    excerpt:
      "Chile lidera la región en preparación de talento IA con 74.30 puntos según el Índice Latinoamericano de IA.",
    readTime: "4 min",
  },
];

const featuredArticle = articles.find((a) => a.featured)!;
const secondaryArticles = articles.filter((a) => !a.featured);

const Blog = () => {
  return (
    <section id="blog" className="py-24 relative bg-white">
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
            BLOG
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-jhedai-primary mb-4">
            Insights de IA Industrial
          </h2>
          <p className="text-jhedai-primary/60 text-[16px] max-w-2xl mx-auto leading-relaxed">
            Artículos, análisis y casos de estudio sobre inteligencia artificial
            aplicada a la industria chilena.
          </p>
        </motion.div>

        {/* Featured article */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to={`/blog/${featuredArticle.slug}`}
            className="group block relative rounded-2xl overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-jhedai-primary" />
            <div className="absolute inset-0 bg-gradient-to-r from-jhedai-primary via-jhedai-primary/90 to-jhedai-secondary/30" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />

            <div className="relative z-10 p-10 lg:p-16">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white">
                  {featuredArticle.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-white/50">
                  <Clock size={12} />
                  {featuredArticle.readTime} lectura
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 max-w-2xl group-hover:text-jhedai-secondary transition-colors">
                {featuredArticle.title}
              </h3>
              <p className="text-white/60 text-[16px] max-w-xl leading-relaxed mb-6">
                {featuredArticle.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-jhedai-secondary group-hover:text-white transition-colors">
                Leer artículo{" "}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Secondary articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {secondaryArticles.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                to={`/blog/${article.slug}`}
                className="group block glass-card p-8 cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${categoryColors[article.category]}`}
                  >
                    {article.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-jhedai-primary/40">
                    <Clock size={12} />
                    {article.readTime}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-jhedai-primary mb-3 group-hover:text-jhedai-secondary transition-colors">
                  {article.title}
                </h3>
                <p className="text-[15px] text-jhedai-primary/60 leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-jhedai-primary/40 group-hover:text-jhedai-secondary transition-colors">
                  Leer{" "}
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Ver todos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/blog"
            className="boton-secundario inline-flex items-center gap-2 text-[14px]"
          >
            Ver todos los artículos <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
