<script setup></script>

<template>
  <nav class="nav">
    <a href="#inicio" class="brand">
      <span class="dot" aria-hidden="true"></span>C.EDUARDO
    </a>
    <div class="links">
      <a href="#bio">BIO</a>
      <a href="#empresa">EMPRESA</a>
      <a href="#projetos">PROJETOS</a>
      <a href="#lab">LAB</a>
      <a href="#contato" class="accent">CONTATO</a>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 900;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 40px;
  backdrop-filter: blur(14px);
  background: rgba(6, 7, 10, 0.62);
  border-bottom: 1px solid var(--border-section);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font: 500 12px/1 var(--font-mono);
  letter-spacing: 0.14em;
  color: var(--text);
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent-strong);
  animation: blink 2.2s infinite;
}

.links {
  display: flex;
  gap: 30px;
  font: 400 12px/1 var(--font-mono);
  letter-spacing: 0.1em;
}

.links a {
  color: #8695a6;
}

.links a.accent {
  color: var(--accent);
}

@media (max-width: 768px) {
  .nav {
    padding: 16px 20px;
  }
  .links a:not(.accent) {
    display: none;
  }
}
</style>
