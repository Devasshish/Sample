import { useState, useEffect, useRef, useCallback } from 'react';
import { CHAPTERS } from '../data/storyData';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollVelocity, setScrollVelocity] = useState(0);

  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const lastStateUpdateRef = useRef(0);
  const rafRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  // Sync current chapter index smoothly based on progress range
  useEffect(() => {
    const idx = CHAPTERS.findIndex(ch => progress >= ch.range[0] && progress <= ch.range[1]);
    if (idx !== -1 && idx !== currentChapterIndex) {
      setCurrentChapterIndex(idx);
    }
  }, [progress, currentChapterIndex]);

  // Silky smooth critically damped spring loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime) => {
      const delta = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;

      const diff = targetProgressRef.current - progressRef.current;
      const velocity = Math.abs(diff);
      setScrollVelocity(Math.min(1, velocity * 4));

      if (velocity > 0.00002) {
        // High-precision smooth damping (feels like silky inertia)
        const lerpFactor = Math.min(1, delta * 9.0);
        progressRef.current += diff * lerpFactor;
        const newProg = Math.max(0, Math.min(1, progressRef.current));

        // Throttle updates to maintain smooth 60fps render
        const deltaSinceLast = Math.abs(newProg - lastStateUpdateRef.current);
        const isSettling = Math.abs(targetProgressRef.current - newProg) < 0.00008;

        if (deltaSinceLast >= 0.0015 || isSettling) {
          lastStateUpdateRef.current = newProg;
          setProgress(newProg);
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const updateTarget = useCallback((newTarget) => {
    targetProgressRef.current = Math.max(0, Math.min(1, newTarget));
    setIsScrolling(true);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 200);
  }, []);

  // Passive wheel & touch listeners with normalized smooth delta
  useEffect(() => {
    const onWheel = (e) => {
      // Normalize wheel delta across mouse wheel types (Firefox, Mac trackpad, standard PC wheel)
      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 16; // Line mode
      if (e.deltaMode === 2) dy *= 800; // Page mode
      
      // Clamp single impulse to prevent wild jumps
      const clampedDelta = Math.max(-120, Math.min(120, dy));
      const delta = clampedDelta * 0.00042;
      updateTarget(targetProgressRef.current + delta);
    };

    let touchStartY = 0;
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      const currentY = e.touches[0].clientY;
      const delta = (touchStartY - currentY) * 0.0014;
      touchStartY = currentY;
      updateTarget(targetProgressRef.current + delta);
    };

    const onKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        updateTarget(targetProgressRef.current + 0.06);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        updateTarget(targetProgressRef.current - 0.06);
      } else if (e.key === ' ') {
        e.preventDefault();
        // Spacebar warp boost
        updateTarget(targetProgressRef.current + 0.12);
      } else if (e.key >= '1' && e.key <= '5') {
        const chapterIdx = parseInt(e.key, 10) - 1;
        if (chapterIdx < CHAPTERS.length) {
          const ch = CHAPTERS[chapterIdx];
          const midPoint = (ch.range[0] + ch.range[1]) / 2;
          updateTarget(midPoint);
        }
      } else if (e.key === 'Home') {
        updateTarget(0);
      } else if (e.key === 'End') {
        updateTarget(1);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [updateTarget]);

  const scrollToChapter = useCallback((chapterIndex) => {
    if (chapterIndex >= 0 && chapterIndex < CHAPTERS.length) {
      const ch = CHAPTERS[chapterIndex];
      const target = ch.range[0] + 0.02;
      updateTarget(target);
    }
  }, [updateTarget]);

  return {
    progress,
    currentChapterIndex,
    currentChapter: CHAPTERS[currentChapterIndex] || CHAPTERS[0],
    isScrolling,
    scrollVelocity,
    scrollToChapter,
    setProgressDirect: updateTarget
  };
}
