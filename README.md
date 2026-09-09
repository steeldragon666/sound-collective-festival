# Sound Collective Festival — Website

Official event website for **Sound Collective** — Saturday 20 February 2027, Broadwater Parklands, Gold Coast. Strictly 18+.

## Stack

React 19 + TypeScript + Vite 7, Tailwind CSS v3.4, GSAP + ScrollTrigger, Framer Motion, Lenis. shadcn/radix primitives.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # outputs dist/
npm run preview  # serve the production build
```

## Deploy on Vercel

1. Import this repo in Vercel (New Project → Import Git Repository).
2. Framework preset: **Vite**. Build command `npm run build`, output directory `dist` (defaults are fine).
3. `vercel.json` already includes the SPA rewrite (`/* → /index.html`) so client-side routes (`/lineup`, `/tickets`, `/info`, `/faq`) work.

## Pages

| Route | Content |
|---|---|
| `/` | ADMAT poster hero, countdown, lineup teaser, key facts, tickets teaser, comp banner, sponsors |
| `/lineup` | Full poster billing wall, artist cards + bios, local artist comp application |
| `/tickets` | On-sale timeline, 4 ticket tiers, Megatix Reserve explainer, prize pack, payment/resale/insurance |
| `/info` | Event details, getting there + illustrated map, conditions of entry, food/merch, accessibility |
| `/faq` | 5-tab searchable FAQ (all official Q&A content) |

## Assets

- `public/admat-hero.jpg` — official poster art (provided)
- `public/fonts/BenzinExtraBold.ttf` — official display font (provided)
- `public/artists/*.jpg`, `public/decor/*.svg`, `public/textures/*`, `public/map-broadwater.svg`, `public/og-image.jpg` — generated/illustrated artwork in the poster style
