import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';

const CHECKLIST: { title: string; text: ReactNode }[] = [
  {
    title: 'Carers & Companion Cards',
    text: (
      <>
        One free carer ticket per paid ticket with a valid Companion Card — arrange via{' '}
        <a
          href="https://megatix.com.au/support"
          target="_blank"
          rel="noreferrer"
          className="font-bold underline decoration-coral decoration-2 underline-offset-4 transition-colors hover:text-coral"
        >
          Megatix support
        </a>
        ; present the card at entry.
      </>
    ),
  },
  {
    title: 'Accessible parking',
    text: 'Carey Park Car Park opposite the site (public car park, not event-managed); drop off/pick up available; use the Ada Bell Way crossing.',
  },
  {
    title: 'Dedicated entry lane',
    text: 'For Disability and Companion Card holders.',
  },
  {
    title: 'The site',
    text: 'Flat, wheelchair accessible; PWD-compliant temporary sanitation; tracked pathways over soft ground.',
  },
  {
    title: 'Medical services',
    text: 'On site — ask any staff or security for assistance.',
  },
];

function Tick({ index }: { index: number }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 text-cream"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M 4 12.5 L 9.5 18 L 20 6"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ delay: 0.3 + index * 0.15, duration: 0.2 }}
      />
    </motion.svg>
  );
}

/** S7 — accessibility checklist panel (sand on sky-deep, continued). */
export function AccessibilitySection() {
  return (
    <section id="accessibility" className="relative scroll-mt-[168px] overflow-hidden bg-sky-deep">
      <img
        src="/decor/monstera.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-14 bottom-6 w-[240px] select-none opacity-25 md:w-[320px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 md:px-8 md:pb-28 md:pt-20">
        <SectionHeader kicker="05 — ACCESSIBILITY" title="EVERYONE'S WELCOME" variant="dark" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-4xl rounded-3xl border-[3px] border-ink bg-sand p-7 shadow-poster md:p-12"
        >
          <p className="font-sans text-lg font-bold leading-relaxed text-ink md:text-xl">
            We're committed to a welcoming, inclusive and accessible festival.
          </p>

          <ul className="mt-8 space-y-6">
            {CHECKLIST.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ delay: 0.15 + i * 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex items-start gap-4"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-palm shadow-poster-sm">
                  <Tick index={i} />
                </span>
                <div>
                  <h3 className="font-sans text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-1 font-sans text-base leading-[1.65] text-ink/85">{item.text}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

export default AccessibilitySection;
