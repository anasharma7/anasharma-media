import Link from 'next/link';
import Ticker from '@/components/Ticker';
import Masthead from '@/components/Masthead';
import Footer from '@/components/Footer';
import SignalsGrid from '@/components/SignalsGrid';
import { getAllEssays } from '@/lib/essays';
import signalsData from '@/content/signals.json';

export default function Home() {
  const essays = getAllEssays();
  const featured = essays.find((e) => e.featured) || essays[0];
  const rest = essays.filter((e) => e.slug !== featured?.slug);

  return (
    <>
      <Ticker />
      <Masthead />

      <main className="river">
        {featured ? (
          <section className="feature" id="essays">
            <div className="feature-meta">Featured essay · {featured.category}</div>
            <h1 className="feature-headline">
              <Link href={`/essays/${featured.slug}`}>{featured.title}</Link>
            </h1>
            {featured.dek && <p className="feature-dek">{featured.dek}</p>}
            <div className="feature-footer">
              <Link href={`/essays/${featured.slug}`} className="read-link">
                READ →
              </Link>
              {featured.readTime && <span>{featured.readTime}</span>}
              <span>{featured.author}</span>
            </div>
          </section>
        ) : (
          <div className="empty-state">
            No essays published yet. Drop an .mdx file into content/essays to get started.
          </div>
        )}

        <div className="section-eyebrow" id="signals">
          Signals
        </div>
        <SignalsGrid signals={signalsData} />

        {rest.length > 0 && (
          <div className="essay-list-row">
            {rest.slice(0, 2).map((essay) => (
              <article className="essay-card" key={essay.slug}>
                <div className="feature-meta">Essay · {essay.category}</div>
                <h3>
                  <Link href={`/essays/${essay.slug}`}>{essay.title}</Link>
                </h3>
                {essay.dek && <p>{essay.dek}</p>}
              </article>
            ))}
          </div>
        )}

        <div className="fragment">
          <blockquote>
            &ldquo;We are not becoming less human. We are becoming human in a room that keeps
            changing shape, and calling the disorientation a personality trait.&rdquo;
          </blockquote>
          <cite>Field note, march</cite>
        </div>
      </main>

      <Footer />
    </>
  );
}
