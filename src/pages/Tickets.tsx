import TicketsHero from '@/components/tickets/TicketsHero';
import OnSaleTimeline from '@/components/tickets/OnSaleTimeline';
import TicketTiers from '@/components/tickets/TicketTiers';
import ReserveExplainer from '@/components/tickets/ReserveExplainer';
import PrizePackComp from '@/components/tickets/PrizePackComp';
import TicketExtras from '@/components/tickets/TicketExtras';

/**
 * TICKETS — everything a fan needs to buy with confidence.
 * Rhythm: sky (hero) → cream (timeline) → sky-deep (tiers) → sand (Reserve)
 * → coral (comp) → cream (extras) → sky-deep (global footer via Layout).
 */
export default function Tickets() {
  return (
    <>
      <TicketsHero />
      <OnSaleTimeline />
      <TicketTiers />
      <ReserveExplainer />
      <PrizePackComp />
      <TicketExtras />
    </>
  );
}
