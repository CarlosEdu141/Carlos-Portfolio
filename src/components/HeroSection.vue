<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { profile } from '../data/profile.js'
import { useParticleField } from '../composables/useParticleField.js'

const props = defineProps({
  particleDensity: { type: Number, default: 1 },
})

const sectionEl = ref(null)
const canvasEl = ref(null)

let particleField = null

onMounted(() => {
  // Efeito A é caro: reduz a densidade da malha em telas estreitas.
  const density = window.matchMedia('(max-width: 900px)').matches ? 0.6 : props.particleDensity
  particleField = useParticleField(canvasEl, sectionEl, { density, color: '#38bdf8' })
})

onUnmounted(() => {
  particleField?.destroy()
})
</script>

<template>
  <section id="inicio" class="hero" ref="sectionEl">
    <canvas id="pcanvas" ref="canvasEl" class="pcanvas" aria-hidden="true"></canvas>
    <div class="vignette" aria-hidden="true"></div>
    <div class="content">
      <div data-hero class="badge">
        <span class="dot" aria-hidden="true"></span>{{ profile.available }}
      </div>
      <h1 data-hero class="title">
        {{ profile.name.first }}<br />
        <span class="accent-text">{{ profile.name.last }}</span>
      </h1>
      <p data-hero class="lead">{{ profile.role }}</p>
      <div data-hero class="actions">
        <a href="#projetos" v-magnetic class="btn-primary">Ver projetos</a>
        <a href="#contato" v-magnetic class="btn-secondary">Falar comigo</a>
      </div>
    </div>
    <div class="meta-left">
      <span v-for="item in profile.heroMeta.left" :key="item">{{ item }}</span>
    </div>
    <div class="meta-right">{{ profile.heroMeta.right }}</div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  min-height: 720px;
  overflow: hidden;
  background: var(--gradient-hero-bg);
}

.pcanvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: var(--gradient-hero-vignette);
}

.content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  pointer-events: none;
  padding: 0 40px;
}

.badge {
  display: flex;
  align-items: center;
  gap: 9px;
  font: 400 11px/1 var(--font-mono);
  letter-spacing: 0.16em;
  color: var(--accent);
  margin-bottom: 30px;
}

.badge .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-strong);
  animation: blink 1.8s infinite;
}

.title {
  margin: 0;
  font: 200 clamp(48px, 7.2vw, 104px) / 0.94 var(--font-sora);
  letter-spacing: -0.045em;
  color: var(--text-bright);
}

.accent-text {
  font-weight: 700;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.lead {
  margin: 30px 0 0;
  max-width: 660px;
  font: 300 clamp(15px, 1.35vw, 19px) / 1.6 var(--font-sora);
  color: #9fb0c2;
}

.actions {
  display: flex;
  gap: 12px;
  margin-top: 38px;
  pointer-events: auto;
}

.btn-primary,
.btn-secondary {
  padding: 14px 24px;
  border-radius: var(--radius-btn);
  font-family: var(--font-sora);
  line-height: 1;
}

.btn-primary {
  background: var(--accent-strong);
  color: var(--on-accent);
  font-weight: 600;
  font-size: 13px;
}

.btn-secondary {
  border: 1px solid rgba(var(--accent-light-rgb), 0.28);
  color: var(--chip-text);
  font-weight: 400;
  font-size: 13px;
}

.meta-left,
.meta-right {
  position: absolute;
  bottom: 30px;
  font: 400 10.5px/1 var(--font-mono);
  letter-spacing: 0.1em;
  color: var(--text-ghost);
}

.meta-left {
  left: 40px;
  display: flex;
  gap: 26px;
}

.meta-right {
  right: 40px;
}

@media (max-width: 768px) {
  .meta-left,
  .meta-right {
    display: none;
  }
}
</style>
