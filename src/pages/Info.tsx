import InfoHero from '@/components/info/InfoHero';
import AnchorNav from '@/components/info/AnchorNav';
import EventDetails from '@/components/info/EventDetails';
import GettingThere from '@/components/info/GettingThere';
import EntryConditions from '@/components/info/EntryConditions';
import FoodMerch from '@/components/info/FoodMerch';
import AccessibilitySection from '@/components/info/AccessibilitySection';

/**
 * /info — editorial event guide: hero, sticky scrollspy anchor nav,
 * event details, getting there + interactive map, conditions of entry,
 * food & merch, accessibility.
 */
export default function Info() {
  return (
    <>
      <InfoHero />
      <AnchorNav />
      <EventDetails />
      <GettingThere />
      <EntryConditions />
      <FoodMerch />
      <AccessibilitySection />
    </>
  );
}
