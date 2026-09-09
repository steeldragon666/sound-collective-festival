import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';

const STEPS = [
  {
    num: '01',
    title: 'Request',
    copy: 'Register for presale and reserve the tickets you want.',
  },
  {
    num: '02',
    title: 'Relax',
    copy: 'A reservation is not a purchase until confirmed — no holds, no pre-auths.',
  },
  {
    num: '03',
    title: 'Confirm',
    copy: "You're only charged if your reservation is successful. We'll email you either way.",
  },
  {
    num: '04',
    title: 'Manage',
    copy: "Update payment or cancel anytime via My Orders on Megatix. Failed payment? We'll email you to retry.",
  },
];

/** S4 — Megatix Reserve 4-step explainer on sand. */
export function ReserveExplainer() {
  return (
    <section className="relative bg-sand">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <SectionHeader kicker="How Presale Works" title="MEGATIX RESERVE, EXPLAINED." />

        <div className="relative">
          {/* Connector dashed line across steps (desktop) */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="absolute left-[12%] right-[12%] top-7 hidden origin-left border-t-[3px] border-dashed border-ink/50 lg:block"
            aria-hidden="true"
          />

          <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: i * 0.12, duration: 0.55, ease: 'easeOut' }}
                className="relative rounded-2xl border-[3px] border-ink bg-cream p-6 shadow-poster-sm"
              >
                <motion.p
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ delay: i * 0.12 + 0.2, duration: 0.4, type: 'spring', bounce: 0.55 }}
                  className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-coral"
                >
                  {step.num}
                </motion.p>
                <h3 className="mt-3 font-display text-xl uppercase leading-none text-ink">{step.title}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-ink/85">{step.copy}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 font-mono text-xs font-bold uppercase tracking-[0.18em] text-ink md:text-sm"
        >
          Questions?{' '}
          <a
            href="https://megatix.com.au/support"
            target="_blank"
            rel="noreferrer"
            className="group text-ink"
          >
            <span className="underline decoration-coral decoration-2 underline-offset-4">Megatix Support</span>
            <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </motion.p>
      </div>
    </section>
  );
}

export default ReserveExplainer;
