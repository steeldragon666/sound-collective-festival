import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const INFO_SECTIONS = [
  { id: 'details', label: 'Details' },
  { id: 'getting-there', label: 'Getting There' },
  { id: 'entry', label: 'Entry Conditions' },
  { id: 'food', label: 'Food & Merch' },
  { id: 'accessibility', label: 'Accessibility' },
] as const;

/** Extra offset so targets clear the sticky ticker + navbar + this subnav. */
const SCROLL_OFFSET = 164;

/** S2 — sticky anchor subnav with scrollspy (desktop only). */
export function AnchorNav() {
  const [active, setActive] = useState<string>(INFO_SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    for (const s of INFO_SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Info sections"
      className="sticky top-[104px] z-40 hidden border-b-[3px] border-ink bg-cream md:block"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-5 md:px-8">
        {INFO_SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollTo(s.id)}
              className={cn(
                'relative whitespace-nowrap px-4 py-4 font-sans text-[0.8rem] font-bold uppercase tracking-[0.12em] transition-colors duration-300',
                isActive ? 'text-coral' : 'text-ink hover:text-sky-deep',
              )}
            >
              {s.label}
              {isActive && (
                <motion.span
                  layoutId="info-anchor-underline"
                  transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-x-3 bottom-2 h-[3px] bg-coral"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default AnchorNav;
