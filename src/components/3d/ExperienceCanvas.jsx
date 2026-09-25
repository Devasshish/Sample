import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { AtmosphericDust } from './AtmosphericDust';
import { TopologicalTerrain } from './TopologicalTerrain';
import { PrimordialCore } from './PrimordialCore';
import { TeamMonoliths } from './TeamMonoliths';
import { ProjectMonuments } from './ProjectMonuments';
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
  onCoreClick
}) {
  const adaptive = useMemo(() => getAdaptiveSettings(), []);

  return (
    <div className="canvas-container" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas
        camera={{ position: [-0.6, 1.6, 8.2], fov: 45, near: 0.1, far: 85 }}
        gl={{
          antialias: !adaptive.isMobile,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true
        }}
        dpr={adaptive.dpr}
      >
        <color attach="background" args={['#0a0b0e']} />
        <fogExp2 attach="fog" args={['#0d0f14', 0.030]} />

        {/* Global Ambient Fill */}
        <ambientLight intensity={0.85} color="#fff1e6" />
        
        {/* Key Sunlight */}
        <directionalLight
          position={[8, 14, 10]}
          intensity={1.8}
          color="#fff5ea"
        />

        {/* Subterranean Rim / Edge Light */}
        <directionalLight
          position={[-8, 5, -8]}
          intensity={1.1}
          color="#94a3b8"
        />

        {/* Terracotta Ground Bounce Light */}
        <pointLight
          position={[1.8, -3, 2]}
          intensity={2.2}
          color="#ff6b35"
          distance={15}
          decay={2}
        />

        <Suspense fallback={null}>
          <CameraRig progress={progress} reducedMotion={reducedMotion} />
          
          <AtmosphericDust
            count={reducedMotion ? 80 : adaptive.particleCount}
            progress={progress}
          />
          
          <TopologicalTerrain
            progress={progress}
            segments={adaptive.terrainSegments}
            enableWireframe={adaptive.enableTerrainWireframe}
          />
          
          <PrimordialCore
            progress={progress}
            onCoreClick={onCoreClick}
            enableShards={adaptive.enableDetailedShards}
          />
          
          <TeamMonoliths
            progress={progress}
            onSelectMember={onSelectMember}
            hoveredMemberId={hoveredMemberId}
            setHoveredMemberId={setHoveredMemberId}
          />
          
          <ProjectMonuments
            progress={progress}
            onSelectProject={onSelectProject}
            hoveredProjectId={hoveredProjectId}
            setHoveredProjectId={setHoveredProjectId}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
