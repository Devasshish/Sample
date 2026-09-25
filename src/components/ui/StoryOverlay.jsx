import React from 'react';
import { ArrowDown, Sparkles, Compass, Layers, Users, Zap } from 'lucide-react';
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
  onOpenTransmission
}) {
  // Calculate chapter fade opacity based on distance to center of range
  const midPoint = (currentChapter.range[0] + currentChapter.range[1]) / 2;
  const halfSpan = (currentChapter.range[1] - currentChapter.range[0]) / 2;
  const distFromCenter = Math.abs(progress - midPoint) / halfSpan;
  const chapterOpacity = Math.max(0.15, Math.min(1, 1.2 - distFromCenter * 0.8));

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
            <div className="sub-prompt">OR PRESS DOWN ARROW / SWIPE</div>
          </div>
        )}

        {/* Scene 2: Origin Philosophy Nodes */}
        {currentChapter.id === 'origin' && (
          <div className="philosophy-tags">
            <div className="philosophy-pill">
              <span className="pill-dot" />
              <span>Computational Mineralogy</span>
            </div>
            <div className="philosophy-pill">
              <span className="pill-dot" />
              <span>Acoustic Waveform Solidification</span>
            </div>
            <div className="philosophy-pill">
              <span className="pill-dot" />
              <span>Non-Euclidean Spatial Kinetics</span>
            </div>
          </div>
        )}

        {/* Scene 3: Team Roster Mini-Pills */}
        {currentChapter.id === 'team' && (
          <div className="team-roster-tray">
            <div className="tray-label">DISCOVER PRACTITIONERS // CLICK 3D ARTIFACT OR NAME:</div>
            <div className="roster-grid">
              {TEAM_MEMBERS.map((member) => (
                <button
                  key={member.id}
                  type="button"
                  className="roster-card-btn"
                  onClick={() => onSelectMember(member)}
                >
                  <span className="roster-color-dot" style={{ backgroundColor: member.accentColor }} />
                  <div className="roster-info">
                    <span className="roster-name">{member.name}</span>
                    <span className="roster-role">{member.role}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Scene 4: Synthesis / Transformation Status */}
        {currentChapter.id === 'transformation' && (
          <div className="synthesis-status-panel">
            <div className="status-metric-row">
              <span className="metric-tag">DISCIPLINARY FUSION</span>
              <span className="metric-val">EQUILIBRIUM ACTIVE</span>
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

        {/* Scene 5: Projects Tray */}
        {currentChapter.id === 'projects' && (
          <div className="projects-roster-tray">
            <div className="tray-label">SELECT LIVING MONUMENT TO DECONSTRUCT:</div>
            <div className="projects-grid">
              {PROJECTS.map((proj) => (
                <button
                  key={proj.id}
                  type="button"
                  className="project-card-btn"
                  onClick={() => onSelectProject(proj)}
                >
                  <div className="project-badge" style={{ color: proj.accentColor }}>{proj.code}</div>
                  <div className="project-card-title">{proj.title}</div>
                  <div className="project-card-cat">{proj.category}</div>
                </button>
              ))}
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
      </div>
    </div>
  );
}
