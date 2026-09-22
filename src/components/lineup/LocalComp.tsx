import { motion } from 'framer-motion';

/** Public Fillout form that collects band applications for the opening slot. */
const FILLOUT_FORM_URL = 'https://happengroup.fillout.com/soundcollective2';

const APPLICATIONS_EMAIL = 'applications@soundcollectivefestival.com';

const STEPS = [
  { num: '01', label: 'Send us your details' },
  { num: '02', label: 'Include links to your music' },
  { num: '03', label: 'We announce the winner on the poster & socials' },
];

const stepsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const stepItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const stepCircle = {
  hidden: { scale: 0 },
  show: {
    scale: 1,
    transition: { type: 'spring', stiffness: 320, damping: 14 } as const,
  },
};

/** S4 — Local artist competition: coral band with steps + embedded application form. */
export function LocalComp() {
  return (
    <section id="local-comp" className="relative scroll-mt-20 overflow-hidden bg-coral py-20 md:py-28">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="rounded-3xl border-[3px] border-ink bg-cream p-8 shadow-poster-lg md:p-12">
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.85 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-display text-[clamp(2rem,5.5vw,4rem)] uppercase leading-[0.95] text-ink"
          >
            Your band. Main stage.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.85 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="mt-6 max-w-3xl font-sans text-base leading-[1.65] text-ink/90 md:text-lg"
          >
            Sound Collective is searching for the Gold Coast&apos;s next big act to open the
            festival. The winning act joins MAOLI, Stan Walker, Katchafire, SOJA and more on the
            poster as our <strong>Local Comp Winner</strong>.
          </motion.p>

          {/* How to enter */}
          <motion.ol
            variants={stepsContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="mt-10 grid gap-6 md:grid-cols-3"
          >
            {STEPS.map((step) => (
              <motion.li key={step.num} variants={stepItem} className="flex items-start gap-4">
                <motion.span
                  variants={stepCircle}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-coral font-mono text-sm font-bold text-cream shadow-poster-sm"
                >
                  {step.num}
                </motion.span>
                <span className="pt-2 font-sans text-sm font-bold uppercase leading-snug tracking-[0.06em] text-ink">
                  {step.label}
                </span>
              </motion.li>
            ))}
          </motion.ol>

          {/* Application form — embedded Fillout form (live submissions). */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="-mx-5 mt-12 overflow-hidden rounded-2xl border-[3px] border-ink bg-sand shadow-poster md:mx-0"
          >
            <iframe
              src={FILLOUT_FORM_URL}
              title="Sound Collective local artist competition application form"
              loading="lazy"
              allow="clipboard-write; camera; microphone; geolocation"
              className="block h-[clamp(680px,82vh,940px)] w-full border-0 bg-cream"
            />
          </motion.div>

          <p className="mt-5 font-sans text-sm leading-relaxed text-ink/70">
            Form not loading?{' '}
            <a
              href={FILLOUT_FORM_URL}
              target="_blank"
              rel="noreferrer"
              className="font-bold underline decoration-coral decoration-2 underline-offset-4 hover:text-coral"
            >
              Open it in a new tab
            </a>{' '}
            or email us at{' '}
            <a
              href={`mailto:${APPLICATIONS_EMAIL}`}
              className="font-bold underline decoration-coral decoration-2 underline-offset-4 hover:text-coral"
            >
              {APPLICATIONS_EMAIL}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

export default LocalComp;
