import React from 'react';
import { Volume2, VolumeX, Eye, Radio, Sparkles } from 'lucide-react';
import { TEAM_MEMBERS } from '../../data/teamData';

export function OrientationHeader({
  currentChapter,
  progress,
  isMuted,
  toggleMute,
  reducedMotion,
  toggleReducedMotion,
  onOpenTransmission,
  onSelectMember,
  selectedMember
}) {
  return (
    <header className="orientation-header">
      {/* Brand & Syndicate Identity */}
      <div className="brand-group">
        <div className="brand-monogram">
          <span className="brand-symbol">K</span>
          <span className="brand-pulse-dot" />
        </div>
        <div className="brand-text">
          <span className="brand-title">KINESIS // 09</span>
          <span className="brand-tag">ZERO-G DIGITAL SYNDICATE</span>
        </div>
      </div>

      {/* Operative Quick Jump Selector Pills */}
      <div className="operatives-quick-nav">
        {TEAM_MEMBERS.map((m) => {
          const isSelected = selectedMember?.id === m.id;
          return (
            <button
              key={m.id}
              type="button"
              className={`operative-pill ${isSelected ? 'active' : ''}`}
              style={{
                '--pill-color': m.color
              }}
              onClick={() => onSelectMember(m)}
              title={`Inspect ${m.name}`}
            >
              <span className="pill-dot" />
              <span className="pill-name">{m.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Sector Live Telemetry */}
      <div className="chapter-timeline-badge">
        <span className="time-code">{currentChapter.code || 'SEC.01'}</span>
        <span className="timeline-divider">/</span>
        <span className="timeline-chapter-name">{currentChapter.title}</span>
      </div>

      {/* Controls & Transmission Button */}
      <div className="controls-group">
        {/* Audio Ambient Toggle with Visualizer Bars */}
        <button
          type="button"
          className={`control-btn ${!isMuted ? 'active' : ''}`}
          onClick={toggleMute}
          title={isMuted ? 'Engage Cyber Sound Engine' : 'Mute Sound'}
          aria-label={isMuted ? 'Enable Sound' : 'Mute Sound'}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          {!isMuted && (
            <div className="audio-bars">
              <span className="bar bar-1" />
              <span className="bar bar-2" />
              <span className="bar bar-3" />
            </div>
          )}
          <span className="control-label">{isMuted ? 'AUDIO OFF' : 'AUDIO LIVE'}</span>
        </button>

        {/* Motion Preference Toggle */}
        <button
          type="button"
          className={`control-btn ${reducedMotion ? 'active' : ''}`}
          onClick={toggleReducedMotion}
          title={reducedMotion ? 'Enable Full Hyper Motion' : 'Reduce Motion'}
          aria-label="Toggle Reduced Motion"
        >
          <Eye size={14} />
          <span className="control-label">{reducedMotion ? 'STATIC' : 'HYPER'}</span>
        </button>

        {/* Transmit Action */}
        <button
          type="button"
          className="cta-inquiry-btn"
          onClick={onOpenTransmission}
        >
          <Radio size={13} className="transmit-icon" />
          <span>TRANSMIT</span>
        </button>
      </div>
    </header>
  );
}
