import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function SunbeamDust({ count = 120, progress = 0 }) {
  const meshRef = useRef();

  // Generate gentle realistic ambient particles in the studio volume
  const [positions, scales, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    const sp = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Concentrate near the window and worktables (x: -2 to 3.5, y: 0.8 to 3.0, z: -2.5 to 3.5)
      pos[i * 3 + 0] = (Math.random() - 0.4) * 6.0;
      pos[i * 3 + 1] = 0.6 + Math.random() * 2.4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6.0;

      sc[i] = 0.012 + Math.random() * 0.016;
      sp[i] = 0.05 + Math.random() * 0.08;
    }
    return [pos, sc, sp];
  }, [count]);

  // Gentle thermal updraft & microscopic Brownian motion
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const posAttr = meshRef.current.geometry.attributes.position;
    const posArray = posAttr.array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Gentle drift upward
      posArray[idx + 1] += speeds[i] * delta * 0.2;
      // Subtle sway
      posArray[idx + 0] += Math.sin(state.clock.elapsedTime * 0.4 + i) * 0.001;

      // Wrap around when reaching upper ceiling
      if (posArray[idx + 1] > 3.2) {
        posArray[idx + 1] = 0.7;
      }
    }
    posAttr.needsUpdate = true;
  });

  // Dawn light catching particles: more visible as morning light filters in
  const dawnVisibility = Math.max(0.15, Math.min(0.85, 0.2 + progress * 0.65));

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#fff0dc"
        transparent
        opacity={dawnVisibility * 0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
