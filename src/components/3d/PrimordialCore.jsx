import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Static shard template outside component
const SHARD_CONFIGS = [
  { angle: 0, radius: 2.6, size: 0.12, elevation: -0.8 },
  { angle: 0.78, radius: 2.9, size: 0.16, elevation: -0.4 },
  { angle: 1.57, radius: 2.6, size: 0.12, elevation: 0.0 },
  { angle: 2.35, radius: 3.2, size: 0.18, elevation: 0.4 },
  { angle: 3.14, radius: 2.7, size: 0.14, elevation: 0.8 },
  { angle: 3.92, radius: 2.9, size: 0.16, elevation: 0.4 },
  { angle: 4.71, radius: 2.6, size: 0.12, elevation: 0.0 },
  { angle: 5.49, radius: 3.1, size: 0.18, elevation: -0.5 }
];

export function PrimordialCore({ progress = 0, onCoreClick, enableShards = true }) {
  const groupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const crystalOuterRef = useRef();
  const crystalInnerRef = useRef();
  const shardsGroupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Smooth unfold progress in Scene 1 & 2
    const unfold = Math.min(1, Math.max(0, (progress - 0.08) / 0.22));

    // Visibility fade out when entering team scene (progress > 0.33)
    let targetScale = 1;
    if (progress > 0.32 && progress < 0.52) {
      targetScale = 1 - (progress - 0.32) / 0.20;
    } else if (progress >= 0.52) {
      targetScale = 0.001;
    }

    groupRef.current.scale.setScalar(Math.max(0.001, targetScale * 1.35));
    if (targetScale < 0.01) {
      groupRef.current.visible = false;
      return;
    }
    groupRef.current.visible = true;

    // Astrolabe Gimbal Rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.45 + unfold * 1.8;
      ring1Ref.current.rotation.y = time * 0.25;
      ring1Ref.current.scale.setScalar(1 + unfold * 0.35);
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.55 + unfold * 2.2;
      ring2Ref.current.rotation.z = time * 0.3;
      ring2Ref.current.scale.setScalar(1 + unfold * 0.25);
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * 0.4 - unfold * 1.5;
      ring3Ref.current.rotation.x = -time * 0.35;
      ring3Ref.current.scale.setScalar(1 + unfold * 0.15);
    }

    // Outer & Inner Faceted Crystal
    if (crystalOuterRef.current) {
      crystalOuterRef.current.rotation.y = time * 0.4;
      crystalOuterRef.current.rotation.x = Math.sin(time * 0.6) * 0.15;
    }
    if (crystalInnerRef.current) {
      crystalInnerRef.current.rotation.y = -time * 0.8;
      crystalInnerRef.current.rotation.z = Math.cos(time * 0.5) * 0.2;
      const pulse = 1.0 + Math.sin(time * 2.2) * 0.08;
      crystalInnerRef.current.scale.setScalar(pulse);
    }

    // Orbiting Satellite Shards
    if (shardsGroupRef.current) {
      shardsGroupRef.current.rotation.y = time * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[1.8, 0, 0]} onClick={onCoreClick}>
      {/* Outer Astrolabe Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.4, 0.045, 18, 64]} />
        <meshStandardMaterial
          color="#d1b896"
          metalness={0.95}
          roughness={0.18}
          emissive="#5a3d1c"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Middle Astrolabe Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.85, 0.04, 18, 64]} />
        <meshStandardMaterial
          color="#ff6b35"
          metalness={0.92}
          roughness={0.22}
          emissive="#d84315"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Inner Astrolabe Ring 3 */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[1.35, 0.035, 16, 48]} />
        <meshStandardMaterial
          color="#f3e5ab"
          metalness={0.96}
          roughness={0.12}
          emissive="#b8860b"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Outer Faceted Geometric Monolith Cage */}
      <mesh ref={crystalOuterRef}>
        <octahedronGeometry args={[0.92, 0]} />
        <meshStandardMaterial
          color="#ff7a3d"
          metalness={0.8}
          roughness={0.2}
          wireframe={true}
          emissive="#ff5722"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Inner Dense Crystalline Core */}
      <mesh ref={crystalInnerRef}>
        <dodecahedronGeometry args={[0.62, 0]} />
        <meshStandardMaterial
          color="#ff3d00"
          emissive="#ff6e40"
          emissiveIntensity={0.95}
          roughness={0.15}
          metalness={0.5}
        />
      </mesh>

      {/* Dynamically Culled Point Light - only active when visible */}
      {progress <= 0.38 && (
        <pointLight color="#ff6b35" intensity={4.5} distance={9} decay={2} />
      )}

      {/* Orbiting Mineral Shards */}
      {enableShards && (
        <group ref={shardsGroupRef}>
          {SHARD_CONFIGS.map((s, idx) => (
            <mesh
              key={idx}
              position={[
                Math.cos(s.angle) * s.radius,
                s.elevation,
                Math.sin(s.angle) * s.radius
              ]}
            >
              <tetrahedronGeometry args={[s.size, 0]} />
              <meshStandardMaterial
                color="#ffb088"
                metalness={0.9}
                roughness={0.2}
                emissive="#ff5722"
                emissiveIntensity={0.3}
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}
