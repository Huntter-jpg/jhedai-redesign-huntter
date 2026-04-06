# JhedAI Redesign - CLAUDE.md

## Project Overview

Sitio web corporativo de JhedAI, consultora de inteligencia artificial en Chile. SPA con React + Vite, efectos 3D (Three.js), SEO/GEO/AEO avanzado y deploy dual (Vercel + Cloudflare Pages).

## Stack

- **Frontend**: React 19 + TypeScript + Vite 7 + Tailwind CSS + Framer Motion
- **3D**: Three.js + @react-three/fiber + @react-three/drei
- **SEO**: react-helmet-async + react-schemaorg + schema-dts + vite-plugin-sitemap
- **Backend API**: Cloudflare Workers (`https://jhedai-api.edison-985.workers.dev`)
- **Deploy**: Vercel + Cloudflare Pages (dual deploy)

## URLs de Produccion

- **Vercel**: https://jhedai-redesign.vercel.app
- **Cloudflare Pages**: https://jhedai.pages.dev
- **API Worker**: https://jhedai-api.edison-985.workers.dev

## Development Commands

```bash
npm install              # Instalar dependencias
npm run dev              # Dev server (http://localhost:5173)
npm run build            # TypeScript + Vite build
npm run preview          # Preview build local
npm run lint             # ESLint
npm run deploy:cloudflare  # Build + Deploy Cloudflare Pages
npx vercel --prod --yes    # Deploy Vercel
```

## Architecture

```
src/
  components/          # Componentes React (Hero, Navbar, Footer, etc.)
    schemas/           # Schema.org structured data (5 schemas)
  pages/               # Paginas (Home, Servicios, Nosotros, Metodologia, Ecosistema, Blog, Contacto, Privacidad, Terminos)
  lib/
    api.ts             # Blog API con localStorage cache + mock data fallback
    apiClient.ts       # Contact form API client + generic apiFetch
  utils/               # deviceDetection, fibonacciSphere, vitals
  hooks/               # useInViewport
functions/
  _middleware.ts       # Cloudflare Worker middleware (crawler pre-rendering)
  api/                 # Cloudflare Pages Functions (API proxy)
public/                # Static assets, robots.txt, favicons, logos-partners/
```

## API Endpoints (Cloudflare Worker)

### Blog (Read)

- `GET /api/blog/posts` — Lista paginada (?page, ?limit, ?category)
- `GET /api/blog/posts/:slug` — Post individual (author enriched con E-E-A-T)
- `GET /api/blog/posts/:slug/related` — Posts relacionados
- `GET /api/blog/categories` — Categorias
- `GET /api/authors` — Lista de autores (Person/Organization)
- `GET /api/sitemap-data` — slugs + updated_at para sitemap dinamico

### Blog (Write — requiere X-API-Key)

- `POST /api/blog/posts` — Crear post
- `PUT /api/blog/posts/:slug` — Actualizar post
- `DELETE /api/blog/posts/:slug` — Eliminar post
- `POST /api/authors` — Crear autor
- `PUT /api/authors/:slug` — Actualizar autor

### Otros

- `POST /api/contact` — Formulario contacto
- `GET /api/services` — Servicios

## Blog Data Model (API Response)

El backend devuelve posts con author enriched y campos SEO/GEO/AEO:

```typescript
{
  id, slug, title, excerpt, content, category,
  tags: string[],
  published_at, updated_at, read_time,
  featured: 0 | 1,
  featured_image?, featured_image_alt?,
  meta_title?, meta_description?,
  // SEO/GEO/AEO
  word_count: number,
  primary_answer?: string,
  faq_items: [{question, answer}],
  speakable_selectors: string[],
  // Author E-E-A-T
  author: {
    id, slug, name,
    type: "Person" | "Organization",
    jobTitle?, bio?, avatar?, url?,
    sameAs: string[]
  }
}
```

## Key Patterns

- **Dual deploy**: Siempre hacer deploy a Vercel Y Cloudflare Pages
- **localStorage cache**: Blog posts con TTL (posts 1h, post 24h, categories 24h, related 6h)
- **Mock data fallback**: Si VITE_API_URL vacio, usa mockPosts hardcoded
- **LOD System**: Ajuste automatico de particulas 3D segun device tier
- **Viewport Detection**: Pause 3D rendering cuando off-screen
- **Code Splitting**: react-vendor, three-vendor, animation-vendor chunks
- **Compression**: Gzip + Brotli via vite-plugin-compression
- **SEO**: SEOHead component en cada pagina + Schema.org JSON-LD
- **robots.txt**: Permite GPTBot, ChatGPT-User, Claude-Web, PerplexityBot, YouBot

## Schema.org Components

| Componente         | Estado    | Usado en  |
| ------------------ | --------- | --------- |
| OrganizationSchema | Activo    | HomePage  |
| BreadcrumbSchema   | Activo    | 6 paginas |
| BlogPostingSchema  | DEAD CODE | Ninguno   |
| FAQPageSchema      | No usado  | Ninguno   |
| ServiceSchema      | No usado  | Ninguno   |

## Configuration

- `wrangler.toml` — Cloudflare Pages config (project: jhedai)
- `vercel.json` — Vercel config con rewrites SPA
- `vite.config.ts` — Vite + plugins (sitemap, compression)
- `tailwind.config.js` — Colores custom: jhedai-primary, jhedai-secondary, jhedai-neutral
- Env var: `VITE_API_URL` — Override API base URL (default: empty = mock data)

## SEO/GEO/AEO Implementation

**Ver `FRONTEND_SEO_INSTRUCTIONS.md`** para instrucciones completas de implementacion.

## Pending / Known Issues

- three-vendor chunk >1MB (considerar lazy loading mas agresivo)
- 7 vulnerabilidades npm (1 moderate, 6 high) — revisar con `npm audit`
- **SEO/GEO/AEO pendiente**: Implementar Fase 2 y 4 del plan (ver FRONTEND_SEO_INSTRUCTIONS.md)
- BlogPostingSchema.tsx dead code — eliminar
- SEOHead.tsx: JSON-LD como array en un solo `<script>` — separar
- vite.config.ts: sitemap estatico — no incluye slugs de blog
