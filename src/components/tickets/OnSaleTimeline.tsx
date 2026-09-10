import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';

const EVENTS = [
  {
    label: 'Presale',
    date: 'Thursday 17 September 2026 · 9am local',
    copy: 'Register via Megatix Reserve — request tickets, only charged if successful.',
    badge: 'Register Now',
    href: 'https://megatix.com.au',
  },
  {
    label: 'General Release',
    date: 'Friday 18 September 2026 · 9am local',
    copy: 'All remaining tickets on sale via Megatix.',
    badge: 'Set a Reminder',
    href: 'https://megatix.com.au',
  },
];

/** S2 — on-sale timeline on cream: dashed rail, sun-disc nodes, side note. */
export function OnSaleTimeline() {
  return (
    <section className="relative bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <SectionHeader kicker="Key Dates" title="MARK THE CALENDAR" />

        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:items-start">
          {/* Timeline */}
          <div className="relative">
            {/* Horizontal rail (desktop) */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute left-0 right-0 top-7 hidden origin-left border-t-[3px] border-dashed border-ink lg:block"
              aria-hidden="true"
            />
            {/* Vertical rail (mobile/tablet) */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute bottom-4 left-7 top-7 origin-top border-l-[3px] border-dashed border-ink lg:hidden"
              aria-hidden="true"
            />

            <ol className="relative grid gap-12 lg:grid-cols-2 lg:gap-8">
              {EVENTS.map((event, i) => (
                <li key={event.label} className="flex gap-6 lg:flex-col lg:gap-0">
                  {/* Timeline node */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ delay: 0.3 + i * 0.2, duration: 0.5, type: 'spring', bounce: 0.5 }}
                    className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[3px] border-ink bg-coral shadow-poster-sm"
                    aria-hidden="true"
                  >
                    <span className="font-display text-lg text-cream">{event.label[0]}</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: 0.35 + i * 0.15, duration: 0.55, ease: 'easeOut' }}
                    className="lg:mt-6"
                  >
                    <p className="font-display text-[clamp(1.4rem,3vw,2.25rem)] uppercase leading-none text-ink">
                      {event.label}
                    </p>
                    <p className="mt-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-coral">
                      {event.date}
                    </p>
                    <p className="mt-3 max-w-md font-sans text-base leading-relaxed text-ink/85">{event.copy}</p>
                    <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }} className="mt-5 inline-block">
                      <a
                        href={event.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block rounded-full border-2 border-ink bg-coral px-6 py-2.5 font-display text-xs uppercase tracking-wide text-cream shadow-poster-sm"
                      >
                        {event.badge}
                      </a>
                    </motion.div>
                  </motion.div>
                </li>
              ))}
            </ol>
          </div>

          {/* Side note card */}
          <motion.aside
            initial={{ opacity: 0, y: 30, rotate: 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
            className="rounded-2xl border-[3px] border-ink bg-sand p-6 shadow-poster"
          >
            <p className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-coral">
              Good to know
            </p>
            <p className="mt-3 font-sans text-base leading-relaxed text-ink">
              Tickets issued once general release is on sale — find them in your Megatix account.
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

export default OnSaleTimeline;
