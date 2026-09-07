import { motion } from "framer-motion";
import { Check, PhoneCall, Waves } from "lucide-react";
import { fadeUp, scaleIn, stagger, viewport } from "../lib/motion";
import { Button, Kicker, cx } from "../components/ui";

const capabilities = [
  "Natural voice conversations, not recorded scripts",
  "Six call attempts inside respectful 10 AM–9 PM windows",
  "Sentiment analysis on every call, text and WhatsApp reply",
  "Automatic hand-off to you the moment a lead is ready",
  "Six-month Smart Nurture sequence with 24 touchpoints",
];

const transcript = [
  { who: "ai", text: "Hi Dana, following up on your Cedar Lane valuation — is now a bad time?" },
  { who: "lead", text: "No, go ahead. I'm curious what it's worth." },
  { who: "ai", text: "I'll book you with Sarah Thursday at 4. She'll bring three recent comps on your street." },
];

export function AIEngine() {
  return (
    <section id="ai" className="relative overflow-hidden bg-teal-ink py-24 text-cream sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 size-[30rem] rounded-full bg-teal/25 blur-3xl" />
        <div className="absolute -bottom-40 right-0 size-[34rem] rounded-full bg-[#b3541e]/12 blur-3xl" />
      </div>

      <div className="container-x relative grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
        <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewport}>
          <motion.div variants={fadeUp}>
            <Kicker tone="cream">The AI engine</Kicker>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-cream sm:text-[2.6rem]"
          >
            Your AI agent works the leads you never get around to.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-[17px] leading-[1.7] text-mist/85">
            Voice AI dials warm leads before you open your laptop, handles the first objection and
            books the appointment. It learns your follow-up patterns, reads sentiment, and knows
            when a conversation needs a human.
          </motion.p>

          <motion.ul variants={stagger(0.06, 0.15)} className="mt-8 space-y-3">
            {capabilities.map((c) => (
              <motion.li key={c} variants={fadeUp} className="flex items-start gap-3 text-[15px] text-mist/90">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-cream/12">
                  <Check className="size-3 text-cream" strokeWidth={3} aria-hidden="true" />
                </span>
                {c}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-9">
            <Button href="/#pricing" size="lg" variant="cream" withArrow>
              Turn on the AI engine
            </Button>
          </motion.div>

        </motion.div>

        {/* call panel */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          role="img"
          aria-label="Voice AI call in progress with Dana Whitfield, attempt 3 of 6, sentiment positive, appointment booked"
          className="rounded-3xl border border-cream/12 bg-cream/[0.06] p-6 backdrop-blur-sm sm:p-7"
        >
          <div aria-hidden="true">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-mist/70">
                <PhoneCall className="size-3.5" />
                Outbound call
              </span>
              <span className="rounded-full bg-cream/12 px-2.5 py-1 text-[11px] font-bold text-mist">
                Attempt 3 of 6
              </span>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <p className="text-[19px] font-bold text-cream">Dana Whitfield</p>
              <p className="font-mono text-[12px] text-mist/60">Live</p>
            </div>

            {/* waveform */}
            <div className="mt-4 flex h-10 items-center gap-[3px]" aria-hidden="true">
              {Array.from({ length: 44 }).map((_, i) => {
                const h = 18 + Math.abs(Math.sin(i * 0.7)) * 70 + (i % 5) * 4;
                return (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { scaleY: 0.15 },
                      show: {
                        scaleY: 1,
                        transition: { duration: 0.5, delay: i * 0.012, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                    style={{ height: `${Math.min(h, 100)}%` }}
                    className={cx(
                      "w-full origin-center rounded-full",
                      i < 30 ? "bg-cream/70" : "bg-cream/25",
                    )}
                  />
                );
              })}
            </div>

            <ol className="mt-5 space-y-2.5">
              {transcript.map((t, i) => (
                <li
                  key={i}
                  className={cx(
                    "max-w-[92%] rounded-xl px-3.5 py-2.5 text-[13px] leading-snug",
                    t.who === "ai"
                      ? "bg-cream/12 text-mist"
                      : "ml-auto bg-cream text-teal-ink",
                  )}
                >
                  {t.text}
                </li>
              ))}
            </ol>

            <div className="mt-5 grid grid-cols-2 gap-2 border-t border-cream/12 pt-4 text-[11px]">
              {[
                ["Sentiment", "Positive"],
                ["Outcome", "Appointment booked"],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="font-semibold uppercase tracking-wider text-mist/55">{k}</p>
                  <p className="mt-0.5 font-bold text-cream">{v}</p>
                </div>
              ))}
            </div>

            <p className="mt-4 flex items-center gap-1.5 text-[11px] text-mist/70">
              <Waves className="size-3" />
              FollowUpHub Voice v3
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
