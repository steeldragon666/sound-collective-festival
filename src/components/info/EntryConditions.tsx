import type { ReactNode } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { motion } from 'framer-motion';
import { Plus, Check, X } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/* Chips                                                               */
/* ------------------------------------------------------------------ */

function Chip({ children, variant, index }: { children: string; variant: 'banned' | 'ok'; index: number }) {
  const Icon = variant === 'banned' ? X : Check;
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.03, duration: 0.3 }}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-3.5 py-1.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.08em]',
        variant === 'banned' ? 'bg-coral text-cream' : 'bg-palm text-cream',
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={3} />
      {children}
    </motion.span>
  );
}

function ChipList({ items, variant }: { items: string[]; variant: 'banned' | 'ok' }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <Chip key={item} variant={variant} index={i}>
          {item}
        </Chip>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const ACCEPTED_ID = [
  'AU drivers/riders licence',
  'AU learners permit',
  'AU passport',
  'Foreign passport',
  'Proof of Age card (any state/territory)',
  'Keypass (over 18) from Australia Post',
];

const REJECTED_ID = [
  'School IDs',
  'Expired IDs',
  'Birth certificates',
  'DHS cards',
  'Photocopies',
  'Fake IDs',
  'International drivers licences',
];

const HOUSE_RULES = [
  'Security and bag searches on entry',
  'No passouts — no re-entry once you leave',
  'Respect our neighbours on exit',
  'Zero-tolerance for bad behaviour — removal without refund',
  'Zero-tolerance drug policy',
  'Need help? Ask any security staff',
];

const PROHIBITED: { category: string; items: string[] }[] = [
  { category: 'Substances & refreshments', items: ['Prohibited substances', 'Outside food & drink', 'Glass & metal containers'] },
  { category: 'Weapons & hazards', items: ['Weapons', 'Flammables'] },
  { category: 'Animals', items: ['Animals (accredited assistance animals with ID excepted)'] },
  { category: 'Furniture & bags', items: ['Furniture', 'Large bags over 40×40cm'] },
  { category: 'Vehicles & tech', items: ['Drones', 'Bikes', 'Skateboards', 'Scooters'] },
  {
    category: 'Professional camera gear',
    items: ['Lenses over 5cm', 'Detachable lenses', 'Tripods', 'Selfie sticks'],
  },
  {
    category: 'Apparel',
    items: [
      'Motorcycle / criminal-org apparel',
      'Culturally inappropriate costumes',
      'Chains, spikes & masks',
      'Hi-vis',
      'Studs',
    ],
  },
  { category: 'Promo', items: ['Unauthorised promotional materials'] },
  {
    category: 'Misc',
    items: [
      'Umbrellas',
      'Poles',
      'Banners',
      'Flags',
      'Stuffed animals',
      'Markers',
      'Spray paint',
      'Confetti',
      'Kites',
      'Sky lanterns',
      'Political signage',
      'Instruments',
      'Noise-makers',
    ],
  },
];

const BRING = [
  'Good vibes',
  'Ticket',
  'Photo ID',
  'Card (cashless)',
  'Sun protection',
  'Empty reusable plastic water bottle',
  'Small bag',
  'Wet-weather gear (no umbrellas)',
  'Sensible shoes',
  'Charged phone + power bank',
  'Prescription meds',
];

/* ------------------------------------------------------------------ */
/* Accordion items                                                     */
/* ------------------------------------------------------------------ */

function ItemBody({ children }: { children: ReactNode }) {
  return <div className="space-y-4 px-6 pb-6 pt-0 font-sans text-base leading-[1.65] text-ink/90 md:px-7">{children}</div>;
}

const ITEMS: { value: string; title: string; body: ReactNode }[] = [
  {
    value: 'id-accepted',
    title: "ID — what's accepted",
    body: (
      <>
        <p>18+, ticket + valid photo ID on arrival. Accepted:</p>
        <ChipList items={ACCEPTED_ID} variant="ok" />
      </>
    ),
  },
  {
    value: 'id-rejected',
    title: "ID — what's NOT accepted",
    body: <ChipList items={REJECTED_ID} variant="banned" />,
  },
  {
    value: 'house-rules',
    title: 'House rules',
    body: (
      <ul className="space-y-2.5">
        {HOUSE_RULES.map((rule, i) => (
          <motion.li
            key={rule}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
            className="flex items-start gap-3"
          >
            <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-coral" />
            {rule}
          </motion.li>
        ))}
      </ul>
    ),
  },
  {
    value: 'prohibited',
    title: 'Prohibited items',
    body: (
      <>
        {PROHIBITED.map((group) => (
          <div key={group.category}>
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.15em] text-sky-deep">
              {group.category}
            </p>
            <ChipList items={group.items} variant="banned" />
          </div>
        ))}
        <p className="border-t-2 border-dashed border-ink/30 pt-4">
          Empty plastic bottles and approved hydration packs are OK. Additional items at staff discretion.
        </p>
      </>
    ),
  },
  {
    value: 'bring',
    title: 'What TO bring',
    body: <ChipList items={BRING} variant="ok" />,
  },
  {
    value: 'medication',
    title: 'Prescription medicine',
    body: (
      <p>
        Yes — bring it in original packaging with your name and dosage, plus a copy of the prescription
        (digital is fine). Only bring what you need. Medical equipment and mobility aids are permitted.
      </p>
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

/** S5 — conditions of entry: restyled accordion cards on sand. */
export function EntryConditions() {
  return (
    <section id="entry" className="relative scroll-mt-[168px] overflow-hidden bg-sand">
      {/* Scoped accordion open/close animation (0.35s height spring) */}
      <style>{`
        .info-acc-content { overflow: hidden; }
        .info-acc-content[data-state='open'] { animation: info-acc-down .35s cubic-bezier(.25,.46,.45,.94); }
        .info-acc-content[data-state='closed'] { animation: info-acc-up .3s cubic-bezier(.25,.46,.45,.94); }
        @keyframes info-acc-down { from { height: 0; } to { height: var(--radix-accordion-content-height); } }
        @keyframes info-acc-up { from { height: var(--radix-accordion-content-height); } to { height: 0; } }
        @media (prefers-reduced-motion: reduce) {
          .info-acc-content[data-state='open'], .info-acc-content[data-state='closed'] { animation: none; }
        }
      `}</style>

      <img
        src="/decor/palm-frond.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-10 w-[280px] select-none opacity-60 md:w-[380px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <SectionHeader kicker="03 — CONDITIONS OF ENTRY" title="READ BEFORE YOU ROLL IN" />

        <AccordionPrimitive.Root type="single" collapsible className="flex max-w-4xl flex-col gap-5">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.value}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <AccordionPrimitive.Item
                value={item.value}
                className="rounded-xl border-[3px] border-ink bg-cream transition-shadow duration-300 data-[state=open]:shadow-poster"
              >
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger className="group flex flex-1 items-center justify-between gap-4 rounded-xl px-6 py-5 text-left outline-none focus-visible:ring-[3px] focus-visible:ring-coral md:px-7 md:py-6 [&[data-state=open]>span.info-acc-icon]:rotate-45">
                    <span className="font-sans text-lg font-bold text-ink md:text-xl">{item.title}</span>
                    <span className="info-acc-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-coral text-cream transition-transform duration-300">
                      <Plus className="h-5 w-5" strokeWidth={3} />
                    </span>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="info-acc-content">
                  <ItemBody>{item.body}</ItemBody>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            </motion.div>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  );
}

export default EntryConditions;
