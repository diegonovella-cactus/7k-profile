<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import SectionTitle from './SectionTitle.vue'
import { shortcuts } from '../data/player'
import bg1 from '../assets/tile-bg-1.png'
import bg2 from '../assets/tile-bg-2.png'
import bg3 from '../assets/tile-bg-3.png'

/** os três padrões se alternam pelos cards, nunca repetindo lado a lado */
const fundos = [bg1, bg2, bg3]
</script>

<template>
  <section class="block">
    <SectionTitle icon="gift" label="Central de Ofertas" class="title" />

    <!-- 108px + 9px de gap: cabem 3 cards e sobra ~47px do 4º, sinalizando o scroll -->
    <nav class="rail scroll-x" aria-label="Central de Ofertas">
      <button
        v-for="(s, i) in shortcuts"
        :key="s.key"
        class="tile"
        type="button"
        :style="{ '--accent': s.accent, backgroundImage: `url(${fundos[i % fundos.length]})` }"
      >
        <span v-if="s.badge" class="badge">{{ s.badge }}</span>
        <span class="ico"><AppIcon :name="s.icon" :size="24" /></span>
        <span class="lbl">{{ s.label }}</span>
      </button>
    </nav>
  </section>
</template>

<style scoped>
.block {
  padding-top: 18px;
}

.title {
  margin: 0 var(--gutter) 10px;
}

.rail {
  display: flex;
  gap: 9px;
  padding: 0 var(--gutter) 2px;
}

.tile {
  position: relative;
  flex: none;
  width: 108px;
  height: 108px;
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 9px;
  overflow: hidden;
  border-radius: var(--r-lg);
  background-color: var(--surface);
  background-size: cover;
  background-position: center;
  border: 0;
  transition: transform 0.15s ease;
}

/* véu escuro sobre o padrão: sem ele o label branco some no card verde */
.tile::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(14, 18, 38, 0.1) 0%,
    rgba(14, 18, 38, 0.32) 44%,
    rgba(14, 18, 38, 0.78) 100%
  );
}
.tile:active {
  transform: scale(0.96);
}
.ico {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  position: relative;
  border-radius: 12px;
  color: var(--text);
  /* mesmo vidro da caixa dos 7Koins */
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.28);
}

.lbl {
  font-size: 11.5px;
  font-weight: 600;
  position: relative;
  letter-spacing: -0.1px;
  color: var(--text);
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
}

.badge {
  position: absolute;
  z-index: 1;
  top: 8px;
  right: 9px;
  min-width: 18px;
  height: 18px;
  padding: 0 6px;
  display: grid;
  place-items: center;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  color: #10131f;
  background: var(--accent);
  border-radius: var(--r-pill);
}
</style>
