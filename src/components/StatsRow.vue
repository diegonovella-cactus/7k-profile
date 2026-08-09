<script setup lang="ts">
import { metrics } from '../data/player'

/** índice da métrica ativa — controla o gráfico logo abaixo */
const active = defineModel<number>({ default: 0 })
</script>

<template>
  <section class="stats">
    <button
      v-for="(m, i) in metrics"
      :key="m.key"
      type="button"
      class="card"
      :class="{ on: active === i }"
      :style="{ '--c': m.color }"
      :aria-pressed="active === i"
      @click="active = i"
    >
      <strong>{{ m.value }}</strong>
      <span class="label">{{ m.label }}</span>
      <span class="hint">{{ m.hint }}</span>
    </button>
  </section>
</template>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 9px;
}

.card {
  display: grid;
  gap: 2px;
  padding: 11px 10px 10px;
  border-radius: var(--r-md);
  text-align: left;
  background-color: var(--surface);
  background-image: var(--grad-card);
  border: 1px solid var(--border);
  transition: border-color 0.16s ease, transform 0.14s ease;
}
.card:active {
  transform: scale(0.97);
}

/* ativo muda só borda e texto — o fundo continua o mesmo do inativo */
.card.on {
  border-color: color-mix(in srgb, var(--c) 55%, transparent);
}

.card strong {
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.6px;
  line-height: 1.1;
  color: var(--text);
}

.label {
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.2px;
  color: var(--text-3);
}

.hint {
  margin-top: 3px;
  font-size: 9px;
  font-weight: 700;
  color: var(--text-4);
}
.card.on .hint {
  color: var(--c);
}
</style>
