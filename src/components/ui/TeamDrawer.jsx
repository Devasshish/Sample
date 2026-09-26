import React, { useEffect } from 'react';
import { X, Layers, Cpu, Shield, Zap, Sparkles } from 'lucide-react';

export function TeamDrawer({ member, onClose, onSelectProjectById }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!member) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside
        className="team-drawer"
        style={{ '--operative-color': member.color }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="member-name"
      >
        {/* Header Bar */}
        <div className="drawer-header">
          <div className="drawer-badge">
            <span className="live-pulse-dot" style={{ background: member.color }} />
            <span>OPERATIVE DOSSIER // {member.codename}</span>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close Member Profile"
          >
            <X size={16} />
          </button>
        </div>

        {/* Member Identity & Workstation Monograph */}
        <div className="drawer-body">
          <div className="member-hero">
            <div className="codename-tag" style={{ color: member.color }}>{member.codename}</div>
            <h2 id="member-name" className="member-name">{member.name}</h2>
            <div className="member-role">{member.role}</div>
            <div className="member-domain">{member.discipline}</div>
          </div>

          {/* Skill Telemetry Radar Bars */}
          {member.stats && (
            <div className="drawer-section">
              <h3 className="section-title">
                <Cpu size={14} className="section-icon" />
                <span>NEURAL TELEMETRY</span>
              </h3>
              <div className="skills-bar-grid">
                {Object.entries(member.stats).map(([statKey, val]) => (
                  <div key={statKey} className="skill-bar-row">
                    <div className="skill-label-row">
                      <span className="skill-name">
                        {statKey.replace(/([A-Z])/g, ' $1').toUpperCase()}
                      </span>
                      <span className="skill-val" style={{ color: member.color }}>{val}%</span>
                    </div>
                    <div className="skill-track">
                      <div
                        className="skill-fill"
                        style={{
                          width: `${val}%`,
                          background: `linear-gradient(90deg, ${member.color}88, ${member.color})`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Personal Statement Quote */}
          <blockquote className="member-quote" style={{ borderLeftColor: member.color }}>
            "{member.quote}"
          </blockquote>

          {/* Practice Statement */}
          <div className="drawer-section">
            <h3 className="section-title">
              <Shield size={14} className="section-icon" />
              <span>CLASSIFIED OPERATIONAL LOG</span>
            </h3>
            <p className="manifesto-text">{member.statement}</p>
          </div>

          {/* Signature Artifact */}
          {member.signatureWeapon && (
            <div className="drawer-section">
              <h3 className="section-title">
                <Zap size={14} className="section-icon" />
                <span>SIGNATURE DIMENSIONAL ARTIFACT</span>
              </h3>
              <div className="weapon-card" style={{ borderColor: `${member.color}66` }}>
                <span className="weapon-name" style={{ color: member.color }}>{member.signatureWeapon}</span>
              </div>
            </div>
          )}

          {/* Operational Artifacts */}
          <div className="drawer-section">
            <h3 className="section-title">
              <Sparkles size={14} className="section-icon" />
              <span>STATION ARTIFACTS</span>
            </h3>
            <div className="desk-artifacts-list">
              {(member.artifacts || []).map((art, idx) => (
                <div key={idx} className="desk-artifact-item">
                  <span className="artifact-bullet" style={{ color: member.color }}>◆</span>
                  <span>{art}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notable Commissions */}
          <div className="drawer-section">
            <h3 className="section-title">
              <Layers size={14} className="section-icon" />
              <span>KEY COMMISSIONS</span>
            </h3>
            <div className="artifacts-list">
              {member.notableCommissions.map((comm, idx) => (
                <div key={idx} className="artifact-list-item">
                  <span style={{ color: member.color }}>▸</span>
                  <span>{comm}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
