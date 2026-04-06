import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "../lib/api";

const categoryColors: Record<string, string> = {
  Industria: "bg-jhedai-primary/10 text-jhedai-primary",
  Regulación: "bg-jhedai-secondary/10 text-jhedai-secondary",
  Formación: "bg-jhedai-accent/10 text-jhedai-accent",
  Tendencias: "bg-emerald-500/10 text-emerald-600",
};

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

const BlogCard = ({ post, index = 0 }: BlogCardProps) => {
  const date = new Date(post.publishedAt).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group block glass-card overflow-hidden cursor-pointer"
      >
        {/* Image */}
        <div className="aspect-video overflow-hidden">
          {post.featuredImage ? (
            <img
              src={post.featuredImage}
              alt={post.featuredImageAlt || post.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-jhedai-primary/10 to-jhedai-secondary/10 flex items-center justify-center">
              <span className="text-4xl font-black text-jhedai-primary/10">
                J
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${categoryColors[post.category] || "bg-jhedai-primary/10 text-jhedai-primary"}`}
            >
              {post.category}
            </span>
            <time
              dateTime={post.publishedAt}
              className="text-[12px] text-jhedai-primary/40"
            >
              {date}
            </time>
            <span className="inline-flex items-center gap-1 text-[12px] text-jhedai-primary/40">
              <Clock size={10} />
              {post.readTime}
            </span>
          </div>

          <h2 className="font-bold text-lg text-jhedai-primary mb-2 group-hover:text-jhedai-secondary transition-colors line-clamp-2">
            {post.title}
          </h2>

          <p className="text-[15px] text-jhedai-primary/60 leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-jhedai-primary/40 group-hover:text-jhedai-secondary transition-colors">
            Leer artículo{" "}
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export { categoryColors };
export default BlogCard;
