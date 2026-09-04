import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
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

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));
  const solid = scrolled || open;

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
            <Logo />
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3.5 py-2 text-[14px] font-semibold text-ink-soft transition-colors duration-200 hover:bg-sand hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={`tel:${SITE.phone}`}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[14px] font-semibold text-ink-soft transition-colors hover:text-teal"
            >
              <Phone className="size-4" aria-hidden="true" />
              {SITE.phoneDisplay}
            </a>
            <a
              href={SITE.app}
              className="rounded-full px-3 py-2 text-[14px] font-semibold text-ink-soft transition-colors hover:text-ink"
            >
              Log in
            </a>
            <Button href="/#pricing" size="sm">
              Start free trial
            </Button>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex size-11 items-center justify-center rounded-xl text-ink transition-colors hover:bg-sand lg:hidden"
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
                      className="block rounded-xl px-4 py-3 text-[15px] font-semibold transition-colors hover:bg-sand"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-2 space-y-2 border-t border-line p-2 pt-4">
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-center justify-center gap-2 text-[15px] font-semibold text-ink-soft"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {SITE.phoneDisplay}
                </a>
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
