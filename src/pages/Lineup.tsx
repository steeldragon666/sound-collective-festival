import { useCallback, useRef, useState } from 'react';
import LineupHero from '@/components/lineup/LineupHero';
import BillingWall from '@/components/lineup/BillingWall';
import ArtistGrid from '@/components/lineup/ArtistGrid';
import LocalComp from '@/components/lineup/LocalComp';
import CtaStrip from '@/components/lineup/CtaStrip';

export default function Lineup() {
  const [flashId, setFlashId] = useState<string | null>(null);
  const flashTimer = useRef<number | null>(null);

  /** Smooth-scroll to an artist card and pulse its coral highlight ring. */
  const jumpToArtist = useCallback((artistId: string) => {
    document.getElementById(`artist-${artistId}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
    if (flashTimer.current) window.clearTimeout(flashTimer.current);
    setFlashId(artistId);
    flashTimer.current = window.setTimeout(() => setFlashId(null), 1400);
  }, []);

  const jumpToComp = useCallback(() => {
    document.getElementById('local-comp')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div>
      <LineupHero />
      <BillingWall onJump={jumpToArtist} onJumpToComp={jumpToComp} />
      <ArtistGrid flashId={flashId} onJumpToComp={jumpToComp} />
      <LocalComp />
      <CtaStrip />
    </div>
  );
}
