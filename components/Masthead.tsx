import Link from 'next/link';

export default function Masthead() {
  return (
    <header className="masthead">
      <div>
        <div className="wordmark">
          <Link href="/">
            anasharma<span className="dot">.</span>com
          </Link>
        </div>
        <div className="tagline">dispatches from the ai transition. work, cognition, culture, self.</div>
      </div>
      <div>
        <nav className="masthead-nav" aria-label="Primary">
          <Link href="/#essays">essays</Link>
          <Link href="/#signals">signals</Link>
          <Link href="/#about">about</Link>
        </nav>
        <div className="status-line">updated continuously</div>
      </div>
    </header>
  );
}
