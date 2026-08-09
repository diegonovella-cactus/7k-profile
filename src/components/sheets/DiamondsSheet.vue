<script setup lang="ts">
import { ref } from 'vue'
import BottomSheet from '../BottomSheet.vue'
import AppIcon from '../AppIcon.vue'
import gem from '../../assets/coin-diamante.png'
import { diamondPacks, diamondUses, player } from '../../data/player'

defineProps<{ open: boolean }>()
defineEmits<{ close: [] }>()

const nf = (n: number) => n.toLocaleString('pt-BR')
const picked = ref(diamondPacks.find((p) => p.best)?.id ?? diamondPacks[0].id)
</script>

<template>
  <BottomSheet :open="open" title="Diamantes" @close="$emit('close')">
    <div class="balance">
      <img :src="gem" alt="" />
      <div>
        <strong>{{ nf(player.diamonds) }}</strong>
        <span>diamantes na carteira</span>
      </div>
    </div>

    <section class="sh-sec">
      <div class="sh-h">
        <h3>Comprar</h3>
        <span class="sh-count">{{ diamondPacks.length }}</span>
      </div>
      <div class="packs">
        <button
          v-for="p in diamondPacks"
          :key="p.id"
          class="pack"
          :class="{ on: picked === p.id }"
          type="button"
          @click="picked = p.id"
        >
          <span v-if="p.best" class="tagbest">Melhor valor</span>
          <span v-else-if="p.bonus" class="tag">{{ p.bonus }}</span>
          <AppIcon name="diamond" :size="24" />
          <b>{{ nf(p.amount) }}</b>
          <em>{{ p.price }}</em>
        </button>
      </div>
    </section>

    <section class="sh-sec">
      <div class="sh-h"><h3>Onde usar</h3></div>
      <div class="sh-list">
        <button v-for="u in diamondUses" :key="u.label" class="sh-row" type="button" style="--c: #6fd8f5">
          <span class="sh-ico"><AppIcon :name="u.icon" :size="19" /></span>
          <span class="sh-txt">
            <b>{{ u.label }}</b>
            <span>{{ u.desc }}</span>
          </span>
          <AppIcon name="chevron" :size="15" class="chev" />
        </button>
      </div>
    </section>

    <template #footer>
      <button class="sh-btn sh-btn--ghost" type="button">Extrato</button>
      <button class="sh-btn sh-btn--primary" type="button">Comprar pacote</button>
    </template>
  </BottomSheet>
</template>

<style scoped>
.balance {
  display: grid;
  grid-template-columns: 56px 1fr;
  align-items: center;
  gap: 14px;
  margin-top: 4px;
  padding: 16px;
  border-radius: var(--r-lg);
  background: linear-gradient(135deg, rgba(111, 216, 245, 0.18), rgba(91, 140, 255, 0.07));
  border: 1px solid rgba(111, 216, 245, 0.28);
}

.balance img {
  width: 56px;
  height: 56px;
  object-fit: contain;
}

.balance strong {
  display: block;
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -1.2px;
  line-height: 1;
}

.balance span {
  display: block;
  margin-top: 4px;
  font-size: 11.5px;
  color: var(--text-3);
}

.packs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9px;
}

.pack {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 5px;
  padding: 16px 10px 13px;
  border-radius: var(--r-lg);
  color: var(--diamond);
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  transition: border-color 0.15s ease, background 0.15s ease, transform 0.14s ease;
}
.pack:active {
  transform: scale(0.97);
}
.pack.on {
  border-color: rgba(111, 216, 245, 0.65);
  background: rgba(111, 216, 245, 0.11);
}

.pack b {
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -0.4px;
  color: var(--text);
}

.pack em {
  font-style: normal;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-3);
}

.tag,
.tagbest {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  padding: 3px 9px;
  border-radius: var(--r-pill);
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 0.2px;
  white-space: nowrap;
  color: #10131f;
  background: var(--diamond);
}
.tagbest {
  background: var(--grad-gold);
}

.chev {
  color: var(--text-4);
}
</style>
