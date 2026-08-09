<script setup lang="ts">
import BottomSheet from '../BottomSheet.vue'
import AppIcon from '../AppIcon.vue'
import coin from '../../assets/coin-7koins.png'
import { koinRewards, koinTasks, player } from '../../data/player'

defineProps<{ open: boolean }>()
defineEmits<{ close: [] }>()

const nf = (n: number) => n.toLocaleString('pt-BR')
</script>

<template>
  <BottomSheet :open="open" title="7Koins" @close="$emit('close')">
    <div class="balance">
      <img :src="coin" alt="" />
      <div>
        <strong>{{ nf(player.koins) }}</strong>
        <span>7Koins disponíveis</span>
      </div>
      <em>+38 hoje</em>
    </div>

    <section class="sh-sec">
      <div class="sh-h">
        <h3>Como ganhar</h3>
        <span class="sh-count">{{ koinTasks.length }}</span>
      </div>
      <div class="sh-list">
        <button v-for="t in koinTasks" :key="t.label" class="sh-row" type="button" style="--c: #b4f03c">
          <span class="sh-ico"><AppIcon :name="t.icon" :size="19" /></span>
          <span class="sh-txt">
            <b>{{ t.label }}</b>
            <span>{{ t.desc }}</span>
          </span>
          <span class="sh-meta">{{ t.reward }}</span>
        </button>
      </div>
    </section>

    <section class="sh-sec">
      <div class="sh-h">
        <h3>Trocar por</h3>
        <span class="sh-count">{{ koinRewards.length }}</span>
      </div>
      <div class="sh-list">
        <button
          v-for="r in koinRewards"
          :key="r.label"
          class="sh-row"
          type="button"
          :disabled="r.cost > player.koins"
          style="--c: #e8b563"
        >
          <span class="sh-ico"><AppIcon :name="r.icon" :size="19" /></span>
          <span class="sh-txt">
            <b>{{ r.label }}</b>
            <span>{{ r.desc }}</span>
          </span>
          <span class="sh-meta">{{ nf(r.cost) }}</span>
        </button>
      </div>
      <p class="sh-lead note">Itens acima do seu saldo aparecem esmaecidos.</p>
    </section>

    <template #footer>
      <button class="sh-btn sh-btn--ghost" type="button">Histórico</button>
      <button class="sh-btn sh-btn--primary" type="button">Ir para a Loja</button>
    </template>
  </BottomSheet>
</template>

<style scoped>
.balance {
  display: grid;
  grid-template-columns: 56px 1fr auto;
  align-items: center;
  gap: 14px;
  margin-top: 4px;
  padding: 16px;
  border-radius: var(--r-lg);
  background: linear-gradient(135deg, rgba(232, 181, 99, 0.18), rgba(180, 240, 60, 0.07));
  border: 1px solid rgba(232, 181, 99, 0.28);
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

.balance em {
  font-style: normal;
  font-size: 11px;
  font-weight: 700;
  color: var(--lime);
  padding: 4px 9px;
  border-radius: var(--r-pill);
  background: rgba(180, 240, 60, 0.14);
}

.sh-row:disabled {
  opacity: 0.42;
  cursor: not-allowed;
}

.note {
  margin: 10px 0 0;
}
</style>
