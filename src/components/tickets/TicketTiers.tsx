import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import TicketCard, { MEGATIX_URL } from '@/components/TicketCard';
import { cn } from '@/lib/utils';

const TIERS = [
  {
    tier: '1ST RELEASE',
    code: '1R',
    price: 169.9,
    note: 'General admission · limited allocation',
    features: ['Full festival entry', 'All stages, all day', 'Strictly 18+ event'],
    chip: 'Sells First',
  },
  {
    tier: '2ND RELEASE',
    code: '2R',
    price: 189.9,
    note: 'General admission',
    features: ['Full festival entry', 'All stages, all day', 'Strictly 18+ event'],
  },
  {
    tier: '3RD RELEASE',
    code: '3R',
    price: 209.9,
    note: 'General admission · final release',
    features: ['Full festival entry', 'All stages, all day', 'Strictly 18+ event'],
  },
  {
    tier: 'VIP',
    code: 'VIP',
    price: 269.9,
    note: 'The premium Sound Collective experience',
    features: [
      'Front-of-stage exclusive area',
      'VIP express entry lane',
      'Private bar, food & toilets',
    ],
    vip: true,
  },
];

/** Price that counts up from $0.00 when its card lands in view. */
function CountUpPrice({ value, delay }: { value: number; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const [display, setDisplay] = useState('0.00');

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 0.9,
      delay,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(v.toFixed(2)),
    });
    return () => controls.stop();
  }, [inView, value, delay]);

  return <span ref={ref}>${display}</span>;
}

/** S3 — four ticket tier cards on sky-deep, dealt in like a hand. */
export function TicketTiers() {
  return (
    <section className="relative bg-sky-deep">
      {/* Wave dividers */}
      <div className="wave-strip animate-wave-drift -translate-y-px" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <SectionHeader variant="dark" kicker="Choose Your Tier" title="FOUR WAYS IN" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="-mt-6 mb-12 font-mono text-xs font-bold uppercase tracking-[0.18em] text-cream/70 md:-mt-10 md:mb-16"
        >
          All prices AUD · Tickets via Megatix · PayPal Pay In 4 available from presale
        </motion.p>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.tier}
              initial={{ opacity: 0, y: 100, rotate: 8 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.7,
                delay: i * 0.14,
                ease: [0.34, 1.4, 0.64, 1] as [number, number, number, number],
              }}
              className="relative"
            >
              {/* Status chip on 1st Release */}
              {t.chip && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.14 + 0.6, duration: 0.4, type: 'spring', bounce: 0.5 }}
                  className="absolute -left-2 -top-3 z-10 -rotate-6 rounded-full border-2 border-ink bg-sunset px-3 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-[0.15em] text-ink shadow-poster-sm"
                >
                  {t.chip}
                </motion.span>
              )}

              <TicketCard
                tier={t.tier}
                price={<CountUpPrice value={t.price} delay={i * 0.14 + 0.3} />}
                note={t.note}
                features={t.features}
                vip={t.vip}
                href={MEGATIX_URL}
                className={cn(
                  'h-full',
                  t.vip && 'bg-gradient-to-b from-sky-deep to-ink shadow-poster-coral',
                )}
              />

              {/* Tier code on the stub edge */}
              <span
                aria-hidden="true"
                className={cn(
                  'pointer-events-none absolute bottom-6 right-4 font-mono text-xs font-bold uppercase tracking-[0.3em] [writing-mode:vertical-rl]',
                  t.vip ? 'text-cream/50' : 'text-ink/40',
                )}
              >
                {t.code}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="wave-strip animate-wave-drift translate-y-px rotate-180" aria-hidden="true" />
    </section>
  );
}

export default TicketTiers;
