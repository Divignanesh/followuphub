import { motion } from "framer-motion";
import { BarChart3, Sprout, Send, Boxes, type LucideIcon } from "lucide-react";
import { SectionHeading, cx } from "../components/ui";
import { fadeUp, scaleIn, springSoft, stagger, viewport } from "../lib/motion";

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
    body: "Get every lead and contact in one place, with your whole team working from the same system. FollowUpHub turns chaos into clarity so you can focus on delivering for clients.",
    rows: ["Dana Whitfield · New lead", "Marcus Okoye · Contacted", "Priya Shah · Showing"],
  },
  {
    icon: Send,
    step: "02",
    title: "Engage",
    body: "Follow up with the right leads at the right time. Personalised emails, texts and calls run automatically for every prospect, so you spend your hours on the hottest deals.",
    rows: ["Day 0 · AI call attempt", "Day 1 · Text follow-up", "Day 3 · Market email"],
  },
  {
    icon: Sprout,
    step: "03",
    title: "Grow",
    body: "Scale your marketing with social scheduling, email campaigns and client websites, all connected to the pipeline. Every lead source feeds the same system.",
    rows: ["Instagram · Scheduled", "Email blast · 1,240 sent", "Open house · 38 RSVPs"],
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Analyze",
    body: "See exactly where the business stands. Track agent performance, pipeline health and marketing return with reports that actually help you decide what to do next.",
    rows: ["Pipeline value · $12.4M", "Speed to lead · 42s", "Marketing ROI · 400%"],
  },
];

export function Workflow() {
  return (
    <section className="border-y border-line bg-sand py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          align="split"
          kicker="Great businesses don't just happen"
          title="You build them with flexible systems that scale as you grow."
          lede="Four stages, one platform. Each one feeds the next, so nothing falls between tools."
        />

        <motion.ol
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          {stages.map(({ icon: Icon, step, title, body, rows }) => (
            <motion.li
              key={title}
              variants={scaleIn}
              whileHover={{ y: -4 }}
              transition={springSoft}
              className="flex flex-col rounded-2xl border border-line bg-cream p-7 shadow-soft transition-shadow duration-300 hover:shadow-lift"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-teal text-white">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-mono text-[12px] font-bold text-ink-faint">{step}</span>
              </div>
              <h3 className="mt-5 text-[19px] font-extrabold tracking-[-0.02em] text-ink">{title}</h3>
              <p className="mt-2 flex-1 text-[14.5px] leading-[1.65] text-ink-soft">{body}</p>
              <motion.ul
                variants={stagger(0.05, 0.15)}
                className="mt-6 space-y-2 border-t border-line pt-5"
              >
                {rows.map((r) => (
                  <motion.li
                    key={r}
                    variants={fadeUp}
                    className={cx("flex items-start gap-2.5 text-[13px] leading-snug text-ink-soft")}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[7px] size-1.5 shrink-0 rounded-full bg-teal"
                    />
                    {r}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
