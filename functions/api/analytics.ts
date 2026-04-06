/**
 * Cloudflare Pages Function: Analytics endpoint
 *
 * Recibe Core Web Vitals desde el frontend y los almacena
 * Alternativa temporal hasta configurar el Worker principal
 */

interface Env {
  ANALYTICS?: AnalyticsEngineDataset;
}

interface WebVitalMetric {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  id: string;
  navigationType?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    // Parse body
    const metric: WebVitalMetric = await request.json();

    // Validación básica
    if (!metric.name || typeof metric.value !== "number") {
      return new Response(JSON.stringify({ error: "Invalid metric data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Si Analytics Engine está configurado, enviar datos
    if (env.ANALYTICS) {
      env.ANALYTICS.writeDataPoint({
        blobs: [metric.name, metric.rating, metric.navigationType || "unknown"],
        doubles: [metric.value, metric.delta],
        indexes: [metric.id],
      });
    }

    // Log en desarrollo (ver en Cloudflare Dashboard > Functions > Logs)
    console.log(`[Vitals] ${metric.name}: ${metric.value} (${metric.rating})`);

    // Responder con éxito
    return new Response(
      JSON.stringify({ success: true, metric: metric.name }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // CORS
        },
      },
    );
  } catch (error) {
    console.error("[Analytics Error]", error);

    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};

// Manejar preflight CORS (OPTIONS)
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
};
