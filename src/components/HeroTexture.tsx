/**
 * The hero ground: three soft folded slabs in deep green, lit along their
 * edges, over a dark field with film grain.
 *
 * Drawn rather than shipped as a bitmap. A photograph of this would be a
 * 400kB PNG that still bands on a wide display and blurs on a retina one;
 * four gradients and three paths are under 2kB, stay sharp at any size, and
 * let the light be moved without going back to an image editor.
 *
 * The composition keeps its bright edges in the outer thirds. The headline
 * sits in the middle, and a lit edge running under it would cost the cream
 * type its contrast and need a scrim to win it back.
 */
export function HeroTexture() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* the field the slabs sit in */}
          <radialGradient id="fuh-ground" cx="0.5" cy="0.1" r="1.1">
            <stop offset="0" stopColor="#0b2d24" />
            <stop offset="0.6" stopColor="#072019" />
            <stop offset="1" stopColor="#041511" />
          </radialGradient>

          {/* Each face is one linear gradient with its stops bunched at the
              lit end, which is what puts the light on the edge and lets the
              rest of the face fall away into the ground. */}
          <linearGradient id="fuh-a" gradientUnits="userSpaceOnUse" x1="-140" y1="200" x2="352" y2="700">
            <stop offset="0" stopColor="#092820" />
            <stop offset="0.5" stopColor="#14493a" />
            <stop offset="0.85" stopColor="#3b9576" />
            <stop offset="0.97" stopColor="#84d5b2" />
            <stop offset="1" stopColor="#a3e4c7" />
          </linearGradient>

          <linearGradient id="fuh-b" gradientUnits="userSpaceOnUse" x1="1640" y1="240" x2="1130" y2="600">
            <stop offset="0" stopColor="#082721" />
            <stop offset="0.48" stopColor="#124638" />
            <stop offset="0.84" stopColor="#358c70" />
            <stop offset="0.96" stopColor="#7fd0ab" />
            <stop offset="1" stopColor="#9fe0c3" />
          </linearGradient>

          <linearGradient id="fuh-c" gradientUnits="userSpaceOnUse" x1="1230" y1="560" x2="1360" y2="940">
            <stop offset="0" stopColor="#a6e6c9" />
            <stop offset="0.1" stopColor="#59b491" />
            <stop offset="0.38" stopColor="#174e3e" />
            <stop offset="1" stopColor="#092922" />
          </linearGradient>

          {/* The foot ramp. The running band sits in the last 47px and its
              type is cream, so where a lit edge reaches the bottom corner
              the two meet at about 2:1. This takes the ground back down
              under the band without touching the fold above it. */}
          <linearGradient id="fuh-foot" gradientUnits="userSpaceOnUse" x1="0" y1="770" x2="0" y2="900">
            <stop offset="0" stopColor="#04130f" stopOpacity="0" />
            <stop offset="1" stopColor="#04130f" stopOpacity="0.82" />
          </linearGradient>

          {/* Film grain. Desaturated so it reads as grain and not as colour
              speckle, and kept off the type by the low opacity below. */}
          <filter id="fuh-grain" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>

        <rect width="1440" height="900" fill="url(#fuh-ground)" />

        {/* Left slab, lit down its right edge. Both slabs were pulled out
            to the thirds after a first pass put their lit edges either side
            of the headline: cream type wants the dark of the valley behind
            it, and a scrim to win the contrast back would flatten the whole
            ground. */}
        <path d="M-80 920 L-80 96 L110 96 C236 96 340 200 340 326 L340 920 Z" fill="url(#fuh-a)" />

        {/* Right slab, lit up its left edge, leaving the valley between
            them. Its edge sits at 1130 rather than 1046 because the four
            boxes reach 1072 at this viewBox, and cream type at 80% over that
            lit edge measured 1.5:1. */}
        <path d="M1130 920 L1130 296 C1130 152 1246 36 1390 36 L1600 36 L1600 920 Z" fill="url(#fuh-b)" />

        {/* the fold rising across the foot, lit along its top */}
        <path
          d="M830 920 C982 872 1122 782 1246 672 C1346 584 1430 500 1520 398 L1520 920 Z"
          fill="url(#fuh-c)"
        />

        <rect x="0" y="770" width="1440" height="130" fill="url(#fuh-foot)" />

        <rect
          width="1440"
          height="900"
          filter="url(#fuh-grain)"
          opacity="0.15"
          style={{ mixBlendMode: "overlay" }}
        />
      </svg>
    </div>
  );
}
