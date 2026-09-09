import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

/** Gates open: Saturday 20 February 2027, 11:00am AEST (UTC+10) */
export const COUNTDOWN_TARGET = '2027-02-20T11:00:00+10:00';

interface CountdownProps {
  target?: string;
  className?: string;
}

function getParts(target: number) {
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Min', value: minutes },
    { label: 'Sec', value: seconds },
  ];
}

export function Countdown({ target = COUNTDOWN_TARGET, className }: CountdownProps) {
  const targetMs = new Date(target).getTime();
  const [parts, setParts] = useState(() => getParts(targetMs));

  useEffect(() => {
    const id = window.setInterval(() => setParts(getParts(targetMs)), 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  return (
    <div className={cn('flex flex-wrap items-stretch justify-center gap-3 md:gap-5', className)}>
      {parts.map(({ label, value }) => (
        <div
          key={label}
          className="flex min-w-[110px] flex-col items-center rounded-2xl border-[3px] border-ink bg-sky-deep px-4 py-5 shadow-poster"
        >
          <div className="relative h-[1.1em] overflow-hidden font-display text-4xl leading-none text-cream md:text-5xl">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={value}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="inline-block tabular-nums"
              >
                {String(value).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="mt-3 font-mono text-[0.7rem] font-bold uppercase tracking-[0.18em] text-cream/70">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Countdown;
