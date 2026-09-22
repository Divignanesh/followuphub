import { Boxes, BarChart3, Send, Sprout, type LucideIcon } from "lucide-react";
import { RevealGroup, RevealItem, SectionHeading } from "../components/ui";

/**
 * The four stages, drawn as a flow.
 *
 * Two versions preceded this. The first was a 240vh pinned deck that scrubbed
 * cards as the wheel turned, which cost two and a half screens for four short
 * paragraphs. The second fixed the height by laying them flat, and lost the
 * only thing the section exists to say: that each stage hands to the next. A
 * row of four bordered cards is a list, and a list has no direction.
 *
 * So the numbers sit on a rail. Each node is joined to the one after it by a
 * line that ends in an arrow, the last node closes the run, and the copy hangs
 * underneath. The rail is the whole mechanism: it reads left to right at a
 * glance and it costs no height.
 *
 * Below sm the rail has nowhere to run, so the four stack into one column and
 * centre. Left-aligned they read as a list that lost its bullets, with each
 * node adrift at the left edge of a full-width block; centred they read as
 * four steps in sequence, which is what they are.
 */

type Stage = { icon: LucideIcon; step: string; title: string; body: string; rows: string[] };

const stages: Stage[] = [
  {
    icon: Boxes,
    step: "01",
    title: "Organize",
    body: "Every lead in one place, for the whole team.",
    rows: ["Dana Whitfield · New lead", "Marcus Okoye · Contacted", "Priya Shah · Showing"],
  },
  {
    icon: Send,
    step: "02",
    title: "Engage",
    body: "Emails, texts and calls run themselves.",
    rows: ["Day 0 · AI call attempt", "Day 1 · Text follow-up", "Day 3 · Market email"],
  },
  {
    icon: Sprout,
    step: "03",
    title: "Grow",
    body: "Scheduling, campaigns and sites, feeding the same pipeline.",
    rows: ["Instagram · Scheduled", "Email blast · 1,240 sent", "Open house · 38 RSVPs"],
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Analyze",
    body: "Agent performance, pipeline health and marketing return.",
    rows: ["Pipeline value · $12.4M", "Speed to lead · 42s", "Marketing ROI · 400%"],
  },
];

export function Workflow() {
  return (
    <section className="bg-sand pb-16 pt-10 sm:pb-20 sm:pt-12">
      <div className="container-x">
        <SectionHeading
          align="center"
          title="Four stages, and each one feeds the next."
          lede="Nothing falls between tools. There is one tool."
        />

        <RevealGroup as="ol" className="mt-12 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map(({ icon: Icon, step, title, body, rows }, i) => {
            const last = i === stages.length - 1;
            return (
              <RevealItem as="li" key={title} className="relative">
                {/* the rail: node, then the line that hands to the next stage */}
                <div className="flex items-center justify-center gap-3 sm:justify-start">
                  <span className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full bg-teal text-cream">
                    <Icon className="size-[18px]" aria-hidden="true" />
                  </span>

                  <span className="font-mono text-[12px] font-semibold text-ink-faint">{step}</span>

                  {!last && (
                    <span
                      aria-hidden="true"
                      className="relative hidden h-px flex-1 bg-teal/25 lg:block"
                    >
                      <span className="absolute -right-px -top-[3px] size-[7px] rotate-45 border-r border-t border-teal/45" />
                    </span>
                  )}
                </div>

                <h3 className="t-h3 mt-5 text-center text-ink sm:text-left">{title}</h3>
                {/* Two lines reserved from sm up, so the rule under each body lands
                    on the same baseline across the row. Without it the bodies that
                    wrap to one line pull their rule up and the row reads as
                    misaligned. In one column there is no row to align to, so the
                    reserve would only be dead space. */}
                <p className="t-meta mx-auto mt-2 max-w-[30ch] text-center text-ink-soft sm:mx-0 sm:min-h-[2.6rem] sm:text-left">
                  {body}
                </p>

                <ul
                  className="mt-5 space-y-1.5 border-t border-line pt-4 text-center sm:text-left"
                  aria-hidden="true"
                >
                  {rows.map((r) => (
                    <li key={r} className="truncate text-[12px] text-ink-faint">
                      {r}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
