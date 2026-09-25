import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PROJECTS } from '../../data/projectData';

// Pre-allocated static monument offsets
const MONUMENT_POSITIONS = [
  [0.6, 0.3, 0.4],   // Project Chronos
  [1.9, 0.8, -0.7],  // Synapse Pavilion
  [3.1, -0.3, 0.6]   // AuraOS
];

export function ProjectMonuments({ progress = 0, onSelectProject, hoveredProjectId, setHoveredProjectId }) {
  const groupRef = useRef();
  const projectMeshesRef = useRef([]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Scene 5 visibility range: 0.68 to 0.93
    let scale = 0;
    if (progress >= 0.68 && progress <= 0.74) {
      scale = (progress - 0.68) / 0.06;
    } else if (progress > 0.74 && progress <= 0.89) {
      scale = 1;
    } else if (progress > 0.89 && progress <= 0.96) {
      scale = Math.max(0, 1 - (progress - 0.89) / 0.07);
    }

    if (scale <= 0.001) {
      groupRef.current.visible = false;
      return;
    }
    groupRef.current.visible = true;
    groupRef.current.scale.setScalar(scale * 1.2);

    projectMeshesRef.current.forEach((mesh, index) => {
      if (!mesh) return;
      const proj = PROJECTS[index];
      const isHovered = hoveredProjectId === proj.id;

      // Project 1: Chronos (Sundial)
      if (proj.id === 'chronos') {
        mesh.rotation.y = time * 0.35;
        mesh.rotation.z = Math.sin(time * 0.5) * 0.12;
      }
      // Project 2: Synapse (Biome Pavilion)
      else if (proj.id === 'synapse') {
        mesh.rotation.y = -time * 0.22;
        const breath = 1.0 + Math.sin(time * 2.0) * 0.08;
        mesh.scale.setScalar(breath * (isHovered ? 1.25 : 1.0));
      }
      // Project 3: AuraOS (Spatial Interface)
      else if (proj.id === 'auraos') {
        mesh.rotation.x = Math.sin(time * 0.6) * 0.18;
        mesh.rotation.y = time * 0.4;
      }

      const baseScale = isHovered ? 1.22 : 1.0;
      if (proj.id !== 'synapse') {
        mesh.scale.setScalar(baseScale);
      }
    });
  });

  const isSceneActive = progress >= 0.68 && progress <= 0.94;

  return (
    <group ref={groupRef}>
      {PROJECTS.map((proj, index) => (
        <group
          key={proj.id}
          ref={(el) => (projectMeshesRef.current[index] = el)}
          position={MONUMENT_POSITIONS[index]}
          onClick={(e) => {
            e.stopPropagation();
            onSelectProject(proj);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredProjectId(proj.id);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHoveredProjectId(null);
            document.body.style.cursor = 'auto';
          }}
        >
          {/* Project 1: Chronos (The Living Sundial) */}
          {proj.shape === 'sundial' && (
            <group>
              <mesh>
                <torusGeometry args={[1.05, 0.06, 16, 64]} />
                <meshStandardMaterial
                  color="#ff6b35"
                  metalness={0.94}
                  roughness={0.16}
                  emissive="#d84315"
                  emissiveIntensity={hoveredProjectId === proj.id ? 0.9 : 0.35}
                />
              </mesh>
              <mesh rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[0.78, 0.035, 12, 48]} />
                <meshStandardMaterial color="#fef08a" metalness={0.96} roughness={0.1} />
              </mesh>
              <mesh position={[0, 0.45, 0]}>
                <octahedronGeometry args={[0.35, 0]} />
                <meshStandardMaterial
                  color="#ffffff"
                  metalness={0.2}
                  roughness={0.08}
                  emissive="#fed7aa"
                  emissiveIntensity={0.6}
                />
              </mesh>
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 1.6, 12]} />
                <meshStandardMaterial color="#d1b896" metalness={0.9} roughness={0.2} />
              </mesh>
            </group>
          )}

          {/* Project 2: Synapse Pavilion (Bioluminescent Biome) */}
          {proj.shape === 'biome' && (
            <group>
              <mesh>
                <sphereGeometry args={[0.92, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
                <meshStandardMaterial
                  color="#5ce1b6"
                  roughness={0.22}
                  metalness={0.6}
                  wireframe={true}
                  emissive="#059669"
                  emissiveIntensity={hoveredProjectId === proj.id ? 1.0 : 0.45}
                />
              </mesh>
              <mesh position={[0, 0.35, 0]}>
                <dodecahedronGeometry args={[0.42, 0]} />
                <meshStandardMaterial
                  color="#a7f3d0"
                  roughness={0.18}
                  metalness={0.8}
                  emissive="#10b981"
                  emissiveIntensity={0.8}
                />
              </mesh>
              <mesh position={[0, -0.2, 0]}>
                <torusGeometry args={[0.55, 0.03, 12, 36]} />
                <meshStandardMaterial color="#34d399" metalness={0.9} roughness={0.2} />
              </mesh>
            </group>
          )}

          {/* Project 3: AuraOS (Tactile Volumetric Interface) */}
          {proj.shape === 'interface' && (
            <group>
              <mesh position={[0, -0.25, 0]}>
                <cylinderGeometry args={[0.9, 0.9, 0.05, 24]} />
                <meshStandardMaterial
                  color="#a78bfa"
                  metalness={0.92}
                  roughness={0.15}
                  emissive="#6d28d9"
                  emissiveIntensity={hoveredProjectId === proj.id ? 0.85 : 0.3}
                />
              </mesh>
              <mesh position={[0, 0.15, 0]} rotation={[0.25, 0, 0]}>
                <ringGeometry args={[0.55, 0.78, 24]} />
                <meshStandardMaterial
                  color="#ddd6fe"
                  metalness={0.85}
                  roughness={0.12}
                  side={THREE.DoubleSide}
                />
              </mesh>
              <mesh position={[0, 0.48, 0]}>
                <boxGeometry args={[0.42, 0.42, 0.42]} />
                <meshStandardMaterial
                  color="#ffffff"
                  metalness={0.1}
                  roughness={0.1}
                  wireframe={true}
                  emissive="#c4b5fd"
                  emissiveIntensity={0.7}
                />
              </mesh>
            </group>
          )}

          {/* Project Ambient Glow - culled when outside Scene 05 */}
          {isSceneActive && (
            <pointLight
              color={proj.accentColor}
              intensity={hoveredProjectId === proj.id ? 4.2 : 2.0}
              distance={6.5}
              decay={2}
            />
          )}
        </group>
      ))}
    </group>
  );
}
