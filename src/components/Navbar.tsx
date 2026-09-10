import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const LINKS = [
  { to: '/lineup', label: 'Lineup' },
  { to: '/tickets', label: 'Tickets' },
  { to: '/info', label: 'Info' },
  { to: '/faq', label: 'FAQ' },
];

const TICKER_ITEMS = [
  'PRESALE THU 17 SEP 2026 · 9AM',
  'GENERAL ON SALE FRI 18 SEP 2026 · 9AM',
  'STRICTLY 18+',
];

function TickerContent() {
  return (
    <span className="flex items-center shrink-0">
      {TICKER_ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="mx-6 font-display text-sm md:text-base uppercase tracking-[0.04em] text-cream">
            {item}
          </span>
          <span className="mx-1 h-2 w-2 shrink-0 rounded-full bg-cream/80" aria-hidden="true" />
        </span>
      ))}
    </span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="sticky top-0 z-50">
      {/* Announcement ticker */}
      <motion.div
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="marquee-paused overflow-hidden border-b-2 border-ink bg-coral py-1.5"
      >
        <div className="marquee-track animate-marquee">
          <TickerContent />
          <TickerContent />
          <TickerContent />
          <TickerContent />
        </div>
      </motion.div>

      {/* Nav bar */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className={cn(
          'flex h-[72px] items-center justify-between px-5 transition-colors duration-300 md:px-8',
          scrolled ? 'border-b-2 border-cream/40 bg-sky-deep' : 'border-b-2 border-transparent bg-transparent',
        )}
      >
        <Link to="/" className="flex shrink-0 items-center" onClick={() => setOpen(false)} aria-label="Sound Collective Festival — home">
          <img
            src="/brand/logo-clean-640.png"
            alt="Sound Collective — Gold Coast"
            className="h-11 w-auto drop-shadow-[2px_2px_0_rgba(30,50,62,0.6)] md:h-12"
          />
        </Link>

        {/* Desktop links */}
        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'group relative whitespace-nowrap font-sans text-[0.85rem] font-bold uppercase tracking-[0.1em] text-cream',
                  isActive && 'text-sunset',
                )
              }
            >
              {link.label}
              <span className="absolute -bottom-1 left-1/2 h-[3px] w-0 -translate-x-1/2 bg-coral transition-all duration-300 group-hover:w-full" />
            </NavLink>
          ))}
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
            <Link
              to="/tickets"
              className="inline-block rounded-full border-2 border-ink bg-coral px-5 py-2 font-display text-xs uppercase tracking-wide text-cream shadow-poster-sm"
            >
              Get Tickets
            </Link>
          </motion.div>
        </nav>

        {/* Mobile burger */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span
            className={cn(
              'absolute h-[3px] w-6 bg-cream transition-transform duration-300',
              open ? 'rotate-45' : '-translate-y-1.5',
            )}
          />
          <span
            className={cn(
              'absolute h-[3px] w-6 bg-cream transition-transform duration-300',
              open ? '-rotate-45' : 'translate-y-1.5',
            )}
          />
        </button>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-0 z-40 flex flex-col items-center justify-center gap-8 bg-sky-deep pt-24 md:hidden"
          >
            {[{ to: '/', label: 'Home' }, ...LINKS].map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
              >
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="display-poster whitespace-nowrap font-display text-4xl uppercase"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + LINKS.length * 0.07 + 0.07, duration: 0.4 }}
            >
              <Link
                to="/tickets"
                onClick={() => setOpen(false)}
                className="mt-4 inline-block rounded-full border-2 border-ink bg-coral px-8 py-3 font-display text-sm uppercase text-cream shadow-poster-sm"
              >
                Get Tickets
              </Link>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
