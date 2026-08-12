<script setup>
defineProps({
  item: { type: Object, required: true },
  isLast: { type: Boolean, default: false },
})
</script>

<template>
  <div class="timeline-item" :class="{ 'is-last': isLast }">
    <div class="date" :class="{ current: item.current }">{{ item.date }}</div>
    <div>
      <div class="role">{{ item.role }}</div>
      <div class="company">{{ item.company }}</div>
      <p class="description">{{ item.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.timeline-item {
  display: grid;
  grid-template-columns: 170px minmax(0, 1fr);
  gap: 24px;
  padding: 22px 0;
  border-top: 1px solid var(--border-inner);
}

.timeline-item.is-last {
  border-bottom: 1px solid var(--border-inner);
}

.date {
  font: 400 11.5px/1.5 var(--font-mono);
  color: var(--text-faint);
}

.date.current {
  color: var(--accent);
}

.role {
  font: 500 17px/1.4 var(--font-sora);
  color: var(--text);
}

.company {
  margin-top: 6px;
  font: 400 13px/1.6 var(--font-mono);
  color: var(--text-faint);
}

.description {
  margin: 12px 0 0;
  max-width: 560px;
  font: 300 15px/1.65 var(--font-sora);
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .timeline-item {
    grid-template-columns: minmax(0, 1fr);
    gap: 6px;
  }
}
</style>
