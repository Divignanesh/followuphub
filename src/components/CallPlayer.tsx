import { motion } from "framer-motion";
import { Check, Pause, PhoneCall, Play, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cx } from "./ui";

/**
 * The live call, lifted out of the AI engine section so the hero can lead with
 * it. Three prerendered clips rather than browser speech synthesis, so the
 * voices are the ones the product actually uses and the transcript can be
 * highlighted against real playback position instead of a guessed pace.
 */
type Line = { who: "ai" | "lead"; text: string; src: string };

const transcript: Line[] = [
  {
    who: "ai",
    text: "Hi Dana, following up on your Cedar Lane valuation. Is now a bad time?",
    src: "/audio/call-line-1.mp3",
  },
  {
    who: "lead",
    text: "No, go ahead. I'm curious what it's worth.",
    src: "/audio/call-line-2.mp3",
  },
  {
    who: "ai",
    text: "I'll book you with Sarah Thursday at 4. She'll bring three recent comps on your street.",
    src: "/audio/call-line-3.mp3",
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

const TICK_MS = 50;
const GAP_MS = 260;

export function CallPlayer({ className }: { className?: string }) {
  // active === -1 is the resting state, and it is what the prerendered HTML
  // ships, so the transcript reads fine with no JavaScript at all.
  const [active, setActive] = useState(-1);
  const [charIndex, setCharIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const audio = useRef<HTMLAudioElement | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const gapRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lineRef = useRef(-1);

  const rootRef = useRef<HTMLDivElement | null>(null);
  /** The call has run to the end, so entering the section must not replay it. */
  const completed = useRef(false);
  /** Set when the reader pauses by hand, which switches auto-play off for good. */
  const userPaused = useRef(false);

  /**
   * One element, reused for every line. Playback starts inside the click
   * handler, a real user gesture, so the browser always permits the sound —
   * and because Safari and iOS grant playback per element, that permission
   * carries the remaining lines, which start from timers rather than a gesture.
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

  const startTick = (len: number) => {
    clearTimers();
    tickRef.current = setInterval(() => {
      const a = audio.current;
      if (a && a.duration > 0) setCharIndex((a.currentTime / a.duration) * len);
    }, TICK_MS);
  };

  function playFrom(i: number) {
    clearTimers();
    if (i >= LINES.length) {
      completed.current = true;
      return reset();
    }

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

  const toggle = () => {
    if (active < 0) {
      userPaused.current = false;
      completed.current = false;
      return playFrom(0);
    }
    if (paused) {
      userPaused.current = false;
      return resume();
    }
    userPaused.current = true;
    pause();
  };

  /**
   * Play when the call scrolls into view, stop when it scrolls out.
   *
   * Only the stopping half is guaranteed. Scrolling is not a user gesture, so
   * every current browser refuses audio with sound until the reader has
   * clicked or tapped something on the page; on a first visit that arrives by
   * scroll, play() is rejected and playFrom's catch resets the player to its
   * resting state, leaving the button to do the work. Where the reader has
   * already interacted, it starts on its own.
   *
   * There is no "already tried" flag, deliberately. A blocked attempt resets
   * the player, which leaves lineRef at -1, so the next entry tries again —
   * and by then the reader has usually clicked something and it works. Two
   * conditions stop it instead, and both are about not being obnoxious:
   * `completed` after the call has run to the end, so returning to the
   * section does not replay it, and `userPaused` after a manual pause, which
   * switches auto-play off for the rest of the visit. A part-played call
   * resumes where it stopped rather than starting over.
   */
  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (userPaused.current || completed.current) return;
          if (lineRef.current >= 0) resume();
          else playFrom(0);
        } else if (lineRef.current >= 0) {
          pause();
        }
      },
      { threshold: 0.55 },
    );
    io.observe(node);
    return () => io.disconnect();
    // Mount only: the handlers it calls read their state through refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const engaged = active >= 0;
  const running = engaged && !paused;
  const spoken = (lineIndex: number, at: number) =>
    !engaged || lineIndex < active || (lineIndex === active && at <= charIndex);

  return (
    <div
      ref={rootRef}
      className={cx(
        "rounded-3xl border border-cream/20 bg-teal-ink/80 p-5 text-cream shadow-teal backdrop-blur-md sm:p-6",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          aria-hidden="true"
          className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-mist/80"
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
        <p aria-hidden="true" className="font-mono text-[12px] text-mist/70">
          {running ? "Live" : paused ? "Stopped" : "Replay"}
        </p>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggle}
            aria-label={running ? "Stop the call" : "Play the call"}
            className="grid size-12 shrink-0 place-items-center rounded-full bg-cream text-teal-ink shadow-lift transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            {running ? (
              <Pause className="size-5 fill-current" aria-hidden="true" />
            ) : (
              <Play className="ml-0.5 size-5 fill-current" aria-hidden="true" />
            )}
          </button>

          <div
            aria-hidden="true"
            className={cx("flex h-12 min-w-0 flex-1 items-center gap-[3px]", running && "wave-live")}
          >
            {Array.from({ length: 40 }).map((_, i) => {
              const h = 18 + Math.abs(Math.sin(i * 0.7)) * 70 + (i % 5) * 4;
              return (
                <span
                  key={i}
                  style={{ height: `${Math.min(h, 100)}%`, animationDelay: `${(i % 11) * 70}ms` }}
                  className={cx(
                    "w-full origin-center rounded-full",
                    i < 27 ? "bg-cream/70" : "bg-cream/25",
                  )}
                />
              );
            })}
          </div>
        </div>

        <p
          aria-hidden="true"
          className="mt-2.5 flex items-center gap-1.5 pl-16 text-[11px] text-mist/70"
        >
          <Volume2 className="size-3" />
          {running ? "Playing" : paused ? "Stopped. Press play to pick it up" : "Hear a real call"}
        </p>
      </div>

      <ol className="mt-5 space-y-2.5">
        {LINES.map((t, i) => (
          <li
            key={i}
            className={cx(
              "max-w-[88%] px-4 py-3 text-[13.5px] leading-snug transition-[opacity,box-shadow] duration-300",
              t.who === "ai"
                ? "rounded-2xl rounded-bl-md bg-cream/14 text-mist"
                : "ml-auto rounded-2xl rounded-br-md bg-cream text-teal-ink",
              engaged && i === active && "ring-2 ring-cream/45",
              engaged && i > active && "opacity-55",
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
                {w}
                {k < t.words.length - 1 ? " " : ""}
              </span>
            ))}
          </li>
        ))}
      </ol>

      <motion.div className="mt-5 grid grid-cols-2 gap-2 border-t border-cream/12 pt-4 text-[11px]">
        <span>
          <span className="block font-bold uppercase tracking-[0.14em] text-mist/60">Sentiment</span>
          <span className="mt-1 block text-[14px] font-bold text-cream">Positive</span>
        </span>
        <span>
          <span className="block font-bold uppercase tracking-[0.14em] text-mist/60">Outcome</span>
          <span className="mt-1 flex items-center gap-1.5 text-[14px] font-bold text-cream">
            <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
            Appointment booked
          </span>
        </span>
      </motion.div>
    </div>
  );
}
