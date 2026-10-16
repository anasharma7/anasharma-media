'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import DestinationTransition from './DestinationTransition';

type WorldDestination = {
  id: string;
  name: string;
  sub: string;
  href: string;
  accent: string;
  badge: string;
  description: string;
  entrancePrompt: string;
};

const DESTINATIONS: WorldDestination[] = [
  {
    id: 'doomscroll',
    name: 'doomscroll.txt',
    sub: 'THE READING WORLD',
    href: '/read',
    accent: '#4fd1c5',
    badge: '01 · EDITORIAL & FIELD NOTES',
    description:
      'Essays on cognition and technology, hand-curated field observations, live news wires, and real-time celestial transits.',
    entrancePrompt: 'ENTER READING CHAMBER →',
  },
  {
    id: 'studio',
    name: 'Mixmedia Studio',
    sub: 'THE VISUAL WORLD',
    href: '/studio',
    accent: '#8e78ff',
    badge: '02 · CODE & VISUAL WORKSPACE',
    description:
      'In-browser generative code experiments, parameter chaos controls, and space for Procreate and iPad studies.',
    entrancePrompt: 'STEP INTO STUDIO →',
  },
  {
    id: 'playground',
    name: 'The Playground',
    sub: 'GAMES & SIMULATIONS',
    href: '/games',
    accent: '#e8b84f',
    badge: '03 · PLAYABLE SYSTEMS',
    description:
      'Interactive games and experiments. Collide machine concepts with human memories, test cadence reflexes, and catch signals.',
    entrancePrompt: 'LAUNCH PLAYGROUND →',
  },
];

/* Distinct Canvas Previews for each destination */
function DestinationPreview({ id, accent }: { id: string; accent: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;
    const w = (canvas.width = 360);
    const h = (canvas.height = 190);

    function render() {
      if (!ctx || !canvas) return;
      t += 0.018;
      ctx.clearRect(0, 0, w, h);

      // Deep void background
      ctx.fillStyle = '#07080b';
      ctx.fillRect(0, 0, w, h);

      if (id === 'doomscroll') {
        // Celestial Arc + Editorial Scanlines
        const cx = w * 0.75;
        const cy = h * 0.5;
        const r = 64;

        // Faint celestial degree ring
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(79, 209, 197, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Moving orbital planet node
        const planetAngle = t * 0.6;
        const px = cx + Math.cos(planetAngle) * r;
        const py = cy + Math.sin(planetAngle) * r;
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#4fd1c5';
        ctx.fill();

        // Delicate editorial text scanlines
        ctx.fillStyle = 'rgba(237, 235, 228, 0.25)';
        for (let y = 36; y < h - 30; y += 14) {
          const lineW = 90 + Math.sin(y + t) * 20;
          ctx.fillRect(24, y, lineW, 2);
        }

        // Live dot beacon
        ctx.beginPath();
        ctx.arc(26, 22, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ff4433';
        ctx.fill();

        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(79, 209, 197, 0.7)';
        ctx.fillText('SIGNAL STREAM · 2026', 36, 25);
      } else if (id === 'studio') {
        // Generative Harmonic Attractor Lines
        const cx = w / 2;
        const cy = h / 2;
        ctx.beginPath();
        for (let i = 0; i < 220; i++) {
          const a = (i / 220) * Math.PI * 2;
          const rad = 45 + Math.sin(a * 4 + t) * 18 + Math.cos(a * 2 - t * 0.5) * 12;
          const x = cx + Math.cos(a) * rad * 1.5;
          const y = cy + Math.sin(a) * rad;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(142, 120, 255, 0.65)';
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Inner secondary harmonic curve
        ctx.beginPath();
        for (let i = 0; i < 180; i++) {
          const a = (i / 180) * Math.PI * 2;
          const rad = 25 + Math.sin(a * 3 - t * 1.2) * 10;
          const x = cx + Math.cos(a) * rad * 1.3;
          const y = cy + Math.sin(a) * rad;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(79, 209, 197, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(142, 120, 255, 0.8)';
        ctx.fillText('REALTIME CANVAS MATH', 20, h - 16);
      } else {
        // The Playground: Kinetic Particle Collider & Target Reticles
        const cx = w / 2;
        const cy = h / 2;

        // Crosshair reticle
        ctx.strokeStyle = 'rgba(232, 184, 79, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx - 30, cy);
        ctx.lineTo(cx + 30, cy);
        ctx.moveTo(cx, cy - 30);
        ctx.lineTo(cx, cy + 30);
        ctx.stroke();

        // Colliding particle points
        const count = 14;
        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2 + t * 0.8;
          const dist = 20 + ((t * 40 + i * 15) % 65);
          const px = cx + Math.cos(angle) * dist;
          const py = cy + Math.sin(angle) * dist;

          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? '#e8b84f' : '#ff4433';
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = `rgba(232, 184, 79, ${0.15 * (1 - dist / 70)})`;
          ctx.stroke();
        }

        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(232, 184, 79, 0.8)';
        ctx.fillText('KINETIC SIMULATION', 20, h - 16);
      }

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [id, accent]);

  return (
    <div className="dest-preview-frame">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default function WorldSelection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
const [activeDestination, setActiveDestination] =
  useState<WorldDestination | null>(null);

const handleTransitionComplete = useCallback(() => {
  setActiveDestination(null);
}, []);

  return (
    <div className="world-selection-wrapper">
      <header className="selection-header">
        <div className="selection-badge mono">
          <span className="live-dot pulse-active" />
          THREE DESTINATIONS
        </div>
        <h2 className="selection-headline">Select a world to enter</h2>
        <p className="selection-subtext">
          A personal space exploring language, code, visual studies, and the cosmos.
          Each destination is its own focused environment.
        </p>
      </header>

      <div className="destinations-grid">
        {DESTINATIONS.map((dest) => (
          <article
            key={dest.id}
            className={`destination-card ${hoveredId === dest.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredId(dest.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <Link
  href={dest.href}
  className="destination-card-link"
  onClick={(event) => {
    if (activeDestination) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    setActiveDestination(dest);
  }}
>
              <div className="card-top-bar mono">
                <span className="dest-badge" style={{ color: dest.accent }}>
                  {dest.badge}
                </span>
                <span className="dest-arrow">ENTER ↗</span>
              </div>

              {/* Distinct Visual Preview */}
              <DestinationPreview id={dest.id} accent={dest.accent} />

              <div className="card-info">
                <div className="dest-sub mono" style={{ color: dest.accent }}>
                  {dest.sub}
                </div>
                <h3 className="dest-title">{dest.name}</h3>
                <p className="dest-desc">{dest.description}</p>
              </div>

              <div className="card-bottom-bar mono">
                <span className="dest-action" style={{ color: dest.accent }}>
                  {dest.entrancePrompt}
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
      {activeDestination && (
        <DestinationTransition
          destination={activeDestination}
          onComplete={handleTransitionComplete}
        />
      )}
    </div>
  );
}
