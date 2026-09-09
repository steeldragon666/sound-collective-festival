import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FaqEntry } from './faq-data';
import { highlightText } from './highlight';

const answerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const answerPiece = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

interface FaqAccordionListProps {
  items: FaqEntry[];
  /** Controlled open ids (Radix `type="multiple"`). */
  value: string[];
  onValueChange: (value: string[]) => void;
  /** Active search query — matches are highlighted with coral <mark>. */
  query?: string;
  /** Changing this key replays the stagger entrance (e.g. active tab). */
  staggerKey?: string;
}

/**
 * Restyled FAQ accordion: cream handbill cards, 3px ink border, hard shadow
 * on open, coral `+` chevron that rotates to a `×`.
 */
export function FaqAccordionList({ items, value, onValueChange, query = '', staggerKey }: FaqAccordionListProps) {
  return (
    <AccordionPrimitive.Root
      key={staggerKey}
      type="multiple"
      value={value}
      onValueChange={onValueChange}
      className="space-y-4"
    >
      {items.map((entry, index) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <AccordionPrimitive.Item
            value={entry.id}
            className={cn(
              'rounded-xl border-[3px] border-ink bg-cream px-5 shadow-poster-sm transition-shadow duration-300 md:px-6',
              'data-[state=open]:shadow-poster',
            )}
          >
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger className="group flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left outline-none focus-visible:ring-[3px] focus-visible:ring-coral/50">
                <span className="font-sans text-base font-bold text-ink md:text-lg">
                  {highlightText(entry.question, query)}
                </span>
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-coral text-cream transition-transform duration-300 group-data-[state=open]:rotate-45">
                  <Plus className="h-4 w-4" strokeWidth={3} />
                </span>
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down data-[state=closed]:[animation-duration:0.35s] data-[state=open]:[animation-duration:0.35s] data-[state=closed]:[animation-timing-function:cubic-bezier(0.45,0,0.55,1)] data-[state=open]:[animation-timing-function:cubic-bezier(0.45,0,0.55,1)]">
              <motion.div
                variants={answerContainer}
                initial="hidden"
                animate="show"
                className="space-y-3 pb-5"
              >
                {entry.answer.map((paragraph, i) => (
                  <motion.p
                    key={i}
                    variants={answerPiece}
                    className="font-sans text-base leading-[1.65] text-ink/85"
                  >
                    {highlightText(paragraph, query)}
                  </motion.p>
                ))}
                {entry.chips?.map((group) => (
                  <motion.div key={group.label} variants={answerPiece}>
                    <p className="mb-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.18em] text-coral">
                      {group.label}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((chip) => (
                        <span
                          key={chip}
                          className="inline-flex items-center rounded-full border-2 border-ink bg-sand/70 px-3 py-1 font-sans text-xs font-bold text-ink"
                        >
                          {highlightText(chip, query)}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        </motion.div>
      ))}
    </AccordionPrimitive.Root>
  );
}

export default FaqAccordionList;
