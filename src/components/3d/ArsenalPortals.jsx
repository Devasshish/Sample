import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PROJECTS } from '../../data/projectData';

export function ArsenalPortals({
  progress = 0,
  onSelectProject,
  hoveredProjectId,
  setHoveredProjectId
}) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.children.forEach((child, idx) => {
        const artifact = child.getObjectByName('artifactMesh');
        if (artifact) {
          artifact.rotation.y = t * 0.4 + idx;
          artifact.rotation.x = Math.sin(t * 0.5 + idx) * 0.2;
        }
      });
    }
  });

  return (
    <group ref={groupRef} name="ArsenalPortals">
      {PROJECTS.map((proj, idx) => {
        const isHovered = hoveredProjectId === proj.id;

        return (
          <group
            key={proj.id}
            position={proj.position}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredProjectId(proj.id);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              setHoveredProjectId(null);
              document.body.style.cursor = 'auto';
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (onSelectProject) onSelectProject(proj);
            }}
          >
            {/* Holographic Pedestal Base */}
            <mesh position={[0, -0.6, 0]}>
              <cylinderGeometry args={[0.7, 0.85, 0.2, 32]} />
              <meshStandardMaterial
                color="#0a1020"
                metalness={0.9}
                roughness={0.3}
              />
            </mesh>

            {/* Glowing Base Accent Ring */}
            <mesh position={[0, -0.49, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.6, 0.72, 32]} />
              <meshBasicMaterial
                color={proj.color}
                side={THREE.DoubleSide}
                transparent
                opacity={isHovered ? 0.9 : 0.4}
              />
            </mesh>

            {/* 3D Kinetic Project Artifact */}
            <group position={[0, 0.2, 0]} name="artifactMesh">
              {idx === 0 && (
                <mesh>
                  <dodecahedronGeometry args={[0.48, 0]} />
                  <meshStandardMaterial
                    color={proj.color}
                    emissive={proj.color}
                    emissiveIntensity={isHovered ? 2.5 : 1.2}
                    wireframe
                  />
                </mesh>
              )}
              {idx === 1 && (
                <mesh>
                  <torusKnotGeometry args={[0.34, 0.1, 64, 16]} />
                  <meshStandardMaterial
                    color={proj.color}
                    emissive={proj.color}
                    emissiveIntensity={isHovered ? 2.5 : 1.2}
                    wireframe
                  />
                </mesh>
              )}
              {idx === 2 && (
                <mesh>
                  <octahedronGeometry args={[0.5, 0]} />
                  <meshStandardMaterial
                    color={proj.color}
                    emissive={proj.color}
                    emissiveIntensity={isHovered ? 2.5 : 1.2}
                    wireframe
                  />
                </mesh>
              )}

              {/* Inner Glowing Core */}
              <mesh>
                <sphereGeometry args={[0.16, 16, 16]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            </group>

            {/* Glass Containment Cylinder */}
            <mesh position={[0, 0.2, 0]}>
              <cylinderGeometry args={[0.65, 0.65, 1.2, 32, 1, true]} />
              <meshStandardMaterial
                color="#00f0ff"
                transparent
                opacity={isHovered ? 0.25 : 0.1}
                roughness={0.1}
                metalness={0.9}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Vertical Holo Beam */}
            <pointLight
              color={proj.color}
              intensity={isHovered ? 3.0 : 1.5}
              distance={4}
              position={[0, 0.4, 0]}
            />

            {/* 3D Spatial Label */}
            <Html
              position={[0, 1.15, 0]}
              center
              distanceFactor={8}
              style={{
                pointerEvents: 'auto',
                userSelect: 'none',
                transform: 'translate3d(-50%, -50%, 0)'
              }}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSelectProject) onSelectProject(proj);
                }}
                style={{
                  background: isHovered
                    ? 'rgba(12, 18, 36, 0.96)'
                    : 'rgba(5, 8, 20, 0.85)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: `1px solid ${isHovered ? proj.color : 'rgba(255, 255, 255, 0.18)'}`,
                  boxShadow: isHovered
                    ? `0 0 20px ${proj.color}`
                    : '0 8px 24px rgba(0,0,0,0.6)',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  color: '#fff',
                  fontFamily: '"Space Grotesk", monospace, sans-serif',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  transform: isHovered ? 'scale(1.08)' : 'scale(1.0)'
                }}
              >
                <div style={{ fontSize: '9px', color: proj.color, letterSpacing: '0.12em', fontWeight: 600 }}>
                  {proj.code} • {proj.year}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', color: '#fff', marginTop: '2px' }}>
                  {proj.title}
                </div>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>
                  {proj.category}
                </div>
                <div
                  style={{
                    marginTop: '5px',
                    fontSize: '8px',
                    letterSpacing: '0.14em',
                    color: proj.color,
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '3px',
                    textAlign: 'center',
                    fontWeight: 600
                  }}
                >
                  {isHovered ? 'LAUNCH CASE STUDY ▸' : 'CLICK TO EXPLORE'}
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
