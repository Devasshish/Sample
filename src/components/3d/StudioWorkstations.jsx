import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
  getDraftingSketchTexture,
  getCadScreenTexture,
  getCodeScreenTexture,
  getMotionScreenTexture,
  getSmokedOakTexture
} from '../../utils/studioTextures';
import { TEAM_MEMBERS } from '../../data/teamData';

export function StudioWorkstations({
  progress = 0,
  onSelectMember,
  hoveredMemberId,
  setHoveredMemberId
}) {
  const oakTexture = useMemo(() => getSmokedOakTexture(), []);
  const sketchTexture = useMemo(() => getDraftingSketchTexture(), []);
  const cadTexture = useMemo(() => getCadScreenTexture(), []);
  const codeTexture = useMemo(() => getCodeScreenTexture(), []);
  const motionTexture = useMemo(() => getMotionScreenTexture(), []);

  // Studio activation factor (Scene 5: 0.60 -> 0.85)
  // Desk lamps and monitors illuminate as progress moves through Scene 2 to Scene 5
  const studioAwake = Math.max(0, Math.min(1, (progress - 0.22) / 0.45));
  const monitorsAwake = Math.max(0, Math.min(1, (progress - 0.35) / 0.35));

  return (
    <group name="StudioWorkstations">
      {/* =========================================================================
          1. MAIN SOLID SMOKED OAK WORK BENCHES (x: -3.0 to +3.0, z: -0.7, y: 0.74)
          ========================================================================= */}
      {/* Left Main Table (Desks 1, 2) */}
      <group position={[-1.7, 0, -0.7]}>
        {/* Smoked Oak Tabletop */}
        <mesh position={[0, 0.74, 0]} receiveShadow castShadow>
          <boxGeometry args={[3.2, 0.06, 1.2]} />
          <meshStandardMaterial
            map={oakTexture}
            color="#46382b"
            roughness={0.65}
            metalness={0.1}
          />
        </mesh>
        {/* Blackened Steel Trestle Legs */}
        {[-1.4, 1.4].map((lx, li) => (
          <group key={li} position={[lx, 0.36, 0]}>
            <mesh position={[0, 0, -0.5]}>
              <boxGeometry args={[0.06, 0.72, 0.06]} />
              <meshStandardMaterial color="#181a20" roughness={0.3} metalness={0.8} />
            </mesh>
            <mesh position={[0, 0, 0.5]}>
              <boxGeometry args={[0.06, 0.72, 0.06]} />
              <meshStandardMaterial color="#181a20" roughness={0.3} metalness={0.8} />
            </mesh>
            <mesh position={[0, -0.32, 0]}>
              <boxGeometry args={[0.06, 0.04, 1.0]} />
              <meshStandardMaterial color="#181a20" roughness={0.3} metalness={0.8} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Right Main Table (Desks 3, 4, 5) */}
      <group position={[1.5, 0, -0.7]}>
        {/* Smoked Oak Tabletop */}
        <mesh position={[0, 0.74, 0]} receiveShadow castShadow>
          <boxGeometry args={[3.4, 0.06, 1.2]} />
          <meshStandardMaterial
            map={oakTexture}
            color="#46382b"
            roughness={0.65}
            metalness={0.1}
          />
        </mesh>
        {/* Blackened Steel Trestle Legs */}
        {[-1.5, 1.5].map((lx, li) => (
          <group key={li} position={[lx, 0.36, 0]}>
            <mesh position={[0, 0, -0.5]}>
              <boxGeometry args={[0.06, 0.72, 0.06]} />
              <meshStandardMaterial color="#181a20" roughness={0.3} metalness={0.8} />
            </mesh>
            <mesh position={[0, 0, 0.5]}>
              <boxGeometry args={[0.06, 0.72, 0.06]} />
              <meshStandardMaterial color="#181a20" roughness={0.3} metalness={0.8} />
            </mesh>
            <mesh position={[0, -0.32, 0]}>
              <boxGeometry args={[0.06, 0.04, 1.0]} />
              <meshStandardMaterial color="#181a20" roughness={0.3} metalness={0.8} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Cable Trough & Sub-desk wire detail */}
      <mesh position={[0, 0.68, -0.7]}>
        <boxGeometry args={[6.8, 0.04, 0.16]} />
        <meshStandardMaterial color="#14161b" roughness={0.5} />
      </mesh>

      {/* Studio Task Chairs (Minimalist black steel & bent walnut ply) */}
      {[-2.2, -1.1, 0.1, 1.2, 2.3].map((cx, idx) => (
        <group key={`chair-${idx}`} position={[cx, 0, -0.1]} rotation={[0, Math.PI, 0]}>
          {/* Seat Cushion */}
          <mesh position={[0, 0.46, 0]}>
            <boxGeometry args={[0.44, 0.05, 0.42]} />
            <meshStandardMaterial color="#1b1c20" roughness={0.8} />
          </mesh>
          {/* Curved Backrest */}
          <mesh position={[0, 0.72, 0.2]}>
            <boxGeometry args={[0.42, 0.22, 0.03]} />
            <meshStandardMaterial color="#2d2218" roughness={0.7} />
          </mesh>
          {/* Backrest steel support */}
          <mesh position={[0, 0.56, 0.2]}>
            <boxGeometry args={[0.04, 0.24, 0.02]} />
            <meshStandardMaterial color="#111" metalness={0.8} />
          </mesh>
          {/* 5-star base & central pole */}
          <mesh position={[0, 0.24, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.42, 12]} />
            <meshStandardMaterial color="#111" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.04, 12]} />
            <meshStandardMaterial color="#181818" metalness={0.7} />
          </mesh>
        </group>
      ))}

      {/* =========================================================================
          WORKSTATION 1: ELENA ROSTOVA — Creative Director & Architect
          Position: x = -2.2, z = -0.7, y = 0.77
          ========================================================================= */}
      <group
        position={[-2.2, 0.77, -0.7]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectMember(TEAM_MEMBERS[0]);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredMemberId('elena');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredMemberId(null);
          document.body.style.cursor = 'default';
        }}
      >
        {/* Subtle hover grounding plate */}
        {hoveredMemberId === 'elena' && (
          <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.1, 0.9]} />
            <meshBasicMaterial color="#ffeedd" transparent opacity={0.06} />
          </mesh>
        )}

        {/* Angled Wooden Drafting Board */}
        <group position={[0, 0.08, 0.05]} rotation={[-0.18, 0, 0]}>
          <mesh receiveShadow castShadow>
            <boxGeometry args={[0.74, 0.03, 0.54]} />
            <meshStandardMaterial color="#d4c8b6" roughness={0.6} />
          </mesh>

          {/* Tracing Paper Sketch of Architectural Pavilion */}
          <mesh position={[0, 0.018, 0]}>
            <planeGeometry args={[0.64, 0.44]} />
            <meshStandardMaterial
              map={sketchTexture}
              transparent
              opacity={0.96}
              roughness={0.5}
            />
          </mesh>

          {/* Heavy Brass T-Square */}
          <mesh position={[-0.24, 0.025, 0]}>
            <boxGeometry args={[0.035, 0.006, 0.48]} />
            <meshStandardMaterial color="#d4a359" metalness={0.88} roughness={0.25} />
          </mesh>
          <mesh position={[-0.24, 0.025, -0.22]}>
            <boxGeometry args={[0.18, 0.006, 0.04]} />
            <meshStandardMaterial color="#d4a359" metalness={0.88} roughness={0.25} />
          </mesh>
        </group>

        {/* Leica M Camera with 35mm Prime Lens */}
        <group position={[0.42, 0.03, -0.15]} rotation={[0, 0.35, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.14, 0.08, 0.045]} />
            <meshStandardMaterial color="#1a1a1c" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.035]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.032, 0.04, 20]} />
            <meshStandardMaterial color="#2d2f33" metalness={0.85} roughness={0.2} />
          </mesh>
        </group>

        {/* Handcrafted Slip-cast Ceramic Espresso Cup */}
        <group position={[0.42, 0.035, 0.22]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.04, 0.03, 0.07, 18]} />
            <meshStandardMaterial color="#e8e4da" roughness={0.8} />
          </mesh>
        </group>

        {/* Anglepoise / Artemide Tolomeo Style Desk Lamp */}
        <group position={[-0.45, 0.02, -0.32]}>
          {/* Heavy cast iron lamp base */}
          <mesh>
            <cylinderGeometry args={[0.08, 0.085, 0.02, 24]} />
            <meshStandardMaterial color="#18191d" metalness={0.85} roughness={0.3} />
          </mesh>
          {/* Articulated lower arm */}
          <mesh position={[0.04, 0.2, 0.05]} rotation={[-0.35, 0, 0.2]}>
            <cylinderGeometry args={[0.008, 0.008, 0.38, 12]} />
            <meshStandardMaterial color="#262930" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Upper arm */}
          <mesh position={[0.1, 0.45, 0.16]} rotation={[0.4, 0, -0.2]}>
            <cylinderGeometry args={[0.008, 0.008, 0.32, 12]} />
            <meshStandardMaterial color="#262930" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Cone shade pointing down at desk */}
          <group position={[0.14, 0.52, 0.26]} rotation={[0.9, 0, 0]}>
            <mesh>
              <coneGeometry args={[0.09, 0.14, 20, 1, true]} />
              <meshStandardMaterial color="#1e2025" metalness={0.7} roughness={0.3} side={THREE.DoubleSide} />
            </mesh>
            {/* Warm Tungsten Light Source */}
            <pointLight
              color="#ffcc88"
              intensity={0.6 + studioAwake * 1.6}
              distance={3.2}
              decay={2}
              castShadow
            />
          </group>
        </group>
      </group>

      {/* =========================================================================
          WORKSTATION 2: MARCUS VANCE — Spatial Sculptor & 3D Lead
          Position: x = -1.1, z = -0.7, y = 0.77
          ========================================================================= */}
      <group
        position={[-1.1, 0.77, -0.7]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectMember(TEAM_MEMBERS[1]);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredMemberId('marcus');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredMemberId(null);
          document.body.style.cursor = 'default';
        }}
      >
        {hoveredMemberId === 'marcus' && (
          <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.0, 0.9]} />
            <meshBasicMaterial color="#ffeedd" transparent opacity={0.06} />
          </mesh>
        )}

        {/* Dual Matte Studio Displays */}
        {/* Primary Center Display */}
        <group position={[-0.05, 0.24, -0.2]}>
          <mesh castShadow>
            <boxGeometry args={[0.62, 0.38, 0.02]} />
            <meshStandardMaterial color="#16181d" metalness={0.6} roughness={0.3} />
          </mesh>
          {/* Screen Content: Shaded Wireframe 3D CAD */}
          <mesh position={[0, 0, 0.011]}>
            <planeGeometry args={[0.59, 0.35]} />
            <meshBasicMaterial
              map={cadTexture}
              color={new THREE.Color('#ffffff').multiplyScalar(0.4 + monitorsAwake * 0.9)}
            />
          </mesh>
          {/* Stand stem & foot */}
          <mesh position={[0, -0.16, -0.04]}>
            <cylinderGeometry args={[0.018, 0.018, 0.16, 12]} />
            <meshStandardMaterial color="#1a1c22" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.23, 0]}>
            <boxGeometry args={[0.22, 0.015, 0.16]} />
            <meshStandardMaterial color="#1a1c22" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Secondary Angled Portrait Display */}
        <group position={[0.34, 0.24, -0.15]} rotation={[0, -0.28, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.26, 0.42, 0.02]} />
            <meshStandardMaterial color="#16181d" metalness={0.6} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.011]}>
            <planeGeometry args={[0.24, 0.39]} />
            <meshBasicMaterial
              color="#0d1117"
            />
          </mesh>
          <mesh position={[0, -0.18, -0.03]}>
            <cylinderGeometry args={[0.014, 0.014, 0.14, 12]} />
            <meshStandardMaterial color="#1a1c22" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Physical 3D Printed Cured Resin Architectural Maquette on Wooden Block */}
        <group position={[-0.38, 0.06, 0.12]}>
          <mesh>
            <boxGeometry args={[0.18, 0.08, 0.18]} />
            <meshStandardMaterial color="#3b2d20" roughness={0.7} />
          </mesh>
          {/* Translucent resin geometric structural model */}
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.06, 0.09, 0.16, 6]} />
            <meshPhysicalMaterial
              transparent
              opacity={0.85}
              roughness={0.2}
              transmission={0.65}
              ior={1.48}
              color="#d2e3f5"
            />
          </mesh>
        </group>

        {/* Mechanical Ortholinear Keyboard & Mouse */}
        <group position={[0, 0.015, 0.18]}>
          <mesh castShadow>
            <boxGeometry args={[0.34, 0.02, 0.13]} />
            <meshStandardMaterial color="#1a1a1d" metalness={0.6} roughness={0.4} />
          </mesh>
          <mesh position={[0.24, 0, 0.02]}>
            <boxGeometry args={[0.07, 0.025, 0.11]} />
            <meshStandardMaterial color="#202227" roughness={0.5} />
          </mesh>
        </group>

        {/* Studio Monitor Headphones resting on desk */}
        <group position={[0.38, 0.04, 0.22]} rotation={[0, 0.6, 0]}>
          <mesh>
            <torusGeometry args={[0.08, 0.015, 12, 24, Math.PI]} />
            <meshStandardMaterial color="#111" roughness={0.6} />
          </mesh>
          <mesh position={[-0.08, 0, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.025, 16]} />
            <meshStandardMaterial color="#1b1c20" roughness={0.8} />
          </mesh>
          <mesh position={[0.08, 0, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.025, 16]} />
            <meshStandardMaterial color="#1b1c20" roughness={0.8} />
          </mesh>
        </group>
      </group>

      {/* =========================================================================
          WORKSTATION 3: SORA TAKAHASHI — Creative Technologist & Systems Lead
          Position: x = 0.1, z = -0.7, y = 0.77
          ========================================================================= */}
      <group
        position={[0.1, 0.77, -0.7]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectMember(TEAM_MEMBERS[2]);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredMemberId('sora');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredMemberId(null);
          document.body.style.cursor = 'default';
        }}
      >
        {hoveredMemberId === 'sora' && (
          <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.0, 0.9]} />
            <meshBasicMaterial color="#ffeedd" transparent opacity={0.06} />
          </mesh>
        )}

        {/* Curved Ultrawide Display Running Live GLSL Shaders */}
        <group position={[0, 0.25, -0.2]}>
          <mesh castShadow>
            <boxGeometry args={[0.78, 0.36, 0.02]} />
            <meshStandardMaterial color="#15171b" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Screen Content: GLSL Code Syntax & Terminal */}
          <mesh position={[0, 0, 0.011]}>
            <planeGeometry args={[0.75, 0.33]} />
            <meshBasicMaterial
              map={codeTexture}
              color={new THREE.Color('#ffffff').multiplyScalar(0.4 + monitorsAwake * 0.95)}
            />
          </mesh>
          {/* Heavy aluminum stand */}
          <mesh position={[0, -0.16, -0.04]}>
            <cylinderGeometry args={[0.02, 0.02, 0.18, 16]} />
            <meshStandardMaterial color="#1b1d22" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.24, 0]}>
            <boxGeometry args={[0.26, 0.015, 0.16]} />
            <meshStandardMaterial color="#1b1d22" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Sensor Breadboard with Braided Cables & Status LED */}
        <group position={[-0.34, 0.02, 0.15]} rotation={[0, 0.15, 0]}>
          <mesh>
            <boxGeometry args={[0.16, 0.015, 0.09]} />
            <meshStandardMaterial color="#e5e5e5" roughness={0.6} />
          </mesh>
          {/* Braided micro-cables */}
          <mesh position={[0.05, 0.015, 0]}>
            <boxGeometry args={[0.06, 0.01, 0.04]} />
            <meshStandardMaterial color="#222" roughness={0.4} />
          </mesh>
          {/* Realistic subtle blinking status LED (not a giant sci-fi flare) */}
          <mesh position={[-0.05, 0.012, 0.02]}>
            <sphereGeometry args={[0.004, 8, 8]} />
            <meshBasicMaterial color="#34d399" />
          </mesh>
        </group>

        {/* Anodized Matte Black Laptop */}
        <group position={[0.32, 0.02, 0.12]} rotation={[0, -0.2, 0]}>
          <mesh>
            <boxGeometry args={[0.28, 0.014, 0.19]} />
            <meshStandardMaterial color="#16171b" metalness={0.8} roughness={0.25} />
          </mesh>
          {/* Open lid at 105 degrees */}
          <group position={[0, 0.007, -0.095]} rotation={[-0.3, 0, 0]}>
            <mesh position={[0, 0.09, 0]}>
              <boxGeometry args={[0.28, 0.18, 0.008]} />
              <meshStandardMaterial color="#16171b" metalness={0.8} roughness={0.25} />
            </mesh>
            <mesh position={[0, 0.09, 0.005]}>
              <planeGeometry args={[0.26, 0.16]} />
              <meshBasicMaterial color="#0c1017" />
            </mesh>
          </group>
        </group>

        {/* Grid-ruled Notebook with Calculations */}
        <mesh position={[0, 0.012, 0.22]} rotation={[0, 0.08, 0]}>
          <boxGeometry args={[0.22, 0.015, 0.16]} />
          <meshStandardMaterial color="#ece7dc" roughness={0.8} />
        </mesh>
      </group>

      {/* =========================================================================
          WORKSTATION 4: MAYA LINDQVIST — Cinematographer & Motion Director
          Position: x = 1.2, z = -0.7, y = 0.77
          ========================================================================= */}
      <group
        position={[1.2, 0.77, -0.7]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectMember(TEAM_MEMBERS[3]);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredMemberId('maya');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredMemberId(null);
          document.body.style.cursor = 'default';
        }}
      >
        {hoveredMemberId === 'maya' && (
          <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.0, 0.9]} />
            <meshBasicMaterial color="#ffeedd" transparent opacity={0.06} />
          </mesh>
        )}

        {/* High-CRI Reference Grading Monitor with Video Timeline */}
        <group position={[-0.05, 0.24, -0.2]}>
          {/* Display bezel with anti-glare hood */}
          <mesh castShadow>
            <boxGeometry args={[0.62, 0.38, 0.02]} />
            <meshStandardMaterial color="#141518" metalness={0.6} roughness={0.3} />
          </mesh>
          {/* Shading hood sides */}
          <mesh position={[-0.31, 0, 0.06]}>
            <boxGeometry args={[0.01, 0.38, 0.12]} />
            <meshStandardMaterial color="#111" roughness={0.7} />
          </mesh>
          <mesh position={[0.31, 0, 0.06]}>
            <boxGeometry args={[0.01, 0.38, 0.12]} />
            <meshStandardMaterial color="#111" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.19, 0.06]}>
            <boxGeometry args={[0.62, 0.01, 0.12]} />
            <meshStandardMaterial color="#111" roughness={0.7} />
          </mesh>

          {/* Screen Content: DaVinci Resolve Timeline */}
          <mesh position={[0, 0, 0.011]}>
            <planeGeometry args={[0.59, 0.35]} />
            <meshBasicMaterial
              map={motionTexture}
              color={new THREE.Color('#ffffff').multiplyScalar(0.4 + monitorsAwake * 0.95)}
            />
          </mesh>
          <mesh position={[0, -0.16, -0.04]}>
            <cylinderGeometry args={[0.018, 0.018, 0.16, 12]} />
            <meshStandardMaterial color="#1a1c22" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Cooke Cinema Prime Lens Cylinder on Turned Walnut Base */}
        <group position={[-0.36, 0.05, 0.14]}>
          <mesh>
            <cylinderGeometry args={[0.05, 0.055, 0.03, 20]} />
            <meshStandardMaterial color="#3d2c1f" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.06, 0]}>
            <cylinderGeometry args={[0.038, 0.038, 0.09, 24]} />
            <meshStandardMaterial color="#18191c" metalness={0.88} roughness={0.2} />
          </mesh>
          {/* Glass front element */}
          <mesh position={[0, 0.106, 0]}>
            <cylinderGeometry args={[0.034, 0.034, 0.005, 20]} />
            <meshPhysicalMaterial
              roughness={0.05}
              transmission={0.9}
              ior={1.62}
              color="#a5c4e8"
            />
          </mesh>
        </group>

        {/* Sekonic Incident Light Meter */}
        <group position={[0.36, 0.025, 0.05]} rotation={[0, -0.3, 0]}>
          <mesh>
            <boxGeometry args={[0.07, 0.022, 0.13]} />
            <meshStandardMaterial color="#22252a" roughness={0.5} />
          </mesh>
          {/* White Lumisphere hemisphere */}
          <mesh position={[0, 0.016, -0.05]}>
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.4} />
          </mesh>
        </group>

        {/* 35mm Film Strips & Contact Sheets */}
        <mesh position={[0.05, 0.012, 0.2]} rotation={[0, -0.05, 0]}>
          <planeGeometry args={[0.28, 0.18]} />
          <meshStandardMaterial color="#202226" roughness={0.7} />
        </mesh>
      </group>

      {/* =========================================================================
          WORKSTATION 5: JULIAN THORNE — Material Researcher & Strategist
          Position: x = 2.3, z = -0.7, y = 0.77
          ========================================================================= */}
      <group
        position={[2.3, 0.77, -0.7]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectMember(TEAM_MEMBERS[4]);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredMemberId('julian');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredMemberId(null);
          document.body.style.cursor = 'default';
        }}
      >
        {hoveredMemberId === 'julian' && (
          <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.0, 0.9]} />
            <meshBasicMaterial color="#ffeedd" transparent opacity={0.06} />
          </mesh>
        )}

        {/* Solid Brass Material Sample Tray with Genuine Tactile Tiles */}
        <group position={[-0.05, 0.02, -0.05]}>
          {/* Brushed Brass Tray Lip */}
          <mesh castShadow>
            <boxGeometry args={[0.54, 0.02, 0.38]} />
            <meshStandardMaterial color="#c29b5c" metalness={0.85} roughness={0.3} />
          </mesh>

          {/* Sample 1: Honed White Carrara Marble Tile */}
          <mesh position={[-0.16, 0.018, -0.08]}>
            <boxGeometry args={[0.14, 0.02, 0.14]} />
            <meshStandardMaterial color="#edeae3" roughness={0.25} metalness={0.05} />
          </mesh>

          {/* Sample 2: Scorched Black Yakisugi Cedar Wood */}
          <mesh position={[0.02, 0.018, -0.08]}>
            <boxGeometry args={[0.14, 0.02, 0.14]} />
            <meshStandardMaterial color="#1a1816" roughness={0.85} metalness={0.05} />
          </mesh>

          {/* Sample 3: Oxidized Patinated Brass Ingot */}
          <mesh position={[0.18, 0.018, -0.08]}>
            <boxGeometry args={[0.12, 0.025, 0.12]} />
            <meshStandardMaterial color="#7a876a" roughness={0.4} metalness={0.7} />
          </mesh>

          {/* Sample 4: Natural Rammed Terracotta Brick */}
          <mesh position={[-0.14, 0.018, 0.08]}>
            <boxGeometry args={[0.16, 0.02, 0.12]} />
            <meshStandardMaterial color="#94523b" roughness={0.9} />
          </mesh>

          {/* Sample 5: Ribbed Acoustic Wool Felt Swatch */}
          <mesh position={[0.08, 0.018, 0.08]}>
            <boxGeometry args={[0.18, 0.02, 0.12]} />
            <meshStandardMaterial color="#4d535e" roughness={0.95} />
          </mesh>
        </group>

        {/* Open Hardcover Architecture Monograph */}
        <group position={[0.05, 0.02, 0.22]} rotation={[0, -0.1, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.42, 0.025, 0.28]} />
            <meshStandardMaterial color="#2d2a26" roughness={0.6} />
          </mesh>
          {/* Open Paper Pages */}
          <mesh position={[0, 0.014, 0]}>
            <boxGeometry args={[0.39, 0.01, 0.25]} />
            <meshStandardMaterial color="#f2eee6" roughness={0.8} />
          </mesh>
        </group>

        {/* Architect's Cast Bronze Precision Ruler */}
        <mesh position={[-0.38, 0.015, 0.18]} rotation={[0, 0.35, 0]}>
          <boxGeometry args={[0.025, 0.005, 0.32]} />
          <meshStandardMaterial color="#b38a4d" metalness={0.85} roughness={0.25} />
        </mesh>
      </group>
    </group>
  );
}
