<script setup lang="ts">
import AppIcon from './AppIcon.vue'

defineProps<{ icon: string; label: string }>()
</script>

<template>
  <h3 class="section-title">
    <AppIcon :name="icon" :size="17" />
    {{ label }}
  </h3>
</template>

<style scoped>
.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.2px;
  color: var(--text); /* o ícone herda via currentColor */
}
</style>
