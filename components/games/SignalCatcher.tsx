'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

type Fragment = {
  id: number;
  text: string;
  isSignal: boolean;
  x: number;
  y: number;
  speed: number;
  width: number;
  caught: boolean;
};

const SIGNAL_TEXTS = [
  'a real pattern worth noticing',
  'someone quietly changed their mind',
  'the actual headline underneath',
  'a fact that checks out',
  'a shift that matters later',
  'the thing everyone will discuss tomorrow',
  'a source worth trusting',
];

const NOISE_TEXTS = [
  'you won\'t believe what happens next',
  'ten weird tricks they hate',
  'sponsored: buy this now',
  'engagement bait, ignore',
  'outrage for its own sake',
  'a rumor with no source',
  'algorithmic filler',
];

const GAME_DURATION = 45;
const LIVES_START = 3;

export default function SignalCatcher() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fragmentsRef = useRef<Fragment[]>([]);
  const nextIdRef = useRef(0);
  const spawnTimerRef = useRef(0);
  const rafRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  const [status, setStatus] = useState<'idle' | 'playing' | 'over'>('idle');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(LIVES_START);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);

  const scoreRef = useRef(0);
  const livesRef = useRef(LIVES_START);
  const timeLeftRef = useRef(GAME_DURATION);

  const startGame = useCallback(() => {
    fragmentsRef.current = [];
    nextIdRef.current = 0;
    spawnTimerRef.current = 0;
    scoreRef.current = 0;
    livesRef.current = LIVES_START;
    timeLeftRef.current = GAME_DURATION;
    setScore(0);
    setLives(LIVES_START);
    setTimeLeft(GAME_DURATION);
    setStatus('playing');
    lastTimeRef.current = performance.now();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = rect?.width || 700;
      canvas.height = 440;
    }
    resize();
    window.addEventListener('resize', resize);

    function spawnFragment() {
      if (!ctx || !canvas) return;
      const isSignal = Math.random() > 0.45;
      const pool = isSignal ? SIGNAL_TEXTS : NOISE_TEXTS;
      const text = pool[Math.floor(Math.random() * pool.length)];
      ctx.font = '14px "JetBrains Mono", monospace';
      const width = ctx.measureText(text).width + 24;
      const x = Math.random() * Math.max(canvas.width - width, 10);
      fragmentsRef.current.push({
        id: nextIdRef.current++,
        text,
        isSignal,
        x,
        y: -20,
        speed: 40 + Math.random() * 50,
        width,
        caught: false,
      });
    }

    function tick(now: number) {
      if (!ctx || !canvas) return;
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      if (status === 'playing') {
        spawnTimerRef.current += dt;
        if (spawnTimerRef.current > 0.9) {
          spawnTimerRef.current = 0;
          spawnFragment();
        }

        timeLeftRef.current -= dt;
        if (timeLeftRef.current <= 0) {
          timeLeftRef.current = 0;
          setStatus('over');
        }
        setTimeLeft(Math.ceil(timeLeftRef.current));

        fragmentsRef.current.forEach((f) => {
          if (!f.caught) f.y += f.speed * dt;
        });

        const before = fragmentsRef.current.length;
        fragmentsRef.current = fragmentsRef.current.filter((f) => {
          if (f.caught) return false;
          if (f.y > canvas.height + 20) {
            return false; // missed, no penalty either way, matches "let noise pass" design
          }
          return true;
        });
        void before;

        if (livesRef.current <= 0) {
          setStatus('over');
        }
      }

      // draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0a0b0d';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      fragmentsRef.current.forEach((f) => {
        ctx.font = '14px "JetBrains Mono", monospace';
        ctx.fillStyle = f.isSignal ? 'rgba(79,209,197,0.12)' : 'rgba(255,68,51,0.10)';
        ctx.fillRect(f.x, f.y - 16, f.width, 26);
        ctx.strokeStyle = f.isSignal ? '#4fd1c5' : '#ff4433';
        ctx.lineWidth = 1;
        ctx.strokeRect(f.x, f.y - 16, f.width, 26);
        ctx.fillStyle = f.isSignal ? '#4fd1c5' : '#ff4433';
        ctx.fillText(f.text, f.x + 12, f.y + 2);
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    function handleClick(e: MouseEvent) {
      if (status !== 'playing' || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      for (const f of fragmentsRef.current) {
        if (f.caught) continue;
        if (mx >= f.x && mx <= f.x + f.width && my >= f.y - 16 && my <= f.y + 10) {
          f.caught = true;
          if (f.isSignal) {
            scoreRef.current += 10;
          } else {
            scoreRef.current = Math.max(0, scoreRef.current - 5);
            livesRef.current -= 1;
            setLives(livesRef.current);
          }
          setScore(scoreRef.current);
          break;
        }
      }
    }
    canvas.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', handleClick);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className="game-wrap">
      <div className="game-hud">
        <span>SCORE {score}</span>
        <span>LIVES {'●'.repeat(Math.max(lives, 0))}{'○'.repeat(Math.max(LIVES_START - lives, 0))}</span>
        <span>TIME {timeLeft}s</span>
      </div>
      <div className="game-canvas-frame">
        <canvas ref={canvasRef} />
        {status !== 'playing' && (
          <div className="game-overlay">
            {status === 'idle' && (
              <>
                <p className="game-overlay-title">signal catcher</p>
                <p className="game-overlay-body">
                  Click the cyan signal. Let the red noise fall, or you lose a life if you click it.
                </p>
                <button onClick={startGame}>start</button>
              </>
            )}
            {status === 'over' && (
              <>
                <p className="game-overlay-title">run complete</p>
                <p className="game-overlay-body">final score: {score}</p>
                <button onClick={startGame}>play again</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
