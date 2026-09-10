import { motion } from 'framer-motion';
import { MEGATIX_URL } from '@/components/TicketCard';

const PRIZES = [
  '2× VIP tickets',
  "2 nights' accommodation",
  '$250 bar spend',
  'Side-of-stage access',
];

/** S8 — prize pack competition band on coral. */
export function CompBanner() {
  return (
    <section className="border-y-[3px] border-ink bg-coral">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative overflow-hidden rounded-3xl border-[3px] border-ink bg-cream p-8 shadow-poster md:p-12"
        >
          {/* Prize pack panel */}
          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-display text-[clamp(1.4rem,3vw,2.25rem)] uppercase leading-tight text-ink">
                Win the Ultimate Festival Pack
              </h2>
              <ul className="mt-6 space-y-3">
                {PRIZES.map((prize, i) => (
                  <motion.li
                    key={prize}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
                    className="flex items-center gap-3 font-sans text-base font-bold text-ink"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-sky-deep font-bold text-cream">
                      ✓
                    </span>
                    {prize}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="md:pl-8">
              <p className="font-sans text-lg font-medium leading-relaxed text-ink/90">
                Register for presale and you're in the draw.
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
                Presale opens Thu 17 Sep 2026, 9am local
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CompBanner;
