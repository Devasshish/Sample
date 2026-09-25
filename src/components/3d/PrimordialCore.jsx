import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function PrimordialCore({ progress = 0, onCoreClick }) {
  const groupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const crystalRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // In Scene 1 & 2 (progress < 0.35)
    // Dynamic unfold calculation
    const unfold = Math.min(1, Math.max(0, (progress - 0.1) / 0.22));

    // Visibility fade out when entering team scene (progress > 0.33)
    let targetScale = 1;
    if (progress > 0.32 && progress < 0.55) {
      targetScale = 1 - (progress - 0.32) / 0.22;
    } else if (progress >= 0.55) {
      targetScale = 0.05; // tiny distant core
    }

    groupRef.current.scale.setScalar(Math.max(0.01, targetScale * 1.2));

    // Dynamic rotation of astrolabe rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.35 + unfold * 1.5;
      ring1Ref.current.rotation.y = time * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.45 + unfold * 2.1;
      ring2Ref.current.rotation.z = time * 0.15;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * 0.3 - unfold * 1.2;
      ring3Ref.current.rotation.x = -time * 0.25;
    }

    // Floating crystal hover
    if (crystalRef.current) {
      crystalRef.current.rotation.y = time * 0.5;
      crystalRef.current.rotation.x = Math.sin(time * 0.6) * 0.2;
      crystalRef.current.position.y = Math.sin(time * 0.9) * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} onClick={onCoreClick}>
      {/* Outer Astrolabe Titanium Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.2, 0.04, 16, 64]} />
        <meshStandardMaterial
          color="#d1b896"
          metalness={0.92}
          roughness={0.22}
        />
      </mesh>

      {/* Middle Astrolabe Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.7, 0.035, 16, 64]} />
        <meshStandardMaterial
          color="#ff7a3d"
          metalness={0.88}
          roughness={0.28}
        />
      </mesh>

      {/* Inner Astrolabe Ring 3 */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[1.25, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#e0ded8"
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>

      {/* Central Faceted Crystalline Core */}
      <mesh ref={crystalRef}>
        <octahedronGeometry args={[0.72, 0]} />
        <meshStandardMaterial
          color="#ff5722"
          emissive="#d84315"
          emissiveIntensity={0.65}
          roughness={0.18}
          metalness={0.65}
          wireframe={false}
        />
      </mesh>

      {/* Internal Core Halo Glow */}
      <pointLight color="#ff7043" intensity={3.5} distance={7} decay={2} />
    </group>
  );
}
