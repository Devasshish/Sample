import React from 'react';
import { ArrowDown, ArrowUpRight, Radio, Sparkles, ChevronRight, Zap } from 'lucide-react';
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
  return (
    <div className="story-overlay">
      <div className="story-content-box">
        {/* Sector Metadata Badge */}
        <div className="story-meta-badge">
          <span className="meta-time">{currentChapter.code || 'SEC.01'}</span>
          <span className="meta-divider">·</span>
          <span className="meta-index">SECTOR {currentChapter.number}</span>
          <span className="meta-divider">·</span>
          <span className="meta-editorial">{currentChapter.editorialNote}</span>
        </div>

        {/* Display Typography */}
        <h1 className="story-title">{currentChapter.title}</h1>
        <div className="story-subtitle">{currentChapter.subtitle}</div>

        {/* Narrative Description */}
        <p className="story-description">{currentChapter.storyText}</p>

        {/* Sector 1: The Singularity CTA */}
        {currentChapter.id === 'singularity' && (
          <div className="scene-action-container">
            <button
              type="button"
              className="action-scroll-prompt"
              onClick={() => onNavigateChapter(1)}
            >
              <Zap size={14} className="prompt-zap-icon" />
              <span className="prompt-text">ENGAGE WARP DRIVE</span>
              <span className="prompt-icon-ring">
                <ArrowDown size={14} className="bouncing-arrow" />
              </span>
            </button>
            <div className="sub-prompt">SCROLL OR HOLD SPACEBAR TO GLIDE THROUGH 3D REALMS</div>
          </div>
        )}

        {/* Sector 2: The Creed / Principles */}
        {currentChapter.id === 'manifesto' && (
          <div className="philosophy-tags">
            <div className="philosophy-pill">
              <span className="pill-index">[01]</span>
              <span>ZERO TEMPLATES</span>
            </div>
            <div className="philosophy-pill">
              <span className="pill-index">[02]</span>
              <span>REAL-TIME GLSL COMPUTE</span>
            </div>
            <div className="philosophy-pill">
              <span className="pill-index">[03]</span>
              <span>NEURO-HAPTIC AUDIO</span>
            </div>
          </div>
        )}

        {/* Sector 3: The Operatives (The Syndicate) */}
        {currentChapter.id === 'operatives' && (
          <div className="team-roster-tray">
            <div className="tray-label">FIVE 3D TOTEMS IN THE SECTOR // SELECT TO INSPECT:</div>
            <div className="roster-grid">
              {TEAM_MEMBERS.map((member, idx) => (
                <button
                  key={member.id}
                  type="button"
                  className={`roster-card-btn ${hoveredMemberId === member.id ? 'active' : ''}`}
                  style={{ '--card-accent': member.color }}
                  onClick={() => onSelectMember(member)}
                  onMouseEnter={() => setHoveredMemberId(member.id)}
                  onMouseLeave={() => setHoveredMemberId(null)}
                >
                  <span className="roster-index-tag">0{idx + 1}</span>
                  <div className="roster-info">
                    <span className="roster-name">{member.name}</span>
                    <span className="roster-role">{member.discipline.split('&')[0]}</span>
                  </div>
                  <ChevronRight size={13} className="roster-arrow" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sector 4: The Arsenal (3 Deployed Projects) */}
        {currentChapter.id === 'arsenal' && (
          <div className="projects-roster-tray">
            <div className="tray-label">THREE DEPLOYED REALITIES // SELECT TO ENTER CASE STUDY:</div>
            <div className="projects-grid">
              {PROJECTS.map((proj) => (
                <button
                  key={proj.id}
                  type="button"
                  className={`project-card-btn ${hoveredProjectId === proj.id ? 'active' : ''}`}
                  style={{ '--proj-color': proj.color }}
                  onClick={() => onSelectProject(proj)}
                  onMouseEnter={() => setHoveredProjectId(proj.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                >
                  <div className="project-left-group">
                    <span className="project-badge">{proj.code}</span>
                    <span className="project-card-title">{proj.title}</span>
                  </div>
                  <div className="project-right-group">
                    <span className="project-meta-tag">[{proj.category.split(' ')[0]}]</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sector 5: Hyper-Convergence */}
        {currentChapter.id === 'convergence' && (
          <div className="apex-cta-container">
            <button
              type="button"
              className="apex-primary-btn"
              onClick={onOpenTransmission}
            >
              <Radio size={16} />
              <span>TRANSMIT QUANTUM SIGNAL</span>
              <ArrowUpRight size={15} />
            </button>
            <button
              type="button"
              className="apex-secondary-btn"
              onClick={() => onNavigateChapter(0)}
            >
              <span>RETURN TO SINGULARITY</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
