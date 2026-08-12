<script setup>
import { onUnmounted, ref } from 'vue'
import SectionLabel from './SectionLabel.vue'
import { profile } from '../data/profile.js'

const whatsappUrl = `https://wa.me/${profile.contact.whatsapp.number}?text=${encodeURIComponent(profile.contact.whatsapp.message)}`

const whatsappClicked = ref(false)
let whatsappTimer = 0

function onWhatsappClick() {
  whatsappClicked.value = true
  clearTimeout(whatsappTimer)
  whatsappTimer = setTimeout(() => {
    whatsappClicked.value = false
  }, 1800)
}

onUnmounted(() => clearTimeout(whatsappTimer))
</script>

<template>
  <section id="contato" class="contact">
    <div class="content-max">
      <SectionLabel number="05" text="CONTATO" style="margin-bottom: 34px" />
      <h2 v-reveal class="title">Vamos construir algo <span class="accent-text">que dure</span>.</h2>

      <div class="grid" v-reveal>
        <a :href="`mailto:${profile.contact.email}`" class="cell">
          <span class="label">E-MAIL</span>
          <span class="value email">{{ profile.contact.email }}</span>
        </a>
        <a :href="`tel:${profile.contact.phone.href}`" class="cell">
          <span class="label">TELEFONE</span>
          <span class="value">{{ profile.contact.phone.display }}</span>
        </a>
        <a :href="profile.contact.github.url" target="_blank" rel="noopener" class="cell">
          <span class="label">GITHUB</span>
          <span class="value">{{ profile.contact.github.user }}</span>
        </a>
        <div class="cell static">
          <span class="label">LOCALIZAÇÃO</span>
          <span class="value">{{ profile.contact.location }}</span>
        </div>
      </div>

      <div class="actions" v-reveal>
        <a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener"
          v-magnetic
          class="btn-primary btn-whatsapp"
          :class="{ 'is-clicked': whatsappClicked }"
          @click="onWhatsappClick"
        >
          <svg class="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path
              d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.35 5.08L2 22l5.08-1.32A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.2 14.2c-.22.62-1.3 1.18-1.8 1.24-.46.06-1.02.08-1.65-.1a14.9 14.9 0 0 1-1.86-.68c-3.28-1.42-5.4-4.72-5.56-4.94-.16-.22-1.34-1.78-1.34-3.4 0-1.62.85-2.42 1.15-2.75.3-.32.66-.4.88-.4h.63c.2 0 .48-.04.74.56.28.66.94 2.3 1.02 2.46.08.16.14.36.02.58-.12.22-.18.36-.36.56-.18.2-.38.44-.54.6-.18.18-.36.36-.16.7.2.34.9 1.48 1.94 2.4 1.34 1.18 2.46 1.54 2.8 1.72.34.18.54.16.74-.06.2-.22.86-.98 1.1-1.32.24-.34.46-.28.76-.16.3.12 1.9.9 2.22 1.06.32.16.54.24.62.38.08.14.08.8-.14 1.42z"
            />
          </svg>
          Chamar no WhatsApp
        </a>
        <a :href="profile.contact.github.url" target="_blank" rel="noopener" v-magnetic class="btn-secondary">Ver meu GitHub</a>
      </div>

      <div class="footer">
        <span>{{ profile.footer.copyright }}</span>
        <span>{{ profile.footer.tech }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  position: relative;
  padding: 130px 40px 60px;
  border-top: 1px solid var(--border-section);
  background: var(--gradient-contact-bg);
  overflow: hidden;
}

.content-max {
  max-width: var(--content-max);
  margin: 0 auto;
  position: relative;
}

.title {
  margin: 0;
  max-width: 900px;
  font: 200 clamp(38px, 5.4vw, 80px) / 1.02 var(--font-sora);
  letter-spacing: -0.045em;
  color: var(--text-bright);
}

.accent-text {
  font-weight: 700;
  background: var(--gradient-text-contact);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  margin-top: 64px;
  background: var(--border-card);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-panel);
  overflow: hidden;
}

.cell {
  padding: 34px 32px;
  background: var(--bg-alt);
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: background 0.3s ease;
}

.cell:hover,
.cell:focus-visible {
  background: var(--bg-card-hover);
}

.label {
  font: 400 10.5px/1 var(--font-mono);
  letter-spacing: 0.16em;
  color: var(--text-ghost);
}

.value {
  font: 400 clamp(17px, 1.7vw, 24px) / 1.3 var(--font-sora);
  color: var(--text);
}

.value.email {
  word-break: break-all;
}

.actions {
  margin-top: 36px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 16px 28px;
  border-radius: var(--radius-btn);
  font-family: var(--font-sora);
  font-size: 13.5px;
  line-height: 1;
}

.btn-primary {
  background: var(--accent-strong);
  color: var(--on-accent);
  font-weight: 600;
}

.btn-whatsapp {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  transition: background-color 0.25s ease;
}

.whatsapp-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.btn-whatsapp.is-clicked {
  background: var(--whatsapp-green);
  color: #f2fff6;
}

.btn-secondary {
  border: 1px solid rgba(var(--accent-light-rgb), 0.28);
  color: var(--chip-text);
  font-weight: 400;
}

.footer {
  margin-top: 96px;
  padding-top: 26px;
  border-top: 1px solid var(--border-inner);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  font: 400 10.5px/1.6 var(--font-mono);
  letter-spacing: 0.1em;
  color: var(--text-ghost);
}

@media (max-width: 768px) {
  .contact {
    padding: 88px 20px 60px;
  }
  .grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
