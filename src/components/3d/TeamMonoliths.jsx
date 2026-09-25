import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TEAM_MEMBERS } from '../../data/teamData';

export function TeamMonoliths({ progress = 0, onSelectMember, hoveredMemberId, setHoveredMemberId }) {
  const groupRef = useRef();
  const artifactsRef = useRef([]);

  // Interpolation helper
  const lerp = (a, b, t) => a + (b - a) * t;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Scene 3 visibility range: 0.28 to 0.73
    // Transformation convergence factor: 0.53 to 0.70
    let convergence = 0;
    if (progress >= 0.52 && progress <= 0.72) {
      convergence = Math.min(1, Math.max(0, (progress - 0.52) / 0.16));
    } else if (progress > 0.72) {
      convergence = 1;
    }

    // Overall scale/visibility
    let scale = 0;
    if (progress >= 0.26 && progress <= 0.35) {
      scale = (progress - 0.26) / 0.09;
    } else if (progress > 0.35 && progress <= 0.82) {
      scale = 1;
    } else if (progress > 0.82) {
      scale = Math.max(0.01, 1 - (progress - 0.82) / 0.1);
    }
    groupRef.current.scale.setScalar(scale);

    // Animate each team member's artifact
    artifactsRef.current.forEach((mesh, index) => {
      if (!mesh) return;
      const member = TEAM_MEMBERS[index];
      const isHovered = hoveredMemberId === member.id;

      // Rest position vs converged position
      const origX = member.position[0];
      const origY = member.position[1];
      const origZ = member.position[2];

      // Converge inward to form the united hyper-structure in Scene 4
      const targetX = Math.cos((index * Math.PI) / 2) * 0.75;
      const targetY = 0.8 + Math.sin((index * Math.PI) / 2) * 0.35;
      const targetZ = Math.sin((index * Math.PI) / 2) * 0.75;

      const curX = lerp(origX, targetX, convergence);
      const curY = lerp(origY, targetY, convergence);
      const curZ = lerp(origZ, targetZ, convergence);

      mesh.position.set(
        curX,
        curY + Math.sin(time * 1.5 + index * 1.2) * 0.08,
        curZ
      );

      // Rotations
      const spinSpeed = isHovered ? 2.5 : 0.8;
      mesh.rotation.y += delta * spinSpeed * (index % 2 === 0 ? 1 : -1);
      mesh.rotation.x = Math.sin(time * 0.8 + index) * 0.2 + (convergence * 0.5);

      // Micro-hover scale
      const hoverScale = isHovered ? 1.25 : 1.0;
      mesh.scale.setScalar(hoverScale);
    });
  });

  return (
    <group ref={groupRef}>
      {TEAM_MEMBERS.map((member, index) => (
        <group
          key={member.id}
          ref={(el) => (artifactsRef.current[index] = el)}
          onClick={(e) => {
            e.stopPropagation();
            onSelectMember(member);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredMemberId(member.id);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHoveredMemberId(null);
            document.body.style.cursor = 'auto';
          }}
        >
          {/* Member 1: Elena Vance - The Resonant Gyro-Prism */}
          {member.shapeType === 'gyroprism' && (
            <group>
              <mesh>
                <octahedronGeometry args={[0.55, 0]} />
                <meshStandardMaterial
                  color="#ff6b35"
                  roughness={0.12}
                  metalness={0.85}
                  emissive="#d84315"
                  emissiveIntensity={hoveredMemberId === member.id ? 0.8 : 0.25}
                />
              </mesh>
              <mesh rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[0.85, 0.025, 16, 48]} />
                <meshStandardMaterial color="#ffa07a" metalness={0.9} roughness={0.15} />
              </mesh>
            </group>
          )}

          {/* Member 2: Kaelen Thorne - Liquid Mercury Toroid */}
          {member.shapeType === 'toroid' && (
            <group>
              <mesh>
                <torusKnotGeometry args={[0.38, 0.12, 64, 16, 2, 3]} />
                <meshStandardMaterial
                  color="#e5b869"
                  roughness={0.18}
                  metalness={0.95}
                  emissive="#b8860b"
                  emissiveIntensity={hoveredMemberId === member.id ? 0.7 : 0.2}
                />
              </mesh>
            </group>
          )}

          {/* Member 3: Sora Takahashi - Fractal Flora Monolith */}
          {member.shapeType === 'fractal' && (
            <group>
              <mesh>
                <icosahedronGeometry args={[0.48, 1]} />
                <meshStandardMaterial
                  color="#5ce1b6"
                  roughness={0.25}
                  metalness={0.65}
                  wireframe={hoveredMemberId === member.id ? false : true}
                  emissive="#10b981"
                  emissiveIntensity={hoveredMemberId === member.id ? 0.6 : 0.2}
                />
              </mesh>
              <mesh scale={0.72} rotation={[0, Math.PI / 3, 0]}>
                <dodecahedronGeometry args={[0.45, 0]} />
                <meshStandardMaterial color="#a7f3d0" roughness={0.3} metalness={0.5} />
              </mesh>
            </group>
          )}

          {/* Member 4: Marcus Sterling - Chrono-Astrolabe */}
          {member.shapeType === 'astrolabe' && (
            <group>
              <mesh>
                <sphereGeometry args={[0.34, 24, 24]} />
                <meshStandardMaterial
                  color="#a78bfa"
                  roughness={0.15}
                  metalness={0.9}
                  emissive="#7c3aed"
                  emissiveIntensity={hoveredMemberId === member.id ? 0.7 : 0.25}
                />
              </mesh>
              <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
                <ringGeometry args={[0.55, 0.65, 32]} />
                <meshStandardMaterial color="#c4b5fd" metalness={0.8} roughness={0.2} side={THREE.DoubleSide} />
              </mesh>
            </group>
          )}

          {/* Halo Light around each artifact */}
          <pointLight
            color={member.accentColor}
            intensity={hoveredMemberId === member.id ? 2.5 : 1.2}
            distance={4}
            decay={2}
          />
        </group>
      ))}

      {/* Harmonic Conduits (connecting lines during Scene 4 transformation) */}
      {progress >= 0.52 && progress <= 0.76 && (
        <group position={[0, 0.8, 0]}>
          <mesh>
            <sphereGeometry args={[0.4, 24, 24]} />
            <meshBasicMaterial color="#ffffff" wireframe />
          </mesh>
          <pointLight color="#ffe8d6" intensity={4} distance={6} decay={2} />
        </group>
      )}
    </group>
  );
}
