import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { fadeUp, stagger, viewport } from "../lib/motion";
import { IMG } from "../lib/assets";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* ----------------------------- brand mark ----------------------------- */

/**
 * Drawn locally rather than loaded from the live domain. The hosted logo
 * files are currently 404ing, which broke the masthead on every page; an
 * inline mark plus the wordmark set in the site's own typeface cannot go
 * missing, and costs no request.
 */
/**
 * The real brand lockup. The hand-drawn SVG that stood in for it had a 40-unit
 * stroke, which read far heavier than the actual mark. Both files are live
 * again (verified 200), so the site uses them rather than an approximation.
 */
export function Logo({
  className,
  tone = "ink",
  eager = false,
}: {
  className?: string;
  tone?: "ink" | "cream";
  /** Marks the masthead copy as above the fold. */
  eager?: boolean;
}) {
  return (
    <img
      src={tone === "cream" ? IMG.logoLight : IMG.logo}
      alt="FollowUpHub"
      width={701}
      height={153}
      fetchPriority={eager ? "high" : undefined}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={cx("h-8 w-auto shrink-0", className)}
    />
  );
}

/**
 * A headshot that falls back to the person's initials if the file does not
 * load, rather than leaving a broken image in the layout.
 *
 * Lazy by default, and it matters more than it looks: React hoists a
 * `<link rel="preload" as="image">` for every non-lazy image it renders on
 * the server, so an eager headshot far below the fold is fetched at top
 * priority against the hero, the stylesheet and the fonts. Nothing on the
 * page needs one above the fold, but `eager` is here if that changes.
 */
export function Portrait({
  src,
  name,
  size = 44,
  eager = false,
  className,
}: {
  src: string;
  name: string;
  eager?: boolean;
  size?: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // The image usually fails while the prerendered HTML is still parsing —
  // before React attaches onError — so the handler alone never fires. Check
  // the element's own state once on mount to catch that case too.
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  if (failed) {
    return (
      <span
        aria-label={name}
        role="img"
        style={{ width: size, height: size }}
        className={cx(
          "grid shrink-0 place-items-center rounded-full bg-mist font-bold text-teal ring-2 ring-cream",
          className,
        )}
      >
        <span style={{ fontSize: size * 0.36 }}>{initials}</span>
      </span>
    );
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={name}
      width={size}
      height={size}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      style={{ width: size, height: size }}
      className={cx("shrink-0 rounded-full object-cover ring-2 ring-cream", className)}
    />
  );
}

/* ------------------------------- buttons ------------------------------ */

/**
 * Links that leave the site (checkout, the app, demo booking, socials) open
 * in a new tab, so the page the visitor was reading stays where they left it.
 * In-page anchors, site routes and mailto: links are untouched.
 */
export function external(href?: string) {
  return href && /^https?:\/\//.test(href)
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : {};
}

type ButtonProps = Omit<HTMLMotionProps<"a">, "children"> & {
  variant?: "primary" | "secondary" | "cream" | "ghost-cream";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
};

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-[52px] px-7 text-base",
};

const variants = {
  primary: "bg-teal text-white shadow-[0_10px_28px_-12px_rgb(26_107_90/0.7)] hover:bg-teal-deep",
  secondary: "border border-line bg-card text-ink shadow-soft hover:border-teal/40 hover:bg-white",
  cream: "bg-cream text-teal-ink hover:bg-white",
  "ghost-cream": "border border-cream/25 text-cream hover:bg-cream/10",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href = "#",
  ...rest
}: ButtonProps) {
  return (
    <motion.a
      href={href}
      {...external(href)}
      whileTap={{ scale: 0.975 }}
      className={cx(
        "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[background-color,border-color,box-shadow,color] duration-200",
        sizes[size],
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </motion.a>
  );
}

/* ------------------------------ section kit --------------------------- */

export function Kicker({
  children,
  tone = "ink",
  className,
}: {
  children: ReactNode;
  tone?: "ink" | "cream";
  className?: string;
}) {
  return (
    <p
      className={cx(
        "flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em]",
        tone === "cream" ? "text-mist/80" : "text-teal",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cx("h-px w-7", tone === "cream" ? "bg-mist/40" : "bg-teal/40")}
      />
      {children}
    </p>
  );
}

export function SectionHeading({
  kicker,
  title,
  lede,
  align = "center",
  tone = "ink",
  as: Tag = "h2",
}: {
  kicker?: string;
  title: ReactNode;
  lede?: ReactNode;
  /** "split" puts the title left and the lede right across the full width. */
  align?: "center" | "left" | "split";
  tone?: "ink" | "cream";
  as?: "h2" | "h3";
}) {
  const heading = (
    <Tag
      className={cx("t-h2", tone === "cream" ? "text-cream" : "text-ink")}
    >
      {title}
    </Tag>
  );

  const ledeEl = lede ? (
    <p
      className={cx("t-lede", tone === "cream" ? "text-mist/85" : "text-ink-soft")}
    >
      {lede}
    </p>
  ) : null;

  if (align === "split") {
    return (
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="grid gap-x-12 gap-y-5 border-b border-line pb-10 lg:grid-cols-[1.15fr_1fr] lg:items-end"
      >
        <div>
          {kicker && (
            <motion.div variants={fadeUp}>
              <Kicker tone={tone}>{kicker}</Kicker>
            </motion.div>
          )}
          <motion.div variants={fadeUp} className="mt-5 max-w-xl">
            {heading}
          </motion.div>
        </div>
        {ledeEl && (
          <motion.div variants={fadeUp} className="max-w-lg lg:justify-self-end lg:pb-1 lg:text-right">
            {ledeEl}
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={cx("max-w-2xl", align === "center" && "mx-auto text-center")}
    >
      {kicker && (
        <motion.div variants={fadeUp} className={align === "center" ? "flex justify-center" : ""}>
          <Kicker tone={tone}>{kicker}</Kicker>
        </motion.div>
      )}
      <motion.div variants={fadeUp} className="mt-5">
        {heading}
      </motion.div>
      {ledeEl && (
        <motion.div variants={fadeUp} className="mt-4">
          {ledeEl}
        </motion.div>
      )}
    </motion.div>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  // MotionConfig's reducedMotion="user" drops transforms but keeps opacity, so
  // an entrance that starts at 0 and never fires leaves the content invisible.
  // Under reduced motion this renders the resting state directly.
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------- misc -------------------------------- */


/* ------------------------- humanto-shape CTA -------------------------- */

/**
 * The page's primary call to action.
 *
 * A plain pill. It carried a filled circular badge with an arrow in it, which
 * is the shape the reference uses, but an arrow on a button that says "Start
 * free trial" is decoration: the label already names what happens, and the
 * glyph only repeats that something comes next.
 *
 * Three grounds: `ink` on light sections, `cream` on the dark ones, and
 * `outline` for the secondary action that must not compete.
 */
export function PillCta({
  href = "#",
  tone = "ink",
  size = "lg",
  className,
  children,
}: {
  href?: string;
  tone?: "ink" | "cream" | "outline" | "outline-light";
  size?: "md" | "lg";
  className?: string;
  children: ReactNode;
}) {
  const big = size === "lg";
  const skin =
    tone === "ink"
      ? "bg-teal-ink text-cream hover:bg-teal-deep"
      : tone === "cream"
        ? "bg-cream text-teal-ink hover:bg-white"
        : tone === "outline-light"
          ? "border border-cream/30 text-cream hover:border-cream/60 hover:bg-cream/[0.07]"
          : "border border-ink/20 text-ink hover:border-ink/45 hover:bg-ink/[0.03]";

  return (
    <motion.a
      href={href}
      {...external(href)}
      whileTap={{ scale: 0.98 }}
      className={cx(
        "group inline-flex items-center justify-center rounded-full font-semibold tracking-[-0.02em] transition-colors duration-200",
        big ? "h-[60px] px-8 text-[16px]" : "h-[52px] px-6 text-[15px]",
        tone !== "outline" && "shadow-pill",
        skin,
        className,
      )}
    >
      {children}
    </motion.a>
  );
}

/* ------------------------------ reveal kit ---------------------------- */

/**
 * The scroll entrance used across the rebuilt page.
 *
 * One family, one distance, one easing, so the whole page moves the same way:
 * 24px up over 0.7s on an expo-out curve. The reference staggers children of a
 * group by about 80ms, which is what makes a row of cards read as one gesture
 * rather than three separate animations, so `RevealGroup` orchestrates and
 * `RevealItem` inherits.
 *
 * Both collapse to the resting state under reduced motion rather than
 * animating a shorter distance: MotionConfig's `reducedMotion="user"` drops
 * transforms but keeps opacity, so an entrance starting at 0 that never fires
 * would leave the content invisible.
 */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function RevealGroup({
  children,
  className,
  stagger: each = 0.08,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "ol";
}) {
  const reduce = useReducedMotion();
  const M = Tag === "ul" ? motion.ul : Tag === "ol" ? motion.ol : motion.div;
  if (reduce) return <Tag className={className}>{children}</Tag>;
  return (
    <M
      variants={{ hidden: {}, show: { transition: { staggerChildren: each, delayChildren: delay } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px 0px -12% 0px" }}
      className={className}
    >
      {children}
    </M>
  );
}

export function RevealItem({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const M = Tag === "li" ? motion.li : motion.div;
  if (reduce) return <Tag className={className}>{children}</Tag>;
  return (
    <M variants={revealUp} className={className}>
      {children}
    </M>
  );
}
