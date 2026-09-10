#!/bin/bash
# Sound Collective site verifier v3 — assets live in the standard Vite public/ dir
# Additive; v1/v2 still run. Run from repo root after `npm run build`: bash verifier/v3/check.sh
# Why v3: the asset bundle reached GitHub nested one level deep (github-assets-upload/public),
# which Vite does not serve. Assets now live in public/ (repo root) — v3 verifies the corrected
# layout + unchanged URL contract.
cd "$(dirname "$0")/../.."  # repo root
fail=0
check(){ if eval "$2"; then echo "PASS: $1"; else echo "FAIL: $1"; fail=1; fi }

B=public

# 1. vite config uses the default publicDir (no stray override)
check "vite publicDir is default" "! grep -q 'publicDir' vite.config.ts"

# 2. brand assets inside public/
for p in brand/logo-textured.png brand/logo-clean.png brand/logo-clean-640.png; do
  check "bundle brand asset: $p" "[ -f $B/$p ]"
done
for s in experience-gold-coast destroy-all-lines finders-keepers happen; do
  check "bundle sponsor: $s" "[ -f $B/brand/sponsors/$s.png ]"
done

# 3. all 9 artist images (7 real photos >30KB + 2 stylised placeholders)
for a in maoli stan-walker katchafire soja arrested-development bradamon riah; do
  check "bundle real photo: $a (>30KB)" "[ \$(stat -c%s $B/artists/$a.jpg) -gt 30720 ]"
done
for a in art local-comp; do check "bundle placeholder: $a" "[ -f $B/artists/$a.jpg ]"; done

# 4. core event assets (wave decor retained; palm/frond/sun/monstera decor removed for brand fidelity)
for p in admat-hero.jpg og-image.jpg fonts/BenzinExtraBold.ttf textures/halftone-grain.svg map-broadwater.svg decor/wave.svg; do
  check "bundle asset: $p" "[ -f $B/$p ]"
done
for p in decor/palm-frond.svg decor/monstera.svg decor/sun-disc.svg decor/palm-tree.svg; do
  check "brand-consistent (no $p):" "[ ! -f $B/$p ]"
done

# 5. URL contract unchanged — source still references root-absolute asset URLs
check "navbar references /brand/logo-clean-640.png" "grep -q '/brand/logo-clean-640.png' src/components/Navbar.tsx"
check "footer references /brand/logo-clean.png" "grep -q '/brand/logo-clean.png' src/components/Footer.tsx"
check "ADMAT referenced as /admat-hero.jpg" "grep -rq '/admat-hero.jpg' src/"
check "artist photos referenced as /artists/" "grep -rq '/artists/' src/"
check "Benzin @font-face references /fonts/" "grep -rq '/fonts/BenzinExtraBold' src/"

# 6. dist proof — build actually emitted the bundle at the site root
check "dist logo" "[ -f dist/brand/logo-clean-640.png ]"
check "dist sponsors" "[ -f dist/brand/sponsors/happen.png ]"
check "dist real MAOLI photo" "[ \$(stat -c%s dist/artists/maoli.jpg) -gt 30720 ]"
check "dist ADMAT" "[ -f dist/admat-hero.jpg ]"
check "dist font" "[ -f dist/fonts/BenzinExtraBold.ttf ]"
check "dist og-image" "[ -f dist/og-image.jpg ]"

# 7. regression — one-line display type + socials still intact
check "navbar links nowrap" "grep -q 'whitespace-nowrap' src/components/Navbar.tsx"
check "billing wall nowrap" "grep -q 'whitespace-nowrap' src/components/lineup/BillingWall.tsx"
check "lineup hero word-atomic" "grep -q \"TITLE.split(' ')\" src/components/lineup/LineupHero.tsx"
for u in "instagram.com/soundcollectivefest" "facebook.com/people/Sound-Collective-Fest/61590325646457" "tiktok.com/@soundcollectivefest"; do
  check "social: $u" "grep -rq -- \"$u\" src/"
done

exit $fail
