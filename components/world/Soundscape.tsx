'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

// Web Audio API ambient soundscape generator
// Completely zero external assets, generated procedurally in-browser
export function useSoundscape() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const lfoRef = useRef<OscillatorNode | null>(null);

  const stop = useCallback(() => {
    if (!audioCtxRef.current || !masterGainRef.current) return;
    const now = audioCtxRef.current.currentTime;
    masterGainRef.current.gain.cancelScheduledValues(now);
    masterGainRef.current.gain.setValueAtTime(masterGainRef.current.gain.value, now);
    masterGainRef.current.gain.linearRampToValueAtTime(0.0001, now + 1.2);

    setTimeout(() => {
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      oscillatorsRef.current = [];
      if (lfoRef.current) {
        try {
          lfoRef.current.stop();
          lfoRef.current.disconnect();
        } catch {}
      }
      setIsPlaying(false);
    }, 1300);
  }, []);

  const play = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Master gain
      const master = ctx.createGain();
      const now = ctx.currentTime;
      master.gain.setValueAtTime(0.0001, now);
      master.gain.linearRampToValueAtTime(0.08, now + 2.0); // Gentle ambient volume
      master.connect(ctx.destination);
      masterGainRef.current = master;

      // Filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, now);
      filter.Q.setValueAtTime(3.5, now);
      filter.connect(master);

      // Low frequency drone oscillators (Harmonic series around 108Hz)
      const freqs = [108, 108.4, 216.2, 324];
      const gains = [0.35, 0.35, 0.15, 0.08];

      oscillatorsRef.current = [];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        oscGain.gain.setValueAtTime(gains[idx], now);
        osc.connect(oscGain);
        oscGain.connect(filter);

        osc.start(now);
        oscillatorsRef.current.push(osc);
      });

      // LFO filter sweep for breathing atmosphere
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.08, now); // Slow 12-second cycle
      lfoGain.gain.setValueAtTime(90, now);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start(now);
      lfoRef.current = lfo;

      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  }, [isPlaying, play, stop]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return { isPlaying, toggle, play, stop };
}
