import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { TEAM_MEMBERS } from '../../data/teamData';

// Individual Totem for VEX: Refractive Crystalline Monolith with Golden Orbital Rings
function VexTotem({ isHovered }) {
  const meshRef = useRef();
  const ringRef = useRef();
  const prismRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const speed = isHovered ? 2.2 : 0.8;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.5 * speed;
      meshRef.current.rotation.x = Math.sin(t * 0.8) * 0.2;
      meshRef.current.position.y = Math.sin(t * 1.5) * 0.08;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.7 * speed;
      ringRef.current.rotation.x = t * 0.4 * speed;
    }
    if (prismRef.current) {
      prismRef.current.rotation.y = -t * 1.2 * speed;
    }
  });

  return (
    <group>
      {/* Central Refractive Icosahedron */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={isHovered ? 2.5 : 1.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      {/* Inner Wireframe Shell */}
      <mesh scale={[1.08, 1.08, 1.08]}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.6} />
      </mesh>
      {/* Golden Orbital Ring */}
      <group ref={ringRef}>
        <mesh>
          <torusGeometry args={[0.95, 0.02, 16, 48]} />
          <meshStandardMaterial
            color="#ffd700"
            emissive="#ffd700"
            emissiveIntensity={0.8}
            metalness={0.9}
          />
        </mesh>
      </group>
      {/* Orbiting Satellite Prisms */}
      <group ref={prismRef}>
        {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle, i) => (
          <mesh
            key={i}
            position={[Math.cos(angle) * 1.15, Math.sin(angle) * 0.3, Math.sin(angle) * 1.15]}
          >
            <octahedronGeometry args={[0.08, 0]} />
            <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Individual Totem for KAI: Deconstructed Expanding Hypercube Matrix
function KaiTotem({ isHovered }) {
  const groupRef = useRef();

  // Create an array of 8 sub-cubes forming a 2x2x2 matrix
  const cubes = useMemo(() => {
    const list = [];
    const positions = [-0.18, 0.18];
    positions.forEach((x) => {
      positions.forEach((y) => {
        positions.forEach((z) => {
          list.push({ origin: [x, y, z] });
        });
      });
    });
    return list;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const speed = isHovered ? 2.0 : 0.7;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.4 * speed;
      groupRef.current.rotation.x = t * 0.3 * speed;
      const expand = 1.0 + (isHovered ? 0.45 : 0.15) * Math.sin(t * 2);
      groupRef.current.scale.set(expand, expand, expand);
    }
  });

  return (
    <group ref={groupRef}>
      {cubes.map((c, i) => (
        <mesh key={i} position={c.origin}>
          <boxGeometry args={[0.26, 0.26, 0.26]} />
          <meshStandardMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={isHovered ? 2.2 : 1.1}
            roughness={0.2}
            metalness={0.8}
            wireframe={i % 2 === 0}
          />
        </mesh>
      ))}
      {/* Central Quantum Node */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

// Individual Totem for NOVA: Organic Morphing Liquid Metal Sphere
function NovaTotem({ isHovered }) {
  const meshRef = useRef();
  const bubblesRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const speed = isHovered ? 2.4 : 1.0;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.6 * speed;
      meshRef.current.rotation.z = Math.sin(t * 0.5) * 0.3;
      // Fluid breathing wobble
      const sx = 1.0 + Math.sin(t * 2.8) * 0.14;
      const sy = 1.0 + Math.cos(t * 2.2) * 0.16;
      const sz = 1.0 + Math.sin(t * 2.5 + 1) * 0.14;
      meshRef.current.scale.set(sx, sy, sz);
    }
    if (bubblesRef.current) {
      bubblesRef.current.rotation.y = -t * 0.8 * speed;
    }
  });

  return (
    <group>
      {/* Liquid Core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#ff007f"
          emissive="#ff007f"
          emissiveIntensity={isHovered ? 2.6 : 1.3}
          roughness={0.08}
          metalness={0.95}
        />
      </mesh>
      {/* Chromatic Dispersion Orbiting Droplets */}
      <group ref={bubblesRef}>
        {[0, 1.2, 2.4, 3.6, 4.8].map((angle, i) => (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.9, Math.sin(angle * 2) * 0.25, Math.sin(angle) * 0.9]}
          >
            <sphereGeometry args={[0.07 + (i % 3) * 0.02, 16, 16]} />
            <meshStandardMaterial
              color="#b000ff"
              emissive="#ff007f"
              emissiveIntensity={1.8}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Individual Totem for ECHO: Kinetic Audio Equalizer Rings & Levitating Waveform Disc
function EchoTotem({ isHovered }) {
  const discRef = useRef();
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const speed = isHovered ? 3.0 : 1.2;
    if (discRef.current) {
      discRef.current.rotation.y = t * 1.5 * speed;
      discRef.current.position.y = Math.sin(t * 3) * 0.08;
    }
    if (ring1.current) {
      ring1.current.position.y = Math.sin(t * 4) * 0.15;
      ring1.current.scale.setScalar(1 + Math.sin(t * 3) * 0.1);
    }
    if (ring2.current) {
      ring2.current.position.y = Math.cos(t * 3.5) * 0.18;
      ring2.current.scale.setScalar(1 + Math.cos(t * 2.8) * 0.12);
    }
    if (ring3.current) {
      ring3.current.position.y = Math.sin(t * 2.5 + 2) * 0.22;
      ring3.current.scale.setScalar(1 + Math.sin(t * 4) * 0.15);
    }
  });

  return (
    <group>
      {/* Central Holographic Frequency Disc */}
      <mesh ref={discRef} rotation={[Math.PI / 4, 0, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.05, 32]} />
        <meshStandardMaterial
          color="#ffaa00"
          emissive="#ffaa00"
          emissiveIntensity={isHovered ? 2.4 : 1.2}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>
      {/* Pulsating Audio Frequency Rings */}
      <mesh ref={ring1}>
        <torusGeometry args={[0.75, 0.025, 16, 48]} />
        <meshStandardMaterial color="#ff6b00" emissive="#ff6b00" emissiveIntensity={1.4} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[0.95, 0.02, 16, 48]} />
        <meshStandardMaterial color="#ffaa00" emissive="#ffaa00" emissiveIntensity={1.2} />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[1.15, 0.015, 16, 48]} />
        <meshStandardMaterial color="#ffd000" emissive="#ffd000" emissiveIntensity={1.0} />
      </mesh>
    </group>
  );
}

// Individual Totem for AXEL: Rotating Stargate Wormhole Ring with Anti-gravity Shards
function AxelTotem({ isHovered }) {
  const outerRing = useRef();
  const innerRing = useRef();
  const shardsRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const speed = isHovered ? 2.5 : 0.9;
    if (outerRing.current) outerRing.current.rotation.z = t * 0.6 * speed;
    if (innerRing.current) {
      innerRing.current.rotation.z = -t * 0.9 * speed;
      innerRing.current.rotation.x = Math.sin(t) * 0.3;
    }
    if (shardsRef.current) {
      shardsRef.current.rotation.y = t * 0.4 * speed;
    }
  });

  return (
    <group>
      {/* Outer Stargate Ring */}
      <group ref={outerRing}>
        <mesh>
          <torusGeometry args={[0.85, 0.04, 16, 48]} />
          <meshStandardMaterial
            color="#7000ff"
            emissive="#7000ff"
            emissiveIntensity={isHovered ? 2.5 : 1.3}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        {/* Runic Glyph Notches */}
        {[0, Math.PI / 3, (Math.PI * 2) / 3, Math.PI, (Math.PI * 4) / 3, (Math.PI * 5) / 3].map(
          (ang, idx) => (
            <mesh key={idx} position={[Math.cos(ang) * 0.85, Math.sin(ang) * 0.85, 0]}>
              <boxGeometry args={[0.07, 0.07, 0.07]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          )
        )}
      </group>

      {/* Inner Wormhole Horizon */}
      <group ref={innerRing}>
        <mesh>
          <torusGeometry args={[0.6, 0.025, 16, 32]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1.5} />
        </mesh>
      </group>

      {/* Floating Anti-Gravity Shards */}
      <group ref={shardsRef}>
        {[0.8, 2.2, 3.8, 5.1].map((ang, i) => (
          <mesh
            key={i}
            position={[Math.cos(ang) * 1.1, Math.sin(ang * 1.5) * 0.3, Math.sin(ang) * 1.1]}
          >
            <tetrahedronGeometry args={[0.09, 0]} />
            <meshStandardMaterial color="#a855f7" emissive="#7000ff" emissiveIntensity={1.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Master Operative Stations Container
export function OperativeStations({
  progress = 0,
  onSelectMember,
  hoveredMemberId,
  setHoveredMemberId
}) {
  return (
    <group name="OperativeStations">
      {TEAM_MEMBERS.map((member) => {
        const isHovered = hoveredMemberId === member.id;

        return (
          <group
            key={member.id}
            position={member.position}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredMemberId(member.id);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              setHoveredMemberId(null);
              document.body.style.cursor = 'auto';
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (onSelectMember) onSelectMember(member);
            }}
          >
            {/* Custom 3D Character Totem */}
            {member.totemType === 'crystal' && <VexTotem isHovered={isHovered} />}
            {member.totemType === 'hypercube' && <KaiTotem isHovered={isHovered} />}
            {member.totemType === 'liquid' && <NovaTotem isHovered={isHovered} />}
            {member.totemType === 'sonic' && <EchoTotem isHovered={isHovered} />}
            {member.totemType === 'stargate' && <AxelTotem isHovered={isHovered} />}

            {/* Glowing Pedestal Ring Platform */}
            <mesh position={[0, -1.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.8, 1.1, 32]} />
              <meshBasicMaterial
                color={member.color}
                transparent
                opacity={isHovered ? 0.7 : 0.25}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Vertical Holographic Guidance Light Beam */}
            <mesh position={[0, -0.4, 0]}>
              <cylinderGeometry args={[0.02, 0.08, 1.4, 16]} />
              <meshBasicMaterial
                color={member.color}
                transparent
                opacity={isHovered ? 0.45 : 0.15}
              />
            </mesh>

            {/* Dedicated Point Light */}
            <pointLight
              color={member.color}
              intensity={isHovered ? 3.5 : 1.8}
              distance={4.5}
              position={[0, 0.5, 0.5]}
            />

            {/* Spatial 3D HUD Badge (Anchored above the totem) */}
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
                  if (onSelectMember) onSelectMember(member);
                }}
                style={{
                  background: isHovered
                    ? 'rgba(10, 15, 30, 0.95)'
                    : 'rgba(5, 8, 18, 0.82)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: `1px solid ${isHovered ? member.color : 'rgba(255, 255, 255, 0.15)'}`,
                  boxShadow: isHovered
                    ? `0 0 20px ${member.color}, inset 0 0 10px ${member.accentGlow}`
                    : '0 8px 24px rgba(0,0,0,0.5)',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  color: '#fff',
                  fontFamily: '"Space Grotesk", monospace, sans-serif',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'scale(1.08)' : 'scale(1.0)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: member.color,
                      boxShadow: `0 0 8px ${member.color}`,
                      display: 'inline-block'
                    }}
                  />
                  <span style={{ fontSize: '9px', letterSpacing: '0.12em', color: '#8892b0' }}>
                    {member.codename}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: isHovered ? member.color : '#ffffff'
                  }}
                >
                  {member.name}
                </div>
                <div style={{ fontSize: '10px', color: '#a0aec0', marginTop: '2px' }}>
                  {member.role.split('&')[0]}
                </div>
                <div
                  style={{
                    marginTop: '5px',
                    fontSize: '8px',
                    letterSpacing: '0.15em',
                    color: member.color,
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '4px',
                    textAlign: 'center',
                    fontWeight: 600
                  }}
                >
                  {isHovered ? 'ACCESS DOSSIER ▸' : 'CLICK TO INSPECT'}
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
