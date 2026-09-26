import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Radio, Zap } from 'lucide-react';

export function TransmissionConsole({ isOpen, onClose, playChime }) {
  const [inquiryType, setInquiryType] = useState('commission');
  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [dispatchMessage, setDispatchMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!senderName || !dispatchMessage) return;

    setSubmitting(true);
    if (playChime) playChime(440, 0.5);

    setTimeout(() => {
      setSubmitting(false);
      setIsSent(true);
      if (playChime) playChime(659.25, 1.0);
    }, 900);
  };

  const handleReset = () => {
    setIsSent(false);
    setSenderName('');
    setSenderContact('');
    setProjectLocation('');
    setDispatchMessage('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="transmission-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-title"
      >
        <div className="transmission-header">
          <div className="transmission-status-tag">
            <Radio size={14} className="console-radio-icon" />
            <span>KINESIS // QUANTUM TRANSMISSION CONSOLE</span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close Inquiry Window"
          >
            <X size={16} />
          </button>
        </div>

        {isSent ? (
          <div className="transmission-success">
            <CheckCircle2 size={44} className="success-icon" />
            <h3 className="success-title">TRANSMISSION CONFIRMED</h3>
            <p className="success-text">
              Signal locked onto the Syndicate neural array. An operative will decode your coordinates and establish a direct link with <strong>{senderContact || 'your channel'}</strong>.
            </p>
            <button
              type="button"
              className="success-btn"
              onClick={handleReset}
            >
              TRANSMIT ANOTHER PACKET
            </button>
          </div>
        ) : (
          <form className="transmission-form" onSubmit={handleSubmit}>
            <div className="form-intro">
              <h2 id="inquiry-title" className="console-title">ESTABLISH QUANTUM LINK</h2>
              <p className="console-desc">
                Commission the Syndicate for interactive WebGL universes, generative physics engines, and spatial dimensional installations.
              </p>
            </div>

            {/* Inquiry Category Selectors */}
            <div className="channel-select-group">
              <label className="field-label">MISSION OBJECTIVE</label>
              <div className="channel-chips">
                <button
                  type="button"
                  className={`channel-chip ${inquiryType === 'commission' ? 'active' : ''}`}
                  onClick={() => setInquiryType('commission')}
                >
                  3D WEB EXPERIENCE
                </button>
                <button
                  type="button"
                  className={`channel-chip ${inquiryType === 'installation' ? 'active' : ''}`}
                  onClick={() => setInquiryType('installation')}
                >
                  SPATIAL INSTALLATION
                </button>
                <button
                  type="button"
                  className={`channel-chip ${inquiryType === 'curatorial' ? 'active' : ''}`}
                  onClick={() => setInquiryType('curatorial')}
                >
                  GAME / SHADER ENGINE
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="input-grid">
              <div className="field-box">
                <label htmlFor="sender-name" className="field-label">OPERATIVE CALLSIGN / NAME *</label>
                <input
                  id="sender-name"
                  type="text"
                  required
                  placeholder="e.g. Commander Nova"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="console-input"
                />
              </div>

              <div className="field-box">
                <label htmlFor="sender-contact" className="field-label">NEURAL FREQUENCY / EMAIL *</label>
                <input
                  id="sender-contact"
                  type="email"
                  required
                  placeholder="channel@domain.io"
                  value={senderContact}
                  onChange={(e) => setSenderContact(e.target.value)}
                  className="console-input"
                />
              </div>
            </div>

            <div className="field-box">
              <label htmlFor="project-location" className="field-label">TERRESTRIAL COORDINATES / TIMELINE</label>
              <input
                id="project-location"
                type="text"
                placeholder="e.g. Tokyo / Shibuya / Q3 2026"
                value={projectLocation}
                onChange={(e) => setProjectLocation(e.target.value)}
                className="console-input"
              />
            </div>

            <div className="field-box">
              <label htmlFor="dispatch-msg" className="field-label">PROJECT BRIEF & SPECS *</label>
              <textarea
                id="dispatch-msg"
                required
                rows={4}
                placeholder="Describe the dimensional universe, interaction scope, or audio-visual goals..."
                value={dispatchMessage}
                onChange={(e) => setDispatchMessage(e.target.value)}
                className="console-textarea"
              />
            </div>

            <div className="form-footer">
              <span className="studio-location-tag">NODE ARRAY: ZERO-G SYNDICATE</span>
              <button
                type="submit"
                className="transmit-submit-btn"
                disabled={submitting}
              >
                <span>{submitting ? 'TRANSMITTING...' : 'DISPATCH SIGNAL'}</span>
                <Send size={13} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
