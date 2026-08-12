<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCustomCursor } from '../composables/useCustomCursor.js'

const dot = ref(null)
const ring = ref(null)
let cursor = null

onMounted(() => {
  cursor = useCustomCursor(dot, ring)
})

onUnmounted(() => {
  cursor?.destroy()
})
</script>

<template>
  <div ref="dot" class="cursor-dot" aria-hidden="true"></div>
  <div ref="ring" class="cursor-ring" aria-hidden="true"></div>
</template>

<style scoped>
.cursor-dot {
  position: fixed;
  left: 0;
  top: 0;
  width: 9px;
  height: 9px;
  margin: -4.5px 0 0 -4.5px;
  border-radius: 50%;
  background: var(--accent-strong);
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: screen;
  opacity: 0;
}

.cursor-ring {
  position: fixed;
  left: 0;
  top: 0;
  width: 38px;
  height: 38px;
  margin: -19px 0 0 -19px;
  border-radius: 50%;
  border: 1px solid rgba(var(--accent-rgb), 0.42);
  pointer-events: none;
  z-index: 9998;
  opacity: 0;
}

@media (hover: none) {
  .cursor-dot,
  .cursor-ring {
    display: none;
  }
}
</style>
