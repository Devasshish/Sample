import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function SyndicateCore({ progress = 0, onCoreClick }) {
  const coreGroup = useRef();
  const innerMesh = useRef();
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();
  const [hovered, setHovered] = useState(false);

  // Core is fully prominent in Sector 1 & 2 (progress 0.0 -> 0.35)
  // Smoothly fades or scales back as user scrolls deeper into Sector 3
  const visibility = Math.max(0, 1 - (progress - 0.25) / 0.25);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const speedMultiplier = hovered ? 2.5 : 1.0;

    if (innerMesh.current) {
      innerMesh.current.rotation.x = time * 0.4 * speedMultiplier;
      innerMesh.current.rotation.y = time * 0.6 * speedMultiplier;
      const pulse = 1.0 + Math.sin(time * 3) * 0.05 + (hovered ? 0.15 : 0);
      innerMesh.current.scale.set(pulse, pulse, pulse);
    }

    if (ring1.current) {
      ring1.current.rotation.x = time * 0.5 * speedMultiplier;
      ring1.current.rotation.y = time * 0.3 * speedMultiplier;
    }
    if (ring2.current) {
      ring2.current.rotation.y = -time * 0.6 * speedMultiplier;
      ring2.current.rotation.z = time * 0.4 * speedMultiplier;
    }
    if (ring3.current) {
      ring3.current.rotation.x = -time * 0.3 * speedMultiplier;
      ring3.current.rotation.z = -time * 0.7 * speedMultiplier;
    }
  });

  if (visibility <= 0.01) return null;

  return (
    <group
      ref={coreGroup}
      position={[0, 1.2, 2.5]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (onCoreClick) onCoreClick();
      }}
    >
      {/* Inner Glowing Holographic Crystal */}
      <mesh ref={innerMesh}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={hovered ? 2.8 : 1.4}
          roughness={0.15}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe Outline Overlay */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={hovered ? 0.9 : 0.4}
        />
      </mesh>

      {/* Point Light emitted from within the Core */}
      <pointLight
        color={hovered ? '#00f0ff' : '#00aaff'}
        intensity={hovered ? 4.5 : 2.5}
        distance={8}
      />

      {/* Gimbal Ring 1 */}
      <group ref={ring1}>
        <mesh>
          <torusGeometry args={[1.2, 0.025, 16, 64]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
      </group>

      {/* Gimbal Ring 2 */}
      <group ref={ring2}>
        <mesh>
          <torusGeometry args={[1.45, 0.02, 16, 64]} />
          <meshStandardMaterial
            color="#ff007f"
            emissive="#ff007f"
            emissiveIntensity={0.9}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
      </group>

      {/* Gimbal Ring 3 with Notches */}
      <group ref={ring3}>
        <mesh>
          <torusGeometry args={[1.7, 0.018, 16, 64]} />
          <meshStandardMaterial
            color="#ffaa00"
            emissive="#ffaa00"
            emissiveIntensity={0.7}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
      </group>

      {/* Orbiting Telemetry Satellites */}
      {[0, 1, 2, 3].map((idx) => {
        const angle = (idx * Math.PI) / 2;
        const radius = 1.95;
        return (
          <mesh
            key={idx}
            position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
          >
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        );
      })}

      {/* Ground Projection Halo */}
      <mesh position={[0, -2.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 2.4, 48]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={hovered ? 0.35 : 0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
