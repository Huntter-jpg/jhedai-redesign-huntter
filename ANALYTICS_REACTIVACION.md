# 📊 Reactivación de Analytics

## Estado Actual

✅ Analytics **desactivado temporalmente** para evitar errores 405

El código está comentado en: `src/utils/vitals.ts`

---

## Opciones para Reactivar

### Opción 1: Usar Cloudflare Pages Function (Ya creado) ⭐

Ya creamos el archivo `functions/api/analytics.ts` que maneja las métricas.

**Ventaja**: No requiere Worker separado, se despliega con tu sitio.

**Para activarlo**:

1. **Reactivar el código en vitals.ts**:

```typescript
// Descomentar las líneas en src/utils/vitals.ts (líneas ~27-35)
```

2. **Deploy a Cloudflare Pages**:

```bash
npm run build
# El deploy a Cloudflare Pages incluirá automáticamente la función
```

3. **Verificar que funciona**:

```bash
curl -X POST https://tu-sitio.pages.dev/api/analytics \
  -H "Content-Type: application/json" \
  -d '{"name":"LCP","value":2500,"rating":"good","delta":0,"id":"test"}'
```

---

### Opción 2: Configurar en Worker Separado

Si prefieres centralizar en `jhedai-api.edison-985.workers.dev`:

1. **Agregar ruta en el Worker**:

```typescript
// En tu Worker
app.post("/api/analytics", async (c) => {
  const metric = await c.req.json();

  // Guardar en Analytics Engine o KV
  if (c.env.ANALYTICS) {
    c.env.ANALYTICS.writeDataPoint({
      blobs: [metric.name, metric.rating],
      doubles: [metric.value],
    });
  }

  return c.json({ success: true });
});
```

2. **Configurar CORS** (ver CORS_FIX_API.md)

3. **Reactivar en frontend**:

```typescript
// En src/utils/vitals.ts, cambiar la URL:
const API_URL = "https://jhedai-api.edison-985.workers.dev";

fetch(`${API_URL}/api/analytics`, {
  method: "POST",
  body: JSON.stringify(metric),
  headers: { "Content-Type": "application/json" },
});
```

---

### Opción 3: Usar Google Analytics / Vercel Analytics

**Google Analytics 4**:

```bash
npm install @analytics/google-analytics
```

```typescript
// src/utils/vitals.ts
import Analytics from "analytics";
import googleAnalytics from "@analytics/google-analytics";

const analytics = Analytics({
  app: "jhedai",
  plugins: [
    googleAnalytics({
      measurementIds: ["G-XXXXXXXXXX"],
    }),
  ],
});

// En sendToAnalytics:
analytics.track("Web Vital", {
  name: metric.name,
  value: metric.value,
  rating: metric.rating,
});
```

**Vercel Analytics** (más simple):

```bash
npm install @vercel/analytics
```

```typescript
// src/main.tsx
import { Analytics } from '@vercel/analytics/react';

<Analytics />
```

---

## 📝 Código para Reactivar

### Paso 1: Editar `src/utils/vitals.ts`

Reemplazar la función `sendToAnalytics` con:

```typescript
function sendToAnalytics(metric: Metric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  });

  // Use sendBeacon if available (preferred - works during page unload)
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics", body);
  } else {
    // Fallback to fetch with keepalive
    fetch("/api/analytics", {
      body,
      method: "POST",
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
```

### Paso 2: Deploy

```bash
npm run build
# Deploy a tu plataforma (Cloudflare Pages, Vercel, etc.)
```

### Paso 3: Verificar en consola del navegador

Deberías ver:

```
✅ LCP: { value: 2500, rating: 'good' }
✅ FCP: { value: 1200, rating: 'good' }
```

Y NO ver errores 405.

---

## 🔍 Ver los Datos

### Si usas Cloudflare Analytics Engine:

1. Ve a **Cloudflare Dashboard**
2. **Analytics & Logs** > **Analytics Engine**
3. Crea queries SQL:

```sql
SELECT
  blob1 AS metric_name,
  AVG(double1) AS avg_value,
  COUNT(*) AS count
FROM ANALYTICS_DATASET
WHERE blob1 IN ('LCP', 'FCP', 'CLS', 'INP', 'TTFB')
GROUP BY blob1
ORDER BY avg_value DESC
```

### Si usas Cloudflare Pages Logs:

```bash
wrangler pages deployment tail
```

---

## ⚠️ Importante

- **No reactivar** hasta que el endpoint esté funcionando (CORS configurado)
- **Probar primero** con curl antes de habilitar en producción
- **Monitorear** los logs después de reactivar

---

## 🎯 Recomendación

**Opción 1 (Pages Function)** es la más simple si solo quieres logs.
**Opción 3 (Vercel Analytics)** es la más robusta para analytics reales.
