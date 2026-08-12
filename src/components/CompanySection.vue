<script setup>
import SectionLabel from './SectionLabel.vue'
import ChipList from './ChipList.vue'
import { company } from '../data/company.js'

const wolfIconUrl = `${import.meta.env.BASE_URL}FenrysIcon.webp`
</script>

<template>
  <section id="empresa" class="company">
    <div class="content-max">
      <SectionLabel number="02" text="MINHA EMPRESA" style="margin-bottom: 20px" />
      <h2 v-reveal class="title">
        Também construo a <span class="accent-text">{{ company.name }}</span>
      </h2>

      <div class="grid">
        <div class="text-col" v-reveal>
          <div class="wordmark">
            <img :src="wolfIconUrl" alt="" class="wolf" aria-hidden="true" />
            <span class="name">{{ company.name.split(' ')[0] }}<span class="name-sub">TECH</span></span>
          </div>
          <p class="tagline">{{ company.tagline }}</p>
          <p class="description">{{ company.description }}</p>
          <div class="meta-row">
            <span>{{ company.role }}</span>
            <span class="dot" aria-hidden="true"></span>
            <span>{{ company.location }}</span>
            <span class="dot" aria-hidden="true"></span>
            <span>{{ company.founded }}</span>
          </div>
          <div class="actions">
            <a :href="company.website.url" target="_blank" rel="noopener" v-magnetic class="btn-primary">
              {{ company.website.display }} ↗
            </a>
            <a :href="company.instagram.url" target="_blank" rel="noopener" v-magnetic class="btn-secondary">
              {{ company.instagram.display }}
            </a>
          </div>
        </div>

        <div class="services-col" v-reveal>
          <div class="panel-label">SERVIÇOS</div>
          <ChipList :items="company.services" variant="tag" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.company {
  position: relative;
  padding: var(--section-padding);
  border-top: 1px solid var(--border-section);
}

.content-max {
  max-width: var(--content-max);
  margin: 0 auto;
}

.title {
  margin: 0 0 56px;
  font: 200 clamp(34px, 4vw, 58px) / 1.05 var(--font-sora);
  letter-spacing: -0.035em;
  color: var(--text-bright);
}

.accent-text {
  font-weight: 600;
  background: var(--gradient-fenrys);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.6fr);
  gap: 56px;
  align-items: start;
}

.wordmark {
  display: flex;
  align-items: center;
  gap: 12px;
}

.wolf {
  width: 34px;
  height: 34px;
  object-fit: contain;
  flex-shrink: 0;
  filter: drop-shadow(0 0 10px rgba(var(--brand-fenrys-rgb), 0.35));
}

.name {
  font: 700 20px/1 var(--font-sora);
  letter-spacing: -0.01em;
  color: var(--text-bright);
}

.name-sub {
  display: block;
  margin-top: 3px;
  font: 500 10px/1 var(--font-mono);
  letter-spacing: 0.18em;
  background: var(--gradient-fenrys);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.tagline {
  margin: 28px 0 0;
  font: 300 clamp(20px, 2vw, 26px) / 1.4 var(--font-sora);
  color: var(--text-soft);
}

.description {
  margin: 18px 0 0;
  max-width: 560px;
  font: 300 16px/1.7 var(--font-sora);
  color: var(--text-muted);
}

.meta-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 26px;
  font: 400 11.5px/1 var(--font-mono);
  letter-spacing: 0.08em;
  color: var(--text-faint);
}

.meta-row .dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--text-ghost);
}

.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 34px;
}

.btn-primary,
.btn-secondary {
  padding: 13px 22px;
  border-radius: var(--radius-btn);
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.04em;
  line-height: 1;
}

.btn-primary {
  background: var(--gradient-fenrys);
  color: #f5f3ff;
  font-weight: 500;
}

.btn-secondary {
  border: 1px solid rgba(var(--brand-fenrys-rgb), 0.35);
  color: var(--chip-text);
  font-weight: 400;
}

.services-col {
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

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 768px) {
  .company {
    padding: 88px 20px 80px;
  }
}
</style>
