# ATELIER STRATA
> **The Living Cartography of Latent Forms**  
> An immersive, scroll-driven 3D digital experience exploring computational mineralogy, tactile topologies, and the architectural collective of Atelier Strata.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Stack: React + Three.js + R3F + Vite](https://img.shields.io/badge/Stack-React%20%7C%20Three.js%20%7C%20R3F%20%7C%20Vite-orange.svg)](https://vitejs.dev/)

---

## 🌟 Creative Concept & Narrative

**Atelier Strata** is a fictional creative collective operating at the nexus of computational geology, spatial poetics, and architectural kinetics. 

Rejecting the cold, generic cybernetic tropes of digital portfolios, the 3D world exists as a **subterranean and atmospheric geological continuum**. Here, algorithmic ideas take on physical substance—crystallizing into monolithic mineral monuments, resonant acoustic chambers, bio-cellular pavilions, and heliotropic spatial instruments.

The entire experience is organized as a single continuous cinematic journey where scrolling directly orchestrates the spatial camera choreography, lighting transformations, and story unfoldment.

---

## 🗺️ The Six Chapter Sequence

| Scene | Chapter Code | Title | Spatial & Narrative Event |
|---|---|---|---|
| **01** | `INIT.00` | **THE AWAKENING** | Emergence before the Primordial Monolith suspended above deep undulating topological mist. Atmospheric dust drifts through the camera path. |
| **02** | `STRATA.01` | **THE TECTONIC FORGE** | The camera descends into the subterranean canyon. The core unfolds into nested titanium astrolabe rings and faceted crystalline gears. |
| **03** | `FACULTY.02` | **THE CARTOGRAPHERS** | Exploration of the 4 founding practitioners, each represented by their own unique 3D symbolic artifact (Gyro-Prism, Mercury Toroid, Fractal Flora, Chrono-Astrolabe) with interactive inspection dossiers. |
| **04** | `NEXUS.03` | **THE SYNTHESIS** | The transformation sequence: the 4 independent artifacts gravitate inward and snap into an intertwined hyper-monolith with harmonic energy filaments. |
| **05** | `REALMS.04` | **TANGIBLE MONUMENTS** | Journey along three living architectural case studies (Project Chronos Sundial, Synapse Bioluminescent Biome, AuraOS Spatial Interface) with interactive technical specification modals. |
| **06** | `HORIZON.05` | **THE OPEN HORIZON** | A wide-angle panoramic view reveals the complete planetary constellation, inviting visitors to initiate dispatches via the interactive Transmission Console. |

---

## 👥 The Four Practitioners

1. **Dr. Elena Vance** — *Principal Spatial Cartographer*
   - **Symbolic Artifact**: The Resonant Gyro-Prism (Refractive faceted octahedron casting amber caustics)
   - **Domain**: Acoustic Topologies & Waveform Solidification
   - **Focus**: Translating ultrasound pressure fields into dense parametric lattices.
2. **Kaelen Thorne** — *Kinetic Metallurgist*
   - **Symbolic Artifact**: The Liquid Mercury Toroid (Iridescent champagne-gold knotted toroid)
   - **Domain**: Procedural Shader Physics & Fluid Memory
   - **Focus**: Non-Newtonian digital metals that respond to human tactile contact.
3. **Sora Takahashi** — *Computational Botanist*
   - **Symbolic Artifact**: The Fractal Flora Monolith (Parametric blooming mycelial petals)
   - **Domain**: Ecological Systems & Bio-Parametric Growth
   - **Focus**: Algorithmic organs that breathe and metabolize ambient light.
4. **Marcus Sterling** — *Director of Temporal Architecture*
   - **Symbolic Artifact**: The Chrono-Astrolabe Monolith (Nested celestial obsidian rings)
   - **Domain**: Relativistic Pacing & Spatial Wayfinding
   - **Focus**: Sculpting temporal deceleration and spatial memory retention.

---

## 🏛️ Tangible Projects

- **Project Chronos (Oslo Fjord, Norway)**: A 42-meter titanium and optical crystal sundial projecting daylight into public transit hubs.
- **Synapse Pavilion (Venice & Zurich)**: A responsive mycelial canopy woven with bioluminescent dinoflagellates that illuminate from human breath.
- **AuraOS Spatial System**: A volumetric operating interface utilizing ultrasound phased arrays to exert tangible micro-haptic resistance in 3D space.

---

## 🛠️ Technology Stack

- **Core**: React 18, Vite 5
- **3D Engine**: Three.js, React Three Fiber (`@react-three/fiber`), `@react-three/drei`
- **Animation & Motion**: Critically-damped spring interpolation, GSAP, requestAnimationFrame loop
- **Sound**: Native Web Audio API procedural synthesizer (harmonic drone layers + interactive chimes, zero external assets)
- **Icons**: Lucide React
- **Typography**: Google Fonts (`Syne`, `Space Grotesk`, `Inter`)
- **Styling**: Vanilla CSS Design System with custom properties, glassmorphism, and responsive clamps

---

## 📁 Project Architecture

```text
Sample/
├── index.html                   # HTML entry with typography and SEO meta
├── package.json                 # Project dependencies & scripts
├── vite.config.js               # Vite configuration (port 5175)
├── src/
│   ├── main.jsx                 # Application entry point
│   ├── App.jsx                  # Main coordinator (Canvas + UI state)
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── ExperienceCanvas.jsx    # Root R3F Canvas & lighting setup
│   │   │   ├── CameraRig.jsx           # Choreographed camera timeline & parallax
│   │   │   ├── PrimordialCore.jsx      # Core monolith astrolabe in Scene 1 & 2
│   │   │   ├── TeamMonoliths.jsx       # 4 team member artifacts & transformation core
│   │   │   ├── ProjectMonuments.jsx    # 3 architectural monuments in Scene 5
│   │   │   ├── TopologicalTerrain.jsx  # Procedural geological ripple terrain
│   │   │   └── AtmosphericDust.jsx     # Instanced particulate drift system
│   │   └── ui/
│   │       ├── OrientationHeader.jsx   # Top telemetry, audio, and motion controls
│   │       ├── NavigationOverlay.jsx   # Chapter jumps and global scroll track
│   │       ├── StoryOverlay.jsx        # Scroll-driven narrative typography
│   │       ├── TeamDrawer.jsx          # Slide-in practitioner dossier panel
│   │       ├── ProjectModal.jsx        # Architectural case study modal
│   │       ├── TransmissionConsole.jsx # Interactive dispatch terminal modal
│   │       └── LoadingScreen.jsx       # Cinematic progress calibration loader
│   ├── data/
│   │   ├── storyData.js         # Chapter ranges, camera keyframes, narrative copy
│   │   ├── teamData.js          # Practitioner metadata, metrics, and quotes
│   │   └── projectData.js       # Case study specifications, highlights, locations
│   ├── hooks/
│   │   ├── useScrollProgress.js     # Smooth lerped normalized scroll [0, 1]
│   │   ├── useAudioSynthesizer.js   # Generative Web Audio API drone & chimes
│   │   └── useReducedMotion.js      # Accessibility prefers-reduced-motion hook
│   └── styles/
│       └── index.css            # Unified museum-grade styling system
```

---

## ⚡ Performance Engineering Decisions

1. **Procedural Geometry Generation**:
   - Zero bulky 50MB external 3D model downloads. Geometries (toruses, octahedrons, geodesic domes, astrolabe rings) are generated procedurally in memory, ensuring instant load time and zero 404 network failure risks.
2. **BufferGeometry & Instancing**:
   - The atmospheric particulate dust uses a single instanced `BufferGeometry` with `Float32Array` buffers, rendering hundreds of drifting particles in a single draw call.
3. **Adaptive Pixel Ratio Clamp**:
   - `dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}` prevents high-DPI retina screens from rendering at 3x/4x resolution, guaranteeing 60 FPS across laptops and tablets.
4. **Disposal & Re-render Isolation**:
   - Camera calculations run inside Three.js `useFrame` using refs rather than triggering React component state updates on every frame.
5. **No External Audio Assets**:
   - Sound is synthesized dynamically on-the-fly using the browser's native `AudioContext` with zero latency, zero bandwidth, and zero network requests.

---

## 📱 Responsive & Accessibility Strategy

- **Mobile Viewports (`< 768px`)**:
  - The UI seamlessly adapts: chapter step labels collapse to compact pips, typography scales down cleanly using `clamp()`, and touch swipe gestures directly control the 3D camera.
- **Accessibility & Motion**:
  - `prefers-reduced-motion` is detected automatically and can also be toggled anytime via the `CINEMATIC / STATIC` button in the header.
  - Full keyboard navigation: `1-6` jumps between chapters, `ArrowUp`/`ArrowDown`/`PageUp`/`PageDown`/`Space` scrolls, and `Escape` closes any open drawer or modal.
- **Graceful WebGL Fallback**:
  - If a browser lacks WebGL support, a clean compatibility message is displayed rather than a broken or blank screen.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open **`http://localhost:5175/`** in your browser.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
