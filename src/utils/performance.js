// Performance and adaptive device capability utilities

export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return (
    window.innerWidth < 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
};

export const isLowPowerDevice = () => {
  if (typeof window === 'undefined') return false;
  const lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  const isMobile = isMobileDevice();
  return isMobile || lowCores;
};

export function getAdaptiveSettings() {
  const isMobile = isMobileDevice();
  const lowPower = isLowPowerDevice();

  return {
    isMobile,
    lowPower,
    // Mobile capped at 1.0 DPR to prevent fill-rate exhaustion
    // Desktop capped at 1.75 to prevent 4K overhead
    dpr: isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.75),
    particleCount: isMobile ? 100 : (lowPower ? 180 : 350),
    terrainSegments: isMobile ? 20 : 36,
    enableTerrainWireframe: !isMobile,
    enableDetailedShards: !isMobile
  };
}
