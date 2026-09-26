import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

export function LoadingScreen({ onLoaded }) {
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState('INITIALIZING ZERO-G COMPUTATION');
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const phases = [
      'INITIALIZING ZERO-G COMPUTATION',
      'SYNCHRONIZING 3D SPATIAL PARTICLES',
      'CALIBRATING 5 OPERATIVE TOTEMS',
      'CHARGING WARP CONVERGENCE GATE',
      'SYNDICATE REALITY READY'
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 9) + 6;
      if (current >= 100) {
        current = 100;
        setPercent(100);
        setPhase('WARP DRIVE ONLINE');
        clearInterval(interval);
        setTimeout(() => setFadeOut(true), 250);
        setTimeout(() => onLoaded(), 650);
      } else {
        setPercent(current);
        const phaseIdx = Math.min(phases.length - 1, Math.floor((current / 100) * phases.length));
        setPhase(phases[phaseIdx]);
      }
    }, 32);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loader-center-box">
        <div className="loader-monogram">
          <Zap size={28} className="loader-icon" />
        </div>

        <div className="loader-brand">KINESIS // 09</div>
        <div className="loader-sub">ZERO-G DIGITAL CREATIVE SYNDICATE</div>

        <div className="loader-phase">{phase}</div>

        <div className="loader-progress-track">
          <div className="loader-progress-fill" style={{ width: `${percent}%` }} />
        </div>

        <div className="loader-percent">{percent.toString().padStart(2, '0')}%</div>
      </div>
    </div>
  );
}
