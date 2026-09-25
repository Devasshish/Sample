import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { StudioArchitecture } from './StudioArchitecture';
import { StudioLighting } from './StudioLighting';
import { StudioWorkstations } from './StudioWorkstations';
import { StudioProcessChain } from './StudioProcessChain';
import { StudioProjectPortals } from './StudioProjectPortals';
import { SunbeamDust } from './SunbeamDust';
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
  setHoveredProjectId
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
        camera={{ position: [-2.2, 1.4, 7.8], fov: 42, near: 0.1, far: 50 }}
        gl={{
          antialias: !adaptive.isMobile,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true
        }}
        dpr={adaptive.dpr}
        shadows
      >
        {/* Dynamic Studio Background Color */}
        <color attach="background" args={['#0e1017']} />
        
        {/* Architectural atmospheric depth haze */}
        <fogExp2 attach="fog" args={['#0e1118', 0.024]} />

        <Suspense fallback={null}>
          {/* Cinematic Camera Operator Rig */}
          <CameraRig progress={progress} reducedMotion={reducedMotion} />

          {/* Dynamic Night-to-Dawn Studio Lighting */}
          <StudioLighting progress={progress} />

          {/* Physical Studio Architectural Shell (Concrete, Windows, Beams) */}
          <StudioArchitecture progress={progress} />

          {/* 5 Physical Practitioner Workstations & Detailed Desks */}
          <StudioWorkstations
            progress={progress}
            onSelectMember={onSelectMember}
            hoveredMemberId={hoveredMemberId}
            setHoveredMemberId={setHoveredMemberId}
          />

          {/* Physical Storytelling Chain: Question -> Sketch -> Model -> Code -> Motion -> Experience */}
          <StudioProcessChain progress={progress} />

          {/* Fictional Architectural Commissions & Physical Pedestal Portals */}
          <StudioProjectPortals
            progress={progress}
            onSelectProject={onSelectProject}
            hoveredProjectId={hoveredProjectId}
            setHoveredProjectId={setHoveredProjectId}
          />

          {/* Natural Atmospheric Dust Motes drifting in the morning sunbeams */}
          <SunbeamDust
            count={reducedMotion ? 60 : (adaptive.isMobile ? 50 : 140)}
            progress={progress}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
