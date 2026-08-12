const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Radial cursor mask over a duotone veil (Efeito B). Ported from bootMask().
 *
 * @param {import('vue').Ref<HTMLElement|null>} wrapRef
 * @param {import('vue').Ref<HTMLElement|null>} veilRef
 * @param {import('vue').Ref<HTMLElement|null>} ringRef
 * @param {number} radius
 */
export function useCursorMask(wrapRef, veilRef, ringRef, radius) {
  const wrap = wrapRef.value
  const veil = veilRef.value
  const ring = ringRef?.value
  if (!wrap || !veil) return { destroy() {} }
  if (prefersReducedMotion()) return { destroy() {} }

  let x = -500
  let y = -500
  let sx = -500
  let sy = -500
  let raf = 0
  let alive = true

  const onMove = (e) => {
    const r = wrap.getBoundingClientRect()
    x = e.clientX - r.left
    y = e.clientY - r.top
  }
  const onLeave = () => {
    x = -500
    y = -500
  }
  wrap.addEventListener('mousemove', onMove)
  wrap.addEventListener('mouseleave', onLeave)

  const tick = () => {
    if (!alive) return
    sx += (x - sx) * 0.14
    sy += (y - sy) * 0.14
    const m = `radial-gradient(circle ${radius}px at ${sx.toFixed(1)}px ${sy.toFixed(1)}px,transparent 0%,transparent 54%,#000 100%)`
    veil.style.webkitMaskImage = m
    veil.style.maskImage = m
    if (ring) {
      ring.style.left = `${sx}px`
      ring.style.top = `${sy}px`
    }
    raf = requestAnimationFrame(tick)
  }
  tick()

  const destroy = () => {
    alive = false
    cancelAnimationFrame(raf)
    wrap.removeEventListener('mousemove', onMove)
    wrap.removeEventListener('mouseleave', onLeave)
  }

  return { destroy }
}
