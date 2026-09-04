import { motion } from "framer-motion";
import {
  BarChart3,
  CalendarCheck,
  Check,
  Inbox,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "../components/ui";
import { fadeUp, scaleIn, stagger, viewport } from "../lib/motion";

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
    icon: Sparkles,
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
      "Client IDX websites and funnel builder",
      "Social scheduling and email campaigns",
      "Reputation and review management",
      "Invoicing and payments",
      "Priority phone support, 7 days a week",
    ],
  },
];

export function WhatsIncluded() {
  return (
    <section id="included" className="py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          kicker="What's included"
          title="The full platform, from first lead to closed deal."
          lede="Every capability below is part of the subscription. Nothing here is a paid add-on."
        />

        <motion.div
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {groups.map(({ icon: Icon, title, items }) => (
            <motion.article
              key={title}
              variants={scaleIn}
              className="rounded-2xl border border-line bg-card p-7 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-mist text-teal">
                  <Icon className="size-[18px]" aria-hidden="true" />
                </span>
                <h3 className="text-[16px] font-extrabold tracking-[-0.015em] text-ink">{title}</h3>
              </div>
              <motion.ul variants={stagger(0.04, 0.1)} className="mt-5 space-y-2.5">
                {items.map((it) => (
                  <motion.li
                    key={it}
                    variants={fadeUp}
                    className="flex items-start gap-2.5 text-[14px] leading-snug text-ink-soft"
                  >
                    <Check
                      className="mt-0.5 size-3.5 shrink-0 text-teal"
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                    {it}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
