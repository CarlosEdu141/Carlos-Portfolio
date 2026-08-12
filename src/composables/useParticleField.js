import * as THREE from 'three'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Hero particle field (Efeito A). Ported 1:1 from the reference prototype's
 * bootParticles(): a wavy grid of points reacting to a raycast against the
 * ground plane, plus a sparse "deep" field and subtle camera parallax.
 *
 * @param {import('vue').Ref<HTMLCanvasElement|null>} canvasRef
 * @param {import('vue').Ref<HTMLElement|null>} sectionRef
 * @param {{ density?: number, color?: string }} options
 */
export function useParticleField(canvasRef, sectionRef, options = {}) {
  const cv = canvasRef.value
  const section = sectionRef.value
  if (!cv || !section) return { destroy() {} }
  if (prefersReducedMotion()) return { destroy() {} }

  const size = () => ({ w: cv.clientWidth || 1280, h: cv.clientHeight || 720 })
  let { w, h } = size()

  const renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(w, h, false)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(52, w / h, 0.1, 400)
  camera.position.set(0, 8.5, 30)
  camera.lookAt(0, 0.5, 0)

  const d = Math.max(0.5, Math.min(1.4, options.density ?? 1))
  const GX = Math.round(112 * d)
  const GY = Math.round(66 * d)
  const SX = 74
  const SY = 44
  const count = GX * GY

  const pos = new Float32Array(count * 3)
  const base = new Float32Array(count * 2)
  let i = 0
  for (let y = 0; y < GY; y++) {
    for (let x = 0; x < GX; x++) {
      const px = (x / (GX - 1) - 0.5) * SX
      const pz = (y / (GY - 1) - 0.5) * SY
      base[i * 2] = px
      base[i * 2 + 1] = pz
      pos[i * 3] = px
      pos[i * 3 + 1] = 0
      pos[i * 3 + 2] = pz
      i++
    }
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  const mat = new THREE.PointsMaterial({
    color: new THREE.Color(options.color || '#38bdf8'),
    size: 0.105,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const pts = new THREE.Points(geo, mat)
  scene.add(pts)

  const deepGeo = new THREE.BufferGeometry()
  const dc = 900
  const dpos = new Float32Array(dc * 3)
  for (let k = 0; k < dc; k++) {
    dpos[k * 3] = (Math.random() - 0.5) * 95
    dpos[k * 3 + 1] = Math.random() * 28 + 1
    dpos[k * 3 + 2] = (Math.random() - 0.5) * 62 - 10
  }
  deepGeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3))
  const deepMat = new THREE.PointsMaterial({
    color: 0x2563eb,
    size: 0.16,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const deep = new THREE.Points(deepGeo, deepMat)
  scene.add(deep)

  const ray = new THREE.Raycaster()
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
  const hit = new THREE.Vector3(999, 0, 999)
  const ndc = new THREE.Vector2()
  let tx = 0
  let ty = 0
  let cx = 0
  let cy = 0

  const onMove = (e) => {
    const r = section.getBoundingClientRect()
    const nx = ((e.clientX - r.left) / r.width) * 2 - 1
    const ny = -((e.clientY - r.top) / r.height) * 2 + 1
    tx = nx
    ty = ny
    ndc.set(nx, ny)
    ray.setFromCamera(ndc, camera)
    ray.ray.intersectPlane(plane, hit)
  }
  const onLeave = () => {
    hit.set(999, 0, 999)
    tx = 0
    ty = 0
  }
  window.addEventListener('mousemove', onMove)
  section.addEventListener('mouseleave', onLeave)

  const onResize = () => {
    const s = size()
    renderer.setSize(s.w, s.h, false)
    camera.aspect = s.w / s.h
    camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', onResize)

  const R = 8
  const R2 = R * R
  let t = 0
  let raf = 0
  let alive = true

  const tick = () => {
    if (!alive) return
    const rect = section.getBoundingClientRect()
    if (rect.bottom > 0) {
      t += 0.014
      cx += (tx - cx) * 0.05
      cy += (ty - cy) * 0.05
      const p = geo.attributes.position.array
      for (let k = 0; k < count; k++) {
        const bx = base[k * 2]
        const bz = base[k * 2 + 1]
        let y = Math.sin(bx * 0.22 + t) * 0.5 + Math.cos(bz * 0.19 - t * 0.8) * 0.5 + Math.sin((bx + bz) * 0.09 + t * 0.4) * 0.35
        const dx = bx - hit.x
        const dz = bz - hit.z
        const d2 = dx * dx + dz * dz
        if (d2 < R2) {
          const f = 1 - d2 / R2
          y += f * f * 4.2
        }
        p[k * 3 + 1] = y
      }
      geo.attributes.position.needsUpdate = true
      pts.rotation.y = cx * 0.09
      deep.rotation.y = -cx * 0.05
      camera.position.x = cx * 3.2
      camera.position.y = 8.5 - cy * 1.6
      camera.lookAt(0, 0.5, 0)
      renderer.render(scene, camera)
    }
    raf = requestAnimationFrame(tick)
  }
  tick()

  const destroy = () => {
    alive = false
    cancelAnimationFrame(raf)
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('resize', onResize)
    section.removeEventListener('mouseleave', onLeave)
    geo.dispose()
    deepGeo.dispose()
    mat.dispose()
    deepMat.dispose()
    renderer.dispose()
  }

  return { destroy }
}
