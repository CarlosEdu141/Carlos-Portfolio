<script setup>
import SectionLabel from './SectionLabel.vue'
import ProjectCard from './ProjectCard.vue'
import { featuredProject, secondaryProjects } from '../data/projects.js'
import { profile } from '../data/profile.js'
</script>

<template>
  <section id="projetos" class="projects">
    <div class="content-max">
      <SectionLabel number="03" text="PROJETOS" style="margin-bottom: 20px" />
      <h2 v-reveal class="title">O que eu <span class="accent-text">construí</span></h2>
      <div class="grid">
        <ProjectCard :project="featuredProject" featured />
        <ProjectCard v-for="p in secondaryProjects" :key="p.title" :project="p" />
      </div>
      <div class="footer" v-reveal>
        <span class="line" aria-hidden="true"></span>
        <a :href="profile.contact.github.url" target="_blank" rel="noopener" v-magnetic class="pill">
          github.com/{{ profile.contact.github.user }} →
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects {
  position: relative;
  padding: var(--section-padding);
  border-top: 1px solid var(--border-section);
  background: var(--bg-alt);
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
  color: var(--accent);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.footer {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 34px;
  font: 400 12px/1 var(--font-mono);
  color: var(--text-ghost);
}

.footer .line {
  flex: 1;
  height: 1px;
  background: var(--border-card);
}

.pill {
  padding: 12px 20px;
  border: 1px solid rgba(var(--accent-light-rgb), 0.24);
  border-radius: var(--radius-pill);
  color: var(--chip-text);
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 768px) {
  .projects {
    padding: 88px 20px 80px;
  }
}
</style>
