import { useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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

const formContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const formField = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const INPUT_CLASSES =
  'w-full rounded-lg border-2 border-ink bg-cream px-4 py-3 font-sans text-base text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-coral';

const LABEL_CLASSES =
  'mb-2 block font-mono text-xs font-bold uppercase tracking-[0.18em] text-ink';

interface FormState {
  actName: string;
  email: string;
  links: string;
  bio: string;
}

const EMPTY_FORM: FormState = { actName: '', email: '', links: '', bio: '' };

/** S4 — Local artist competition: coral band with steps + application card. */
export function LocalComp() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Demo form (no backend): open a pre-filled mailto draft as the fallback channel.
    const subject = encodeURIComponent(`Local Comp Application — ${form.actName}`);
    const body = encodeURIComponent(
      [
        `Act name: ${form.actName}`,
        `Contact email: ${form.email}`,
        `Music links: ${form.links}`,
        '',
        'Short bio:',
        form.bio,
      ].join('\n'),
    );
    window.location.href = `mailto:${APPLICATIONS_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

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

          {/* Application card */}
          <div className="mt-12 rounded-2xl border-[3px] border-ink bg-sand p-6 shadow-poster md:p-8">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <svg
                    viewBox="0 0 52 52"
                    className="h-16 w-16 rounded-full border-2 border-ink bg-cream"
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M14 27l8 8 16-16"
                      fill="none"
                      stroke="#E8532A"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.15 }}
                    />
                  </svg>
                  <p className="mt-5 font-display text-2xl uppercase text-ink">
                    Application received — good luck!
                  </p>
                  <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-ink/80">
                    Demo form — your email app should have opened with a pre-filled draft. If it
                    didn&apos;t, send your details to{' '}
                    <a
                      href={`mailto:${APPLICATIONS_EMAIL}`}
                      className="font-bold underline decoration-coral decoration-2 underline-offset-4 hover:text-coral"
                    >
                      {APPLICATIONS_EMAIL}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setForm(EMPTY_FORM);
                      setSubmitted(false);
                    }}
                    className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.18em] text-ink underline decoration-coral decoration-2 underline-offset-4 hover:text-coral"
                  >
                    Submit another act →
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  variants={formContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="grid gap-5"
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <motion.div variants={formField}>
                      <label htmlFor="comp-act-name" className={LABEL_CLASSES}>
                        Act name
                      </label>
                      <input
                        id="comp-act-name"
                        type="text"
                        required
                        value={form.actName}
                        onChange={(e) => update('actName')(e.target.value)}
                        placeholder="e.g. The Salty Sunsets"
                        className={INPUT_CLASSES}
                      />
                    </motion.div>
                    <motion.div variants={formField}>
                      <label htmlFor="comp-email" className={LABEL_CLASSES}>
                        Contact email
                      </label>
                      <input
                        id="comp-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => update('email')(e.target.value)}
                        placeholder="you@band.com"
                        className={INPUT_CLASSES}
                      />
                    </motion.div>
                  </div>
                  <motion.div variants={formField}>
                    <label htmlFor="comp-links" className={LABEL_CLASSES}>
                      Music links (SoundCloud / Spotify / YouTube)
                    </label>
                    <input
                      id="comp-links"
                      type="text"
                      required
                      value={form.links}
                      onChange={(e) => update('links')(e.target.value)}
                      placeholder="https://soundcloud.com/yourband …"
                      className={INPUT_CLASSES}
                    />
                  </motion.div>
                  <motion.div variants={formField}>
                    <label htmlFor="comp-bio" className={LABEL_CLASSES}>
                      Short bio
                    </label>
                    <textarea
                      id="comp-bio"
                      required
                      rows={4}
                      value={form.bio}
                      onChange={(e) => update('bio')(e.target.value)}
                      placeholder="Who you are, where you're from, and why you should open Sound Collective…"
                      className={INPUT_CLASSES}
                    />
                  </motion.div>
                  <motion.div variants={formField} className="flex flex-wrap items-center gap-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      className="rounded-full border-2 border-ink bg-coral px-8 py-3 font-display text-sm uppercase tracking-wide text-cream shadow-poster-sm"
                    >
                      Send application
                    </motion.button>
                    <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.15em] text-ink/60">
                      Demo form — opens a pre-filled email draft
                    </p>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LocalComp;
