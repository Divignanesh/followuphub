import {
  ArrowLeft, ArrowRight, CalendarCheck, Globe, Inbox, Mail, MessageSquare,
  PhoneCall, Star, Workflow,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "../components/ui";

/**
 * The modules, shown rather than listed.
 *
 * Each card pairs the claim with a mock of the screen it refers to, because a
 * bullet saying "unified inbox" and a picture of three channels in one thread
 * are not the same promise. The screens follow the platform's real module
 * structure — conversations, opportunities, automation, sites and reputation —
 * so what a visitor sees here is what they find after signing up.
 */

type Card = {
  id: string;
  kicker: string;
  word: string;
  title: string;
  body: string;
  chips: string[];
  panel: React.ReactNode;
};

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-[29rem] self-stretch overflow-hidden">
      {/*
        The panel ground, as a gradient rather than a flat fill with two
        blurred circles parked on it. A blurred circle has no direction, so it
        reads as an orb whatever colour it is given; a diagonal fall through
        three teals gives the surface a light source, which is what makes the
        white screen look like it is sitting on something.
      */}
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(145deg, #0d2c26 0%, #123f36 38%, #1a6b5a 78%, #2f8b74 100%)",
        }}
      />
      {/* one soft sheen across the top left, where the light is coming from */}
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 90% at 8% 0%, rgb(232 245 240 / 0.16) 0%, transparent 58%)",
        }}
      />
      {/* the screen floats on the panel rather than sitting inside a box on it */}
      <div className="relative flex h-full items-center p-6 sm:p-10">
        <div className="flex w-full flex-col rounded-[1rem] bg-card p-4 shadow-[0_24px_60px_-20px_rgb(13_44_38/0.55)]">
          {children}
        </div>
      </div>
    </div>
  );
}

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 rounded-lg border border-line px-3 py-2.5">{children}</div>
);

const CARDS: Card[] = [
  {
    id: "conversations",
    word: "INBOX",
    kicker: "One inbox",
    title: "Every channel, one thread",
    body: "Calls, SMS, WhatsApp and email in one thread per contact.",
    chips: ["SMS", "WhatsApp", "Email", "Voice"],
    panel: (
      <>
        <p className="t-label text-ink-faint">Conversations · Dana Whitfield</p>
        <div className="mt-3 flex flex-1 flex-col justify-center gap-2.5">
          <Row>
            <PhoneCall className="size-4 shrink-0 text-teal" />
            <span className="truncate text-[12.5px] font-semibold text-ink">Call · 47s · booked</span>
            <span className="ml-auto text-[11px] text-ink-faint">09:14</span>
          </Row>
          <Row>
            <MessageSquare className="size-4 shrink-0 text-teal" />
            <span className="truncate text-[12.5px] text-ink">"Thursday at 4 works"</span>
            <span className="ml-auto text-[11px] text-ink-faint">09:31</span>
          </Row>
          <Row>
            <Mail className="size-4 shrink-0 text-teal" />
            <span className="truncate text-[12.5px] text-ink">CMA sent · opened</span>
            <span className="ml-auto text-[11px] text-ink-faint">10:02</span>
          </Row>
        </div>
      </>
    ),
  },
  {
    id: "opportunities",
    word: "PIPELINE",
    kicker: "Pipelines",
    title: "Stages you actually use",
    body: "Custom stages, the full record on every card, and where deals stall.",
    chips: ["Custom stages", "Deal value", "Forecasting"],
    panel: (
      <>
        <p className="t-label text-ink-faint">Opportunities · Free home evaluation</p>
        <div className="mt-3 flex flex-1 flex-col justify-center gap-3.5">
          {[
            ["New lead", 248, 100],
            ["Engaged", 111, 45],
            ["Appointment", 64, 26],
            ["Signed", 18, 7],
          ].map(([s, n, pct]) => (
            <div key={s as string}>
              <div className="flex items-baseline justify-between text-[12px]">
                <span className="font-semibold text-ink">{s}</span>
                <span className="font-mono font-bold text-ink">{n}</span>
              </div>
              <span className="mt-1 block h-1.5 rounded-full bg-mist">
                <span className="block h-full rounded-full bg-teal" style={{ width: `${pct}%` }} />
              </span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "automation",
    word: "WORKFLOWS",
    kicker: "Workflows",
    title: "A trigger for every event",
    body: "A new lead, a missed call, a no-show. Each starts a sequence.",
    chips: ["Triggers", "6-attempt retry", "Smart Nurture"],
    panel: (
      <>
        <p className="t-label text-ink-faint">Automation · Speed to lead</p>
        <div className="mt-3 flex flex-1 flex-col justify-center gap-2.5">
          {[
            ["Trigger", "Form submitted", Workflow],
            ["Then", "Voice AI calls in 42s", PhoneCall],
            ["Then", "No answer · text + retry", MessageSquare],
            ["Then", "Book on the calendar", CalendarCheck],
          ].map(([label, text, Icon], i) => (
            <div key={text as string} className="flex items-center gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-mist">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(() => { const I = Icon as any; return <I className="size-3.5 text-teal" />; })()}
              </span>
              <span className="min-w-0 flex-1 rounded-lg border border-line px-3 py-2">
                <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-ink-faint">
                  {label as string}
                </span>
                <span className="block truncate text-[12.5px] font-semibold text-ink">{text as string}</span>
              </span>
              {i < 3 && <span aria-hidden="true" className="sr-only">then</span>}
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "presence",
    word: "PRESENCE",
    kicker: "Sites and reviews",
    title: "The front door, handled",
    body: "Sites and funnels from real estate templates. Reviews in your name.",
    chips: ["Funnels", "Landing pages", "Google reviews"],
    panel: (
      <>
        <p className="t-label text-ink-faint">Sites · Reputation</p>
        <div className="mt-3 flex flex-1 flex-col justify-center gap-2.5">
          <Row>
            <Globe className="size-4 shrink-0 text-teal" />
            <span className="truncate text-[12.5px] font-semibold text-ink">yourname.ca</span>
            <span className="ml-auto text-[11px] font-semibold text-teal">Published</span>
          </Row>
          <Row>
            <Inbox className="size-4 shrink-0 text-teal" />
            <span className="truncate text-[12.5px] text-ink">Home evaluation funnel</span>
            <span className="ml-auto text-[11px] text-ink-faint">46 leads</span>
          </Row>
          <div className="rounded-lg border border-line px-3 py-2.5">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-gold text-gold" aria-hidden="true" />
              ))}
              <span className="ml-2 text-[12px] font-bold text-ink">4.9</span>
              <span className="ml-auto text-[11px] text-ink-faint">28 new this month</span>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

export function Capabilities() {
  const rail = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = () => {
    const el = rail.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  };

  useEffect(() => {
    sync();
    const el = rail.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  /** Scroll by one card, measured from the first child so the gap is included. */
  const nudge = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="capabilities" className="overflow-hidden py-8 sm:py-10">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            align="left"
            title={
              <>
                One platform. <span className="grad-teal">Four ways to work it.</span>
              </>
            }
            lede="The modules behind the follow-up."
          />

          <div className="flex items-center gap-3">
            <button
              onClick={() => nudge(-1)}
              disabled={atStart}
              aria-label="Scroll to previous capability"
              className="grid size-11 place-items-center rounded-full border border-line bg-card transition enabled:hover:bg-sand disabled:opacity-35"
            >
              <ArrowLeft className="size-4 text-ink" aria-hidden="true" />
            </button>
            <button
              onClick={() => nudge(1)}
              disabled={atEnd}
              aria-label="Scroll to next capability"
              className="grid size-11 place-items-center rounded-full border border-line bg-card transition enabled:hover:bg-sand disabled:opacity-35"
            >
              <ArrowRight className="size-4 text-ink" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* The rail bleeds past the container so the next card is cut by the
          viewport edge rather than stopping short of it. */}
      <div
        ref={rail}
        tabIndex={0}
        aria-label="Capabilities, scroll horizontally"
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 px-[max(0.75rem,calc(50vw-44vw))] sm:px-[max(1.25rem,calc(50vw-38vw))] lg:px-[max(1.5rem,calc(50vw-35rem))]"
      >
        {CARDS.map((card) => (
          <article
            key={card.id}
            className="grid w-[86vw] shrink-0 snap-center items-stretch overflow-hidden rounded-[1.25rem] border border-line bg-card shadow-card sm:w-[76vw] lg:w-[70rem] lg:grid-cols-[0.92fr_1.08fr]"
          >
            <div className="flex flex-col justify-center p-8 sm:p-11">
              <p className="t-label text-ink-faint">FollowUpHub for</p>
              <p className="grad-teal mt-2 text-[2.7rem] font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-[3.6rem]">
                {card.word}
              </p>
              <p className="t-h3 mt-4 text-ink">{card.title}</p>
              <p className="t-body mt-2.5 max-w-[42ch] text-ink-soft">{card.body}</p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {card.chips.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-teal/25 bg-mist px-3 py-1.5 text-[12px] font-semibold text-teal"
                  >
                    {c}
                  </li>
                ))}
              </ul>

              <a
                href="/#pricing"
                className="mt-7 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-teal-ink px-6 text-[14px] font-bold text-cream transition-transform duration-200 hover:scale-[1.03]"
              >
                Built for {card.kicker.toLowerCase()}
              </a>
            </div>

            <Panel>{card.panel}</Panel>
          </article>
        ))}
      </div>
    </section>
  );
}
