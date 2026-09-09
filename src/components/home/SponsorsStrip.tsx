import { motion } from 'framer-motion';

const PARTNERS = ['Experience Gold Coast', 'Destroy All Lines', 'Finders Keepers Group', 'Happen'];

/** S9 — sponsors strip on sky-deep, pre-footer. */
export function SponsorsStrip() {
  return (
    <section className="bg-sky-deep">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <p className="text-center font-mono text-xs font-bold uppercase tracking-[0.18em] text-cream/50">
          Proudly presented with
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {PARTNERS.map((partner, i) => (
            <motion.span
              key={partner}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex items-center gap-10"
            >
              <span className="cursor-default font-sans text-sm font-bold uppercase tracking-[0.12em] text-cream/70 transition-all hover:-translate-y-0.5 hover:text-cream md:text-base">
                {partner}
              </span>
              {i < PARTNERS.length - 1 && (
                <img src="/decor/palm-frond.svg" alt="" className="hidden h-5 w-8 object-cover opacity-50 sm:block" />
              )}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SponsorsStrip;
