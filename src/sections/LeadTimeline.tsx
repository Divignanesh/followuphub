import { motion } from "framer-motion";
import {
  CalendarCheck,
  Inbox,
  MessageCircle,
  MessageSquare,
  PhoneCall,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading, cx } from "../components/ui";
import { fadeUp, stagger, viewport } from "../lib/motion";

/**
 * One lead, minute by minute.
 *
 * The rest of the page describes what the system does; this shows it
 * happening. Every mechanic here is one the product already claims elsewhere —
 * the six attempts inside a 10 AM to 9 PM window, the channels, the six-month
 * nurture and its 24 touchpoints — and the dialogue is the same call the AI
 * engine section plays out loud, so the two never contradict each other.
 */
type Beat = {
  time: string;
  icon: LucideIcon;
  channel: string;
  title: string;
  detail?: string;
  quote?: string;
  tone?: "ai" | "lead" | "won";
};

const beats: Beat[] = [
  {
    time: "7:41 pm",
    icon: Inbox,
    channel: "Lead capture",
    title: "Dana requests a valuation on Cedar Lane",
    detail: "Form fill from a listing portal, after dinner, long past office hours.",
  },
  {
    time: "7:41 pm",
    icon: PhoneCall,
    channel: "Voice AI",
    title: "The phone rings 8 seconds later",
    quote: "Hi Dana, following up on your Cedar Lane valuation — is now a bad time?",
    tone: "ai",
  },
  {
    time: "7:43 pm",
    icon: MessageSquare,
    channel: "SMS + WhatsApp",
    title: "No answer, so the follow-up changes channel",
    detail: "Attempt 1 of 6, all inside the respectful 10 AM to 9 PM window.",
  },
  {
    time: "8:12 pm",
    icon: MessageCircle,
    channel: "Inbound reply",
    title: "Dana writes back",
    quote: "No, go ahead. I'm curious what it's worth.",
    tone: "lead",
  },
  {
    time: "8:13 pm",
    icon: CalendarCheck,
    channel: "Booked",
    title: "Thursday, 4:00 pm, on your calendar",
    detail: "Sentiment positive. You are handed a booked appointment, not a task list.",
    tone: "won",
  },
  {
    time: "Next 6 months",
    icon: Sprout,
    channel: "Smart Nurture",
    title: "If she had gone quiet, it would still be working",
    detail: "24 touchpoints across voice, text, WhatsApp and email until she is ready.",
  },
];

const summary = [
  ["Under 1 min", "Speed to lead"],
  ["6 attempts", "Before it rests"],
  ["10 AM – 9 PM", "Respectful window"],
  ["24 touchpoints", "Over six months"],
];

export function LeadTimeline() {
  return (
    <section className="border-y border-line bg-sand py-24 sm:py-28" aria-labelledby="timeline-title">
      <div className="container-x">
        <SectionHeading
          kicker="Speed to lead"
          title={<span id="timeline-title">The first hour is the whole game.</span>}
          lede="Most leads are lost before anyone calls them back. This is one evening, from the form fill to the booked appointment, with nobody at a desk."
        />

        <motion.ol
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative mx-auto mt-14 max-w-3xl"
        >
          {/* the rail the beats hang from */}
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-[1.4rem] top-3 w-px bg-linear-to-b from-teal/35 via-line to-transparent sm:left-[6.6rem]"
          />

          {beats.map(({ time, icon: Icon, channel, title, detail, quote, tone }) => (
            <motion.li key={time + title} variants={fadeUp} className="relative flex gap-4 pb-7 last:pb-0">
              <span className="hidden w-20 shrink-0 pt-2.5 text-right font-mono text-[12px] text-ink-faint sm:block">
                {time}
              </span>

              <span
                className={cx(
                  "relative z-10 mt-1.5 flex size-11 shrink-0 items-center justify-center rounded-xl border",
                  tone === "won"
                    ? "border-teal bg-teal text-white"
                    : "border-line bg-card text-teal shadow-soft",
                )}
              >
                <Icon className="size-[18px]" aria-hidden="true" />
              </span>

              <div className="min-w-0 flex-1 rounded-2xl border border-line bg-card p-4 shadow-soft">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-teal">
                    {channel}
                  </span>
                  <span className="font-mono text-[11.5px] text-ink-faint sm:hidden">{time}</span>
                </p>
                <p className="mt-1 text-[15.5px] font-bold leading-snug text-ink">{title}</p>

                {quote && (
                  <p
                    className={cx(
                      "mt-2.5 rounded-xl px-3.5 py-2.5 text-[13.5px] leading-snug",
                      tone === "lead" ? "bg-mist text-teal-ink" : "bg-sand text-ink",
                    )}
                  >
                    &ldquo;{quote}&rdquo;
                  </p>
                )}
                {detail && <p className="mt-1.5 text-[13.5px] leading-[1.6] text-ink-soft">{detail}</p>}
              </div>
            </motion.li>
          ))}
        </motion.ol>

        <motion.dl
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {summary.map(([value, label]) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="rounded-2xl border border-line bg-card p-4 text-center shadow-soft"
            >
              <dt className="text-[17px] font-extrabold tracking-[-0.02em] text-teal">{value}</dt>
              <dd className="mt-1 text-[12.5px] text-ink-soft">{label}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
