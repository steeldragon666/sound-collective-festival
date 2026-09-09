# Verifier index

## v1 (created 2026-09-09)
- Script: `v1/check.sh` — run from repo root after `npm run build`.
- Measures: build artifact presence; all 5 routes wired; all 9 poster lineup acts present; key event facts (date, venue, ticket prices, on-sale dates, 18+, cashless, Megatix/Tixel, Ada Bell Way, Companion Card, site URL); 4 sponsors; provided + generated assets on disk; vercel.json SPA rewrite; Benzin @font-face registered.
- First version.

## v2 (created 2026-09-09)
- Script: `v2/check.sh` — run from repo root after `npm run build`. Additive; v1 still runs.
- Measures: official festival logo assets present (textured/clean/640) and wired into Navbar + Footer (text wordmark removed); 4 official sponsor logo PNGs (cropped from the ADMAT) present and wired into the footer strip; real high-res photographs on the 7 named artist cards (>30KB JPEGs) with stylised placeholders retained only for A.R.T and local-comp (no press photos exist); one-line display type (word-atomic char splitting in LineupHero/InfoHero/SectionHeader, whitespace-nowrap in Navbar/LineupTeaser/BillingWall/Hero); reduced clamp minimums for 320px viewports; official socials (IG/FB/TikTok) still connected; dist output contains the new brand + photo assets.
- Runs: run5-20260909-145811.txt (v1: 51/51 PASS), run5v2-20260909-145813.txt (v2: 39/39 PASS).
