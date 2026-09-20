import { motion } from "framer-motion";
import { Building2, CalendarClock, Database, Home, User, Users } from "lucide-react";
import { IMG } from "../lib/assets";
import { SectionHeading } from "../components/ui";
import { fadeUp, scaleIn, stagger, viewport } from "../lib/motion";

/**
 * Who it is for, and what you actually run on it.
 *
 * The page previously spoke to one reader — a solo agent — and described the
 * product rather than the job. These are the three audiences the site already
 * evidences (its testimonials are agents, team leads and brokers) and the
 * plays that the features on this page add up to. Nothing here claims a
 * capability that is not already listed under What's included.
 */

const audiences = [
  {
    icon: User,
    who: "Solo agents",
    line: "You are the whole follow-up team.",
    body: "The AI answers and nurtures while you are in a showing, so a lead that comes in at 2pm is not a lead you remember at 9pm.",
  },
  {
    icon: Users,
    who: "Teams",
    line: "Nobody has to ask who called them.",
    body: "One pipeline, one conversation thread per lead, round-robin routing and a leaderboard that shows where deals actually stall.",
  },
  {
    icon: Building2,
    who: "Brokerages",
    line: "Every agent on the same system.",
    body: "Shared stages and reporting across the office, with speed-to-lead and marketing return measured per agent and per source.",
  },
];

const plays = [
  {
    icon: CalendarClock,
    title: "Cover the hours you are not working",
    body: "Calls after dinner, web enquiries before bed, weekend valuation requests. Six attempts inside 10 AM to 9 PM, then a nurture sequence.",
  },
  {
    icon: Database,
    title: "Reactivate a cold database",
    body: "Point the six-month Smart Nurture at contacts you wrote off. Old leads answer; the ones that reply arrive warm.",
  },
  {
    icon: Home,
    title: "Run the home-evaluation funnel",
    body: "The funnel ships pre-built. A valuation request triggers the call, the CMA and the booking without you wiring anything.",
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="border-y border-line bg-sand py-8 sm:py-10">
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* The people the product is for, not an abstraction of them. */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl border border-line shadow-lift">
              <img
                src={IMG.agent}
                alt="A real estate agent going through paperwork at a table with a couple"
                width={1200}
                height={960}
                loading="lazy"
                decoding="async"
                className="aspect-[5/4] w-full object-cover"
              />
            </div>

            {/* one figure lifted out of the picture and onto a card */}
            <motion.div
              variants={fadeUp}
              className="absolute -bottom-5 -right-2 max-w-[15rem] rounded-2xl border border-line bg-cream p-4 shadow-lift sm:-right-5"
            >
              <p className="font-mono text-[1.6rem] font-extrabold leading-none tracking-[-0.03em] text-teal">
                10+ hrs
              </p>
              <p className="t-meta mt-1.5 text-ink-soft">
                returned to the average team, every week.
              </p>
            </motion.div>
          </motion.div>

          <div>
            <SectionHeading
              align="left"
              title={
                <>
                  Built for how you actually <span className="grad-teal">work the phone</span>.
                </>
              }
              lede="The same system, whether follow-up is one person's job or forty people's."
            />

            <motion.ul
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="mt-9 space-y-3"
            >
              {audiences.map(({ icon: Icon, who, line, body }) => (
                <motion.li
                  key={who}
                  variants={fadeUp}
                  className="group flex gap-4 rounded-2xl border border-line bg-cream p-5 transition-shadow duration-300 hover:shadow-soft"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-mist text-teal transition-colors duration-500 group-hover:bg-teal group-hover:text-white">
                    <Icon className="size-[18px]" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="t-h4 text-ink">
                      {who} <span className="font-normal text-ink-soft">· {line}</span>
                    </p>
                    <p className="t-meta mt-1.5 text-ink-soft">{body}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>

        {/* the plays, underneath both */}
        <motion.ul
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid gap-4 md:grid-cols-3"
        >
          {plays.map(({ icon: Icon, title, body }) => (
            <motion.li
              key={title}
              variants={fadeUp}
              className="flex gap-4 rounded-2xl border border-line bg-card p-6"
            >
              <Icon className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden="true" />
              <div>
                <h3 className="t-h4 text-ink">{title}</h3>
                <p className="t-meta mt-2 text-ink-soft">{body}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
