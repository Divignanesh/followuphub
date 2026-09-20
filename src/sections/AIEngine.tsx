import { motion } from "framer-motion";
import { CallPlayer } from "../components/CallPlayer";
import { RayField } from "../components/RayField";
import { Button } from "../components/ui";
import { fadeUp, stagger, viewport } from "../lib/motion";

/**
 * One two-column block, not three stacked ones.
 *
 * The call plays on the left and everything that explains it sits on the right:
 * the claim, the numbers, the rules it follows and the way in. Stacking those
 * as separate rows under the player is what made this section a screen and a
 * third tall.
 */
const capabilities = [
  ["Natural voice, not a script", "It hears the objection and answers it."],
  ["Six attempts, 10 AM to 9 PM", "Inside the windows you set, never outside them."],
  ["Sentiment on every reply", "Calls, texts and WhatsApp scored as they arrive."],
  ["Hand-off when they are ready", "A warm lead rings your phone, not a queue."],
];

const figures: [string, string][] = [
  ["42s", "Speed to lead"],
  ["6", "Attempts per lead"],
  ["24", "Nurture touchpoints"],
  ["80%", "Handled for you"],
];

export function AIEngine() {
  return (
    <section id="ai" className="relative overflow-hidden bg-teal-ink py-14 text-cream sm:py-16">
      <RayField />

      <div className="container-x relative grid items-center gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <CallPlayer />
        </motion.div>

        <motion.div
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.h2
            variants={fadeUp}
            className="t-h2 max-w-[18ch] text-cream"
          >
            Your AI agent works the leads you{" "}
            <span className="grad-cream">never get around to</span>.
          </motion.h2>

          <motion.p variants={fadeUp} className="t-body mt-4 max-w-[46ch] text-mist/80">
            It dials warm leads before you open your laptop, handles the first
            objection and books the appointment. It knows when to hand you the phone.
          </motion.p>

          <motion.dl
            variants={fadeUp}
            className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cream/12 sm:grid-cols-4"
          >
            {figures.map(([n, l]) => (
              <div key={l} className="bg-cream/[0.06] p-4 backdrop-blur-sm">
                <dt className="sr-only">{l}</dt>
                <dd className="font-mono text-[1.35rem] font-extrabold leading-none tracking-[-0.03em] text-cream">
                  {n}
                </dd>
                <p className="mt-1.5 text-[11.5px] leading-snug text-mist/65">{l}</p>
              </div>
            ))}
          </motion.dl>

          <motion.ul variants={fadeUp} className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {capabilities.map(([title, detail], i) => (
              <li key={title} className="flex gap-3">
                <span className="mt-0.5 font-mono text-[11px] font-bold text-mist/45">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-[14px] font-bold leading-snug text-cream">{title}</span>
                  <span className="mt-0.5 block text-[12.5px] leading-snug text-mist/65">{detail}</span>
                </span>
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-8">
            <Button href="/#pricing" size="lg" variant="cream" withArrow>
              Turn on the AI engine
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
