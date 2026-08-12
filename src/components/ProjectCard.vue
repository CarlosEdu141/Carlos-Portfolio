<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ImagePlaceholder from './ImagePlaceholder.vue'
import ChipList from './ChipList.vue'
import { useProjectTilt } from '../composables/useProjectTilt.js'

const props = defineProps({
  project: { type: Object, required: true },
  featured: { type: Boolean, default: false },
})

const cardEl = ref(null)
const veilEl = ref(null)
const scanEl = ref(null)

let tilt = null

onMounted(() => {
  tilt = useProjectTilt(cardEl, veilEl, scanEl)
})

onUnmounted(() => {
  tilt?.destroy()
})
</script>

<template>
  <a :href="project.href" ref="cardEl" class="card" :class="{ featured, standard: !featured }" v-reveal>
    <template v-if="featured">
      <div class="text-panel">
        <div>
          <div class="meta-row">
            <span class="tag">{{ project.tag }}</span>
            <span class="period">{{ project.period }}</span>
          </div>
          <h3 class="title-featured">{{ project.title }}</h3>
          <p class="description-featured">{{ project.description }}</p>
        </div>
        <ChipList :items="project.stack" variant="tag" class="stack-row" />
      </div>
      <div class="shot shot-featured">
        <img v-if="project.image" :src="project.image" :alt="`Ilustração do projeto ${project.title}`" class="cover-img" />
        <ImagePlaceholder v-else label="Print do projeto" />
        <div class="veil" ref="veilEl" aria-hidden="true"></div>
        <div class="scan" ref="scanEl" aria-hidden="true"></div>
      </div>
    </template>
    <template v-else>
      <div class="shot shot-standard" :style="project.iconBg ? { background: project.iconBg } : null">
        <img
          v-if="project.icon"
          :src="project.icon"
          alt=""
          class="icon-img"
          :style="{ mixBlendMode: project.iconBlend || 'normal' }"
        />
        <ImagePlaceholder v-else :label="`Print — ${project.title}`" />
        <div class="veil" ref="veilEl" aria-hidden="true"></div>
        <div class="scan scan-small" ref="scanEl" aria-hidden="true"></div>
      </div>
      <div class="body">
        <div class="meta-row-card">
          <span class="tag">{{ project.tag }}</span>
          <span v-if="project.role" class="role">{{ project.role }}</span>
        </div>
        <h3 class="title-card">{{ project.title }}</h3>
        <p class="description-card">{{ project.description }}</p>
        <ChipList v-if="project.stack" :items="project.stack" variant="tag" class="stack-row stack-row-card" />
      </div>
    </template>
  </a>
</template>

<style scoped>
.card {
  position: relative;
  border-radius: var(--radius-card);
  overflow: hidden;
  background: var(--bg-card);
  color: inherit;
  display: block;
  transform-style: preserve-3d;
}

.card.featured {
  grid-column: span 2;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.8fr);
  border: 1px solid var(--border-card-strong);
  transition: border-color 0.3s ease;
}

.card.featured:hover,
.card.featured:focus-visible {
  border-color: rgba(var(--accent-rgb), 0.42);
}

.card.standard {
  display: flex;
  flex-direction: column;
  min-height: 300px;
  border: 1px solid var(--border-card-strong);
  transition: border-color 0.3s ease;
}

.card.standard:hover,
.card.standard:focus-visible {
  border-color: rgba(var(--accent-rgb), 0.42);
}

.text-panel {
  padding: 44px 44px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font: 400 10.5px/1 var(--font-mono);
  letter-spacing: 0.14em;
  color: var(--accent);
}

.tag {
  padding: 5px 9px;
  background: rgba(14, 165, 233, 0.14);
  border-radius: 4px;
}

.period {
  color: var(--text-ghost);
}

.title-featured {
  margin: 24px 0 0;
  font: 600 38px/1.1 var(--font-sora);
  letter-spacing: -0.03em;
  color: var(--text-bright);
}

.description-featured {
  margin: 18px 0 0;
  max-width: 480px;
  font: 300 16px/1.68 var(--font-sora);
  color: var(--text-muted);
}

.stack-row {
  margin-top: 36px;
}

.shot {
  position: relative;
  overflow: hidden;
}

.shot-featured {
  min-height: 320px;
  border-left: 1px solid var(--border-inner);
}

.shot-standard {
  height: 170px;
  border-bottom: 1px solid var(--border-inner);
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-img {
  width: 45%;
  max-width: 130px;
  height: auto;
  object-fit: contain;
}

.cover-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.veil {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(120deg, rgba(6, 7, 10, 0.55), rgba(37, 99, 235, 0.24));
  backdrop-filter: grayscale(1) contrast(1.1);
  transition: opacity 0.4s ease;
}

.shot-standard .veil {
  background: linear-gradient(120deg, rgba(6, 7, 10, 0.5), rgba(37, 99, 235, 0.2));
}

.scan {
  position: absolute;
  left: 0;
  right: 0;
  height: 22%;
  pointer-events: none;
  background: linear-gradient(180deg, transparent, rgba(56, 189, 248, 0.18), transparent);
  opacity: 0;
}

.scan-small {
  height: 26%;
}

.body {
  padding: 26px 26px 28px;
}

.meta-row-card {
  display: flex;
  align-items: center;
  gap: 10px;
  font: 400 10.5px/1 var(--font-mono);
  letter-spacing: 0.14em;
  color: var(--accent);
}

.role {
  color: var(--text-ghost);
  text-transform: none;
  letter-spacing: 0.02em;
}

.title-card {
  margin: 14px 0 0;
  font: 500 23px/1.2 var(--font-sora);
  letter-spacing: -0.02em;
  color: var(--chip-text);
}

.description-card {
  margin: 12px 0 0;
  font: 300 14.5px/1.65 var(--font-sora);
  color: var(--text-dim);
}

.stack-row-card {
  margin-top: 16px;
}

@media (max-width: 1024px) {
  .card.featured {
    grid-column: span 1;
    grid-template-columns: minmax(0, 1fr);
  }
  .shot-featured {
    border-left: none;
    border-top: 1px solid var(--border-inner);
    min-height: 220px;
  }
}
</style>
