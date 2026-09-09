import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MEGATIX_URL } from '@/components/TicketCard';

const PRIZES = [
  '2× VIP tickets',
  "2 nights' accommodation",
  '$250 bar spend',
  'Side-of-stage access',
];

/** S5 — prize pack competition band on coral. */
export function PrizePackComp() {
  const scope = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: scope,
    offset: ['start end', 'end start'],
  });
  const sunRotate = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section ref={scope} className="border-y-[3px] border-ink bg-coral">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative overflow-hidden rounded-3xl border-[3px] border-ink bg-cream p-8 shadow-poster md:p-12"
        >
          {/* Slowly rotating sun behind the panel */}
          <motion.img
            src="/decor/sun-disc.svg"
            alt=""
            aria-hidden="true"
            style={{ rotate: sunRotate }}
            className="pointer-events-none absolute -right-24 -top-16 w-[300px] opacity-90 md:w-[420px]"
          />

          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-3 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-coral md:text-sm">
                <img src="/decor/sun-disc.svg" alt="" className="h-4 w-6 object-cover object-bottom" />
                ★ Competition
              </p>
              <h2 className="font-display text-[clamp(2rem,5.5vw,4rem)] uppercase leading-[0.95] text-ink drop-shadow-[4px_4px_0_rgba(30,50,62,0.25)]">
                Win the Ultimate Festival Pack
              </h2>
              <ul className="mt-8 flex flex-wrap gap-3">
                {PRIZES.map((prize, i) => (
                  <motion.li
                    key={prize}
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.4, type: 'spring', bounce: 0.45 }}
                    className="flex items-center gap-2 rounded-full border-2 border-ink bg-sky-deep px-4 py-2 font-sans text-sm font-bold text-cream"
                  >
                    <span className="font-bold text-coral">✓</span>
                    {prize}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="md:pl-8">
              <p className="font-sans text-lg font-medium leading-relaxed text-ink/90">
                Register for presale — that's the only step required to enter. Optionally reserve your
                tickets while you're there.
              </p>
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                animate={{ boxShadow: ['5px 5px 0 #1E323E', '8px 8px 0 #1E323E', '5px 5px 0 #1E323E'] }}
                transition={{ boxShadow: { duration: 3, repeat: Infinity } }}
                className="mt-6 inline-block rounded-full"
              >
                <a
                  href={MEGATIX_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-full border-2 border-ink bg-coral px-8 py-3.5 font-display text-sm uppercase tracking-wide text-cream"
                >
                  Register for Presale
                </a>
              </motion.div>
              <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink/60">
                Presale opens Thu 17 Sep 2026, 9am local · Winner notified by email
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PrizePackComp;
