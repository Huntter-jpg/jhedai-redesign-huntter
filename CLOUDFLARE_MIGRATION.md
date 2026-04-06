# Guía de Migración a Cloudflare Pages

Esta guía te ayudará a migrar de Vercel a Cloudflare Pages para aprovechar las optimizaciones SEO avanzadas.

## ¿Por qué Cloudflare Pages?

### Ventajas sobre Vercel:

- ✅ **330+ edge locations** vs 30 de Vercel
- ✅ **Mejor TTFB** (<200ms vs ~800ms)
- ✅ **Workers** para pre-rendering de crawlers
- ✅ **Cloudflare Images** incluido (WebP/AVIF automático)
- ✅ **Speed Brain** (ML pre-fetching)
- ✅ **AI Bot Manager** para rate limiting
- ✅ **Costos menores** (Plan Free muy generoso)

### Comparación de Planes:

| Feature        | Vercel Free | Vercel Pro | Cloudflare Free   | Cloudflare Pro    |
| -------------- | ----------- | ---------- | ----------------- | ----------------- |
| Precio         | $0          | $20/mes    | $0                | $20/mes           |
| Bandwidth      | 100GB       | 1TB        | ♾️ Ilimitado      | ♾️ Ilimitado      |
| Builds         | 100/día     | Ilimitado  | 500/mes           | 5,000/mes         |
| Edge Locations | 30          | 30         | 330+              | 330+              |
| Workers        | ❌          | ❌         | ✅ 100k req/día   | ✅ 10M req/mes    |
| Images         | ❌          | ❌         | ✅ 100k transform | ✅ 500k transform |

---

## Pasos de Migración

### 1. Crear cuenta Cloudflare (si no tienes)

1. Ve a https://dash.cloudflare.com/sign-up
2. Crea tu cuenta gratuita
3. Verifica tu email

### 2. Crear proyecto Cloudflare Pages

#### Opción A: Deploy via Wrangler CLI (Recomendado)

```bash
# Instalar Wrangler (ya instalado en este proyecto)
npm install -D wrangler

# Login a Cloudflare
npx wrangler login

# Crear proyecto Pages
npx wrangler pages project create jhedai

# Build local
npm run build

# Deploy
npx wrangler pages deploy dist --project-name=jhedai
```

#### Opción B: Deploy via GitHub (Automático)

1. Ve a Cloudflare Dashboard > Pages
2. Click "Create a project"
3. Connect to Git > Selecciona tu repositorio
4. Configuración:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click "Save and Deploy"

### 3. Configurar Dominio Custom

1. En Cloudflare Dashboard > Pages > jhedai
2. Click "Custom domains"
3. Click "Set up a custom domain"
4. Ingresa `jhedai.com`
5. Cloudflare configurará automáticamente:
   - DNS records
   - SSL/TLS certificate (automático)
   - CDN global

### 4. Configurar KV Namespace (Opcional - Para Pre-rendering Cache)

```bash
# Crear KV namespace para cache
npx wrangler kv:namespace create "PRERENDER_CACHE"

# Copiar el ID que te da
# Output: { binding = "PRERENDER_CACHE", id = "xxxxx" }

# Editar wrangler.toml y descomentar:
[[kv_namespaces]]
binding = "PRERENDER_CACHE"
id = "xxxxx" # Reemplazar con tu ID
```

### 5. Activar Cloudflare Images (Opcional)

1. Dashboard > Images
2. Click "Enable Cloudflare Images"
3. Subir imágenes via API o Dashboard

#### Upload via API:

```bash
curl -X POST https://api.cloudflare.com/client/v4/accounts/{account_id}/images/v1 \
  -H "Authorization: Bearer {token}" \
  -F file=@logo-jhedai.png
```

#### Usar en React:

```tsx
// Antes
<img src="/logo-jhedai.png" />

// Después (con Cloudflare Images)
<img
  src="https://imagedelivery.net/{account_hash}/logo-jhedai/public"
  srcSet="
    https://imagedelivery.net/{hash}/logo-jhedai/w=320 320w,
    https://imagedelivery.net/{hash}/logo-jhedai/w=640 640w,
  "
  loading="lazy"
/>
```

### 6. Configurar Zaraz (Analytics sin impacto en performance)

1. Dashboard > Zaraz
2. Add tool > Google Analytics 4 (o tu herramienta preferida)
3. Configurar Measurement ID
4. Load Strategy: **Worker** (carga en background thread)

**Impacto**: TTI mejora ~40%, PageSpeed +10-15 puntos

### 7. Activar Speed Brain (Beta)

1. Dashboard > Speed > Optimization
2. Speed Brain > **Enabled**
3. Aggressiveness: **Medium**

**Función**: Pre-fetching inteligente con ML. Predice páginas que visitará el usuario.

### 8. Configurar AI Bot Manager

1. Dashboard > Security > Bots
2. Add Rule:

```javascript
{
  "expression": "cf.bot_management.verified_bot and (http.user_agent contains 'GPTBot' or http.user_agent contains 'Claude-Web')",
  "action": "allow",
  "rateLimit": {
    "requests": 100,
    "period": 60
  }
}
```

### 9. Testing y Validación

```bash
# Test local con Wrangler
npx wrangler pages dev dist

# Simular crawler
curl -A "Googlebot" https://jhedai.com/
# Debe retornar HTML con meta tags

curl -A "GPTBot" https://jhedai.com/
# Debe retornar HTML completo

curl -A "Mozilla/5.0" https://jhedai.com/
# Usuario normal: SPA React
```

### 10. Migrar DNS (Último paso)

**IMPORTANTE**: Hacer esto AL FINAL cuando todo esté probado.

1. Dashboard > Overview > Add site
2. Ingresar `jhedai.com`
3. Cloudflare escaneará tus DNS records
4. Revisar y confirmar records
5. Cambiar nameservers en tu registrador de dominio:
   - **Nameserver 1**: `xxx.ns.cloudflare.com`
   - **Nameserver 2**: `yyy.ns.cloudflare.com`
6. Esperar propagación DNS (1-24 horas)

---

## Scripts NPM Útiles

Agregar a `package.json`:

```json
{
  "scripts": {
    "deploy:cloudflare": "npm run build && npx wrangler pages deploy dist --project-name=jhedai",
    "dev:cloudflare": "npx wrangler pages dev dist",
    "preview:cloudflare": "npm run build && npm run dev:cloudflare"
  }
}
```

---

## Rollback Plan (Si algo sale mal)

1. **Mantener Vercel activo** durante las primeras semanas
2. **Usar subdomain para testing**: `beta.jhedai.com` en Cloudflare
3. **Monitorear métricas**:
   - PageSpeed Insights
   - Core Web Vitals
   - Error rates
4. **Si hay problemas**: Cambiar DNS de vuelta a Vercel

---

## Checklist Final

Antes de migrar DNS a Cloudflare:

- [ ] Build exitoso en Cloudflare Pages
- [ ] Todas las rutas funcionan correctamente
- [ ] Formularios y API endpoints operativos
- [ ] SSL certificate activo
- [ ] Meta tags y Schema.org validados
- [ ] Core Web Vitals medidos y mejores que Vercel
- [ ] Crawlers detectados correctamente
- [ ] Custom domain configurado
- [ ] Analytics funcionando

---

## Métricas Esperadas Post-Migración

| Métrica         | Vercel   | Cloudflare Target |
| --------------- | -------- | ----------------- |
| TTFB            | ~800ms   | **<200ms** ⚡     |
| LCP             | ~3-4s    | **<2.5s** ⚡      |
| PageSpeed Score | ~70-80   | **>90** ⚡        |
| Edge Locations  | 30       | **330+** 🌍       |
| Bandwidth Cost  | Limitado | **♾️ Ilimitado**  |

---

## Soporte

- **Cloudflare Docs**: https://developers.cloudflare.com/pages/
- **Community Forum**: https://community.cloudflare.com/
- **Discord**: https://discord.cloudflare.com/

---

## Costos Estimados

### Plan Recomendado: **Free** → Pro cuando >100k visitantes/mes

- **Plan Free**: $0/mes
  - ♾️ Bandwidth ilimitado
  - 500 builds/mes
  - 100k Workers requests/día
  - 100k Images transformations/mes

- **Plan Pro**: $20/mes (cuando crezcas)
  - Todo de Free +
  - 5,000 builds/mes
  - 10M Workers requests/mes
  - 500k Images transformations/mes
  - Analytics avanzado
  - Priority support

**Recomendación**: Empezar con Free, migrar a Pro solo cuando realmente lo necesites.
