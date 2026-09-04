import { motion, type HTMLMotionProps } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { fadeUp, stagger, viewport } from "../lib/motion";
import { IMG } from "../lib/assets";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* ----------------------------- brand mark ----------------------------- */

export function Logo({ className, tone = "ink" }: { className?: string; tone?: "ink" | "cream" }) {
  return (
    <img
      src={tone === "cream" ? IMG.logoLight : IMG.logo}
      alt="FollowUpHub"
      width={701}
      height={153}
      className={cx("h-9 w-auto", className)}
    />
  );
}

/** Round photo with initials as the fallback if the image cannot load. */
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
  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
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
  align?: "center" | "left";
  tone?: "ink" | "cream";
  as?: "h2" | "h3";
}) {
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
      <motion.div variants={fadeUp}>
        <Tag
          className={cx(
            "mt-5 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-[2.6rem]",
            tone === "cream" ? "text-cream" : "text-ink",
          )}
        >
          {title}
        </Tag>
      </motion.div>
      {lede && (
        <motion.p
          variants={fadeUp}
          className={cx(
            "mt-4 text-[17px] leading-[1.7]",
            tone === "cream" ? "text-mist/85" : "text-ink-soft",
          )}
        >
          {lede}
        </motion.p>
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

