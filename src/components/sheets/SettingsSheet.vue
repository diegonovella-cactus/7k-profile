<script setup lang="ts">
import { reactive } from 'vue'
import BottomSheet from '../BottomSheet.vue'
import AppIcon from '../AppIcon.vue'
import { settingsGroups } from '../../data/player'

defineProps<{ open: boolean }>()
defineEmits<{ close: [] }>()

/** cópia local: o sheet é um protótipo, nada persiste ainda */
const state = reactive(
  Object.fromEntries(
    settingsGroups.flatMap((g) => g.items.map((i) => [i.key, i.on])),
  ) as Record<string, boolean>,
)

const links = [
  { icon: 'globe', label: 'Idioma', meta: 'Português (BR)' },
  { icon: 'lock', label: 'Senha e segurança', meta: '' },
  { icon: 'shield', label: 'Privacidade', meta: '' },
]
</script>

<template>
  <BottomSheet :open="open" title="Configurações" @close="$emit('close')">
    <section v-for="g in settingsGroups" :key="g.title" class="sh-sec">
      <div class="sh-h"><h3>{{ g.title }}</h3></div>
      <div class="sh-list">
        <div v-for="i in g.items" :key="i.key" class="sh-row">
          <span class="sh-ico"><AppIcon :name="i.icon" :size="19" /></span>
          <span class="sh-txt">
            <b>{{ i.label }}</b>
            <span>{{ i.desc }}</span>
          </span>
          <button
            class="sw"
            type="button"
            role="switch"
            :aria-checked="state[i.key]"
            :aria-label="i.label"
            @click="state[i.key] = !state[i.key]"
          >
            <span class="knob" />
          </button>
        </div>
      </div>
    </section>

    <section class="sh-sec">
      <div class="sh-h"><h3>Conta</h3></div>
      <div class="sh-list">
        <button v-for="l in links" :key="l.label" class="sh-row" type="button">
          <span class="sh-ico"><AppIcon :name="l.icon" :size="19" /></span>
          <span class="sh-txt"><b>{{ l.label }}</b></span>
          <span class="right">
            <em v-if="l.meta">{{ l.meta }}</em>
            <AppIcon name="chevron" :size="15" />
          </span>
        </button>
      </div>
    </section>

    <template #footer>
      <button class="sh-btn sh-btn--ghost" type="button">Restaurar padrão</button>
      <button class="sh-btn sh-btn--primary" type="button">Salvar</button>
    </template>
  </BottomSheet>
</template>

<style scoped>
.sw {
  width: 44px;
  height: 26px;
  padding: 3px;
  border-radius: var(--r-pill);
  background: rgba(255, 255, 255, 0.14);
  transition: background 0.18s ease;
}

.knob {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.18s cubic-bezier(0.22, 1, 0.36, 1);
}

.sw[aria-checked='true'] {
  background: var(--grad-gold);
}
.sw[aria-checked='true'] .knob {
  transform: translateX(18px);
}

.right {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text-4);
}

.right em {
  font-style: normal;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-2);
}
</style>
