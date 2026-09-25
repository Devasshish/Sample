import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
  getDraftingSketchTexture,
  getCadScreenTexture,
  getCodeScreenTexture,
  getMotionScreenTexture,
  getSmokedOakTexture
} from '../../utils/studioTextures';

export function StudioProcessChain({ progress = 0 }) {
  const oakTexture = useMemo(() => getSmokedOakTexture(), []);
  const sketchTexture = useMemo(() => getDraftingSketchTexture(), []);
  const cadTexture = useMemo(() => getCadScreenTexture(), []);
  const codeTexture = useMemo(() => getCodeScreenTexture(), []);
  const motionTexture = useMemo(() => getMotionScreenTexture(), []);

  // Process reveal factor (active mainly around progress 0.45 - 0.70)
  const isProcessScene = progress >= 0.45 && progress <= 0.75;
  const processIntensity = Math.max(0, Math.min(1, (progress - 0.42) / 0.12));

  return (
    <group name="StudioProcessChain" position={[0, 0, 1.1]}>
      {/* 1. SOLID TIMBER LAYOUT BENCH (x: -2.4 to +2.4, y: 0.74) */}
      <mesh position={[0, 0.74, 0]} receiveShadow castShadow>
        <boxGeometry args={[4.8, 0.05, 0.84]} />
        <meshStandardMaterial
          map={oakTexture}
          color="#3e3226"
          roughness={0.7}
        />
      </mesh>
      {/* Blackened Steel Table Legs */}
      {[-2.1, 2.1].map((lx, li) => (
        <group key={li} position={[lx, 0.36, 0]}>
          <mesh position={[0, 0, -0.32]}>
            <boxGeometry args={[0.05, 0.72, 0.05]} />
            <meshStandardMaterial color="#16171b" roughness={0.4} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.32]}>
            <boxGeometry args={[0.05, 0.72, 0.05]} />
            <meshStandardMaterial color="#16171b" roughness={0.4} metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* =========================================================================
          STAGE 01 — THE QUESTION (x = -1.8, y = 0.77)
          Heavy letterpress paper card on machined brass block
          ========================================================================= */}
      <group position={[-1.8, 0.77, 0]}>
        {/* Solid Brass Base Block */}
        <mesh position={[0, 0.015, 0]}>
          <boxGeometry args={[0.28, 0.02, 0.22]} />
          <meshStandardMaterial color="#c29b5c" metalness={0.88} roughness={0.25} />
        </mesh>
        {/* Heavy Textured Paper Card */}
        <mesh position={[0, 0.03, 0]}>
          <boxGeometry args={[0.25, 0.005, 0.19]} />
          <meshStandardMaterial color="#f7f3ea" roughness={0.85} />
        </mesh>
        {/* Ink Pen beside card */}
        <mesh position={[0.16, 0.01, 0]} rotation={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.16, 12]} />
          <meshStandardMaterial color="#111" metalness={0.8} />
        </mesh>
      </group>

      {/* =========================================================================
          STAGE 02 — THE SKETCH (x = -1.1, y = 0.77)
          Rolled architectural trace paper with hand-drawn structural studies
          ========================================================================= */}
      <group position={[-1.1, 0.77, 0]}>
        {/* Unrolled drafting sheet */}
        <mesh position={[0, 0.005, 0]}>
          <boxGeometry args={[0.42, 0.004, 0.32]} />
          <meshStandardMaterial
            map={sketchTexture}
            transparent
            opacity={0.94}
            roughness={0.5}
          />
        </mesh>
        {/* Two brass corner paperweights */}
        <mesh position={[-0.18, 0.015, -0.13]}>
          <cylinderGeometry args={[0.018, 0.018, 0.02, 16]} />
          <meshStandardMaterial color="#bda063" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.18, 0.015, 0.13]}>
          <cylinderGeometry args={[0.018, 0.018, 0.02, 16]} />
          <meshStandardMaterial color="#bda063" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* =========================================================================
          STAGE 03 — THE MODEL (x = -0.35, y = 0.77)
          Precision laser-cut basswood architectural scale model
          ========================================================================= */}
      <group position={[-0.35, 0.77, 0]}>
        {/* Solid Walnut Model Pedestal */}
        <mesh position={[0, 0.03, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.34, 0.05, 0.34]} />
          <meshStandardMaterial color="#332417" roughness={0.7} />
        </mesh>
        {/* Architectural Basswood Timber Ribs (Scale 1:50) */}
        {[-0.1, -0.05, 0, 0.05, 0.1].map((rx, idx) => (
          <group key={idx} position={[rx, 0.12, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.01, 0.14 + Math.sin(idx * 0.8) * 0.05, 0.22]} />
              <meshStandardMaterial color="#d4b48c" roughness={0.65} />
            </mesh>
          </group>
        ))}
        {/* Translucent glass floor insert */}
        <mesh position={[0, 0.065, 0]}>
          <boxGeometry args={[0.26, 0.005, 0.2]} />
          <meshPhysicalMaterial
            transparent
            opacity={0.6}
            transmission={0.8}
            roughness={0.1}
            color="#d8e8f8"
          />
        </mesh>
      </group>

      {/* =========================================================================
          STAGE 04 — THE CODE (x = 0.4, y = 0.77)
          Vertical compact studio monitor running procedural geometry algorithms
          ========================================================================= */}
      <group position={[0.4, 0.77, 0]}>
        {/* Vertical Screen */}
        <mesh position={[0, 0.19, -0.05]}>
          <boxGeometry args={[0.26, 0.38, 0.018]} />
          <meshStandardMaterial color="#16181d" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.19, -0.04]}>
          <planeGeometry args={[0.24, 0.35]} />
          <meshBasicMaterial
            map={codeTexture}
            color={new THREE.Color('#ffffff').multiplyScalar(0.7 + processIntensity * 0.3)}
          />
        </mesh>
        {/* Metal monitor arm */}
        <mesh position={[0, 0.06, -0.08]}>
          <cylinderGeometry args={[0.012, 0.012, 0.14, 12]} />
          <meshStandardMaterial color="#181a20" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* =========================================================================
          STAGE 05 — THE MOTION (x = 1.15, y = 0.77)
          Display showing kinetic fluid & daylight deflection choreography
          ========================================================================= */}
      <group position={[1.15, 0.77, 0]}>
        <mesh position={[0, 0.19, -0.05]}>
          <boxGeometry args={[0.42, 0.28, 0.018]} />
          <meshStandardMaterial color="#16181d" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.19, -0.04]}>
          <planeGeometry args={[0.39, 0.25]} />
          <meshBasicMaterial
            map={motionTexture}
            color={new THREE.Color('#ffffff').multiplyScalar(0.7 + processIntensity * 0.3)}
          />
        </mesh>
        <mesh position={[0, 0.05, -0.08]}>
          <cylinderGeometry args={[0.012, 0.012, 0.12, 12]} />
          <meshStandardMaterial color="#181a20" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* =========================================================================
          STAGE 06 — THE EXPERIENCE (x = 1.9, y = 0.77)
          Finished physical prototype illuminated under dedicated spotlight
          ========================================================================= */}
      <group position={[1.9, 0.77, 0]}>
        {/* Dark basalt stone plinth */}
        <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.36, 0.08, 0.36]} />
          <meshStandardMaterial color="#1f2127" roughness={0.8} />
        </mesh>
        {/* Refined brass and cedar kinetic scale structure */}
        <group position={[0, 0.15, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.08, 0.12, 0.18, 16]} />
            <meshStandardMaterial color="#bda063" metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <sphereGeometry args={[0.045, 20, 20]} />
            <meshPhysicalMaterial
              roughness={0.1}
              metalness={0.1}
              transmission={0.8}
              color="#e6f0fa"
            />
          </mesh>
        </group>

        {/* Dedicated focused spotlight for the final artifact */}
        <pointLight
          position={[0, 0.6, 0.1]}
          color="#ffeedd"
          intensity={0.4 + processIntensity * 1.4}
          distance={1.8}
          decay={2}
        />
      </group>
    </group>
  );
}
