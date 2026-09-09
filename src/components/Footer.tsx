import { Link } from 'react-router';
import { Instagram, Facebook, Music2 } from 'lucide-react';

const SITE_LINKS = [
  { to: '/lineup', label: 'Lineup' },
  { to: '/tickets', label: 'Tickets' },
  { to: '/info', label: 'Info' },
  { to: '/faq', label: 'FAQ' },
];

const PARTNERS = ['Experience Gold Coast', 'Destroy All Lines', 'Finders Keepers Group', 'Happen'];

const SOCIALS = [
  { href: 'https://www.instagram.com/soundcollectivefest/', label: 'Instagram', Icon: Instagram },
  { href: 'https://www.facebook.com/people/Sound-Collective-Fest/61590325646457/', label: 'Facebook', Icon: Facebook },
  { href: 'https://www.tiktok.com/@soundcollectivefest', label: 'TikTok', Icon: Music2 },
];

export function Footer() {
  return (
    <footer className="bg-sky-deep text-cream">
      {/* Wave divider on top edge */}
      <div className="wave-strip animate-wave-drift -translate-y-px" aria-hidden="true" />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-3 md:px-8">
        {/* Col 1: wordmark + meta */}
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/decor/sun-disc.svg" alt="" className="h-8 w-8 object-cover object-bottom" />
            <span className="font-display text-lg uppercase leading-none tracking-wide">
              Sound Collective
            </span>
          </Link>
          <div className="mt-6 space-y-1.5 font-mono text-xs uppercase tracking-[0.15em] text-cream/70">
            <p>Sat 20 Feb 2027</p>
            <p>Broadwater Parklands, Gold Coast</p>
            <p>Strictly 18+ · Cashless Event</p>
          </div>
        </div>

        {/* Col 2: links */}
        <div>
          <h3 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-sunset">Explore</h3>
          <ul className="mt-5 space-y-2.5">
            {SITE_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="font-sans text-sm font-bold uppercase tracking-[0.1em] text-cream transition-colors hover:text-coral"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="mt-8 font-mono text-xs font-bold uppercase tracking-[0.18em] text-sunset">Support</h3>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href="https://megatix.com.au/support"
                target="_blank"
                rel="noreferrer"
                className="font-sans text-sm font-bold uppercase tracking-[0.1em] text-cream transition-colors hover:text-coral"
              >
                Megatix Support
              </a>
            </li>
            <li>
              <a
                href="https://tixel.com"
                target="_blank"
                rel="noreferrer"
                className="font-sans text-sm font-bold uppercase tracking-[0.1em] text-cream transition-colors hover:text-coral"
              >
                Tixel Resale
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: socials */}
        <div>
          <h3 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-sunset">Follow Along</h3>
          <div className="mt-5 flex gap-3">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-cream text-ink transition-colors hover:bg-coral hover:text-cream"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-cream/70">
            www.soundcollectivefestival.com
          </p>
        </div>
      </div>

      {/* Sponsor strip */}
      <div className="border-t-2 border-cream/20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-4 px-5 py-10 md:px-8">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-cream/50">
            Presented with
          </span>
          {PARTNERS.map((partner, i) => (
            <span key={partner} className="flex items-center gap-8">
              <span className="font-sans text-sm font-bold uppercase tracking-[0.12em] text-cream/60 transition-all hover:-translate-y-0.5 hover:text-cream">
                {partner}
              </span>
              {i < PARTNERS.length - 1 && (
                <img src="/decor/palm-frond.svg" alt="" className="h-4 w-6 object-cover opacity-50" />
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Legal row */}
      <div className="border-t-2 border-cream/20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6 md:px-8">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-cream/50">
            © 2027 Sound Collective Festival · Strictly 18+ · Cashless event
          </p>
          <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-coral font-display text-sm text-cream shadow-poster-sm">
            18+
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
