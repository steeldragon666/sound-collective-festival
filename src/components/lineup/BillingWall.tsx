import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BillingLine {
  /** Artist ids on this line (each becomes a jump button) */
  ids: string[];
  names: string[];
  sizeClass: string;
  treatment: 'poster' | 'hollow' | 'solid';
}

const LINES: BillingLine[] = [
  {
    ids: ['maoli'],
    names: ['MAOLI'],
    sizeClass: 'text-[clamp(3.5rem,10vw,9rem)]',
    treatment: 'poster',
  },
  {
    ids: ['stan-walker'],
    names: ['STAN WALKER'],
    sizeClass: 'text-[clamp(2.45rem,7vw,6.3rem)]',
    treatment: 'hollow',
  },
  {
    ids: ['katchafire', 'soja'],
    names: ['KATCHAFIRE', 'SOJA'],
    sizeClass: 'text-[clamp(1.5rem,5.8vw,5.22rem)]',
    treatment: 'solid',
  },
  {
    ids: ['arrested-development'],
    names: ['ARRESTED DEVELOPMENT'],
    sizeClass: 'text-[clamp(1.4rem,5vw,4.5rem)]',
    treatment: 'hollow',
  },
  {
    ids: ['art', 'bradamon', 'riah'],
    names: ['A.R.T', 'BRADAMON', 'RIAH'],
    sizeClass: 'text-[clamp(1.15rem,4.2vw,3.78rem)]',
    treatment: 'solid',
  },
];

const TREATMENT_CLASSES: Record<BillingLine['treatment'], string> = {
  poster: 'display-poster hover:text-coral',
  hollow: 'text-hollow-ink hover:text-coral',
  solid: 'text-ink hover:text-coral',
};

interface BillingWallProps {
  /** Smooth-scroll to an artist card + flash its highlight ring */
  onJump: (artistId: string) => void;
  /** Smooth-scroll to the local comp section */
  onJumpToComp: () => void;
}

/** S2 — Billing wall: the poster's typographic hierarchy as an interactive index. */
export function BillingWall({ onJump, onJumpToComp }: BillingWallProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 30]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream py-20 md:py-28">
      {/* Huge hollow 2027 watermark drifting on scroll */}
      <motion.span
        aria-hidden="true"
        style={{ y: watermarkY }}
        className="text-hollow-cream pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[38vw] leading-none opacity-20"
      >
        2027
      </motion.span>

      <div className="group/wall relative mx-auto flex max-w-7xl flex-col items-center px-5 md:px-8">
        {LINES.map((line, lineIndex) => (
          <motion.p
            key={line.names.join('-')}
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.7, delay: lineIndex * 0.12, ease: 'easeOut' }}
            className={cn(
              'whitespace-nowrap font-display uppercase leading-[0.95] tracking-[-0.01em] transition-opacity duration-300 group-hover/wall:opacity-40 hover:!opacity-100',
              line.sizeClass,
            )}
          >
            {line.names.map((name, i) => (
              <span key={name}>
                {i > 0 && <span className="mx-3 text-ink/50 md:mx-5">·</span>}
                <button
                  type="button"
                  onClick={() => onJump(line.ids[i])}
                  className={cn(
                    'cursor-pointer transition-all duration-300 hover:tracking-[0.04em]',
                    TREATMENT_CLASSES[line.treatment],
                  )}
                >
                  {name}
                </button>
              </span>
            ))}
          </motion.p>
        ))}

        {/* Local comp winner line — links to S4 */}
        <motion.p
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7, delay: LINES.length * 0.12, ease: 'easeOut' }}
          className="mt-2 whitespace-nowrap font-display text-[clamp(1.15rem,3.8vw,3.42rem)] uppercase leading-[0.95] transition-opacity duration-300 group-hover/wall:opacity-40 hover:!opacity-100"
        >
          <button
            type="button"
            onClick={onJumpToComp}
            className="cursor-pointer text-coral underline decoration-dashed decoration-[3px] underline-offset-8 transition-all duration-300 hover:text-sunset hover:tracking-[0.04em]"
          >
            + LOCAL COMP WINNER
          </button>
        </motion.p>
      </div>
    </section>
  );
}

export default BillingWall;
