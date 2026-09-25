import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function TopologicalTerrain({ progress = 0 }) {
  const meshRef = useRef();
  const wireRef = useRef();

  const [geometry, count] = useMemo(() => {
    const geo = new THREE.PlaneGeometry(36, 36, 48, 48);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      // Concentric organic geological ripples
      const d = Math.sqrt(x * x + z * z);
      const elevation = Math.sin(d * 0.45) * 0.65 + Math.cos(x * 0.3) * Math.sin(z * 0.3) * 0.5 - 2.8;
      pos.setY(i, elevation);
    }
    geo.computeVertexNormals();
    return [geo, pos.count];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    // Subtle breathing displacement
    meshRef.current.position.y = -3.2 + Math.sin(time * 0.25) * 0.08;
    if (wireRef.current) {
      wireRef.current.position.y = meshRef.current.position.y + 0.02;
    }
  });

  return (
    <group>
      {/* Dark mineral solid bedrock */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#0b0d12"
          roughness={0.88}
          metalness={0.15}
          flatShading={true}
        />
      </mesh>

      {/* Luminescent contour lines overlay */}
      <mesh ref={wireRef} geometry={geometry}>
        <meshBasicMaterial
          color="#d47942"
          wireframe={true}
          transparent={true}
          opacity={0.12}
        />
      </mesh>
    </group>
  );
}
