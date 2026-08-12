import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Global smooth-scroll (Lenis, driving GSAP's ScrollTrigger) plus the hero
 * entrance stagger. Ported from bootLenis() / the [data-hero] part of
 * bootScroll() in the reference prototype. Per-element scroll reveals live
 * in the v-reveal directive instead.
 */
export function useSmoothScroll() {
  const cleanups = []

  if (!prefersReducedMotion()) {
    const heroEls = document.querySelectorAll('[data-hero]')
    if (heroEls.length) {
      gsap.fromTo(
        heroEls,
        { y: 30, opacity: 0, filter: 'blur(7px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.15, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      )
    }

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.95 })
    let raf = 0
    let alive = true
    const loop = (t) => {
      if (!alive) return
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    lenis.on('scroll', ScrollTrigger.update)

    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (!id || id.length < 2) return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -70, duration: 1.35 })
    }
    document.addEventListener('click', onClick)

    cleanups.push(() => {
      alive = false
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onClick)
      lenis.destroy()
    })
  }

  cleanups.push(() => ScrollTrigger.getAll().forEach((s) => s.kill()))

  const destroy = () => cleanups.forEach((fn) => fn())

  return { destroy }
}
