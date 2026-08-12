const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Canvas 2D "text that dissolves" (Efeito C). Ported from bootTextParticles().
 * Samples the words FRONT / END into a particle field that the cursor
 * pushes around, with a spring pulling each particle back to its origin.
 *
 * @param {import('vue').Ref<HTMLCanvasElement|null>} canvasRef
 */
export function useTextParticles(canvasRef) {
  const cv = canvasRef.value
  if (!cv) return { destroy() {} }
  if (prefersReducedMotion()) return { destroy() {} }

  const ctx = cv.getContext('2d')
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  let W = 0
  let H = 0
  let parts = []

  const build = () => {
    W = cv.clientWidth
    H = cv.clientHeight
    cv.width = W * dpr
    cv.height = H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    const off = document.createElement('canvas')
    off.width = W
    off.height = H
    const o = off.getContext('2d')
    o.fillStyle = '#fff'
    o.textAlign = 'center'
    o.textBaseline = 'middle'
    const fs = Math.max(28, Math.min(62, W * 0.24))
    o.font = `700 ${fs}px Sora, sans-serif`
    o.fillText('FRONT', W / 2, H / 2 - fs * 0.45)
    o.fillText('END', W / 2, H / 2 + fs * 0.45)
    const data = o.getImageData(0, 0, W, H).data
    parts = []
    const step = 4
    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        if (data[(y * W + x) * 4 + 3] > 128) {
          parts.push({
            ox: x,
            oy: y,
            x: x + (Math.random() - 0.5) * 60,
            y: y + (Math.random() - 0.5) * 60,
            vx: 0,
            vy: 0,
          })
        }
      }
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
  const R = 62
  const R2 = R * R

  const tick = () => {
    if (!alive) return
    const rect = cv.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#7dd3fc'
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i]
        const dx = p.x - mx
        const dy = p.y - my
        const d2 = dx * dx + dy * dy
        if (d2 < R2 && d2 > 0.01) {
          const d = Math.sqrt(d2)
          const f = (1 - d / R) * 5.4
          p.vx += (dx / d) * f
          p.vy += (dy / d) * f
        }
        p.vx += (p.ox - p.x) * 0.055
        p.vy += (p.oy - p.y) * 0.055
        p.vx *= 0.86
        p.vy *= 0.86
        p.x += p.vx
        p.y += p.vy
        const sp = Math.min(1, (Math.abs(p.vx) + Math.abs(p.vy)) / 7)
        ctx.globalAlpha = 0.45 + sp * 0.55
        ctx.fillRect(p.x, p.y, 1.9, 1.9)
      }
      ctx.globalAlpha = 1
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
