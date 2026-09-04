import { motion } from "framer-motion";
import { BarChart3, Bell, Kanban, Megaphone, Search, Users, Wallet } from "lucide-react";
import { SectionHeading, cx } from "../components/ui";
import { EASE_OUT, scaleIn, stagger, viewport } from "../lib/motion";

const kpis = [
  { n: "248", label: "Total leads" },
  { n: "156", label: "Contacted" },
  { n: "64", label: "Showings" },
  { n: "28", label: "Offers" },
  { n: "18", label: "Closed deals" },
];

const columns: { title: string; tone: string; cards: string[] }[] = [
  { title: "New lead", tone: "bg-teal", cards: ["Dana Whitfield", "R. Chen"] },
  { title: "Contacted", tone: "bg-[#3c6e63]", cards: ["M. Okoye", "T. Bergeron"] },
  { title: "Showing", tone: "bg-clay", cards: ["S. Patel"] },
  { title: "Offer", tone: "bg-gold", cards: ["J. Nakamura"] },
  { title: "Closed", tone: "bg-teal-deep", cards: ["A. Dubois"] },
];

const leaderboard = [
  { pos: 1, name: "Sarah M.", deals: 6 },
  { pos: 2, name: "Kevin L.", deals: 5 },
  { pos: 3, name: "Amara O.", deals: 4 },
];

const sidebar = [Kanban, Users, Wallet, Megaphone, BarChart3];

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
            aria-label="FollowUpHub team dashboard showing 248 total leads, a five-stage pipeline and a team leaderboard"
            className="overflow-hidden rounded-2xl border border-line bg-card shadow-lift"
          >
            <div aria-hidden="true">
              {/* browser chrome */}
              <div className="flex h-11 items-center gap-3 border-b border-line bg-sand px-4">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#e5867d]" />
                  <span className="size-2.5 rounded-full bg-[#e8c07a]" />
                  <span className="size-2.5 rounded-full bg-[#8fc4a8]" />
                </div>
                <div className="mx-auto flex h-7 w-full max-w-sm items-center gap-2 rounded-md border border-line bg-cream px-2.5 font-mono text-[11px] text-ink-soft">
                  <Search className="size-3.5" />
                  app.followuphub.ai/prohome-realty/dashboard
                </div>
              </div>

              <div className="flex">
                {/* rail */}
                <aside className="hidden w-14 shrink-0 flex-col items-center gap-1.5 bg-teal-ink py-3 sm:flex">
                  {sidebar.map((Icon, i) => (
                    <span
                      key={i}
                      className={cx(
                        "flex size-9 items-center justify-center rounded-lg text-mist/60",
                        i === 0 && "bg-cream/12 text-cream",
                      )}
                    >
                      <Icon className="size-[18px]" />
                    </span>
                  ))}
                  <span className="mt-auto flex size-9 items-center justify-center rounded-lg text-mist/60">
                    <Bell className="size-[18px]" />
                  </span>
                </aside>

                <div className="min-w-0 flex-1 p-4 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-faint">
                        Prohome Realty
                      </p>
                      <p className="mt-0.5 text-[17px] font-extrabold text-ink">Team dashboard</p>
                    </div>
                    <span className="rounded-full bg-mist px-3 py-1 text-[11px] font-bold text-teal">
                      Cycle on track
                    </span>
                  </div>

                  {/* KPIs */}
                  <motion.dl
                    variants={stagger(0.06, 0.2)}
                    className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5"
                  >
                    {kpis.map((k) => (
                      <motion.div
                        key={k.label}
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
                        }}
                        className="rounded-xl border border-line bg-cream px-3.5 py-3"
                      >
                        <dd className="text-[22px] font-extrabold leading-none tracking-[-0.02em] text-ink">
                          {k.n}
                        </dd>
                        <dt className="mt-1.5 text-[11.5px] text-ink-soft">{k.label}</dt>
                      </motion.div>
                    ))}
                  </motion.dl>

                  <div className="mt-5 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
                    {/* pipeline */}
                    <div className="overflow-x-auto">
                      <motion.div
                        variants={stagger(0.07, 0.35)}
                        className="grid min-w-[34rem] grid-cols-5 gap-2.5"
                      >
                        {columns.map((col) => (
                          <motion.div
                            key={col.title}
                            variants={{
                              hidden: { opacity: 0, y: 12 },
                              show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
                            }}
                          >
                            <p className="flex items-center gap-1.5 px-0.5 text-[11px] font-bold text-ink-soft">
                              <span className={cx("size-1.5 rounded-full", col.tone)} />
                              {col.title}
                            </p>
                            <div className="mt-2 space-y-2">
                              {col.cards.map((c) => (
                                <div
                                  key={c}
                                  className="rounded-lg border border-line bg-cream px-2.5 py-2 text-[11.5px] font-semibold text-ink"
                                >
                                  {c}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>

                    {/* leaderboard */}
                    <div className="rounded-xl border border-line bg-cream p-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-faint">
                        Team leaderboard
                      </p>
                      <ol className="mt-3 space-y-2.5">
                        {leaderboard.map((l) => (
                          <li key={l.pos} className="flex items-center gap-3 text-[12.5px]">
                            <span className="flex size-6 items-center justify-center rounded-full bg-teal text-[11px] font-bold text-white">
                              {l.pos}
                            </span>
                            <span className="flex-1 font-semibold text-ink">{l.name}</span>
                            <span className="font-mono text-ink-soft">{l.deals} deals</span>
                          </li>
                        ))}
                      </ol>
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
