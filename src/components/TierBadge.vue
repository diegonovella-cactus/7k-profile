<script setup lang="ts">
/**
 * Selo de tier — gema pentagonal com moldura dourada e chevron.
 * Recriação vetorial do ícone de referência (nítido em qualquer tamanho).
 */
withDefaults(defineProps<{ size?: number }>(), { size: 38 })

const OUTER = '32,5 57.7,23.6 47.9,53.8 16.1,53.8 6.3,23.6'
const INNER = '32,14.5 49.3,27 42.7,47.3 21.3,47.3 14.7,27'
</script>

<template>
  <svg
    class="badge"
    :width="size"
    :height="size"
    viewBox="0 0 64 64"
    fill="none"
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="tbGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ff8a1f" stop-opacity="0.75" />
        <stop offset="55%" stop-color="#ff5a00" stop-opacity="0.28" />
        <stop offset="100%" stop-color="#ff4d00" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="tbFrame" x1="0" y1="0" x2="0.35" y2="1">
        <stop offset="0%" stop-color="#ffe9a8" />
        <stop offset="34%" stop-color="#ffbe45" />
        <stop offset="70%" stop-color="#ff8c1a" />
        <stop offset="100%" stop-color="#ffd36b" />
      </linearGradient>
      <linearGradient id="tbCore" x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stop-color="#b4131a" />
        <stop offset="46%" stop-color="#8e0d13" />
        <stop offset="100%" stop-color="#5e070c" />
      </linearGradient>
      <linearGradient id="tbChevron" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ffd98c" />
        <stop offset="45%" stop-color="#ff9c2b" />
        <stop offset="100%" stop-color="#f06a12" />
      </linearGradient>
    </defs>

    <circle cx="32" cy="32" r="31" fill="url(#tbGlow)" />

    <polygon
      :points="OUTER"
      fill="url(#tbFrame)"
      stroke="#ffd98c"
      stroke-width="1.4"
      stroke-linejoin="round"
    />
    <polygon :points="INNER" fill="url(#tbCore)" stroke-linejoin="round" />

    <path
      d="M20 28.5 32 39.5 44 28.5"
      fill="none"
      stroke="url(#tbChevron)"
      stroke-width="6.4"
      stroke-linecap="butt"
      stroke-linejoin="miter"
    />

    <!-- brilhos de faceta -->
    <path d="M32 14.9 21.9 22.2" stroke="#fff6d8" stroke-opacity="0.55" stroke-width="2" stroke-linecap="round" />
    <circle cx="36.4" cy="10.4" r="1.5" fill="#fff8e2" fill-opacity="0.9" />
    <circle cx="18.6" cy="46.4" r="1.3" fill="#fff8e2" fill-opacity="0.7" />
  </svg>
</template>

<style scoped>
.badge {
  display: block;
  filter: drop-shadow(0 3px 8px rgba(255, 110, 20, 0.45));
}
</style>
