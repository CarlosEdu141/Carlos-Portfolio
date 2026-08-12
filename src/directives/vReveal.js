import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default {
  mounted(el) {
    if (prefersReducedMotion()) return
    el.__revealTween = gsap.fromTo(
      el,
      { y: 34, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    )
  },
  unmounted(el) {
    const tween = el.__revealTween
    if (!tween) return
    tween.scrollTrigger?.kill()
    tween.kill()
    delete el.__revealTween
  },
}
