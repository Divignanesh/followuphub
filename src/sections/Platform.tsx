import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { CalendarCheck, LayoutGrid, Mail, Megaphone, MessageSquare, PhoneCall } from "lucide-react";
import { scaleIn, springSoft, stagger, viewport } from "../lib/motion";
import { SectionHeading } from "../components/ui";
import { LISTINGS } from "../lib/assets";

/**
 * Uneven bento, built on the 21st.dev "Feature Bento" layout
 * (@uilayout.contact): a `md:grid-cols-3` grid whose lead card spans
 * `col-span-2 row-span-2`, with stat tiles and smaller product cards filling
 * the rest. An even 2x2 gives every product the same weight; the pipeline is
 * what an agent looks at all day, so it gets the room.
 *
 * Rows are `minmax(300px,auto)` rather than a fixed height: a fixed row clips
 * the moment copy reflows at a narrower width.
 */

/* ------------------------------- lead card ------------------------------- */

/* A pipeline is a flow, so it is drawn as one: stages left to right, each
   feeding the next, with the count falling as leads move along it. */
const pipeline = [
  { stage: "New lead", n: 24, pct: 100, value: "$8.1M" },
  { stage: "Contacted", n: 15, pct: 63, value: "$5.2M" },
  { stage: "Showing", n: 10, pct: 42, value: "$3.4M" },
  { stage: "Offer", n: 5, pct: 21, value: "$1.7M" },
];

function PipelineCard() {
  const scope = useRef<HTMLElement>(null);

  /**
   * One orchestrated moment instead of a fade-up on every element.
   *
   * A pipeline is a sequence, so the stages arrive as a sequence: each step,
   * then its bar, then the chevron handing off to the next. GSAP drives it
   * because a timeline with a position parameter expresses "this follows that"
   * directly, which a pile of per-element viewport triggers cannot.
   *
   * Registered inside the hook: this site prerenders through an SSR entry, and
   * useGSAP runs in a layout effect, so nothing touches the DOM on the server.
   */
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { reduced } = ctx.conditions as { reduced: boolean; full: boolean };
          const steps = gsap.utils.toArray<HTMLElement>("[data-flow-step]");
          const bars = gsap.utils.toArray<HTMLElement>("[data-flow-bar]");
          const chevs = gsap.utils.toArray<HTMLElement>("[data-flow-chev]");
          const pct = (el: HTMLElement) => Number(el.dataset.pct ?? 100) / 100;

          // Both branches are written: reduced motion gets the resting state,
          // not a skipped animation that leaves bars at zero width.
          if (reduced) {
            gsap.set([...steps, ...chevs], { autoAlpha: 1, x: 0, y: 0 });
            bars.forEach((b) => gsap.set(b, { scaleX: pct(b), transformOrigin: "left center" }));
            return;
          }

          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: { trigger: scope.current, start: "top 78%", toggleActions: "play none none none" },
          });

          tl.from(steps, { autoAlpha: 0, y: 16, duration: 0.5, stagger: 0.12 })
            .fromTo(
              bars,
              { scaleX: 0, transformOrigin: "left center" },
              { scaleX: (_i, t) => pct(t as HTMLElement), duration: 0.75, stagger: 0.12 },
              "<0.1",
            )
            .from(chevs, { autoAlpha: 0, x: -8, duration: 0.4, stagger: 0.12 }, "<0.2");
        },
      );
    },
    { scope },
  );

  return (
    <motion.article
      ref={scope}
      variants={scaleIn}
      whileHover={{ y: -6 }}
      transition={springSoft}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-teal-deep p-6 text-cream shadow-teal sm:p-8 md:col-span-2 md:row-span-2"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-teal/35 blur-3xl transition-opacity duration-500 md:opacity-70 group-hover:opacity-100"
      />

      <div className="relative">
        <span className="flex size-11 items-center justify-center rounded-xl bg-cream/15 text-cream">
          <LayoutGrid className="size-5" aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-[1.7rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-cream sm:text-[2.2rem]">
          One pipeline your whole
          <br className="hidden sm:block" /> team can see.
        </h3>
        <p className="mt-3 max-w-md text-[15px] leading-[1.65] text-cream/80">
          Real estate stages and live team visibility. Every call writes back to the same record.
        </p>
      </div>

      {/* Rows, not columns. Four vertical columns leave most of a two-row tile
          empty once the leads thin out; four rows fill it and read the way a
          pipeline report actually does. The columns are labelled because a
          bare 24 next to a bare $8.1M is a number the reader has to guess at,
          and the raw percentage is gone: these are the leads sitting in each
          stage, not a conversion rate, and a percent sign invited the wrong
          reading. */}
      <ol className="relative mt-7 flex flex-1 flex-col justify-end gap-2.5" aria-hidden="true">
        <li className="grid grid-cols-[1fr_auto_auto] items-baseline gap-x-4 px-3.5 pb-0.5 sm:grid-cols-[8.5rem_1fr_auto_auto] sm:gap-x-5">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-cream/45">Stage</span>
          <span className="hidden sm:block" />
          <span className="w-12 text-right text-[10px] font-bold uppercase tracking-[0.14em] text-cream/45">
            Leads
          </span>
          <span className="w-14 text-right text-[10px] font-bold uppercase tracking-[0.14em] text-cream/45">
            Value
          </span>
        </li>

        {pipeline.map((p, i) => (
          <li
            key={p.stage}
            data-flow-step
            className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 gap-y-2.5 rounded-xl bg-cream/[0.07] p-3.5 ring-1 ring-cream/12 transition-colors duration-500 group-hover:bg-cream/[0.11] sm:grid-cols-[8.5rem_1fr_auto_auto] sm:gap-x-5"
            style={{ transitionDelay: `${i * 55}ms` }}
          >
            <span className="truncate text-[12.5px] font-bold uppercase tracking-[0.06em] text-cream/75">
              {p.stage}
            </span>

            <span className="col-span-3 order-last h-1.5 overflow-hidden rounded-full bg-cream/12 sm:order-none sm:col-span-1">
              <span
                data-flow-bar
                data-pct={p.pct}
                className="block h-full w-full rounded-full bg-cream/80"
              />
            </span>

            <span className="w-12 text-right font-mono text-[20px] font-extrabold leading-none text-cream">
              {p.n}
            </span>

            <span className="w-14 text-right font-mono text-[13px] font-bold text-cream/80">
              {p.value}
            </span>
          </li>
        ))}

        <li className="mt-1 flex items-baseline justify-between px-1">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.1em] text-cream/50">
            Open pipeline
          </span>
          <span className="font-mono text-[13px] font-bold text-cream">$18.4M</span>
        </li>
      </ol>
    </motion.article>
  );
}

/* ------------------------------ product tiles ---------------------------- */

const channels = [
  { icon: PhoneCall, label: "Voice calls", n: 148 },
  { icon: MessageSquare, label: "SMS and WhatsApp", n: 508 },
  { icon: CalendarCheck, label: "Appointments booked", n: 31 },
];

function ChannelsCard() {
  return (
    <motion.article
      variants={scaleIn}
      whileHover={{ y: -6 }}
      transition={springSoft}
      className="group flex flex-col justify-between rounded-2xl border border-line bg-cream p-6 shadow-soft transition-shadow duration-300 hover:shadow-lift"
    >
      <div>
        <span className="flex size-10 items-center justify-center rounded-xl bg-teal text-white transition-transform duration-500 group-hover:scale-105">
          <PhoneCall className="size-[18px]" aria-hidden="true" />
        </span>
        <h3 className="mt-4 t-h3 text-ink">
          AI calling, texting and WhatsApp
        </h3>
        <p className="mt-2 text-[13.5px] leading-[1.6] text-ink-soft">
          Around the clock, with a hand-off the moment a lead is ready.
        </p>
      </div>

      <ul className="mt-5 divide-y divide-line border-t border-line" aria-hidden="true">
        {channels.map(({ icon: Icon, label, n }) => (
          <li key={label} className="flex items-center justify-between gap-3 py-2.5">
            <span className="flex min-w-0 items-center gap-2 text-[13px] text-ink">
              <Icon className="size-3.5 shrink-0 text-teal" />
              <span className="truncate">{label}</span>
            </span>
            <span className="shrink-0 font-mono text-[13.5px] font-bold text-ink">{n}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

function CampaignCard() {
  const [lead, ...rest] = LISTINGS;
  return (
    <motion.article
      variants={scaleIn}
      whileHover={{ y: -6 }}
      transition={springSoft}
      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-cream p-5 shadow-soft transition-shadow duration-300 hover:shadow-lift"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="t-h3 text-ink">
            Marketing automation
          </h3>
          <p className="mt-2 text-[13.5px] leading-[1.6] text-ink-soft">
            Scheduling and campaigns from one dashboard, attributed to the pipeline.
          </p>
        </div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal text-white transition-transform duration-500 group-hover:scale-105">
          <Megaphone className="size-[18px]" aria-hidden="true" />
        </span>
      </div>

      {/* A listing reel is a listing. Showing the post rather than naming it
          is what makes the tile read as the product. */}
      <figure className="mt-5 overflow-hidden rounded-xl border border-line bg-card" aria-hidden="true">
        <div className="flex items-center gap-2 border-b border-line px-3 py-2">
          <span className="flex size-5 items-center justify-center rounded-full bg-mist font-mono text-[9px] font-bold text-teal">
            Mon
          </span>
          <span className="truncate text-[12px] font-bold text-ink">Listing reel</span>
          <span className="ml-auto flex items-center gap-1 text-[10.5px] font-semibold text-teal">
            <CalendarCheck className="size-3" />
            Scheduled
          </span>
        </div>
        <div className="flex gap-1 p-1.5">
          <img
            src={lead.src}
            alt=""
            width={640}
            height={480}
            loading="lazy"
            decoding="async"
            className="h-20 flex-[1.6] rounded-lg object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="flex flex-1 flex-col gap-1">
            {rest.slice(0, 2).map((l) => (
              <img
                key={l.src}
                src={l.src}
                alt=""
                width={640}
                height={480}
                loading="lazy"
                decoding="async"
                className="h-[38px] w-full rounded-md object-cover"
              />
            ))}
          </div>
        </div>
      </figure>

      <p className="mt-3 flex items-center gap-2 text-[12px] font-semibold text-ink-soft">
        <Mail className="size-3.5 text-teal" aria-hidden="true" />
        Wed · email blast · 1,240 sent
      </p>
    </motion.article>
  );
}

/* -------------------------------- stat tiles ----------------------------- */

/**
 * A number and two lines of label leaves most of a tile empty, which is what
 * made this grid feel thin. Each stat now carries a small drawing of the thing
 * it measures, and the palette is down to three treatments — paper, mint and
 * one teal accent — so the row reads as a set rather than five ideas.
 */
type Tone = "teal" | "mint" | "paper";

function StatCard({
  value,
  label,
  note,
  tone,
  visual,
}: {
  value: string;
  label: string;
  note: string;
  tone: Tone;
  visual: React.ReactNode;
}) {
  const skin =
    tone === "teal"
      ? "bg-teal text-white"
      : tone === "mint"
        ? "border border-line bg-mist text-ink"
        : "border border-line bg-cream text-ink";

  return (
    <motion.article
      variants={scaleIn}
      whileHover={{ y: -6 }}
      transition={springSoft}
      className={`group relative flex flex-col overflow-hidden rounded-2xl p-5 sm:p-6 ${skin}`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -right-12 -top-12 size-40 rounded-full blur-3xl transition-opacity duration-500 ${
          tone === "teal" ? "bg-white/20 opacity-70 group-hover:opacity-100" : "bg-teal/10 opacity-0 group-hover:opacity-100"
        }`}
      />
      <div className="relative">
        <p
          className={`font-mono text-[2.4rem] font-extrabold leading-none tracking-[-0.04em] sm:text-[2.8rem] ${
            tone === "teal" ? "" : "text-teal"
          }`}
        >
          {value}
        </p>
        <p className={`t-label mt-2.5 ${tone === "teal" ? "text-white/85" : "text-ink"}`}>{label}</p>
      </div>

      <div aria-hidden="true" className="relative mt-6 flex flex-1 items-center">{visual}</div>

      <p className={`relative mt-5 t-meta ${tone === "teal" ? "text-white/80" : "text-ink-soft"}`}>{note}</p>
    </motion.article>
  );
}

/** Speed to lead: a dial that is nearly closed, because 42s is nearly instant. */
function Dial() {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 64 64" className="size-20">
      <circle cx="32" cy="32" r={r} fill="none" stroke="currentColor" strokeWidth="6" className="text-teal/15" />
      <motion.circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        className="text-teal"
        transform="rotate(-90 32 32)"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        whileInView={{ strokeDashoffset: c * 0.08 }}
        viewport={viewport}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

/** Marketing ROI: spend in, four times back out. */
function Bars() {
  return (
    <div className="flex h-20 w-full items-end gap-2">
      {[22, 38, 62, 100].map((h, i) => (
        <motion.span
          key={h}
          className="flex-1 rounded-t-sm bg-white/35 last:bg-white"
          initial={{ height: 4 }}
          whileInView={{ height: `${h}%` }}
          viewport={viewport}
          transition={{ duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
}

/** Handled for you: four fifths of the row filled in. */
function Blocks() {
  return (
    <div className="grid w-full grid-cols-5 gap-1.5">
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.span
          key={i}
          className={`h-8 rounded ${i < 8 ? "bg-teal" : "bg-teal/15"}`}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{ duration: 0.35, delay: i * 0.04 }}
        />
      ))}
    </div>
  );
}

/* --------------------------------- section -------------------------------- */

export function Platform() {
  return (
    <section id="platform" className="border-y border-line bg-sand py-8 sm:py-10">
      <div className="container-x">
        <SectionHeading
          title="Everything an agent needs, in one subscription."
          lede="Not a bundle. Every part writes to the same contact record, so nothing is ever re-entered."
        />

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-11 grid gap-4 md:grid-cols-3 md:auto-rows-[minmax(268px,auto)]"
        >
          <PipelineCard />
          <ChannelsCard />
          <StatCard
            tone="mint"
            value="42s"
            label="Speed to lead"
            note="The industry average first reply is over five hours."
            visual={<Dial />}
          />
          <CampaignCard />
          <StatCard
            tone="teal"
            value="400%"
            label="Marketing ROI"
            note="On paid leads, once follow-up runs automatically."
            visual={<Bars />}
          />
          <StatCard
            tone="paper"
            value="80%"
            label="Handled for you"
            note="Of all follow-ups, without an agent touching them."
            visual={<Blocks />}
          />
        </motion.div>
      </div>
    </section>
  );
}
