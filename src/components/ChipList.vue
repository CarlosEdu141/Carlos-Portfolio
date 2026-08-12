<script setup>
import { techColors } from '../data/techColors.js'

defineProps({
  items: { type: Array, required: true },
  variant: { type: String, default: 'solid' }, // 'solid' | 'dashed' | 'tag'
})
</script>

<template>
  <div class="chip-list">
    <span
      v-for="item in items"
      :key="item"
      class="chip"
      :class="variant"
      :style="techColors[item] ? { '--chip-hover': techColors[item] } : null"
      >{{ item }}</span
    >
  </div>
</template>

<style scoped>
.chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  font-family: var(--font-mono);
  line-height: 1;
  --chip-hover: var(--accent-light);
  transition: border-color 0.25s ease, color 0.25s ease, background-color 0.25s ease;
}

.chip.solid {
  padding: 7px 12px;
  border: 1px solid rgba(var(--accent-light-rgb), 0.22);
  border-radius: var(--radius-pill);
  font-size: 11.5px;
  font-weight: 400;
  color: var(--chip-text);
}

.chip.dashed {
  padding: 7px 12px;
  border: 1px dashed rgba(var(--accent-light-rgb), 0.28);
  border-radius: var(--radius-pill);
  font-size: 11.5px;
  font-weight: 400;
  color: var(--text-muted);
}

.chip.tag {
  padding: 7px 12px;
  border: 1px solid rgba(var(--accent-light-rgb), 0.2);
  border-radius: 6px;
  font-size: 11px;
  font-weight: 400;
  color: var(--chip-text-alt);
}

.chip:hover {
  border-color: var(--chip-hover);
  color: var(--chip-hover);
  background: color-mix(in srgb, var(--chip-hover) 14%, transparent);
}
</style>
