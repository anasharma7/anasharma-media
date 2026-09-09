import Link from 'next/link';
import Ticker from '@/components/Ticker';
import Masthead from '@/components/Masthead';
import Footer from '@/components/Footer';
import SignalCatcher from '@/components/games/SignalCatcher';

export const metadata = {
  title: 'Signal Catcher — doomscroll.txt',
  description: 'A small game about telling signal from noise.',
};

export default function SignalCatcherPage() {
  return (
    <>
      <Ticker />
      <Masthead />
      <main className="river">
        <div className="section-eyebrow" style={{ marginTop: '48px' }}>
          Games
        </div>
        <h1 className="feature-headline" style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}>
          Signal Catcher
        </h1>
        <p className="feature-dek" style={{ marginBottom: '32px' }}>
          A small, pointless-on-purpose game about the actual subject of this site: telling
          signal from noise before it scrolls past you.
        </p>
        <SignalCatcher />
        <Link href="/games" className="back-link">
          ← more games
        </Link>
      </main>
      <Footer />
    </>
  );
}
