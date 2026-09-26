import React, { useRef } from 'react';
import { CHAPTERS } from '../../data/storyData';

export function NavigationOverlay({
  currentChapterIndex,
  progress,
  onNavigateChapter,
  onScrub
}) {
  const barRef = useRef(null);

  const handleBarClick = (e) => {
    if (!barRef.current || !onScrub) return;
    const rect = barRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    onScrub(newProgress);
  };

  return (
    <nav className="navigation-overlay" aria-label="Syndicate Sector Navigation">
      {/* Chapter Indicator Bar */}
      <div className="chapter-track">
        {CHAPTERS.map((ch, index) => {
          const isActive = index === currentChapterIndex;
          const isPassed = progress > ch.range[1];

          return (
            <button
              key={ch.id}
              type="button"
              className={`chapter-step-btn ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
              onClick={() => onNavigateChapter(index)}
              aria-label={`Jump to Sector ${ch.number}: ${ch.title}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className="step-num">{ch.number}</span>
              <span className="step-name">{ch.title}</span>
              <span className="step-pip" />
            </button>
          );
        })}
      </div>

      {/* Interactive Global Scroll Scrubber */}
      <div
        ref={barRef}
        className="global-progress-bar-container"
        onClick={handleBarClick}
        title="Click to jump timeline"
      >
        <div
          className="global-progress-fill"
          style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
        />
        <div
          className="scrubber-handle"
          style={{ left: `${Math.min(100, Math.max(0, progress * 100))}%` }}
        />
      </div>

      {/* Telemetry Status Bar */}
      <div className="navigation-footer-status">
        <div className="status-percent">
          <span className="live-orbit-dot" />
          <span>{Math.round(progress * 100)}% VECTOR</span>
        </div>
        <div className="keyboard-hints">
          <span className="key-chip">1-5</span> SECTORS
          <span className="chip-sep">•</span>
          <span className="key-chip">SPACE</span> WARP
          <span className="chip-sep">•</span>
          <span>CLICK 3D ARTIFACTS</span>
        </div>
      </div>
    </nav>
  );
}
