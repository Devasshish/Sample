import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AtmosphericDust } from './AtmosphericDust';
import { TopologicalTerrain } from './TopologicalTerrain';
import { PrimordialCore } from './PrimordialCore';
import { TeamMonoliths } from './TeamMonoliths';
import { ProjectMonuments } from './ProjectMonuments';
import { CameraRig } from './CameraRig';

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
  return (
    <div className="canvas-container" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas
        camera={{ position: [0, 2.2, 10], fov: 45, near: 0.1, far: 80 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false
        }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
      >
        <color attach="background" args={['#0a0b0e']} />
        <fogExp2 attach="fog" args={['#0d0f14', 0.038]} />

        {/* Cinematic Atmospheric Lighting */}
        <ambientLight intensity={0.65} color="#fff1e6" />
        <directionalLight
          position={[6, 10, 8]}
          intensity={1.2}
          color="#ffefe0"
        />
        <directionalLight
          position={[-6, -4, -6]}
          intensity={0.4}
          color="#d97736"
        />
        <pointLight position={[0, 4, 2]} intensity={1.5} color="#ff8c42" distance={14} />

        <Suspense fallback={null}>
          <CameraRig progress={progress} reducedMotion={reducedMotion} />
          <AtmosphericDust count={reducedMotion ? 120 : 350} progress={progress} />
          <TopologicalTerrain progress={progress} />
          
          <PrimordialCore progress={progress} onCoreClick={onCoreClick} />
          
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
