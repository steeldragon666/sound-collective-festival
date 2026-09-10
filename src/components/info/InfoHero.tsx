import { Fragment } from 'react';
import { motion } from 'framer-motion';

const META = ['SAT 20 FEB 2027', 'GATES 11AM', 'BROADWATER PARKLANDS', '18+', 'CASHLESS'];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03 } },
};

const charVariant = {
  hidden: { y: '110%', rotate: 6 },
  show: {
    y: '0%',
    rotate: 0,
    transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] },
  },
};

/** S1 — page hero on sky: kicker, display-xl title, meta chips. */
export function InfoHero() {
  return (
    <section className="relative flex min-h-[50vh] flex-col justify-center overflow-hidden bg-sky">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-coral md:text-sm"
        >
          ★ Everything you need to know
        </motion.p>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          aria-label="EVENT INFO"
          className="display-poster text-[clamp(3.5rem,11vw,10rem)] leading-[0.88] tracking-[-0.01em]"
        >
          {'EVENT INFO'.split(' ').map((word, wi) => (
            <Fragment key={word}>
              {wi > 0 && ' '}
              <span className="inline-block whitespace-nowrap">
                {word.split('').map((ch, i) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
                    <motion.span variants={charVariant} className="inline-block whitespace-pre">
                      {ch}
                    </motion.span>
                  </span>
                ))}
              </span>
            </Fragment>
          ))}
        </motion.h1>

        {/* Meta chips */}
        <div className="mt-8 flex flex-wrap items-center gap-2.5 md:gap-3">
          {META.map((item, i) => (
            <motion.span
              key={item}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.5 + i * 0.08,
                type: 'spring',
                stiffness: 320,
                damping: 16,
              }}
              className="rounded-full border-2 border-ink bg-cream px-4 py-1.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.15em] text-ink shadow-poster-sm md:text-xs"
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InfoHero;
