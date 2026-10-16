'use client';

import { useState, useEffect, useRef } from 'react';
import {
  PLANETARY_TRANSITS_2026,
  MAJOR_ASPECTS_2026,
  ZODIAC_SIGNS,
  type PlanetTransit,
} from '@/lib/ephemeris2026';

export default function CelestialSketchbook() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetTransit>(PLANETARY_TRANSITS_2026[6]); // Saturn default
  const [viewMode, setViewMode] = useState<'chart' | 'ephemeris'>('chart');
  const [showAspects, setShowAspects] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverPlanetRef = useRef<PlanetTransit | null>(null);

  useEffect(() => {
    if (viewMode !== 'chart') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    function resize() {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect();
      const size = Math.min(rect?.width || 680, 680);
      canvas.width = size;
      canvas.height = size;
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      if (!ctx || !canvas) return;
      t += 0.008;

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const outerR = Math.min(w, h) * 0.44;
      const innerR = outerR * 0.78;
      const centerR = outerR * 0.22;

      ctx.clearRect(0, 0, w, h);

      // Deep void background
      ctx.fillStyle = '#08090c';
      ctx.fillRect(0, 0, w, h);

      // Outer parchment border (hand-drawn subtle double ring)
      ctx.save();
      ctx.strokeStyle = 'rgba(79, 209, 197, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, outerR + 4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(237, 235, 228, 0.08)';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(79, 209, 197, 0.15)';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, centerR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(237, 235, 228, 0.12)';
      ctx.stroke();
      ctx.restore();

      // Draw 12 Zodiac segments
      ZODIAC_SIGNS.forEach((sign, i) => {
        // Geocentric astrological wheel: 0° Aries starts at East/Left (180° in standard math) or standard top
        // Standard astronomical wheel: Aries at 180° (equinox) or 0° counter-clockwise
        const angleStart = (sign.startDeg * Math.PI) / 180 - Math.PI / 2;
        const angleEnd = ((sign.startDeg + 30) * Math.PI) / 180 - Math.PI / 2;

        // Radial boundary spoke
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angleStart) * innerR, cy + Math.sin(angleStart) * innerR);
        ctx.lineTo(cx + Math.cos(angleStart) * outerR, cy + Math.sin(angleStart) * outerR);
        ctx.strokeStyle = 'rgba(35, 37, 41, 0.9)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Sign symbol in the zodiac ring
        const midAngle = (angleStart + angleEnd) / 2;
        const symR = (innerR + outerR) / 2;
        const symX = cx + Math.cos(midAngle) * symR;
        const symY = cy + Math.sin(midAngle) * symR;

        ctx.font = '13px "JetBrains Mono", monospace';
        ctx.fillStyle = sign.element === 'Fire' ? '#ff4433' : sign.element === 'Air' ? '#4fd1c5' : sign.element === 'Water' ? '#818cf8' : '#e8b84f';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(sign.symbol, symX, symY);
      });

      // Subtle degree ticks (360 degrees)
      ctx.save();
      ctx.strokeStyle = 'rgba(237, 235, 228, 0.08)';
      ctx.lineWidth = 0.5;
      for (let deg = 0; deg < 360; deg += 5) {
        const rad = (deg * Math.PI) / 180 - Math.PI / 2;
        const tickLen = deg % 30 === 0 ? 8 : deg % 10 === 0 ? 5 : 2;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(rad) * (outerR - tickLen), cy + Math.sin(rad) * (outerR - tickLen));
        ctx.lineTo(cx + Math.cos(rad) * outerR, cy + Math.sin(rad) * outerR);
        ctx.stroke();
      }
      ctx.restore();

      // Aspect lines in the central chamber
      if (showAspects) {
        MAJOR_ASPECTS_2026.forEach((asp) => {
          const p1 = PLANETARY_TRANSITS_2026.find((p) => p.name === asp.planet1);
          const p2 = PLANETARY_TRANSITS_2026.find((p) => p.name === asp.planet2);
          if (!p1 || !p2) return;

          const a1 = (p1.eclipticLon * Math.PI) / 180 - Math.PI / 2;
          const a2 = (p2.eclipticLon * Math.PI) / 180 - Math.PI / 2;

          const x1 = cx + Math.cos(a1) * (innerR - 10);
          const y1 = cy + Math.sin(a1) * (innerR - 10);
          const x2 = cx + Math.cos(a2) * (innerR - 10);
          const y2 = cy + Math.sin(a2) * (innerR - 10);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = asp.color;
          ctx.lineWidth = asp.type === 'Conjunction' ? 1.6 : 0.9;
          if (asp.type === 'Conjunction') {
            ctx.setLineDash([]);
          } else if (asp.type === 'Trine') {
            ctx.setLineDash([4, 4]);
          } else {
            ctx.setLineDash([2, 4]);
          }
          ctx.stroke();
          ctx.setLineDash([]);
        });
      }

      // Draw Planets on the Wheel
      PLANETARY_TRANSITS_2026.forEach((p) => {
        const rad = (p.eclipticLon * Math.PI) / 180 - Math.PI / 2;
        const planetR = innerR - 22;
        const px = cx + Math.cos(rad) * planetR;
        const py = cy + Math.sin(rad) * planetR;

        const isSelected = selectedPlanet?.name === p.name;
        const isHovered = hoverPlanetRef.current?.name === p.name;

        // Retrograde loop trail if planet is Rx
        if (p.isRetrograde) {
          ctx.beginPath();
          ctx.ellipse(px, py, 10, 6, rad + t, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 68, 51, 0.35)';
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }

        // Selection highlight ring
        if (isSelected || isHovered) {
          ctx.beginPath();
          ctx.arc(px, py, 14, 0, Math.PI * 2);
          ctx.strokeStyle = '#4fd1c5';
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Ray to center
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = 'rgba(79, 209, 197, 0.2)';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Planet body
        ctx.beginPath();
        ctx.arc(px, py, isSelected ? 5.5 : 4, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? '#4fd1c5' : '#edebe4';
        ctx.fill();

        // Planet glyph
        ctx.font = '14px "JetBrains Mono", serif';
        ctx.fillStyle = isSelected ? '#4fd1c5' : '#edebe4';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const glyphOffsetR = planetR - 18;
        const gx = cx + Math.cos(rad) * glyphOffsetR;
        const gy = cy + Math.sin(rad) * glyphOffsetR;
        ctx.fillText(p.glyph, gx, gy);

        // Retrograde label
        if (p.isRetrograde) {
          ctx.font = '9px "JetBrains Mono", monospace';
          ctx.fillStyle = '#ff4433';
          ctx.fillText('Rx', gx + 8, gy + 8);
        }
      });

      // Center compass rose / focal point
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#4fd1c5';
      ctx.fill();

      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(237, 235, 228, 0.5)';
      ctx.textAlign = 'center';
      ctx.fillText('EARTH', cx, cy + 16);
      ctx.fillText('OCT 2026', cx, cy + 28);

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    function onMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const outerR = Math.min(canvas.width, canvas.height) * 0.44;
      const planetR = outerR * 0.78 - 22;

      let found: PlanetTransit | null = null;
      for (const p of PLANETARY_TRANSITS_2026) {
        const rad = (p.eclipticLon * Math.PI) / 180 - Math.PI / 2;
        const px = cx + Math.cos(rad) * planetR;
        const py = cy + Math.sin(rad) * planetR;
        const d = Math.sqrt((mx - px) ** 2 + (my - py) ** 2);
        if (d < 18) {
          found = p;
          break;
        }
      }
      hoverPlanetRef.current = found;
      if (found) {
        canvas.style.cursor = 'pointer';
      } else {
        canvas.style.cursor = 'default';
      }
    }

    function onClick() {
      if (hoverPlanetRef.current) {
        setSelectedPlanet(hoverPlanetRef.current);
      }
    }

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('click', onClick);
      cancelAnimationFrame(animId);
    };
  }, [viewMode, selectedPlanet, showAspects]);

  return (
    <div className="celestial-sketchbook-card">
      <div className="sketchbook-header">
        <div className="sketchbook-title-wrap">
          <span className="live-dot" />
          <h3 className="mono">
            2026 CELESTIAL SKETCHBOOK · REAL-TIME TRANSIT OBSERVATORY
          </h3>
        </div>

        <div className="sketchbook-controls mono">
          <button
            className={`sketchbook-btn ${viewMode === 'chart' ? 'active' : ''}`}
            onClick={() => setViewMode('chart')}
          >
            01 CELESTIAL WHEEL
          </button>
          <button
            className={`sketchbook-btn ${viewMode === 'ephemeris' ? 'active' : ''}`}
            onClick={() => setViewMode('ephemeris')}
          >
            02 VERIFIED EPHEMERIS
          </button>
          {viewMode === 'chart' && (
            <button
              className={`sketchbook-btn ${showAspects ? 'active' : ''}`}
              onClick={() => setShowAspects(!showAspects)}
              title="Toggle geometric aspect chords"
            >
              ASPECTS: {showAspects ? 'ON' : 'OFF'}
            </button>
          )}
        </div>
      </div>

      <div className="sketchbook-content-grid">
        {/* Visual Chart / Table Section */}
        <div className="sketchbook-visual-chamber">
          {viewMode === 'chart' ? (
            <div className="chart-canvas-wrap">
              <canvas ref={canvasRef} />
              <div className="chart-legend mono">
                <span>CLICK PLANET TO INSPECT</span>
                <span className="legend-item cyan">── AIR TRINE (120°)</span>
                <span className="legend-item gold">── FIRE HARMONY</span>
                <span className="legend-item ember">╌╌ RETROGRADE (Rx)</span>
              </div>
            </div>
          ) : (
            <div className="ephemeris-table-wrap">
              <table className="ephemeris-table mono">
                <thead>
                  <tr>
                    <th>GLYPH</th>
                    <th>BODY</th>
                    <th>TROPICAL POSITION</th>
                    <th>STATUS</th>
                    <th>DAILY MOTION</th>
                    <th>CONST. BORDER</th>
                  </tr>
                </thead>
                <tbody>
                  {PLANETARY_TRANSITS_2026.map((p) => (
                    <tr
                      key={p.name}
                      className={selectedPlanet?.name === p.name ? 'selected-row' : ''}
                      onClick={() => setSelectedPlanet(p)}
                    >
                      <td className="glyph-cell">{p.glyph}</td>
                      <td>{p.name}</td>
                      <td>{p.astronomy.geocentricLongitude}</td>
                      <td className={p.isRetrograde ? 'rx-text' : 'dir-text'}>
                        {p.isRetrograde ? 'Retrograde (Rx)' : 'Direct'}
                      </td>
                      <td>{p.astronomy.speedPerDay}</td>
                      <td>{p.astronomy.constellationBorders}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Selected Body Field Notes: 3-Layer Distinction */}
        <div className="sketchbook-telemetry-panel">
          <div className="panel-badge mono">
            <span className="live-dot" />
            TRANSIT INSPECTOR · {selectedPlanet.name.toUpperCase()} ({selectedPlanet.glyph})
          </div>

          <div className="selected-planet-title">
            <h2>
              {selectedPlanet.glyph} {selectedPlanet.name} in {selectedPlanet.sign}
            </h2>
            <span className="sign-degree mono">
              {selectedPlanet.signDeg.toFixed(1)}° {selectedPlanet.sign}
              {selectedPlanet.isRetrograde ? ' [Rx]' : ''}
            </span>
          </div>

          {/* LAYER 1: ASTRONOMICAL EPHEMERIS */}
          <div className="field-note-section">
            <div className="section-label mono">01 · ASTRONOMICAL EPHEMERIS (VERIFIED)</div>
            <div className="ephemeris-spec-grid mono">
              <div className="spec-item">
                <span className="k">Geocentric Ecliptic:</span>
                <span className="v">{selectedPlanet.astronomy.geocentricLongitude}</span>
              </div>
              <div className="spec-item">
                <span className="k">Daily Velocity:</span>
                <span className="v">{selectedPlanet.astronomy.speedPerDay}</span>
              </div>
              <div className="spec-item">
                <span className="k">Constellation:</span>
                <span className="v">{selectedPlanet.astronomy.constellationBorders}</span>
              </div>
              <div className="spec-item">
                <span className="k">Validation:</span>
                <span className="v">{selectedPlanet.astronomy.ephemerisSource}</span>
              </div>
            </div>
          </div>

          {/* LAYER 2: ARTISTIC VISUALIZATION */}
          <div className="field-note-section">
            <div className="section-label mono">02 · ARTISTIC SKETCHBOOK VISUALIZATION</div>
            <p className="sketch-desc">
              Drawn as an archival celestial plate: geocentric tropical coordinates projected onto a
              360° hand-scribed perimeter, plotting orbital retrograde loops and geometric aspect chords.
            </p>
          </div>

          {/* LAYER 3: ASTROLOGICAL INTERPRETATION */}
          <div className="field-note-section">
            <div className="section-label mono">03 · ASTROLOGICAL INTERPRETATION (2026 TRANSIT)</div>
            <div className="archetype-tag mono">
              ARCHETYPE: {selectedPlanet.interpretation.archetype}
            </div>
            <blockquote className="transit-interpretation">
              &ldquo;{selectedPlanet.interpretation.transitNote2026}&rdquo;
            </blockquote>
          </div>

          {/* Quick planet selector pills */}
          <div className="planet-pill-selector">
            <span className="mono select-label">QUICK SWITCH:</span>
            {PLANETARY_TRANSITS_2026.map((p) => (
              <button
                key={p.name}
                className={`glyph-pill ${selectedPlanet.name === p.name ? 'active' : ''}`}
                onClick={() => setSelectedPlanet(p)}
                title={`${p.name} in ${p.sign}`}
              >
                {p.glyph}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
