const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Canvas 2D magnetic dot grid (Efeito E). Ported from bootGrid(). Points on
 * an 18px lattice displace and grow near the (spring-interpolated) cursor,
 * and gently oscillate on the Y axis.
 *
 * @param {import('vue').Ref<HTMLCanvasElement|null>} canvasRef
 */
export function useMagneticGrid(canvasRef) {
  const cv = canvasRef.value
  if (!cv) return { destroy() {} }
  if (prefersReducedMotion()) return { destroy() {} }

  const ctx = cv.getContext('2d')
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  let W = 0
  let H = 0
  let dots = []

  const build = () => {
    W = cv.clientWidth
    H = cv.clientHeight
    cv.width = W * dpr
    cv.height = H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    dots = []
    const gap = 18
    for (let y = gap; y < H; y += gap) {
      for (let x = gap; x < W; x += gap) dots.push({ x, y })
    }
  }
  build()

  let mx = -999
  let my = -999
  const onMove = (e) => {
    const r = cv.getBoundingClientRect()
    mx = e.clientX - r.left
    my = e.clientY - r.top
  }
  const onLeave = () => {
    mx = -999
    my = -999
  }
  cv.addEventListener('mousemove', onMove)
  cv.addEventListener('mouseleave', onLeave)
  const onResize = () => build()
  window.addEventListener('resize', onResize)

  let raf = 0
  let alive = true
  let sx = -999
  let sy = -999
  let t = 0
  const R = 96

  const tick = () => {
    if (!alive) return
    const rect = cv.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      t += 0.02
      sx += (mx - sx) * 0.12
      sy += (my - sy) * 0.12
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < dots.length; i++) {
        const d0 = dots[i]
        const dx = d0.x - sx
        const dy = d0.y - sy
        const dist = Math.sqrt(dx * dx + dy * dy)
        let ox = 0
        let oy = 0
        let r = 1.1
        let a = 0.28
        if (dist < R) {
          const f = 1 - dist / R
          ox = (dx / (dist || 1)) * f * 20
          oy = (dy / (dist || 1)) * f * 20
          r = 1.1 + f * 2.6
          a = 0.28 + f * 0.72
        }
        const wob = Math.sin(t + d0.x * 0.04 + d0.y * 0.03) * 0.9
        ctx.beginPath()
        ctx.arc(d0.x + ox, d0.y + oy + wob, r, 0, 6.2832)
        ctx.fillStyle = `rgba(56,189,248,${a.toFixed(3)})`
        ctx.fill()
      }
    }
    raf = requestAnimationFrame(tick)
  }
  tick()

  const destroy = () => {
    alive = false
    cancelAnimationFrame(raf)
    cv.removeEventListener('mousemove', onMove)
    cv.removeEventListener('mouseleave', onLeave)
    window.removeEventListener('resize', onResize)
  }

  return { destroy }
}
