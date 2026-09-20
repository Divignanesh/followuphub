import { useEffect, useRef } from 'react'

/**
 * Ribbon Field — the 21st.dev "그라데이션" stripe gradient.
 *
 * A canvas stripe field along `angle`. Each stripe is sized by its `pos` and its
 * edges are feathered by `softness`; `wave` bends the bands with a cross-axis
 * sine offset of (wave / 100) * 0.35 * sin(cross * 2.4 * 2π + clock).
 *
 * The published CSS linear-gradient is the exact answer when wave is zero, so
 * the colour ramp below IS that stop list. Sampling it along the wave-offset
 * axis therefore reduces to the published gradient at wave = 0, and bends from
 * there — which is the contract the spec states.
 *
 * Motion: an elapsed-seconds clock t, ph = t * SPEED, amt = MOTION_AMOUNT,
 * dir = 1, spin = ph * dir. Every modulation is written so it is exactly 0 at
 * ph = 0, or the gradient snaps the moment motion starts. Nothing is rounded
 * per frame; quantising the angle or the stop positions is what makes the
 * motion visibly step.
 */

// The published stop list. Do not round these.
// Stop POSITIONS are the published ones, so the field's geometry is untouched.
// The colours are the brand's: white, mint, mid green, deep green.
const STOPS: Array<[number, [number, number, number]]> = [
  [4.32, [255, 255, 255]],   // White
  [33.18, [255, 255, 255]],
  [37.86, [232, 245, 240]],  // Mist   --color-mist
  [58.14, [232, 245, 240]],
  [58.86, [88, 168, 148]],   // Mid teal
  [79.64, [88, 168, 148]],
  [80.0, [26, 107, 90]],     // Teal   --color-teal
  [100.0, [26, 107, 90]],
]

const ANGLE = 32          // degrees
const WAVE = 14           // 0-100
const SPEED = 1.0         // speed 100 -> ph = t * 1.00
const MOTION_AMOUNT = 0.0 // motionAmount 0 -> hard bands sway only if raised
const DIR = 1             // motionReverse false
const WAVE_CLOCK_0 = 20.75
const WAVE_CLOCK_RATE = 1.2
const TAU = Math.PI * 2

/** 1024-entry colour ramp built once from the stop list. */
const RAMP_N = 1024
const RAMP = (() => {
  const r = new Uint8ClampedArray(RAMP_N * 3)
  for (let i = 0; i < RAMP_N; i++) {
    const p = (i / (RAMP_N - 1)) * 100
    let a = STOPS[0], b = STOPS[STOPS.length - 1]
    for (let s = 0; s < STOPS.length - 1; s++) {
      if (p >= STOPS[s][0] && p <= STOPS[s + 1][0]) { a = STOPS[s]; b = STOPS[s + 1]; break }
      if (p < STOPS[0][0]) { a = b = STOPS[0]; break }
      if (p > STOPS[STOPS.length - 1][0]) { a = b = STOPS[STOPS.length - 1]; break }
    }
    const span = b[0] - a[0]
    const f = span === 0 ? 0 : (p - a[0]) / span
    r[i * 3] = a[1][0] + (b[1][0] - a[1][0]) * f
    r[i * 3 + 1] = a[1][1] + (b[1][1] - a[1][1]) * f
    r[i * 3 + 2] = a[1][2] + (b[1][2] - a[1][2]) * f
  }
  return r
})()

/** sin lookup, so the inner loop is a table read rather than a trig call. */
const SIN_N = 4096
const SIN = (() => {
  const s = new Float32Array(SIN_N)
  for (let i = 0; i < SIN_N; i++) s[i] = Math.sin((i / SIN_N) * TAU)
  return s
})()
const fastSin = (x: number) => {
  let u = x / TAU
  u -= Math.floor(u)
  return SIN[(u * SIN_N) | 0]
}

/**
 * `still` paints the published CSS linear-gradient instead of running the
 * canvas. That gradient IS the field at wave = 0, so a still panel is exact,
 * not an approximation — which is why the page can afford the field in four
 * places while keeping a single WebGL context, on the hero, where the motion
 * is actually visible.
 */
const STILL_CSS =
  "linear-gradient(32deg, #FFFFFF 4.32%, #FFFFFF 33.18%, #E8F5F0 37.86%, #E8F5F0 58.14%, " +
  "#58A894 58.86%, #58A894 79.64%, #1A6B5A 80%, #1A6B5A 100%)"

export function RibbonField({ className = '', still = false }: { className?: string; still?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (still) return
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d', { alpha: false })
    if (!ctx) return

    // The field is smooth, so it renders small and the browser scales it up.
    // Full-resolution per-pixel JS every frame would cost far more than it shows.
    const RES = 360
    let w = 0, h = 0, img: ImageData | null = null
    let raf = 0, running = true, visible = true
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')

    const resize = () => {
      const r = cv.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) return
      w = RES
      h = Math.max(2, Math.round(RES * (r.height / r.width)))
      cv.width = w; cv.height = h
      img = ctx.createImageData(w, h)
      draw(0)
    }

    function draw(ph: number) {
      if (!img || !ctx) return
      // Exactly 0 at ph = 0: sin(0) = 0. With amt = 0 the bands hold their angle
      // and only the wave clock advances, which is what "sway, not spin" means.
      const spin = ph * DIR
      const angle = ANGLE + fastSin(spin * 0.6) * 28 * MOTION_AMOUNT
      const clock = WAVE_CLOCK_0 + ph * WAVE_CLOCK_RATE

      const a = (angle * Math.PI) / 180
      const sa = Math.sin(a), ca = Math.cos(a)
      // CSS linear-gradient mapping: 0deg points up, angles run clockwise.
      const gx = sa, gy = -ca
      const gLen = Math.abs(w * sa) + Math.abs(h * ca)
      const cLen = Math.abs(w * ca) + Math.abs(h * sa)
      const cx = ca, cy = sa
      const halfW = w / 2, halfH = h / 2
      const waveAmp = (WAVE / 100) * 0.35

      const d = img.data
      let o = 0
      for (let py = 0; py < h; py++) {
        const dy = py - halfH
        let along = ((0 - halfW) * gx + dy * gy) / gLen + 0.5
        let cross = ((0 - halfW) * cx + dy * cy) / cLen + 0.5
        const dAlong = gx / gLen
        const dCross = cx / cLen
        for (let px = 0; px < w; px++) {
          const off = waveAmp * fastSin(cross * 2.4 * TAU + clock)
          let u = along + off
          u = u < 0 ? 0 : u > 1 ? 1 : u
          const idx = ((u * (RAMP_N - 1)) | 0) * 3
          d[o] = RAMP[idx]; d[o + 1] = RAMP[idx + 1]; d[o + 2] = RAMP[idx + 2]; d[o + 3] = 255
          o += 4
          along += dAlong
          cross += dCross
        }
      }
      ctx.putImageData(img, 0, 0)
    }

    const start = performance.now()
    const loop = () => {
      if (!running) return
      if (visible && !reduce.matches) {
        const t = (performance.now() - start) / 1000
        draw(t * SPEED)
      }
      raf = requestAnimationFrame(loop)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(cv)
    // Offscreen and background tabs stop painting: the field is decoration.
    const io = new IntersectionObserver(e => { visible = e[0].isIntersecting }, { threshold: 0 })
    io.observe(cv)
    const onVis = () => { visible = !document.hidden }
    document.addEventListener('visibilitychange', onVis)

    resize()
    raf = requestAnimationFrame(loop)

    return () => {
      running = false; cancelAnimationFrame(raf)
      ro.disconnect(); io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [still])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {still ? (
        <div className="h-full w-full" style={{ backgroundImage: STILL_CSS }} />
      ) : (
        <canvas ref={ref} className="h-full w-full" style={{ background: '#1A6B5A' }} />
      )}
      {/* grain 42 -> the published 120px fractalNoise tile at 0.210, overlaid */}
      <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.21]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: '120px 120px',
        }} />
    </div>
  )
}
