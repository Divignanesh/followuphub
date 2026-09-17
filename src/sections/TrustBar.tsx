import { Headphones, Leaf, Sparkles } from "lucide-react";
import { BROKERAGES } from "../lib/assets";
import { Reveal, cx } from "../components/ui";

const badges = [
  { icon: Leaf, label: "Canadian-made" },
  { icon: Headphones, label: "7-day phone support" },
  { icon: Sparkles, label: "AI-first platform" },
];

export function TrustBar() {
  return (
    <section aria-labelledby="trust-title" className="border-y border-line bg-sand py-12">
      <div className="container-x">
        <Reveal>
          <p id="trust-title" className="text-center text-[15px] font-semibold text-ink">
            Used by <strong className="font-extrabold text-teal">1,000+ agents</strong> and 36 of
            Canada&rsquo;s top brokerages
          </p>
        </Reveal>

        <div
          className="marquee relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
          <div className="marquee-track flex w-max items-center gap-4 pr-4">
            {[...BROKERAGES, ...BROKERAGES].map((b, i) => {
              const duplicate = i >= BROKERAGES.length;
              return (
                <span
                  key={`${b.name}-${i}`}
                  aria-hidden={duplicate ? true : undefined}
                  className="flex h-16 w-40 shrink-0 items-center justify-center rounded-xl border border-line bg-card px-5"
                >
                  {/* The hosted brokerage marks are all 404ing, so the chip
                      carries the name until the files are restored — a row of
                      broken images says less than the names themselves. */}
                  <span className="truncate text-[13px] font-bold text-ink-soft">
                    {b.name}
                  </span>
                </span>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.1}>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            {badges.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className={cx(
                  "inline-flex items-center gap-2 rounded-full border border-line bg-cream px-3.5 py-1.5",
                  "text-[12px] font-bold uppercase tracking-[0.1em] text-ink-soft",
                )}
              >
                <Icon className="size-3.5 text-teal" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
