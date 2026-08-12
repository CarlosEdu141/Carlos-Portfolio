<script setup>
import { onMounted, onUnmounted } from 'vue'
import TheNav from './components/TheNav.vue'
import TheCursor from './components/TheCursor.vue'
import HeroSection from './components/HeroSection.vue'
import BioSection from './components/BioSection.vue'
import CompanySection from './components/CompanySection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import LabSection from './components/LabSection.vue'
import ContactSection from './components/ContactSection.vue'
import { useSmoothScroll } from './composables/useSmoothScroll.js'

let scroll = null

onMounted(() => {
  scroll = useSmoothScroll()
})

onUnmounted(() => {
  scroll?.destroy()
})
</script>

<template>
  <TheCursor />
  <TheNav />
  <main>
    <HeroSection />
    <BioSection />
    <CompanySection />
    <ProjectsSection />
    <LabSection />
    <ContactSection />
  </main>
</template>
