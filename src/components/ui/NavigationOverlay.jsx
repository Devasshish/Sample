import React from 'react';
import { CHAPTERS } from '../../data/storyData';

export function NavigationOverlay({
  currentChapterIndex,
  progress,
  onNavigateChapter
}) {
  return (
    <nav className="navigation-overlay" aria-label="Story Chapters Navigation">
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
              aria-label={`Jump to Chapter ${ch.number}: ${ch.title}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className="step-num">{ch.number}</span>
              <span className="step-name">{ch.title}</span>
              <span className="step-pip" />
            </button>
          );
        })}
      </div>

      {/* Global Scroll Progress Bar */}
      <div className="global-progress-bar-container">
        <div
          className="global-progress-fill"
          style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
        />
      </div>
    </nav>
  );
}
