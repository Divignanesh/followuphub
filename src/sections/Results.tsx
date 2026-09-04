import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play, Quote, TrendingUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { StatCounter } from "../components/StatCounter";
import { Portrait, SectionHeading, cx } from "../components/ui";
import { PEOPLE } from "../lib/assets";
import { EASE_OUT, scaleIn, stagger, viewport } from "../lib/motion";

type Tile = { value: number; decimals?: number; prefix?: string; suffix?: string; text?: string; label: string };
type Story = { who: string; location?: string; quote: string; takeaway: string; tiles: Tile[] };

/**
 * Every figure below is drawn from that customer's own published testimonial,
 * so the numbers on a slide are always supported by the quote beside them.
 */
const stories: Story[] = [
  {
    who: "grace",
    location: "Vancouver, BC",
    quote:
      "With FollowUpHub, we went from 8 deals per month to 15. The automation handles 80% of our follow-ups while we focus on clients who are actually ready to transact.",
    takeaway: "Nearly double the monthly closings, with the same team size.",
    tiles: [
      { value: 8, label: "Deals per month, before" },
      { value: 15, label: "Deals per month, after" },
      { value: 6.2, decimals: 1, prefix: "$", suffix: "M", label: "Sales volume" },
      { value: 155, prefix: "$", suffix: "K", label: "Gross commission income" },
    ],
  },
  {
    who: "mateo",
    quote:
      "The AI calls warm leads before I even open my laptop. My speed-to-lead went from hours to under a minute, and my listing appointments doubled.",
    takeaway: "Warm leads answered before the working day even starts.",
    tiles: [
      { value: 0, text: "Hours", label: "Speed to lead, before" },
      { value: 0, text: "Under 1 min", label: "Speed to lead, after" },
      { value: 2, suffix: "×", label: "Listing appointments" },
    ],
  },
  {
    who: "rohan",
    quote:
      "I cancelled four subscriptions the week I switched. Pipeline, texting, campaigns and my website now live in one place and actually talk to each other.",
    takeaway: "Four line items off the software bill in the first week.",
    tiles: [
      { value: 4, label: "Subscriptions cancelled" },
      { value: 1, label: "Platform to run it all" },
      { value: 0, text: "Week 1", label: "Time to consolidate" },
    ],
  },
  {
    who: "elias",
    quote:
      "Onboarding took a day. By week two the AI had booked me five appointments I would never have chased myself.",
    takeaway: "Live in a day, booking appointments by the second week.",
    tiles: [
      { value: 1, suffix: " day", label: "Onboarding time" },
      { value: 5, label: "Appointments booked" },
      { value: 2, label: "Weeks to results" },
    ],
  },
  {
    who: "marissa",
    quote:
      "The WhatsApp and text follow-ups converted leads I honestly thought were dead. Two closings came straight out of my old database.",
    takeaway: "A dormant database turned back into commission.",
    tiles: [
      { value: 2, label: "Closings from old leads" },
      { value: 0, text: "WhatsApp + SMS", label: "Channels that converted" },
      { value: 0, text: "$0", label: "Extra ad spend required" },
    ],
  },
];

const AUTO_MS = 8000;

export function Results() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);

  const go = useCallback((next: number) => {
    setIndex((next + stories.length) % stories.length);
  }, []);

  // Auto-advance stops on hover, on keyboard focus inside the region, when the
  // visitor presses pause, and whenever reduced motion is requested.
  useEffect(() => {
    if (reduce || !playing || hovered) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % stories.length), AUTO_MS);
    return () => window.clearInterval(t);
  }, [reduce, playing, hovered]);

  const story = stories[index];
  const person = PEOPLE[story.who];

  return (
    <section id="customers" className="py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          kicker="Customer results"
          title="Real numbers from real agents."
          lede="Every figure here comes from the agent's own account of switching. Use the arrows to read more."
        />

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer results"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setHovered(true)}
          onBlurCapture={() => setHovered(false)}
          className="mt-14"
        >
          <div className="relative overflow-hidden rounded-3xl border border-line bg-card shadow-lift">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={story.who}
                initial={reduce ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${stories.length}: ${person.name}`}
                className="grid lg:grid-cols-[1.1fr_1fr]"
              >
                <div className="flex min-h-[19rem] flex-col p-8 sm:p-10">
                  <Quote className="size-8 text-teal/25" aria-hidden="true" />
                  <blockquote className="mt-4 flex-1 text-[19px] font-semibold leading-[1.55] tracking-[-0.01em] text-ink sm:text-[22px]">
                    {story.quote}
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-3.5">
                    <Portrait src={person.photo} name={person.name} size={52} />
                    <div>
                      <p className="text-[15px] font-bold text-ink">{person.name}</p>
                      <p className="text-[13px] text-ink-soft">
                        {person.role}
                        {story.location ? ` · ${story.location}` : ""}
                      </p>
                    </div>
                  </figcaption>
                </div>

                <dl className="grid grid-cols-2 gap-px bg-line lg:border-l lg:border-line">
                  {story.tiles.map((t, i) => (
                    <div
                      key={t.label}
                      className={cx(
                        "bg-cream p-6",
                        // an odd number of figures: let the last one fill the row
                        // rather than leaving a dead cell beside it
                        story.tiles.length % 2 === 1 && i === story.tiles.length - 1 && "col-span-2",
                      )}
                    >
                      <dd className="text-[1.7rem] font-extrabold leading-none tracking-[-0.03em] text-teal sm:text-[2rem]">
                        {t.text ? (
                          t.text
                        ) : (
                          <StatCounter
                            value={t.value}
                            decimals={t.decimals ?? 0}
                            prefix={t.prefix ?? ""}
                            suffix={t.suffix ?? ""}
                          />
                        )}
                      </dd>
                      <dt className="mt-2 text-[12.5px] font-medium leading-snug text-ink-soft">
                        {t.label}
                      </dt>
                    </div>
                  ))}
                </dl>
              </motion.figure>
            </AnimatePresence>

            <p className="flex items-center gap-2 border-t border-line bg-mist/50 px-8 py-3.5 text-[13px] font-semibold text-teal">
              <TrendingUp className="size-4 shrink-0" aria-hidden="true" />
              {story.takeaway}
            </p>
          </div>

          {/* controls */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous customer result"
              className="flex size-10 items-center justify-center rounded-full border border-line bg-card text-ink transition-colors hover:border-teal/40 hover:text-teal"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>

            <ul className="flex items-center gap-2">
              {stories.map((s, i) => (
                <li key={s.who}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show result ${i + 1} of ${stories.length}, ${PEOPLE[s.who].name}`}
                    aria-current={i === index ? "true" : undefined}
                    className={cx(
                      "block h-2 rounded-full transition-all duration-300",
                      i === index ? "w-6 bg-teal" : "w-2 bg-line hover:bg-ink-faint",
                    )}
                  />
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next customer result"
              className="flex size-10 items-center justify-center rounded-full border border-line bg-card text-ink transition-colors hover:border-teal/40 hover:text-teal"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>

            {!reduce && (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause automatic rotation" : "Resume automatic rotation"}
                className="ml-1 flex size-10 items-center justify-center rounded-full border border-line bg-card text-ink-soft transition-colors hover:border-teal/40 hover:text-teal"
              >
                {playing ? (
                  <Pause className="size-4" aria-hidden="true" />
                ) : (
                  <Play className="size-4" aria-hidden="true" />
                )}
              </button>
            )}
          </div>

          {/* announced to screen readers as the slide changes */}
          <p aria-live="polite" className="sr-only">
            {`Showing result ${index + 1} of ${stories.length}: ${person.name}, ${person.role}`}
          </p>
        </div>

        {/* platform-wide figures, published by FollowUpHub */}
        <motion.dl
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { value: 400, suffix: "%", label: "Marketing ROI on paid leads with automated follow-up" },
            { value: 42, suffix: "s", label: "Average speed to lead, from form submission to first contact" },
            { value: 12.4, decimals: 1, prefix: "$", suffix: "M", label: "Pipeline value tracked in a single team dashboard" },
            { value: 80, suffix: "%", label: "Of follow-ups handled automatically, without an agent touching them" },
          ].map((s) => (
            <motion.div
              key={s.label}
              variants={scaleIn}
              className="rounded-2xl border border-line bg-card p-6 shadow-soft"
            >
              <dd className="text-[2.1rem] font-extrabold leading-none tracking-[-0.03em] text-ink">
                <StatCounter
                  value={s.value}
                  decimals={s.decimals ?? 0}
                  prefix={s.prefix ?? ""}
                  suffix={s.suffix ?? ""}
                />
              </dd>
              <dt className="mt-3 text-[13.5px] leading-snug text-ink-soft">{s.label}</dt>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
