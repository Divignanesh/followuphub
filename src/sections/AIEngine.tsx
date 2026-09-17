import { motion } from "framer-motion";
import { Check, PhoneCall, Volume2, Waves } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { fadeUp, scaleIn, stagger, viewport } from "../lib/motion";
import { Button, Kicker, cx } from "../components/ui";

const capabilities = [
  "Natural voice conversations, not recorded scripts",
  "Six call attempts inside respectful 10 AM–9 PM windows",
  "Sentiment analysis on every call, text and WhatsApp reply",
  "Automatic hand-off to you the moment a lead is ready",
  "Six-month Smart Nurture sequence with 24 touchpoints",
];

/**
 * The call is three prerendered audio clips rather than browser speech
 * synthesis: the voice is then the same for every visitor instead of
 * whatever their browser happens to ship, and it still works where the
 * speech API is unreliable (iOS Safari). Regenerating the clips is a
 * drop-in swap — see scripts/ notes in the README for the voices used.
 */
type Line = { who: "ai" | "lead"; text: string; src: string };

const transcript: Line[] = [
  {
    who: "ai",
    text: "Hi Dana, following up on your Cedar Lane valuation — is now a bad time?",
    src: "/audio/call-line-1.m4a",
  },
  {
    who: "lead",
    text: "No, go ahead. I'm curious what it's worth.",
    src: "/audio/call-line-2.m4a",
  },
  {
    who: "ai",
    text: "I'll book you with Sarah Thursday at 4. She'll bring three recent comps on your street.",
    src: "/audio/call-line-3.m4a",
  },
];

/** Word plus its character offset, so playback position maps onto the markup. */
const wordsOf = (text: string) => {
  const out: { w: string; at: number }[] = [];
  const re = /\S+/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) out.push({ w: m[0], at: m.index });
  return out;
};

const LINES = transcript.map((l) => ({ ...l, words: wordsOf(l.text) }));

/** How often the highlight is re-synced to the clip's real position. */
const TICK_MS = 50;
const GAP_MS = 260;

export function AIEngine() {
  // active === -1 is the resting state: nothing moving, nothing audible, every
  // line at full contrast. It is also what the prerendered HTML ships, so the
  // transcript reads fine without JS.
  const [active, setActive] = useState(-1);
  const [charIndex, setCharIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const audio = useRef<HTMLAudioElement | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const gapRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lineRef = useRef(-1);

  /**
   * One element, reused for every line. Playback starts inside the click
   * handler, which is a real user gesture, so the browser always permits the
   * sound — and because Safari and iOS grant playback per element, that one
   * permission then carries the remaining lines, which start from timers
   * rather than from a gesture of their own.
   */
  const el = () => {
    if (!audio.current) audio.current = new Audio();
    audio.current.preload = "auto";
    return audio.current;
  };

  const clearTimers = () => {
    if (tickRef.current) clearInterval(tickRef.current);
    if (gapRef.current) clearTimeout(gapRef.current);
    tickRef.current = null;
    gapRef.current = null;
  };

  const reset = () => {
    clearTimers();
    if (audio.current) {
      audio.current.onended = null;
      audio.current.pause();
    }
    lineRef.current = -1;
    setCharIndex(0);
    setActive(-1);
    setPaused(false);
  };

  /** Words light up against where the clip actually is, not a guessed pace. */
  const startTick = (len: number) => {
    clearTimers();
    tickRef.current = setInterval(() => {
      const a = audio.current;
      if (a && a.duration > 0) setCharIndex((a.currentTime / a.duration) * len);
    }, TICK_MS);
  };

  function playFrom(i: number) {
    clearTimers();
    if (i >= LINES.length) return reset();

    const line = LINES[i];
    const len = line.text.length;
    lineRef.current = i;

    const a = el();
    a.src = line.src;
    a.currentTime = 0;
    a.onended = () => {
      clearTimers();
      setCharIndex(len);
      gapRef.current = setTimeout(() => playFrom(i + 1), GAP_MS);
    };

    a.play()
      .then(() => {
        // Only once sound is actually running does the panel go active, so the
        // waveform can never animate over silence.
        setActive(i);
        setCharIndex(0);
        setPaused(false);
        startTick(len);
      })
      .catch(() => reset());
  }

  const resume = () => {
    const i = lineRef.current;
    const a = audio.current;
    if (!a || i < 0) return;
    // Stopped in the gap between two lines: pick up at the next one.
    if (a.ended) return playFrom(i + 1);
    a.play()
      .then(() => {
        setPaused(false);
        startTick(LINES[i].text.length);
      })
      .catch(() => reset());
  };

  const pause = () => {
    clearTimers();
    if (audio.current) audio.current.pause();
    setPaused(true);
  };

  /** Click starts it, clicking again stops it, a third click picks it back up. */
  const toggle = () => {
    if (active < 0) return playFrom(0);
    if (paused) return resume();
    pause();
  };

  // Never leave a clip playing after the section unmounts.
  useEffect(
    () => () => {
      if (tickRef.current) clearInterval(tickRef.current);
      if (gapRef.current) clearTimeout(gapRef.current);
      if (audio.current) {
        audio.current.onended = null;
        audio.current.pause();
      }
    },
    [],
  );

  /** Engaged: a call is loaded, running or stopped part-way. */
  const engaged = active >= 0;
  const running = engaged && !paused;

  /** Full contrast when at rest or already spoken; dim for what is still to come. */
  const spoken = (lineIndex: number, at: number) =>
    !engaged || lineIndex < active || (lineIndex === active && at <= charIndex);

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

        {/* call panel — at rest until hovered or clicked */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="rounded-3xl border border-cream/12 bg-cream/[0.06] p-6 backdrop-blur-sm sm:p-7"
        >
          <div className="flex items-center justify-between">
            <span
              aria-hidden="true"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-mist/70"
            >
              <PhoneCall className="size-3.5" />
              Outbound call
            </span>
            <span
              aria-hidden="true"
              className="rounded-full bg-cream/12 px-2.5 py-1 text-[11px] font-bold text-mist"
            >
              Attempt 3 of 6
            </span>
          </div>

          <div className="mt-4 flex items-baseline justify-between">
            <p className="text-[19px] font-bold text-cream">Dana Whitfield</p>
            <p aria-hidden="true" className="font-mono text-[12px] text-mist/60">
              {running ? "Live" : paused ? "Stopped" : "Replay"}
            </p>
          </div>

          {/* waveform — click to play, click again to stop */}
          <div
            role="button"
            tabIndex={0}
            aria-label={running ? "Stop the call" : "Play the call"}
            onClick={toggle}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle();
              }
            }}
            className="group mt-4 -mx-1 cursor-pointer rounded-xl px-1 py-1 transition-colors hover:bg-cream/[0.07]"
          >
            <div
              aria-hidden="true"
              className={cx("flex h-10 items-center gap-[3px]", running && "wave-live")}
            >
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
                    style={{ height: `${Math.min(h, 100)}%`, animationDelay: `${(i % 11) * 70}ms` }}
                    className={cx(
                      "w-full origin-center rounded-full",
                      i < 30 ? "bg-cream/70" : "bg-cream/25",
                    )}
                  />
                );
              })}
            </div>

            <p
              aria-hidden="true"
              className="mt-2 flex items-center gap-1.5 text-[11px] text-mist/60"
            >
              <Volume2 className="size-3" />
              {running
                ? "Playing… click to stop"
                : paused
                  ? "Stopped — click to pick it up"
                  : "Click the waveform to hear this call"}
            </p>
          </div>

          <ol className="mt-5 space-y-2.5">
            {LINES.map((t, i) => (
              <li
                key={i}
                className={cx(
                  "max-w-[92%] rounded-xl px-3.5 py-2.5 text-[13px] leading-snug transition-all duration-300",
                  t.who === "ai" ? "bg-cream/12 text-mist" : "ml-auto bg-cream text-teal-ink",
                  engaged && i === active && "ring-2 ring-cream/40",
                  engaged && i > active && "opacity-60",
                )}
              >
                {t.words.map(({ w, at }, k) => (
                  <span
                    key={k}
                    className={cx(
                      "transition-opacity duration-200",
                      spoken(i, at) ? "opacity-100" : "opacity-30",
                    )}
                  >
                    {w}{" "}
                  </span>
                ))}
              </li>
            ))}
          </ol>

          <div
            aria-hidden="true"
            className="mt-5 grid grid-cols-2 gap-2 border-t border-cream/12 pt-4 text-[11px]"
          >
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

          <p aria-hidden="true" className="mt-4 flex items-center gap-1.5 text-[11px] text-mist/70">
            <Waves className="size-3" />
            FollowUpHub Voice v3
          </p>
        </motion.div>
      </div>
    </section>
  );
}
