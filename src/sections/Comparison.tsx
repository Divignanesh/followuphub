import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { SectionHeading } from "../components/ui";
import { fadeUp, stagger, viewport } from "../lib/motion";

const rows = [
  ["AI voice calling with 6-attempt retry", "Usually an add-on, or missing", "Built in"],
  ["AI texting and WhatsApp follow-up", "Limited, or a third-party bolt-on", "Built in"],
  ["Pre-built real estate workflows", "Generic, or you build them yourself", "Ready out of the box"],
  ["Visual sales pipeline", "Basic or generic stages", "Real estate stages"],
  ["Agent websites and funnels", "Add-on or a separate tool", "Included"],
  ["Reputation management", "Rarely included", "Built in"],
  ["Invoicing and payments", "Usually separate", "Built in"],
  ["Pricing model", "Per seat, plus add-ons", "Flat monthly"],
];

export function Comparison() {
  return (
    <section id="compare" className="border-y border-line bg-sand py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          kicker="Side by side"
          title="FollowUpHub vs. a typical real estate CRM"
          lede="Agents most often arrive here from Follow Up Boss, Lofty, Bold Trail and CINC. This is what changes."
        />

        <motion.div
          variants={stagger(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mx-auto mt-12 max-w-4xl overflow-x-auto"
        >
          <table className="w-full min-w-[42rem] border-separate border-spacing-0 text-left">
            <caption className="sr-only">
              Feature comparison between FollowUpHub and other real estate CRMs
            </caption>
            <thead>
              <tr>
                {["Capability", "Other CRMs", "FollowUpHub"].map((h, i) => (
                  <th
                    key={h}
                    scope="col"
                    className={[
                      "border-b border-line bg-cream px-5 py-4 text-[11px] font-bold uppercase tracking-[0.14em]",
                      i === 0 ? "rounded-tl-2xl text-ink-soft" : "",
                      i === 1 ? "text-ink-soft" : "",
                      i === 2 ? "rounded-tr-2xl bg-teal text-cream" : "",
                    ].join(" ")}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([feature, other, ours], i) => {
                const last = i === rows.length - 1;
                return (
                  <motion.tr key={feature} variants={fadeUp}>
                    <th
                      scope="row"
                      className={`border-b border-line bg-cream px-5 py-4 text-[14.5px] font-semibold text-ink ${last ? "rounded-bl-2xl" : ""}`}
                    >
                      {feature}
                    </th>
                    <td className="border-b border-line bg-cream px-5 py-4 text-[13.5px] text-ink-soft">
                      <span className="inline-flex items-center gap-2">
                        <Minus className="size-3.5 shrink-0 text-ink-faint" aria-hidden="true" />
                        {other}
                      </span>
                    </td>
                    <td
                      className={`border-b border-teal/25 bg-mist px-5 py-4 text-[13.5px] font-bold text-teal ${last ? "rounded-br-2xl" : ""}`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <Check className="size-4 shrink-0" strokeWidth={3} aria-hidden="true" />
                        {ours}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
