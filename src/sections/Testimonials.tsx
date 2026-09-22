import { Star } from "lucide-react";
import { Portrait, SectionHeading, cx } from "../components/ui";
import { PEOPLE } from "../lib/assets";

const quotes = [
  {
    who: "grace",
    quote:
      "We went from 8 deals a month to 15. The automation handles 80% of our follow-ups.",
  },
  {
    who: "mateo",
    quote:
      "It calls warm leads before I open my laptop. My listing appointments doubled.",
  },
  {
    who: "rohan",
    quote:
      "I cancelled four subscriptions the week I switched. Everything lives in one place now.",
  },
  {
    who: "amara",
    quote:
      "Old leads we had written off booked showings. That alone paid for the year.",
  },
  {
    who: "sanjay",
    quote:
      "The business stopped feeling overwhelming and the GCI keeps going up.",
  },
  {
    who: "karen",
    quote:
      "My team stopped guessing. The AI has warmed them up before we dial.",
  },
  {
    who: "elias",
    quote:
      "Onboarding took a day. By week two it had booked me five appointments.",
  },
  {
    who: "omar",
    quote:
      "Every conversation I used to lose track of now gets followed up.",
  },
  {
    who: "marissa",
    quote:
      "Two closings came straight out of leads I thought were dead.",
  },
  {
    who: "andre",
    quote:
      "Speed to lead is everything, and this delivers it while I am out showing homes.",
  },
  {
    who: "daniel",
    quote:
      "One platform replaced my CRM, dialer and email tool. Costs down, closings up.",
  },
] as const;

const half = Math.ceil(quotes.length / 2);
const rowOne = quotes.slice(0, half);
const rowTwo = quotes.slice(half);

function Card({ who, quote }: { who: string; quote: string }) {
  const p = PEOPLE[who];
  return (
    <figure className="flex h-full w-[21rem] shrink-0 flex-col rounded-[1rem] border border-line bg-card p-6 shadow-card sm:w-[23rem]">
      <div className="flex gap-0.5" role="img" aria-label="Rated 5 out of 5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-[15px] fill-gold text-gold" aria-hidden="true" />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-[15px] leading-[1.7] text-ink">{quote}</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <Portrait src={p.photo} name={p.name} size={40} />
        <div>
          <p className="text-[13.5px] font-bold text-ink">{p.name}</p>
          <p className="text-[12px] text-ink-soft">{p.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * Two rows drifting in opposite directions.
 *
 * The first pass of each row is the real, readable content; the second pass is
 * an aria-hidden clone that exists only to keep the loop continuous. Both rows
 * pause on hover and on keyboard focus, and stop entirely under
 * prefers-reduced-motion, where the section reads as a plain horizontal list.
 */
function Row({
  items,
  reverse = false,
}: {
  items: readonly { who: string; quote: string }[];
  reverse?: boolean;
}) {
  return (
    <div className="marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <ul
        className={cx(
          "flex w-max items-stretch gap-5 pr-5",
          reverse ? "marquee-track-reverse" : "marquee-track",
        )}
      >
        {[...items, ...items].map((q, i) => {
          const clone = i >= items.length;
          return (
            <li key={`${q.who}-${i}`} aria-hidden={clone ? true : undefined}>
              <Card who={q.who} quote={q.quote} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="overflow-hidden py-8 sm:py-10">
      <div className="container-x">
        <SectionHeading
          title={<span id="testimonials-title">Agents who switch don&rsquo;t switch back.</span>}
          lede="After their first quarter."
        />
      </div>

      <div className="mt-14 space-y-5">
        <Row items={rowOne} />
        <Row items={rowTwo} reverse />
      </div>
    </section>
  );
}
