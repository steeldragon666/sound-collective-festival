import Hero from '@/components/home/Hero';
import MarqueeDivider from '@/components/home/MarqueeDivider';
import CountdownSection from '@/components/home/CountdownSection';
import LineupTeaser from '@/components/home/LineupTeaser';
import KeyFacts from '@/components/home/KeyFacts';
import TicketsTeaser from '@/components/home/TicketsTeaser';
import CompBanner from '@/components/home/CompBanner';

/**
 * HOME — the landing page IS the ADMAT poster, brought to life.
 * Rhythm: sky (hero) → sky-deep (marquee/countdown) → cream (lineup)
 * → sand (facts) → sky (tickets) → coral (comp) → sky-deep (sponsor logos in footer).
 */
export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeDivider />
      <CountdownSection />
      <LineupTeaser />
      <KeyFacts />
      <TicketsTeaser />
      <CompBanner />
    </>
  );
}
