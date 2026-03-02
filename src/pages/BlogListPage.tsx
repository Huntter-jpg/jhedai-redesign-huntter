import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import SEOHead from "../components/SEOHead";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";
import {
  getPosts,
  getCategories,
  type BlogPost,
  type PaginatedResponse,
} from "../lib/api";

const BlogListPage = () => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentCategory = searchParams.get("category") || "";

  const [data, setData] = useState<PaginatedResponse<BlogPost> | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    getPosts({
      page: currentPage,
      limit: 9,
      category: currentCategory || undefined,
    })
      .then(setData)
      .finally(() => setLoading(false));
  }, [currentPage, currentCategory]);

  const featuredPost =
    currentPage === 1 && !currentCategory
      ? data?.data.find((p) => p.featured)
      : null;

  const gridPosts = data?.data.filter((p) => p !== featuredPost) || [];

  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (currentCategory) params.set("category", currentCategory);
    const qs = params.toString();
    return `/blog${qs ? `?${qs}` : ""}`;
  };

  const buildCategoryUrl = (cat: string) => {
    const params = new URLSearchParams();
    if (cat) params.set("category", cat);
    const qs = params.toString();
    return `/blog${qs ? `?${qs}` : ""}`;
  };

  const pageTitle =
    currentPage > 1
      ? `Blog — Página ${currentPage}`
      : "Blog — Insights de IA Industrial";

  return (
    <>
      <SEOHead
        title={pageTitle}
        description="Artículos, análisis y casos de estudio sobre inteligencia artificial aplicada a la industria chilena."
        canonical={`/blog${currentPage > 1 ? `?page=${currentPage}` : ""}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Blog JhedAi",
          description: "Insights de IA Industrial",
          url: "https://jhedai.com/blog",
          publisher: {
            "@type": "Organization",
            name: "JhedAi",
          },
        }}
      />

      <div className="pt-28 pb-24 bg-white">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="text-[13px] text-jhedai-primary/40 mb-8">
            <Link
              to="/"
              className="hover:text-jhedai-secondary transition-colors"
            >
              Inicio
            </Link>
            <span className="mx-2">&gt;</span>
            <span className="text-jhedai-primary/60">Blog</span>
          </nav>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-[14px] text-jhedai-secondary font-bold tracking-widest mb-4">
              BLOG
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold text-jhedai-primary mb-4">
              Insights de IA Industrial
            </h1>
            <p className="text-jhedai-primary/60 text-[16px] max-w-2xl mx-auto leading-relaxed">
              Artículos, análisis y casos de estudio sobre inteligencia
              artificial aplicada a la industria chilena.
            </p>
          </motion.div>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <Link
              to="/blog"
              className={`px-4 py-2 rounded-full text-[14px] font-medium transition-all ${
                !currentCategory
                  ? "bg-jhedai-primary text-white"
                  : "bg-jhedai-primary/5 text-jhedai-primary/60 hover:bg-jhedai-primary/10"
              }`}
            >
              Todos
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                to={buildCategoryUrl(cat)}
                className={`px-4 py-2 rounded-full text-[14px] font-medium transition-all ${
                  currentCategory === cat
                    ? "bg-jhedai-primary text-white"
                    : "bg-jhedai-primary/5 text-jhedai-primary/60 hover:bg-jhedai-primary/10"
                }`}
              >
                {cat}
              </Link>
            ))}
          </motion.div>

          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-2xl bg-jhedai-neutral/10 h-[360px]"
                />
              ))}
            </div>
          )}

          {/* Content */}
          {!loading && data && (
            <>
              {/* Featured article */}
              {featuredPost && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="group block relative rounded-2xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-jhedai-primary" />
                    <div className="absolute inset-0 bg-gradient-to-r from-jhedai-primary via-jhedai-primary/90 to-jhedai-secondary/30" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />

                    <div className="relative z-10 p-10 lg:p-16">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white">
                          {featuredPost.category}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-white/50">
                          <Clock size={12} />
                          {featuredPost.readTime} lectura
                        </span>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 max-w-2xl group-hover:text-jhedai-secondary transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-white/60 text-[16px] max-w-xl leading-relaxed mb-6">
                        {featuredPost.excerpt}
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
              )}

              {/* Grid */}
              {gridPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gridPosts.map((post, i) => (
                    <BlogCard key={post.id} post={post} index={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-jhedai-primary/40 text-lg">
                    No hay artículos en esta categoría.
                  </p>
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 mt-4 text-[14px] font-semibold text-jhedai-secondary hover:text-jhedai-primary transition-colors"
                  >
                    Ver todos los artículos <ArrowRight size={14} />
                  </Link>
                </div>
              )}

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={data.totalPages}
                baseUrl="/blog"
                buildUrl={buildUrl}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogListPage;
