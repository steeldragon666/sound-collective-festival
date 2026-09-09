import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const MEGATIX_URL = 'https://megatix.com.au';

interface TicketCardProps {
  /** e.g. "1ST RELEASE", "VIP" */
  tier: string;
  /** e.g. "$169.90" — accepts a node so prices can count up */
  price: ReactNode;
  /** One-line note, e.g. "Entry" */
  note?: string;
  /** Inclusion list rendered with coral ✓ */
  features?: string[];
  /** VIP treatment: sky-deep bg, cream type, coral sun badge */
  vip?: boolean;
  /** Buy link (Megatix) */
  href?: string;
  /** Compact teaser layout (no perforation stub) */
  compact?: boolean;
  className?: string;
}

export function TicketCard({
  tier,
  price,
  note,
  features,
  vip = false,
  href = MEGATIX_URL,
  compact = false,
  className,
}: TicketCardProps) {
  return (
    <motion.div
      initial={{ rotate: -1 }}
      whileHover={{ rotate: 0, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'ticket-notch relative rounded-2xl border-[3px] border-ink shadow-poster',
        vip ? 'bg-sky-deep text-cream' : 'bg-cream text-ink',
        className,
      )}
    >
      {vip && (
        <span className="absolute -right-3 -top-3 flex h-14 w-14 rotate-12 items-center justify-center rounded-full border-2 border-ink bg-coral font-display text-xs text-cream shadow-poster-sm">
          VIP
        </span>
      )}

      <div className={cn('p-6', compact ? 'pb-5' : 'pb-4')}>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-coral">{tier}</p>
        <p className="display-poster-sm mt-2 font-display text-[clamp(1.4rem,3vw,2.25rem)] uppercase leading-none">
          {price}
        </p>
        {note && (
          <p className={cn('mt-2 font-sans text-sm font-medium', vip ? 'text-cream/80' : 'text-ink/80')}>{note}</p>
        )}
      </div>

      {!compact && (
        <>
          {/* Perforation line */}
          <div
            className={cn('mx-5 border-t-2 border-dashed', vip ? 'border-cream/50' : 'border-ink/60')}
            aria-hidden="true"
          />
          <div className="p-6 pt-4">
            {features && features.length > 0 && (
              <ul className="mb-5 space-y-2">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 font-sans text-sm">
                    <span className="font-bold text-coral">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="block rounded-full border-2 border-ink bg-coral py-2.5 text-center font-display text-xs uppercase tracking-wide text-cream shadow-poster-sm"
              >
                Buy on Megatix
              </a>
            </motion.div>
          </div>
        </>
      )}

      {compact && (
        <div className="px-6 pb-6">
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="block rounded-full border-2 border-ink bg-coral py-2 text-center font-display text-[0.7rem] uppercase tracking-wide text-cream shadow-poster-sm"
            >
              Buy on Megatix →
            </a>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

export default TicketCard;
