<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'
import castle from '../assets/personagem-avatar-bg.png'
import hero from '../assets/personagem-avatar.png'

/** `size` é a unidade do viewBox, não o tamanho renderizado: quem define o
 *  tamanho na tela é `--s` no CSS, para a media query poder encolher tudo. */
const props = withDefaults(
  defineProps<{ progress?: number; size?: number; heroScale?: number }>(),
  { progress: 0.38, size: 175, heroScale: 1.132 },
)

const SW = 9
const radius = computed(() => props.size / 2 - SW / 2)
const circ = computed(() => 2 * Math.PI * radius.value)
const dash = computed(() => `${circ.value * props.progress} ${circ.value}`)
</script>

<template>
  <!-- O castelo é mascarado dentro do disco; o personagem fica POR CIMA, sem corte. -->
  <div class="medallion" :style="{ '--hero-scale': heroScale }">
    <svg class="ring" :viewBox="`0 0 ${size} ${size}`" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f2c9a3" />
          <stop offset="30%" stop-color="#d39a66" />
          <stop offset="62%" stop-color="#b87a45" />
          <stop offset="100%" stop-color="#f0bf90" />
        </linearGradient>
      </defs>
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        stroke="rgba(211,154,102,.16)"
        :stroke-width="SW"
      />
      <circle
        class="arc"
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        stroke="url(#ringGrad)"
        :stroke-width="SW"
        stroke-linecap="round"
        :stroke-dasharray="dash"
        :transform="`rotate(-90 ${size / 2} ${size / 2})`"
      />
    </svg>

    <div class="disc">
      <img class="castle" :src="castle" alt="" />
      <span class="vignette" />
    </div>

    <img class="hero" :src="hero" alt="Avatar do jogador" />

    <button class="cam" type="button" aria-label="Trocar avatar">
      <AppIcon name="camera" :size="14" />
    </button>
  </div>
</template>

<style scoped>
.medallion {
  --s: 192px;
  position: relative;
  width: var(--s);
  height: var(--s);
  flex: none;
}

/* Abaixo de 390px o conjunto encolhe para caber ao lado das moedas e do nível.
   1.243 = heroScale (1.132) × proporção do PNG (1.098): é quanto o personagem
   ocupa de largura para cada 1px de medalhão. As colunas vêm de .stage. */
@media (max-width: 390px) {
  .medallion {
    --s: clamp(
      128px,
      calc((100vw - 32px - var(--col-l, 58px) - var(--col-r, 94px) - 8px) / 1.243),
      192px
    );
  }
}

.ring {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  filter: drop-shadow(0 0 12px rgba(211, 154, 102, 0.45));
}

.disc {
  position: absolute;
  inset: 7.4%; /* 13px em 175 */
  border-radius: 50%;
  overflow: hidden; /* máscara do castelo */
  background: #0b0f22;
  box-shadow:
    inset 0 0 0 1px rgba(211, 154, 102, 0.35),
    0 8px 24px rgba(0, 0, 0, 0.5);
}

.castle {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 52% 62%;
  transform: scale(1.18);
  filter: saturate(0.95) contrast(1.05);
}

.vignette {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 50% 38%, rgba(255, 190, 110, 0.18), transparent 62%),
    radial-gradient(circle at 50% 100%, rgba(10, 13, 30, 0.85), transparent 66%),
    linear-gradient(180deg, rgba(10, 13, 30, 0.35), rgba(10, 13, 30, 0.1) 45%);
}

/* personagem por cima, estourando o círculo.
   max-width:none é obrigatório: o reset global (img{max-width:100%}) travava
   a largura no tamanho do medalhão e achatava a proporção. */
.hero {
  position: absolute;
  left: 50%;
  top: 50%;
  width: auto;
  max-width: none;
  height: calc(var(--s) * var(--hero-scale));
  transform: translate(-50%, -50%) translate(var(--hero-x, -6px), var(--hero-y, 4px));
  z-index: 3;
  pointer-events: none;
  filter: drop-shadow(0 10px 14px rgba(0, 0, 0, 0.55));
}

.cam {
  position: absolute;
  right: 5.7%;
  bottom: 3.4%;
  z-index: 4;
  width: 17.2%;
  height: 17.2%;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #10131f;
  background: var(--grad-gold);
  box-shadow:
    0 0 0 3px var(--bg),
    0 4px 10px rgba(0, 0, 0, 0.45);
  transition: transform 0.15s ease;
}
.cam:active {
  transform: scale(0.92);
}
</style>
