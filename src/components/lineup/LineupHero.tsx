import { Fragment } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const TITLE = 'THE LINEUP';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03, delayChildren: 0.15 } },
};

const charVariant = {
  hidden: { y: '110%', rotate: 6 },
  show: {
    y: '0%',
    rotate: 0,
    transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] },
  },
};

/** S1 — Page hero: sky-deep, kicker + display-xl title, mini ADMAT thumbnail. */
export function LineupHero() {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-sky-deep">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-20 md:px-8 lg:grid-cols-[1fr_auto]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-coral md:text-sm"
          >
            ★ Saturday 20 February 2027 — Broadwater Parklands
          </motion.p>

          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            aria-label={TITLE}
            className="display-poster font-display text-[clamp(3.5rem,11vw,10rem)] uppercase leading-[0.88] tracking-[-0.01em]"
          >
            {TITLE.split(' ').map((word, wi) => (
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
        </div>

        {/* Mini poster thumbnail linking back to the landing page */}
        <motion.div
          initial={{ y: -60, rotate: 10, opacity: 0 }}
          animate={{ y: 0, rotate: 3, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="justify-self-start lg:justify-self-end"
        >
          <Link to="/" className="group block">
            <img
              src="/admat-hero.jpg"
              alt="Official Sound Collective ADMAT poster"
              className="h-[180px] w-auto rounded-lg border-2 border-ink shadow-poster-sm transition-transform duration-300 group-hover:rotate-0 group-hover:scale-[1.03]"
            />
            <p className="mt-3 text-center font-mono text-[0.6rem] font-bold uppercase tracking-[0.18em] text-cream/60">
              From the official ADMAT
            </p>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default LineupHero;
