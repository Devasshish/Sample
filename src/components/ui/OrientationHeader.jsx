import React from 'react';
import { Volume2, VolumeX, Eye, ArrowUpRight } from 'lucide-react';

export function OrientationHeader({
  currentChapter,
  progress,
  isMuted,
  toggleMute,
  reducedMotion,
  toggleReducedMotion,
  onOpenTransmission
}) {
  return (
    <header className="orientation-header">
      {/* Brand & Studio Identity */}
      <div className="brand-group">
        <div className="brand-monogram">LL</div>
        <div className="brand-text">
          <span className="brand-title">THE LAST LIGHT</span>
          <span className="brand-tag">DESIGN & SPATIAL LABORATORY</span>
        </div>
      </div>

      {/* Center Cinematic Timeline & Phase */}
      <div className="chapter-timeline-badge">
        <span className="time-code">{currentChapter.time || '03:14 AM'}</span>
        <span className="timeline-divider">/</span>
        <span className="timeline-chapter-name">{currentChapter.title}</span>
      </div>

      {/* Right Restrained Controls */}
      <div className="controls-group">
        {/* Audio Ambient Toggle */}
        <button
          type="button"
          className={`control-btn ${!isMuted ? 'active' : ''}`}
          onClick={toggleMute}
          title={isMuted ? 'Enable Ambient Studio Tone' : 'Mute Tone'}
          aria-label={isMuted ? 'Enable Sound' : 'Mute Sound'}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          <span className="control-label">{isMuted ? 'SOUND OFF' : 'SOUND ON'}</span>
        </button>

        {/* Motion Preference Toggle */}
        <button
          type="button"
          className={`control-btn ${reducedMotion ? 'active' : ''}`}
          onClick={toggleReducedMotion}
          title={reducedMotion ? 'Enable Full Cinematic Motion' : 'Reduce Motion'}
          aria-label="Toggle Reduced Motion"
        >
          <Eye size={14} />
          <span className="control-label">{reducedMotion ? 'STATIC' : 'CINEMA'}</span>
        </button>

        {/* Inquiries Action */}
        <button
          type="button"
          className="cta-inquiry-btn"
          onClick={onOpenTransmission}
        >
          <span>INQUIRIES</span>
          <ArrowUpRight size={13} />
        </button>
      </div>
    </header>
  );
}
