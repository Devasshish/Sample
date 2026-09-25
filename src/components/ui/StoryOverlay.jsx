import React from 'react';
import { ArrowDown, Sparkles, Compass, Layers, Users, Zap, Terminal, Activity } from 'lucide-react';
import { CHAPTERS } from '../../data/storyData';
import { TEAM_MEMBERS } from '../../data/teamData';
import { PROJECTS } from '../../data/projectData';

export function StoryOverlay({
  currentChapter,
  currentChapterIndex,
  progress,
  onNavigateChapter,
  onSelectMember,
  onSelectProject,
  onOpenTransmission,
  hoveredMemberId,
  setHoveredMemberId,
  hoveredProjectId,
  setHoveredProjectId
}) {
  const midPoint = (currentChapter.range[0] + currentChapter.range[1]) / 2;
  const halfSpan = (currentChapter.range[1] - currentChapter.range[0]) / 2;
  const distFromCenter = Math.abs(progress - midPoint) / halfSpan;
  const chapterOpacity = Math.max(0.12, Math.min(1, 1.25 - distFromCenter * 0.9));

  return (
    <div className="story-overlay" style={{ opacity: chapterOpacity }}>
      <div className="story-content-box">
        {/* Chapter Header */}
        <div className="story-meta-badge">
          <span className="meta-index">{currentChapter.number}</span>
          <span className="meta-divider">//</span>
          <span className="meta-code">{currentChapter.code}</span>
        </div>

        {/* Main Display Typography */}
        <h1 className="story-title">{currentChapter.title}</h1>
        <div className="story-subtitle">{currentChapter.subtitle}</div>

        {/* Narrative Description */}
        <p className="story-description">{currentChapter.storyText}</p>

        {/* Scene 1: Arrival Interactive Prompt */}
        {currentChapter.id === 'arrival' && (
          <div className="scene-action-container">
            <button
              type="button"
              className="action-scroll-prompt"
              onClick={() => onNavigateChapter(1)}
            >
              <span className="prompt-text">SCROLL TO DESCEND</span>
              <span className="prompt-icon-ring">
                <ArrowDown size={14} className="bouncing-arrow" />
              </span>
            </button>
            <div className="sub-prompt">OR PRESS DOWN ARROW / SWIPE UP</div>
          </div>
        )}

        {/* Scene 2: Origin Curatorial Tags */}
        {currentChapter.id === 'origin' && (
          <div className="philosophy-tags">
            <div className="philosophy-pill">
              <span className="pill-index">[01]</span>
              <span>Computational Mineralogy</span>
            </div>
            <div className="philosophy-pill">
              <span className="pill-index">[02]</span>
              <span>Acoustic Waveform Solidification</span>
            </div>
            <div className="philosophy-pill">
              <span className="pill-index">[03]</span>
              <span>Non-Euclidean Spatial Kinetics</span>
            </div>
          </div>
        )}

        {/* Scene 3: Team Roster Mini-Cards with Discipline Codes */}
        {currentChapter.id === 'team' && (
          <div className="team-roster-tray">
            <div className="tray-label">DISCOVER PRACTITIONERS // CLICK 3D ARTIFACT OR MEMBER:</div>
            <div className="roster-grid">
              {TEAM_MEMBERS.map((member) => {
                const disciplineCodes = {
                  elena: 'SPATIAL',
                  kaelen: 'METALLURGY',
                  sora: 'BOTANY',
                  marcus: 'TEMPORAL'
                };
                return (
                  <button
                    key={member.id}
                    type="button"
                    className={`roster-card-btn ${hoveredMemberId === member.id ? 'active' : ''}`}
                    onClick={() => onSelectMember(member)}
                    onMouseEnter={() => setHoveredMemberId(member.id)}
                    onMouseLeave={() => setHoveredMemberId(null)}
                  >
                    <span className="roster-color-dot" style={{ backgroundColor: member.accentColor }} />
                    <div className="roster-info">
                      <div className="roster-top-row">
                        <span className="roster-name">{member.name}</span>
                        <span className="roster-code-tag" style={{ color: member.accentColor }}>
                          [{disciplineCodes[member.id] || 'STRATA'}]
                        </span>
                      </div>
                      <span className="roster-role">{member.role}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Scene 4: Synthesis / Curatorial Readout */}
        {currentChapter.id === 'transformation' && (
          <div className="synthesis-status-panel">
            <div className="status-metric-row">
              <div className="metric-tag-group">
                <span className="metric-pulse-dot" />
                <span className="metric-tag">HARMONIC ASTROLABE NEXUS</span>
              </div>
              <span className="metric-val">440.0 Hz // EQUILIBRIUM ACTIVE</span>
            </div>
            <div className="status-progress-track">
              <div
                className="status-progress-bar"
                style={{
                  width: `${Math.min(100, Math.max(10, ((progress - 0.52) / 0.18) * 100))}%`
                }}
              />
            </div>
            <p className="synthesis-annotation">
              Four individual resonant artifacts converge into a unified spatial astrolabe, unlocking structural intelligence unattainable in isolation.
            </p>
          </div>
        )}

        {/* Scene 5: Projects Tray with Location/Year Metadata */}
        {currentChapter.id === 'projects' && (
          <div className="projects-roster-tray">
            <div className="tray-label">SELECT LIVING MONUMENT TO DECONSTRUCT:</div>
            <div className="projects-grid">
              {PROJECTS.map((proj) => {
                const metadata = {
                  chronos: 'OSLO // 2026',
                  synapse: 'VENICE // 2025',
                  auraos: 'GLOBAL // 2026'
                };
                return (
                  <button
                    key={proj.id}
                    type="button"
                    className={`project-card-btn ${hoveredProjectId === proj.id ? 'active' : ''}`}
                    onClick={() => onSelectProject(proj)}
                    onMouseEnter={() => setHoveredProjectId(proj.id)}
                    onMouseLeave={() => setHoveredProjectId(null)}
                  >
                    <div className="project-left-group">
                      <span className="project-badge" style={{ color: proj.accentColor }}>{proj.code}</span>
                      <span className="project-card-title">{proj.title}</span>
                    </div>
                    <div className="project-right-group">
                      <span className="project-meta-tag">[{metadata[proj.id] || proj.year}]</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Scene 6: Apex Final Call To Action */}
        {currentChapter.id === 'apex' && (
          <div className="apex-cta-container">
            <button
              type="button"
              className="apex-primary-btn"
              onClick={onOpenTransmission}
            >
              <Zap size={16} />
              <span>TRANSMIT AN INQUIRY</span>
            </button>
            <button
              type="button"
              className="apex-secondary-btn"
              onClick={() => onNavigateChapter(0)}
            >
              <Compass size={16} />
              <span>RETURN TO THE AWAKENING</span>
            </button>
          </div>
        )}

        {/* Subtle Keyboard Navigation HUD */}
        <div className="keyboard-hints-hud">
          <span>KEYBOARD: [1-6: JUMP]</span>
          <span>[↑/↓: SCROLL]</span>
          <span>[ESC: CLOSE]</span>
        </div>
      </div>
    </div>
  );
}
