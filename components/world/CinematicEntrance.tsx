'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export default function CinematicEntrance() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dismiss = useCallback((instant = false) => {
    try {
      sessionStorage.setItem('ana_entrance_dismissed', '1');
    } catch {}

    if (instant) {
      setIsOpen(true);
      return;
    }

    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
    }, 950);
  }, []);

  useEffect(() => {
    // Check if already dismissed this session
    try {
      const alreadyDismissed = sessionStorage.getItem('ana_entrance_dismissed');
      if (alreadyDismissed === '1') {
        setIsOpen(true);
        setMounted(true);
        return;
      }
    } catch {}

    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dismiss(true);
      setMounted(true);
      return;
    }

    setMounted(true);

    // Keyboard controls (Enter/Space opens, Escape skips instantly)
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        dismiss(true);
      } else if (e.key === 'Enter' || e.key === ' ') {
        dismiss(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dismiss]);

  // Subtle hand-etched celestial marks on the book cover doors
  useEffect(() => {
    if (!mounted || isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function drawCelestialMarks() {
      if (!ctx || !canvas) return;
      t += 0.005;

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Deep void book cloth tone
      ctx.fillStyle = '#060709';
      ctx.fillRect(0, 0, w, h);

      // Celestial coordinate rings (hand-scribed style)
      const rings = [0.18, 0.32, 0.44];
      const maxR = Math.min(w, h);

      ctx.save();
      ctx.strokeStyle = 'rgba(79, 209, 197, 0.14)';
      ctx.lineWidth = 0.8;
      ctx.setLineDash([3, 6]);

      rings.forEach((ratio, idx) => {
        const r = maxR * ratio;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();

        // Delicate degree ticks
        const ticks = 24;
        for (let i = 0; i < ticks; i++) {
          const angle = (i / ticks) * Math.PI * 2 + t * (idx % 2 === 0 ? 0.2 : -0.2);
          const x1 = cx + Math.cos(angle) * (r - 4);
          const y1 = cy + Math.sin(angle) * (r - 4);
          const x2 = cx + Math.cos(angle) * (r + 4);
          const y2 = cy + Math.sin(angle) * (r + 4);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      });
      ctx.restore();

      // Cardinal crosshairs
      ctx.strokeStyle = 'rgba(237, 235, 228, 0.09)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, cy - maxR * 0.46);
      ctx.lineTo(cx, cy + maxR * 0.46);
      ctx.moveTo(cx - maxR * 0.46, cy);
      ctx.lineTo(cx + maxR * 0.46, cy);
      ctx.stroke();

      // Subtle star constellation nodes
      const stars = [
        { x: cx - 140, y: cy - 90, r: 1.8 },
        { x: cx - 80, y: cy - 130, r: 2.2 },
        { x: cx + 70, y: cy - 110, r: 1.6 },
        { x: cx + 130, y: cy - 60, r: 2.4 },
        { x: cx - 110, y: cy + 120, r: 1.9 },
        { x: cx + 120, y: cy + 100, r: 2.1 },
      ];

      ctx.fillStyle = '#edebe4';
      stars.forEach((s, i) => {
        const pulse = Math.sin(t * 3 + i) * 0.4 + 1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * pulse, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 3 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(79, 209, 197, 0.08)';
        ctx.fill();
      });

      // Central seam dividing the two book covers
      ctx.strokeStyle = 'rgba(79, 209, 197, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, h);
      ctx.stroke();

      animId = requestAnimationFrame(drawCelestialMarks);
    }

    animId = requestAnimationFrame(drawCelestialMarks);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [mounted, isOpen]);

  if (!mounted || isOpen) return null;

  return (
    <div
      className={`cinematic-entrance ${isOpening ? 'opening' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Book Cover: Ana Sharma"
    >
      <canvas ref={canvasRef} className="entrance-canvas" />

      {/* Two doors (book cover halves) */}
      <div className="entrance-door door-left">
        <div className="door-panel" />
      </div>
      <div className="entrance-door door-right">
        <div className="door-panel" />
      </div>

      {/* Book Cover Title & Entry Prompt */}
      <div className="entrance-content">
        <div className="entrance-emblem">
          <span className="celestial-glyph">✦</span>
        </div>

        <h1 className="entrance-name">Ana Sharma</h1>
        <p className="entrance-sub mono">VOLUME 2026 · PERSONAL WEB SPACE</p>

        <button
          onClick={() => dismiss(false)}
          className="entrance-enter-btn mono"
          autoFocus
        >
          <span className="door-icon">◧</span> OPEN BOOK <span className="mono key-hint">[↵]</span>
        </button>

        <div className="entrance-skip-bar">
          <button
            onClick={() => dismiss(true)}
            className="entrance-skip-btn mono"
            title="Skip cover"
          >
            skip to content (esc) →
          </button>
        </div>
      </div>
    </div>
  );
}
