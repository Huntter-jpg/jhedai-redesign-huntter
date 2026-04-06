# Frontend SEO/GEO/AEO — Instrucciones de Implementacion

## Contexto

El backend ya tiene los campos y endpoints necesarios para SEO, GEO (Generative Engine Optimization) y AEO (Answer Engine Optimization). Este documento detalla todos los cambios que el frontend necesita para aprovecharlos.

**Backend API**: `https://jhedai-api.edison-985.workers.dev`
**Referencia investigacion**: Paper GEO de Princeton (KDD 2024), guias AEO 2026.

### Impacto esperado segun investigacion

| Tecnica                             | Mejora medida                                                          | Fuente               |
| ----------------------------------- | ---------------------------------------------------------------------- | -------------------- |
| FAQPage schema                      | +30% citacion IA                                                       | AEO studies 2026     |
| 3+ schema types por pagina          | +13% citacion IA                                                       | Schema.org analysis  |
| Author E-E-A-T markup               | 2.5x mas chances en respuestas IA                                      | Google E-E-A-T       |
| Speakable schema                    | Voice search (62% busquedas 2026)                                      | Web speech data      |
| Quotation Addition (GEO)            | +41% visibilidad en AI engines                                         | Princeton KDD 2024   |
| Statistics Addition (GEO)           | +33% visibilidad                                                       | Princeton KDD 2024   |
| Cite Sources (GEO)                  | +28% visibilidad                                                       | Princeton KDD 2024   |
| primary_answer (primeros 150 chars) | Featured snippets (55% citaciones vienen del primer 30% del contenido) | AI citation analysis |

---

## FASE 2: Data Model + JSON-LD

### 2A. Actualizar `src/lib/api.ts` — interfaces y normalizePost()

#### Nuevas interfaces

```typescript
export interface Author {
  id: number;
  slug: string;
  name: string;
  type: "Person" | "Organization";
  jobTitle?: string;
  bio?: string;
  avatar?: string;
  url?: string;
  sameAs: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}
```

#### Actualizar BlogPost interface

```typescript
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: Author; // CAMBIADO: de {name, avatar?} a Author completo
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  featured: boolean;
  featuredImage?: string;
  featuredImageAlt?: string;
  metaTitle?: string;
  metaDescription?: string;
  // Nuevos campos SEO/GEO/AEO
  wordCount: number;
  primaryAnswer?: string;
  faqItems: FAQItem[];
  speakableSelectors: string[];
}
```

#### Actualizar normalizePost()

Backward-compatible: acepta tanto el formato viejo `{name, avatar}` como el nuevo author enriched.

```typescript
function normalizePost(raw: Record<string, unknown>): BlogPost {
  // Handle both old {name, avatar} and new enriched author format
  const rawAuthor = raw.author as Record<string, unknown> | undefined;
  const author: Author = {
    id: (rawAuthor?.id as number) ?? 1,
    slug: (rawAuthor?.slug as string) ?? "jhedai-org",
    name: (rawAuthor?.name as string) ?? "JhedAi",
    type: ((rawAuthor?.type as string) ?? "Organization") as Author["type"],
    jobTitle:
      (rawAuthor?.jobTitle as string) ?? (rawAuthor?.job_title as string),
    bio: rawAuthor?.bio as string | undefined,
    avatar: rawAuthor?.avatar as string | undefined,
    url: rawAuthor?.url as string | undefined,
    sameAs: Array.isArray(rawAuthor?.sameAs)
      ? (rawAuthor.sameAs as string[])
      : Array.isArray(rawAuthor?.same_as)
        ? (rawAuthor.same_as as string[])
        : [],
  };

  return {
    id: raw.id as number,
    slug: raw.slug as string,
    title: raw.title as string,
    excerpt: (raw.excerpt as string) || "",
    content: (raw.content as string) || "",
    category: (raw.category as string) || "",
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    author,
    publishedAt:
      (raw.published_at as string) || (raw.publishedAt as string) || "",
    updatedAt: (raw.updated_at as string) || (raw.updatedAt as string) || "",
    readTime: (raw.read_time as string) || (raw.readTime as string) || "5 min",
    featured: raw.featured === true || raw.featured === 1,
    featuredImage:
      (raw.featured_image as string) ||
      (raw.featuredImage as string) ||
      undefined,
    featuredImageAlt:
      (raw.featured_image_alt as string) ||
      (raw.featuredImageAlt as string) ||
      undefined,
    metaTitle:
      (raw.meta_title as string) || (raw.metaTitle as string) || undefined,
    metaDescription:
      (raw.meta_description as string) ||
      (raw.metaDescription as string) ||
      undefined,
    // Nuevos campos SEO/GEO/AEO
    wordCount: (raw.word_count as number) || (raw.wordCount as number) || 0,
    primaryAnswer:
      (raw.primary_answer as string) ||
      (raw.primaryAnswer as string) ||
      undefined,
    faqItems: Array.isArray(raw.faq_items)
      ? raw.faq_items
      : Array.isArray(raw.faqItems)
        ? raw.faqItems
        : [],
    speakableSelectors: Array.isArray(raw.speakable_selectors)
      ? raw.speakable_selectors
      : Array.isArray(raw.speakableSelectors)
        ? raw.speakableSelectors
        : [],
  };
}
```

#### Actualizar mockPosts

Agregar los nuevos campos a cada mock post con valores por defecto:

```typescript
wordCount: 0,
primaryAnswer: undefined,
faqItems: [],
speakableSelectors: ['h1', '.post-excerpt'],
author: {
  id: 1,
  slug: 'jhedai-org',
  name: 'JhedAi',
  type: 'Organization' as const,
  sameAs: [],
},
```

---

### 2B. Fix SEOHead — JSON-LD en `<script>` separados

**Archivo**: `src/components/SEOHead.tsx` (linea 91-95)

**Problema actual**: Un solo `<script>` con array JSON. Google recomienda `<script>` separados por entidad.

**Cambiar de**:

```tsx
{
  jsonLd && (
    <script type="application/ld+json">
      {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])}
    </script>
  );
}
```

**A**:

```tsx
{
  jsonLd &&
    (Array.isArray(jsonLd) ? jsonLd : [jsonLd])
      .filter(Boolean)
      .map((schema, i) => (
        <script key={`ld-${i}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ));
}
```

---

### 2C. Reescribir JSON-LD en BlogPostPage.tsx

**Archivo**: `src/pages/BlogPostPage.tsx` (lineas 85-130)

Reemplazar el bloque completo `const jsonLd = {...}` con:

```typescript
const SITE_URL = "https://jhedai.com";

// Author: Person vs Organization con @id linking
const authorLd =
  post.author.type === "Person"
    ? {
        "@type": "Person",
        name: post.author.name,
        ...(post.author.jobTitle && { jobTitle: post.author.jobTitle }),
        ...(post.author.url && { url: post.author.url }),
        ...(post.author.avatar && {
          image: { "@type": "ImageObject", url: post.author.avatar },
        }),
        ...(post.author.sameAs.length > 0 && { sameAs: post.author.sameAs }),
      }
    : {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: post.author.name,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/isotipo-jhedai.png` },
      };

// Image como ImageObject (no string plano)
const imageLd = post.featuredImage
  ? {
      "@type": "ImageObject",
      url: post.featuredImage,
      ...(post.featuredImageAlt && { caption: post.featuredImageAlt }),
    }
  : undefined;

// BlogPosting completo con campos GEO/AEO
const blogPostingLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.metaDescription || post.excerpt,
  image: imageLd,
  datePublished: post.publishedAt,
  dateModified: post.updatedAt,
  author: authorLd,
  publisher: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/blog/${post.slug}`,
  },
  articleSection: post.category,
  inLanguage: "es",
  keywords: post.tags,
  ...(post.wordCount > 0 && { wordCount: post.wordCount }),
  ...(post.primaryAnswer && { abstract: post.primaryAnswer }),
  ...(post.speakableSelectors.length > 0 && {
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: post.speakableSelectors,
    },
  }),
};

// FAQ condicional (solo si el post tiene faqItems)
const faqLd =
  post.faqItems.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqItems.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

// Breadcrumb (mantener el existente)
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

// Pasar como array a SEOHead (cada uno sera un <script> separado)
// jsonLd={[blogPostingLd, breadcrumbLd, faqLd].filter(Boolean)}
```

---

### 2D. Seccion FAQ visible (AEO critico)

**Archivo**: `src/pages/BlogPostPage.tsx`

Despues del bloque de tags y antes del divider/CTA, agregar:

```tsx
{
  /* FAQ Section (AEO) */
}
{
  post.faqItems.length > 0 && (
    <section className="mt-12 border-t border-jhedai-neutral/20 pt-10">
      <h2 className="text-xl font-bold text-jhedai-primary mb-6">
        Preguntas Frecuentes
      </h2>
      <div className="space-y-4">
        {post.faqItems.map((faq, i) => (
          <details key={i} className="group">
            <summary className="cursor-pointer font-semibold text-jhedai-primary hover:text-jhedai-secondary transition-colors">
              {faq.question}
            </summary>
            <p className="mt-2 text-jhedai-primary/70 pl-4 border-l-2 border-jhedai-secondary/30">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
```

**Por que visible**: FAQ schema solo en JSON-LD no basta — los motores IA extraen del contenido visible. `<details>` es semantico y no ocupa espacio visual hasta click. FAQPage schema mejora citacion IA en 30%.

---

### 2E. `<time dateTime>` en fechas

Reemplazar `<span>` por `<time>` para fechas visibles (semantic HTML que IA entiende):

**BlogPostPage.tsx** (linea ~193):

```tsx
// ANTES:
<span className="text-[13px] text-jhedai-primary/40">{date}</span>

// DESPUES:
<time dateTime={post.publishedAt} className="text-[13px] text-jhedai-primary/40">{date}</time>
```

**BlogCard.tsx** (linea ~62):

```tsx
// ANTES:
<span className="text-[12px] text-jhedai-primary/40">{date}</span>

// DESPUES:
<time dateTime={post.publishedAt} className="text-[12px] text-jhedai-primary/40">{date}</time>
```

---

### 2F. Enriquecer OrganizationSchema

**Archivo**: `src/components/schemas/OrganizationSchema.tsx`

Agregar estos campos al item:

```typescript
'@id': 'https://jhedai.com/#organization',   // @id estable para entity linking
logo: {
  '@type': 'ImageObject',
  url: 'https://jhedai.com/isotipo-jhedai.png',
  width: '512',
  height: '512',
},
knowsAbout: [
  'Inteligencia Artificial',
  'Machine Learning',
  'Computer Vision',
  'Procesamiento de Lenguaje Natural',
  'Data Science',
  'Business Intelligence',
  'Automatizacion con IA',
  'Agentes Autonomos',
  'ChileValora Certificacion IA',
],
```

**Por que**: `@id` hace la entidad direccionable en el knowledge graph. Cuando BlogPosting usa `@id: '.../#organization'` en publisher, los motores IA entienden la relacion de autoridad. `knowsAbout` es senal de autoridad tematica para E-E-A-T.

---

### 2G. Activar ServiceSchema en ServiciosPage

**Archivo**: `src/pages/ServiciosPage.tsx`

1. Importar: `import { ServiceSchema } from '../components/schemas/ServiceSchema'`
2. Renderizar despues del `<BreadcrumbSchema />`: `<ServiceSchema />`

#### Actualizar ServiceSchema.tsx

Agregar `@id` y `hasOfferCatalog` con los 7 servicios, y referencia a Organization via `@id`:

```typescript
'@id': 'https://jhedai.com/#services',
provider: {
  '@type': 'Organization',
  '@id': 'https://jhedai.com/#organization',
},
hasOfferCatalog: {
  '@type': 'OfferCatalog',
  name: 'Servicios de IA',
  itemListElement: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Diagnostico IA' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Machine Learning' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Vision Computacional' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'NLP' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Business Intelligence' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Agentes Autonomos' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Capacitacion IA (ChileValora)' } },
  ],
},
```

---

### 2H. Eliminar BlogPostingSchema.tsx (dead code)

**Archivo**: `src/components/schemas/BlogPostingSchema.tsx` — ELIMINAR

Ya esta reemplazado por el JSON-LD inline enriquecido en BlogPostPage.tsx. Verificar con grep que no se importa en ningun lugar (actualmente no se usa).

---

## FASE 4: Sitemap Dinamico

### 4A. vite.config.ts — fetch blog slugs en build-time

**Archivo**: `vite.config.ts`

Cambiar de `defineConfig({...})` a `defineConfig(async () => {...})` para hacer fetch:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sitemap from "vite-plugin-sitemap";
import viteCompression from "vite-plugin-compression";

async function fetchBlogSlugs(): Promise<string[]> {
  try {
    const res = await fetch(
      "https://jhedai-api.edison-985.workers.dev/api/sitemap-data",
    );
    const json = (await res.json()) as { data: { slug: string }[] };
    return (json.data || []).map((p) => `/blog/${p.slug}`);
  } catch {
    console.warn("Could not fetch blog slugs for sitemap");
    return [];
  }
}

export default defineConfig(async () => {
  const blogRoutes = await fetchBlogSlugs();

  return {
    plugins: [
      react(),
      sitemap({
        hostname: "https://jhedai.com",
        dynamicRoutes: [
          "/",
          "/servicios",
          "/nosotros",
          "/blog",
          "/contacto",
          "/metodologia",
          "/ecosistema",
          "/privacidad",
          "/terminos",
          ...blogRoutes,
        ],
        robots: [
          // ... mantener la configuracion existente de robots ...
        ],
      }),
      // ... mantener compression plugins ...
    ],
    // ... mantener build config ...
  };
});
```

Cada build genera sitemap actualizado con todos los posts del blog.

---

## Resumen de archivos a modificar

| Archivo                                         | Cambios                                                                    | Impacto           |
| ----------------------------------------------- | -------------------------------------------------------------------------- | ----------------- |
| `src/lib/api.ts`                                | Author, FAQItem interfaces; BlogPost extendido; normalizePost(); mockPosts | Data model        |
| `src/components/SEOHead.tsx`                    | JSON-LD en `<script>` separados                                            | Validacion schema |
| `src/pages/BlogPostPage.tsx`                    | JSON-LD enriquecido, FAQ visible, `<time>`, speakable                      | SEO/GEO/AEO       |
| `src/components/BlogCard.tsx`                   | `<time dateTime>`                                                          | Semantic HTML     |
| `src/components/schemas/OrganizationSchema.tsx` | @id, knowsAbout, ImageObject logo                                          | E-E-A-T           |
| `src/pages/ServiciosPage.tsx`                   | Activar ServiceSchema                                                      | Schema stacking   |
| `src/components/schemas/ServiceSchema.tsx`      | hasOfferCatalog, @id, provider ref                                         | Service schema    |
| `src/components/schemas/BlogPostingSchema.tsx`  | ELIMINAR (dead code)                                                       | Cleanup           |
| `vite.config.ts`                                | Sitemap dinamico con fetch                                                 | Indexacion        |

---

## Verificacion post-implementacion

1. `npm run build` — sin errores TypeScript
2. **Google Rich Results Test** (https://search.google.com/test/rich-results) — validar BlogPosting + FAQPage + Breadcrumb en URL de post
3. **Schema.org Validator** (https://validator.schema.org/) — validar Organization con @id
4. **curl a API** — verificar author enriched:
   ```bash
   curl -s https://jhedai-api.edison-985.workers.dev/api/blog/posts?limit=1 | jq '.data.data[0].author'
   ```
5. Deploy a Vercel + Cloudflare Pages — verificar sitemap incluye todos los posts
6. **Lighthouse** — verificar mejora en SEO score
7. **Inspeccionar HTML renderizado** — verificar `<script type="application/ld+json">` separados, `<time dateTime>`, `<details>` en FAQ

---

## Principios GEO para contenido (no codigo, sino proceso editorial)

Cuando se escriban nuevos posts, aplicar estas tecnicas del paper GEO (Princeton KDD 2024):

1. **primary_answer**: Primera oracion del post debe responder directamente la pregunta del titulo (~150 chars). El 55% de las citaciones IA vienen del primer 30% del contenido.
2. **Citar fuentes**: Incluir citas con enlaces a estudios o reportes. Impacto: +28%.
3. **Agregar estadisticas**: Numeros concretos y porcentajes. Impacto: +33%.
4. **Quotation Addition**: Citas textuales de expertos o documentos oficiales. Impacto: +41%.
5. **word_count**: Posts de 1500+ palabras tienen mejor performance en AI engines.
6. **faq_items**: 3-5 preguntas frecuentes por post (las que alguien le preguntaria a un asistente IA).
7. **Freshness**: Actualizar contenido trimestralmente o pierde 3x citacion.

### Proceso para poblar datos SEO en posts existentes

Via API (requiere API_KEY configurado como wrangler secret):

```bash
# Actualizar un post con datos SEO/AEO
curl -X PUT https://jhedai-api.edison-985.workers.dev/api/blog/posts/SLUG \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{
    "word_count": 1200,
    "primary_answer": "El 74% de las grandes empresas chilenas planea aumentar su inversion en IA segun estudio reciente.",
    "faq_items": [
      {"question": "Que porcentaje de empresas chilenas invierte en IA?", "answer": "Segun estudios recientes, el 74% de las grandes empresas chilenas planea aumentar significativamente su inversion en tecnologias de IA."},
      {"question": "Que sectores lideran la adopcion de IA en Chile?", "answer": "Los sectores que mas invierten en IA son mineria, retail, finanzas y salud."},
      {"question": "Cuales son los principales desafios?", "answer": "Escasez de talento especializado, calidad de datos y necesidad de marcos regulatorios claros."}
    ]
  }'

# Crear un autor Person del equipo
curl -X POST https://jhedai-api.edison-985.workers.dev/api/authors \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{
    "slug": "ignacio-lopez",
    "name": "Ignacio Lopez",
    "type": "Person",
    "job_title": "CEO & Co-Founder, JhedAi",
    "bio": "Experto en inteligencia artificial aplicada a la industria chilena.",
    "avatar": "https://jhedai.com/team/ignacio.jpg",
    "url": "https://linkedin.com/in/ignacio-lopez",
    "same_as": ["https://linkedin.com/in/ignacio-lopez"]
  }'

# Asignar autor Person a un post
curl -X PUT https://jhedai-api.edison-985.workers.dev/api/blog/posts/SLUG \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{"author_id": 2}'
```
