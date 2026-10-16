'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSoundscape } from './Soundscape';

export default function WorldHUD() {
  const [timeStr, setTimeStr] = useState<string>('');
  const [aura, setAura] = useState<'void' | 'cyan' | 'ember'>('void');
  const { isPlaying, toggle } = useSoundscape();
  const pathname = usePathname();

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      const utc = now.toTimeString().split(' ')[0];
      setTimeStr(`${utc} UTC`);
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const cycleAura = () => {
    const next = aura === 'void' ? 'cyan' : aura === 'cyan' ? 'ember' : 'void';
    setAura(next);
    document.documentElement.setAttribute('data-aura', next);
  };

  const replayEntrance = () => {
    try {
      sessionStorage.removeItem('ana_entrance_dismissed');
      window.location.reload();
    } catch {}
  };

  return (
    <aside className="world-hud" aria-label="World Navigation & Telemetry">
      <div className="world-hud-inner">
        {/* Left Telemetry */}
        <div className="hud-section hud-left">
          <Link href="/" className="hud-brand-link mono">
            <span className="live-dot pulse-active" />
            <span>ANASHARMA.COM</span>
          </Link>
          <span className="hud-telemetry mono">{timeStr || '00:00:00 UTC'}</span>
        </div>

        {/* Center Quick Destinations */}
        <nav className="hud-section hud-center mono" aria-label="Destinations">
          <Link
            href="/"
            className={`hud-link ${pathname === '/' ? 'active-dest' : ''}`}
            title="World Selection"
          >
            destinations
          </Link>
          <span className="hud-sep">/</span>
          <Link
            href="/read"
            className={`hud-link ${pathname?.startsWith('/read') || pathname?.startsWith('/essays') ? 'active-dest' : ''}`}
          >
            doomscroll.txt
          </Link>
          <span className="hud-sep">/</span>
          <Link
            href="/studio"
            className={`hud-link ${pathname?.startsWith('/studio') ? 'active-dest' : ''}`}
          >
            mixmedia studio
          </Link>
          <span className="hud-sep">/</span>
          <Link
            href="/games"
            className={`hud-link ${pathname?.startsWith('/games') ? 'active-dest' : ''}`}
          >
            the playground
          </Link>
        </nav>

        {/* Right Controls: Audio + Aura + Cover Replay */}
        <div className="hud-section hud-right">
          <button
            onClick={toggle}
            className={`hud-control-btn audio-btn ${isPlaying ? 'active' : ''}`}
            title={isPlaying ? 'Mute ambient soundscape' : 'Enable ambient soundscape'}
            aria-label="Toggle ambient soundscape"
          >
            <span className="audio-bars" aria-hidden="true">
              <span className={`bar b1 ${isPlaying ? 'moving' : ''}`} />
              <span className={`bar b2 ${isPlaying ? 'moving' : ''}`} />
              <span className={`bar b3 ${isPlaying ? 'moving' : ''}`} />
            </span>
            <span className="mono">{isPlaying ? 'AUDIO ON' : 'AUDIO OFF'}</span>
          </button>

          <button
            onClick={cycleAura}
            className="hud-control-btn aura-btn mono"
            title="Cycle visual aura (Void / Cyan / Ember)"
            aria-label="Cycle visual aura"
          >
            <span className={`aura-dot ${aura}`} />
            <span>AURA: {aura.toUpperCase()}</span>
          </button>

          <button
            onClick={replayEntrance}
            className="hud-control-btn mono replay-btn"
            title="Replay book cover"
            aria-label="Replay book cover"
          >
            <span>◧ COVER</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
