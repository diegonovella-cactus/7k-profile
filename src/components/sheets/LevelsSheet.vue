<script setup lang="ts">
import { computed } from 'vue'
import BottomSheet from '../BottomSheet.vue'
import AppIcon from '../AppIcon.vue'
import TierBadge from '../TierBadge.vue'
import { player, tiers } from '../../data/player'

defineProps<{ open: boolean }>()
defineEmits<{ close: [] }>()

const pct = computed(() => Math.round((player.xp / player.xpToNext) * 100))
const nf = (n: number) => n.toLocaleString('pt-BR')
</script>

<template>
  <BottomSheet :open="open" title="Níveis" @close="$emit('close')">
    <div class="now">
      <TierBadge :size="52" />
      <div class="info">
        <span class="tier">{{ player.tier }}</span>
        <strong>Nível {{ player.level }}</strong>
      </div>
      <div class="bar">
        <div class="track"><div class="fill" :style="{ width: pct + '%' }" /></div>
        <span>{{ nf(player.xp) }} / {{ nf(player.xpToNext) }} XP para o nível {{ player.level + 1 }}</span>
      </div>
    </div>

    <section class="sh-sec">
      <div class="sh-h">
        <h3>Faixas</h3>
        <span class="sh-count">{{ tiers.length }}</span>
      </div>

      <div class="tiers">
        <article
          v-for="t in tiers"
          :key="t.key"
          class="tier-card"
          :class="t.state"
          :style="{ '--c': t.color }"
        >
          <header>
            <span class="dot"><AppIcon :name="t.state === 'locked' ? 'lock' : 'crown'" :size="15" /></span>
            <div>
              <b>{{ t.name }}</b>
              <span>{{ t.range }}</span>
            </div>
            <em v-if="t.state === 'current'">Atual</em>
          </header>
          <ul>
            <li v-for="p in t.perks" :key="p">
              <AppIcon name="check" :size="13" />
              {{ p }}
            </li>
          </ul>
        </article>
      </div>
    </section>

    <template #footer>
      <button class="sh-btn sh-btn--ghost" type="button">Regras</button>
      <button class="sh-btn sh-btn--primary" type="button">Como subir de nível</button>
    </template>
  </BottomSheet>
</template>

<style scoped>
.now {
  display: grid;
  grid-template-columns: 52px 1fr;
  align-items: center;
  gap: 14px;
  margin-top: 4px;
  padding: 16px;
  border-radius: var(--r-lg);
  background: linear-gradient(135deg, rgba(211, 154, 102, 0.2), rgba(232, 181, 99, 0.06));
  border: 1px solid rgba(211, 154, 102, 0.32);
}

.tier {
  display: block;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 1.3px;
  text-transform: uppercase;
  color: var(--gold);
}

.info strong {
  display: block;
  margin-top: 3px;
  font-size: 21px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.bar {
  grid-column: 1 / -1;
  margin-top: 2px;
}

.track {
  height: 7px;
  border-radius: var(--r-pill);
  background: rgba(0, 0, 0, 0.35);
  overflow: hidden;
}

.fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #d39a66, #f2c9a3);
}

.bar span {
  display: block;
  margin-top: 7px;
  font-size: 11px;
  color: var(--text-3);
}

.tiers {
  display: grid;
  gap: 10px;
}

.tier-card {
  padding: 13px 14px;
  border-radius: var(--r-lg);
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(255, 255, 255, 0.09);
}
.tier-card.current {
  border-color: color-mix(in srgb, var(--c) 55%, transparent);
  background: color-mix(in srgb, var(--c) 10%, transparent);
}
.tier-card.locked {
  opacity: 0.62;
}

.tier-card header {
  display: grid;
  grid-template-columns: 32px 1fr auto;
  align-items: center;
  gap: 11px;
}

.dot {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  color: var(--c);
  background: color-mix(in srgb, var(--c) 16%, transparent);
}

.tier-card header b {
  display: block;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -0.3px;
  color: var(--c);
}

.tier-card header span {
  font-size: 11px;
  color: var(--text-4);
}

.tier-card header em {
  font-style: normal;
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: #17130a;
  padding: 3px 8px;
  border-radius: var(--r-pill);
  background: var(--c);
}

.tier-card ul {
  list-style: none;
  margin: 11px 0 0;
  padding: 0;
  display: grid;
  gap: 6px;
}

.tier-card li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-2);
}

.tier-card li :deep(svg) {
  color: var(--c);
  flex: none;
}
</style>
