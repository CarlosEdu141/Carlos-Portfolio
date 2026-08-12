<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SectionLabel from './SectionLabel.vue'
import StatGrid from './StatGrid.vue'
import TimelineItem from './TimelineItem.vue'
import ChipList from './ChipList.vue'
import { profile } from '../data/profile.js'
import { timeline } from '../data/timeline.js'
import { useCursorMask } from '../composables/useCursorMask.js'

const photoWrap = ref(null)
const photoVeil = ref(null)
const photoRing = ref(null)

let mask = null

onMounted(() => {
  mask = useCursorMask(photoWrap, photoVeil, photoRing, 110)
})

onUnmounted(() => {
  mask?.destroy()
})
</script>

<template>
  <section id="bio" class="bio">
    <div class="content-max">
      <SectionLabel number="01" text="QUEM EU SOU" style="margin-bottom: 44px" />
      <div class="grid">
        <div class="left">
          <p class="lead" v-reveal>{{ profile.bio.lead }}</p>
          <p class="body" v-reveal>{{ profile.bio.body }}</p>
          <div style="margin-top: 52px">
            <StatGrid :stats="profile.stats" />
          </div>
          <div class="trajectory" v-reveal>
            <div class="trajectory-label">TRAJETÓRIA</div>
            <div class="trajectory-list">
              <TimelineItem
                v-for="(item, i) in timeline"
                :key="item.date"
                :item="item"
                :is-last="i === timeline.length - 1"
              />
            </div>
          </div>
        </div>

        <div class="right" v-reveal>
          <div class="photo-wrap" ref="photoWrap">
            <img :src="profile.bio.photo.url" :alt="profile.bio.photo.alt" class="photo" />
            <div class="veil" ref="photoVeil" aria-hidden="true"></div>
            <div class="ring" ref="photoRing" aria-hidden="true"></div>
          </div>

          <div class="panel">
            <div class="panel-label">STACK</div>
            <ChipList :items="profile.stack" variant="solid" />
            <div class="divider"></div>
            <div class="panel-label" style="margin-bottom: 16px">APRENDENDO</div>
            <ChipList :items="profile.learning" variant="dashed" />
            <div class="divider"></div>
            <div v-for="lang in profile.languages" :key="lang.name" class="language-row">
              <span>{{ lang.name }}</span><span class="value">{{ lang.level }}</span>
            </div>
          </div>

          <div class="panel">
            <div class="panel-label">FORMAÇÃO</div>
            <div class="course">{{ profile.education.course }}</div>
            <div class="school">{{ profile.education.school }}<br />{{ profile.education.period }}</div>
          </div>

          <a :href="profile.resume.url" :download="profile.resume.filename" v-magnetic class="resume-link">
            <svg class="resume-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <path d="M12 3v12m0 0-4-4m4 4 4-4" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Baixar currículo (PDF)
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bio {
  position: relative;
  padding: var(--section-padding);
  border-top: 1px solid var(--border-section);
}

.content-max {
  max-width: var(--content-max);
  margin: 0 auto;
}

.grid {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr);
  gap: 72px;
  align-items: start;
}

.left {
  min-width: 0;
}

.lead {
  margin: 0;
  font: 300 clamp(22px, 2.2vw, 30px) / 1.5 var(--font-sora);
  color: var(--text-soft);
}

.body {
  margin: 26px 0 0;
  max-width: 620px;
  font: 300 17px/1.72 var(--font-sora);
  color: var(--text-muted);
}

.trajectory {
  margin-top: 56px;
}

.trajectory-label {
  font: 400 10.5px/1 var(--font-mono);
  letter-spacing: 0.16em;
  color: var(--text-ghost);
  margin-bottom: 22px;
}

.trajectory-list {
  display: flex;
  flex-direction: column;
}

.right {
  position: sticky;
  top: 110px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.photo-wrap {
  position: relative;
  height: 380px;
  border-radius: var(--radius-panel);
  overflow: hidden;
  border: 1px solid var(--border-card-strong);
}

.photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
}

.veil {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: var(--veil-photo);
  backdrop-filter: grayscale(1) contrast(1.08);
}

.ring {
  position: absolute;
  left: -400px;
  top: -400px;
  width: 200px;
  height: 200px;
  margin: -100px 0 0 -100px;
  border-radius: 50%;
  border: 1px solid rgba(var(--accent-light-rgb), 0.45);
  pointer-events: none;
}

.panel {
  border: 1px solid var(--border-card);
  border-radius: var(--radius-panel);
  padding: 24px;
  background: var(--bg-alt);
}

.panel-label {
  font: 400 10.5px/1 var(--font-mono);
  letter-spacing: 0.16em;
  color: var(--text-ghost);
  margin-bottom: 18px;
}

.divider {
  height: 1px;
  background: var(--border-card);
  margin: 22px 0;
}

.language-row {
  display: flex;
  justify-content: space-between;
  font: 400 11.5px/1.8 var(--font-mono);
  color: var(--text-faint);
}

.language-row .value {
  color: var(--chip-text);
}

.course {
  font: 500 15px/1.45 var(--font-sora);
  color: var(--text);
}

.school {
  margin-top: 6px;
  font: 400 12px/1.7 var(--font-mono);
  color: var(--text-faint);
}

.resume-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 14px 20px;
  border: 1px solid rgba(var(--accent-light-rgb), 0.24);
  border-radius: var(--radius-pill);
  font: 400 12.5px/1 var(--font-mono);
  letter-spacing: 0.04em;
  color: var(--chip-text);
  transition: border-color 0.25s ease, color 0.25s ease;
}

.resume-link:hover,
.resume-link:focus-visible {
  border-color: var(--accent);
  color: var(--accent);
}

.resume-icon {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .right {
    position: static;
  }
}

@media (max-width: 768px) {
  .bio {
    padding: 88px 20px 80px;
  }
}
</style>
