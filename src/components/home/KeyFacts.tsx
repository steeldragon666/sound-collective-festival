import { motion } from 'framer-motion';
import { CalendarDays, MapPin, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

const FACTS = [
  {
    kicker: 'The Date',
    title: 'SAT 20 FEB 2027',
    lines: ['Gates 11am · Finish 10pm'],
    Icon: CalendarDays,
  },
  {
    kicker: 'The Place',
    title: 'BROADWATER PARKLANDS',
    lines: ['Gold Coast, QLD'],
    link: { label: 'Open in Maps', href: 'https://maps.google.com/?q=Broadwater+Parklands,+Gold+Coast' },
    Icon: MapPin,
  },
  {
    kicker: 'The Rule',
    title: null,
    badge: '18+',
    lines: ['Strictly 18+ · Valid photo ID required'],
    Icon: null,
  },
  {
    kicker: 'The Wallet',
    title: 'CASHLESS EVENT',
    lines: ['Cards only on site'],
    Icon: CreditCard,
  },
];

/** S6 — key facts on sand, 4 hard-shadow cards. */
export function KeyFacts() {
  return (
    <section className="bg-sand">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((fact, i) => (
            <motion.div
              key={fact.kicker}
              initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? -3 : 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1 : 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ rotate: 0, y: -6 }}
              className="rounded-2xl border-[3px] border-ink bg-cream p-6 shadow-poster hover:shadow-[11px_11px_0_#1E323E]"
            >
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-coral">{fact.kicker}</p>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 300, damping: 14 }}
                className="mt-4"
              >
                {fact.badge ? (
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-ink bg-coral font-display text-lg text-cream shadow-poster-sm">
                    {fact.badge}
                  </span>
                ) : fact.Icon ? (
                  <fact.Icon className="h-10 w-10 text-sky-deep" strokeWidth={2.2} />
                ) : null}
              </motion.div>
              {fact.title && (
                <h3 className="mt-4 font-display text-lg uppercase leading-tight text-ink">{fact.title}</h3>
              )}
              {fact.lines.map((line) => (
                <p key={line} className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-ink/70">
                  {line}
                </p>
              ))}
              {fact.link && (
                <a
                  href={fact.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    'group mt-3 inline-block font-mono text-xs font-bold uppercase tracking-[0.15em] text-ink',
                  )}
                >
                  <span className="underline decoration-coral decoration-2 underline-offset-4">{fact.link.label}</span>
                  <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default KeyFacts;
