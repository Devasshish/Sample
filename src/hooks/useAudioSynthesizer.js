import { useState, useRef, useEffect, useCallback } from 'react';

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
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Create warm ambient drone layers (Fundamental D: 55Hz, 110Hz, 164.8Hz, 220Hz, 329.6Hz)
      const freqs = [55, 110, 164.81, 220, 329.63];
      const nodes = freqs.map((freq, i) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320 + i * 80, ctx.currentTime);
        filter.Q.setValueAtTime(2.0, ctx.currentTime);

        const individualVolume = 0.05 / (i + 1);
        gain.gain.setValueAtTime(individualVolume, ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        osc.start();
        return { osc, filter, gain };
      });

      droneNodesRef.current = nodes;
    } catch (e) {
      console.warn('Web Audio not supported or failed to initialize', e);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      initAudio();
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.linearRampToValueAtTime(0.25, audioCtxRef.current.currentTime + 1.2);
      }
      setIsMuted(false);
    } else {
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.6);
      }
      setIsMuted(true);
    }
  }, [isMuted, initAudio]);

  const playChime = useCallback((freq = 523.25, duration = 0.8) => {
    if (isMuted || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq * 1.5, ctx.currentTime);
      filter.Q.setValueAtTime(3.0, ctx.currentTime);

      gain.gain.setValueAtTime(0.07, ctx.currentTime);
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

  const playTransitionSound = useCallback(() => {
    if (isMuted || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(65.4, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(130.8, ctx.currentTime + 1.0);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(450, ctx.currentTime + 0.8);
      filter.frequency.linearRampToValueAtTime(120, ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGainRef.current || ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
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
