import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';

/** Stroke-drawn icon wrapper: draws its strokes in on scroll reveal. */
function DrawnIcon({ children, label }: { children: ReactNode; label: string }) {
  return (
    <motion.svg
      viewBox="0 0 48 48"
      role="img"
      aria-label={label}
      className="h-14 w-14 text-cream"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.8 }}
    >
      {children}
    </motion.svg>
  );
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { delay: 0.15 * i, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

function PlateIcon() {
  return (
    <DrawnIcon label="Food">
      <motion.circle variants={draw} custom={0} cx="24" cy="24" r="17" />
      <motion.circle variants={draw} custom={1} cx="24" cy="24" r="8" />
      <motion.path variants={draw} custom={2} d="M 3 14 V 34 M 7 14 V 34 M 3 24 H 7" />
      <motion.path variants={draw} custom={3} d="M 45 14 V 34 M 45 14 C 41 14 41 24 45 24" />
    </DrawnIcon>
  );
}

function CupIcon() {
  return (
    <DrawnIcon label="The bar">
      <motion.path variants={draw} custom={0} d="M 12 10 H 36 L 33 40 H 15 Z" />
      <motion.path variants={draw} custom={1} d="M 14 22 H 34" />
      <motion.path variants={draw} custom={2} d="M 28 10 L 32 3" />
    </DrawnIcon>
  );
}

function TeeIcon() {
  return (
    <DrawnIcon label="Merchandise">
      <motion.path
        variants={draw}
        custom={0}
        d="M 18 8 L 8 14 L 12 23 L 16 20 V 40 H 32 V 20 L 36 23 L 40 14 L 30 8 C 30 12 27 14 24 14 C 21 14 18 12 18 8 Z"
      />
      <motion.path variants={draw} custom={1} d="M 20 30 H 28" />
      <motion.path variants={draw} custom={2} d="M 20 34 H 26" />
    </DrawnIcon>
  );
}

const CARDS = [
  {
    title: 'Food',
    text: 'A range of cuisines with dietary requirements covered.',
    Icon: PlateIcon,
  },
  {
    title: 'The Bar',
    text: 'Beer, champagne, wine and spirits, plus non-alcoholic options. Free water stations across the site. No external food or drink.',
    Icon: CupIcon,
  },
  {
    title: 'Merch',
    text: 'Official festival and artist merchandise, card facilities only.',
    Icon: TeeIcon,
  },
];

/** S6 — food, drinks & merch on sky-deep. */
export function FoodMerch() {
  return (
    <section id="food" className="scroll-mt-[168px] bg-sky-deep">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 md:px-8 md:pt-28">
        <SectionHeader kicker="04 — ON THE DAY" title="EAT, DRINK, REP THE MERCH" variant="dark" />

        <div className="grid gap-8 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="rounded-2xl border-[3px] border-cream/60 bg-ink/40 p-7 transition-[border-color,box-shadow] duration-300 hover:border-coral hover:shadow-[8px_8px_0_#E8532A] md:p-8"
            >
              <card.Icon />
              <h3 className="mt-5 font-display text-xl uppercase leading-tight text-cream md:text-2xl">
                {card.title}
              </h3>
              <p className="mt-3 font-sans text-base leading-[1.65] text-cream/85">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FoodMerch;
