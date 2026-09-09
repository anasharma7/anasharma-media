'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

type Snippet = { text: string; isAI: boolean };

// Original snippets written for this game, not sourced from anywhere.
const SNIPPETS: Snippet[] = [
  { text: 'ugh i left my charger at the office again, third time this month lol', isAI: false },
  { text: 'I hope this message finds you well. I wanted to circle back regarding our previous conversation.', isAI: true },
  { text: 'okay but why does the printer only jam when someone important is watching', isAI: false },
  { text: 'It is important to note that every individual\'s journey is unique and valid.', isAI: true },
  { text: 'my mom just texted me a paragraph about her garden and I have never felt more loved', isAI: false },
  { text: 'In today\'s fast-paced world, effective communication has never been more essential.', isAI: true },
  { text: 'not me crying at a dog food commercial at 11pm on a tuesday', isAI: false },
  { text: 'Let\'s dive in and explore some key strategies to help you succeed.', isAI: true },
  { text: 'the group chat has been silent for 6 hours and honestly the suspense is killing me', isAI: false },
  { text: 'This comprehensive guide will walk you through everything you need to know.', isAI: true },
  { text: 'i genuinely cannot tell if i locked the door or just thought about locking the door', isAI: false },
  { text: 'By leveraging these insights, you can unlock your full potential.', isAI: true },
  { text: 'my cat knocked a full glass off the counter while maintaining eye contact with me', isAI: false },
  { text: 'It\'s worth noting that results may vary depending on individual circumstances.', isAI: true },
  { text: 'showed up to the meeting 45 min early because I misread the invite, cool cool cool', isAI: false },
];

const TIME_PER_ROUND = 4;
const LIVES_START = 3;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TuringTest() {
  const [status, setStatus] = useState<'idle' | 'playing' | 'over'>('idle');
  const [order, setOrder] = useState<Snippet[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(LIVES_START);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_ROUND);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const indexRef = useRef(0);
  const livesRef = useRef(LIVES_START);

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const nextRound = useCallback(
    (deck: Snippet[], i: number) => {
      if (i >= deck.length || livesRef.current <= 0) {
        clearTimer();
        setStatus('over');
        return;
      }
      setIndex(i);
      indexRef.current = i;
      setTimeLeft(TIME_PER_ROUND);
      setFeedback(null);
    },
    []
  );

  const answer = useCallback(
    (guessAI: boolean) => {
      if (status !== 'playing') return;
      clearTimer();
      const current = order[indexRef.current];
      const correct = current.isAI === guessAI;
      if (correct) {
        setScore((s) => s + 10);
        setFeedback('correct');
      } else {
        livesRef.current -= 1;
        setLives(livesRef.current);
        setFeedback('wrong');
      }
      setTimeout(() => nextRound(order, indexRef.current + 1), 550);
    },
    [order, status, nextRound]
  );

  const startGame = useCallback(() => {
    const deck = shuffle(SNIPPETS);
    setOrder(deck);
    setScore(0);
    setLives(LIVES_START);
    livesRef.current = LIVES_START;
    setStatus('playing');
    nextRound(deck, 0);
  }, [nextRound]);

  // countdown per round
  useEffect(() => {
    if (status !== 'playing' || feedback) return;
    clearTimer();
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearTimer();
          livesRef.current -= 1;
          setLives(livesRef.current);
          setFeedback('wrong');
          setTimeout(() => nextRound(order, indexRef.current + 1), 550);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, index, feedback]);

  // keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (status !== 'playing' || feedback) return;
      if (e.key.toLowerCase() === 'h') answer(false);
      if (e.key.toLowerCase() === 'a') answer(true);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [status, feedback, answer]);

  const current = order[index];

  return (
    <div className="game-wrap">
      <div className="game-hud">
        <span>SCORE {score}</span>
        <span>LIVES {'●'.repeat(Math.max(lives, 0))}{'○'.repeat(Math.max(LIVES_START - lives, 0))}</span>
        {status === 'playing' && <span>ROUND {index + 1}/{order.length}</span>}
      </div>
      <div className="turing-frame">
        {status === 'idle' && (
          <div className="game-overlay static">
            <p className="game-overlay-title">turing test: 5 seconds</p>
            <p className="game-overlay-body">
              A line of text appears. Decide if it's human or AI before the clock runs out.
              Press H or A, or use the buttons. Three misses and it's over.
            </p>
            <button onClick={startGame}>start</button>
          </div>
        )}

        {status === 'playing' && current && (
          <>
            <div className={`turing-timer-bar ${timeLeft <= 1 ? 'urgent' : ''}`}>
              <div className="turing-timer-fill" style={{ width: `${(timeLeft / TIME_PER_ROUND) * 100}%` }} />
            </div>
            <div className={`turing-snippet ${feedback ? `flash-${feedback}` : ''}`}>
              “{current.text}”
            </div>
            <div className="turing-buttons">
              <button className="human" onClick={() => answer(false)} disabled={!!feedback}>
                human <span>(h)</span>
              </button>
              <button className="ai" onClick={() => answer(true)} disabled={!!feedback}>
                ai <span>(a)</span>
              </button>
            </div>
            {feedback && (
              <div className={`turing-feedback ${feedback}`}>
                {feedback === 'correct' ? 'correct' : `wrong, that was ${current.isAI ? 'AI' : 'human'}`}
              </div>
            )}
          </>
        )}

        {status === 'over' && (
          <div className="game-overlay static">
            <p className="game-overlay-title">run complete</p>
            <p className="game-overlay-body">final score: {score}</p>
            <button onClick={startGame}>play again</button>
          </div>
        )}
      </div>
    </div>
  );
}
