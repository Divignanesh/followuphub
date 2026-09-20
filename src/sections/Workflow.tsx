import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { BarChart3, Boxes, Send, Sprout, type LucideIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { PaperField } from "../components/PaperField";
import { SectionHeading, cx } from "../components/ui";

type Stage = {
  icon: LucideIcon;
  step: string;
  title: string;
  body: string;
  rows: string[];
};

const stages: Stage[] = [
  {
    icon: Boxes,
    step: "01",
    title: "Organize",
    body: "Every lead and contact in one place, with your whole team working from the same system.",
    rows: ["Dana Whitfield · New lead", "Marcus Okoye · Contacted", "Priya Shah · Showing"],
  },
  {
    icon: Send,
    step: "02",
    title: "Engage",
    body: "Emails, texts and calls run automatically, so your hours go to the hottest deals.",
    rows: ["Day 0 · AI call attempt", "Day 1 · Text follow-up", "Day 3 · Market email"],
  },
  {
    icon: Sprout,
    step: "03",
    title: "Grow",
    body: "Social scheduling, campaigns and client sites, all feeding the same pipeline.",
    rows: ["Instagram · Scheduled", "Email blast · 1,240 sent", "Open house · 38 RSVPs"],
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Analyze",
    body: "Agent performance, pipeline health and marketing return, in reports you can act on.",
    rows: ["Pipeline value · $12.4M", "Speed to lead · 42s", "Marketing ROI · 400%"],
  },
];

const LAST = stages.length - 1;

/*
  The deck is scrubbed, not stepped.

  Scroll maps to a continuous position along the stages: `HOLD` of the travel
  keeps a stage open, then `TRANS` folds it into the next. Easing the fold in
  and out means velocity is zero at both ends of it, which matches the zero
  velocity of the hold either side, so there is no visible kick where one
  hands over to the other.

  Most of the travel goes to the folds rather than the holds. A fold that gets
  only a wheel notch of scroll is continuous on paper and still reads as a
  jump; at roughly 270px each there is room to watch a card close.
*/
const HOLD = 0.09;
const TRANS = (1 - stages.length * HOLD) / LAST;
const UNIT = HOLD + TRANS;

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - ((-2 * t + 2) ** 2) / 2);

function stageAt(progress: number) {
  const p = Math.min(1, Math.max(0, progress));
  const i = Math.min(LAST, Math.floor(p / UNIT));
  const within = p - i * UNIT;
  return within <= HOLD ? i : i + easeInOut(Math.min(1, (within - HOLD) / TRANS));
}

/*
  The palette switches faster than the card folds.

  Mixing colour straight off the fold leaves both cards sitting at a half-way
  palette for the whole middle of it, and mid-grey text on a mid-sage card is
  legible to nobody. Steepening the curve keeps each card in its own palette
  until it is actually losing the deck, so the pair is only ever caught
  half-mixed for about a fifth of the fold.
*/
const SNAP = 5;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const share = (at: number, index: number) => clamp01(1 - Math.abs(at - index));
const paletteOf = (at: number, index: number) => clamp01((share(at, index) - 0.5) * SNAP + 0.5);

/**
 * Every colour on a card is one mix between its folded and its open value,
 * driven by the `--lit` custom property that the scrub writes each frame. One
 * motion value per card then carries the whole colour change, instead of a
 * dozen of them, and the card is never caught between two palettes.
 */
const mix = (lit: string, folded: string) =>
  `color-mix(in oklab, ${lit} calc(var(--lit, 0) * 100%), ${folded})`;

const C = {
  card: mix("var(--color-teal-deep)", "var(--color-cream)"),
  border: mix("transparent", "var(--color-line)"),
  shadow: `0 2px 6px rgb(45 42 39 / 0.05), 0 20px 46px -18px ${mix("rgb(18 63 54 / 0.55)", "rgb(45 42 39 / 0.16)")}`,
  step: mix("rgb(250 247 242 / 0.55)", "var(--color-teal)"),
  chip: mix("rgb(250 247 242 / 0.15)", "var(--color-mist)"),
  icon: mix("var(--color-cream)", "var(--color-teal)"),
  title: mix("var(--color-cream)", "var(--color-ink)"),
  body: mix("rgb(250 247 242 / 0.75)", "var(--color-ink-soft)"),
  rowBg: mix("rgb(250 247 242 / 0.07)", "var(--color-card)"),
  rowBorder: mix("rgb(250 247 242 / 0.16)", "var(--color-line)"),
  rowText: mix("rgb(250 247 242 / 0.85)", "var(--color-ink-soft)"),
  dot: mix("rgb(250 247 242 / 0.6)", "rgb(26 107 90 / 0.5)"),
  tick: mix("var(--color-teal)", "rgb(45 42 39 / 0.15)"),
};

/** Tracks a media query without assuming a window on the server. */
function useMatches(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);
  return matches;
}

/* --------------------------------- card ---------------------------------- */

function StageCard({
  stage,
  index,
  at,
  dealt,
  onOpen,
}: {
  stage: Stage;
  index: number;
  at: MotionValue<number>;
  dealt: boolean;
  onOpen: (i: number) => void;
}) {
  const { icon: Icon, step, title, body, rows } = stage;

  // 1 when this card holds the deck, 0 once the fold has passed it. Adjacent
  // cards always sum to 1, so the open width is conserved through the fold.
  const grow = useTransform(at, (v) => share(v, index));
  const lit = useTransform(at, (v) => paletteOf(v, index));
  const copy = useTransform(grow, [0.22, 0.66], [0, 1], { clamp: true });
  const tab = useTransform(grow, [0.08, 0.5], [1, 0], { clamp: true });

  const litNow = dealt ? undefined : index === 0 ? 1 : 0;

  return (
    <motion.li
      style={
        dealt
          ? ({ "--lit": lit, flexGrow: grow, backgroundColor: C.card, borderColor: C.border, boxShadow: C.shadow } as never)
          : ({ "--lit": litNow, backgroundColor: C.card, borderColor: C.border, boxShadow: C.shadow } as never)
      }
      className={cx(
        "flex w-[84vw] max-w-[21rem] shrink-0 snap-center overflow-hidden rounded-2xl border",
        "sm:w-auto sm:max-w-none sm:shrink",
        dealt ? "sm:basis-[4.5rem] sm:grow-0" : "sm:flex-1",
      )}
    >
      {/* the spine: what stays on screen once the card folds away */}
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Stage ${step}, ${title}`}
        className="group flex w-[3.5rem] shrink-0 cursor-pointer flex-col items-center justify-between py-5 sm:w-[4.5rem] sm:py-6"
      >
        <motion.span style={{ color: C.step } as never} className="font-mono text-[11px] font-bold">
          {step}
        </motion.span>

        {/* reading bottom-to-top, the way a folded tab is labelled */}
        <motion.span
          aria-hidden="true"
          style={dealt ? ({ opacity: tab } as never) : { opacity: 0 }}
          className={cx(
            "hidden rotate-180 whitespace-nowrap text-[13px] font-extrabold tracking-[-0.01em] text-ink-soft",
            "[writing-mode:vertical-rl]",
            dealt && "sm:block",
          )}
        >
          {title}
        </motion.span>

        <motion.span
          style={{ backgroundColor: C.chip, color: C.icon } as never}
          className="flex size-8 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
        >
          <Icon className="size-4" aria-hidden="true" />
        </motion.span>
      </button>

      {/* the card itself, clipped away rather than reflowed as it folds */}
      <motion.div
        style={dealt ? ({ opacity: copy } as never) : undefined}
        className={cx(
          "flex w-[14rem] shrink-0 grow flex-col gap-5 py-6 pr-5",
          dealt
            ? "sm:w-[44rem] sm:flex-row sm:items-center sm:gap-10 sm:py-7 sm:pr-7"
            : "sm:w-auto sm:min-w-0 sm:shrink sm:py-7 sm:pr-6",
        )}
      >
        <div className={cx("flex flex-col", dealt && "sm:w-[21rem] sm:shrink-0")}>
          <motion.h3
            style={{ color: C.title } as never}
            className="text-[1.35rem] font-extrabold leading-[1.1] tracking-[-0.025em] sm:text-[1.8rem]"
          >
            {title}
          </motion.h3>
          <motion.p
            style={{ color: C.body } as never}
            className="t-meta mt-2.5 sm:text-[15px] sm:leading-[1.6]"
          >
            {body}
          </motion.p>
        </div>

        <ul
          className={cx(
            "flex flex-col justify-center gap-2",
            dealt && "sm:ml-auto sm:w-[26rem] sm:shrink-0",
          )}
        >
          {rows.map((r) => (
            <motion.li
              key={r}
              style={{ backgroundColor: C.rowBg, borderColor: C.rowBorder, color: C.rowText } as never}
              className="flex items-center gap-2.5 rounded-lg border px-3 py-2 font-mono text-[11px] sm:px-4 sm:py-3 sm:text-[12px]"
            >
              <motion.span
                aria-hidden="true"
                style={{ backgroundColor: C.dot } as never}
                className="size-1.5 shrink-0 rounded-full"
              />
              {r}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.li>
  );
}

function Tick({ at, index, dealt }: { at: MotionValue<number>; index: number; dealt: boolean }) {
  const lit = useTransform(at, (v) => paletteOf(v, index));
  const width = useTransform(at, (v) => `${1.25 + share(v, index) * 1.25}rem`);
  return (
    <motion.span
      style={
        dealt
          ? ({ "--lit": lit, width, backgroundColor: C.tick } as never)
          : ({ "--lit": index === 0 ? 1 : 0, width: index === 0 ? "2.5rem" : "1.25rem", backgroundColor: C.tick } as never)
      }
      className="h-[3px] rounded-full"
    />
  );
}

/* -------------------------------- section -------------------------------- */

/**
 * Four stages, dealt sideways.
 *
 * The stages used to sit on a vertical rail, which read as four separate
 * claims stacked on top of each other. A pipeline moves across, not down, so
 * the stages are now one horizontal deck: the panel pins, and the fold tracks
 * the scroll frame by frame, each card folding to a numbered spine as the next
 * one opens. What you end up looking at is the sequence itself.
 *
 * Below `sm` there is no room for spines, so the same cards become a swipeable
 * rail and the same scrub runs off the rail's own scroll position. Under
 * reduced motion nothing pins: the four cards sit open side by side.
 */
export function Workflow() {
  const reduce = useReducedMotion();
  const wide = useMatches("(min-width: 640px)");
  const wrap = useRef<HTMLElement>(null);
  const rail = useRef<HTMLOListElement>(null);
  const at = useMotionValue(0);
  const [active, setActive] = useState(0);

  // Layout follows `reduce` alone. `wide` only decides which input moves the
  // deck, so the prerendered markup is never re-laid-out on hydration.
  const dealt = !reduce;
  const scrollDriven = dealt && wide;

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (scrollDriven) at.set(stageAt(p));
  });

  useMotionValueEvent(at, "change", (v) => {
    const next = Math.round(v);
    setActive((cur) => (cur === next ? cur : next));
  });

  // Pick the scrub up wherever the page already is once the query resolves.
  useEffect(() => {
    if (scrollDriven) at.set(stageAt(scrollYProgress.get()));
  }, [scrollDriven, at, scrollYProgress]);

  // Below `sm` the deck is a real horizontal scroller, so the swipe is the scrub.
  const onRailScroll = useCallback(() => {
    const el = rail.current;
    if (!el || scrollDriven) return;
    const span = el.scrollWidth - el.clientWidth;
    at.set(span > 0 ? (el.scrollLeft / span) * LAST : 0);
  }, [at, scrollDriven]);

  const onOpen = useCallback(
    (i: number) => {
      const el = rail.current;
      if (el && el.scrollWidth > el.clientWidth) {
        const card = el.children[i] as HTMLElement | undefined;
        if (card) {
          el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: "smooth" });
        }
        return;
      }
      // pinned: put the page where that stage's hold sits
      const section = wrap.current;
      if (!section || !scrollDriven) return;
      const top = section.getBoundingClientRect().top + window.scrollY;
      const travel = section.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + travel * (i * UNIT + HOLD / 2), behavior: "smooth" });
    },
    [scrollDriven],
  );

  return (
    <section
      ref={wrap}
      className={cx(
        "relative border-y border-line bg-sand",
        dealt ? "py-8 sm:h-[240vh] sm:py-0" : "py-8 sm:py-10",
      )}
    >
      <div
        className={cx(
          "relative",
          dealt && "sm:sticky sm:top-0 sm:flex sm:h-[100svh] sm:flex-col sm:justify-center sm:py-8",
        )}
      >
        {/* the field rides with the pinned panel rather than the scroll shaft
            behind it, so the texture holds still while the deck deals */}
        <PaperField />

        <div className="relative container-x">
          <SectionHeading
            align="split"
            title={
              <>
                Four stages, and each one <span className="grad-teal">feeds the next</span>.
              </>
            }
            lede="Nothing falls between tools, because there is only one tool."
          />

          <ol
            ref={rail}
            onScroll={onRailScroll}
            aria-label={`Stage ${active + 1} of ${stages.length}`}
            className={cx(
              "-mx-5 mt-8 flex snap-x snap-mandatory items-stretch gap-2.5 overflow-x-auto px-5 pb-1",
              "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              "sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0",
              dealt && "h-[19rem] sm:h-[18rem] lg:h-[19rem]",
            )}
          >
            {stages.map((stage, i) => (
              <StageCard key={stage.title} stage={stage} index={i} at={at} dealt={dealt} onOpen={onOpen} />
            ))}
          </ol>

          {/* how far along the deck you are */}
          <div className="mt-5 flex items-center gap-1.5" aria-hidden="true">
            {stages.map((stage, i) => (
              <Tick key={stage.title} at={at} index={i} dealt={dealt} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
