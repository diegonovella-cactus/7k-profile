<script setup lang="ts">
import { computed, ref } from 'vue'
import BottomSheet from '../BottomSheet.vue'
import AppIcon from '../AppIcon.vue'
import { notices } from '../../data/player'

defineProps<{ open: boolean }>()
defineEmits<{ close: [] }>()

const filters = ['Todas', 'Não lidas', 'Bônus', 'Conta'] as const
const filter = ref<(typeof filters)[number]>('Todas')

const read = ref<number[]>([])
const isUnread = (id: number) => notices.find((n) => n.id === id)!.unread && !read.value.includes(id)

const list = computed(() =>
  filter.value === 'Não lidas' ? notices.filter((n) => isUnread(n.id)) : notices,
)
const unreadCount = computed(() => notices.filter((n) => isUnread(n.id)).length)
</script>

<template>
  <BottomSheet :open="open" title="Notificações" search @close="$emit('close')">
    <div class="sh-chips">
      <button
        v-for="f in filters"
        :key="f"
        class="sh-chip"
        :class="{ on: filter === f }"
        type="button"
        @click="filter = f"
      >
        {{ f }}
        <span v-if="f === 'Não lidas' && unreadCount" class="dot">{{ unreadCount }}</span>
      </button>
    </div>

    <section class="sh-sec">
      <div class="sh-h">
        <h3>Recentes</h3>
        <span class="sh-count">{{ list.length }}</span>
      </div>

      <div class="sh-list">
        <button
          v-for="n in list"
          :key="n.id"
          class="sh-row note"
          :class="{ unread: isUnread(n.id) }"
          type="button"
          :style="{ '--c': n.accent }"
          @click="read.push(n.id)"
        >
          <span class="sh-ico"><AppIcon :name="n.icon" :size="19" /></span>
          <span class="sh-txt">
            <b>{{ n.title }}</b>
            <span>{{ n.text }}</span>
          </span>
          <span class="right">
            <em>{{ n.time }}</em>
            <i v-if="isUnread(n.id)" class="pip" />
          </span>
        </button>
      </div>

      <p v-if="!list.length" class="empty">Nada por aqui. Tudo lido.</p>
    </section>

    <template #footer>
      <button class="sh-btn sh-btn--ghost" type="button" @click="read = notices.map((n) => n.id)">
        Marcar como lidas
      </button>
      <button class="sh-btn sh-btn--primary" type="button">Preferências</button>
    </template>
  </BottomSheet>
</template>

<style scoped>
.note.unread {
  background: rgba(255, 255, 255, 0.075);
  border-color: color-mix(in srgb, var(--c) 32%, transparent);
}

.right {
  display: grid;
  justify-items: end;
  gap: 6px;
}

.right em {
  font-style: normal;
  font-size: 10.5px;
  font-weight: 600;
  color: var(--text-4);
  white-space: nowrap;
}

.pip {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--c);
}

.dot {
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  display: grid;
  place-items: center;
  border-radius: var(--r-pill);
  font-size: 10px;
  font-weight: 800;
  color: #10131f;
  background: var(--danger);
}

.empty {
  margin: 18px 0 0;
  text-align: center;
  font-size: 12.5px;
  color: var(--text-4);
}
</style>
