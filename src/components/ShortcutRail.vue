<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import SectionTitle from './SectionTitle.vue'
import { shortcuts } from '../data/player'
</script>

<template>
  <section class="block">
    <SectionTitle icon="gift" label="Central de Ofertas" class="title" />

    <!-- 108px + 9px de gap: cabem 3 cards e sobra ~47px do 4º, sinalizando o scroll -->
    <nav class="rail scroll-x" aria-label="Central de Ofertas">
      <button
        v-for="s in shortcuts"
        :key="s.key"
        class="tile"
        type="button"
        :style="{ '--accent': s.accent }"
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
  height: 95px;
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 9px;
  border-radius: var(--r-lg);
  background: var(--surface);
  border: 1px solid var(--border);
  transition: transform 0.15s ease, border-color 0.15s ease;
}
.tile:active {
  transform: scale(0.96);
}
.tile:hover {
  border-color: color-mix(in srgb, var(--accent) 45%, transparent);
}

.ico {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 13px;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 14%, transparent);
}

.lbl {
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: -0.1px;
  color: var(--text-2);
}

.badge {
  position: absolute;
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
