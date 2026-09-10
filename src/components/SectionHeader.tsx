import { Fragment } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  /** e.g. "01 — THE LINEUP" (the ★ glyph is added automatically) */
  kicker: string;
  title: string;
  /** Optional right-aligned tertiary link */
  linkText?: string;
  linkHref?: string;
  /** Dark sections use cream title; light sections use poster treatment */
  variant?: 'light' | 'dark';
  className?: string;
}

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

export function SectionHeader({ kicker, title, linkText, linkHref, variant = 'light', className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16', className)}>
      <div>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.85 }}
          transition={{ duration: 0.5 }}
          className="mb-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-coral md:text-sm"
        >
          ★ {kicker}
        </motion.p>
        <motion.h2
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.85 }}
          aria-label={title}
          className={cn(
            'font-display uppercase leading-[0.95]',
            'text-[clamp(2rem,5.5vw,4rem)]',
            variant === 'light' ? 'display-poster' : 'text-cream drop-shadow-[5px_5px_0_#1E323E]',
          )}
        >
          {title.split(' ').map((word, wi) => (
            <Fragment key={`${word}-${wi}`}>
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
        </motion.h2>
      </div>
      {linkText && linkHref && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            to={linkHref}
            className={cn(
              'group font-mono text-xs font-bold uppercase tracking-[0.18em] md:text-sm',
              variant === 'light' ? 'text-ink' : 'text-cream',
            )}
          >
            <span className="underline decoration-coral decoration-2 underline-offset-4">{linkText}</span>
            <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      )}
    </div>
  );
}

export default SectionHeader;
