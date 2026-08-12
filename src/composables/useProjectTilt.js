import { gsap } from 'gsap'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Project card hover (Efeito D): 3D tilt, veil de-saturation, and a
 * repeating scanline sweep over the image while hovered.
 *
 * @param {import('vue').Ref<HTMLElement|null>} cardRef
 * @param {import('vue').Ref<HTMLElement|null>} veilRef
 * @param {import('vue').Ref<HTMLElement|null>} scanRef
 */
export function useProjectTilt(cardRef, veilRef, scanRef) {
  const card = cardRef.value
  const veil = veilRef?.value
  const scan = scanRef?.value
  if (!card) return { destroy() {} }
  if (prefersReducedMotion()) return { destroy() {} }

  let timer = 0

  const onEnter = () => {
    if (veil) {
      veil.style.backdropFilter = 'grayscale(0) contrast(1.05) saturate(1.12)'
      veil.style.opacity = '.45'
    }
    if (scan) {
      const run = () => gsap.fromTo(scan, { opacity: 1, y: '-120%' }, { y: '460%', opacity: 0, duration: 1.1, ease: 'none' })
      run()
      timer = setInterval(run, 1500)
    }
  }

  const onLeave = () => {
    if (veil) {
      veil.style.backdropFilter = 'grayscale(1) contrast(1.1)'
      veil.style.opacity = '1'
    }
    clearInterval(timer)
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' })
    if (scan) gsap.set(scan, { opacity: 0 })
  }

  const onMove = (e) => {
    const r = card.getBoundingClientRect()
    const nx = (e.clientX - (r.left + r.width / 2)) / r.width
    const ny = (e.clientY - (r.top + r.height / 2)) / r.height
    gsap.to(card, { rotateY: nx * 4.5, rotateX: -ny * 4.5, transformPerspective: 1100, duration: 0.4, ease: 'power2.out' })
  }

  card.addEventListener('mouseenter', onEnter)
  card.addEventListener('mousemove', onMove)
  card.addEventListener('mouseleave', onLeave)

  const destroy = () => {
    clearInterval(timer)
    card.removeEventListener('mouseenter', onEnter)
    card.removeEventListener('mousemove', onMove)
    card.removeEventListener('mouseleave', onLeave)
  }

  return { destroy }
}
