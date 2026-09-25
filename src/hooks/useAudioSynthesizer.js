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

      // Warm, organic late-night studio drone (Eb major / C minor warm harmonics: 65.4Hz, 98Hz, 130.8Hz, 196Hz, 261.6Hz)
      const freqs = [65.41, 98.0, 130.81, 196.0, 261.63];
      const nodes = freqs.map((freq, i) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(240 + i * 40, ctx.currentTime);
        filter.Q.setValueAtTime(1.2, ctx.currentTime);

        const individualVolume = 0.04 / (i + 1);
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
        masterGainRef.current.gain.linearRampToValueAtTime(0.22, audioCtxRef.current.currentTime + 1.2);
      }
      setIsMuted(false);
    } else {
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.6);
      }
      setIsMuted(true);
    }
  }, [isMuted, initAudio]);

  // Soft tactile studio acoustic chime / warm bell
  const playChime = useCallback((freq = 440, duration = 1.0) => {
    if (isMuted || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 1.8, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
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

  // Soft tactile lamp switch / room tone shift on chapter changes
  const playTransitionSound = useCallback(() => {
    if (isMuted || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(110, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(82.4, ctx.currentTime + 0.6);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(260, ctx.currentTime);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGainRef.current || ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.6);
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
