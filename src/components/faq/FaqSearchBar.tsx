import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

const EXAMPLE_QUERIES = ['refund', 'ID', 'tram', 'VIP', 'parking'];

/** Typewriter placeholder: cycles example queries every ~3s. */
function useTypewriterPlaceholder(): string {
  const [text, setText] = useState('');

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = EXAMPLE_QUERIES[wordIndex];
      if (!deleting) {
        charIndex += 1;
        setText(word.slice(0, charIndex));
        if (charIndex === word.length) {
          deleting = true;
          timer = setTimeout(tick, 2000); // hold the completed word
          return;
        }
        timer = setTimeout(tick, 70);
      } else {
        charIndex -= 1;
        setText(word.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % EXAMPLE_QUERIES.length;
          timer = setTimeout(tick, 400);
          return;
        }
        timer = setTimeout(tick, 40);
      }
    };

    timer = setTimeout(tick, 800);
    return () => clearTimeout(timer);
  }, []);

  return `Search the FAQ… e.g. "${text}"`;
}

interface FaqSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function FaqSearchBar({ value, onChange }: FaqSearchBarProps) {
  const placeholder = useTypewriterPlaceholder();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative mx-auto w-full max-w-2xl"
    >
      <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-coral md:h-6 md:w-6" strokeWidth={2.5} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onChange('');
        }}
        placeholder={placeholder}
        aria-label="Search the FAQ"
        className="w-full rounded-full border-[3px] border-ink bg-cream py-4 pl-12 pr-12 font-mono text-sm text-ink shadow-poster-sm placeholder:text-ink/50 focus:outline-none focus:ring-4 focus:ring-coral/40 md:py-5 md:pl-14 md:pr-14 md:text-base"
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ink bg-sand text-ink transition-colors hover:bg-coral hover:text-cream"
        >
          <X className="h-4 w-4" strokeWidth={3} />
        </button>
      )}
    </motion.div>
  );
}

export default FaqSearchBar;
