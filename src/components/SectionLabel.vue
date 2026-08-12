<script setup>
defineProps({
  number: { type: String, required: true },
  text: { type: String, required: true },
})
</script>

<template>
  <div class="section-label" v-reveal>
    <span>{{ number }} — {{ text }}</span>
    <span class="line" aria-hidden="true"></span>
  </div>
</template>

<style scoped>
.section-label {
  display: flex;
  align-items: center;
  gap: 14px;
  font: 400 11px/1 var(--font-mono);
  letter-spacing: 0.18em;
  color: var(--accent);
}

.line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(var(--accent-rgb), 0.4), transparent);
}
</style>
