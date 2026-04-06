/**
 * Cloudflare Pages Function Middleware
 *
 * Pre-rendering para crawlers (Googlebot, GPTBot, Claude-Web, etc.)
 *
 * Funcionalidad:
 * 1. Detecta crawlers por User-Agent
 * 2. Sirve HTML pre-renderizado desde cache KV (si está configurado)
 * 3. Usuarios normales reciben SPA React normal
 *
 * Para activar:
 * 1. Deploy a Cloudflare Pages
 * 2. Crear KV namespace: npx wrangler kv:namespace create "PRERENDER_CACHE"
 * 3. Configurar en wrangler.toml
 */

interface Env {
  PRERENDER_CACHE?: KVNamespace;
}

// Lista completa de crawlers a detectar
const CRAWLER_USER_AGENTS = [
  // Search engines principales
  "googlebot",
  "bingbot",
  "slurp", // Yahoo
  "duckduckbot",
  "baiduspider",
  "yandexbot",

  // AI Crawlers
  "gptbot", // OpenAI
  "chatgpt-user", // ChatGPT
  "claude-web", // Anthropic Claude
  "anthropic-ai", // Anthropic
  "google-extended", // Google Gemini/Bard
  "perplexitybot", // Perplexity
  "youbot", // You.com
  "ccbot", // Common Crawl

  // Social media crawlers
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
  "slackbot",
  "whatsapp",
  "telegrambot",

  // SEO tools
  "semrushbot",
  "ahrefsbot",
  "mj12bot",
];

/**
 * Detecta si el User-Agent es un crawler
 */
function isCrawler(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return CRAWLER_USER_AGENTS.some((bot) => ua.includes(bot));
}

/**
 * Middleware principal
 */
export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, next } = context;
  const userAgent = request.headers.get("user-agent") || "";

  // Si es un crawler
  if (isCrawler(userAgent)) {
    console.log(`[Crawler detected] ${userAgent.substring(0, 100)}`);

    // Opción 1: Servir desde KV cache (si está configurado)
    if (env.PRERENDER_CACHE) {
      try {
        const cacheKey = new URL(request.url).pathname;
        const cachedHtml = await env.PRERENDER_CACHE.get(cacheKey);

        if (cachedHtml) {
          console.log(`[Cache HIT] ${cacheKey}`);
          return new Response(cachedHtml, {
            headers: {
              "content-type": "text/html;charset=UTF-8",
              "cache-control": "public, max-age=3600",
              "x-served-by": "cloudflare-prerender-cache",
            },
          });
        }

        console.log(`[Cache MISS] ${cacheKey}`);
      } catch (error) {
        console.error("[KV Error]", error);
      }
    }

    // Opción 2: Servir el index.html estático con meta tags (mejor que SPA vacío)
    // El crawler verá al menos los meta tags de SEO
    const response = await next();

    // Agregar headers especiales para crawlers
    const headers = new Headers(response.headers);
    headers.set("x-served-to", "crawler");
    headers.set("cache-control", "public, max-age=3600");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  // Usuarios normales: SPA normal con cache optimizado
  const response = await next();

  // Agregar headers de performance para usuarios
  const headers = new Headers(response.headers);
  headers.set("x-served-to", "user");

  // Cache agresivo para assets estáticos
  const url = new URL(request.url);
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|webp|svg|woff|woff2)$/)) {
    headers.set("cache-control", "public, max-age=31536000, immutable");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};
