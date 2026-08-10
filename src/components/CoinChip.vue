<script setup lang="ts">
withDefaults(
  defineProps<{
    img: string
    value: string
    label: string
    /** TESTE: envolve a arte numa caixa de vidro. Ver README → "Variantes de moeda". */
    boxed?: boolean
  }>(),
  { boxed: false },
)
</script>

<template>
  <button class="chip" type="button">
    <span v-if="boxed" class="box">
      <img :src="img" :alt="label" class="art" />
    </span>
    <img v-else :src="img" :alt="label" />

    <em>{{ value }}</em>
    <small>{{ label }}</small>
  </button>
</template>

<style scoped>
.chip {
  display: grid;
  justify-items: center;
  gap: 0;
  padding: 0;
  transition: transform 0.15s ease;
}
.chip:active {
  transform: scale(0.93);
}

img {
  width: 51px; /* 46px + 10% */
  height: 51px;
  object-fit: contain;
  filter: drop-shadow(0 3px 7px rgba(0, 0, 0, 0.5));
}

/* caixa de vidro: fundo branco bem translúcido, borda branca mais firme */
.box {
  width: 51px;
  height: 51px;
  display: grid;
  place-items: center;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.28);
}

.box .art {
  width: 37px;
  height: auto;
  max-width: none;
  object-fit: contain;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.45));
}

em {
  margin-top: 4px;
  font-style: normal;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: -0.3px;
  line-height: 1;
  color: var(--text);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
}

small {
  margin-top: 2px;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.1px;
  white-space: nowrap;
  text-transform: uppercase;
  color: var(--text);
}
</style>
