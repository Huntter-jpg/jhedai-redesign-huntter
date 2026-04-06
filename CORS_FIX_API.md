# 🔧 Solución de Errores CORS y API

## Problema Actual

El Worker de Cloudflare en `jhedai-api.edison-985.workers.dev` no tiene headers CORS configurados, causando:

```
Access to fetch at 'https://jhedai-api.edison-985.workers.dev/api/posts'
from origin 'https://jhedai-redesign.vercel.app' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present
```

## Errores Detectados

### 1. ❌ Error CORS en `/api/posts` (CRÍTICO)

- **Estado**: Bloqueando todo el blog
- **Origen**: `https://jhedai-redesign.vercel.app`
- **Destino**: `https://jhedai-api.edison-985.workers.dev/api/posts`

### 2. ⚠️ Error 405 en `/api/analytics`

- **Estado**: Desactivado temporalmente
- **Ver**: `src/utils/vitals.ts`

### 3. 📢 THREE.Clock deprecation

- **Estado**: Warning menor, viene de dependencias
- **Acción**: No crítico, ignorar por ahora

---

## ✅ Solución: Configurar CORS en el Worker

### Opción 1: Worker Vanilla (sin framework)

```typescript
// worker/index.ts
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Headers CORS
    const corsHeaders = {
      "Access-Control-Allow-Origin": "https://jhedai-redesign.vercel.app",
      // O usar '*' para permitir todos los orígenes (solo en desarrollo):
      // 'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400", // 24 horas
    };

    // Manejar preflight requests (OPTIONS)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    // Tu lógica actual del Worker
    let response: Response;

    try {
      // Ejemplo: manejar rutas
      const url = new URL(request.url);

      if (url.pathname === "/api/posts") {
        response = await handlePosts(request, env);
      } else if (url.pathname === "/api/contact") {
        response = await handleContact(request, env);
      } else if (url.pathname === "/api/analytics") {
        response = await handleAnalytics(request, env);
      } else {
        response = new Response("Not Found", { status: 404 });
      }
    } catch (error) {
      response = new Response(
        JSON.stringify({ error: "Internal Server Error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Agregar CORS headers a la respuesta
    const headers = new Headers(response.headers);
    Object.entries(corsHeaders).forEach(([key, value]) => {
      headers.set(key, value);
    });

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
```

---

### Opción 2: Hono Framework (RECOMENDADO) ⭐

```typescript
// worker/index.ts
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

// Configurar CORS para todos los endpoints
app.use(
  "*",
  cors({
    origin: [
      "https://jhedai-redesign.vercel.app",
      "https://jhedai.com", // Dominio de producción
      "http://localhost:5173", // Desarrollo local
    ],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
    credentials: true,
  }),
);

// O CORS simple para permitir todos:
// app.use('*', cors());

// Rutas
app.get("/api/posts", async (c) => {
  // Tu lógica de posts
  return c.json({ posts: [] });
});

app.post("/api/contact", async (c) => {
  // Tu lógica de contacto
  const body = await c.req.json();
  return c.json({ success: true });
});

app.post("/api/analytics", async (c) => {
  // Tu lógica de analytics
  const body = await c.req.json();
  return c.json({ success: true });
});

export default app;
```

---

### Opción 3: itty-router (Alternativa ligera)

```typescript
// worker/index.ts
import { Router } from "itty-router";

const router = Router();

// Middleware CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Función helper para respuestas con CORS
const jsonResponse = (data: any, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
  });

// Manejar OPTIONS
router.options("*", () => new Response(null, { headers: corsHeaders }));

// Rutas
router.get("/api/posts", async (request, env) => {
  // Tu lógica
  return jsonResponse({ posts: [] });
});

router.post("/api/contact", async (request, env) => {
  const body = await request.json();
  return jsonResponse({ success: true });
});

router.post("/api/analytics", async (request, env) => {
  const body = await request.json();
  return jsonResponse({ success: true });
});

// 404
router.all("*", () => jsonResponse({ error: "Not Found" }, 404));

export default {
  fetch: router.fetch,
};
```

---

## 📦 Instalación de dependencias

### Para Hono:

```bash
cd worker
npm install hono
```

### Para itty-router:

```bash
cd worker
npm install itty-router
```

---

## 🚀 Deploy

```bash
# Desde el directorio del Worker
wrangler deploy
```

---

## ✅ Verificar que funciona

Después del deploy, prueba:

```bash
# Test CORS preflight
curl -X OPTIONS https://jhedai-api.edison-985.workers.dev/api/posts \
  -H "Origin: https://jhedai-redesign.vercel.app" \
  -H "Access-Control-Request-Method: GET" \
  -v

# Deberías ver los headers:
# Access-Control-Allow-Origin: https://jhedai-redesign.vercel.app
# Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
```

```bash
# Test endpoint real
curl https://jhedai-api.edison-985.workers.dev/api/posts \
  -H "Origin: https://jhedai-redesign.vercel.app"

# Debería retornar datos + headers CORS
```

---

## 📝 Checklist Post-Deploy

- [ ] CORS configurado en Worker
- [ ] Preflight (OPTIONS) funcionando
- [ ] `/api/posts` retorna datos con CORS
- [ ] `/api/contact` acepta POST con CORS
- [ ] `/api/analytics` configurado (opcional)
- [ ] Reactivar analytics en `src/utils/vitals.ts`
- [ ] Probar en producción: https://jhedai-redesign.vercel.app/blog

---

## 🔗 Referencias

- [Cloudflare Workers CORS](https://developers.cloudflare.com/workers/examples/cors-header-proxy/)
- [Hono CORS Middleware](https://hono.dev/middleware/builtin/cors)
- [MDN CORS](https://developer.mozilla.org/es/docs/Web/HTTP/CORS)
