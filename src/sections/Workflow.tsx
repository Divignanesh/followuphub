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
 * Every stage is centred on its own column, under a centred section heading,
 * so the section has one axis instead of a centred title sitting on top of
 * four left-aligned blocks.
 *
 * That costs the rail its easy anchor. With the disc centred the connector can
 * no longer just be the next flex child, so it is positioned from the disc's
 * own centre line: it starts 30px right of the column's midpoint and runs
 * 36px short of the column's width, which lands it 8px clear of the next disc
 * once the 24px column gap is counted. The step number moved below the disc
 * for the same reason, because beside it the pair centres as a group and
 * pulls the disc off the axis the line is measured from.
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
    <section className="bg-sand pb-10 pt-10 sm:pb-12 sm:pt-12">
      <div className="container-x">
        <SectionHeading
          align="center"
          title="Four stages, and each one feeds the next."
          lede="Nothing falls between tools. There is one tool."
        />

        <RevealGroup as="ol" className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map(({ icon: Icon, step, title, body, rows }, i) => {
            const last = i === stages.length - 1;
            return (
              <RevealItem as="li" key={title} className="relative flex flex-col items-center text-center">
                <span className="relative z-10 grid size-11 place-items-center rounded-full bg-teal text-cream">
                  <Icon className="size-[18px]" aria-hidden="true" />
                </span>

                {/* the rail, measured from the disc's centre line */}
                {!last && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[calc(50%+30px)] top-[22px] hidden h-px w-[calc(100%-36px)] bg-teal/25 lg:block"
                  >
                    <span className="absolute -right-px -top-[3px] size-[7px] rotate-45 border-r border-t border-teal/45" />
                  </span>
                )}

                <span className="mt-2 font-mono text-[12px] font-semibold text-ink-faint">{step}</span>

                <h3 className="t-h3 mt-1.5 text-ink">{title}</h3>
                {/* Two lines reserved from sm up, so the rule under each body lands
                    on the same baseline across the row. Without it the bodies that
                    wrap to one line pull their rule up and the row reads as
                    misaligned. In one column there is no row to align to, so the
                    reserve would only be dead space. */}
                <p className="t-meta mt-1.5 max-w-[30ch] text-ink-soft sm:min-h-[2.6rem]">{body}</p>

                <ul className="mt-4 w-full space-y-1 border-t border-line pt-3" aria-hidden="true">
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
