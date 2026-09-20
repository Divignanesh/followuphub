import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
 * Agent headshots are served from the live domain, which is currently 404ing
 * every asset. Until those are restored the portrait falls back to the
 * person's initials rather than rendering a broken image.
 */
export function Portrait({
  src,
  name,
  size = 44,
  className,
}: {
  src: string;
  name: string;
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
      /* Eager: these are 40-52px, and inside the drifting testimonial rows a
         lazy image parked off-screen never fetches, so it never errors and
         never falls back — it just sits there as alt text. */
      loading="eager"
      decoding="async"
      onError={() => setFailed(true)}
      style={{ width: size, height: size }}
      className={cx("shrink-0 rounded-full object-cover ring-2 ring-cream", className)}
    />
  );
}

/* ------------------------------- buttons ------------------------------ */

type ButtonProps = Omit<HTMLMotionProps<"a">, "children"> & {
  variant?: "primary" | "secondary" | "cream" | "ghost-cream";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
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
  withArrow = false,
  className,
  children,
  href = "#",
  ...rest
}: ButtonProps) {
  return (
    <motion.a
      href={href}
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
      {withArrow && (
        <ArrowRight
          className="size-[18px] transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
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
      className={cx(
        "text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-[2.6rem]",
        tone === "cream" ? "text-cream" : "text-ink",
      )}
    >
      {title}
    </Tag>
  );

  const ledeEl = lede ? (
    <p
      className={cx(
        "text-[17px] leading-[1.7]",
        tone === "cream" ? "text-mist/85" : "text-ink-soft",
      )}
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
          <motion.div variants={fadeUp} className="max-w-lg lg:pb-1">
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

