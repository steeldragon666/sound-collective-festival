import { motion } from 'framer-motion';

const TITLE = 'TICKETS';
const SUBLINE = 'SAT 20 FEB 2027 · BROADWATER PARKLANDS · STRICTLY 18+ · CASHLESS';

const charContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
};

const charVariant = {
  hidden: { y: '110%', rotate: 6 },
  show: {
    y: '0%',
    rotate: 0,
    transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] },
  },
};

const wordContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.6 } },
};

const wordVariant = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

/** S1 — page hero on sky: char-split TICKETS title, subline. */
export function TicketsHero() {
  return (
    <section className="relative flex min-h-[55dvh] flex-col items-center justify-center overflow-hidden bg-sky px-5 py-20 md:py-24">
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-ink md:text-sm"
        >
          ★ Sound Collective — Gold Coast
        </motion.p>

        <motion.h1
          variants={charContainer}
          initial="hidden"
          animate="show"
          aria-label={TITLE}
          className="display-poster font-display text-[clamp(3.5rem,11vw,10rem)] uppercase leading-[0.88] tracking-[-0.01em]"
        >
          {TITLE.split('').map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
              <motion.span variants={charVariant} className="inline-block">
                {ch}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          variants={wordContainer}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-3xl font-sans text-[clamp(0.85rem,2vw,1.15rem)] font-bold uppercase tracking-[0.08em] text-ink"
        >
          {SUBLINE.split(' ').map((word, i) => (
            <motion.span key={i} variants={wordVariant} className="inline-block whitespace-pre">
              {word}{' '}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </section>
  );
}

export default TicketsHero;
