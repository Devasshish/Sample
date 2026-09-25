import React, { useState, useEffect } from 'react';

export function LoadingScreen({ onLoaded }) {
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState('CALIBRATING GRAVITATIONAL FIELD');
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const phases = [
      'CALIBRATING GRAVITATIONAL FIELD',
      'ALIGNING TECTONIC MONOLITHS',
      'GENERATING ACOUSTIC RESONANCE',
      'ENTERING ATELIER STRATA'
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4;
      if (current >= 100) {
        current = 100;
        setPercent(100);
        setPhase('EXPERIENCE SYNCHRONIZED');
        clearInterval(interval);
        setTimeout(() => setFadeOut(true), 400);
        setTimeout(() => onLoaded(), 900);
      } else {
        setPercent(current);
        const phaseIdx = Math.min(phases.length - 1, Math.floor((current / 100) * phases.length));
        setPhase(phases[phaseIdx]);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loader-center-box">
        <div className="loader-emblem">
          <div className="emblem-spinner" />
          <div className="emblem-dot" />
        </div>

        <div className="loader-brand">ATELIER STRATA</div>
        <div className="loader-phase">{phase}</div>

        <div className="loader-progress-track">
          <div className="loader-progress-fill" style={{ width: `${percent}%` }} />
        </div>

        <div className="loader-percent">{percent.toString().padStart(2, '0')}%</div>
      </div>
    </div>
  );
}
