<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SectionLabel from './SectionLabel.vue'
import ImagePlaceholder from './ImagePlaceholder.vue'
import { useTextParticles } from '../composables/useTextParticles.js'
import { useMagneticGrid } from '../composables/useMagneticGrid.js'
import { useCursorMask } from '../composables/useCursorMask.js'

const textCanvas = ref(null)
const gridCanvas = ref(null)
const maskWrap = ref(null)
const maskVeil = ref(null)
const maskRing = ref(null)

const libraries = ['three.js', 'GSAP + ScrollTrigger', 'Lenis', 'Motion (Framer Motion)', 'Canvas 2D']

let textParticles = null
let magneticGrid = null
let cursorMask = null

onMounted(() => {
  textParticles = useTextParticles(textCanvas)
  magneticGrid = useMagneticGrid(gridCanvas)
  cursorMask = useCursorMask(maskWrap, maskVeil, maskRing, 150)
})

onUnmounted(() => {
  textParticles?.destroy()
  magneticGrid?.destroy()
  cursorMask?.destroy()
})
</script>

<template>
  <section id="lab" class="lab">
    <div class="content-max">
      <SectionLabel number="04" text="LABORATÓRIO" style="margin-bottom: 20px" />
      <h2 v-reveal class="title">Efeitos que eu <span class="accent-text">escrevo</span></h2>
      <p v-reveal class="lead">Três demos rodando de verdade nesta página. Interaja com cada uma.</p>

      <div class="grid">
        <div class="card" v-reveal>
          <canvas ref="textCanvas" class="canvas" aria-hidden="true"></canvas>
          <div class="body">
            <div class="tag">CANVAS 2D · PARTÍCULAS</div>
            <h3 class="card-title">Texto que se desfaz</h3>
            <p class="card-description">O cursor empurra as partículas; molas trazem cada uma de volta ao lugar.</p>
          </div>
        </div>

        <div class="card" v-reveal>
          <div class="mask-area" ref="maskWrap">
            <ImagePlaceholder label="Arraste uma imagem" />
            <div class="veil" ref="maskVeil" aria-hidden="true"></div>
            <div class="ring" ref="maskRing" aria-hidden="true"></div>
            <div class="hint">MOVA O CURSOR</div>
          </div>
          <div class="body">
            <div class="tag">CSS MASK · RAF</div>
            <h3 class="card-title">Máscara no cursor</h3>
            <p class="card-description">Um véu duotone azul com furo radial interpolado a cada frame.</p>
          </div>
        </div>

        <div class="card" v-reveal>
          <canvas ref="gridCanvas" class="canvas" aria-hidden="true"></canvas>
          <div class="body">
            <div class="tag">CAMPO VETORIAL</div>
            <h3 class="card-title">Grid magnético</h3>
            <p class="card-description">Cada ponto se desloca e muda de tamanho conforme a distância do mouse.</p>
          </div>
        </div>
      </div>

      <div class="libraries" v-reveal>
        <span v-for="lib in libraries" :key="lib" class="lib-chip">{{ lib }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.lab {
  position: relative;
  padding: var(--section-padding);
  border-top: 1px solid var(--border-section);
}

.content-max {
  max-width: var(--content-max);
  margin: 0 auto;
}

.title {
  margin: 0 0 14px;
  font: 200 clamp(34px, 4vw, 58px) / 1.05 var(--font-sora);
  letter-spacing: -0.035em;
  color: var(--text-bright);
}

.accent-text {
  font-weight: 600;
  color: var(--accent);
}

.lead {
  margin: 0 0 52px;
  max-width: 560px;
  font: 300 16px/1.7 var(--font-sora);
  color: var(--text-muted);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.card {
  border: 1px solid var(--border-card-strong);
  border-radius: var(--radius-card);
  overflow: hidden;
  background: var(--bg-card);
}

.canvas {
  display: block;
  width: 100%;
  height: 280px;
  cursor: crosshair;
}

.mask-area {
  position: relative;
  height: 280px;
  overflow: hidden;
}

.veil {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(150deg, rgba(4, 10, 18, 0.5), rgba(37, 99, 235, 0.34) 60%, rgba(14, 165, 233, 0.26));
  backdrop-filter: grayscale(1) contrast(1.1) brightness(0.88);
}

.ring {
  position: absolute;
  left: -400px;
  top: -400px;
  width: 170px;
  height: 170px;
  margin: -85px 0 0 -85px;
  border-radius: 50%;
  border: 1px solid rgba(var(--accent-light-rgb), 0.5);
  pointer-events: none;
}

.hint {
  position: absolute;
  left: 16px;
  bottom: 14px;
  font: 400 10px/1 var(--font-mono);
  letter-spacing: 0.1em;
  color: rgba(226, 240, 252, 0.6);
  pointer-events: none;
}

.body {
  padding: 22px 24px 26px;
  border-top: 1px solid var(--border-inner);
}

.tag {
  font: 400 10.5px/1 var(--font-mono);
  letter-spacing: 0.14em;
  color: var(--accent);
}

.card-title {
  margin: 12px 0 0;
  font: 500 20px/1.25 var(--font-sora);
  color: var(--text);
}

.card-description {
  margin: 10px 0 0;
  font: 300 14px/1.6 var(--font-sora);
  color: var(--text-dim);
}

.libraries {
  margin-top: 26px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font: 400 11px/1 var(--font-mono);
  letter-spacing: 0.08em;
}

.lib-chip {
  padding: 9px 14px;
  border: 1px solid var(--border-chip-lab);
  border-radius: 6px;
  color: var(--text-muted);
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 768px) {
  .lab {
    padding: 88px 20px 80px;
  }
}
</style>
