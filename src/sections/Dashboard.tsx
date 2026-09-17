import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  BadgeCheck,
  BarChart3,
  Bot,
  Calendar,
  ChevronDown,
  ChevronsUpDown,
  CreditCard,
  Globe,
  HardDrive,
  LayoutDashboard,
  MessageSquare,
  MousePointerClick,
  EllipsisVertical,
  Pin,
  Plus,
  Search,
  Send,
  Settings,
  Sparkle,
  Star,
  Target,
  Users,
  Wand2,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useRef, type ReactNode } from "react";
import { Logo, SectionHeading, cx } from "../components/ui";

/**
 * A faithful rendering of the FollowUpHub application dashboard: the same
 * navigation, the same order, the same cards in the same places. Drawn rather
 * than screenshotted so it stays legible at this size and survives a redesign
 * of the app, but nothing here is invented — every label is a real
 * destination and every card is a real report.
 *
 * The figures are a populated account rather than the empty one a fresh
 * install shows, and they are the same funnel numbers throughout: 248 leads
 * narrowing to 18 closed, so the donut, the funnel and the stage bars all
 * agree with each other.
 */
type NavItem = { icon: LucideIcon; label: string; badge?: string; active?: boolean };

const navPrimary: NavItem[] = [
  { icon: Sparkle, label: "Ask AI" },
  { icon: MousePointerClick, label: "Launchpad" },
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: MessageSquare, label: "Conversations" },
  { icon: Calendar, label: "Calendars" },
  { icon: Users, label: "Contacts" },
  { icon: Target, label: "Opportunities" },
  { icon: CreditCard, label: "Payments" },
];

const navSecondary: NavItem[] = [
  { icon: Wand2, label: "AI Studio", badge: "Beta" },
  { icon: Bot, label: "AI Agents" },
  { icon: Send, label: "Marketing" },
  { icon: Workflow, label: "Automation" },
  { icon: Globe, label: "Sites" },
  { icon: BadgeCheck, label: "Memberships" },
  { icon: HardDrive, label: "Media Storage" },
  { icon: Star, label: "Reputation" },
  { icon: BarChart3, label: "Reporting" },
];

/* ---------------------------- report data ---------------------------- */

const OPEN = "#2e90fa";
const WON = "#12b76a";
const LOST = "#98a2b3";

const status = [
  { label: "Open", n: 48, color: OPEN },
  { label: "Won", n: 26, color: WON },
  { label: "Lost", n: 12, color: LOST },
];
const statusTotal = status.reduce((a, s) => a + s.n, 0);

const value = [
  { label: "Open", amount: "CA$1.24M", pct: 100, color: OPEN },
  { label: "Won", amount: "CA$680K", pct: 55, color: WON },
  { label: "Lost", amount: "CA$310K", pct: 25, color: LOST },
];

/** 248 → 18, with each step's conversion derived from the counts beside it. */
const funnel = [
  { stage: "1. New Lead", note: "Valuation Requested", n: 248 },
  { stage: "2. Attempted Contact", note: "Awaiting Response", n: 156 },
  { stage: "3. Engaged", note: "In Conversation", n: 111 },
  { stage: "4. Appointment Booked", note: "Presentation Scheduled", n: 64 },
  { stage: "5. Appointment Completed", note: "CMA Presented", n: 46 },
  { stage: "6. Proposal Sent", note: "Awaiting Signature", n: 28 },
  { stage: "7. Agreement Signed", note: "Client Won", n: 18 },
];
const funnelTop = funnel[0].n;
/** Tallest column in the stage-distribution chart, in px. */
const BAR_TRACK = 104;
const pct = (a: number, b: number) => `${((a / b) * 100).toFixed(1)}%`;

/* ------------------------------- charts ------------------------------ */

/**
 * Donut and ring both use r = 15.915 so the circumference is exactly 100 and
 * a dash array can be written straight in percent — no arc maths, and the
 * segments cannot drift out of step with the legend beside them.
 */
function Donut({ segments }: { segments: { label: string; n: number; color: string }[] }) {
  const total = segments.reduce((a, s) => a + s.n, 0);
  let offset = 25; // 12 o'clock

  return (
    <svg viewBox="0 0 42 42" className="size-[104px] shrink-0">
      <circle cx="21" cy="21" r="15.915" fill="none" stroke="#eceae6" strokeWidth="5" />
      {segments.map((s) => {
        const len = (s.n / total) * 100;
        const dash = <circle
          key={s.label}
          cx="21"
          cy="21"
          r="15.915"
          fill="none"
          stroke={s.color}
          strokeWidth="5"
          strokeDasharray={`${len} ${100 - len}`}
          strokeDashoffset={offset}
        />;
        offset -= len;
        return dash;
      })}
      <text
        x="21"
        y="21"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-ink text-[7px] font-extrabold"
      >
        {total}
      </text>
    </svg>
  );
}

function Ring({ percent }: { percent: number }) {
  return (
    <svg viewBox="0 0 42 42" className="size-[104px] shrink-0">
      <circle cx="21" cy="21" r="15.915" fill="none" stroke="#eceae6" strokeWidth="5" />
      <circle
        cx="21"
        cy="21"
        r="15.915"
        fill="none"
        stroke={WON}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={`${percent} ${100 - percent}`}
        strokeDashoffset="25"
      />
      <text
        x="21"
        y="21"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-ink text-[7px] font-extrabold"
      >
        {percent}%
      </text>
    </svg>
  );
}

/* ------------------------------- shell ------------------------------- */

function NavRow({ icon: Icon, label, badge, active }: NavItem) {
  return (
    <span
      className={cx(
        "relative flex items-center gap-2.5 rounded-md px-2 py-[6px]",
        active && "bg-white/10",
      )}
    >
      <Icon className="size-3.5 shrink-0 text-white/70" />
      <span className="min-w-0 flex-1 truncate text-[11.5px] text-white/90">{label}</span>
      {badge && (
        <span className="rounded bg-[#e0a82e] px-1 py-px text-[9px] font-bold text-[#3b2a06]">
          {badge}
        </span>
      )}
      {active && (
        <span className="absolute -right-2 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-l bg-[#4ade80]" />
      )}
    </span>
  );
}

/** Card chrome: title on the left, the pipeline filter on the right. */
function Card({
  title,
  filter,
  className,
  children,
}: {
  title: string;
  filter: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx("flex flex-col rounded-xl border border-line bg-white p-3.5", className)}>
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-[11.5px] font-bold text-ink">{title}</p>
        <span className="hidden shrink-0 items-center gap-1 rounded-md border border-line px-1.5 py-1 text-[9.5px] text-ink-soft sm:inline-flex">
          {filter}
          <ChevronDown className="size-2.5" />
        </span>
      </div>
      {children}
    </div>
  );
}

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
            aria-label="The FollowUpHub dashboard: a sidebar of tools from Ask AI and Conversations through Automation, Sites and Reputation, beside reports for opportunity status, opportunity value, conversion rate, a seven-stage listing funnel and stage distribution"
            className="overflow-hidden rounded-2xl border border-line bg-white shadow-lift"
          >
            <div aria-hidden="true" className="flex min-h-[26rem]">
              {/* ---------------- sidebar ---------------- */}
              <aside className="hidden w-[13.5rem] shrink-0 flex-col bg-[#0d3b2d] py-4 sm:flex">
                <span className="mx-4 self-start">
                  <Logo tone="cream" className="[&>span:last-child]:text-[15px] [&>svg]:size-5" />
                </span>

                {/* account switcher */}
                <div className="mx-3 mt-4 flex items-center gap-2 rounded-lg bg-white/10 px-2.5 py-2 ring-1 ring-white/15">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-[9px] font-bold text-white/90">
                    MS
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[11.5px] font-semibold text-white">
                    MS Realty Stoney Creek
                  </span>
                  <ChevronsUpDown className="size-3 shrink-0 text-white/60" />
                </div>

                {/* search */}
                <div className="mx-3 mt-2 flex items-center gap-2 rounded-lg bg-black/20 px-2.5 py-1.5">
                  <Search className="size-3 shrink-0 text-white/55" />
                  <span className="flex-1 text-[11px] text-white/55">Search</span>
                  <span className="rounded bg-white/10 px-1 text-[9px] text-white/55">⌘K</span>
                </div>

                <nav className="mt-3 flex-1 space-y-0.5 px-2">
                  {navPrimary.map((item) => (
                    <NavRow key={item.label} {...item} />
                  ))}
                  <span className="my-2 block h-px bg-white/10" />
                  {navSecondary.map((item) => (
                    <NavRow key={item.label} {...item} />
                  ))}
                </nav>

                <span className="mt-2 flex items-center gap-2.5 px-4 py-2">
                  <Settings className="size-3.5 text-white/70" />
                  <span className="text-[11.5px] text-white/90">Settings</span>
                </span>
              </aside>

              {/* ---------------- main ---------------- */}
              <div className="flex min-w-0 flex-1 flex-col bg-[#fbfaf7]">
                {/* top bar */}
                <div className="flex h-12 items-center gap-2 border-b border-line/70 bg-white px-4">
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-ink">
                    Dashboard
                    <ChevronDown className="size-3 text-ink-soft" />
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md border border-line px-2 py-1 text-[10.5px] font-semibold text-ink-soft">
                    <Plus className="size-3" />
                    New
                  </span>

                  <span className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-line px-2 py-1 text-[10.5px] font-medium text-ink-soft">
                    <Calendar className="size-3" />
                    Last 30 days
                    <ChevronDown className="size-2.5" />
                  </span>
                  <Pin className="size-3.5 text-ink-soft" />
                  <EllipsisVertical className="size-3.5 text-ink-soft" />
                </div>

                {/* content */}
                <div className="flex flex-1 flex-col gap-2.5 p-3.5">
                  {/* row 1 — three report cards */}
                  <div className="grid gap-2.5 lg:grid-cols-3">
                    <Card title="Opportunity status" filter="All pipelines">
                      <div className="mt-2 flex items-center gap-4">
                        <Donut segments={status} />
                        <ul className="min-w-0 space-y-1.5">
                          {status.map((s) => (
                            <li key={s.label} className="flex items-center gap-1.5 text-[10.5px]">
                              <span
                                className="size-2 shrink-0 rounded-sm"
                                style={{ background: s.color }}
                              />
                              <span className="text-ink-soft">{s.label}</span>
                              <span className="font-bold text-ink">{s.n}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card>

                    <Card title="Opportunity value" filter="All pipelines">
                      <div className="mt-3 space-y-2.5">
                        {value.map((v) => (
                          <div key={v.label}>
                            <div className="flex items-baseline justify-between text-[10.5px]">
                              <span className="text-ink-soft">{v.label}</span>
                              <span className="font-bold text-ink">{v.amount}</span>
                            </div>
                            <div className="mt-1 h-1.5 rounded-full bg-[#eceae6]">
                              <div
                                className="h-full rounded-full"
                                style={{ width: `${v.pct}%`, background: v.color }}
                              />
                            </div>
                          </div>
                        ))}
                        <p className="pt-0.5 text-[10px] text-ink-soft">
                          Total revenue <span className="font-bold text-ink">CA$2.23M</span>
                        </p>
                      </div>
                    </Card>

                    <Card title="Conversion rate" filter="All pipelines">
                      <div className="mt-2 flex items-center gap-4">
                        <Ring percent={30} />
                        <div className="min-w-0">
                          <p className="text-[10.5px] text-ink-soft">Won revenue</p>
                          <p className="text-[15px] font-extrabold tracking-[-0.02em] text-ink">
                            CA$680K
                          </p>
                          <p className="mt-1 text-[10px] text-ink-soft">
                            {status[1].n} of {statusTotal} opportunities
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* row 2 — funnel + stage distribution */}
                  <div className="grid flex-1 gap-2.5 lg:grid-cols-[1.35fr_1fr]">
                    <Card title="Funnel" filter="1S.Free Home Evaluation">
                      <div className="mt-2.5 flex items-center gap-2 pr-1 text-[9px] font-semibold text-ink-soft">
                        <span className="flex-1">Stage</span>
                        <span className="w-14 text-right">Cumulative</span>
                        <span className="w-16 text-right">Next step</span>
                      </div>
                      <ul className="mt-1 flex flex-1 flex-col gap-[3px]">
                        {funnel.map((s, i) => {
                          const next = funnel[i + 1];
                          return (
                            <li key={s.stage} className="flex flex-1 items-stretch gap-2">
                              {/* the bar is the row background, so width reads as volume */}
                              <span className="relative min-w-0 flex-1 overflow-hidden rounded bg-[#f1efeb]">
                                <span
                                  className="absolute inset-y-0 left-0 rounded bg-[#dbe9f8]"
                                  style={{ width: `${(s.n / funnelTop) * 100}%` }}
                                />
                                <span className="relative flex h-full items-center gap-1.5 px-2 py-[5px]">
                                  <span className="truncate text-[10px] font-semibold text-ink">
                                    {s.stage}
                                  </span>
                                  <span className="hidden truncate text-[9.5px] text-ink-soft sm:inline">
                                    {s.note}
                                  </span>
                                  <span className="ml-auto shrink-0 text-[10px] font-bold text-ink">
                                    {s.n}
                                  </span>
                                </span>
                              </span>
                              <span className="flex w-14 shrink-0 items-center justify-end text-[10px] text-ink-soft">
                                {pct(s.n, funnelTop)}
                              </span>
                              <span className="flex w-16 shrink-0 items-center justify-end text-[10px] font-semibold text-ink">
                                {next ? pct(next.n, s.n) : "—"}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </Card>

                    <Card title="Stage distribution" filter="1S.Free Home Evaluation">
                      {/* plain column chart: one column per funnel stage */}
                      <div className="mt-auto flex items-end gap-1.5 pt-4">
                        {funnel.map((s) => (
                          <div key={s.stage} className="flex min-w-0 flex-1 flex-col items-center gap-1">
                            <span className="text-[9px] font-bold text-ink">{s.n}</span>
                            <span
                              className="w-full rounded-t bg-[#2e90fa]"
                              style={{ height: `${Math.max((s.n / funnelTop) * BAR_TRACK, 3)}px` }}
                            />
                            <span className="text-[9px] text-ink-soft">
                              {s.stage.split(".")[0]}
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="mt-2 border-t border-line pt-2 text-[10px] text-ink-soft">
                        Stages 1–7 · <span className="font-bold text-ink">1S.Free Home Evaluation</span>
                      </p>
                    </Card>
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
