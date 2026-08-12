import { animate } from 'motion'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default {
  mounted(el) {
    if (prefersReducedMotion()) return

    const onEnter = () => animate(el, { scale: 1.045 }, { duration: 0.35, easing: [0.2, 0.8, 0.2, 1] })
    const onLeave = () => animate(el, { scale: 1, x: 0, y: 0 }, { duration: 0.5, easing: [0.2, 0.8, 0.2, 1] })
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height
      animate(el, { x: dx * 12, y: dy * 8 }, { duration: 0.3, easing: 'ease-out' })
    }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    el.__magneticCleanup = () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  },
  unmounted(el) {
    el.__magneticCleanup?.()
    delete el.__magneticCleanup
  },
}
