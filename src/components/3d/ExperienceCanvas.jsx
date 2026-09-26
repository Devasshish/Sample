import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { SpaceEnvironment } from './SpaceEnvironment';
import { SyndicateCore } from './SyndicateCore';
import { OperativeStations } from './OperativeStations';
import { ArsenalPortals } from './ArsenalPortals';
import { WarpConvergence } from './WarpConvergence';
import { CameraRig } from './CameraRig';
import { getAdaptiveSettings } from '../../utils/performance';

export function ExperienceCanvas({
  progress = 0,
  reducedMotion = false,
  onSelectMember,
  hoveredMemberId,
  setHoveredMemberId,
  onSelectProject,
  hoveredProjectId,
  setHoveredProjectId,
  onCoreClick,
  onOpenTransmission,
  focusedTarget = null
}) {
  const adaptive = useMemo(() => getAdaptiveSettings(), []);

  return (
    <div
      className="canvas-container"
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden'
      }}
    >
      <Canvas
        camera={{ position: [0, 1.8, 8.5], fov: 45, near: 0.1, far: 80 }}
        gl={{
          antialias: !adaptive.isMobile,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true
        }}
        dpr={adaptive.dpr}
      >
        {/* Deep Cyber Space Background Color */}
        <color attach="background" args={['#04050d']} />

        {/* Atmospheric Volumetric Cyber Fog */}
        <fogExp2 attach="fog" args={['#04050d', 0.026]} />

        {/* Global Multi-Spectrum Lighting */}
        <ambientLight intensity={0.8} color="#0d1527" />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.8}
          color="#00f0ff"
        />
        <directionalLight
          position={[-5, 4, -5]}
          intensity={1.5}
          color="#ff007f"
        />
        <pointLight
          position={[0, 4, 0]}
          intensity={2.0}
          color="#ffffff"
          distance={16}
        />

        <Suspense fallback={null}>
          {/* Cinematic Camera Operator with Target Lock */}
          <CameraRig
            progress={progress}
            reducedMotion={reducedMotion}
            focusedTarget={focusedTarget}
          />

          {/* Infinite Cyber Grid, Glowing Starfield & Guide Rings */}
          <SpaceEnvironment progress={progress} />

          {/* Central Gravity Core (Sector 1 & 2) */}
          <SyndicateCore
            progress={progress}
            onCoreClick={onCoreClick}
          />

          {/* Five 3D Character Totems & Spatial HUD Badges (Sector 3) */}
          <OperativeStations
            progress={progress}
            onSelectMember={onSelectMember}
            hoveredMemberId={hoveredMemberId}
            setHoveredMemberId={setHoveredMemberId}
          />

          {/* Three Deployed Reality Commissions & Pedestals (Sector 4) */}
          <ArsenalPortals
            progress={progress}
            onSelectProject={onSelectProject}
            hoveredProjectId={hoveredProjectId}
            setHoveredProjectId={setHoveredProjectId}
          />

          {/* Sector 5 Warp Convergence Gate & Transmission Terminal */}
          <WarpConvergence
            progress={progress}
            onOpenTransmission={onOpenTransmission}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
