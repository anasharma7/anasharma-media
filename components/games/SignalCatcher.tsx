'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

type Fragment = {
  id: number;
  text: string;
  kind: 'signal' | 'noise' | 'burst';
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

// General, well-established observations about attention-economy design.
// Shown as a short pause-and-learn moment each time the player levels up.
const INSIGHTS = [
  'Infinite scroll was designed with no natural stopping point. That absence is the feature.',
  'Notification design borrows from variable reward schedules, the same mechanism behind slot machines.',
  'Autoplay removes the one moment where you\'d naturally pause and decide whether to continue.',
  'Most engagement metrics optimize for time spent, not for whether that time left you better off.',
  'Red badges are unusually effective at capturing attention, which is why so many apps default to them.',
  'The gap between wanting to check something and actually checking it has been engineered to be as small as possible.',
  'Attention is the one resource an app can take from you that never comes back.',
  'Noticing a design pattern is the first step to not being steered by it without knowing.',
];

const GAME_DURATION = 60;
const LIVES_START = 3;
const RECEIVER_WIDTH = 100;
const RECEIVER_HEIGHT = 14;
const XP_PER_LEVEL = 80;

export default function SignalCatcher() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fragmentsRef = useRef<Fragment[]>([]);
  const nextIdRef = useRef(0);
  const spawnTimerRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);
  const receiverXRef = useRef(300);
  const keysRef = useRef<{ left: boolean; right: boolean }>({ left: false, right: false });
  const burstFlashRef = useRef(0);
  const pausedForInsightRef = useRef(false);

  const [status, setStatus] = useState<'idle' | 'playing' | 'over'>('idle');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(LIVES_START);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [combo, setCombo] = useState(0);
  const [level, setLevel] = useState(1);
  const [xpPct, setXpPct] = useState(0);
  const [insight, setInsight] = useState<string | null>(null);

  const scoreRef = useRef(0);
  const livesRef = useRef(LIVES_START);
  const timeLeftRef = useRef(GAME_DURATION);
  const comboRef = useRef(0);
  const elapsedRef = useRef(0);
  const levelRef = useRef(1);
  const xpRef = useRef(0);
  const usedInsightsRef = useRef<Set<number>>(new Set());

  const triggerLevelUp = useCallback(() => {
    levelRef.current += 1;
    setLevel(levelRef.current);
    pausedForInsightRef.current = true;

    let pool = INSIGHTS.map((_, i) => i).filter((i) => !usedInsightsRef.current.has(i));
    if (pool.length === 0) {
      usedInsightsRef.current.clear();
      pool = INSIGHTS.map((_, i) => i);
    }
    const pick = pool[Math.floor(Math.random() * pool.length)];
    usedInsightsRef.current.add(pick);
    setInsight(INSIGHTS[pick]);

    setTimeout(() => {
      pausedForInsightRef.current = false;
      setInsight(null);
    }, 3200);
  }, []);

  const startGame = useCallback(() => {
    fragmentsRef.current = [];
    nextIdRef.current = 0;
    spawnTimerRef.current = 0;
    scoreRef.current = 0;
    livesRef.current = LIVES_START;
    timeLeftRef.current = GAME_DURATION;
    comboRef.current = 0;
    elapsedRef.current = 0;
    levelRef.current = 1;
    xpRef.current = 0;
    usedInsightsRef.current.clear();
    pausedForInsightRef.current = false;
    setScore(0);
    setLives(LIVES_START);
    setTimeLeft(GAME_DURATION);
    setCombo(0);
    setLevel(1);
    setXpPct(0);
    setInsight(null);
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
      receiverXRef.current = canvas.width / 2 - RECEIVER_WIDTH / 2;
    }
    resize();
    window.addEventListener('resize', resize);

    function spawnFragment() {
      if (!ctx || !canvas) return;
      const roll = Math.random();
      const kind: Fragment['kind'] = roll > 0.93 ? 'burst' : roll > 0.5 ? 'signal' : 'noise';
      const text =
        kind === 'burst'
          ? '⚡ burst, clears the noise'
          : kind === 'signal'
          ? SIGNAL_TEXTS[Math.floor(Math.random() * SIGNAL_TEXTS.length)]
          : NOISE_TEXTS[Math.floor(Math.random() * NOISE_TEXTS.length)];
      ctx.font = '14px "JetBrains Mono", monospace';
      const width = ctx.measureText(text).width + 24;
      const x = Math.random() * Math.max(canvas.width - width, 10);
      const levelBoost = (levelRef.current - 1) * 0.12;
      const difficultyBoost = Math.min(elapsedRef.current / 20, 1.8) + levelBoost;
      fragmentsRef.current.push({
        id: nextIdRef.current++,
        text,
        kind,
        x,
        y: -20,
        speed: (40 + Math.random() * 50) * (1 + difficultyBoost * 0.5),
        width,
        caught: false,
      });
    }

    function resolveCatch(f: Fragment) {
      f.caught = true;
      if (f.kind === 'signal') {
        comboRef.current += 1;
        const multiplier = 1 + Math.floor(comboRef.current / 5) * 0.5;
        const gained = Math.round(10 * multiplier);
        scoreRef.current += gained;
        xpRef.current += gained;
        if (xpRef.current >= XP_PER_LEVEL) {
          xpRef.current -= XP_PER_LEVEL;
          triggerLevelUp();
        }
        setXpPct((xpRef.current / XP_PER_LEVEL) * 100);
      } else if (f.kind === 'noise') {
        comboRef.current = 0;
        scoreRef.current = Math.max(0, scoreRef.current - 5);
        livesRef.current -= 1;
        setLives(livesRef.current);
      } else if (f.kind === 'burst') {
        scoreRef.current += 25;
        xpRef.current += 25;
        if (xpRef.current >= XP_PER_LEVEL) {
          xpRef.current -= XP_PER_LEVEL;
          triggerLevelUp();
        }
        setXpPct((xpRef.current / XP_PER_LEVEL) * 100);
        burstFlashRef.current = 0.25;
        fragmentsRef.current.forEach((other) => {
          if (other.kind === 'noise' && !other.caught) other.caught = true;
        });
      }
      setScore(scoreRef.current);
      setCombo(comboRef.current);
    }

    function tick(now: number) {
      if (!ctx || !canvas) return;
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      if (status === 'playing' && !pausedForInsightRef.current) {
        elapsedRef.current += dt;
        spawnTimerRef.current += dt;
        const spawnInterval = Math.max(0.9 - elapsedRef.current / 60, 0.4);
        if (spawnTimerRef.current > spawnInterval) {
          spawnTimerRef.current = 0;
          spawnFragment();
        }

        timeLeftRef.current -= dt;
        if (timeLeftRef.current <= 0) {
          timeLeftRef.current = 0;
          setStatus('over');
        }
        setTimeLeft(Math.ceil(timeLeftRef.current));

        const moveSpeed = 420;
        if (keysRef.current.left) receiverXRef.current -= moveSpeed * dt;
        if (keysRef.current.right) receiverXRef.current += moveSpeed * dt;
        receiverXRef.current = Math.max(0, Math.min(canvas.width - RECEIVER_WIDTH, receiverXRef.current));

        const receiverY = canvas.height - 30;

        fragmentsRef.current.forEach((f) => {
          if (f.caught) return;
          f.y += f.speed * dt;
          const overlapsX = f.x + f.width > receiverXRef.current && f.x < receiverXRef.current + RECEIVER_WIDTH;
          if (overlapsX && f.y >= receiverY - 10 && f.y <= receiverY + RECEIVER_HEIGHT) {
            resolveCatch(f);
          }
        });

        fragmentsRef.current = fragmentsRef.current.filter((f) => !f.caught && f.y <= canvas.height + 20);

        if (burstFlashRef.current > 0) burstFlashRef.current -= dt;
        if (livesRef.current <= 0) setStatus('over');
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = burstFlashRef.current > 0 ? '#0d1f1c' : '#0a0b0d';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      fragmentsRef.current.forEach((f) => {
        ctx.font = '14px "JetBrains Mono", monospace';
        const color = f.kind === 'signal' ? '#4fd1c5' : f.kind === 'noise' ? '#ff4433' : '#e8b84f';
        ctx.fillStyle = `${color}22`;
        ctx.fillRect(f.x, f.y - 16, f.width, 26);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.strokeRect(f.x, f.y - 16, f.width, 26);
        ctx.fillStyle = color;
        ctx.fillText(f.text, f.x + 12, f.y + 2);
      });

      const receiverY = canvas.height - 30;
      ctx.fillStyle = '#edebe4';
      ctx.fillRect(receiverXRef.current, receiverY, RECEIVER_WIDTH, RECEIVER_HEIGHT);
      ctx.fillStyle = '#63656c';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillText('you', receiverXRef.current + RECEIVER_WIDTH / 2 - 10, receiverY - 6);

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    function handleClick(e: MouseEvent) {
      if (status !== 'playing' || pausedForInsightRef.current || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      for (const f of fragmentsRef.current) {
        if (f.caught) continue;
        if (mx >= f.x && mx <= f.x + f.width && my >= f.y - 16 && my <= f.y + 10) {
          resolveCatch(f);
          break;
        }
      }
    }
    function handleMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      receiverXRef.current = Math.max(0, Math.min(canvas.width - RECEIVER_WIDTH, mx - RECEIVER_WIDTH / 2));
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') keysRef.current.left = true;
      if (e.key === 'ArrowRight') keysRef.current.right = true;
    }
    function handleKeyUp(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') keysRef.current.left = false;
      if (e.key === 'ArrowRight') keysRef.current.right = false;
    }

    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, triggerLevelUp]);

  return (
    <div className="game-wrap">
      <div className="game-hud">
        <span>SCORE {score}</span>
        <span>LEVEL {level}</span>
        <span>COMBO x{1 + Math.floor(combo / 5) * 0.5}</span>
        <span>LIVES {'●'.repeat(Math.max(lives, 0))}{'○'.repeat(Math.max(LIVES_START - lives, 0))}</span>
        <span>TIME {timeLeft}s</span>
      </div>
      <div className="xp-bar">
        <div className="xp-bar-fill" style={{ width: `${xpPct}%` }} />
      </div>
      <div className="game-canvas-frame">
        <canvas ref={canvasRef} />
        {status === 'playing' && insight && (
          <div className="insight-overlay">
            <div className="insight-eyebrow">Level {level} · signal noticed</div>
            <p className="insight-text">{insight}</p>
          </div>
        )}
        {status !== 'playing' && (
          <div className="game-overlay">
            {status === 'idle' && (
              <>
                <p className="game-overlay-title">signal catcher</p>
                <p className="game-overlay-body">
                  Move the receiver with your mouse or arrow keys to auto-catch cyan signal, or
                  click it directly. Avoid red noise, it costs a life. Gold bursts clear the
                  board. Fill the bar to level up, each level surfaces a real observation about
                  how attention gets engineered.
                </p>
                <button onClick={startGame}>start</button>
              </>
            )}
            {status === 'over' && (
              <>
                <p className="game-overlay-title">run complete</p>
                <p className="game-overlay-body">final score: {score} · reached level {level}</p>
                <button onClick={startGame}>play again</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
