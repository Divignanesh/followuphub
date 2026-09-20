/**
 * The one grain tile the whole site shares.
 *
 * Both texture fields paint it: the dark RayField behind the hero and the
 * light PaperField behind the pinned stages panel and the footer. Keeping it
 * in one place is the point: a second, slightly different noise would read
 * as two sites.
 */
export const GRAIN_TILE =
  "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

export const GRAIN_SIZE = "120px 120px";
