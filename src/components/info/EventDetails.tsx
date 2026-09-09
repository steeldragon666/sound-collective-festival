import { motion } from 'framer-motion';
import { CalendarDays, MapPin, IdCard, CreditCard } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { cn } from '@/lib/utils';

const FACTS = [
  {
    label: 'When',
    title: 'Saturday 20 February 2027',
    lines: ['Gates 11:00am', 'Music 11:15am – 10:00pm'],
    Icon: CalendarDays,
  },
  {
    label: 'Where',
    title: 'Broadwater Parklands, Gold Coast',
    lines: [],
    link: { label: 'Open in Google Maps', href: 'https://maps.google.com/?q=Broadwater+Parklands,+Gold+Coast' },
    Icon: MapPin,
  },
  {
    label: 'Who',
    title: 'Strictly 18+',
    lines: ['Valid photo ID required on arrival'],
    anchor: { label: 'See Entry Conditions', id: 'entry' },
    Icon: IdCard,
  },
  {
    label: 'Pay',
    title: 'Cashless site',
    lines: ['Cards and mobile payments only — bring your card, not cash.'],
    Icon: CreditCard,
  },
];

/** S3 — event details: 2×2 tilted fact cards on cream. */
export function EventDetails() {
  return (
    <section id="details" className="scroll-mt-[168px] bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <SectionHeader kicker="01 — THE ESSENTIALS" title="THE BIG PICTURE" />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {FACTS.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 60, rotate: i % 2 === 0 ? -3 : 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1 : 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ rotate: 0, y: -6 }}
              className="rounded-2xl border-[3px] border-ink bg-sand p-7 shadow-poster transition-shadow hover:shadow-[11px_11px_0_#1E323E] md:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-coral">
                  {fact.label}
                </p>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 300, damping: 14 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-ink bg-cream shadow-poster-sm"
                >
                  <fact.Icon className="h-6 w-6 text-sky-deep" strokeWidth={2.2} />
                </motion.div>
              </div>
              <h3 className="mt-4 font-display text-xl uppercase leading-tight text-ink md:text-2xl">
                {fact.title}
              </h3>
              {fact.lines.map((line) => (
                <p key={line} className="mt-2 font-sans text-base leading-relaxed text-ink/85">
                  {line}
                </p>
              ))}
              {fact.link && (
                <a
                  href={fact.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-3 inline-block font-mono text-xs font-bold uppercase tracking-[0.15em] text-ink"
                >
                  <span className="underline decoration-coral decoration-2 underline-offset-4">
                    {fact.link.label}
                  </span>
                  <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              )}
              {fact.anchor && (
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(fact.anchor!.id);
                    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 164, behavior: 'smooth' });
                  }}
                  className={cn(
                    'group mt-3 inline-block font-mono text-xs font-bold uppercase tracking-[0.15em] text-ink',
                  )}
                >
                  <span className="underline decoration-coral decoration-2 underline-offset-4">
                    {fact.anchor.label}
                  </span>
                  <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EventDetails;
