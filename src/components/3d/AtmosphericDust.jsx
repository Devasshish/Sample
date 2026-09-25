import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function AtmosphericDust({ count = 350, progress = 0 }) {
  const pointsRef = useRef();

  const [positions, geometry, material] = useMemo(() => {
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 26;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.065,
      color: '#f3dfc8',
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    return [pos, geo, mat];
  }, [count]);

  // Clean GPU memory on unmount
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();

    // High performance GPU-transform without CPU buffer writes
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.position.y = Math.sin(time * 0.25) * 0.25;

    // Slight inward pull during transformation (Scene 4)
    if (progress > 0.48 && progress < 0.72) {
      const conv = Math.sin((progress - 0.48) / 0.24 * Math.PI) * 0.25;
      pointsRef.current.scale.set(1 - conv, 1, 1 - conv);
    } else {
      pointsRef.current.scale.set(1, 1, 1);
    }
  });

  return (
    <primitive object={new THREE.Points(geometry, material)} ref={pointsRef} />
  );
}
