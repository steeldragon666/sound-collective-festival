import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import ArtistCard from '@/components/ArtistCard';
import { cn } from '@/lib/utils';
import { ARTISTS } from './artists';

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const gridItem = {
  hidden: { opacity: 0, y: 60, rotate: 4 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const FLASH_SHADOW = [
  '0 0 0 0 rgba(232,83,42,0)',
  '0 0 0 10px rgba(232,83,42,0.85)',
  '0 0 0 3px rgba(232,83,42,0.9)',
  '0 0 0 8px rgba(232,83,42,0.5)',
  '0 0 0 0 rgba(232,83,42,0)',
];

interface FlashWrapProps {
  id: string;
  flashId: string | null;
  children: React.ReactNode;
}

/** Anchor wrapper that pulses a coral ring when the billing wall jumps to this card. */
function FlashWrap({ id, flashId, children }: FlashWrapProps) {
  return (
    <motion.div
      id={`artist-${id}`}
      animate={{ boxShadow: flashId === id ? FLASH_SHADOW : '0 0 0 0 rgba(232,83,42,0)' }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      className="scroll-mt-28 rounded-2xl"
    >
      {children}
    </motion.div>
  );
}

interface CompWinnerCardProps {
  onJumpToComp: () => void;
}

/** The ninth card — instead of a bio dialog, it jumps down to the competition section. */
function CompWinnerCard({ onJumpToComp }: CompWinnerCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onJumpToComp}
      initial={{ rotate: -1 }}
      whileHover={{ rotate: 0, y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl border-[3px] border-ink bg-ink text-left shadow-poster"
      aria-label="Local comp winner — jump to the competition entry form"
    >
      <div className="aspect-[4/5] w-full overflow-hidden">
        <img
          src="/artists/local-comp.jpg"
          alt="Empty spotlight on a microphone — your band here"
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
      </div>

      {/* Coral "could be you" chip */}
      <span className="absolute right-3 top-3 rounded-full border-2 border-ink bg-coral px-3 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.15em] text-cream shadow-poster-sm">
        Could be you
      </span>

      {/* Spinning coral star badge */}
      <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-coral text-cream opacity-0 shadow-poster-sm transition-opacity duration-300 group-hover:opacity-100">
        <span className="inline-block animate-spin-slow text-base leading-none">★</span>
      </span>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent px-4 pb-4 pt-14">
        <p className="font-display text-xl uppercase leading-none text-cream drop-shadow-[3px_3px_0_#1E323E] md:text-2xl">
          + Local Comp Winner
        </p>
        <p className="mt-1.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-cream/70">
          The opening slot is up for grabs — enter below ↓
        </p>
      </div>
    </motion.button>
  );
}

interface ArtistGridProps {
  /** Artist id currently flashing its coral ring (set after a billing-wall jump) */
  flashId: string | null;
  onJumpToComp: () => void;
}

/** S3 — Artist grid on sky: billing-order cards with bio dialogs. */
export function ArtistGrid({ flashId, onJumpToComp }: ArtistGridProps) {
  return (
    <section className="bg-sky py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader kicker="THE ARTISTS" title="MEET THE COLLECTIVE" />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.85 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={cn(
            '-mt-8 mb-12 font-mono text-xs font-bold uppercase tracking-[0.18em] text-sky-deep md:-mt-12 md:mb-16',
          )}
        >
          All times &amp; stage order announced closer to show day
        </motion.p>

        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ARTISTS.map((artist, i) => (
            <motion.div key={artist.id} variants={gridItem}>
              <FlashWrap id={artist.id} flashId={flashId}>
                <ArtistCard
                  name={artist.name}
                  image={artist.image}
                  genre={artist.tag}
                  bio={artist.bio}
                  tilt={i % 2 === 0 ? 'left' : 'right'}
                />
              </FlashWrap>
            </motion.div>
          ))}
          <motion.div variants={gridItem}>
            <FlashWrap id="local-comp-winner" flashId={flashId}>
              <CompWinnerCard onJumpToComp={onJumpToComp} />
            </FlashWrap>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default ArtistGrid;
