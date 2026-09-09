#!/bin/bash
# Sound Collective site verifier v2 — official branding, real photos, one-line display type
# Adds to (never replaces) v1. Run from repo root: bash verifier/v2/check.sh
cd "$(dirname "$0")/../.."  # repo root
fail=0
check(){ if eval "$2"; then echo "PASS: $1"; else echo "FAIL: $1"; fail=1; fi }

# 1. official festival logo assets exist (trimmed, alpha, web-sized)
for p in public/brand/logo-textured.png public/brand/logo-clean.png public/brand/logo-clean-640.png; do
  check "official logo asset: $p" "[ -f $p ]"
done
# 2. official logo wired into chrome (navbar + footer use image, not text wordmark)
check "navbar uses official logo" "grep -q '/brand/logo-clean-640.png' src/components/Navbar.tsx"
check "footer uses official logo" "grep -q '/brand/logo-clean.png' src/components/Footer.tsx"
check "navbar wordmark text removed" "! grep -q 'Sound Collective</span>' src/components/Navbar.tsx"

# 3. official sponsor logos (cropped from the ADMAT) exist + wired into footer
for s in experience-gold-coast destroy-all-lines finders-keepers happen; do
  check "sponsor logo asset: $s" "[ -f public/brand/sponsors/$s.png ]"
  check "sponsor logo wired: $s" "grep -q 'brand/sponsors/$s.png' src/components/Footer.tsx"
done

# 4. real high-res photographs on headliner cards (min 30KB = photographic JPEG, not placeholder art)
for a in maoli stan-walker katchafire soja arrested-development bradamon riah; do
  check "real photo: $a.jpg (>30KB)" "[ \$(stat -c%s public/artists/$a.jpg) -gt 30720 ]"
done
# A.R.T + local comp intentionally keep stylised placeholder art (no press photos exist) — files must still exist
for a in art local-comp; do check "placeholder img present: $a" "[ -f public/artists/$a.jpg ]"; done

# 5. one-line display type — word-atomic splitting or explicit nowrap
check "navbar links nowrap" "grep -q 'whitespace-nowrap' src/components/Navbar.tsx"
check "lineup teaser lines nowrap" "grep -q 'inline-block whitespace-nowrap font-display' src/components/home/LineupTeaser.tsx"
check "billing wall lines nowrap" "grep -c 'whitespace-nowrap' src/components/lineup/BillingWall.tsx | grep -q '^2$'"
check "lineup hero word-atomic" "grep -q \"TITLE.split(' ')\" src/components/lineup/LineupHero.tsx"
check "info hero word-atomic" "grep -q \"EVENT INFO'.split(' ')\" src/components/info/InfoHero.tsx"
check "section header word-atomic" "grep -q \"title.split(' ')\" src/components/SectionHeader.tsx"
check "home hero hollow lines nowrap" "grep -q 'whitespace-nowrap' src/components/home/Hero.tsx"

# 6. clamp minimums fit 320px viewports (billing wall + teaser reduced mins)
check "teaser ARRESTED min lowered" "grep -q 'clamp(1.4rem,4.7vw' src/components/home/LineupTeaser.tsx"
check "wall A.R.T line min lowered" "grep -q 'clamp(1.15rem,4.2vw' src/components/lineup/BillingWall.tsx"

# 7. official socials still connected
for u in "instagram.com/soundcollectivefest" "facebook.com/people/Sound-Collective-Fest/61590325646457" "tiktok.com/@soundcollectivefest"; do
  check "social: $u" "grep -rq -- \"$u\" src/"
done

# 8. build output fresh — dist contains brand + photo assets
check "dist has official logo" "[ -f dist/brand/logo-clean-640.png ]"
check "dist has sponsor logos" "[ -f dist/brand/sponsors/happen.png ]"
check "dist has real MAOLI photo" "[ \$(stat -c%s dist/artists/maoli.jpg) -gt 30720 ]"
check "dist ADMAT banner present" "[ -f dist/admat-hero.jpg ]"

exit $fail
