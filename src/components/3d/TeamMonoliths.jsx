import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TEAM_MEMBERS } from '../../data/teamData';

// Pre-allocated static layout coordinates outside component
const DISPERSED_OFFSETS = [
  [-1.6, 0.4, 0.5],   // Elena Vance
  [-0.4, -0.6, 1.4],  // Kaelen Thorne
  [1.1, 0.7, -0.6],   // Sora Takahashi
  [1.8, -0.3, 0.8]    // Marcus Sterling
];

const CONVERGED_OFFSETS = [
  [0.0, 0.65, 0.0],    // Top Apex
  [-0.55, -0.35, 0.4], // Bottom Left
  [0.55, -0.35, 0.4],  // Bottom Right
  [0.0, -0.1, -0.65]   // Rear Anchor
];

const CLUSTER_CENTER_X = 1.8;
const CLUSTER_CENTER_Y = 0.2;
const CLUSTER_CENTER_Z = 0.0;

export function TeamMonoliths({ progress = 0, onSelectMember, hoveredMemberId, setHoveredMemberId }) {
  const groupRef = useRef();
  const artifactsRef = useRef([]);
  const coreEnergyRef = useRef();

  const lerp = (a, b, t) => a + (b - a) * t;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Scene 3 visibility: 0.28 to 0.76
    let scale = 0;
    if (progress >= 0.26 && progress <= 0.35) {
      scale = (progress - 0.26) / 0.09;
    } else if (progress > 0.35 && progress <= 0.72) {
      scale = 1;
    } else if (progress > 0.72 && progress <= 0.80) {
      scale = Math.max(0, 1 - (progress - 0.72) / 0.08);
    }

    if (scale <= 0.001) {
      groupRef.current.visible = false;
      return;
    }
    groupRef.current.visible = true;
    groupRef.current.scale.setScalar(scale * 1.15);

    // Transformation Convergence Factor: 0 to 1 during Scene 04 (0.52 to 0.70)
    let convergence = 0;
    if (progress >= 0.52 && progress <= 0.70) {
      const raw = (progress - 0.52) / 0.16;
      convergence = Math.min(1, Math.max(0, raw * raw * (3 - 2 * raw)));
    } else if (progress > 0.70) {
      convergence = 1;
    }

    artifactsRef.current.forEach((mesh, index) => {
      if (!mesh) return;
      const member = TEAM_MEMBERS[index];
      const isHovered = hoveredMemberId === member.id;

      const dPos = DISPERSED_OFFSETS[index];
      const cPos = CONVERGED_OFFSETS[index];

      const targetX = CLUSTER_CENTER_X + lerp(dPos[0], cPos[0], convergence);
      const targetY = CLUSTER_CENTER_Y + lerp(dPos[1], cPos[1], convergence);
      const targetZ = CLUSTER_CENTER_Z + lerp(dPos[2], cPos[2], convergence);

      const bob = Math.sin(time * 1.8 + index * 1.4) * 0.06 * (1 - convergence * 0.6);
      mesh.position.set(targetX, targetY + bob, targetZ);

      const spinMult = isHovered ? 2.5 : 1.0;
      mesh.rotation.y += delta * (0.8 + index * 0.2) * (index % 2 === 0 ? 1 : -1) * spinMult;
      mesh.rotation.x = Math.sin(time * 0.7 + index) * 0.15 + (convergence * 0.4);

      const baseScale = isHovered ? 1.25 : 1.0;
      const convScale = 1.0 - convergence * 0.15;
      mesh.scale.setScalar(baseScale * convScale);
    });

    if (coreEnergyRef.current) {
      coreEnergyRef.current.position.set(CLUSTER_CENTER_X, CLUSTER_CENTER_Y, CLUSTER_CENTER_Z);
      coreEnergyRef.current.scale.setScalar(convergence * (1 + Math.sin(time * 3.5) * 0.15));
      coreEnergyRef.current.rotation.y = time * 1.2;
    }
  });

  const isSceneActive = progress >= 0.28 && progress <= 0.78;
  const isSynthesisActive = progress >= 0.52 && progress <= 0.76;

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
          {/* Member 1: Elena Vance — The Resonant Gyro-Prism */}
          {member.shapeType === 'gyroprism' && (
            <group>
              <mesh>
                <octahedronGeometry args={[0.58, 0]} />
                <meshStandardMaterial
                  color="#ff6b35"
                  roughness={0.15}
                  metalness={0.92}
                  emissive="#d84315"
                  emissiveIntensity={hoveredMemberId === member.id ? 0.9 : 0.4}
                />
              </mesh>
              <mesh scale={0.65} rotation={[0, Math.PI / 4, 0]}>
                <octahedronGeometry args={[0.55, 0]} />
                <meshStandardMaterial color="#ffe0cc" metalness={0.8} roughness={0.1} wireframe={true} />
              </mesh>
              <mesh rotation={[Math.PI / 3, 0, 0]}>
                <torusGeometry args={[0.88, 0.03, 12, 36]} />
                <meshStandardMaterial color="#fca5a5" metalness={0.95} roughness={0.12} />
              </mesh>
            </group>
          )}

          {/* Member 2: Kaelen Thorne — Liquid Mercury Toroid */}
          {member.shapeType === 'toroid' && (
            <group>
              <mesh>
                <torusKnotGeometry args={[0.42, 0.13, 64, 16, 2, 3]} />
                <meshStandardMaterial
                  color="#e5b869"
                  roughness={0.12}
                  metalness={0.98}
                  emissive="#b8860b"
                  emissiveIntensity={hoveredMemberId === member.id ? 0.8 : 0.35}
                />
              </mesh>
              <mesh position={[0.55, 0, 0]}>
                <sphereGeometry args={[0.1, 12, 12]} />
                <meshStandardMaterial color="#fef08a" metalness={1.0} roughness={0.05} />
              </mesh>
              <mesh position={[-0.55, 0, 0]}>
                <sphereGeometry args={[0.08, 12, 12]} />
                <meshStandardMaterial color="#fef08a" metalness={1.0} roughness={0.05} />
              </mesh>
            </group>
          )}

          {/* Member 3: Sora Takahashi — Fractal Flora Monolith */}
          {member.shapeType === 'fractal' && (
            <group>
              <mesh>
                <icosahedronGeometry args={[0.52, 1]} />
                <meshStandardMaterial
                  color="#5ce1b6"
                  roughness={0.2}
                  metalness={0.7}
                  wireframe={hoveredMemberId === member.id ? false : true}
                  emissive="#059669"
                  emissiveIntensity={hoveredMemberId === member.id ? 0.85 : 0.35}
                />
              </mesh>
              <mesh scale={0.72} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
                <dodecahedronGeometry args={[0.48, 0]} />
                <meshStandardMaterial
                  color="#a7f3d0"
                  roughness={0.25}
                  metalness={0.8}
                  emissive="#10b981"
                  emissiveIntensity={0.5}
                />
              </mesh>
              <mesh scale={0.35}>
                <sphereGeometry args={[0.3, 12, 12]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            </group>
          )}

          {/* Member 4: Marcus Sterling — Chrono-Astrolabe */}
          {member.shapeType === 'astrolabe' && (
            <group>
              <mesh>
                <sphereGeometry args={[0.38, 24, 24]} />
                <meshStandardMaterial
                  color="#a78bfa"
                  roughness={0.12}
                  metalness={0.94}
                  emissive="#7c3aed"
                  emissiveIntensity={hoveredMemberId === member.id ? 0.85 : 0.35}
                />
              </mesh>
              <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
                <torusGeometry args={[0.72, 0.03, 12, 36]} />
                <meshStandardMaterial color="#c4b5fd" metalness={0.9} roughness={0.18} />
              </mesh>
              <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
                <torusGeometry args={[0.92, 0.025, 12, 36]} />
                <meshStandardMaterial color="#ddd6fe" metalness={0.92} roughness={0.15} />
              </mesh>
            </group>
          )}

          {/* Point light aura culled when scene is inactive */}
          {isSceneActive && (
            <pointLight
              color={member.accentColor}
              intensity={hoveredMemberId === member.id ? 3.8 : 1.8}
              distance={5.5}
              decay={2}
            />
          )}
        </group>
      ))}

      {/* Synthesis Nexus Core - culled when outside Scene 04 */}
      {isSynthesisActive && (
        <group ref={coreEnergyRef} position={[CLUSTER_CENTER_X, CLUSTER_CENTER_Y, CLUSTER_CENTER_Z]}>
          <mesh>
            <sphereGeometry args={[0.42, 18, 18]} />
            <meshBasicMaterial color="#ffffff" wireframe={true} />
          </mesh>
          <mesh scale={0.65}>
            <octahedronGeometry args={[0.4, 0]} />
            <meshStandardMaterial
              color="#ff6b35"
              emissive="#ffedd5"
              emissiveIntensity={1.8}
            />
          </mesh>
          <pointLight color="#ffe4d6" intensity={5.0} distance={8} decay={2} />
        </group>
      )}
    </group>
  );
}
