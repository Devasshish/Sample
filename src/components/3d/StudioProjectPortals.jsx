import React from 'react';
import * as THREE from 'three';
import { PROJECTS } from '../../data/projectData';

export function StudioProjectPortals({
  progress = 0,
  onSelectProject,
  hoveredProjectId,
  setHoveredProjectId
}) {
  const isWorkScene = progress >= 0.75;

  return (
    <group name="StudioProjectPortals" position={[0, 0, -2.1]}>
      {/* 3 Physical Exhibition Pedestals in the Studio */}
      {PROJECTS.map((proj, idx) => {
        const isHovered = hoveredProjectId === proj.id;
        const xPos = (idx - 1) * 1.5;

        return (
          <group
            key={proj.id}
            position={[xPos, 0, 0]}
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
              document.body.style.cursor = 'default';
            }}
          >
            {/* Honed Basalt Gallery Pedestal */}
            <mesh position={[0, 0.44, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.76, 0.88, 0.76]} />
              <meshStandardMaterial
                color={isHovered ? '#262a34' : '#1c1e24'}
                roughness={0.7}
                metalness={0.15}
              />
            </mesh>

            {/* Brass Inlaid Plaque with Project Code */}
            <mesh position={[0, 0.78, 0.385]}>
              <planeGeometry args={[0.34, 0.08]} />
              <meshStandardMaterial color="#c29b5c" metalness={0.88} roughness={0.25} />
            </mesh>

            {/* =========================================================
                PROJECT 01: KOMOREBI PAVILION (Interlocking Timber Model)
                ========================================================= */}
            {idx === 0 && (
              <group position={[0, 1.05, 0]}>
                {/* Dark circular cedar plinth */}
                <mesh receiveShadow>
                  <cylinderGeometry args={[0.3, 0.3, 0.04, 32]} />
                  <meshStandardMaterial color="#2d2218" roughness={0.7} />
                </mesh>
                {/* 12 Interlocking Charred Cedar Ribs forming open canopy */}
                {[...Array(12)].map((_, rIdx) => {
                  const angle = (rIdx / 12) * Math.PI * 2;
                  return (
                    <group
                      key={rIdx}
                      position={[Math.cos(angle) * 0.14, 0.16, Math.sin(angle) * 0.14]}
                      rotation={[0.15, angle, 0.2]}
                    >
                      <mesh castShadow>
                        <boxGeometry args={[0.018, 0.28, 0.04]} />
                        <meshStandardMaterial color="#3a2e22" roughness={0.65} />
                      </mesh>
                    </group>
                  );
                })}
                {/* Inner focused warm spotlight simulating filtered forest daylight */}
                <pointLight
                  position={[0, 0.3, 0]}
                  color="#ffd599"
                  intensity={isHovered ? 1.6 : 0.8}
                  distance={1.6}
                  decay={2}
                />
              </group>
            )}

            {/* =========================================================
                PROJECT 02: AETHERIA CHRONOMETER (Marine Bronze Sculpture)
                ========================================================= */}
            {idx === 1 && (
              <group position={[0, 1.05, 0]}>
                {/* Turned Bronze Base */}
                <mesh receiveShadow>
                  <cylinderGeometry args={[0.26, 0.28, 0.04, 32]} />
                  <meshStandardMaterial color="#8c704a" metalness={0.85} roughness={0.3} />
                </mesh>
                {/* Vertical precision gantry */}
                <mesh position={[-0.1, 0.18, 0]} castShadow>
                  <cylinderGeometry args={[0.012, 0.012, 0.32, 16]} />
                  <meshStandardMaterial color="#5c4930" metalness={0.9} roughness={0.2} />
                </mesh>
                <mesh position={[0.1, 0.18, 0]} castShadow>
                  <cylinderGeometry args={[0.012, 0.012, 0.32, 16]} />
                  <meshStandardMaterial color="#5c4930" metalness={0.9} roughness={0.2} />
                </mesh>
                {/* Suspended Optical Sapphire Lens Cylinder */}
                <mesh position={[0, 0.18, 0]}>
                  <cylinderGeometry args={[0.07, 0.07, 0.04, 32]} />
                  <meshPhysicalMaterial
                    roughness={0.08}
                    transmission={0.85}
                    ior={1.77}
                    color="#b0d4f1"
                  />
                </mesh>
                {/* Central Gear Escapement */}
                <mesh position={[0, 0.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <torusGeometry args={[0.045, 0.008, 12, 24]} />
                  <meshStandardMaterial color="#c29b5c" metalness={0.9} roughness={0.2} />
                </mesh>
                <pointLight
                  position={[0, 0.3, 0]}
                  color="#d4ebff"
                  intensity={isHovered ? 1.6 : 0.8}
                  distance={1.6}
                  decay={2}
                />
              </group>
            )}

            {/* =========================================================
                PROJECT 03: CENOTE SANCTUARY (Rammed Earth & Water Model)
                ========================================================= */}
            {idx === 2 && (
              <group position={[0, 1.05, 0]}>
                {/* Terracotta earth bowl */}
                <mesh receiveShadow>
                  <cylinderGeometry args={[0.28, 0.22, 0.12, 32, 1, true]} />
                  <meshStandardMaterial color="#874732" roughness={0.9} side={THREE.DoubleSide} />
                </mesh>
                {/* Calm reflective black water pool inside */}
                <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                  <circleGeometry args={[0.25, 32]} />
                  <meshStandardMaterial color="#0c1117" roughness={0.05} metalness={0.3} />
                </mesh>
                {/* Subterranean acoustic oculus arch */}
                <mesh position={[0, 0.14, 0]}>
                  <torusGeometry args={[0.16, 0.02, 12, 32, Math.PI]} />
                  <meshStandardMaterial color="#7a3f2d" roughness={0.85} />
                </mesh>
                <pointLight
                  position={[0, 0.25, 0]}
                  color="#ffd0b5"
                  intensity={isHovered ? 1.6 : 0.8}
                  distance={1.6}
                  decay={2}
                />
              </group>
            )}

            {/* Floor Ambient Reflection Ring on Hover */}
            {isHovered && (
              <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.42, 0.46, 32]} />
                <meshBasicMaterial color="#ffeedd" transparent opacity={0.3} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}
