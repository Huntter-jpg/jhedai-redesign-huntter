import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sitemap from "vite-plugin-sitemap";
import viteCompression from "vite-plugin-compression";

// Fetch blog slugs from jhedai-cards API for dynamic sitemap
async function getBlogSlugs(): Promise<string[]> {
  try {
    const res = await fetch(
      "https://admin-jhedai.edison-985.workers.dev/api/blog/sitemap-data",
    );
    const json = (await res.json()) as {
      data?: Array<{ slug: string }>;
    };
    return (json.data || []).map((p) => `/blog/${p.slug}`);
  } catch {
    return [];
  }
}

const staticRoutes = [
  "/",
  "/servicios",
  "/nosotros",
  "/blog",
  "/contacto",
  "/metodologia",
  "/ecosistema",
  "/privacidad",
  "/terminos",
];

// https://vite.dev/config/
export default defineConfig(async () => {
  const blogRoutes = await getBlogSlugs();
  return {
    plugins: [
      react(),
      sitemap({
        hostname: "https://jhedai.com",
        dynamicRoutes: [...staticRoutes, ...blogRoutes],
        robots: [
          {
            userAgent: "*",
            allow: "/",
          },
          {
            userAgent: "GPTBot",
            allow: "/",
            crawlDelay: 2,
          },
          {
            userAgent: "ChatGPT-User",
            allow: "/",
            crawlDelay: 2,
          },
          {
            userAgent: "Claude-Web",
            allow: "/",
          },
          {
            userAgent: "anthropic-ai",
            allow: "/",
          },
          {
            userAgent: "Google-Extended",
            allow: "/",
          },
          {
            userAgent: "PerplexityBot",
            allow: "/",
            crawlDelay: 1,
          },
          {
            userAgent: "YouBot",
            allow: "/",
            crawlDelay: 1,
          },
        ],
      }),
      // Gzip compression
      viteCompression({
        algorithm: "gzip",
        ext: ".gz",
        threshold: 10240, // Only compress files > 10KB
      }),
      // Brotli compression (better than gzip)
      viteCompression({
        algorithm: "brotliCompress",
        ext: ".br",
        threshold: 10240,
      }),
    ],
    build: {
      // Optimize chunk splitting
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunks
            "react-vendor": ["react", "react-dom", "react-router-dom"],
            "three-vendor": [
              "three",
              "@react-three/fiber",
              "@react-three/drei",
            ],
            "animation-vendor": ["framer-motion"],
          },
        },
      },
      // Reduce chunk size warnings threshold
      chunkSizeWarningLimit: 1000,
    },
    // Performance optimizations
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "three",
        "@react-three/fiber",
      ],
    },
  };
});
