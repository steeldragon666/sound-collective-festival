import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Wallet, RefreshCcw, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const EXTRAS = [
  {
    title: 'Pay in 4',
    Icon: Wallet,
    copy: 'Split it with PayPal Pay In 4 — available from presale.',
  },
  {
    title: 'Resale, Safely',
    Icon: RefreshCcw,
    copy: "Plans change? Resell via Tixel, the official resale partner. Tickets bought outside Megatix or Tixel can't be verified.",
    linkText: 'Tixel',
    linkHref: 'https://tixel.com',
    external: true,
  },
  {
    title: 'Ticket Insurance',
    Icon: ShieldCheck,
    copy: 'Add optional X Cover Ticket Insurance at checkout — covers illness, injury and emergencies. Claims via X Cover. T&Cs and exclusions apply.',
  },
];

/** S6 — good-to-know extras on cream: PayPal Pay In 4, Tixel resale, X Cover. */
export function TicketExtras() {
  return (
    <section className="relative overflow-hidden bg-cream">
      {/* Corner fronds */}
      <img
        src="/decor/palm-frond.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-[-30px] w-[240px] rotate-[140deg] opacity-60"
      />
      <img
        src="/decor/palm-frond.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-[-30px] w-[240px] -scale-x-100 rotate-[-30deg] opacity-60"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-8 md:grid-cols-3">
          {EXTRAS.map((extra, i) => (
            <motion.div
              key={extra.title}
              initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1 : 1 }}
              whileHover={{ rotate: 0, y: -6 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: 'easeOut' }}
              className="rounded-2xl border-[3px] border-ink bg-sand p-6 shadow-poster"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: i * 0.1 + 0.35, duration: 0.4, type: 'spring', bounce: 0.55 }}
                className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-coral text-cream shadow-poster-sm"
              >
                <extra.Icon className="h-6 w-6" />
              </motion.div>
              <h3 className="mt-4 font-display text-xl uppercase leading-none text-ink">{extra.title}</h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-ink/85">{extra.copy}</p>
              {extra.linkText && extra.linkHref && (
                <a
                  href={extra.linkHref}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-4 inline-block font-mono text-xs font-bold uppercase tracking-[0.18em] text-ink"
                >
                  <span className="underline decoration-coral decoration-2 underline-offset-4">{extra.linkText}</span>
                  <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={cn('mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center')}
        >
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-ink/70">
            Strictly 18+ · Valid photo ID required · Non-refundable event — see FAQ for details.
          </p>
          <Link
            to="/faq"
            className="group font-mono text-xs font-bold uppercase tracking-[0.18em] text-ink"
          >
            <span className="underline decoration-coral decoration-2 underline-offset-4">Read the full FAQ</span>
            <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default TicketExtras;
