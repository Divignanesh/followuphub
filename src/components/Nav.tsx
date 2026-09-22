import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { EASE_OUT } from "../lib/motion";
import { SITE } from "../lib/seo";
import { Button, Logo, PillCta, cx } from "./ui";

const links = [
  { label: "Platform", href: "/#platform" },
  { label: "AI engine", href: "/#ai" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Compare", href: "/#compare" },
  { label: "FAQ", href: "/#faq" },
];

/**
 * A floating pill, detached from the top edge, cream on every ground.
 *
 * The bar used to be transparent over the hero and letter itself in cream,
 * then swap to a dark-on-cream solid once the page moved. That meant the
 * masthead changed its entire treatment within the first wheel notch, and the
 * logo swapped files while doing it. Holding one treatment throughout costs
 * nothing and removes the flicker; scroll only deepens the shadow.
 *
 * `overDark` is kept in the signature because both pages pass it, but the bar
 * no longer needs it. It is accepted and ignored rather than removed, so the
 * two call sites do not have to change in lockstep with this file.
 */
export function Nav({ overDark: _overDark = false }: { overDark?: boolean }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));
  const lifted = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-4 sm:pt-6">
      <div className="mx-auto w-full max-w-[72rem] px-4 sm:px-8">
        <nav
          aria-label="Primary"
          className={cx(
            "flex h-[68px] items-center justify-between rounded-full bg-card pl-6 pr-2.5 transition-shadow duration-300",
            lifted ? "shadow-pill" : "shadow-card",
          )}
        >
          <a href="/" aria-label="FollowUpHub home" className="rounded-lg">
            <Logo eager tone="ink" />
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[15px] font-medium tracking-[-0.02em] text-ink transition-colors duration-200 hover:text-teal"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={SITE.app}
              className="text-[15px] font-medium tracking-[-0.02em] text-ink-soft transition-colors hover:text-teal"
            >
              Log in
            </a>
            <PillCta href="/#pricing" size="md">
              Start free trial
            </PillCta>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-sand lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: EASE_OUT }}
              className="mt-2 rounded-[1.75rem] bg-card p-3 shadow-pill lg:hidden"
            >
              <ul>
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-[16px] font-medium tracking-[-0.02em] transition-colors hover:bg-sand hover:text-teal"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-line pt-3">
                <Button variant="secondary" href={SITE.app}>
                  Log in
                </Button>
                <Button href="/#pricing" onClick={() => setOpen(false)}>
                  Start trial
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
