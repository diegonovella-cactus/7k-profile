<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'
import AppIcon from './AppIcon.vue'

const props = withDefaults(
  defineProps<{ open: boolean; title: string; search?: boolean }>(),
  { search: false },
)
const emit = defineEmits<{ close: []; search: [] }>()

const sheetEl = ref<HTMLElement | null>(null)
const bodyEl = ref<HTMLElement | null>(null)

/* ── gesto de arrastar para fechar ─────────────────────────────────────────
   Dois pontos de partida: a "alça" (handle + cabeçalho), que sempre arrasta,
   e o corpo, que só arrasta quando já está no topo do scroll — senão o gesto
   pertence à rolagem da lista. */
const dragY = ref(0)
const dragging = ref(false)

let startY = 0
let lastY = 0
let lastT = 0
let velocity = 0
let armed = false
let fromBody = false
let sheetH = 700

const CLOSE_RATIO = 0.28 /* fração da altura que já conta como fechar */
const CLOSE_FLICK = 0.65 /* px/ms: um lançar rápido fecha mesmo sem distância */

function onDown(e: PointerEvent, viaBody: boolean) {
  if (e.button !== 0) return
  startY = lastY = e.clientY
  lastT = e.timeStamp
  velocity = 0
  armed = true
  fromBody = viaBody
  sheetH = sheetEl.value?.offsetHeight ?? 700
  window.addEventListener('pointermove', onMove, { passive: false })
  window.addEventListener('pointerup', onUp)
  window.addEventListener('pointercancel', onUp)
}

function onMove(e: PointerEvent) {
  if (!armed) return
  const dy = e.clientY - startY

  if (!dragging.value) {
    if (dy < 5) return
    // no corpo, só assume o gesto se a lista já estiver no topo
    if (fromBody && (bodyEl.value?.scrollTop ?? 0) > 0) {
      armed = false
      return
    }
    dragging.value = true
  }

  if (e.cancelable) e.preventDefault()

  const dt = e.timeStamp - lastT
  if (dt > 0) velocity = (e.clientY - lastY) / dt
  lastY = e.clientY
  lastT = e.timeStamp

  // para cima há resistência: o sheet não sobe além do topo
  dragY.value = dy > 0 ? dy : dy * 0.22
}

function onUp() {
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerup', onUp)
  window.removeEventListener('pointercancel', onUp)
  armed = false
  if (!dragging.value) return

  dragging.value = false
  if (dragY.value > sheetH * CLOSE_RATIO || velocity > CLOSE_FLICK) {
    dragY.value = sheetH // desliza até sumir, depois desmonta
    setTimeout(() => emit('close'), 190)
  } else {
    dragY.value = 0 // volta ao lugar
  }
}

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}

watch(
  () => props.open,
  (v) => {
    if (v) {
      dragY.value = 0
      dragging.value = false
      window.addEventListener('keydown', onKey)
    } else {
      window.removeEventListener('keydown', onKey)
    }
  },
)

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  onUp()
})
</script>

<template>
  <Transition name="fade">
    <div
      v-if="open"
      class="backdrop"
      :style="{ opacity: dragY > 0 ? Math.max(0, 1 - dragY / sheetH) : 1 }"
      @click="emit('close')"
    />
  </Transition>

  <Transition name="rise">
    <section
      v-if="open"
      ref="sheetEl"
      class="sheet"
      :class="{ dragging }"
      :style="{ transform: `translateY(${dragY}px)` }"
      role="dialog"
      aria-modal="true"
      :aria-label="title"
    >
      <div class="grab" @pointerdown="onDown($event, false)">
        <span class="grip" />
        <header class="head">
          <h2>{{ title }}</h2>
          <div class="tools">
            <button v-if="search" type="button" aria-label="Buscar" @click="emit('search')">
              <AppIcon name="search" :size="21" />
            </button>
            <span v-if="search" class="sep" />
            <button type="button" aria-label="Fechar" @click="emit('close')">
              <AppIcon name="close" :size="21" />
            </button>
          </div>
        </header>
      </div>

      <div ref="bodyEl" class="body" @pointerdown="onDown($event, true)">
        <slot />
      </div>

      <footer v-if="$slots.footer" class="foot">
        <slot name="footer" />
      </footer>
    </section>
  </Transition>
</template>

<style scoped>
.backdrop {
  position: absolute;
  inset: 0;
  z-index: 19;
  background: rgba(6, 8, 20, 0.42);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

/* liquid glass: translúcido de verdade, o conteúdo atrás atravessa borrado */
.sheet {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  height: 85%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 26px 26px 0 0;
  background: linear-gradient(
    180deg,
    rgba(46, 54, 100, 0.62) 0%,
    rgba(26, 32, 66, 0.72) 38%,
    rgba(15, 19, 41, 0.82) 100%
  );
  backdrop-filter: blur(30px) saturate(185%);
  -webkit-backdrop-filter: blur(30px) saturate(185%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.18),
    0 -18px 50px rgba(0, 0, 0, 0.5);
  transition: transform 0.26s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}
.sheet.dragging {
  transition: none; /* durante o arrasto o dedo manda, não a curva */
}

/* brilho especular + floração de cor no vidro: azul, verde e rosa em
   opacidade baixíssima, só o suficiente para o fundo não ficar chapado */
.sheet::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  background:
    radial-gradient(90% 38% at 12% 0%, rgba(255, 255, 255, 0.1), transparent 62%),
    radial-gradient(64% 30% at 88% 4%, rgba(88, 182, 255, 0.13), transparent 68%),
    radial-gradient(58% 28% at 4% 42%, rgba(126, 231, 135, 0.11), transparent 70%),
    radial-gradient(66% 30% at 96% 62%, rgba(232, 99, 168, 0.12), transparent 70%),
    radial-gradient(72% 32% at 10% 102%, rgba(232, 99, 168, 0.13), transparent 72%),
    radial-gradient(72% 32% at 92% 100%, rgba(88, 182, 255, 0.12), transparent 72%);
}

@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .sheet {
    background: linear-gradient(180deg, #1c2246, #12162c);
  }
}

.grab {
  flex: none;
  position: relative;
  z-index: 1;
  touch-action: none; /* aqui o gesto é sempre nosso */
  cursor: grab;
}
.grab:active {
  cursor: grabbing;
}

.grip {
  display: block;
  width: 42px;
  height: 4px;
  margin: 9px auto 0;
  border-radius: var(--r-pill);
  background: rgba(255, 255, 255, 0.28);
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px var(--gutter);
}

.head h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.6px;
}

.tools {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-2);
}

.tools button {
  display: grid;
  place-items: center;
  padding: 4px;
  border-radius: 8px;
  touch-action: auto;
  transition: color 0.15s ease, transform 0.15s ease;
}
.tools button:hover {
  color: var(--text);
}
.tools button:active {
  transform: scale(0.9);
}

.sep {
  width: 1px;
  height: 22px;
  background: rgba(255, 255, 255, 0.16);
}

.body {
  position: relative;
  z-index: 1;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  touch-action: pan-y;
  padding: 4px var(--gutter) 20px;
}
.body::-webkit-scrollbar {
  width: 0;
}

.foot {
  position: relative;
  z-index: 1;
  flex: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 12px var(--gutter) calc(12px + env(safe-area-inset-bottom, 0px));
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(180deg, rgba(12, 16, 34, 0.35), rgba(10, 13, 30, 0.6));
}

/* animações de entrada e saída */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0 !important;
}

.rise-enter-active {
  transition: transform 0.34s cubic-bezier(0.22, 1, 0.36, 1);
}
.rise-leave-active {
  transition: transform 0.22s ease-in;
}
.rise-enter-from,
.rise-leave-to {
  transform: translateY(100%) !important;
}

@media (prefers-reduced-motion: reduce) {
  .sheet,
  .rise-enter-active,
  .rise-leave-active,
  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }
}
</style>
