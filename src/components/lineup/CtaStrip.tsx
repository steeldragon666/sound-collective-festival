import { Link } from 'react-router';
import { motion } from 'framer-motion';

/** S5 — CTA strip above the footer: title slides in from the left, ticket CTA from the right. */
export function CtaStrip() {
  return (
    <section className="bg-sky-deep py-16 md:py-20">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-5 md:px-8">
        <motion.h2
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.85 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-display text-[clamp(1.4rem,3vw,2.25rem)] uppercase leading-none text-cream drop-shadow-[4px_4px_0_#1E323E]"
        >
          Don&apos;t miss a beat
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.85 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-wrap items-center gap-5"
        >
          <p className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-cream/70">
            From $169.90 · PayPal Pay In 4 available
          </p>
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
            <Link
              to="/tickets"
              className="inline-block rounded-full border-2 border-ink bg-coral px-8 py-3 font-display text-sm uppercase tracking-wide text-cream shadow-poster-sm"
            >
              Get Tickets
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default CtaStrip;
