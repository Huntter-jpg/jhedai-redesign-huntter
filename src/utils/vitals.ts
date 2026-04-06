/**
 * Core Web Vitals tracking
 * Measures and reports LCP, INP, CLS metrics to analytics
 * Based on Google's web-vitals library
 */

import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from "web-vitals";

/**
 * Send metric to analytics endpoint
 * Uses Navigator.sendBeacon for reliability (works even when page is unloading)
 *
 * NOTA: Temporalmente desactivado hasta configurar el endpoint en Cloudflare
 */
function sendToAnalytics(metric: Metric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics", body);
  } else {
    fetch("/api/analytics", {
      body,
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
    });
  }
}

/**
 * Log metric to console (development only)
 */
function logMetric(metric: Metric) {
  const emoji =
    metric.rating === "good"
      ? "✅"
      : metric.rating === "needs-improvement"
        ? "⚠️"
        : "❌";

  console.log(`${emoji} ${metric.name}:`, {
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
  });
}

/**
 * Initialize Core Web Vitals tracking
 * Call this once in your app entry point (main.tsx)
 *
 * Metrics tracked:
 * - LCP (Largest Contentful Paint): < 2.5s good
 * - INP (Interaction to Next Paint): < 200ms good
 * - CLS (Cumulative Layout Shift): < 0.1 good
 * - FCP (First Contentful Paint): < 1.8s good
 * - TTFB (Time to First Byte): < 800ms good
 */
export function initVitals() {
  // Core Web Vitals (ranking factors)
  onLCP((metric) => {
    logMetric(metric);
    sendToAnalytics(metric);
  });

  onINP((metric) => {
    logMetric(metric);
    sendToAnalytics(metric);
  });

  onCLS((metric) => {
    logMetric(metric);
    sendToAnalytics(metric);
  });

  // Additional metrics (not ranking factors but helpful)
  onFCP((metric) => {
    logMetric(metric);
    sendToAnalytics(metric);
  });

  onTTFB((metric) => {
    logMetric(metric);
    sendToAnalytics(metric);
  });
}
