import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { EASE_OUT } from "../lib/motion";
import { SITE } from "../lib/seo";
import { Button, Logo, cx } from "./ui";

const links = [
  { label: "Platform", href: "/#platform" },
  { label: "AI engine", href: "/#ai" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Compare", href: "/#compare" },
  { label: "FAQ", href: "/#faq" },
];

/**
 * `overDark` marks a page whose hero is a dark photograph — the home page.
 * There the bar stays transparent at the top and letters itself in cream, so
 * the photograph runs unbroken behind it. The article page opens on cream,
 * where cream-on-cream would vanish, so it keeps dark lettering. Once the bar
 * turns solid on scroll it is cream-backed on every page and the dark type
 * comes back.
 */
export function Nav({ overDark = false }: { overDark?: boolean }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));
  const solid = scrolled || open;
  const onDark = overDark && !solid;

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3">
      <div className="container-x">
        <nav
          aria-label="Primary"
          className={cx(
            "flex h-16 items-center justify-between rounded-2xl border px-3 pl-4 transition-[background-color,border-color,box-shadow] duration-300",
            solid
              ? "border-line bg-cream/85 shadow-soft backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <a href="/" aria-label="FollowUpHub home" className="rounded-lg">
            <Logo eager tone={onDark ? "cream" : "ink"} />
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={cx(
                    "px-3.5 py-2 text-[14px] font-semibold transition-colors duration-200",
                    onDark ? "text-cream/90 hover:text-cream" : "text-ink-soft hover:text-teal",
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={SITE.app}
              className={cx(
                "rounded-full px-3 py-2 text-[14px] font-semibold transition-colors",
                onDark ? "text-cream/90 hover:text-cream" : "text-ink-soft hover:text-teal",
              )}
            >
              Log in
            </a>
            <Button href="/#pricing" size="sm" variant={onDark ? "cream" : "primary"}>
              Start free trial
            </Button>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={cx(
              "flex size-11 items-center justify-center rounded-xl transition-colors lg:hidden",
              onDark ? "text-cream hover:bg-cream/10" : "text-ink hover:bg-sand",
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
              className="mt-2 rounded-2xl border border-line bg-card p-2 shadow-lift lg:hidden"
            >
              <ul>
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 text-[15px] font-semibold transition-colors hover:text-teal"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-2 space-y-2 border-t border-line p-2 pt-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="secondary" href={SITE.app}>
                    Log in
                  </Button>
                  <Button href="/#pricing" onClick={() => setOpen(false)}>
                    Start trial
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
