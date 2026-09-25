import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function AtmosphericDust({ count = 350, progress = 0 }) {
  const pointsRef = useRef();

  const [positions, scales, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sca = new Float32Array(count);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spatial volume around camera travel path
      pos[i * 3 + 0] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 24;

      sca[i] = Math.random() * 0.08 + 0.02;
      spd[i] = Math.random() * 0.4 + 0.1;
    }

    return [pos, sca, spd];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const array = posAttr.array;

    const time = state.clock.getElapsedTime();
    const convergenceFactor = Math.sin(progress * Math.PI) * 0.8;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Gentle buoyant upward drift
      array[idx + 1] += Math.sin(time * speeds[i] + i) * 0.004;

      // Slight inward pull during transformation (Scene 4)
      if (progress > 0.45 && progress < 0.72) {
        array[idx] += (0 - array[idx]) * 0.003 * convergenceFactor;
        array[idx + 2] += (0 - array[idx + 2]) * 0.003 * convergenceFactor;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#f3dfc8"
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
