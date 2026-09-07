import { motion } from "framer-motion";
import {
  ArrowLeft,
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
import { SectionHeading, cx } from "../components/ui";
import { IMG } from "../lib/assets";
import { scaleIn, viewport } from "../lib/motion";

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
  { icon: LayoutDashboard, label: "Agency Dashboard" },
  { icon: SlidersHorizontal, label: "SaaS Configurator" },
  { icon: Search, label: "Prospecting" },
  { icon: Users, label: "Sub-Accounts", active: true },
  { icon: Camera, label: "Account Snapshots" },
  { icon: Share2, label: "Reselling" },
  { icon: Package, label: "Add-Ons" },
];

const fields = [
  { label: "First Name", required: true, value: "John" },
  { label: "Last Name", required: true },
  { label: "Email", required: true },
  { label: "Business Name", required: true },
  { label: "Business Niche", select: true },
  { label: "Business Phone", required: true },
];

const topActions = [
  { icon: Megaphone, className: "bg-[#12b76a]" },
  { icon: Bell, className: "bg-[#f04438]" },
  { icon: CircleHelp, className: "bg-[#2e90fa]" },
];

export function Dashboard() {
  return (
    <section className="py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          kicker="One system"
          title="Every lead, every tool, working together in one place."
          lede="More than a CRM. FollowUpHub is the central hub where you build the systems your business needs to grow, with every product sharing the same contact record."
        />

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14"
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
                <div className="p-4 sm:p-6">
                  <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[#2563eb]">
                    <ArrowLeft className="size-3.5" />
                    Back to Map Search
                  </span>

                  <div className="mx-auto mt-4 max-w-md overflow-hidden rounded-lg border border-line bg-white">
                    <p className="border-b border-line px-4 py-3 text-[13px] font-bold text-ink">
                      Add Sub-Account
                    </p>
                    <div className="space-y-2.5 p-4">
                      {fields.map((f) => (
                        <div key={f.label}>
                          <p className="text-[10.5px] font-medium text-ink-soft">
                            {f.label}
                            {f.required && <span className="ml-0.5 text-[#dc2626]">*</span>}
                          </p>
                          <div
                            className={cx(
                              "mt-1 flex h-7 items-center rounded-md border px-2.5 text-[11px]",
                              f.value
                                ? "border-[#2563eb] text-ink"
                                : "border-line text-ink-faint",
                            )}
                          >
                            {f.value ?? (f.select ? "" : f.label)}
                            {f.select && (
                              <ChevronsUpDown className="ml-auto size-3 text-ink-faint" />
                            )}
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
