import Link from 'next/link';
import Ticker from '@/components/Ticker';
import Footer from '@/components/Footer';
import WorldHUD from '@/components/world/WorldHUD';
import CelestialSketchbook from '@/components/world/CelestialSketchbook';
import SignalsGrid from '@/components/SignalsGrid';
import { getAllEssays } from '@/lib/essays';
import { getAllSignals } from '@/lib/signals';

export const metadata = {
  title: 'doomscroll.txt — The Reading World',
  description: 'Essays, field notes, verified celestial transits, and live news signals.',
};

export default function ReadPage() {
  const essays = getAllEssays();
  const featured = essays.find((e) => e.featured) || essays[0];
  const rest = essays.filter((e) => e.slug !== featured?.slug);
  const signals = getAllSignals();

  return (
    <>
      <WorldHUD />
      <Ticker />

      <main className="river">
        {/* World Header */}
        <header className="destination-world-header">
          <div className="dest-header-badge mono">
            <span className="live-dot pulse-active" />
            DESTINATION 01 · THE READING WORLD
          </div>
          <h1 className="dest-header-title">doomscroll.txt</h1>
          <p className="dest-header-dek">
            A text-first space for essays, field notes, and what the sky is doing. A running
            record of what it feels like to think, work, argue, and live through the AI
            transition.
          </p>

          <div className="dest-sub-nav mono">
            <a href="#celestial">✦ CELESTIAL TRANSITS</a>
            <span>·</span>
            <a href="#essays">ESSAYS</a>
            <span>·</span>
            <a href="#signals">SIGNALS ({signals.length})</a>
            <span>·</span>
            <Link href="/" className="back-link">
              ← RETURN TO DESTINATIONS
            </Link>
          </div>
        </header>

        {/* 02. Original Essays */}
        {featured && (
          <section className="sub-section" id="essays">
            <div className="section-eyebrow">Original Essays</div>
            <article className="feature">
              <div className="feature-meta mono">
                Featured Essay · {featured.category}
              </div>
              <h2 className="feature-headline">
                <Link href={`/essays/${featured.slug}`}>{featured.title}</Link>
              </h2>
              {featured.dek && <p className="feature-dek">{featured.dek}</p>}
              <div className="feature-footer mono">
                <Link href={`/essays/${featured.slug}`} className="read-link">
                  READ ESSAY →
                </Link>
                {featured.readTime && <span>{featured.readTime}</span>}
                <span>By {featured.author}</span>
                {featured.date && <span>· {featured.date}</span>}
              </div>
            </article>
          </section>
        )}

        {rest.length > 0 && (
          <div className="essay-list-row">
            {rest.map((essay) => (
              <article className="essay-card" key={essay.slug}>
                <div className="feature-meta mono">Essay · {essay.category}</div>
                <h3>
                  <Link href={`/essays/${essay.slug}`}>{essay.title}</Link>
                </h3>
                {essay.dek && <p>{essay.dek}</p>}
                <div className="essay-card-footer mono">
                  <Link href={`/essays/${essay.slug}`} className="card-read-link">
                    READ →
                  </Link>
                  <span>{essay.readTime}</span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* 03. Signals: Field Notes & Live Wires */}
        <section className="sub-section" id="signals">
          <div className="section-eyebrow">Signals: Field Notes & Live Wires</div>
          <p className="signals-desc">
            Weird patterns in group chats, labor quirks, live news headlines, and small cultural
            glitches noticed in real time. Hand-written observations merged with automated live wires.
          </p>
          <SignalsGrid signals={signals} />
        </section>

        {/* Quote fragment */}
        <div className="fragment" id="about">
          <blockquote>
            &ldquo;We are not becoming less human. We are becoming human in a room that keeps
            changing shape, and calling the disorientation a personality trait.&rdquo;
          </blockquote>
          <cite className="mono">Field note · Ana Sharma</cite>
        </div>

        <div className="back-nav-wrap">
          <Link href="/" className="back-link">
            ← return to world selection
          </Link>
        </div>
        {/* Celestial Transits & Ephemeris */}
        <section className="sub-section" id="celestial">
          <div className="section-eyebrow">
            What the Sky Is Doing Right Now · October 2026
          </div>
          <p className="section-subtext">
            Verified geocentric tropical longitudes for 2026, aspect chords, and plain-English
            notes on the astrological atmosphere. Astronomical calculations are strictly
            distinguished from symbolic interpretation.
          </p>
          <CelestialSketchbook />
        </section>
      </main>

      <Footer />
    </>
  );
}
