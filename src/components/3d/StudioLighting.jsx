import React, { useMemo } from 'react';
import * as THREE from 'three';

export function StudioLighting({ progress = 0 }) {
  // 1. Ambient lighting curve: dark midnight (0.2) -> pre-dawn (0.5) -> full morning daylight (1.1)
  const ambientIntensity = useMemo(() => {
    if (progress < 0.2) return 0.22;
    if (progress < 0.5) return 0.22 + (progress - 0.2) * 0.9;
    if (progress < 0.8) return 0.49 + (progress - 0.5) * 1.2;
    return 0.85 + (progress - 0.8) * 1.4;
  }, [progress]);

  const ambientColor = useMemo(() => {
    const night = new THREE.Color('#0c0f17');
    const dawn = new THREE.Color('#4c5c75');
    const morning = new THREE.Color('#f2e8dc');
    if (progress < 0.75) {
      return night.clone().lerp(dawn, progress / 0.75);
    }
    return dawn.clone().lerp(morning, (progress - 0.75) / 0.25);
  }, [progress]);

  // 2. Solitary night entrance lamp (strongest in Scene 01 ARRIVAL)
  const entranceLampIntensity = Math.max(0.3, 1.8 * (1.0 - progress * 1.2));

  // 3. Desk lamps & studio practicals activation (Scene 2 to 5)
  const deskPracticalsIntensity = Math.max(0.2, Math.min(2.4, (progress - 0.15) * 3.8));

  // 4. Low-angle natural morning sunbeam through east window (Scene 7 DAWN)
  const dawnSunIntensity = Math.max(0, Math.min(3.2, (progress - 0.72) * 11.0));

  return (
    <group name="StudioLighting">
      {/* Global Ambient Fill */}
      <ambientLight color={ambientColor} intensity={ambientIntensity} />

      {/* Solitary Warm Entrance Sconce Light (Scene 01 Arrival) */}
      <pointLight
        position={[-2.8, 2.6, 6.2]}
        color="#ffcc88"
        intensity={entranceLampIntensity}
        distance={7.5}
        decay={2}
      />

      {/* Ceiling Track Downlight 01 (Over Central Workshop Benches) */}
      <pointLight
        position={[-1.2, 3.6, -0.6]}
        color="#fff1dc"
        intensity={0.4 + deskPracticalsIntensity * 0.4}
        distance={8.0}
        decay={2}
      />

      {/* Ceiling Track Downlight 02 (Over Collaborative Layout Table) */}
      <pointLight
        position={[1.2, 3.6, 0.8]}
        color="#fff1dc"
        intensity={0.4 + deskPracticalsIntensity * 0.4}
        distance={8.0}
        decay={2}
      />

      {/* Focused Tungsten Lamp at Elena's Drafting Desk */}
      <pointLight
        position={[-2.2, 1.5, -0.6]}
        color="#ffc67a"
        intensity={deskPracticalsIntensity * 0.8}
        distance={4.0}
        decay={2}
      />

      {/* Focused Display Glow at Marcus's CAD Workstation */}
      <pointLight
        position={[-1.1, 1.4, -0.5]}
        color="#9ec4ed"
        intensity={deskPracticalsIntensity * 0.7}
        distance={3.5}
        decay={2}
      />

      {/* Focused Ultrawide Glow at Sora's Systems Workstation */}
      <pointLight
        position={[0.1, 1.4, -0.5]}
        color="#b3daf5"
        intensity={deskPracticalsIntensity * 0.75}
        distance={3.5}
        decay={2}
      />

      {/* Focused Reference Monitor Glow at Maya's Motion Desk */}
      <pointLight
        position={[1.2, 1.4, -0.5]}
        color="#fce2c2"
        intensity={deskPracticalsIntensity * 0.75}
        distance={3.5}
        decay={2}
      />

      {/* Focused Reading Lamp at Julian's Material Library */}
      <pointLight
        position={[2.3, 1.4, -0.6]}
        color="#ffd299"
        intensity={deskPracticalsIntensity * 0.8}
        distance={4.0}
        decay={2}
      />

      {/* =========================================================================
          DAWN SUNLIGHT: DIRECT LOW-ANGLE SUNBEAM THROUGH EAST WINDOW (x = 4.4)
          ========================================================================= */}
      {/* Low-angle golden morning sun casting long shadows westward across concrete */}
      <directionalLight
        position={[9.0, 3.2, 2.0]}
        target-position={[-2.0, 0.7, -0.8]}
        color="#ffe2ba"
        intensity={dawnSunIntensity}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />

      {/* Soft diffuse blue morning sky bounce through the window */}
      <directionalLight
        position={[6.0, 6.0, 4.0]}
        color="#9bb8dd"
        intensity={0.2 + dawnSunIntensity * 0.35}
      />
    </group>
  );
}
