#!/bin/bash
# Sound Collective site verifier v1
cd "$(dirname "$0")/../.."  # repo root
fail=0
check(){ if eval "$2"; then echo "PASS: $1"; else echo "FAIL: $1"; fail=1; fi }
# 1. build output exists
check "dist/index.html built" "[ -f dist/index.html ]"
# 2. routes wired
for r in lineup tickets info faq; do check "route /$r wired" "grep -q 'path=\"/$r\"' src/App.tsx"; done
# 3. all 9 poster acts present in source
for a in MAOLI "STAN WALKER" KATCHAFIRE SOJA "ARRESTED DEVELOPMENT" "A.R.T" BRADAMON RIAH "LOCAL COMP"; do check "lineup act: $a" "grep -rqi -- \"$a\" src/"; done
# 4. key event facts
for f in "20 February 2027\|20 FEB 2027" "Broadwater Parklands" "169.90" "189.90" "209.90" "269.90" "17 September 2026\|17 SEP 2026" "18 September 2026\|18 SEP 2026" "18+" "cashless" "Megatix" "Tixel" "Ada Bell Way" "Companion Card" "soundcollectivefestival.com"; do check "fact: $f" "grep -rqi -- \"$f\" src/"; done
# 5. sponsors
for s in "EXPERIENCE GOLD COAST" "DESTROY ALL LINES" "FINDERS KEEPERS" "HAPPEN"; do check "sponsor: $s" "grep -rqi -- \"$s\" src/"; done
# 6. assets
for p in public/admat-hero.jpg public/fonts/BenzinExtraBold.ttf public/map-broadwater.svg public/decor/wave.svg public/textures/halftone-grain.svg public/og-image.jpg; do check "asset: $p" "[ -f $p ]"; done
for a in maoli stan-walker katchafire soja arrested-development art bradamon riah local-comp; do check "artist img: $a" "[ -f public/artists/$a.jpg ]"; done
# 7. vercel SPA config
check "vercel.json rewrite" "grep -q 'index.html' vercel.json"
# 8. Benzin font registered
check "Benzin @font-face" "grep -q 'BenzinExtraBold' src/index.css"
exit $fail
