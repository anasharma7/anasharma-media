import Link from 'next/link';
import { notFound } from 'next/navigation';
import Masthead from '@/components/Masthead';
import Footer from '@/components/Footer';
import Ticker from '@/components/Ticker';
import { getAllEssays, getEssayBySlug } from '@/lib/essays';

export async function generateStaticParams() {
  const essays = getAllEssays();
  return essays.map((essay) => ({ slug: essay.slug }));
}

export default function EssayPage({ params }: { params: { slug: string } }) {
  const essay = getEssayBySlug(params.slug);

  if (!essay) {
    notFound();
  }

  return (
    <>
      <Ticker />
      <Masthead />
      <main className="essay-page">
        <div className="feature-meta">{essay.category}</div>
        <h1>{essay.title}</h1>
        {essay.dek && <p className="dek">{essay.dek}</p>}
        <div className="byline">
          <span>{essay.author}</span>
          {essay.date && <span>{essay.date}</span>}
          {essay.readTime && <span>{essay.readTime}</span>}
        </div>
        <div className="essay-body" dangerouslySetInnerHTML={{ __html: essay.html }} />
        <Link href="/" className="back-link">
          ← back to the river
        </Link>
      </main>
      <Footer />
    </>
  );
}
