import React, { useEffect } from 'react';
import { X, CheckCircle2, Cpu, Globe, Calendar, Compass } from 'lucide-react';

export function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="project-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-meta-row">
            <span className="modal-code-badge" style={{ color: project.accentColor }}>{project.code}</span>
            <span className="modal-category">{project.category}</span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close Project Modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Hero */}
        <div className="modal-hero">
          <h2 id="project-title" className="modal-title">{project.title}</h2>
          <div className="modal-subtitle">{project.subtitle}</div>
          <div className="modal-location-row">
            <div className="loc-item">
              <Globe size={14} />
              <span>{project.location}</span>
            </div>
            <div className="loc-item">
              <Calendar size={14} />
              <span>{project.year}</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="modal-body">
          <p className="project-summary-text">{project.summary}</p>

          {/* Highlights */}
          <div className="modal-section">
            <h3 className="modal-section-title">ENGINEERING INNOVATIONS</h3>
            <div className="highlights-grid">
              {project.highlights.map((h, i) => (
                <div key={i} className="highlight-item">
                  <CheckCircle2 size={16} style={{ color: project.accentColor, flexShrink: 0 }} />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specs */}
          <div className="modal-section">
            <h3 className="modal-section-title">TECHNICAL ARCHITECTURE</h3>
            <div className="specs-table">
              <div className="spec-row">
                <span className="spec-key">System Latency:</span>
                <span className="spec-val" style={{ color: project.accentColor }}>{project.technicalSpec.latency}</span>
              </div>
              <div className="spec-row">
                <span className="spec-key">Material Composition:</span>
                <span className="spec-val">{project.technicalSpec.materials}</span>
              </div>
              <div className="spec-row">
                <span className="spec-key">Spatial Footprint:</span>
                <span className="spec-val">{project.technicalSpec.dimensions}</span>
              </div>
              <div className="spec-row">
                <span className="spec-key">Energy Harvesting:</span>
                <span className="spec-val">{project.technicalSpec.powerSource}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
