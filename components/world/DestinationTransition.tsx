'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { useRouter } from 'next/navigation';

type DestinationTransitionProps = {
  destination: {
    id: string;
    name: string;
    href: string;
    accent: string;
  };
  onComplete: () => void;
};

export default function DestinationTransition({
  destination,
  onComplete,
}: DestinationTransitionProps) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reducedMotion) {
      router.push(destination.href);
      onComplete();
      return;
    }

    setVisible(true);

    const timer = window.setTimeout(() => {
      router.push(destination.href);
      onComplete();
    }, 1300);

    return () => window.clearTimeout(timer);
  }, [destination.href, router, onComplete]);

  return (
    <div
      className={[
        'destination-transition',
        `destination-transition--${destination.id}`,
        visible ? 'is-active' : '',
      ].join(' ')}
	style={{ '--transition-accent': destination.accent } as CSSProperties}
      role="status"
      aria-live="polite"
      aria-label={`Entering ${destination.name}`}
    >
      <div className="transition-backdrop" />
      <div className="transition-scanlines" />
      <div className="transition-grid" />
      <div className="transition-orb" />
      <div className="transition-title mono">{destination.name}</div>
      <div className="transition-caption mono">INITIALIZING DESTINATION</div>
    </div>
  );
}