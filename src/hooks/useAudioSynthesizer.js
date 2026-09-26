import { useState, useRef, useCallback } from 'react';

export function useAudioSynthesizer() {
  const [isMuted, setIsMuted] = useState(true);
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const droneNodesRef = useRef([]);

  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Deep, futuristic cyber-atmospheric drone (C minor / Blade Runner style warm detuned synth frequencies)
      const droneFreqs = [55.0, 82.41, 110.0, 164.81, 220.0];
      const nodes = droneFreqs.map((freq, i) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = i % 2 === 0 ? 'sawtooth' : 'sine';
        osc.frequency.setValueAtTime(freq + (i * 0.4), ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(180 + i * 50, ctx.currentTime);
        filter.Q.setValueAtTime(2.5, ctx.currentTime);

        // Low volume for comfortable ambient drone
        const individualVolume = 0.035 / (i + 1);
        gain.gain.setValueAtTime(individualVolume, ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        osc.start();
        return { osc, filter, gain };
      });

      droneNodesRef.current = nodes;
    } catch (e) {
      console.warn('Web Audio not supported', e);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      initAudio();
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.linearRampToValueAtTime(0.24, audioCtxRef.current.currentTime + 1.0);
      }
      setIsMuted(false);
    } else {
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.5);
      }
      setIsMuted(true);
    }
  }, [isMuted, initAudio]);

  // Futuristic holographic laser chime / UI feedback
  const playChime = useCallback((freq = 523.25, duration = 0.8) => {
    if (isMuted || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.1);
      osc.frequency.exponentialRampToValueAtTime(freq, ctx.currentTime + duration);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq * 2, ctx.currentTime);
      filter.Q.setValueAtTime(3.0, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGainRef.current || ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // safe fallback
    }
  }, [isMuted]);

  // Sci-Fi Warp sweep on sector shift
  const playTransitionSound = useCallback(() => {
    if (isMuted || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(130, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.35);
      osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.7);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(500, ctx.currentTime);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.7);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGainRef.current || ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.7);
    } catch (e) {
      // safe fallback
    }
  }, [isMuted]);

  return {
    isMuted,
    toggleMute,
    playChime,
    playTransitionSound
  };
}
