import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getConcreteTexture, getSmokedOakTexture } from '../../utils/studioTextures';

export function StudioArchitecture({ progress = 0 }) {
  const concreteTexture = useMemo(() => getConcreteTexture(), []);
  const oakTexture = useMemo(() => getSmokedOakTexture(), []);

  // Dawn transition factor (Scene 7: 0.85 -> 1.0)
  const dawnFactor = Math.max(0, Math.min(1, (progress - 0.75) / 0.25));

  // Horizon exterior sky color interpolation: midnight navy -> dawn periwinkle/gold
  const horizonSkyColor = useMemo(() => {
    const night = new THREE.Color('#07090f');
    const dawn = new THREE.Color('#8ea0b8');
    return night.clone().lerp(dawn, dawnFactor);
  }, [dawnFactor]);

  return (
    <group name="StudioArchitecture">
      {/* 1. POLISHED ARCHITECTURAL CONCRETE FLOOR */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[26, 26]} />
        <meshStandardMaterial
          map={concreteTexture}
          roughness={0.42}
          metalness={0.15}
          color="#2a2e36"
        />
      </mesh>

      {/* 2. BOARD-FORMED CONCRETE BACK WALL (z = -4.2) */}
      <group position={[0, 2.2, -4.2]}>
        <mesh receiveShadow>
          <boxGeometry args={[18, 4.4, 0.4]} />
          <meshStandardMaterial
            color="#22252c"
            roughness={0.7}
            metalness={0.08}
          />
        </mesh>

        {/* Board-formed horizontal concrete seam reveals */}
        {[-1.4, -0.6, 0.2, 1.0, 1.8].map((y, i) => (
          <mesh key={i} position={[0, y, 0.21]}>
            <boxGeometry args={[18, 0.015, 0.02]} />
            <meshBasicMaterial color="#111317" />
          </mesh>
        ))}

        {/* Studio Name Architectural Deboss / Metal Signage */}
        <group position={[-2.8, 1.4, 0.22]}>
          <mesh>
            <planeGeometry args={[2.4, 0.4]} />
            <meshBasicMaterial color="#1c1f26" />
          </mesh>
        </group>
      </group>

      {/* 3. CONCRETE LEFT WALL & ENTRANCE VESTIBULE (x = -4.6) */}
      <group position={[-4.6, 2.2, 0]}>
        <mesh receiveShadow>
          <boxGeometry args={[0.4, 4.4, 18]} />
          <meshStandardMaterial
            color="#1e2127"
            roughness={0.75}
            metalness={0.05}
          />
        </mesh>
      </group>

      {/* 4. INDUSTRIAL MULTI-PANE STEEL & GLASS WINDOW WALL (x = +4.4) */}
      {/* Faces East towards morning dawn */}
      <group position={[4.4, 2.2, 1.0]}>
        {/* Exterior sky backdrop plane beyond the glass */}
        <mesh position={[2.5, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[22, 9]} />
          <meshBasicMaterial color={horizonSkyColor} />
        </mesh>

        {/* Distant city building silhouettes */}
        <group position={[2.4, -0.8, 0]} rotation={[0, -Math.PI / 2, 0]}>
          {[-7, -4.5, -2, 0.5, 3, 5.5, 8].map((bx, idx) => {
            const bWidth = 1.6 + (idx % 3) * 0.4;
            const bHeight = 2.2 + (idx % 4) * 0.7;
            return (
              <mesh key={idx} position={[bx, bHeight / 2 - 1.2, 0]}>
                <planeGeometry args={[bWidth, bHeight]} />
                <meshBasicMaterial color="#0c0e14" />
              </mesh>
            );
          })}
        </group>

        {/* Blackened Steel Outer Frame */}
        <mesh>
          <boxGeometry args={[0.1, 4.4, 14]} />
          <meshStandardMaterial
            color="#111317"
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>

        {/* Translucent Glass Panes with subtle reflection */}
        <mesh position={[-0.02, 0, 0]}>
          <planeGeometry args={[13.8, 4.2]} />
          <meshPhysicalMaterial
            transparent
            opacity={0.32}
            roughness={0.1}
            transmission={0.85}
            thickness={0.04}
            ior={1.5}
            color="#d8e8f8"
          />
        </mesh>

        {/* Steel Mullions (Vertical Grid) */}
        {[-5.6, -3.8, -2.0, -0.2, 1.6, 3.4, 5.2].map((z, i) => (
          <mesh key={`v-mullion-${i}`} position={[0, 0, z]}>
            <boxGeometry args={[0.16, 4.4, 0.08]} />
            <meshStandardMaterial color="#181a20" roughness={0.3} metalness={0.8} />
          </mesh>
        ))}

        {/* Steel Transoms (Horizontal Grid) */}
        {[-1.2, 0.0, 1.2].map((y, i) => (
          <mesh key={`h-mullion-${i}`} position={[0, y, 0]}>
            <boxGeometry args={[0.14, 0.08, 14]} />
            <meshStandardMaterial color="#181a20" roughness={0.3} metalness={0.8} />
          </mesh>
        ))}
      </group>

      {/* 5. CEILING & STRUCTURAL TIMBER BEAMS (y = 4.4) */}
      <group position={[0, 4.4, 0]}>
        {/* Concrete ceiling slab */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[26, 26]} />
          <meshStandardMaterial color="#181a21" roughness={0.9} />
        </mesh>

        {/* Dark Oak Horizontal Beams */}
        {[-3.2, -1.2, 0.8, 2.8, 4.8].map((z, i) => (
          <mesh key={`beam-${i}`} position={[0, -0.25, z]}>
            <boxGeometry args={[9.0, 0.45, 0.28]} />
            <meshStandardMaterial
              map={oakTexture}
              color="#3a2e22"
              roughness={0.65}
            />
          </mesh>
        ))}

        {/* Minimalist Matte Black Architectural Lighting Tracks */}
        {[-1.6, 1.4].map((x, i) => (
          <group key={`track-${i}`} position={[x, -0.5, 0]}>
            <mesh>
              <boxGeometry args={[0.06, 0.06, 10]} />
              <meshStandardMaterial color="#121316" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Suspended spot cylinder heads */}
            {[-3.6, -1.8, 0, 1.8, 3.6].map((spotZ, idx) => (
              <mesh key={`spot-${idx}`} position={[0, -0.08, spotZ]} rotation={[0.2, 0, 0]}>
                <cylinderGeometry args={[0.035, 0.045, 0.12, 16]} />
                <meshStandardMaterial color="#1a1c22" metalness={0.9} roughness={0.2} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* 6. REAR ARCHITECTURAL BOOKCASE & MATERIAL ARCHIVE (Along Back Wall) */}
      <group position={[-2.4, 1.4, -3.9]}>
        {/* Steel frame uprights */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.6, 2.8, 0.4]} />
          <meshStandardMaterial color="#1c1e24" roughness={0.4} metalness={0.6} />
        </mesh>
        {/* Shelves */}
        {[-1.0, -0.3, 0.4, 1.1].map((sy, idx) => (
          <group key={`shelf-${idx}`} position={[0, sy, 0.05]}>
            <mesh>
              <boxGeometry args={[3.5, 0.04, 0.38]} />
              <meshStandardMaterial color="#35291f" roughness={0.6} />
            </mesh>

            {/* Architectural Study Models & Books on Shelves */}
            {idx === 0 && (
              // Hardcover design monographs
              <group position={[-1.2, 0.16, 0]}>
                {[-0.2, -0.12, -0.04, 0.05, 0.14, 0.22].map((bx, bi) => (
                  <mesh key={bi} position={[bx, 0, 0]}>
                    <boxGeometry args={[0.06, 0.28, 0.24]} />
                    <meshStandardMaterial
                      color={['#e8e4da', '#222', '#6b4e31', '#404552', '#dcd8cf', '#1a1a1a'][bi]}
                      roughness={0.7}
                    />
                  </mesh>
                ))}
              </group>
            )}

            {idx === 1 && (
              // White plaster architectural massing block
              <group position={[0.6, 0.18, 0]}>
                <mesh>
                  <boxGeometry args={[0.42, 0.32, 0.24]} />
                  <meshStandardMaterial color="#ece9e2" roughness={0.85} />
                </mesh>
                <mesh position={[0.18, 0.08, 0]}>
                  <boxGeometry args={[0.22, 0.22, 0.22]} />
                  <meshStandardMaterial color="#ddd9ce" roughness={0.85} />
                </mesh>
              </group>
            )}

            {idx === 2 && (
              // Rolled architectural blueprint tubes
              <group position={[-0.8, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
                {[-0.06, 0, 0.06].map((tx, ti) => (
                  <mesh key={ti} position={[tx, 0, 0]}>
                    <cylinderGeometry args={[0.04, 0.04, 0.6, 16]} />
                    <meshStandardMaterial color="#e5dfd3" roughness={0.7} />
                  </mesh>
                ))}
              </group>
            )}

            {idx === 3 && (
              // Potted studio plant (matte ceramic cylinder with green leaves)
              <group position={[1.1, 0.18, 0]}>
                <mesh>
                  <cylinderGeometry args={[0.12, 0.09, 0.22, 20]} />
                  <meshStandardMaterial color="#2d2b27" roughness={0.7} />
                </mesh>
                {/* Minimalist sculptural plant leaves */}
                {[0, 1.2, 2.4, 3.6, 4.8].map((angle, li) => (
                  <mesh
                    key={li}
                    position={[Math.cos(angle) * 0.08, 0.18, Math.sin(angle) * 0.08]}
                    rotation={[0.3, angle, 0.4]}
                  >
                    <boxGeometry args={[0.08, 0.22, 0.005]} />
                    <meshStandardMaterial color="#2d4233" roughness={0.5} />
                  </mesh>
                ))}
              </group>
            )}
          </group>
        ))}
      </group>

      {/* 7. STUDIO ENTRANCE VESTIBULE CORRIDOR (Seen in Scene 01 ARRIVAL) */}
      <group position={[-2.8, 1.5, 6.2]}>
        {/* Glass doorway frame */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.8, 3.0, 0.1]} />
          <meshPhysicalMaterial
            transparent
            opacity={0.25}
            roughness={0.1}
            transmission={0.9}
            color="#e2e8f0"
          />
        </mesh>
        {/* Brushed Stainless Steel Door Pull */}
        <mesh position={[0.7, 0, 0.08]}>
          <cylinderGeometry args={[0.02, 0.02, 0.8, 16]} />
          <meshStandardMaterial color="#b8c0cc" metalness={0.95} roughness={0.18} />
        </mesh>
        {/* Small warm brass entry light fixture above door */}
        <mesh position={[0, 1.6, 0.12]}>
          <boxGeometry args={[0.2, 0.06, 0.12]} />
          <meshStandardMaterial color="#c29b74" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}
