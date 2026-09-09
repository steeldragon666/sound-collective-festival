import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import SectionHeader from '@/components/SectionHeader';

interface BillingLine {
  text: string;
  /** Tailwind font-size classes */
  size: string;
  style: 'poster' | 'hollow' | 'solid' | 'coral';
}

const LINES: BillingLine[] = [
  { text: 'MAOLI', size: 'text-[clamp(3rem,9vw,7.5rem)]', style: 'poster' },
  { text: 'STAN WALKER', size: 'text-[clamp(2.2rem,6.5vw,5.4rem)]', style: 'hollow' },
  { text: 'KATCHAFIRE · SOJA', size: 'text-[clamp(1.8rem,5.4vw,4.5rem)]', style: 'solid' },
  { text: 'ARRESTED DEVELOPMENT', size: 'text-[clamp(1.6rem,4.7vw,3.9rem)]', style: 'hollow' },
  { text: 'A.R.T · BRADAMON · RIAH', size: 'text-[clamp(1.35rem,4vw,3.4rem)]', style: 'solid' },
  { text: '+ LOCAL COMP WINNER', size: 'text-[clamp(1.2rem,3.6vw,3rem)]', style: 'coral' },
];

/** S5 — poster-billing type wall on cream. */
export function LineupTeaser() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-cream">
      {/* Parallax palm frond top-left */}
      <motion.img
        src="/decor/palm-frond.svg"
        alt=""
        initial={{ y: 0 }}
        whileInView={{ y: -40 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="pointer-events-none absolute -left-24 -top-16 w-[340px] opacity-80 md:w-[460px]"
      />
      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <SectionHeader kicker="01 — THE LINEUP" title="ONE DAY. NINE ACTS." linkText="Full lineup" linkHref="/lineup" />

        <div className="flex flex-col items-center gap-2 text-center md:gap-3" onMouseLeave={() => setHovered(null)}>
          {LINES.map((line, i) => (
            <motion.div
              key={line.text}
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={cn(
                'transition-opacity duration-300',
                hovered !== null && hovered !== i && 'opacity-40',
              )}
            >
              <Link
                to="/lineup"
                onMouseEnter={() => setHovered(i)}
                className={cn(
                  'inline-block font-display uppercase leading-[0.95] tracking-[-0.01em] transition-all duration-300 hover:tracking-[0.02em]',
                  line.size,
                  line.style === 'poster' && 'display-poster hover:text-coral',
                  line.style === 'hollow' && 'text-hollow-deep hover:text-coral hover:[-webkit-text-stroke:2px_var(--cream)] hover:drop-shadow-[4px_4px_0_#1E323E]',
                  line.style === 'solid' && 'text-ink hover:text-coral hover:drop-shadow-[4px_4px_0_#1E323E]',
                  line.style === 'coral' &&
                    'animate-pulse-soft text-coral underline decoration-dashed decoration-2 underline-offset-8 hover:animate-none hover:drop-shadow-[4px_4px_0_#1E323E]',
                )}
              >
                {line.text}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LineupTeaser;
