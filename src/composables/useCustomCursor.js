const supportsHover = () => window.matchMedia('(hover: hover)').matches

/**
 * Custom dot + ring cursor (Efeito F). Ported from bootCursor(). Skipped
 * entirely on touch devices via matchMedia('(hover: hover)').
 *
 * @param {import('vue').Ref<HTMLElement|null>} dotRef
 * @param {import('vue').Ref<HTMLElement|null>} ringRef
 */
export function useCustomCursor(dotRef, ringRef) {
  const dot = dotRef.value
  const ring = ringRef.value
  if (!dot || !ring) return { destroy() {} }
  if (!supportsHover()) return { destroy() {} }

  let x = -100
  let y = -100
  let rx = -100
  let ry = -100
  let raf = 0
  let alive = true
  let big = false

  const onMove = (e) => {
    x = e.clientX
    y = e.clientY
    dot.style.opacity = '1'
    ring.style.opacity = '1'
  }
  const onOver = (e) => {
    const t = e.target
    big = !!(t.closest && t.closest('a, button, canvas, [data-cursor-target]'))
  }
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseover', onOver)

  const tick = () => {
    if (!alive) return
    rx += (x - rx) * 0.16
    ry += (y - ry) * 0.16
    dot.style.transform = `translate(${x}px,${y}px)`
    ring.style.transform = `translate(${rx}px,${ry}px) scale(${big ? 1.7 : 1})`
    ring.style.borderColor = big ? 'rgba(125,211,252,.75)' : 'rgba(56,189,248,.42)'
    raf = requestAnimationFrame(tick)
  }
  tick()

  const destroy = () => {
    alive = false
    cancelAnimationFrame(raf)
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseover', onOver)
  }

  return { destroy }
}
