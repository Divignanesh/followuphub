import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { EASE_OUT } from "../lib/motion";
import { SITE } from "../lib/seo";
import { Button, Logo, PillCta, cx, external } from "./ui";

const links = [
  { label: "Platform", href: "/#platform" },
  { label: "AI Engine", href: "/#ai" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Compare", href: "/#compare" },
  { label: "FAQ", href: "/#faq" },
];

/**
 * Blended into the hero at rest, a floating pill once the page moves.
 *
 * `overDark` marks a page whose first screen is dark enough to letter on
 * directly, which is the home page and nothing else. There the bar starts
 * with no pill and no shadow, then takes on its cream ground the moment the
 * reader scrolls.
 *
 * An earlier version of this file dropped the two-state treatment because
 * swapping the logo mid-transition flickered: the cream file was only fetched
 * at the first wheel notch. Both files are rendered here instead, stacked and
 * cross-faded, so each is in cache from load and the change is one opacity
 * transition rather than a network request.
 */
export function Nav({ overDark = false }: { overDark?: boolean }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));
  const lifted = scrolled || open;
  // Opening the mobile panel lifts the bar too, so the panel never hangs off
  // a transparent masthead.
  const blended = overDark && !lifted;

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-4 sm:pt-6">
      <div className="mx-auto w-full max-w-[72rem] px-4 sm:px-8">
        <nav
          aria-label="Primary"
          className={cx(
            "flex h-[68px] items-center justify-between rounded-full pl-6 pr-2.5",
            "transition-[background-color,box-shadow] duration-300",
            blended
              ? "bg-transparent shadow-none"
              : cx("bg-card", lifted ? "shadow-pill" : "shadow-card"),
          )}
        >
          <a href="/" aria-label="FollowUpHub home" className="relative block rounded-lg">
            <span
              aria-hidden="true"
              className={cx("block transition-opacity duration-300", blended && "opacity-0")}
            >
              <Logo eager tone="ink" />
            </span>
            <span
              aria-hidden="true"
              className={cx(
                "absolute inset-0 transition-opacity duration-300",
                blended ? "opacity-100" : "opacity-0",
              )}
            >
              <Logo eager tone="cream" />
            </span>
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={cx(
                    "text-[15px] font-medium tracking-[-0.02em] transition-colors duration-200",
                    blended ? "text-cream/90 hover:text-mint" : "text-ink hover:text-teal",
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={SITE.app}
              {...external(SITE.app)}
              className={cx(
                "text-[15px] font-medium tracking-[-0.02em] transition-colors",
                blended ? "text-cream/75 hover:text-cream" : "text-ink-soft hover:text-teal",
              )}
            >
              Log in
            </a>
            <PillCta href="/#pricing" size="md" tone={blended ? "cream" : "ink"}>
              Start free trial
            </PillCta>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={cx(
              "flex size-11 items-center justify-center rounded-full transition-colors lg:hidden",
              blended ? "text-cream hover:bg-cream/15" : "text-ink hover:bg-sand",
            )}
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
