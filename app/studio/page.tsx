import Link from 'next/link';
import Ticker from '@/components/Ticker';
import Footer from '@/components/Footer';
import WorldHUD from '@/components/world/WorldHUD';
import CreativeLab from '@/components/studio/CreativeLab';

export const metadata = {
  title: 'Mixmedia Studio — The Visual World',
  description: 'In-browser generative code experiments and visual workspace by Ana Sharma.',
};

export default function StudioPage() {
  return (
    <>
      <WorldHUD />
      <Ticker />

      <main className="river">
        {/* World Header */}
        <header className="destination-world-header">
          <div className="dest-header-badge mono">
            <span className="live-dot pulse-amber" />
            DESTINATION 02 · THE VISUAL WORLD
          </div>
          <h1 className="dest-header-title">Mixmedia Studio</h1>
          <p className="dest-header-dek">
            Where I draw, break things, and experiment. Hand-drawn sketches on iPad glass,
            algorithmic canvas code running live in your browser, and visual studies.
          </p>

          <div className="dest-sub-nav mono">
            <a href="#lab">CODE EXPERIMENTS</a>
            <span>·</span>
            <a href="#archive">PROCREATE & VISUAL ARCHIVE</a>
            <span>·</span>
            <Link href="/" className="back-link">
              ← RETURN TO DESTINATIONS
            </Link>
          </div>
        </header>

        {/* 01. In-Browser Generative Coding Experiments */}
        <section className="sub-section" id="lab">
          <div className="section-eyebrow">
            Live Creative Code Experiments (In-Browser Demos)
          </div>
          <p className="section-subtext">
            Real-time mathematical sketches. Drag your cursor to perturb parameter chaos, watch
            force-directed nodes interact, or see glyphs react to gravity. Interactive code
            demos, not static images.
          </p>
          <CreativeLab />
        </section>

        {/* 02. Curated Procreate / iPad Workspace */}
        <section className="sub-section" id="archive">
          <div className="section-eyebrow">
            Procreate Studies & Visual Archive
          </div>
          <div className="studio-archive-card">
            <div className="archive-card-header mono">
              <span className="live-dot" />
              <span>STUDIO WORKSPACE · IPAD & EXPERIMENTAL VISUALS</span>
            </div>
            <p className="archive-card-desc">
              A dedicated exhibition frame for hand-drawn sketches made in Procreate with Apple
              Pencil, digital ink studies, and visual notebooks. Real works are presented as they
              are finished and published.
            </p>
            <div className="archive-card-placeholder mono">
              <span>[ STUDIO EXHIBITION SPACE · AWAITING PUBLISHED ARTWORK STUDIES ]</span>
            </div>
          </div>
        </section>

        <div className="back-nav-wrap">
          <Link href="/" className="back-link">
            ← return to world selection
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
