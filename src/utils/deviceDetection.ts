/**
 * Device detection and Level of Detail (LOD) configuration
 * for optimizing 3D particle systems based on device capabilities
 */

export type DeviceTier = "mobile" | "tablet" | "low-desktop" | "high-desktop";

export interface LODConfig {
  particleCount: number;
  dpr: [number, number];
  antialias: boolean;
}

/**
 * Detects device performance tier for Level of Detail (LOD) adjustments
 * @returns {'mobile' | 'tablet' | 'low-desktop' | 'high-desktop'}
 *
 * @example
 * const tier = getDeviceTier();
 * const particleCount = BASE_COUNT * LOD_CONFIG[tier].particleCount;
 */
export const getDeviceTier = (): DeviceTier => {
  const userAgent = navigator.userAgent;
  const isMobile = /iPhone|iPod|Android.*Mobile/i.test(userAgent);
  const isTablet =
    /iPad|Android(?!.*Mobile)/i.test(userAgent) && window.innerWidth >= 768;
  const width = window.innerWidth;

  // Mobile devices
  if (isMobile && !isTablet) {
    return "mobile";
  }

  // Tablet devices
  if (isTablet || (width >= 768 && width < 1024)) {
    return "tablet";
  }

  // Desktop detection - check for low-power indicators
  const isSafari =
    userAgent.includes("Safari") && !userAgent.includes("Chrome");
  const hasHighMemory = (navigator as any).deviceMemory
    ? (navigator as any).deviceMemory >= 8
    : true;
  const hasHighCores = navigator.hardwareConcurrency
    ? navigator.hardwareConcurrency >= 4
    : true;

  // Only flag Safari as low-power if deviceMemory API confirms it
  const isLowPowerSafari = isSafari && !hasHighMemory;

  // Low-power desktop (low RAM or few cores)
  if (isLowPowerSafari || !hasHighMemory || !hasHighCores) {
    return "low-desktop";
  }

  // High-end desktop
  return "high-desktop";
};

/**
 * LOD configuration per device tier
 * - particleCount: Multiplier for base particle count (0.3 = 30% of desktop)
 * - dpr: Device pixel ratio range [min, max]
 * - antialias: Enable/disable antialiasing
 */
export const LOD_CONFIG: Record<DeviceTier, LODConfig> = {
  mobile: {
    particleCount: 0.3, // 30% of desktop particle count
    dpr: [1, 1.5], // Lower DPR for performance
    antialias: false, // Disable AA on mobile
  },
  tablet: {
    particleCount: 0.5, // 50% of desktop particle count
    dpr: [1, 1.5],
    antialias: false,
  },
  "low-desktop": {
    particleCount: 0.75, // 75% of desktop particle count
    dpr: [1, 1.5],
    antialias: false, // Disable AA on low-power
  },
  "high-desktop": {
    particleCount: 1.0, // Full particle count
    dpr: [1, 2], // Allow up to 2x DPR
    antialias: true, // Enable AA on high-end
  },
};

/**
 * Get LOD configuration for current device
 * @returns LODConfig object with particleCount, dpr, antialias
 */
export const getLODConfig = (): LODConfig => {
  const tier = getDeviceTier();
  return LOD_CONFIG[tier];
};

/**
 * Calculate actual particle count based on base count and device tier
 * @param baseCount - Base particle count for high-end desktop
 * @returns Adjusted particle count for current device
 */
export const getParticleCount = (baseCount: number): number => {
  const config = getLODConfig();
  return Math.floor(baseCount * config.particleCount);
};
