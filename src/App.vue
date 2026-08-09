<script setup lang="ts">
import TopBar from './components/TopBar.vue'
import { ref } from 'vue'
import ProfileHero from './components/ProfileHero.vue'
import StatsRow from './components/StatsRow.vue'
import MiniChart from './components/MiniChart.vue'
import ShortcutRail from './components/ShortcutRail.vue'
import MenuList from './components/MenuList.vue'
import SessionBlock from './components/SessionBlock.vue'
import KoinsSheet from './components/sheets/KoinsSheet.vue'
import DiamondsSheet from './components/sheets/DiamondsSheet.vue'
import SettingsSheet from './components/sheets/SettingsSheet.vue'
import NotificationsSheet from './components/sheets/NotificationsSheet.vue'
import LevelsSheet from './components/sheets/LevelsSheet.vue'
import { metrics } from './data/player'

type Sheet = 'koins' | 'diamantes' | 'config' | 'notificacoes' | 'niveis' | null
const sheet = ref<Sheet>(null)
const close = () => (sheet.value = null)

/** o topo sólido só aparece com a página rolada */
const scrolled = ref(false)
const onScroll = (e: Event) => {
  scrolled.value = (e.target as HTMLElement).scrollTop > 16
}

/** card de stat selecionado — define a série e a cor do gráfico */
const metric = ref(0)
</script>

<template>
  <!-- Frame padrão do projeto: 430 × 932 -->
  <div class="frame">
    <TopBar :scrolled="scrolled" />
    <div class="screen scroll-y" @scroll.passive="onScroll">
      <ProfileHero @open="sheet = $event" />
      <div class="panel">
        <StatsRow v-model="metric" />
        <MiniChart :metric="metrics[metric]" />
      </div>
      <ShortcutRail />
      <MenuList />
      <SessionBlock />
      <div class="tail" />
    </div>

    <KoinsSheet :open="sheet === 'koins'" @close="close" />
    <DiamondsSheet :open="sheet === 'diamantes'" @close="close" />
    <SettingsSheet :open="sheet === 'config'" @close="close" />
    <NotificationsSheet :open="sheet === 'notificacoes'" @close="close" />
    <LevelsSheet :open="sheet === 'niveis'" @close="close" />
  </div>
</template>

<style scoped>
.frame {
  width: var(--frame-w);
  height: var(--frame-h);
  max-width: 100vw;
  max-height: 100dvh;
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  background: var(--bg);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05);
}

@media (max-width: 460px), (max-height: 940px) {
  .frame {
    border-radius: 0;
    box-shadow: none;
  }
}

.screen {
  height: 100%;
  padding-top: var(--topbar-h); /* o conteúdo rola por baixo da barra de vidro */
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  background:
    radial-gradient(120% 55% at 50% 0%, #1a2044 0%, transparent 58%),
    linear-gradient(180deg, var(--bg) 0%, var(--bg-deep) 100%);
}

.screen::-webkit-scrollbar {
  width: 0;
}

/* caixa única em volta dos números e do gráfico */
.panel {
  margin: 0 var(--gutter);
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  background: transparent;
}

.tail {
  height: 28px;
}
</style>
