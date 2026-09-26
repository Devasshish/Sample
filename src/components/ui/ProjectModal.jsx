import React, { useEffect } from 'react';
import { X, MapPin, Calendar, Terminal, ShieldCheck } from 'lucide-react';

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
        style={{ '--proj-accent': project.color || '#00f0ff' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-meta-row">
            <span className="modal-code-badge" style={{ borderColor: project.color, color: project.color }}>
              {project.code}
            </span>
            <span className="modal-category">{project.category}</span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close Case Study"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Hero */}
        <div className="modal-hero">
          <h2 id="project-title" className="modal-title">{project.title}</h2>
          <div className="modal-subtitle" style={{ color: project.color }}>{project.subtitle}</div>
          <div className="modal-location-row">
            <div className="loc-item">
              <MapPin size={13} />
              <span>{project.location}</span>
            </div>
            <div className="loc-item">
              <Calendar size={13} />
              <span>{project.year}</span>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="modal-body">
          {/* Material Palette Callout */}
          <div className="material-palette-box" style={{ borderColor: `${project.color}55` }}>
            <div className="palette-label" style={{ color: project.color }}>PHOTONIC & MATERIAL MATRIX</div>
            <div className="palette-val">{project.materialPalette}</div>
          </div>

          <p className="project-summary-text">{project.summary}</p>

          {/* Details / Architectural Innovations */}
          <div className="modal-section">
            <h3 className="modal-section-title">
              <Terminal size={14} className="section-icon" />
              <span>DIMENSIONAL ARCHITECTURE & EXECUTION</span>
            </h3>
            <div className="highlights-grid">
              {project.details.map((detail, i) => (
                <div key={i} className="highlight-item">
                  <span className="highlight-bullet" style={{ color: project.color }}>◆</span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="modal-section">
            <h3 className="modal-section-title">
              <ShieldCheck size={14} className="section-icon" />
              <span>SYSTEM SPECIFICATIONS</span>
            </h3>
            <div className="specs-table">
              {Object.entries(project.specifications).map(([key, val]) => (
                <div key={key} className="spec-row">
                  <span className="spec-key">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</span>
                  <span className="spec-val" style={{ color: project.color }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
