import Link from 'next/link';
import Ticker from '@/components/Ticker';
import Masthead from '@/components/Masthead';
import Footer from '@/components/Footer';
import TuringTest from '@/components/games/TuringTest';

export const metadata = {
  title: 'Turing Test: 5 Seconds — doomscroll.txt',
  description: 'Human or AI? You have five seconds.',
};

export default function TuringTestPage() {
  return (
    <>
      <Ticker />
      <Masthead />
      <main className="river">
        <div className="section-eyebrow" style={{ marginTop: '48px' }}>
          Games
        </div>
        <h1 className="feature-headline" style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}>
          Turing Test: 5 Seconds
        </h1>
        <p className="feature-dek" style={{ marginBottom: '32px' }}>
          The skill this whole site is built around, spotting the difference, under an actual
          clock.
        </p>
        <TuringTest />
        <Link href="/games" className="back-link">
          ← more games
        </Link>
      </main>
      <Footer />
    </>
  );
}
