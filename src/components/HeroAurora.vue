<script setup lang="ts">
/** Fundo do topo: radiais verde/azul saturados + sparkles. Puramente decorativo. */

// posições fixas (x%, y%, tamanho px, delay s, duração s)
const sparks = [
  { x: 12, y: 14, s: 9, d: 0.0, t: 3.4 },
  { x: 26, y: 6, s: 6, d: 1.2, t: 4.2 },
  { x: 41, y: 19, s: 11, d: 2.1, t: 3.8 },
  { x: 55, y: 8, s: 7, d: 0.6, t: 4.6 },
  { x: 70, y: 16, s: 10, d: 1.7, t: 3.2 },
  { x: 84, y: 9, s: 6, d: 2.6, t: 4.0 },
  { x: 92, y: 27, s: 8, d: 0.9, t: 3.6 },
  { x: 8, y: 34, s: 7, d: 2.3, t: 4.4 },
  { x: 33, y: 42, s: 5, d: 1.4, t: 3.0 },
  { x: 63, y: 38, s: 6, d: 3.0, t: 4.8 },
  { x: 78, y: 47, s: 9, d: 0.3, t: 3.9 },
  { x: 18, y: 55, s: 6, d: 1.9, t: 4.1 },
  { x: 48, y: 60, s: 5, d: 2.8, t: 3.5 },
  { x: 88, y: 58, s: 7, d: 1.1, t: 4.5 },
]

// segunda camada: poeira estelar, bem menor e mais discreta
const dust = [
  { x: 4, y: 9, s: 3, d: 0.4, t: 2.6 }, { x: 15, y: 27, s: 2.5, d: 1.5, t: 3.1 },
  { x: 21, y: 3, s: 3.5, d: 2.2, t: 2.4 }, { x: 30, y: 15, s: 2, d: 0.8, t: 3.4 },
  { x: 36, y: 31, s: 3, d: 1.9, t: 2.9 }, { x: 44, y: 5, s: 2.5, d: 3.1, t: 3.6 },
  { x: 50, y: 24, s: 3.5, d: 0.2, t: 2.7 }, { x: 57, y: 13, s: 2, d: 2.5, t: 3.3 },
  { x: 62, y: 28, s: 3, d: 1.1, t: 2.5 }, { x: 68, y: 4, s: 2.5, d: 3.4, t: 3.8 },
  { x: 74, y: 22, s: 3.5, d: 0.6, t: 2.8 }, { x: 81, y: 34, s: 2, d: 2.0, t: 3.2 },
  { x: 88, y: 17, s: 3, d: 1.3, t: 2.6 }, { x: 95, y: 6, s: 2.5, d: 2.9, t: 3.5 },
  { x: 97, y: 38, s: 3, d: 0.9, t: 3.0 }, { x: 2, y: 44, s: 2.5, d: 2.7, t: 2.4 },
  { x: 11, y: 61, s: 3, d: 1.6, t: 3.7 }, { x: 24, y: 49, s: 2, d: 0.5, t: 2.9 },
  { x: 39, y: 66, s: 3.5, d: 2.4, t: 3.1 }, { x: 45, y: 39, s: 2.5, d: 1.0, t: 2.5 },
  { x: 54, y: 52, s: 3, d: 3.3, t: 3.4 }, { x: 66, y: 61, s: 2, d: 1.8, t: 2.7 },
  { x: 71, y: 41, s: 3.5, d: 0.1, t: 3.9 }, { x: 83, y: 54, s: 2.5, d: 2.6, t: 2.6 },
  { x: 92, y: 47, s: 3, d: 1.4, t: 3.3 }, { x: 6, y: 20, s: 2, d: 3.6, t: 2.8 },
  { x: 28, y: 37, s: 2.5, d: 0.7, t: 3.5 }, { x: 59, y: 68, s: 3, d: 2.1, t: 2.9 },
  { x: 77, y: 8, s: 2, d: 1.2, t: 3.0 }, { x: 34, y: 57, s: 2.5, d: 3.0, t: 2.5 },
]

const STAR = 'M5 0C5.5 3.3 6.7 4.5 10 5 6.7 5.5 5.5 6.7 5 10 4.5 6.7 3.3 5.5 0 5 3.3 4.5 4.5 3.3 5 0Z'
</script>

<template>
  <div class="aurora" aria-hidden="true">
    <span class="wash" />
    <span class="blob teal" />
    <span class="blob cyan" />
    <span class="blob mint" />
    <span class="blob azure" />
    <span class="beam" />

    <svg
      v-for="(k, i) in sparks"
      :key="i"
      class="spark"
      viewBox="0 0 10 10"
      :width="k.s"
      :height="k.s"
      :style="{
        left: k.x + '%',
        top: k.y + '%',
        animationDelay: k.d + 's',
        animationDuration: k.t + 's',
      }"
    >
      <path :d="STAR" fill="currentColor" />
    </svg>

    <svg
      v-for="(k, i) in dust"
      :key="'d' + i"
      class="spark dust"
      viewBox="0 0 10 10"
      :width="k.s"
      :height="k.s"
      :style="{
        left: k.x + '%',
        top: k.y + '%',
        animationDelay: k.d + 's',
        animationDuration: k.t + 's',
      }"
    >
      <path :d="STAR" fill="currentColor" />
    </svg>
  </div>
</template>

<style scoped>
.aurora {
  position: absolute;
  inset: -60px -40px auto -40px;
  height: 430px;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  color: #d8fff4;
  -webkit-mask-image: linear-gradient(180deg, #000 0%, #000 46%, transparent 88%);
  mask-image: linear-gradient(180deg, #000 0%, #000 46%, transparent 88%);
}

/* camada base: várias radiais sobrepostas */
.wash {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(46% 34% at 22% 30%, rgba(45, 232, 178, 0.34), transparent 68%),
    radial-gradient(44% 32% at 80% 26%, rgba(56, 178, 255, 0.36), transparent 70%),
    radial-gradient(52% 30% at 50% 12%, rgba(110, 240, 210, 0.2), transparent 72%),
    radial-gradient(38% 26% at 64% 52%, rgba(78, 140, 255, 0.26), transparent 70%),
    radial-gradient(40% 30% at 30% 62%, rgba(60, 220, 200, 0.24), transparent 74%),
    radial-gradient(60% 40% at 50% 34%, rgba(232, 181, 99, 0.16), transparent 70%);
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(34px);
  mix-blend-mode: screen;
  opacity: 0.7;
  animation: drift 14s ease-in-out infinite alternate;
}

.teal {
  left: 4%;
  top: 16%;
  width: 190px;
  height: 160px;
  background: radial-gradient(circle, #2ff0bd 0%, rgba(47, 240, 189, 0) 70%);
}

.cyan {
  right: 2%;
  top: 8%;
  width: 210px;
  height: 180px;
  background: radial-gradient(circle, #38c6ff 0%, rgba(56, 198, 255, 0) 70%);
  animation-delay: -4s;
}

.mint {
  left: 34%;
  top: -6%;
  width: 200px;
  height: 150px;
  background: radial-gradient(circle, #7bffd8 0%, rgba(123, 255, 216, 0) 70%);
  animation-delay: -8s;
  opacity: 0.6;
}

.azure {
  left: 46%;
  top: 40%;
  width: 240px;
  height: 170px;
  background: radial-gradient(circle, #5b8cff 0%, rgba(91, 140, 255, 0) 72%);
  animation-delay: -11s;
  opacity: 0.55;
}

/* feixe diagonal sutil, dá direção à luz */
.beam {
  position: absolute;
  inset: 0;
  background: linear-gradient(112deg, transparent 28%, rgba(190, 255, 240, 0.14) 46%, transparent 62%);
}

.spark {
  position: absolute;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 0 4px rgba(150, 255, 235, 0.9));
  animation-name: twinkle;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.dust {
  filter: drop-shadow(0 0 2px rgba(170, 255, 240, 0.7));
  opacity: 0.75;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.15;
    transform: translate(-50%, -50%) scale(0.55) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.15) rotate(45deg);
  }
}

@keyframes drift {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }
  to {
    transform: translate3d(14px, -12px, 0) scale(1.12);
  }
}

@media (prefers-reduced-motion: reduce) {
  .spark,
  .blob {
    animation: none;
  }
  .spark {
    opacity: 0.7;
  }
  .dust {
    opacity: 0.5;
  }
}
</style>
