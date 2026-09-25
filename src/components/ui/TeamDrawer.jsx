import React, { useEffect } from 'react';
import { X, Sparkles, Activity, Layers, ArrowRight } from 'lucide-react';

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
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="member-name"
      >
        {/* Header Bar */}
        <div className="drawer-header">
          <div className="drawer-badge" style={{ borderColor: member.accentColor, color: member.accentColor }}>
            PRACTITIONER DOSSIER // {member.id.toUpperCase()}
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close Member Dossier"
          >
            <X size={18} />
          </button>
        </div>

        {/* Member Identity */}
        <div className="drawer-body">
          <div className="member-hero">
            <h2 id="member-name" className="member-name">{member.name}</h2>
            <div className="member-role" style={{ color: member.accentColor }}>{member.role}</div>
            <div className="member-domain">{member.domain}</div>
          </div>

          {/* Symbolic Artifact Representation */}
          <div className="artifact-chip-box">
            <div className="artifact-chip-icon" style={{ backgroundColor: member.accentColor }} />
            <div>
              <div className="artifact-chip-label">SYMBOLIC ARTIFACT IN WORLD</div>
              <div className="artifact-chip-val">{member.symbolicObject}</div>
            </div>
          </div>

          {/* Personal Manifesto Quote */}
          <blockquote className="member-quote">
            "{member.quote}"
          </blockquote>

          {/* Core Philosophy */}
          <div className="drawer-section">
            <h3 className="section-title">RESEARCH MANIFESTO</h3>
            <p className="manifesto-text">{member.manifesto}</p>
          </div>

          {/* Telemetry Metrics */}
          <div className="drawer-section">
            <h3 className="section-title">TELEMETRY & CAPABILITIES</h3>
            <div className="metrics-grid">
              {member.metrics.map((m, idx) => (
                <div key={idx} className="metric-box">
                  <div className="metric-label">{m.label}</div>
                  <div className="metric-val" style={{ color: member.accentColor }}>{m.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Artifacts Led */}
          <div className="drawer-section">
            <h3 className="section-title">KEY MANIFESTATIONS LED</h3>
            <div className="artifacts-list">
              {member.artifactsLed.map((art, idx) => (
                <div key={idx} className="artifact-list-item">
                  <Layers size={14} style={{ color: member.accentColor }} />
                  <span>{art}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
