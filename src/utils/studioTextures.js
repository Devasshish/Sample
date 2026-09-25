import * as THREE from 'three';

// Cache canvas textures so they are generated only once
const textureCache = new Map();

/**
 * Creates a realistic architectural floorplan / sketch on tracing paper texture
 */
export function getDraftingSketchTexture() {
  if (textureCache.has('drafting_sketch')) {
    return textureCache.get('drafting_sketch');
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Warm translucent tracing paper background
  ctx.fillStyle = '#f7f4ed';
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle paper grain / fiber noise
  ctx.fillStyle = 'rgba(0, 0, 0, 0.015)';
  for (let i = 0; i < 5000; i++) {
    const rx = Math.random() * 1024;
    const ry = Math.random() * 1024;
    ctx.fillRect(rx, ry, 1, 1);
  }

  // Pale drafting grid lines
  ctx.strokeStyle = 'rgba(180, 170, 150, 0.25)';
  ctx.lineWidth = 1;
  const gridStep = 32;
  for (let x = 0; x <= 1024; x += gridStep) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1024);
    ctx.stroke();
  }
  for (let y = 0; y <= 1024; y += gridStep) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  // Charcoal & ink architectural floorplan drawings
  ctx.strokeStyle = '#2c2d30';
  ctx.lineWidth = 2.5;

  // Outer structural walls
  ctx.strokeRect(160, 160, 704, 704);
  ctx.strokeRect(180, 180, 664, 664);

  // Interior structural columns & partitions
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(180, 480);
  ctx.lineTo(520, 480);
  ctx.moveTo(600, 480);
  ctx.lineTo(844, 480);
  ctx.moveTo(520, 180);
  ctx.lineTo(520, 640);
  ctx.stroke();

  // Dimension lines & architectural markers
  ctx.strokeStyle = '#7c766b';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(360, 320, 120, 0, Math.PI * 1.5);
  ctx.stroke();

  // Dimension ticks
  ctx.font = '14px monospace';
  ctx.fillStyle = '#655e54';
  ctx.fillText('AXIS A-01 // R=12.4m', 200, 240);
  ctx.fillText('PAVILION STRATA SECTION B-B', 200, 740);
  ctx.fillText('SCALE 1:50 — REVISED 02:40 AM', 200, 770);

  // Handwritten notes style
  ctx.font = 'italic 18px serif';
  ctx.fillStyle = '#4a443a';
  ctx.fillText('"Light filters through the cedar lattice at 32°"', 220, 520);
  ctx.fillText('"Check structural deflection at joint 04"', 540, 360);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  textureCache.set('drafting_sketch', texture);
  return texture;
}

/**
 * Creates a realistic 3D CAD / Wireframe screen texture for Marcus Vance's monitors
 */
export function getCadScreenTexture() {
  if (textureCache.has('cad_screen')) {
    return textureCache.get('cad_screen');
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  // Dark slate CAD viewport background
  ctx.fillStyle = '#111317';
  ctx.fillRect(0, 0, 1024, 640);

  // Subtle CAD viewport grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= 1024; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 640);
    ctx.stroke();
  }
  for (let y = 0; y <= 640; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  // Top CAD toolbar
  ctx.fillStyle = '#181b22';
  ctx.fillRect(0, 0, 1024, 42);
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.fillStyle = '#8e96a5';
  ctx.fillText('RHINO 8 / GRASSHOPPER — PAVILION_V7_TIMBER_STRATA.3DM [SHADED WIREFRAME]', 16, 26);

  // Draw 3D wireframe parametric structure
  ctx.strokeStyle = '#60a5fa';
  ctx.lineWidth = 1.4;

  const cx = 512;
  const cy = 340;
  for (let r = 50; r <= 220; r += 24) {
    ctx.beginPath();
    for (let theta = 0; theta <= Math.PI * 2; theta += 0.1) {
      const zOffset = Math.sin(theta * 3 + r * 0.05) * 35;
      const px = cx + Math.cos(theta) * r;
      const py = cy + Math.sin(theta) * (r * 0.55) - zOffset;
      if (theta === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
  }

  // Radial ribs
  ctx.strokeStyle = '#93c5fd';
  ctx.lineWidth = 0.8;
  for (let theta = 0; theta < Math.PI * 2; theta += Math.PI / 8) {
    ctx.beginPath();
    for (let r = 50; r <= 220; r += 10) {
      const zOffset = Math.sin(theta * 3 + r * 0.05) * 35;
      const px = cx + Math.cos(theta) * r;
      const py = cy + Math.sin(theta) * (r * 0.55) - zOffset;
      if (r === 50) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }

  // Wireframe vertices
  ctx.fillStyle = '#e2e8f0';
  for (let theta = 0; theta < Math.PI * 2; theta += Math.PI / 6) {
    for (let r = 98; r <= 220; r += 48) {
      const zOffset = Math.sin(theta * 3 + r * 0.05) * 35;
      const px = cx + Math.cos(theta) * r;
      const py = cy + Math.sin(theta) * (r * 0.55) - zOffset;
      ctx.fillRect(px - 2, py - 2, 4, 4);
    }
  }

  // Status bottom bar
  ctx.fillStyle = '#181b22';
  ctx.fillRect(0, 608, 1024, 32);
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('VERTICES: 18,420 | POLYS: 36,840 | TOLERANCE: 0.001mm | VIEW: PERSPECTIVE CAMERA 50MM', 16, 628);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  textureCache.set('cad_screen', texture);
  return texture;
}

/**
 * Creates a realistic code / GLSL shader screen texture for Sora Takahashi's display
 */
export function getCodeScreenTexture() {
  if (textureCache.has('code_screen')) {
    return textureCache.get('code_screen');
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  // VS Code dark theme
  ctx.fillStyle = '#0f1115';
  ctx.fillRect(0, 0, 1024, 640);

  // Tab bar
  ctx.fillStyle = '#161920';
  ctx.fillRect(0, 0, 1024, 38);
  ctx.fillStyle = '#222733';
  ctx.fillRect(0, 0, 220, 38);
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.fillStyle = '#e2e8f0';
  ctx.fillText('celestial_aperture.glsl', 24, 24);

  // Line numbers and code
  const codeLines = [
    { num: '01', text: '// Real-time daylight calculation across timber strata', color: '#64748b' },
    { num: '02', text: '#ifdef GL_ES', color: '#f43f5e' },
    { num: '03', text: 'precision highp float;', color: '#f59e0b' },
    { num: '04', text: '#endif', color: '#f43f5e' },
    { num: '05', text: '', color: '#fff' },
    { num: '06', text: 'uniform vec3 uSunDirection;', color: '#38bdf8' },
    { num: '07', text: 'uniform float uAtmosphericFog;', color: '#38bdf8' },
    { num: '08', text: 'varying vec3 vNormal;', color: '#38bdf8' },
    { num: '09', text: 'varying vec3 vWorldPosition;', color: '#38bdf8' },
    { num: '10', text: '', color: '#fff' },
    { num: '11', text: 'vec3 computeDappledShadow(vec3 p, vec3 sun) {', color: '#c084fc' },
    { num: '12', text: '    float canopyDensity = sin(p.x * 4.2) * cos(p.z * 4.2);', color: '#e2e8f0' },
    { num: '13', text: '    float solarAtten = max(dot(vNormal, normalize(sun)), 0.0);', color: '#e2e8f0' },
    { num: '14', text: '    vec3 warmDawn = vec3(1.02, 0.88, 0.72) * solarAtten;', color: '#4ade80' },
    { num: '15', text: '    vec3 coolSky = vec3(0.38, 0.46, 0.58) * (vNormal.y * 0.5 + 0.5);', color: '#4ade80' },
    { num: '16', text: '    return mix(coolSky, warmDawn, canopyDensity * 0.5 + 0.5);', color: '#f43f5e' },
    { num: '17', text: '}', color: '#c084fc' },
    { num: '18', text: '', color: '#fff' },
    { num: '19', text: 'void main() {', color: '#c084fc' },
    { num: '20', text: '    vec3 light = computeDappledShadow(vWorldPosition, uSunDirection);', color: '#e2e8f0' },
    { num: '21', text: '    gl_FragColor = vec4(light, 1.0);', color: '#f59e0b' },
    { num: '22', text: '}', color: '#c084fc' }
  ];

  ctx.font = '13px "JetBrains Mono", monospace';
  codeLines.forEach((line, idx) => {
    const y = 68 + idx * 24;
    // Line number
    ctx.fillStyle = '#475569';
    ctx.fillText(line.num, 16, y);
    // Line text
    ctx.fillStyle = line.color;
    ctx.fillText(line.text, 56, y);
  });

  // Small terminal at bottom
  ctx.fillStyle = '#0a0b0d';
  ctx.fillRect(0, 530, 1024, 110);
  ctx.fillStyle = '#34d399';
  ctx.fillText('TERMINAL [zsh] ~ /studio/systems: shader compiled successfully in 12ms. Zero warnings.', 16, 560);
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Listening to hardware serial port /dev/tty.usbmodem101 [Baud 115200] — Status: LIVE', 16, 584);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  textureCache.set('code_screen', texture);
  return texture;
}

/**
 * Creates a video grading / timeline screen texture for Maya Lindqvist's monitor
 */
export function getMotionScreenTexture() {
  if (textureCache.has('motion_screen')) {
    return textureCache.get('motion_screen');
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  // Video editor interface (DaVinci Resolve style)
  ctx.fillStyle = '#14161a';
  ctx.fillRect(0, 0, 1024, 640);

  // Viewport container
  ctx.fillStyle = '#08090a';
  ctx.fillRect(40, 36, 680, 420);

  // Cinematic frame in viewer: warm architectural morning light across concrete
  const grad = ctx.createLinearGradient(40, 36, 720, 456);
  grad.addColorStop(0, '#1c2230');
  grad.addColorStop(0.4, '#384357');
  grad.addColorStop(0.7, '#8f7b64');
  grad.addColorStop(1, '#ffc78a');
  ctx.fillStyle = grad;
  ctx.fillRect(50, 46, 660, 400);

  // Cinematic 2.39:1 crop bars
  ctx.fillStyle = '#000000';
  ctx.fillRect(50, 46, 660, 45);
  ctx.fillRect(50, 401, 660, 45);

  // Scopes on right side
  ctx.fillStyle = '#1a1d24';
  ctx.fillRect(740, 36, 260, 420);
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('RGB PARADE / WAVEFORM (CIE 1931)', 754, 58);

  // Waveform graph
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.strokeRect(754, 70, 230, 140);
  ctx.strokeStyle = '#ef4444';
  ctx.beginPath();
  for (let x = 754; x <= 984; x += 6) {
    const y = 140 + Math.sin(x * 0.1) * 30 + Math.random() * 8;
    if (x === 754) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  ctx.strokeStyle = '#10b981';
  ctx.beginPath();
  for (let x = 754; x <= 984; x += 6) {
    const y = 150 + Math.cos(x * 0.1) * 28 + Math.random() * 8;
    if (x === 754) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Timeline at bottom
  ctx.fillStyle = '#181b21';
  ctx.fillRect(0, 470, 1024, 170);
  ctx.fillStyle = '#818cf8';
  ctx.fillRect(240, 490, 420, 28);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(120, 526, 640, 24);
  ctx.fillStyle = '#34d399';
  ctx.fillRect(180, 558, 520, 24);

  // Playhead line
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(380, 470);
  ctx.lineTo(380, 640);
  ctx.stroke();

  // Timecode
  ctx.font = '15px "JetBrains Mono", monospace';
  ctx.fillStyle = '#e2e8f0';
  ctx.fillText('TC: 01:14:28:16 | 24.000 FPS | ARRI ALEXA MINI LF (ARRIRAW)', 40, 24);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  textureCache.set('motion_screen', texture);
  return texture;
}

/**
 * Creates high-detail procedural concrete floor texture with subtle expansion joints and roughness
 */
export function getConcreteTexture() {
  if (textureCache.has('concrete_diffuse')) {
    return textureCache.get('concrete_diffuse');
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Base polished architectural concrete
  ctx.fillStyle = '#22252c';
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle aggregate / speckle variations
  for (let i = 0; i < 20000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const size = Math.random() * 2.5 + 0.5;
    const brightness = Math.random() * 24 - 12;
    ctx.fillStyle = `rgba(${38 + brightness}, ${42 + brightness}, ${50 + brightness}, 0.6)`;
    ctx.fillRect(x, y, size, size);
  }

  // Soft cloudy concrete pour tonal variations
  for (let i = 0; i < 20; i++) {
    const cx = Math.random() * 1024;
    const cy = Math.random() * 1024;
    const rad = Math.random() * 200 + 80;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
    const alpha = Math.random() * 0.04 + 0.01;
    grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, rad, 0, Math.PI * 2);
    ctx.fill();
  }

  // Clean architectural expansion joint lines
  ctx.strokeStyle = '#15171c';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(512, 0);
  ctx.lineTo(512, 1024);
  ctx.moveTo(0, 512);
  ctx.lineTo(1024, 512);
  ctx.stroke();

  // Subtle bevel highlight beside the joints
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(514, 0);
  ctx.lineTo(514, 1024);
  ctx.moveTo(0, 514);
  ctx.lineTo(1024, 514);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.anisotropy = 4;
  textureCache.set('concrete_diffuse', texture);
  return texture;
}

/**
 * Creates natural smoked oak wood grain texture for studio tables
 */
export function getSmokedOakTexture() {
  if (textureCache.has('smoked_oak')) {
    return textureCache.get('smoked_oak');
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Rich warm dark oak base
  ctx.fillStyle = '#4a3b2c';
  ctx.fillRect(0, 0, 1024, 512);

  // Wood grain horizontal striations
  for (let y = 0; y < 512; y += 2) {
    const variation = Math.sin(y * 0.08) * 12 + (Math.random() * 8 - 4);
    const alpha = Math.random() * 0.15 + 0.05;
    ctx.fillStyle = `rgba(${25 + variation}, ${18 + variation}, ${12 + variation}, ${alpha})`;
    ctx.fillRect(0, y, 1024, 2);
  }

  // Medullary rays & wood pores
  for (let i = 0; i < 3000; i++) {
    const rx = Math.random() * 1024;
    const ry = Math.random() * 512;
    const len = Math.random() * 40 + 10;
    ctx.fillStyle = 'rgba(20, 14, 9, 0.18)';
    ctx.fillRect(rx, ry, len, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 1);
  textureCache.set('smoked_oak', texture);
  return texture;
}
