import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import {
  BarChart3,
  CalendarCheck,
  Check,
  Inbox,
  Bot,
  Target,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "../components/ui";
import { fadeUp, stagger, viewport } from "../lib/motion";

const groups: { icon: LucideIcon; title: string; items: string[] }[] = [
  {
    icon: Target,
    title: "Lead capture",
    items: [
      "Unlimited leads and contacts",
      "250+ lead source integrations",
      "Pre-built funnels and landing pages",
      "Home evaluation funnel, ready to launch",
      "Instant lead routing to the right agent",
    ],
  },
  {
    icon: Inbox,
    title: "Communication",
    items: [
      "Omni-channel inbox for SMS, email and WhatsApp",
      "AI nurture workflows, sequences and agents",
      "Call recording and full transcripts",
      "Shared team conversation threads",
      "A2P registration handled for you",
    ],
  },
  {
    icon: Bot,
    title: "AI nurture",
    items: [
      "Voice AI with 6-attempt retry logic",
      "AI text sequences with sentiment analysis",
      "6-month Smart Nurture with 24 touchpoints",
      "Custom AI agents built without code",
      "Automatic hand-off to a human",
    ],
  },
  {
    icon: BarChart3,
    title: "Pipeline and reporting",
    items: [
      "Visual pipeline with custom stages",
      "Deal tracking and forecasting",
      "Agent performance and leaderboards",
      "Marketing ROI by lead source",
      "Speed-to-lead measurement",
    ],
  },
  {
    icon: CalendarCheck,
    title: "Booking",
    items: [
      "Calendar sync and booking links",
      "Automated showing reminders",
      "Anti-ghosting confirmation sequences",
      "Team availability pooling",
      "Round-robin appointment assignment",
    ],
  },
  {
    icon: Check,
    title: "Business operations",
    items: [
      "Client websites and funnel builder",
      "Social scheduling and email campaigns",
      "Reputation and review management",
      "Invoicing and payments",
      "Priority phone support, 7 days a week",
    ],
  },
];

/**
 * Hairline grid rather than six bordered boxes.
 *
 * Pattern from 21st.dev "Feature Grid Spotlight Cards" (@hirael/feature-08):
 * cells divided by single hairlines with crosshair marks at the intersections,
 * an icon tile per cell, and a radial spotlight that follows the pointer. Six
 * identical outlined cards is the flattest thing a feature section can be; the
 * shared grid reads as one surface and the crosshairs give it a drawn quality.
 */
function Cell({
  icon: Icon,
  title,
  items,
  index,
}: {
  icon: LucideIcon;
  title: string;
  items: string[];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const reduce = useReducedMotion();
  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${mx}px ${my}px, rgb(26 107 90 / 0.09), transparent 70%)`;

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      onPointerMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        mx.set(-500);
        my.set(-500);
      }}
      className="group relative border-line p-6 sm:p-7 [&:not(:last-child)]:border-b md:[&:not(:last-child)]:border-b-0 md:[&:nth-child(-n+3)]:border-b md:[&:not(:nth-child(3n))]:border-r"
    >
      {!reduce && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />
      )}

      {/* crosshair at the cell's top-left corner, drawn on the grid lines */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-px -top-px hidden size-3 md:block"
      >
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-line" />
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line" />
      </span>

      <div className="relative">
        <span className="flex size-10 items-center justify-center rounded-xl bg-mist text-teal transition-colors duration-500 group-hover:bg-teal group-hover:text-white">
          <Icon className="size-[18px]" aria-hidden="true" />
        </span>
        <div className="mt-4 flex items-baseline gap-2.5">
          <h3 className="t-h3 text-ink">{title}</h3>
          <span className="font-mono text-[11px] font-bold text-ink-faint">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <ul className="mt-4 space-y-2">
          {items.map((i) => (
            <li key={i} className="flex items-start gap-2.5 t-meta text-ink-soft">
              <Check className="mt-1 size-3 shrink-0 text-teal" strokeWidth={3} aria-hidden="true" />
              {i}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function WhatsIncluded() {
  return (
    <section id="included" className="py-8 sm:py-10">
      <div className="container-x">
        <SectionHeading
          align="split"
          title={
            <>
              The full platform, from first lead to <span className="grad-teal">closed deal</span>.
            </>
          }
          lede="Every capability below is part of the subscription. Nothing here is a paid add-on."
        />

        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid overflow-hidden rounded-2xl border border-line bg-card md:grid-cols-3"
        >
          {groups.map((g, i) => (
            <Cell key={g.title} icon={g.icon} title={g.title} items={g.items} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
