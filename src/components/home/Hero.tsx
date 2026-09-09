import { useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function HollowLine({ text, align }: { text: string; align: 'left' | 'right' }) {
  return (
    <div
      className={`hero-hollow hero-hollow-${align} pointer-events-none select-none whitespace-nowrap font-display uppercase leading-[0.88] tracking-[-0.01em] text-[clamp(3.5rem,11vw,10rem)]`}
      style={{ WebkitTextStroke: '3px rgba(30,50,62,0.25)', color: 'transparent' }}
      aria-hidden="true"
    >
      {text.split('').map((ch, i) => (
        <span key={i} className="hero-char inline-block">
          {ch}
        </span>
      ))}
    </div>
  );
}

export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) return;

      // Load timeline
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .fromTo(
          '.hero-poster',
          { scale: 0.9, rotate: -4, opacity: 0 },
          { scale: 1, rotate: -1.5, opacity: 1, duration: 1, ease: 'back.out(1.4)' },
          0.2,
        )
        .fromTo(
          '.hero-hollow-left .hero-char',
          { x: -80, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, stagger: 0.04 },
          0.1,
        )
        .fromTo(
          '.hero-hollow-right .hero-char',
          { x: 80, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, stagger: 0.04 },
          0.1,
        )
        .fromTo('.hero-sun', { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, 0.3)
        .fromTo('.hero-palm-left', { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1.1 }, 0.4)
        .fromTo('.hero-palm-right', { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1.1 }, 0.4)
        .fromTo('.hero-ctas', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.9)
        .fromTo('.hero-cue', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.2);

      // Scroll parallax (scrubbed over 100vh)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: 'top top',
          end: '+=100%',
          scrub: true,
        },
      });
      scrollTl
        .to('.hero-poster', { y: -70 }, 0)
        .to('.hero-hollow', { y: 40 }, 0)
        .to('.hero-sun', { y: -120, rotate: 15 }, 0)
        .to('.hero-palm-left, .hero-palm-right', { y: 90 }, 0)
        .to('.hero-cue', { opacity: 0 }, 0);
    },
    { scope },
  );

  return (
    <section ref={scope} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-sky">
      {/* Hollow headline backdrop */}
      <div className="pointer-events-none absolute inset-x-0 top-6 md:top-10">
        <div className="-ml-[4vw]">
          <HollowLine text="SOUND" align="left" />
        </div>
        <div className="-mr-[4vw] text-right">
          <HollowLine text="COLLECTIVE" align="right" />
        </div>
      </div>

      {/* Sun disc top-right */}
      <img
        src="/decor/sun-disc.svg"
        alt=""
        className="hero-sun pointer-events-none absolute -right-16 top-[8%] w-[300px] md:right-[4%] md:w-[500px]"
      />

      {/* Flanking palms */}
      <img
        src="/decor/palm-tree.svg"
        alt=""
        className="hero-palm-left pointer-events-none absolute -left-[8%] bottom-0 w-[38vw] max-w-[420px] opacity-90 md:w-[26vw]"
      />
      <img
        src="/decor/palm-tree.svg"
        alt=""
        className="hero-palm-right pointer-events-none absolute -right-[8%] bottom-0 w-[38vw] max-w-[420px] -scale-x-100 opacity-90 md:w-[26vw]"
      />

      {/* Poster frame */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-24 pt-16">
        <motion.div
          whileHover={{ rotate: 0, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="hero-poster group rounded-lg border-[3px] border-ink bg-cream p-3 shadow-poster-lg hover:shadow-[18px_18px_0_#1E323E]"
          style={{ rotate: -1.5 }}
        >
          <img
            src="/admat-hero.jpg"
            alt="Official Sound Collective ADMAT poster — full lineup billing"
            className="h-[52vh] w-auto rounded-sm object-cover md:h-[62vh] lg:h-[68vh]"
            fetchPriority="high"
          />
        </motion.div>
        <p className="mt-5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ink/70">
          Official ADMAT — Sound Collective · Gold Coast
        </p>
      </div>

      {/* Foreground CTA strip */}
      <div className="hero-ctas relative z-20 mx-auto -mt-20 flex w-full max-w-4xl flex-wrap items-center justify-center gap-5 px-5 pb-20">
        <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
          <Link
            to="/tickets"
            className="inline-block rounded-full border-2 border-ink bg-coral px-8 py-3.5 font-display text-sm uppercase tracking-wide text-cream shadow-poster-sm"
          >
            Get Tickets
          </Link>
        </motion.div>
        <p className="order-last w-full text-center font-mono text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ink sm:order-none sm:w-auto">
          Sat 20 Feb 2027 — Broadwater Parklands — 18+
        </p>
        <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
          <Link
            to="/lineup"
            className="inline-block rounded-full border-2 border-ink bg-transparent px-8 py-3.5 font-display text-sm uppercase tracking-wide text-ink transition-colors hover:bg-sand"
          >
            Full Lineup
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="hero-cue absolute bottom-4 left-1/2 z-20 -translate-x-1/2 flex-col items-center hidden sm:flex">
        <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.3em] text-ink/70">Scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <ChevronDown className="h-5 w-5 text-ink" />
        </motion.span>
      </div>
    </section>
  );
}

export default Hero;
