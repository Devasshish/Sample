import React from 'react';
import { ArrowDown, ArrowUpRight, Compass, Users, Sparkles, BookOpen } from 'lucide-react';
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
  const chapterOpacity = Math.max(0.15, Math.min(1, 1.25 - distFromCenter * 0.85));

  return (
    <div className="story-overlay" style={{ opacity: chapterOpacity }}>
      <div className="story-content-box">
        {/* Editorial Chapter Meta */}
        <div className="story-meta-badge">
          <span className="meta-time">{currentChapter.time || '03:14 AM'}</span>
          <span className="meta-divider">·</span>
          <span className="meta-index">SCENE {currentChapter.number}</span>
          <span className="meta-divider">·</span>
          <span className="meta-editorial">{currentChapter.editorialNote}</span>
        </div>

        {/* Editorial Display Typography */}
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
              <span className="prompt-text">STEP INSIDE THE STUDIO</span>
              <span className="prompt-icon-ring">
                <ArrowDown size={14} className="bouncing-arrow" />
              </span>
            </button>
            <div className="sub-prompt">SCROLL OR USE ARROW KEYS TO EXPLORE</div>
          </div>
        )}

        {/* Scene 2: The Studio Architectural Material Notes */}
        {currentChapter.id === 'studio' && (
          <div className="philosophy-tags">
            <div className="philosophy-pill">
              <span className="pill-index">[01]</span>
              <span>Board-formed Concrete</span>
            </div>
            <div className="philosophy-pill">
              <span className="pill-index">[02]</span>
              <span>Solid Smoked Oak</span>
            </div>
            <div className="philosophy-pill">
              <span className="pill-index">[03]</span>
              <span>Industrial Mullion Glass</span>
            </div>
          </div>
        )}

        {/* Scene 3: The Collective (5 Practitioners Workspaces) */}
        {currentChapter.id === 'collective' && (
          <div className="team-roster-tray">
            <div className="tray-label">FIVE PRACTITIONERS AT THEIR DESKS // SELECT TO INSPECT WORKSPACE:</div>
            <div className="roster-grid">
              {TEAM_MEMBERS.map((member) => (
                <button
                  key={member.id}
                  type="button"
                  className={`roster-card-btn ${hoveredMemberId === member.id ? 'active' : ''}`}
                  onClick={() => onSelectMember(member)}
                  onMouseEnter={() => setHoveredMemberId(member.id)}
                  onMouseLeave={() => setHoveredMemberId(null)}
                >
                  <span className="roster-index-tag">0{TEAM_MEMBERS.indexOf(member) + 1}</span>
                  <div className="roster-info">
                    <span className="roster-name">{member.name}</span>
                    <span className="roster-role">{member.role}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Scene 4: The Process Physical Storytelling Chain */}
        {currentChapter.id === 'process' && (
          <div className="process-chain-panel">
            <div className="process-chain-steps">
              {['QUESTION', 'SKETCH', 'MODEL', 'CODE', 'MOTION', 'EXPERIENCE'].map((step, sIdx) => (
                <React.Fragment key={step}>
                  <span className="chain-step-item">{step}</span>
                  {sIdx < 5 && <span className="chain-step-arrow">→</span>}
                </React.Fragment>
              ))}
            </div>
            <p className="process-annotation">
              Every built spatial installation moves from a handwritten philosophical inquiry, through trace sketches and basswood joinery, into algorithmic computation and physical reality.
            </p>
          </div>
        )}

        {/* Scene 5: The Pulse Readout */}
        {currentChapter.id === 'pulse' && (
          <div className="pulse-status-panel">
            <div className="status-metric-row">
              <div className="metric-tag-group">
                <span className="metric-pulse-dot" />
                <span className="metric-tag">WORKSHOP SYNCHRONIZATION</span>
              </div>
              <span className="metric-val">05:08 AM // ALL STATIONS ACTIVE</span>
            </div>
            <div className="status-progress-track">
              <div
                className="status-progress-bar"
                style={{
                  width: `${Math.min(100, Math.max(15, ((progress - 0.65) / 0.16) * 100))}%`
                }}
              />
            </div>
            <p className="pulse-annotation">
              Monitors and task fixtures illuminate in unison. Architectural models, shader simulations, and material samples converse across the tables in quiet synchrony.
            </p>
          </div>
        )}

        {/* Scene 6: The Work Commissions */}
        {currentChapter.id === 'work' && (
          <div className="projects-roster-tray">
            <div className="tray-label">THREE BUILT COMMISSIONS // SELECT TO ENTER CASE STUDY:</div>
            <div className="projects-grid">
              {PROJECTS.map((proj) => (
                <button
                  key={proj.id}
                  type="button"
                  className={`project-card-btn ${hoveredProjectId === proj.id ? 'active' : ''}`}
                  onClick={() => onSelectProject(proj)}
                  onMouseEnter={() => setHoveredProjectId(proj.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                >
                  <div className="project-left-group">
                    <span className="project-badge">{proj.code}</span>
                    <span className="project-card-title">{proj.title}</span>
                  </div>
                  <div className="project-right-group">
                    <span className="project-meta-tag">[{proj.location}]</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Scene 7: Dawn Final Section */}
        {currentChapter.id === 'dawn' && (
          <div className="apex-cta-container">
            <button
              type="button"
              className="apex-primary-btn"
              onClick={onOpenTransmission}
            >
              <span>START A CONVERSATION</span>
              <ArrowUpRight size={15} />
            </button>
            <button
              type="button"
              className="apex-secondary-btn"
              onClick={() => onNavigateChapter(0)}
            >
              <Compass size={15} />
              <span>RETURN TO THE ENTRANCE</span>
            </button>
          </div>
        )}

        {/* Minimal Editorial Navigation Hint */}
        <div className="keyboard-hints-hud">
          <span>KEYBOARD: [1-7: JUMP TO SCENE]</span>
          <span>[↑/↓: WALK THROUGH SPACE]</span>
          <span>[ESC: CLOSE MODAL]</span>
        </div>
      </div>
    </div>
  );
}
