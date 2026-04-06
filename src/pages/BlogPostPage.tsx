import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Clock } from "lucide-react";
import SEOHead from "../components/SEOHead";
import { SITE_URL } from "../components/SEOHead";
import BlogCard, { categoryColors } from "../components/BlogCard";
import { getPost, getRelatedPosts, type BlogPost } from "../lib/api";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);

    getPost(slug).then((data) => {
      if (!data) {
        setNotFound(true);
      } else {
        setPost(data);
        getRelatedPosts(data.category, data.slug).then(setRelated);
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-28 pb-24 bg-white">
        <div className="container max-w-3xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-4 w-48 bg-jhedai-neutral/10 rounded" />
            <div className="h-6 w-32 bg-jhedai-neutral/10 rounded-full" />
            <div className="h-12 w-3/4 bg-jhedai-neutral/10 rounded" />
            <div className="aspect-video bg-jhedai-neutral/10 rounded-2xl" />
            <div className="space-y-3">
              <div className="h-4 bg-jhedai-neutral/10 rounded" />
              <div className="h-4 bg-jhedai-neutral/10 rounded w-5/6" />
              <div className="h-4 bg-jhedai-neutral/10 rounded w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="pt-28 pb-24 bg-white">
        <div className="container max-w-3xl mx-auto text-center py-20">
          <div className="w-20 h-20 rounded-2xl bg-jhedai-primary/5 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl font-black text-jhedai-primary/20">
              ?
            </span>
          </div>
          <h1 className="text-2xl font-bold text-jhedai-primary mb-4">
            Artículo no encontrado
          </h1>
          <p className="text-jhedai-primary/60 mb-8">
            El artículo que buscas no existe o fue removido.
          </p>
          <Link
            to="/blog"
            className="boton-secundario inline-flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Volver al blog
          </Link>
        </div>
      </div>
    );
  }

  const date = new Date(post.publishedAt).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Compute wordCount from content as fallback when API value is absent
  const computedWordCount = post.content
    ? post.content
        .replace(/<[^>]+>/g, " ")
        .split(/\s+/)
        .filter(Boolean).length
    : 0;
  const wordCount = post.wordCount || computedWordCount;

  // BlogPosting JSON-LD with E-E-A-T
  const authorLd =
    post.author.type === "Person"
      ? {
          "@type": "Person" as const,
          name: post.author.name,
          ...(post.author.bio ? { description: post.author.bio } : {}),
          ...(post.author.jobTitle ? { jobTitle: post.author.jobTitle } : {}),
          ...(post.author.url ? { url: post.author.url } : {}),
          ...(post.author.sameAs.length > 0
            ? { sameAs: post.author.sameAs }
            : {}),
        }
      : {
          "@type": "Organization" as const,
          name: post.author.name,
          url: post.author.url || "https://jhedai.com",
          "@id": "https://jhedai.com/#organization",
          ...(post.author.sameAs.length > 0
            ? { sameAs: post.author.sameAs }
            : {}),
        };

  const blogPostingLd = {
    "@context": "https://schema.org",
    "@type": post.schemaType || "BlogPosting",
    headline: post.title,
    description: post.primaryAnswer || post.metaDescription || post.excerpt,
    image: post.featuredImage
      ? {
          "@type": "ImageObject",
          url: post.featuredImage,
          caption: post.featuredImageAlt || post.title,
        }
      : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    wordCount,
    abstract: post.excerpt,
    articleSection: post.category,
    inLanguage: "es-CL",
    keywords: post.tags.join(", "),
    author: authorLd,
    publisher: {
      "@type": "Organization",
      name: "JhedAi",
      url: "https://jhedai.com",
      "@id": "https://jhedai.com/#organization",
      logo: {
        "@type": "ImageObject",
        url: "https://jhedai.com/isotipo-jhedai.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  // BreadcrumbList JSON-LD
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.category,
        item: `${SITE_URL}/blog?category=${post.category}`,
      },
      { "@type": "ListItem", position: 4, name: post.title },
    ],
  };

  // FAQPage JSON-LD (conditional)
  const faqLd =
    post.faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqItems.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  const schemas = [blogPostingLd, breadcrumbLd, faqLd].filter(
    Boolean,
  ) as Record<string, unknown>[];

  return (
    <>
      <SEOHead
        title={post.metaTitle || post.title}
        description={post.metaDescription || post.excerpt}
        canonical={post.canonicalUrl || `/blog/${post.slug}`}
        ogType="article"
        ogImage={post.ogImage || post.featuredImage}
        article={{
          publishedTime: post.publishedAt,
          modifiedTime: post.updatedAt,
          section: post.category,
          tags: post.tags,
        }}
        jsonLd={schemas}
      />

      <div className="pt-28 pb-24 bg-white">
        <div className="container max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-[13px] text-jhedai-primary/40 mb-8">
            <Link
              to="/"
              className="hover:text-jhedai-secondary transition-colors"
            >
              Inicio
            </Link>
            <span className="mx-2">&gt;</span>
            <Link
              to="/blog"
              className="hover:text-jhedai-secondary transition-colors"
            >
              Blog
            </Link>
            <span className="mx-2">&gt;</span>
            <Link
              to={`/blog?category=${post.category}`}
              className="hover:text-jhedai-secondary transition-colors"
            >
              {post.category}
            </Link>
            <span className="mx-2">&gt;</span>
            <span className="text-jhedai-primary/60">
              {post.title.length > 40
                ? post.title.slice(0, 40) + "..."
                : post.title}
            </span>
          </nav>

          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${categoryColors[post.category] || "bg-jhedai-primary/10 text-jhedai-primary"}`}
            >
              {post.category}
            </span>
            <time
              dateTime={post.publishedAt}
              className="text-[13px] text-jhedai-primary/40"
            >
              {date}
            </time>
            <span className="inline-flex items-center gap-1 text-[13px] text-jhedai-primary/40">
              <Clock size={12} />
              {post.readTime} lectura
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl lg:text-4xl font-bold text-jhedai-primary leading-tight mb-8"
          >
            {post.title}
          </motion.h1>

          {/* Key Takeaways — GEO (+41% AI citations, Princeton KDD 2024) */}
          {post.keyTakeaways.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-jhedai-secondary/5 border border-jhedai-secondary/15 rounded-xl p-5 mb-8"
            >
              <h2 className="text-sm font-bold text-jhedai-secondary uppercase tracking-wide mb-3">
                Puntos clave
              </h2>
              <ul className="space-y-2">
                {post.keyTakeaways.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[15px] text-jhedai-primary/80"
                  >
                    <span className="text-jhedai-secondary mt-0.5 shrink-0">
                      &mdash;
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Featured image */}
          {post.featuredImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl overflow-hidden aspect-video mb-10 shadow-lg"
            >
              <img
                src={post.featuredImage}
                alt={post.featuredImageAlt || post.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* FAQ — AEO (+30% AI citations with FAQPage schema) */}
          {post.faqItems.length > 0 && (
            <section className="mt-10 space-y-3">
              <h2 className="text-xl font-bold text-jhedai-primary">
                Preguntas frecuentes
              </h2>
              {post.faqItems.map((faq, i) => (
                <details
                  key={i}
                  className="group border border-jhedai-neutral/15 rounded-xl"
                >
                  <summary className="cursor-pointer p-4 font-medium text-jhedai-primary group-open:text-jhedai-secondary transition-colors">
                    {faq.question}
                  </summary>
                  <div className="px-4 pb-4 text-[15px] text-jhedai-primary/70 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </section>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-10">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-jhedai-primary/5 text-jhedai-primary/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-jhedai-neutral/20 my-12" />

          {/* CTA Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-jhedai-primary" />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-jhedai-secondary/[0.2] to-transparent rounded-full blur-[80px]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />

            <div className="relative z-10 p-10 lg:p-14 text-center">
              <h3 className="text-2xl font-bold text-white mb-3">
                ¿Necesitas implementar IA en tu empresa?
              </h3>
              <p className="text-white/70 text-[16px] max-w-lg mx-auto mb-6 leading-relaxed">
                Agenda una consulta con nuestro equipo y descubre cómo la
                inteligencia artificial puede transformar tu operación.
              </p>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 bg-jhedai-primary text-white px-8 py-3.5 rounded-lg font-bold text-[16px] hover:brightness-125 transition-all shadow-xl shadow-jhedai-primary/30"
              >
                Agendar consulta <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>

          {/* Related articles */}
          {related.length > 0 && (
            <>
              <div className="h-px bg-jhedai-neutral/20 my-12" />
              <div>
                <h3 className="text-xl font-bold text-jhedai-primary mb-8">
                  También te puede interesar
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {related.map((rPost, i) => (
                    <BlogCard key={rPost.id} post={rPost} index={i} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;
