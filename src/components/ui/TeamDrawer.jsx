import React, { useEffect } from 'react';
import { X, Layers, ArrowUpRight } from 'lucide-react';

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
          <div className="drawer-badge">
            PRACTITIONER PROFILE / {member.id.toUpperCase()}
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
            <h2 id="member-name" className="member-name">{member.name}</h2>
            <div className="member-role">{member.role}</div>
            <div className="member-domain">{member.discipline}</div>
          </div>

          {/* Monograph Reference Tag */}
          <div className="monograph-chip-box">
            <div className="monograph-chip-label">ARCHIVE REFERENCE</div>
            <div className="monograph-chip-val">{member.monographRef}</div>
          </div>

          {/* Personal Statement Quote */}
          <blockquote className="member-quote">
            "{member.quote}"
          </blockquote>

          {/* Practice Statement */}
          <div className="drawer-section">
            <h3 className="section-title">PRACTICE & BACKGROUND</h3>
            <p className="manifesto-text">{member.statement}</p>
          </div>

          {/* Workstation Physical Artifacts */}
          <div className="drawer-section">
            <h3 className="section-title">PHYSICAL WORKSPACE ARTIFACTS</h3>
            <div className="desk-artifacts-list">
              {member.deskArtifacts.map((art, idx) => (
                <div key={idx} className="desk-artifact-item">
                  <span className="artifact-bullet">·</span>
                  <span>{art}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notable Commissions */}
          <div className="drawer-section">
            <h3 className="section-title">SELECTED COMMISSIONS</h3>
            <div className="artifacts-list">
              {member.notableCommissions.map((comm, idx) => (
                <div key={idx} className="artifact-list-item">
                  <Layers size={13} className="comm-icon" />
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
