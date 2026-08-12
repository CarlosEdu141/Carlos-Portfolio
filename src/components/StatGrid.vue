<script setup>
defineProps({
  stats: { type: Array, required: true },
})
</script>

<template>
  <div class="stat-grid" v-reveal>
    <div v-for="stat in stats" :key="stat.label" class="cell">
      <div class="number">{{ stat.number }}</div>
      <div class="label">{{ stat.label }}</div>
    </div>
  </div>
</template>

<style scoped>
.stat-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  background: var(--border-card);
  border: 1px solid var(--border-card);
  border-radius: 10px;
  overflow: hidden;
}

.cell {
  padding: 26px 24px;
  background: var(--bg-alt);
}

.number {
  font: 200 42px/1 var(--font-sora);
  color: var(--accent);
}

.label {
  margin-top: 8px;
  font: 400 10.5px/1.5 var(--font-mono);
  letter-spacing: 0.1em;
  color: var(--text-faint);
  white-space: pre-line;
}

@media (max-width: 768px) {
  .stat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
