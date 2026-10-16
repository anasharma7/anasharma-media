'use client';

import { useState, useEffect, useRef } from 'react';

type LabMode = 'attractor' | 'synaptic' | 'glyph';

export default function CreativeLab() {
  const [mode, setMode] = useState<LabMode>('attractor');
  const [paramChaos, setParamChaos] = useState(1.4);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = 420);

    function resize() {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 700;
      height = canvas.height = 420;
    }
    window.addEventListener('resize', resize);

    // Mode-specific state
    let t = 0;

    // Attractor state
    let a = -1.4 * paramChaos;
    let b = 1.6;
    let c = 1.0;
    let d = 0.7;

    // Synaptic nodes
    const nodeCount = 32;
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number; pulse: number }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 2 + 2,
        pulse: Math.random(),
      });
    }

    // Glyph particles
    const glyphChars = '01AIψλΩ∞⌘✦◊∇∑§';
    const glyphs: { x: number; y: number; char: string; vy: number; alpha: number }[] = [];
    for (let i = 0; i < 45; i++) {
      glyphs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        char: glyphChars[Math.floor(Math.random() * glyphChars.length)],
        vy: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.7 + 0.2,
      });
    }

    function render() {
      if (!ctx || !canvas) return;
      t += 0.015;

      if (mode === 'attractor') {
        // Soft trail fade
        ctx.fillStyle = 'rgba(10, 11, 13, 0.22)';
        ctx.fillRect(0, 0, width, height);

        // Dynamically perturb coefficients based on mouse
        if (mouseRef.current.isDown) {
          a = ((mouseRef.current.x / width) * 4 - 2) * paramChaos;
          b = ((mouseRef.current.y / height) * 4 - 2);
        } else {
          a = (-1.4 + Math.sin(t * 0.4) * 0.25) * paramChaos;
          b = 1.6 + Math.cos(t * 0.3) * 0.2;
        }

        let px = 0.1;
        let py = 0.1;
        const scale = Math.min(width, height) * 0.24;
        const cx = width / 2;
        const cy = height / 2;

        ctx.fillStyle = 'rgba(79, 209, 197, 0.4)';
        for (let i = 0; i < 1800; i++) {
          const nx = Math.sin(a * py) + c * Math.cos(a * px);
          const ny = Math.sin(b * px) + d * Math.cos(b * py);
          px = nx;
          py = ny;

          const screenX = cx + px * scale;
          const screenY = cy + py * scale;
          ctx.fillRect(screenX, screenY, 1.2, 1.2);
        }
      } else if (mode === 'synaptic') {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#0a0b0d';
        ctx.fillRect(0, 0, width, height);

        // Update nodes
        nodes.forEach((n, i) => {
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 10 || n.x > width - 10) n.vx *= -1;
          if (n.y < 10 || n.y > height - 10) n.vy *= -1;

          // Mouse attraction
          const mdx = mouseRef.current.x - n.x;
          const mdy = mouseRef.current.y - n.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 140 && mdist > 0) {
            n.x += (mdx / mdist) * 1.5;
            n.y += (mdy / mdist) * 1.5;
            n.pulse = 1;
          }

          if (n.pulse > 0) n.pulse -= 0.02;

          // Connect
          for (let j = i + 1; j < nodes.length; j++) {
            const n2 = nodes[j];
            const dx = n.x - n2.x;
            const dy = n.y - n2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 110) {
              const alpha = (1 - dist / 110) * 0.45;
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + n.pulse * 2, 0, Math.PI * 2);
          ctx.fillStyle = n.pulse > 0.2 ? '#ff4433' : '#4fd1c5';
          ctx.fill();
        });
      } else {
        // Glyph Loom
        ctx.fillStyle = 'rgba(10, 11, 13, 0.35)';
        ctx.fillRect(0, 0, width, height);

        ctx.font = '14px "JetBrains Mono", monospace';
        glyphs.forEach((g) => {
          g.y += g.vy;
          if (g.y > height + 20) {
            g.y = -10;
            g.x = Math.random() * width;
            g.char = glyphChars[Math.floor(Math.random() * glyphChars.length)];
          }

          // Mouse deflection
          const dx = g.x - mouseRef.current.x;
          const dy = g.y - mouseRef.current.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 80 && d > 0) {
            g.x += (dx / d) * 4;
          }

          ctx.fillStyle = `rgba(79, 209, 197, ${g.alpha})`;
          ctx.fillText(g.char, g.x, g.y);
        });
      }

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    function onMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    }
    function onMouseDown() {
      mouseRef.current.isDown = true;
    }
    function onMouseUp() {
      mouseRef.current.isDown = false;
    }

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animId);
    };
  }, [mode, paramChaos]);

  return (
    <div className="creative-lab-card">
      <div className="creative-lab-header">
        <div className="lab-title-group">
          <span className="live-dot" />
          <h3 className="mono">CREATIVE CODE LAB · REAL-TIME GENERATIVE WORKSHOP</h3>
        </div>

        <div className="lab-controls">
          <button
            className={`lab-tab mono ${mode === 'attractor' ? 'active' : ''}`}
            onClick={() => setMode('attractor')}
          >
            01 Attractor Drift
          </button>
          <button
            className={`lab-tab mono ${mode === 'synaptic' ? 'active' : ''}`}
            onClick={() => setMode('synaptic')}
          >
            02 Synaptic Mesh
          </button>
          <button
            className={`lab-tab mono ${mode === 'glyph' ? 'active' : ''}`}
            onClick={() => setMode('glyph')}
          >
            03 Glyph Loom
          </button>
        </div>
      </div>

      <div className="creative-lab-canvas-frame">
        <canvas ref={canvasRef} />
        <div className="creative-lab-overlay-hud mono">
          <span>DRAG / HOVER TO PERTURB SYSTEM</span>
          {mode === 'attractor' && (
            <div className="chaos-slider-wrap">
              <span>CHAOS:</span>
              <input
                type="range"
                min="0.8"
                max="2.2"
                step="0.1"
                value={paramChaos}
                onChange={(e) => setParamChaos(parseFloat(e.target.value))}
              />
              <span>{paramChaos.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
