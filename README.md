# THE LAST LIGHT
> **Design & Spatial Laboratory**  
> An immersive, cinematic physical 3D experience set inside a contemporary creative studio during the transition from late night to dawn.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Stack: React + Three.js + R3F + Vite](https://img.shields.io/badge/Stack-React%20%7C%20Three.js%20%7C%20R3F%20%7C%20Vite-black.svg)](https://vitejs.dev/)

---

## 🌟 Creative Concept & Art Direction

**The Last Light** is a fictional creative studio and spatial architecture laboratory. 

Rejecting generic cybernetic tropes, floating polygons, sci-fi HUDs, and artificial orange neon glows, the experience is grounded entirely in **realism, tactile craft, physical architecture, and cinematic lighting**.

The user travels physically through a genuine design workshop between 02:47 AM and 06:18 AM:
- **Architecture**: Polished concrete floors with expansion joints, board-formed concrete perimeter walls, industrial factory-style steel mullion windows overlooking a distant quiet night skyline, structural dark oak ceiling beams, and suspended architectural track lights.
- **Physicality**: Solid smoked oak worktables, Anglepoise/Tolomeo task lamps, physical basswood study models, drafting trace paper sketches with hand-drawn charcoal lines, dual color-calibrated monitors, cinema prime lenses, light meters, and brass material sample trays (Carrara marble, scorched Yakisugi cedar, patinated brass, acoustic felt).
- **Lighting as Narrative**: The story progresses through the passage of time—from a quiet, solitary entrance light at 02:47 AM, through practical desk lamps and monitor glows, culminating in low-angle golden morning dawn streaming through the floor-to-ceiling glass wall at 06:18 AM.

---

## 🗺️ The Seven Scene Progression

| Scene | Time | Title | Spatial & Architectural Event |
|---|---|---|---|
| **01** | `02:47 AM` | **THE ARRIVAL** | Exterior vestibule and heavy glass doorway. A solitary warm tungsten sconce casts a pool of light inside against the quiet dark. Minimal editorial title: *"Some ideas begin long after everyone else has gone home."* |
| **02** | `03:14 AM` | **THE STUDIO** | Smooth camera tracking into the open-plan workshop. Reveals solid oak layout tables, concrete pillars, stacked design folios, and quiet monitors. |
| **03** | `03:52 AM` | **THE COLLECTIVE** | Dollies across 5 distinct practitioner workstations: Elena Rostova (Creative Director), Marcus Vance (Spatial Sculptor), Sora Takahashi (Systems Lead), Maya Lindqvist (Cinematographer), and Julian Thorne (Material Researcher). |
| **04** | `04:30 AM` | **THE PROCESS** | Physical transformation chain along the layout bench: `QUESTION → SKETCH → MODEL → CODE → MOTION → EXPERIENCE` represented by real objects (letterpress note, trace roll, basswood maquette, code display, motion screen, finished artifact). |
| **05** | `05:08 AM` | **THE PULSE** | Coordinated studio activation. Desk lamps snap on with warm 2700K tungsten glow, displays illuminate with calibrated diagrams, and workstations synchronize. |
| **06** | `05:42 AM` | **THE WORK** | Three built physical commissions on exhibition pedestals: Pavilion Komorebi (Nagano), Aetheria Chronometer (Copenhagen), and Cenote Sound Sanctuary (Oaxaca). |
| **07** | `06:18 AM` | **DAWN** | Camera pulls back to a wide architectural vantage point as natural morning sunlight washes through the industrial glass wall, casting long shadows across concrete and oak. *"THE WORK CONTINUES."* |

---

## 👥 The Five Practitioners & Workspaces

1. **Elena Rostova** — *Creative Director & Architect*
   - **Workspace**: Angled drafting board, charcoal floorplans on Japanese trace paper, heavy brass T-square, Leica M11 camera with prime lens, ceramic espresso cup, Anglepoise lamp.
   - **Statement**: *"Architecture begins when you subtract everything decorative and arrive at structural truth."*
2. **Marcus Vance** — *Spatial Sculptor & 3D Lead*
   - **Workspace**: Dual matte studio displays running wireframe CAD geometry, clear cured resin 3D maquettes on walnut block, mechanical keyboard, over-ear studio headphones.
   - **Statement**: *"If a digital surface doesn't possess tactile inertia and grain, it will never touch the human spirit."*
3. **Sora Takahashi** — *Creative Technologist & Systems Lead*
   - **Workspace**: Ultrawide curved display running custom GLSL shaders and algorithmic calculations, sensor breadboard with subtle micro-LEDs, anodized black field laptop.
   - **Statement**: *"Algorithms shouldn't behave like machines; they should grow like lichen across weathered stone."*
4. **Maya Lindqvist** — *Cinematographer & Motion Director*
   - **Workspace**: High-CRI reference grading monitor with video timeline, Cooke 50mm cinema prime lens, Sekonic digital light meter, pinned 35mm film contact strips.
   - **Statement**: *"Light is the ultimate narrator. The way a shadow crawls across raw concrete tells more than pages of prose."*
5. **Julian Thorne** — *Material Researcher & Strategist*
   - **Workspace**: Solid brass sample tray with honed Carrara marble tile, scorched Yakisugi cedar, oxidized brass ingot, acoustic wool felt, open hardcover architecture monograph.
   - **Statement**: *"Every physical material holds geologic memory. We honor that memory through restraint."*

---

## 🏛️ Built Architectural Commissions

- **Pavilion Komorebi (Nagano Alpine Forest, Japan)**: Interlocking charred Yakisugi cedar structure filtering natural daylight like sunlight through forest leaves without metal fasteners.
- **Aetheria Chronometer (Nordhavn Waterfront, Copenhagen)**: A 5.2m kinetic tidal timepiece in gunmetal bronze and optical sapphire driven by the rise and fall of the Baltic Sea tide.
- **Cenote Sound Sanctuary (Sierra Norte, Oaxaca, Mexico)**: A subterranean acoustic sanctuary of rammed terracotta earth and a monolithic basalt pool focusing ambient rainfall acoustics.

---

## 🛠️ Tech Stack & Implementation Details

- **React 18** with functional components & custom state hooks
- **Three.js & React Three Fiber (R3F)** for the 3D studio environment
- **Custom Procedural Texture Engine**: Real-time canvas textures for drafting sketches, 3D CAD viewports, GLSL code editors, DaVinci timelines, and concrete floor expansion joints
- **Web Audio Synthesizer**: Organic, quiet analog ambient drone chords with lowpass filters and tactile mechanical lamp switch tones
- **Editorial Typography**: Google Fonts (`Cormorant Garamond`, `Plus Jakarta Sans`, `JetBrains Mono`)
- **Vite 5** for bundling and fast HMR

---

## 🚀 Getting Started

```bash
# Clone or navigate to the directory
cd Sample

# Install dependencies
npm install

# Start Vite dev server
npm run dev
# -> Opens http://localhost:5175/

# Build for production
npm run build
```
