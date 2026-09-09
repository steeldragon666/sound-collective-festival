import { useState } from 'react';
import { motion } from 'framer-motion';
import { TramFront, BusFront, Ship, Footprints, CarFront } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import BroadwaterMap, { type RouteKey } from './BroadwaterMap';

const TRANSPORT: {
  key: RouteKey;
  label: string;
  text: string;
  Icon: typeof TramFront;
}[] = [
  {
    key: 'tram',
    label: 'Tram',
    text: 'G:Link to Parklands or Southport South stations, then use the Ada Bell Way crossing to the festival entry.',
    Icon: TramFront,
  },
  {
    key: 'bus',
    label: 'Bus',
    text: 'Services to Australia Fair, then use the Ada Bell Way crossing.',
    Icon: BusFront,
  },
  {
    key: 'ferry',
    label: 'Ferry',
    text: 'Hop off at Southport Pier, turn left and stroll through Broadwater Parklands.',
    Icon: Ship,
  },
  {
    key: 'walk',
    label: 'Walking In',
    text: 'Traffic controllers will be at the Gold Coast Hwy / Ada Bell Way and Gold Coast Hwy / Marine Parade crossings.',
    Icon: Footprints,
  },
  {
    key: 'home',
    label: 'Heading Home',
    text: 'Uber & rideshare pickup zone in front of the Entry Marquee. Police and security will direct crowds to public transport.',
    Icon: CarFront,
  },
];

/** S4 — getting there: transport cards + interactive illustrated map on sky. */
export function GettingThere() {
  const [activeRoute, setActiveRoute] = useState<RouteKey | null>(null);

  return (
    <section id="getting-there" className="scroll-mt-[168px] bg-sky">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <SectionHeader kicker="02 — GETTING THERE" title="LEAVE THE CAR AT HOME" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.85 }}
          transition={{ duration: 0.5 }}
          className="-mt-6 mb-10 font-sans text-lg font-bold uppercase tracking-[0.08em] text-ink/80 md:-mt-10 md:mb-14"
        >
          We strongly recommend public transport.
        </motion.p>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Transport cards */}
          <div className="flex flex-col gap-5">
            {TRANSPORT.map((t, i) => (
              <motion.div
                key={t.key}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -4 }}
                onMouseEnter={() => setActiveRoute(t.key)}
                onMouseLeave={() => setActiveRoute(null)}
                onFocus={() => setActiveRoute(t.key)}
                onBlur={() => setActiveRoute(null)}
                tabIndex={0}
                className="group flex items-start gap-5 rounded-2xl border-[3px] border-ink bg-cream p-5 shadow-poster-sm outline-none transition-shadow hover:shadow-poster focus-visible:shadow-poster md:p-6"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[3px] border-ink bg-coral text-cream shadow-poster-sm transition-transform duration-300 group-hover:rotate-[8deg]">
                  <t.Icon className="h-7 w-7" strokeWidth={2.2} />
                </span>
                <div>
                  <h3 className="font-display text-lg uppercase leading-tight text-ink">{t.label}</h3>
                  <p className="mt-1.5 font-sans text-base leading-relaxed text-ink/85">{t.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Illustrated map with route highlighting */}
          <motion.div
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="rounded-3xl border-[3px] border-ink bg-cream p-3 shadow-poster lg:sticky lg:top-[180px]"
          >
            <div className="overflow-hidden rounded-2xl border-2 border-ink">
              <BroadwaterMap activeRoute={activeRoute} />
            </div>
            <p className="px-2 pb-1 pt-3 text-center font-mono text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ink/70">
              Broadwater Parklands · hover a card to trace its route
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default GettingThere;
