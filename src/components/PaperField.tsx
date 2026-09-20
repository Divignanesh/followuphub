import { GRAIN_SIZE, GRAIN_TILE } from "../lib/texture";

/**
 * The light half of the site's one texture.
 *
 * Same idea as the RayField behind the hero, inverted: a warm floor glow with
 * a fine vertical rhythm rising out of it, masked so it fades before it
 * reaches any heading, and the same grain tile on top. The sand sections used
 * to be flat fields of one colour, which at full-screen height reads as a
 * blank wall; this gives them depth without a second texture vocabulary.
 *
 * It paints as an absolutely positioned sibling, so whatever follows it needs
 * its own stacking context or the field will sit over the content.
 */
export function PaperField({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* the floor glow, the light counterpart of the dark field's stage light */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(118% 82% at 50% 112%, rgb(26 107 90 / 0.14) 0%, rgb(26 107 90 / 0.06) 40%, transparent 74%)",
        }}
      />

      {/* a cool top so headings sit on near-flat ground */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgb(255 255 255 / 0.55) 0%, transparent 46%)",
        }}
      />

      {/* the fine vertical rhythm, the same 9px beat as the dark field */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgb(18 63 54 / 0.055) 0px, rgb(18 63 54 / 0.055) 1px, transparent 1px, transparent 9px)",
          maskImage: "linear-gradient(to top, black 0%, rgb(0 0 0 / 0.40) 46%, transparent 86%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, rgb(0 0 0 / 0.40) 46%, transparent 86%)",
        }}
      />

      {/* and the wider one, so the fine lines do not read as a screen door */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgb(26 107 90 / 0.085) 0px, rgb(26 107 90 / 0.085) 2px, transparent 2px, transparent 46px)",
          maskImage: "linear-gradient(to top, black 0%, transparent 74%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 74%)",
        }}
      />

      {/* the horizon, same device as the dark field */}
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgb(26 107 90 / 0.28), transparent)" }}
      />

      <div
        className="absolute inset-0 opacity-[0.14] mix-blend-multiply"
        style={{ backgroundImage: GRAIN_TILE, backgroundSize: GRAIN_SIZE }}
      />
    </div>
  );
}
