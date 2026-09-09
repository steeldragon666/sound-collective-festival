import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FAQ_TABS, countResults, searchFaq } from '@/components/faq/faq-data';
import { FaqAccordionList } from '@/components/faq/FaqAccordionList';
import { FaqSearchBar } from '@/components/faq/FaqSearchBar';

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const titleContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const titleChar = {
  hidden: { y: '110%', rotate: 6 },
  show: {
    y: '0%',
    rotate: 0,
    transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] },
  },
};

/** Monstera silhouettes drifting at the section edges, parallax y:-25. */
function MonsteraEdges() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [25, -25]);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.img
        src="/decor/monstera.svg"
        alt=""
        style={{ y }}
        className="absolute -left-16 top-10 w-48 opacity-50 md:-left-10 md:w-64"
      />
      <motion.img
        src="/decor/monstera.svg"
        alt=""
        style={{ y }}
        className="absolute -right-16 bottom-10 w-48 -scale-x-100 opacity-50 md:-right-10 md:w-64"
      />
    </div>
  );
}

export default function Faq() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState(FAQ_TABS[0].value);
  const [openValues, setOpenValues] = useState<string[]>([]);

  const trimmedQuery = query.trim();
  const searching = trimmedQuery.length > 0;

  // Auto-open the first tab's first accordion on load (0.6s delay).
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenValues((current) => (current.length === 0 ? [FAQ_TABS[0].items[0].id] : current));
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Reset open accordions when switching tabs (only relevant when not searching).
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setQuery('');
    setOpenValues([]);
  };

  const searchGroups = useMemo(() => searchFaq(trimmedQuery), [trimmedQuery]);
  const resultCount = useMemo(() => countResults(searchGroups), [searchGroups]);

  // While searching, all matches across all tabs auto-open (event-driven update).
  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      setOpenValues(searchFaq(value).flatMap((g) => g.items.map((item) => item.id)));
    }
  };

  return (
    <div>
      {/* S1 — Page hero (sky-deep) */}
      <section className="relative flex min-h-[45vh] flex-col items-center justify-center overflow-hidden bg-sky-deep px-5 py-20 md:px-8">
        <img
          src="/decor/sun-disc.svg"
          alt=""
          className="pointer-events-none absolute -right-20 -top-10 w-64 opacity-40 md:w-80"
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-coral md:text-sm"
        >
          <img src="/decor/sun-disc.svg" alt="" className="h-4 w-6 object-cover object-bottom" />
          ★ Got Questions?
        </motion.p>
        <motion.h1
          variants={titleContainer}
          initial="hidden"
          animate="show"
          aria-label="FAQ"
          className="display-poster mb-10 font-display uppercase leading-[0.88] tracking-[-0.01em] text-[clamp(3.5rem,11vw,10rem)]"
        >
          {'FAQ'.split('').map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
              <motion.span variants={titleChar} className="inline-block whitespace-pre">
                {ch}
              </motion.span>
            </span>
          ))}
        </motion.h1>
        <FaqSearchBar value={query} onChange={handleQueryChange} />
        {searching && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-cream/80"
          >
            {resultCount} {resultCount === 1 ? 'result' : 'results'} across all topics
          </motion.p>
        )}
      </section>

      {/* S2–S7 — FAQ body (cream) */}
      <section className="relative bg-cream">
        <MonsteraEdges />

        <TabsPrimitive.Root value={activeTab} onValueChange={handleTabChange}>
          {/* Sticky tab bar under the navbar */}
          <div className="sticky top-[104px] z-40 border-b-[3px] border-ink bg-cream/95 backdrop-blur-sm md:top-[106px]">
            <TabsPrimitive.List className="mx-auto flex max-w-7xl snap-x gap-2 overflow-x-auto px-5 py-3 md:flex-wrap md:px-8 md:py-4">
              {FAQ_TABS.map((tab) => (
                <TabsPrimitive.Trigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    'relative shrink-0 snap-start rounded-full px-4 py-2 font-display text-[0.8rem] uppercase tracking-wide outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-coral/50 md:px-5',
                    activeTab === tab.value ? 'text-cream' : 'text-ink hover:bg-sand',
                  )}
                >
                  {activeTab === tab.value && (
                    <motion.span
                      layoutId="faq-tab-pill"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-full border-2 border-ink bg-coral shadow-[4px_4px_0_#1E323E]"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </TabsPrimitive.Trigger>
              ))}
            </TabsPrimitive.List>
          </div>

          <div className="relative mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-20">
            {searching ? (
              /* Cross-tab search results */
              <motion.div
                key={`search-${trimmedQuery}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              >
                {resultCount === 0 ? (
                  <div className="flex flex-col items-center gap-5 py-16 text-center">
                    <img src="/decor/sun-disc.svg" alt="" className="h-16 w-28 object-cover object-bottom" />
                    <p className="font-sans text-lg font-bold text-ink">
                      No matches — try &ldquo;tickets&rdquo;, &ldquo;ID&rdquo;, or &ldquo;parking&rdquo;.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-14">
                    {searchGroups.map((group) => (
                      <div key={group.tab.value}>
                        <p className="mb-5 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-coral">
                          <img src="/decor/sun-disc.svg" alt="" className="h-3.5 w-5 object-cover object-bottom" />
                          {group.tab.label} — {group.items.length} {group.items.length === 1 ? 'match' : 'matches'}
                        </p>
                        <FaqAccordionList
                          items={group.items}
                          value={openValues}
                          onValueChange={setOpenValues}
                          query={trimmedQuery}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              FAQ_TABS.map((tab) => (
                <TabsPrimitive.Content key={tab.value} value={tab.value} className="outline-none">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                  >
                    <FaqAccordionList
                      items={tab.items}
                      value={openValues}
                      onValueChange={setOpenValues}
                      staggerKey={tab.value}
                    />
                  </motion.div>
                </TabsPrimitive.Content>
              ))
            )}
          </div>
        </TabsPrimitive.Root>
      </section>

      {/* S8 — Still stuck? strip (sky-deep) */}
      <section className="bg-sky-deep px-5 py-20 md:px-8 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mx-auto flex max-w-4xl -rotate-1 flex-col items-start gap-6 rounded-3xl border-[3px] border-ink bg-cream p-8 shadow-poster md:flex-row md:items-center md:justify-between md:p-12"
        >
          <div>
            <h2 className="display-poster-sm font-display text-[clamp(1.4rem,3vw,2.25rem)] uppercase leading-[0.95]">
              Still Stuck?
            </h2>
            <p className="mt-4 max-w-xl font-sans text-base leading-[1.65] text-ink/85">
              Ticketing questions → Megatix Support (megatix.com.au/support). Everything else → hit
              us up on socials.
            </p>
          </div>
          <motion.a
            href="https://megatix.com.au/support"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-ink bg-coral px-7 py-3.5 font-display text-sm uppercase tracking-wide text-cream shadow-poster-sm"
          >
            Megatix Support
            <ArrowRight className="h-4 w-4" strokeWidth={3} />
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}
