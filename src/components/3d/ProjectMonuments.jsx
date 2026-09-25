import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PROJECTS } from '../../data/projectData';

export function ProjectMonuments({ progress = 0, onSelectProject, hoveredProjectId, setHoveredProjectId }) {
  const groupRef = useRef();
  const projectMeshesRef = useRef([]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Scene 5 visibility range: 0.68 to 0.94
    let scale = 0;
    if (progress >= 0.68 && progress <= 0.74) {
      scale = (progress - 0.68) / 0.06;
    } else if (progress > 0.74 && progress <= 0.90) {
      scale = 1;
    } else if (progress > 0.90 && progress <= 0.98) {
      scale = Math.max(0.01, 1 - (progress - 0.90) / 0.08);
    }
    groupRef.current.scale.setScalar(scale);

    // Animate each monument
    projectMeshesRef.current.forEach((mesh, index) => {
      if (!mesh) return;
      const proj = PROJECTS[index];
      const isHovered = hoveredProjectId === proj.id;

      // Project 1: Chronos (Sundial)
      if (proj.id === 'chronos') {
        mesh.rotation.y = time * 0.25;
        mesh.rotation.z = Math.sin(time * 0.4) * 0.1;
      }
      // Project 2: Synapse (Bio Pavilion)
      else if (proj.id === 'synapse') {
        mesh.rotation.y = -time * 0.18;
        const breath = 1.0 + Math.sin(time * 1.8) * 0.06;
        mesh.scale.setScalar(breath * (isHovered ? 1.2 : 1.0));
      }
      // Project 3: AuraOS (Spatial Interface)
      else if (proj.id === 'auraos') {
        mesh.rotation.x = Math.sin(time * 0.5) * 0.15;
        mesh.rotation.y = time * 0.3;
      }

      const baseScale = isHovered ? 1.18 : 1.0;
      if (proj.id !== 'synapse') {
        mesh.scale.setScalar(baseScale);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {PROJECTS.map((proj, index) => (
        <group
          key={proj.id}
          ref={(el) => (projectMeshesRef.current[index] = el)}
          position={proj.position}
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
          {/* Project 1: Project Chronos */}
          {proj.shape === 'sundial' && (
            <group>
              {/* Outer Sundial Ring */}
              <mesh>
                <torusGeometry args={[0.9, 0.05, 16, 64]} />
                <meshStandardMaterial
                  color="#ff6b35"
                  metalness={0.92}
                  roughness={0.18}
                  emissive="#d84315"
                  emissiveIntensity={hoveredProjectId === proj.id ? 0.7 : 0.2}
                />
              </mesh>
              {/* Heliotropic Gnomon Blade */}
              <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
                <cylinderGeometry args={[0.04, 0.08, 1.4, 8]} />
                <meshStandardMaterial color="#fed7aa" metalness={0.95} roughness={0.1} />
              </mesh>
              {/* Optical Prism Refractor */}
              <mesh position={[0, 0.45, 0]}>
                <octahedronGeometry args={[0.28, 0]} />
                <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.1} wireframe={true} />
              </mesh>
            </group>
          )}

          {/* Project 2: Synapse Pavilion */}
          {proj.shape === 'biome' && (
            <group>
              {/* Geodesic Living Dome */}
              <mesh>
                <sphereGeometry args={[0.75, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial
                  color="#5ce1b6"
                  roughness={0.25}
                  metalness={0.5}
                  wireframe={true}
                  emissive="#059669"
                  emissiveIntensity={hoveredProjectId === proj.id ? 0.8 : 0.3}
                />
              </mesh>
              {/* Internal Bioluminescent Core */}
              <mesh position={[0, 0.25, 0]}>
                <dodecahedronGeometry args={[0.35, 0]} />
                <meshStandardMaterial
                  color="#a7f3d0"
                  roughness={0.2}
                  metalness={0.8}
                  emissive="#10b981"
                  emissiveIntensity={0.6}
                />
              </mesh>
            </group>
          )}

          {/* Project 3: AuraOS */}
          {proj.shape === 'interface' && (
            <group>
              {/* Floating Layered Interface Disks */}
              <mesh position={[0, -0.2, 0]}>
                <cylinderGeometry args={[0.75, 0.75, 0.04, 32]} />
                <meshStandardMaterial
                  color="#a78bfa"
                  metalness={0.9}
                  roughness={0.2}
                  emissive="#6d28d9"
                  emissiveIntensity={hoveredProjectId === proj.id ? 0.7 : 0.25}
                />
              </mesh>
              <mesh position={[0, 0.15, 0]} rotation={[0.2, 0, 0]}>
                <ringGeometry args={[0.45, 0.65, 32]} />
                <meshStandardMaterial
                  color="#ddd6fe"
                  metalness={0.8}
                  roughness={0.15}
                  side={THREE.DoubleSide}
                />
              </mesh>
              <mesh position={[0, 0.45, 0]}>
                <boxGeometry args={[0.35, 0.35, 0.35]} />
                <meshStandardMaterial color="#ffffff" wireframe />
              </mesh>
            </group>
          )}

          {/* Point light for monument illumination */}
          <pointLight
            color={proj.accentColor}
            intensity={hoveredProjectId === proj.id ? 3.0 : 1.4}
            distance={5}
            decay={2}
          />
        </group>
      ))}
    </group>
  );
}
