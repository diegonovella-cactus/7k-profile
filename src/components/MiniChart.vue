<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Metric } from '../data/player'

const props = defineProps<{ metric: Metric }>()

const W = 398
const H = 84
const PAD_T = 14
const PAD_B = 12
const PAD_L = 26 /* calha da legenda do eixo vertical */
const PAD_R = 8

const days = computed(() => props.metric.days)

const nf = (n: number) => n.toLocaleString('pt-BR')
/** valor cheio, como aparece no tooltip */
const fmt = (n: number) => (props.metric.money ? `R$ ${nf(n)}` : nf(n))
/** total do período, compactado quando é dinheiro */
const fmtTotal = (n: number) =>
  props.metric.money ? `R$ ${(n / 1000).toFixed(1).replace('.', ',')}k` : nf(n)

const total = computed(() => days.value.reduce((a, d) => a + d.v, 0))
const deltaLabel = computed(() => {
  const d = props.metric.delta
  return `${d >= 0 ? '+' : ''}${d.toFixed(2).replace('.', ',')}%`
})

const domain = computed(() => {
  const vals = days.value.map((d) => d.v)
  const min = Math.min(...vals)
  const max = Math.max(...vals)
  return { min, max, span: max - min || 1 }
})

const yOf = (v: number) => {
  const { min, span } = domain.value
  return PAD_T + (1 - (v - min) / span) * (H - PAD_T - PAD_B)
}

const pts = computed(() => {
  const step = (W - PAD_L - PAD_R) / (days.value.length - 1)
  return days.value.map((d, i) => ({ x: PAD_L + i * step, y: yOf(d.v) }))
})

/** Curva suavizada (Catmull-Rom → Bézier). */
const line = computed(() => {
  const p = pts.value
  let d = `M ${p[0].x} ${p[0].y}`
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i]
    const p1 = p[i]
    const p2 = p[i + 1]
    const p3 = p[i + 2] ?? p2
    d += ` C ${p1.x + (p2.x - p0.x) / 6} ${p1.y + (p2.y - p0.y) / 6}, ${p2.x - (p3.x - p1.x) / 6} ${p2.y - (p3.y - p1.y) / 6}, ${p2.x} ${p2.y}`
  }
  return d
})

/** Mesma curva fechada até a base, para o preenchimento. */
const area = computed(() => {
  const p = pts.value
  return `${line.value} L ${p[p.length - 1].x} ${H} L ${p[0].x} ${H} Z`
})

/** Faixas de toque: cada dia manda do meio do vizinho anterior ao próximo. */
const zones = computed(() =>
  pts.value.map((p, i, arr) => {
    const left = i === 0 ? PAD_L - 8 : (arr[i - 1].x + p.x) / 2
    const right = i === arr.length - 1 ? W : (p.x + arr[i + 1].x) / 2
    return { x: left, w: right - left }
  }),
)

/** Três marcas: máximo, meio e mínimo do período. */
const ticks = computed(() => {
  const { min, max } = domain.value
  const mid = Math.round((min + max) / 2)
  return [max, mid, min].map((v) => ({ v, y: yOf(v) }))
})

const active = ref(days.value.length - 1)
watch(
  () => props.metric.key,
  () => (active.value = days.value.length - 1),
)

const point = computed(() => pts.value[active.value])
const day = computed(() => days.value[active.value])

/** O tooltip acompanha o ponto, mas para de encostar nas bordas. */
const tipLeft = computed(() => {
  const half = 56
  return (Math.min(Math.max(point.value.x, half), W - half) / W) * 100 + '%'
})
</script>

<template>
  <section class="chart" :style="{ '--c': metric.color }">
    <div class="head">
      <span class="cap">{{ metric.cap }}</span>
      <div class="row">
        <strong class="big">{{ fmtTotal(total) }}</strong>
        <span class="delta" :class="{ down: metric.delta < 0 }">
          <i class="pip" />
          {{ deltaLabel }}
        </span>
      </div>
    </div>

    <div class="plot">
      <svg
        :viewBox="`0 0 ${W} ${H}`"
        preserveAspectRatio="none"
        role="img"
        :aria-label="`${metric.cap}, ${fmtTotal(total)} no total`"
      >
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" :stop-color="metric.color" stop-opacity="0.55" />
            <stop offset="55%" :stop-color="metric.color" stop-opacity="0.2" />
            <stop offset="100%" :stop-color="metric.color" stop-opacity="0" />
          </linearGradient>
          <!-- userSpaceOnUse: numa linha vertical a bbox tem largura zero e o
               gradiente em objectBoundingBox degenera. -->
          <linearGradient id="ruleFade" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" :y2="H">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0" />
            <stop offset="40%" stop-color="#ffffff" stop-opacity="0.07" />
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0.15" />
          </linearGradient>
        </defs>

        <!-- uma divisória por dia, dissolvendo para o topo -->
        <line
          v-for="(p, i) in pts"
          :key="'g' + i"
          class="rule"
          :x1="p.x"
          :x2="p.x"
          y1="0"
          :y2="H"
          vector-effect="non-scaling-stroke"
        />

        <path class="area" :d="area" />

        <!-- linha do valor do dia selecionado, lida contra a legenda da esquerda -->
        <line
          class="level"
          :x1="PAD_L - 22"
          :x2="W"
          :y1="point.y"
          :y2="point.y"
          vector-effect="non-scaling-stroke"
        />

        <path class="trace" :d="line" vector-effect="non-scaling-stroke" />

        <rect
          v-for="(z, i) in zones"
          :key="'h' + i"
          class="hit"
          :x="z.x"
          :width="z.w"
          y="0"
          :height="H"
          @pointerdown="active = i"
          @pointerenter="active = i"
        />
      </svg>

      <!-- legenda do eixo vertical -->
      <span v-for="t in ticks" :key="t.v" class="ytick" :style="{ top: (t.y / H) * 100 + '%' }">
        {{ metric.money ? Math.round(t.v / 1000) + 'k' : t.v }}
      </span>

      <!-- marcador e tooltip fora do SVG p/ não esticarem com o preserveAspectRatio -->
      <span
        class="marker"
        :style="{ left: (point.x / W) * 100 + '%', top: (point.y / H) * 100 + '%' }"
      />
      <div class="tip" :style="{ left: tipLeft, top: (point.y / H) * 100 + '%' }">
        <strong>{{ fmt(day.v) }}</strong>
        <em v-if="metric.unit">{{ metric.unit }}</em>
        <span>{{ day.d }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.chart {
  --rule: rgba(255, 255, 255, 0.15);
  position: relative;
  margin: 14px 0 0;
}

.cap {
  display: block;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.2px;
  color: var(--text-4);
}

.big {
  display: block;
  margin-top: 2px;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -1.2px;
  line-height: 1.05;
  color: var(--text);
}

.row {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.delta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  color: var(--c);
}
.delta.down {
  color: var(--danger);
}

.pip {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--c);
}
.delta.down .pip {
  background: var(--danger);
}

.plot {
  position: relative;
  height: 84px;
  margin-top: 8px;
  touch-action: pan-y;
}

svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.rule {
  stroke: url(#ruleFade);
  stroke-width: 1;
}

.level {
  stroke: var(--rule);
  stroke-width: 1;
}

.area {
  fill: url(#areaFill);
  stroke: none;
}

.trace {
  fill: none;
  stroke: var(--c);
  stroke-width: 3.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.hit {
  fill: transparent;
  cursor: pointer;
}

.ytick {
  position: absolute;
  left: 0;
  transform: translateY(-50%);
  font-size: 8.5px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--text-4);
  pointer-events: none;
}

.marker {
  position: absolute;
  width: 10px;
  height: 10px;
  margin: -5px 0 0 -5px;
  border-radius: 50%;
  pointer-events: none;
  background: var(--c);
  border: 2px solid var(--bg);
}

.tip {
  position: absolute;
  transform: translate(-50%, calc(-100% - 12px));
  padding: 4px 8px;
  border-radius: var(--r-sm);
  white-space: nowrap;
  pointer-events: none;
  font-size: 10.5px;
  font-weight: 500;
  color: var(--text-2);
  background: rgba(10, 13, 30, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
.tip strong {
  font-size: 12px;
  font-weight: 800;
  color: var(--c);
}
.tip em {
  margin-left: 4px;
  font-style: normal;
}
.tip span {
  margin-left: 6px;
  color: var(--text-4);
}
</style>
