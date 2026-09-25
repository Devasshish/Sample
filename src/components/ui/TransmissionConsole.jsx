import React, { useState, useEffect } from 'react';
import { X, Send, Radio, CheckCircle, ShieldCheck } from 'lucide-react';

export function TransmissionConsole({ isOpen, onClose, playChime }) {
  const [channel, setChannel] = useState('commission');
  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [dispatchMessage, setDispatchMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [transmitting, setTransmitting] = useState(false);

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

    setTransmitting(true);
    if (playChime) playChime(659.25, 1.2);

    setTimeout(() => {
      setTransmitting(false);
      setIsSent(true);
      if (playChime) playChime(880, 1.5);
    }, 1200);
  };

  const handleReset = () => {
    setIsSent(false);
    setSenderName('');
    setSenderContact('');
    setDispatchMessage('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="transmission-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="console-title"
      >
        <div className="transmission-header">
          <div className="transmission-status-tag">
            <Radio size={14} className="radio-pulse" />
            <span>FREQUENCY DISPATCH TERMINAL // CH-440</span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close Transmission Console"
          >
            <X size={18} />
          </button>
        </div>

        {isSent ? (
          <div className="transmission-success">
            <CheckCircle size={48} className="success-icon" />
            <h3 className="success-title">DISPATCH TRANSMITTED TO THE STRATA</h3>
            <p className="success-text">
              Frequency packet verified and inscribed onto the collective ledger. A cartographer from Atelier Strata will calibrate an acoustic response to <strong>{senderContact || 'your frequency'}</strong>.
            </p>
            <button
              type="button"
              className="success-btn"
              onClick={handleReset}
            >
              TRANSMIT ANOTHER DISPATCH
            </button>
          </div>
        ) : (
          <form className="transmission-form" onSubmit={handleSubmit}>
            <div className="form-intro">
              <h2 id="console-title" className="console-title">INITIATE STRATA TRANSMISSION</h2>
              <p className="console-desc">
                Broadcast an inquiry directly into our spatial research collective. All communications are decrypted and triaged across our four founding studios.
              </p>
            </div>

            {/* Channel Selectors */}
            <div className="channel-select-group">
              <label className="field-label">SELECT FREQUENCY BAND:</label>
              <div className="channel-chips">
                <button
                  type="button"
                  className={`channel-chip ${channel === 'commission' ? 'active' : ''}`}
                  onClick={() => setChannel('commission')}
                >
                  SPATIAL ARCHITECTURE
                </button>
                <button
                  type="button"
                  className={`channel-chip ${channel === 'research' ? 'active' : ''}`}
                  onClick={() => setChannel('research')}
                >
                  RESEARCH RESIDENCY
                </button>
                <button
                  type="button"
                  className={`channel-chip ${channel === 'dialogue' ? 'active' : ''}`}
                  onClick={() => setChannel('dialogue')}
                >
                  CURATORIAL INQUIRY
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="input-grid">
              <div className="field-box">
                <label htmlFor="sender-name" className="field-label">NAME / COLLECTIVE *</label>
                <input
                  id="sender-name"
                  type="text"
                  required
                  placeholder="e.g. Marina K. / Zaha Lab"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="console-input"
                />
              </div>

              <div className="field-box">
                <label htmlFor="sender-contact" className="field-label">RETURN FREQUENCY (EMAIL / TELECOM)</label>
                <input
                  id="sender-contact"
                  type="text"
                  placeholder="frequency@domain.org"
                  value={senderContact}
                  onChange={(e) => setSenderContact(e.target.value)}
                  className="console-input"
                />
              </div>
            </div>

            <div className="field-box">
              <label htmlFor="dispatch-msg" className="field-label">DISPATCH MANIFESTO / PROJECT BRIEF *</label>
              <textarea
                id="dispatch-msg"
                required
                rows={4}
                placeholder="Describe your site, inquiry, spatial parameters, or timeline..."
                value={dispatchMessage}
                onChange={(e) => setDispatchMessage(e.target.value)}
                className="console-textarea"
              />
            </div>

            <div className="form-footer">
              <div className="encryption-notice">
                <ShieldCheck size={14} />
                <span>SHA-256 SPATIAL ENCRYPTION ACTIVE</span>
              </div>
              <button
                type="submit"
                className="transmit-submit-btn"
                disabled={transmitting}
              >
                <Send size={15} />
                <span>{transmitting ? 'TRANSMITTING PACKET...' : 'TRANSMIT FREQUENCY'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
