import React from 'react';
import { Volume2, VolumeX, Eye, Zap, Compass } from 'lucide-react';

export function OrientationHeader({
  currentChapter,
  progress,
  isMuted,
  toggleMute,
  reducedMotion,
  toggleReducedMotion,
  onOpenTransmission
}) {
  const percent = Math.round(progress * 100);

  return (
    <header className="orientation-header">
      {/* Brand & Identity */}
      <div className="brand-group">
        <div className="brand-symbol">
          <span className="symbol-inner" />
        </div>
        <div className="brand-text">
          <span className="brand-title">ATELIER STRATA</span>
          <span className="brand-tag">SPATIAL POETICS & MINERAL COMPUTING</span>
        </div>
      </div>

      {/* Center Chapter Telemetry */}
      <div className="chapter-telemetry">
        <span className="telemetry-badge">{currentChapter.code}</span>
        <span className="telemetry-title">{currentChapter.title}</span>
        <span className="telemetry-coord">LOC // {percent.toString().padStart(2, '0')}%</span>
      </div>

      {/* Right Controls */}
      <div className="controls-group">
        {/* Audio Toggle */}
        <button
          type="button"
          className={`control-btn ${!isMuted ? 'active' : ''}`}
          onClick={toggleMute}
          title={isMuted ? 'Enable Generative Ambient Sound' : 'Mute Sound'}
          aria-label={isMuted ? 'Enable Sound' : 'Mute Sound'}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          <span className="control-label">{isMuted ? 'AUDIO OFF' : 'AUDIO LIVE'}</span>
        </button>

        {/* Motion Preference Toggle */}
        <button
          type="button"
          className={`control-btn ${reducedMotion ? 'active' : ''}`}
          onClick={toggleReducedMotion}
          title={reducedMotion ? 'Enable Full Cinematic Motion' : 'Reduce Camera Motion'}
          aria-label="Toggle Reduced Motion"
        >
          <Eye size={15} />
          <span className="control-label">{reducedMotion ? 'STATIC' : 'CINEMATIC'}</span>
        </button>

        {/* Transmission CTA */}
        <button
          type="button"
          className="cta-header-btn"
          onClick={onOpenTransmission}
        >
          <Zap size={14} />
          <span>TRANSMIT</span>
        </button>
      </div>
    </header>
  );
}
