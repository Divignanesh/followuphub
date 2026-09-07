import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  Bell,
  Camera,
  ChevronsUpDown,
  CircleHelp,
  LayoutDashboard,
  Megaphone,
  MousePointerClick,
  Package,
  Rocket,
  Search,
  Settings,
  Share2,
  Sparkle,
  Sparkles,
  SlidersHorizontal,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useRef } from "react";
import { SectionHeading, cx } from "../components/ui";
import { IMG } from "../lib/assets";

/**
 * A faithful rendering of the FollowUpHub application shell: the same
 * navigation, the same order, the same top-bar controls. Drawn rather than
 * screenshotted so it stays legible at this size and survives a redesign of
 * the app, but nothing here is invented — every label is a real destination.
 */
const nav: { icon: LucideIcon; label: string; badge?: string; active?: boolean }[] = [
  { icon: Rocket, label: "Get Free AI" },
  { icon: Sparkles, label: "AI Suite", badge: "New" },
  { icon: Sparkle, label: "Ask AI" },
  { icon: MousePointerClick, label: "Launchpad" },
  { icon: LayoutDashboard, label: "Agency Dashboard", active: true },
  { icon: SlidersHorizontal, label: "SaaS Configurator" },
  { icon: Search, label: "Prospecting" },
  { icon: Users, label: "Sub-Accounts" },
  { icon: Camera, label: "Account Snapshots" },
  { icon: Share2, label: "Reselling" },
  { icon: Package, label: "Add-Ons" },
];

const summary = [
  { n: "248", label: "Leads" },
  { n: "156", label: "Contacted" },
  { n: "64", label: "Showings" },
  { n: "18", label: "Closed" },
];

const board: { stage: string; dot: string; cards: string[] }[] = [
  { stage: "New lead", dot: "bg-[#2e90fa]", cards: ["Dana Whitfield", "R. Chen"] },
  { stage: "Contacted", dot: "bg-teal", cards: ["M. Okoye", "T. Bergeron"] },
  { stage: "Showing", dot: "bg-[#e0a82e]", cards: ["S. Patel"] },
  { stage: "Offer", dot: "bg-[#f04438]", cards: ["J. Nakamura"] },
  { stage: "Closed", dot: "bg-[#12b76a]", cards: ["A. Dubois"] },
];

const topActions = [
  { icon: Megaphone, className: "bg-[#12b76a]" },
  { icon: Bell, className: "bg-[#f04438]" },
  { icon: CircleHelp, className: "bg-[#2e90fa]" },
];

export function Dashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // The app grows into place as the section arrives, rather than appearing at
  // full size. Scale and offset only: it never animates opacity, so a stalled
  // animation frame can leave it small but never invisible.
  //
  // Mapped straight off scroll position rather than through a spring: the
  // motion tracks the scrollbar exactly, and it is guaranteed to reach full
  // size instead of easing towards it and stopping short. It only ever scales
  // up to 1, so it cannot overflow the page.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [36, 0]);

  return (
    <section className="py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          kicker="One system"
          title="Every lead, every tool, working together in one place."
          lede="More than a CRM. FollowUpHub is the central hub where you build the systems your business needs to grow, with every product sharing the same contact record."
        />

        <motion.div
          ref={ref}
          style={reduce ? undefined : { scale, y }}
          className="mt-14 origin-top will-change-transform"
        >
          <div
            role="img"
            aria-label="The FollowUpHub application, showing its sidebar of tools from Get Free AI and AI Suite through Sub-Accounts, Reselling and Add-Ons, with a new sub-account being created"
            className="overflow-hidden rounded-2xl border border-line bg-white shadow-lift"
          >
            <div aria-hidden="true" className="flex min-h-[26rem]">
              {/* ---------------- sidebar ---------------- */}
              <aside className="hidden w-[13.5rem] shrink-0 flex-col bg-[#0d3b2d] py-4 sm:flex">
                <img
                  src={IMG.logoLight}
                  alt=""
                  width={701}
                  height={153}
                  loading="lazy"
                  decoding="async"
                  className="mx-4 h-6 w-auto self-start"
                />

                {/* account switcher */}
                <div className="mx-3 mt-4 flex items-center gap-2 rounded-lg bg-white/10 px-2.5 py-2 ring-1 ring-white/15">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <MousePointerClick className="size-3 text-white/80" />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[11.5px] font-semibold text-white">
                    Click here to select
                  </span>
                  <ChevronsUpDown className="size-3 shrink-0 text-white/60" />
                </div>

                <nav className="mt-3 flex-1 space-y-0.5 px-2">
                  {nav.map(({ icon: Icon, label, badge, active }) => (
                    <span
                      key={label}
                      className={cx(
                        "relative flex items-center gap-2.5 rounded-md px-2 py-[7px]",
                        active ? "bg-white/10" : "",
                      )}
                    >
                      <Icon className="size-3.5 shrink-0 text-white/70" />
                      <span className="min-w-0 flex-1 truncate text-[11.5px] text-white/90">
                        {label}
                      </span>
                      {badge && (
                        <span className="rounded bg-[#e0a82e] px-1 py-px text-[9px] font-bold text-[#3b2a06]">
                          {badge}
                        </span>
                      )}
                      {active && (
                        <span className="absolute -right-2 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-l bg-[#4ade80]" />
                      )}
                    </span>
                  ))}
                </nav>

                <span className="mt-2 flex items-center gap-2.5 px-4 py-2">
                  <Settings className="size-3.5 text-white/70" />
                  <span className="text-[11.5px] text-white/90">Settings</span>
                </span>
              </aside>

              {/* ---------------- main ---------------- */}
              <div className="min-w-0 flex-1 bg-[#fbfaf7]">
                {/* top bar */}
                <div className="flex h-12 items-center justify-end gap-2 border-b border-line/70 bg-[#f5efe6] px-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11.5px] font-semibold text-ink shadow-sm ring-1 ring-black/5">
                    <Sparkle className="size-3 text-teal" />
                    Ask AI
                  </span>
                  {topActions.map(({ icon: Icon, className }, i) => (
                    <span
                      key={i}
                      className={cx(
                        "flex size-7 items-center justify-center rounded-full text-white",
                        className,
                      )}
                    >
                      <Icon className="size-3.5" />
                    </span>
                  ))}
                  <span className="size-7 rounded-full bg-[#1f2937]" />
                </div>

                {/* content */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] font-bold text-ink">Dashboard</p>
                    <span className="rounded-md border border-line bg-white px-2 py-1 text-[10.5px] font-medium text-ink-soft">
                      This month
                    </span>
                  </div>

                  <dl className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {summary.map((s) => (
                      <div key={s.label} className="rounded-lg border border-line bg-white px-3 py-2.5">
                        <dd className="text-[19px] font-extrabold leading-none tracking-[-0.02em] text-ink">
                          {s.n}
                        </dd>
                        <dt className="mt-1 text-[10.5px] text-ink-soft">{s.label}</dt>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-3 overflow-x-auto">
                    <div className="grid min-w-[30rem] grid-cols-5 gap-2">
                      {board.map((col) => (
                        <div key={col.stage}>
                          <p className="flex items-center gap-1.5 px-0.5 text-[10px] font-bold text-ink-soft">
                            <span className={cx("size-1.5 rounded-full", col.dot)} />
                            {col.stage}
                          </p>
                          <div className="mt-1.5 space-y-1.5">
                            {col.cards.map((c) => (
                              <div
                                key={c}
                                className="rounded-md border border-line bg-white px-2 py-1.5 text-[10.5px] font-semibold text-ink"
                              >
                                {c}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
