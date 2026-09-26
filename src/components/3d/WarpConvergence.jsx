import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export function WarpConvergence({ progress = 0, onOpenTransmission }) {
  const portalRingsRef = useRef();
  const streaksRef = useRef();
  const beaconRef = useRef();

  // Active in Sector 5 (progress 0.85 -> 1.0)
  const isSector5 = progress >= 0.82;

  // Generate 200 hyperspace streak rays
  const streaks = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 200; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.0 + Math.random() * 6.0;
      arr.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius + 1.2,
        z: -15 + Math.random() * 20,
        speed: 8 + Math.random() * 12,
        length: 1.5 + Math.random() * 3.5
      });
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (portalRingsRef.current) {
      portalRingsRef.current.children.forEach((ring, i) => {
        ring.rotation.z = t * (0.5 + i * 0.3) * (i % 2 === 0 ? 1 : -1);
      });
    }

    if (beaconRef.current) {
      beaconRef.current.rotation.y = t * 1.2;
      beaconRef.current.rotation.x = Math.sin(t * 1.5) * 0.2;
    }

    if (streaksRef.current && isSector5) {
      streaksRef.current.children.forEach((stk, i) => {
        stk.position.z += delta * streaks[i].speed * 2.5;
        if (stk.position.z > 5) {
          stk.position.z = -15;
        }
      });
    }
  });

  return (
    <group position={[0, 0, -9.5]} name="WarpConvergence">
      {/* 5 Concentric Warp Rings */}
      <group ref={portalRingsRef} position={[0, 1.2, 0]}>
        {[1.8, 2.5, 3.2, 4.0, 4.8].map((radius, idx) => (
          <group key={idx}>
            <mesh>
              <ringGeometry args={[radius, radius + 0.05, 64]} />
              <meshBasicMaterial
                color={idx % 2 === 0 ? '#00f0ff' : '#ff007f'}
                side={THREE.DoubleSide}
                transparent
                opacity={0.65}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Center Quantum Beacon / Transmission Node */}
      <group
        position={[0, 1.2, 0]}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (onOpenTransmission) onOpenTransmission();
        }}
      >
        <mesh ref={beaconRef}>
          <tetrahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={2.5}
            roughness={0.1}
            metalness={0.9}
            wireframe
          />
        </mesh>

        <pointLight color="#00f0ff" intensity={4.0} distance={10} />

        {/* 3D Interactive Terminal Button */}
        <Html
          position={[0, 1.4, 0]}
          center
          distanceFactor={8}
          style={{ pointerEvents: 'auto', userSelect: 'none' }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onOpenTransmission) onOpenTransmission();
            }}
            style={{
              background: 'linear-gradient(135deg, rgba(0,240,255,0.9), rgba(255,0,127,0.9))',
              border: 'none',
              padding: '10px 22px',
              borderRadius: '30px',
              color: '#000',
              fontWeight: 800,
              fontSize: '13px',
              letterSpacing: '0.14em',
              fontFamily: '"Space Grotesk", sans-serif',
              cursor: 'pointer',
              boxShadow: '0 0 25px rgba(0,240,255,0.8)',
              transition: 'transform 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            TRANSMIT TO SYNDICATE ▸
          </button>
        </Html>
      </group>

      {/* Streaming Hyperspace Streak Stars */}
      <group ref={streaksRef}>
        {streaks.map((s, idx) => (
          <mesh key={idx} position={[s.x, s.y, s.z]}>
            <boxGeometry args={[0.02, 0.02, s.length]} />
            <meshBasicMaterial
              color="#00f0ff"
              transparent
              opacity={isSector5 ? 0.75 : 0.15}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
