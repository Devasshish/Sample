import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function SpaceEnvironment({ progress = 0 }) {
  const gridRef = useRef();
  const starsRef = useRef();
  const ringsRef = useRef();

  // Generate 1200 glowing space particles
  const [starPositions, starColors] = useMemo(() => {
    const count = 1200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#00f0ff'),
      new THREE.Color('#ff007f'),
      new THREE.Color('#00ff88'),
      new THREE.Color('#ffaa00'),
      new THREE.Color('#ffffff')
    ];

    for (let i = 0; i < count; i++) {
      // Cylindrical tunnel distribution
      const radius = 2.5 + Math.random() * 18.0;
      const angle = Math.random() * Math.PI * 2;
      const z = -20 + Math.random() * 35;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.7 - 0.5;
      positions[i * 3 + 2] = z;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    return [positions, colors];
  }, []);

  // Warp guide rings along the flight axis
  const guideRings = useMemo(() => {
    return [
      { z: 6.0, r: 4.8, color: '#00f0ff' },
      { z: 3.0, r: 4.2, color: '#ff007f' },
      { z: 0.0, r: 3.8, color: '#00ff88' },
      { z: -3.0, r: 3.5, color: '#ffaa00' },
      { z: -6.0, r: 3.2, color: '#7000ff' },
      { z: -9.0, r: 2.8, color: '#00f0ff' }
    ];
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // Subtle starfield drift and acceleration based on scroll
    if (starsRef.current) {
      starsRef.current.rotation.z = time * 0.02;
    }

    // Gentle floating motion on rings
    if (ringsRef.current) {
      ringsRef.current.children.forEach((ring, idx) => {
        ring.rotation.z = time * 0.1 * (idx % 2 === 0 ? 1 : -1);
      });
    }

    // Dynamic grid ripple
    if (gridRef.current) {
      gridRef.current.position.z = (time * 0.8) % 2 - 2;
    }
  });

  return (
    <group name="SpaceEnvironment">
      {/* Dynamic Cyber Grid Floor */}
      <group position={[0, -1.8, 0]}>
        <gridHelper
          ref={gridRef}
          args={[60, 60, '#00f0ff', '#142035']}
          position={[0, 0, 0]}
        />
        {/* Mirror Grid Ceiling */}
        <gridHelper
          args={[60, 60, '#ff007f', '#1c102a']}
          position={[0, 7.5, 0]}
          rotation={[Math.PI, 0, 0]}
        />
      </group>

      {/* Floating Starfield Particles */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starPositions.length / 3}
            array={starPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={starColors.length / 3}
            array={starColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Floating Hyperspace Guide Rings */}
      <group ref={ringsRef}>
        {guideRings.map((g, i) => (
          <group key={i} position={[0, 0.8, g.z]}>
            <mesh>
              <ringGeometry args={[g.r, g.r + 0.03, 64]} />
              <meshBasicMaterial
                color={g.color}
                transparent
                opacity={0.25}
                side={THREE.DoubleSide}
              />
            </mesh>
            {/* 4 Corner Marker Notches */}
            {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, ai) => (
              <mesh
                key={ai}
                position={[Math.cos(angle) * g.r, Math.sin(angle) * g.r, 0]}
              >
                <boxGeometry args={[0.08, 0.08, 0.08]} />
                <meshBasicMaterial color={g.color} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* Background Volumetric Glow Spheres */}
      <mesh position={[0, 0, -22]}>
        <sphereGeometry args={[14, 32, 32]} />
        <meshBasicMaterial
          color="#060c24"
          side={THREE.BackSide}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}
