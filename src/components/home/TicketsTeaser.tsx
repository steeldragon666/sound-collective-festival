import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import TicketCard, { MEGATIX_URL } from '@/components/TicketCard';
import SectionHeader from '@/components/SectionHeader';

const TIERS = [
  { tier: '1ST RELEASE', price: 169.9, note: 'Entry' },
  { tier: '2ND RELEASE', price: 189.9, note: 'Entry' },
  { tier: '3RD RELEASE', price: 209.9, note: 'Entry' },
  { tier: 'VIP', price: 269.9, note: 'Front-of-stage + express entry + private bar', vip: true },
];

/** Price that counts up from $0.00 when scrolled into view. */
function CountUpPrice({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const [display, setDisplay] = useState('0.00');

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 0.8,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(v.toFixed(2)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref}>${display}</span>;
}

/** S7 — tickets teaser on sky: 4 mini ticket cards dealt like a hand. */
export function TicketsTeaser() {
  return (
    <section className="relative overflow-hidden bg-sky">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <SectionHeader kicker="02 — TICKETS" title="LOCK IN YOUR SPOT" linkText="All ticket info" linkHref="/tickets" />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.tier}
              initial={{ opacity: 0, y: 80, rotate: 6 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1 : 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <TicketCard
                tier={t.tier}
                price={<CountUpPrice value={t.price} />}
                note={t.note}
                vip={t.vip}
                href={MEGATIX_URL}
                compact
              />
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-center font-mono text-xs uppercase tracking-[0.15em] text-ink/70">
          Presale Thu 17 Sep 2026 · 9am — General Fri 18 Sep 2026 · 9am · PayPal Pay In 4 available
        </p>
      </div>
      <div className="wave-strip animate-wave-drift opacity-60" aria-hidden="true" />
    </section>
  );
}

export default TicketsTeaser;
