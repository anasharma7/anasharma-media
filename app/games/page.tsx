import Link from 'next/link';
import Ticker from '@/components/Ticker';
import Masthead from '@/components/Masthead';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Games — doomscroll.txt',
};

const games = [
  {
    slug: 'signal-catcher',
    title: 'Signal Catcher',
    blurb: 'Steer a receiver through falling signal and noise. Combos, power-ups, ramping difficulty.',
  },
  {
    slug: 'turing-test',
    title: 'Turing Test: 5 Seconds',
    blurb: 'Human or AI? You have five seconds to decide, over and over.',
  },
];

export default function GamesPage() {
  return (
    <>
      <Ticker />
      <Masthead />
      <main className="river">
        <div className="section-eyebrow" style={{ marginTop: '48px' }}>
          Games
        </div>
        <div className="essay-list-row" style={{ borderTop: 'none', marginTop: 0 }}>
          {games.map((g) => (
            <article className="essay-card" key={g.slug}>
              <h3>
                <Link href={`/games/${g.slug}`}>{g.title}</Link>
              </h3>
              <p>{g.blurb}</p>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
