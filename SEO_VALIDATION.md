# Guía de Validación SEO - JhedAI

Esta guía te ayudará a validar todas las optimizaciones SEO implementadas.

---

## 🎯 URLs de Testing

### Producción Actual

- **Vercel**: https://jhedai-redesign.vercel.app
- **Sitemap**: https://jhedai-redesign.vercel.app/sitemap.xml
- **Robots**: https://jhedai-redesign.vercel.app/robots.txt

---

## ✅ Checklist de Validación

### 1. Structured Data (Schema.org) - CRÍTICO

#### A. Google Rich Results Test

```
https://search.google.com/test/rich-results?url=https://jhedai-redesign.vercel.app
```

**Qué buscar:**

- ✅ Organization schema detectado
- ✅ Sin errores de validación
- ✅ Logo visible en preview
- ✅ Social media links presentes

**Screenshot recomendado:** Guardar resultado para documentación

#### B. Schema.org Validator

```
https://validator.schema.org/#url=https://jhedai-redesign.vercel.app
```

**Qué buscar:**

- ✅ JSON-LD válido
- ✅ Sin warnings
- ✅ Todos los campos requeridos presentes
- ✅ URLs absolutas (no relativas)

#### C. Testing Manual de Schemas

**Página de Blog** (cuando esté disponible):

```tsx
// Verificar que BlogPostingSchema está implementado
import BlogPostingSchema from "../components/schemas/BlogPostingSchema";

<BlogPostingSchema
  title="Título del post"
  description="Descripción"
  slug="mi-post"
  publishedAt="2025-02-24T12:00:00Z"
  featuredImage="https://..."
  category="Industria"
/>;
```

**Página con FAQs** (cuando esté disponible):

```tsx
import FAQPageSchema from "../components/schemas/FAQPageSchema";

const faqs = [
  {
    question: "¿Qué es JhedAI?",
    answer: "JhedAI es una consultora...",
  },
  // ...más FAQs
];

<FAQPageSchema faqs={faqs} />;
```

---

### 2. Meta Tags y Open Graph

#### A. Facebook Sharing Debugger

```
https://developers.facebook.com/tools/debug/?q=https://jhedai-redesign.vercel.app
```

**Qué buscar:**

- ✅ og:title correcto
- ✅ og:description presente
- ✅ og:image carga correctamente (1200x630px recomendado)
- ✅ og:url correcto
- ✅ Sin warnings

**Acción:** Click "Scrape Again" para forzar refresh

#### B. Twitter Card Validator

```
https://cards-dev.twitter.com/validator
```

**Qué buscar:**

- ✅ Card type: summary_large_image
- ✅ Title visible
- ✅ Description visible
- ✅ Image preview correcto

#### C. LinkedIn Post Inspector

```
https://www.linkedin.com/post-inspector/
```

**Qué buscar:**

- ✅ Preview correcto
- ✅ Image visible
- ✅ Title y description presentes

---

### 3. Core Web Vitals y Performance

#### A. PageSpeed Insights (Desktop)

```
https://pagespeed.web.dev/?url=https://jhedai-redesign.vercel.app&form_factor=desktop
```

**Targets a alcanzar:**

- ✅ Performance Score: **>90**
- ✅ LCP (Largest Contentful Paint): **<2.5s**
- ✅ INP (Interaction to Next Paint): **<200ms**
- ✅ CLS (Cumulative Layout Shift): **<0.1**
- ✅ FCP (First Contentful Paint): **<1.8s**
- ✅ TTFB (Time to First Byte): **<800ms**

**Estado actual esperado:**

- Performance: ~75-85 (Vercel)
- Performance esperado Cloudflare: >90

#### B. PageSpeed Insights (Mobile)

```
https://pagespeed.web.dev/?url=https://jhedai-redesign.vercel.app&form_factor=mobile
```

**Targets a alcanzar:**

- ✅ Performance Score: **>80**
- ✅ LCP: **<2.5s**
- ✅ INP: **<200ms**
- ✅ CLS: **<0.1**

#### C. WebPageTest

```
https://www.webpagetest.org/
```

**Configuración:**

- Test Location: Santiago, Chile (más cercano)
- Browser: Chrome
- Connection: 4G

**Qué analizar:**

- ✅ First Byte Time
- ✅ Start Render
- ✅ Speed Index
- ✅ Filmstrip view (visual progress)

#### D. Chrome DevTools Lighthouse

**Ejecutar localmente:**

```bash
# 1. Abrir Chrome DevTools (F12)
# 2. Tab "Lighthouse"
# 3. Categories: Performance, SEO, Best Practices
# 4. Click "Analyze page load"
```

**Targets:**

- ✅ Performance: >90
- ✅ SEO: 100
- ✅ Best Practices: >90
- ✅ Accessibility: >90

---

### 4. Sitemap y Robots.txt

#### A. Sitemap.xml Validation

```
https://www.xml-sitemaps.com/validate-xml-sitemap.html
```

**URL a validar:**

```
https://jhedai-redesign.vercel.app/sitemap.xml
```

**Qué verificar:**

- ✅ XML bien formado
- ✅ Todas las URLs válidas (200 status)
- ✅ lastmod dates presentes
- ✅ priority configurado
- ✅ changefreq razonable

#### B. Robots.txt Tester (Google Search Console)

**Manual check:**

```bash
curl https://jhedai-redesign.vercel.app/robots.txt
```

**Verificar:**

- ✅ Sitemap URL presente
- ✅ AI crawlers configurados (GPTBot, Claude-Web, etc.)
- ✅ Crawl-delay apropiado
- ✅ Disallow rules correctos (/admin/, /api/)
- ✅ Permite indexación general (Allow: /)

---

### 5. Compresión y Optimización

#### A. Compression Test

```
https://www.giftofspeed.com/gzip-test/
```

**Qué verificar:**

- ✅ Gzip enabled: YES
- ✅ Compression ratio: >60%
- ✅ Brotli support (mejor que Gzip)

#### B. Verificar Headers

```bash
# Test Gzip
curl -H "Accept-Encoding: gzip" -I https://jhedai-redesign.vercel.app/assets/index-*.js

# Test Brotli (mejor compresión)
curl -H "Accept-Encoding: br" -I https://jhedai-redesign.vercel.app/assets/index-*.js
```

**Headers esperados:**

```
Content-Encoding: br (o gzip)
Cache-Control: public, max-age=31536000, immutable (para assets)
```

#### C. Bundle Size Analysis

**Verificar chunks generados:**

```bash
npm run build

# Revisar output:
# - react-vendor: ~47KB (16KB gzip, 14KB brotli)
# - three-vendor: ~1040KB (288KB gzip, 231KB brotli)
# - animation-vendor: ~116KB (38KB gzip, 34KB brotli)
```

**Visualizar bundle:**

```bash
npx vite-bundle-visualizer
```

---

### 6. Crawlers y AI Bots

#### A. Simular Googlebot

```bash
curl -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" \
  https://jhedai-redesign.vercel.app/
```

**Verificar:**

- ✅ HTML completo retornado (no shell vacío)
- ✅ Meta tags presentes en HTML
- ✅ Schema.org JSON-LD en <head>

#### B. Simular GPTBot (OpenAI)

```bash
curl -A "GPTBot/1.0 (+https://openai.com/gptbot)" \
  https://jhedai-redesign.vercel.app/
```

**Verificar:**

- ✅ HTML accesible
- ✅ robots.txt permite GPTBot
- ✅ Sin bloqueos

#### C. Simular Claude-Web (Anthropic)

```bash
curl -A "Claude-Web/1.0 (+https://www.anthropic.com)" \
  https://jhedai-redesign.vercel.app/
```

**Verificar:**

- ✅ HTML accesible
- ✅ Crawl-delay respetado en robots.txt

#### D. User-Agent Coverage

**Crawlers configurados en robots.txt:**

- ✅ Googlebot
- ✅ Bingbot
- ✅ DuckDuckBot
- ✅ GPTBot (OpenAI)
- ✅ ChatGPT-User
- ✅ Claude-Web (Anthropic)
- ✅ anthropic-ai
- ✅ Google-Extended (Gemini/Bard)
- ✅ PerplexityBot
- ✅ YouBot
- ✅ CCBot (Common Crawl)

**Crawlers bloqueados:**

- ❌ AhrefsBot (SEO tool)
- ❌ SemrushBot (SEO tool)
- ❌ DotBot
- ❌ MJ12bot

---

### 7. Google Search Console Integration

#### A. Agregar Propiedad

1. Ve a https://search.google.com/search-console
2. Click "Agregar propiedad"
3. Seleccionar "Prefijo de URL"
4. Ingresar: `https://jhedai.com`

#### B. Verificar Propiedad

**Método recomendado: HTML tag**

Agregar en `src/components/SEOHead.tsx`:

```tsx
<meta name="google-site-verification" content="tu-codigo-aqui" />
```

#### C. Enviar Sitemap

1. Search Console > Sitemaps
2. Ingresar URL: `https://jhedai.com/sitemap.xml`
3. Click "Enviar"

**Monitorear:**

- ✅ Páginas descubiertas
- ✅ Páginas indexadas
- ✅ Errores de cobertura
- ✅ Core Web Vitals

---

### 8. Analytics Validation

#### A. Si usas Plausible

**Configuración:**

```tsx
// src/components/Analytics.tsx
const USE_PLAUSIBLE = true;
const PLAUSIBLE_DOMAIN = "jhedai.com";
```

**Verificar:**

1. Dashboard Plausible: https://plausible.io/jhedai.com
2. Real-time visitors visible
3. Page views tracking
4. No cookies en DevTools > Application > Cookies

#### B. Si usas Google Tag Manager

**Verificación:**

```bash
# Verificar script GTM cargado
curl https://jhedai-redesign.vercel.app/ | grep "googletagmanager"
```

**Google Tag Assistant:**

1. Instalar extensión Chrome: "Tag Assistant Companion"
2. Visitar sitio
3. Verificar tags disparados

---

### 9. Mobile-Friendly Test

```
https://search.google.com/test/mobile-friendly?url=https://jhedai-redesign.vercel.app
```

**Qué verificar:**

- ✅ Page is mobile-friendly: YES
- ✅ Text readable without zoom
- ✅ Tap targets appropriately sized
- ✅ Content wider than screen: NO

---

### 10. Security Headers

```bash
curl -I https://jhedai-redesign.vercel.app/
```

**Headers esperados (si Cloudflare activo):**

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

**Test online:**

```
https://securityheaders.com/?q=https://jhedai-redesign.vercel.app
```

**Target:** Grade A o A+

---

## 📊 Métricas Esperadas

### Estado Actual (Vercel)

| Métrica             | Target | Esperado Vercel |
| ------------------- | ------ | --------------- |
| PageSpeed (Desktop) | >90    | ~75-85          |
| PageSpeed (Mobile)  | >80    | ~70-80          |
| LCP                 | <2.5s  | ~3-4s           |
| TTFB                | <800ms | ~600-800ms      |
| SEO Score           | 100    | 95-100          |
| Gzip Compression    | >60%   | ~65%            |
| Brotli Compression  | >70%   | ~75%            |

### Estado Esperado (Cloudflare)

| Métrica             | Target | Esperado Cloudflare |
| ------------------- | ------ | ------------------- |
| PageSpeed (Desktop) | >90    | **90-95** ⚡        |
| PageSpeed (Mobile)  | >80    | **85-90** ⚡        |
| LCP                 | <2.5s  | **<2.5s** ⚡        |
| TTFB                | <800ms | **<200ms** ⚡       |
| SEO Score           | 100    | **100** ⚡          |
| Edge Locations      | -      | **330+** 🌍         |

---

## 🐛 Troubleshooting

### Problema: Schema.org no detectado

**Solución:**

```bash
# Verificar que el script está en el HTML
curl https://jhedai-redesign.vercel.app/ | grep "application/ld+json"

# Si no aparece, verificar que react-helmet-async está wrapping la app
```

### Problema: OG image no carga

**Checklist:**

- ✅ Imagen es >200KB? (comprimir)
- ✅ URL absoluta? (no relativa)
- ✅ Dimensiones 1200x630px?
- ✅ Formato JPG/PNG?

### Problema: Core Web Vitals pobres

**Acciones:**

1. Verificar lazy loading de imágenes
2. Revisar bundle sizes (chunks >500KB?)
3. Verificar 3D canvas con `frameloop="never"` cuando off-screen
4. Migrar a Cloudflare para mejor TTFB

### Problema: Crawlers no ven contenido

**Para SPA (Vercel actual):**

- ⚠️ Normal - Crawlers ven shell HTML básico
- ✅ Meta tags y Schema.org están en <head> (suficiente)

**Solución definitiva:**

- Migrar a Cloudflare Pages + Worker middleware
- Pre-rendering automático para crawlers

---

## 📈 Monitoreo Continuo

### Herramientas Recomendadas

1. **Google Search Console** (gratis)
   - Core Web Vitals
   - Cobertura de indexación
   - Problemas de usabilidad móvil

2. **Plausible Analytics** ($9/mes)
   - Privacy-first
   - Sin cookies
   - Core Web Vitals tracking

3. **Cloudflare Analytics** (incluido)
   - Requests y bandwidth
   - Bot traffic
   - Performance metrics

4. **Sentry** (opcional)
   - Error tracking
   - Performance monitoring
   - User feedback

---

## ✅ Checklist Final Pre-Launch

- [ ] Google Rich Results Test: Passed
- [ ] Schema.org Validator: No errors
- [ ] Facebook Debugger: Preview correcto
- [ ] Twitter Card: Preview correcto
- [ ] PageSpeed Desktop: >80
- [ ] PageSpeed Mobile: >70
- [ ] Sitemap.xml: Válido y accesible
- [ ] robots.txt: Configurado correctamente
- [ ] Gzip/Brotli: Activo
- [ ] Google Search Console: Sitemap enviado
- [ ] Analytics: Configurado y tracking
- [ ] Mobile-Friendly Test: Passed
- [ ] Security Headers: Grade A/B
- [ ] All crawlers: HTML accesible

---

## 🚀 Próximo Paso Recomendado

**Opción 1: Validar todo ahora** ⭐

1. Ejecutar todos los tests de esta guía
2. Documentar resultados
3. Fix issues encontrados
4. Re-test

**Opción 2: Deploy a Cloudflare**

1. Seguir `CLOUDFLARE_MIGRATION.md`
2. Deploy staging primero
3. Validar en staging
4. Migrar DNS producción

**Opción 3: Monitor durante 1 semana**

1. Configurar Search Console
2. Activar Analytics
3. Monitorear métricas
4. Decidir migración Cloudflare según datos

---

**Última actualización:** 2026-02-24
