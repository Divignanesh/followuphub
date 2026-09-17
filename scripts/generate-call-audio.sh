#!/usr/bin/env bash
# Regenerates the three voice clips used by the AI engine section.
#
# The transcript lives in src/sections/AIEngine.tsx — keep the lines below in
# step with it, then run:  bash scripts/generate-call-audio.sh
#
# These are macOS `say` voices, chosen only because they need no API key. To
# move to a better engine (ElevenLabs, OpenAI, Azure), generate the same three
# lines there and drop the files at the same paths — the player reads whatever
# is at public/audio/call-line-N.m4a and needs no code change.

set -euo pipefail
cd "$(dirname "$0")/.."
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
mkdir -p public/audio

say -v Samantha -r 172 -o "$tmp/1.aiff" \
  "Hi Dana, following up on your Cedar Lane valuation — is now a bad time?"
say -v Daniel -r 176 -o "$tmp/2.aiff" \
  "No, go ahead. I'm curious what it's worth."
say -v Samantha -r 172 -o "$tmp/3.aiff" \
  "I'll book you with Sarah Thursday at 4. She'll bring three recent comps on your street."

for i in 1 2 3; do
  afconvert -f m4af -d aac -b 64000 "$tmp/$i.aiff" "public/audio/call-line-$i.m4a"
  printf 'wrote public/audio/call-line-%s.m4a\n' "$i"
done
