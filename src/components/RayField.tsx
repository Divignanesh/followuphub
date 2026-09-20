import { GRAIN_SIZE, GRAIN_TILE } from "../lib/texture";

/**
 * The bold companion to the Ribbon Field.
 *
 * Vertical rays rising out of a warm floor, the way a stage light reads: a
 * fine repeating line pattern that fades out with height, lit from below by a
 * broad radial glow. It is pure CSS, so it costs nothing next to the one WebGL
 * canvas the page already spends on the hero, and it holds its nerve behind
 * large type in a way a soft mesh gradient does not.
 *
 * Same palette as everything else: teal-ink ground, teal glow, cream rays.
 */
export function RayField({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* ground */}
      <div className="absolute inset-0 bg-teal-ink" />

      {/* the glow the rays rise out of */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 78% at 50% 108%, rgb(26 107 90 / 0.95) 0%, rgb(18 63 54 / 0.65) 38%, transparent 72%)",
        }}
      />

      {/* the rays: a fine vertical rhythm, masked so it fades upward */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgb(232 245 240 / 0.10) 0px, rgb(232 245 240 / 0.10) 1px, transparent 1px, transparent 9px)",
          maskImage: "linear-gradient(to top, black 0%, rgb(0 0 0 / 0.45) 45%, transparent 88%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, rgb(0 0 0 / 0.45) 45%, transparent 88%)",
        }}
      />

      {/* a second, wider rhythm so the lines do not read as a screen door */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgb(88 168 148 / 0.14) 0px, rgb(88 168 148 / 0.14) 2px, transparent 2px, transparent 46px)",
          maskImage: "linear-gradient(to top, black 0%, transparent 78%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 78%)",
        }}
      />

      {/* the horizon line that makes the floor read as a floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgb(88 168 148 / 0.55), transparent)" }}
      />

      {/* The top of the panel stays near-solid: headings live up there, and a
          heading on the busiest part of the rays is the one place this texture
          costs legibility. */}
      <div
        className="absolute inset-x-0 top-0 h-2/5"
        style={{ background: "linear-gradient(to bottom, rgb(13 44 38 / 0.92) 0%, transparent 100%)" }}
      />

      {/* grain, same tile as the Ribbon Field so the two textures are siblings */}
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage: GRAIN_TILE,
          backgroundSize: GRAIN_SIZE,
        }}
      />
    </div>
  );
}
