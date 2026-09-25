import React, { useState, useEffect } from 'react';

export function LoadingScreen({ onLoaded }) {
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState('PREPARING THE WORKSHOP');
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const phases = [
      'PREPARING THE WORKSHOP',
      'ALIGNING PHYSICAL MATERIALS & SAMPLES',
      'CALIBRATING DAYLIGHT CHOREOGRAPHY',
      'ENTERING THE STUDIO — 02:47 AM'
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 5;
      if (current >= 100) {
        current = 100;
        setPercent(100);
        setPhase('STUDIO READY');
        clearInterval(interval);
        setTimeout(() => setFadeOut(true), 350);
        setTimeout(() => onLoaded(), 850);
      } else {
        setPercent(current);
        const phaseIdx = Math.min(phases.length - 1, Math.floor((current / 100) * phases.length));
        setPhase(phases[phaseIdx]);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loader-center-box">
        <div className="loader-monogram">LL</div>

        <div className="loader-brand">THE LAST LIGHT</div>
        <div className="loader-sub">SPATIAL LABORATORY & ARCHITECTURE</div>

        <div className="loader-phase">{phase}</div>

        <div className="loader-progress-track">
          <div className="loader-progress-fill" style={{ width: `${percent}%` }} />
        </div>

        <div className="loader-percent">{percent.toString().padStart(2, '0')}%</div>
      </div>
    </div>
  );
}
