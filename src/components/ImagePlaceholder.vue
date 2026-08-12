<script setup>
defineProps({
  label: { type: String, default: 'Imagem' },
})
</script>

<template>
  <div class="image-placeholder" role="img" :aria-label="label">
    <span>{{ label }}</span>
  </div>
</template>

<style scoped>
.image-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(160deg, #0c1119, #090d13);
}

.image-placeholder span {
  max-width: 70%;
  text-align: center;
  font: 400 10.5px/1.5 var(--font-mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-ghost);
}
</style>
