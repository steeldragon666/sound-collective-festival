import { motion } from 'framer-motion';

const ACTS = [
  'MAOLI',
  'STAN WALKER',
  'KATCHAFIRE',
  'SOJA',
  'ARRESTED DEVELOPMENT',
  'A.R.T',
  'BRADAMON',
  'RIAH',
  '+ LOCAL COMP WINNER',
];

function MarqueeRun() {
  return (
    <span className="flex shrink-0 items-center">
      {ACTS.map((act) => (
        <span key={act} className="flex items-center">
          <span className="mx-6 whitespace-nowrap font-display text-xl uppercase tracking-[0.04em] text-cream md:text-3xl">
            {act}
          </span>
          <span className="text-xl text-sunset md:text-2xl">★</span>
        </span>
      ))}
    </span>
  );
}

/** S3 — full-width lineup marquee divider on sky-deep. */
export function MarqueeDivider() {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="marquee-paused overflow-hidden border-y-[3px] border-ink bg-sky-deep py-4"
    >
      <div className="marquee-track animate-marquee-slow">
        <MarqueeRun />
        <MarqueeRun />
        <MarqueeRun />
        <MarqueeRun />
      </div>
    </motion.div>
  );
}

export default MarqueeDivider;
