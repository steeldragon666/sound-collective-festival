import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ArtistCardProps {
  name: string;
  /** e.g. "/artists/maoli.jpg" */
  image: string;
  genre?: string;
  bio?: string;
  links?: { label: string; href: string }[];
  /** Alternate card tilt */
  tilt?: 'left' | 'right';
  className?: string;
}

export function ArtistCard({ name, image, genre, bio, links, tilt = 'left', className }: ArtistCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{ rotate: tilt === 'left' ? -1 : 1 }}
        whileHover={{ rotate: 0, y: -4 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className={cn(
          'group relative block w-full cursor-pointer overflow-hidden rounded-2xl border-[3px] border-ink bg-ink text-left shadow-poster',
          className,
        )}
        aria-label={`${name} — view bio`}
      >
        <div className="aspect-[4/5] w-full overflow-hidden">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
        </div>

        {/* Coral star badge */}
        <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-coral text-cream opacity-0 shadow-poster-sm transition-opacity duration-300 group-hover:opacity-100">
          <span className="text-base leading-none">★</span>
        </span>

        {/* Name overlay on ink gradient */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent px-4 pb-4 pt-14">
          <p className="font-display text-xl uppercase leading-none text-cream drop-shadow-[3px_3px_0_#1E323E] md:text-2xl">
            {name}
          </p>
          {genre && (
            <p className="mt-1.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-cream/70">
              {genre}
            </p>
          )}
        </div>
      </motion.button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-[3px] border-ink bg-cream text-ink shadow-poster sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="display-poster-sm font-display text-2xl uppercase">{name}</DialogTitle>
            {genre && (
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-coral">{genre}</p>
            )}
          </DialogHeader>
          <div className="overflow-hidden rounded-xl border-[3px] border-ink">
            <img src={image} alt={name} className="aspect-[4/3] w-full object-cover" />
          </div>
          <DialogDescription className="font-sans text-base leading-[1.65] text-ink/90">
            {bio ?? 'Bio coming soon — catch them on the main stage at Broadwater Parklands, Saturday 20 February 2027.'}
          </DialogDescription>
          {links && links.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-ink underline decoration-coral decoration-2 underline-offset-4 hover:text-coral"
                >
                  {link.label} →
                </a>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ArtistCard;
