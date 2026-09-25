import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, ArrowRight } from 'lucide-react';

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
    if (playChime) playChime(440, 0.8);

    setTimeout(() => {
      setSubmitting(false);
      setIsSent(true);
      if (playChime) playChime(523.25, 1.2);
    }, 1000);
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
            <span>THE LAST LIGHT / STUDIO INQUIRIES</span>
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
            <CheckCircle2 size={40} className="success-icon" />
            <h3 className="success-title">INQUIRY RECEIVED</h3>
            <p className="success-text">
              Thank you for reaching out. A partner from The Last Light will review your brief and reply directly to <strong>{senderContact || 'your email'}</strong> within two studio days.
            </p>
            <button
              type="button"
              className="success-btn"
              onClick={handleReset}
            >
              SEND ANOTHER INQUIRY
            </button>
          </div>
        ) : (
          <form className="transmission-form" onSubmit={handleSubmit}>
            <div className="form-intro">
              <h2 id="inquiry-title" className="console-title">START A CONVERSATION</h2>
              <p className="console-desc">
                We design architecture, public instruments, and spatial environments for institutions and private commissioners worldwide.
              </p>
            </div>

            {/* Inquiry Category Selectors */}
            <div className="channel-select-group">
              <label className="field-label">NATURE OF INQUIRY</label>
              <div className="channel-chips">
                <button
                  type="button"
                  className={`channel-chip ${inquiryType === 'commission' ? 'active' : ''}`}
                  onClick={() => setInquiryType('commission')}
                >
                  ARCHITECTURAL COMMISSION
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
                  CURATORIAL / EXHIBITION
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="input-grid">
              <div className="field-box">
                <label htmlFor="sender-name" className="field-label">NAME / ORGANIZATION *</label>
                <input
                  id="sender-name"
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova / Studio Nord"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="console-input"
                />
              </div>

              <div className="field-box">
                <label htmlFor="sender-contact" className="field-label">EMAIL ADDRESS *</label>
                <input
                  id="sender-contact"
                  type="email"
                  required
                  placeholder="name@organization.com"
                  value={senderContact}
                  onChange={(e) => setSenderContact(e.target.value)}
                  className="console-input"
                />
              </div>
            </div>

            <div className="field-box">
              <label htmlFor="project-location" className="field-label">SITE LOCATION / TIMELINE (OPTIONAL)</label>
              <input
                id="project-location"
                type="text"
                placeholder="e.g. Kyoto, Japan / Spring 2027"
                value={projectLocation}
                onChange={(e) => setProjectLocation(e.target.value)}
                className="console-input"
              />
            </div>

            <div className="field-box">
              <label htmlFor="dispatch-msg" className="field-label">PROJECT BRIEF OR INQUIRY *</label>
              <textarea
                id="dispatch-msg"
                required
                rows={4}
                placeholder="Outline the site, programmatic requirements, or conceptual goals..."
                value={dispatchMessage}
                onChange={(e) => setDispatchMessage(e.target.value)}
                className="console-textarea"
              />
            </div>

            <div className="form-footer">
              <span className="studio-location-tag">STUDIO: ZÜRICH / KYOTO / OSLO</span>
              <button
                type="submit"
                className="transmit-submit-btn"
                disabled={submitting}
              >
                <span>{submitting ? 'SENDING...' : 'SEND INQUIRY'}</span>
                <Send size={13} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
