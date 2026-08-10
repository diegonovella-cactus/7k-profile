<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import SectionTitle from './SectionTitle.vue'
import { menu } from '../data/player'
</script>

<template>
  <section class="block">
    <SectionTitle icon="user" label="Minha Conta" class="title" />
    <ul class="list">
      <li v-for="m in menu" :key="m.key">
        <button class="row" type="button">
          <span class="ico"><AppIcon :name="m.icon" :size="19" /></span>
          <span class="txt">
            <span class="lbl">{{ m.label }}</span>
            <span class="desc">{{ m.desc }}</span>
          </span>
          <span v-if="m.meta" class="meta">{{ m.meta }}</span>
          <AppIcon name="chevron" :size="15" class="chev" />
        </button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.block {
  padding: 18px var(--gutter) 0;
}

.title {
  margin: 0 0 10px;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
}

.row {
  width: 100%;
  display: grid;
  grid-template-columns: 38px 1fr auto auto;
  align-items: center;
  gap: 11px;
  padding: 11px 12px;
  border-radius: var(--r-md);
  background: var(--surface);
  border: 1px solid var(--border);
  text-align: left;
  transition: transform 0.15s ease, border-color 0.15s ease;
}
.row:active {
  transform: scale(0.985);
}
.row:hover {
  border-color: rgba(161, 205, 61, 0.35);
}

.ico {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  color: #a9dc4a;
  background: rgba(161, 205, 61, 0.15);
}

.txt {
  display: grid;
  gap: 2px;
  min-width: 0;
}

.lbl {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.2px;
}

.desc {
  font-size: 10.5px;
  font-weight: 500;
  color: var(--text-4);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-2);
}

.chev {
  color: var(--text-4);
}
</style>
