import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

/**
 * Shared layout: announcement ticker + sticky navbar (in normal flow),
 * page content slot, footer. Pages do NOT compensate for nav height —
 * the sticky nav occupies its own space in the document flow.
 *
 * Routing contract: this Layout renders `{children}`, so App.tsx must
 * wrap `<Routes>` as children: `<Layout><Routes>…</Routes></Layout>`.
 */
export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  // Lenis smooth scroll, synced with GSAP ScrollTrigger
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const lenis = new Lenis({ lerp: 0.09 });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar />
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex-1"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}

export default Layout;
