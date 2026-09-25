import React, { useEffect } from 'react';
import { X, Check, MapPin, Calendar, Layers } from 'lucide-react';

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
            <span className="modal-code-badge">{project.code}</span>
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
          <div className="modal-subtitle">{project.subtitle}</div>
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
          <div className="material-palette-box">
            <div className="palette-label">PHYSICAL MATERIAL SPECIFICATION</div>
            <div className="palette-val">{project.materialPalette}</div>
          </div>

          <p className="project-summary-text">{project.summary}</p>

          {/* Details / Architectural Innovations */}
          <div className="modal-section">
            <h3 className="modal-section-title">STRUCTURAL & SPATIAL EXECUTION</h3>
            <div className="highlights-grid">
              {project.details.map((detail, i) => (
                <div key={i} className="highlight-item">
                  <span className="highlight-bullet">―</span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="modal-section">
            <h3 className="modal-section-title">ARCHITECTURAL SPECIFICATIONS</h3>
            <div className="specs-table">
              {Object.entries(project.specifications).map(([key, val]) => (
                <div key={key} className="spec-row">
                  <span className="spec-key">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</span>
                  <span className="spec-val">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
