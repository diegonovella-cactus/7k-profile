<script setup lang="ts">
import AppIcon from './AppIcon.vue'

withDefaults(defineProps<{ scrolled?: boolean }>(), { scrolled: false })
defineEmits<{ close: [] }>()
</script>

<template>
  <header class="topbar">
    <!-- fundo sólido que aparece só com a página rolada -->
    <span class="fill" :class="{ on: scrolled }" />
    <h1>Perfil do Jogador</h1>
    <button class="close" type="button" aria-label="Fechar" @click="$emit('close')">
      <AppIcon name="close" :size="19" />
    </button>
  </header>
</template>

<style scoped>
.topbar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: var(--topbar-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 12px 0 var(--gutter);
}

/* O gradiente extrapola a altura da barra: a camada pinta 130px,
   enquanto a barra em si continua com 57px de layout e de área clicável. */
.topbar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
  height: 130px;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    var(--topbar-solid) 0%,
    rgba(22, 24, 42, 0.96) 30%,
    rgba(22, 24, 42, 0.72) 56%,
    rgba(22, 24, 42, 0.34) 78%,
    rgba(22, 24, 42, 0) 100%
  );
}

.fill {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5; /* sobre o gradiente (3) e o conteúdo (4), sob o título (6) */
  height: var(--topbar-fill-h);
  pointer-events: none;
  background: var(--topbar-solid);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3); /* branco a 70% de transparência */
  opacity: 0;
  transition: opacity 0.24s ease;
}
.fill.on {
  opacity: 1;
}

.close {
  position: relative;
  z-index: 6;
  width: 38px;
  height: 38px;
  flex: none;
  display: grid;
  place-items: center;
  border-radius: 10px;
  color: var(--lime);
  background: #2c303e;
  transition: background 0.15s ease, transform 0.15s ease;
}
.close:hover {
  background: #363b4c;
}
.close:active {
  transform: scale(0.92);
}

h1 {
  position: relative;
  z-index: 6;
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.3px;
  color: var(--text);
}
</style>
