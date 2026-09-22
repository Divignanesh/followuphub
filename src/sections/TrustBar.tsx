import { BROKERAGES } from "../lib/assets";
import { Reveal } from "../components/ui";

/**
 * How many times the list is laid down before it is cloned for the loop.
 *
 * A marquee that renders its list exactly twice and translates to -50% only
 * looks continuous while a single pass is already wider than the viewport.
 * With a short list it is not, so the row runs out of logos mid-screen and a
 * gap travels across it. Repeating until one pass clears the widest screen
 * removes that, and because the count is derived rather than written down, the
 * row keeps working whether the next brokerage added is the tenth or the
 * fortieth.
 *
 * At roughly 176px per mark, 14 marks is about 2,460px, which clears a 1,440px
 * viewport with room to spare.
 */
const PASS = Math.max(1, Math.ceil(14 / BROKERAGES.length));
const ONE_PASS = Array.from({ length: PASS }, () => BROKERAGES).flat();

/**
 * Two words and the marks.
 *
 * This band used to open with "Used by 1,000+ agents and 36 of Canada's top
 * brokerages" and close with three claim pills. The sentence repeated the
 * rated row in the hero almost word for word, and the pills were standing
 * facts about the product parked under a logo marquee, which is the one strip
 * on a page nobody reads for claims. Both moved up; the logos say the rest.
 *
 * This used to sit inside the hero as a static row of six, with the last two
 * hidden below the `sm` breakpoint. That made it a decoration with a hard
 * ceiling: a seventh brokerage had nowhere to go, and on a phone two of the
 * six were never shown at all.
 *
 * As its own band it takes the whole list from `lib/assets`, so adding a logo
 * there is the only step needed to put it on the page. The track pauses on
 * hover and on keyboard focus, and `prefers-reduced-motion` stops it, where it
 * reads as a plain row of logos.
 */
export function TrustBar() {
  return (
    <section aria-labelledby="trust-title" className="bg-cream py-14">
      <div className="container-x">
        <Reveal>
          <p
            id="trust-title"
            className="text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-faint"
          >
            Trusted by
          </p>
        </Reveal>
      </div>

      {/* Full-bleed. The track is masked at both edges, so holding it inside
          the container would only move the fade inboard of the screen and make
          the row look like it stops rather than carries on. */}
      <div className="marquee relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-4 pr-4">
          {[...ONE_PASS, ...ONE_PASS].map((b, i) => {
            // Only the first sweep of the real list is announced. Everything
            // after it exists to keep the loop continuous, so a screen reader
            // hears the brokerages once instead of four times over.
            const spoken = i < BROKERAGES.length;
            return (
              <span
                key={`${b.name}-${i}`}
                aria-hidden={spoken ? undefined : true}
                className="flex h-16 w-40 shrink-0 items-center justify-center rounded-xl border border-line bg-card px-5"
              >
                <img
                  src={b.src}
                  alt={spoken ? b.name : ""}
                  width={160}
                  height={64}
                  loading="lazy"
                  decoding="async"
                  className="max-h-9 w-auto max-w-[7rem] object-contain opacity-80 transition-opacity duration-200 hover:opacity-100"
                />
              </span>
            );
          })}
        </div>
      </div>

    </section>
  );
}
