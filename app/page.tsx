import Ticker from '@/components/Ticker';
import Footer from '@/components/Footer';
import WorldHUD from '@/components/world/WorldHUD';
import CinematicEntrance from '@/components/world/CinematicEntrance';
import WorldSelection from '@/components/world/WorldSelection';

export const metadata = {
  title: 'anasharma.com — World Selection',
  description:
    'Choose your destination: doomscroll.txt (reading world), Mixmedia Studio (visual world), or The Playground (games and simulations).',
};

export default function Home() {
  return (
    <>
      {/* Book-like cinematic entrance with Ana Sharma */}
      <CinematicEntrance />

      {/* Persistent unobtrusive audio toggle and aura color control */}
      <WorldHUD />
      <Ticker />

      <main className="river">
        {/* World Selection Screen: Three Distinct Destinations */}
        <WorldSelection />
      </main>

      <Footer />
    </>
  );
}
