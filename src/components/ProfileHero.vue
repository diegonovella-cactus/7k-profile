<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'
import AvatarMedallion from './AvatarMedallion.vue'
import CoinChip from './CoinChip.vue'
import TierBadge from './TierBadge.vue'
import HeroAurora from './HeroAurora.vue'
import { player } from '../data/player'
import coin7k from '../assets/coin-7koins.png'
import coinDiamante from '../assets/coin-diamante.png'

const progress = computed(() => player.xp / player.xpToNext)
const pct = computed(() => Math.round(progress.value * 100))
const fmt = (n: number) => n.toLocaleString('pt-BR')

/** o App decide qual bottom sheet mostrar */
defineEmits<{ open: [sheet: 'koins' | 'diamantes' | 'config' | 'notificacoes' | 'niveis'] }>()
</script>

<template>
  <header class="hero">
    <HeroAurora />
    <div class="glow" aria-hidden="true" />

    <div class="stage">
      <div class="coins">
        <CoinChip
          :img="coin7k"
          boxed
          :value="fmt(player.koins)"
          label="7Koins"
          @click="$emit('open', 'koins')"
        />
        <CoinChip
          :img="coinDiamante"
          boxed
          :value="fmt(player.diamonds)"
          label="Diamantes"
          @click="$emit('open', 'diamantes')"
        />
      </div>

      <div class="avatar-slot">
        <AvatarMedallion :progress="progress" />
      </div>

      <div class="level">
        <div class="actions">
          <button type="button" aria-label="Configurações" @click="$emit('open', 'config')">
            <AppIcon name="gear" :size="18" />
          </button>
          <button
            type="button"
            aria-label="Notificações"
            class="has-dot"
            @click="$emit('open', 'notificacoes')"
          >
            <AppIcon name="bell" :size="18" />
          </button>
        </div>

        <button class="tierbtn" type="button" @click="$emit('open', 'niveis')">
          <TierBadge :size="46" />
          <span class="tier">{{ player.tier }}</span>
          <span class="lvl">Nível {{ player.level }}</span>
          <span class="xp">{{ pct }}% XP</span>
        </button>
        <button class="link" type="button" @click="$emit('open', 'niveis')">
          Ver níveis <AppIcon name="chevron" :size="11" />
        </button>
      </div>
    </div>

    <div class="identity">
      <h2>{{ player.name }}</h2>
      <p>{{ player.id }}</p>
    </div>
  </header>
</template>

<style scoped>
.hero {
  position: relative;
  padding: 8px var(--gutter) 14px; /* 6px + 8px de respiro sob o ID */
}

/* todo o conteúdo do cabeçalho — moedas, botões, nível, nome — acima do
   gradiente do topo (3). A aurora fica abaixo dele, de propósito. */
.stage,
.identity {
  position: relative;
  z-index: 4;
}

.glow {
  position: absolute;
  z-index: 0;
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  width: 420px;
  height: 340px;
  pointer-events: none;
  background: radial-gradient(ellipse at center, rgba(232, 181, 99, 0.16), transparent 62%);
}

.actions {
  display: flex;
  gap: 8px;
}

.actions button {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.28);
  transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
}
.actions button:active {
  transform: scale(0.93);
}
.actions button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.45);
}

.has-dot {
  position: relative;
}
.has-dot::after {
  content: '';
  position: absolute;
  top: 6px;
  right: 7px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--danger);
}

/* palco: moedas | medalhão | nível */
.stage {
  position: relative;
  display: grid;
  --col-l: 58px;
  --col-r: 94px;
  grid-template-columns: var(--col-l) minmax(0, 1fr) var(--col-r);
  justify-items: center;
  align-items: center;
  gap: 4px;
  margin-top: -12px; /* sobe moedas, nível e tudo que vem abaixo */
  padding-top: 30px; /* espaço p/ o personagem estourar o círculo */
}

/* Sobe o medalhão + personagem sem reposicionar moedas e nível, e corrige a
   assimetria das colunas laterais: o centro da coluna do meio fica em
   (L−R)/2 do centro da página, então o deslocamento é (R−L)/2. */
.avatar-slot {
  position: relative;
  z-index: 1; /* o personagem fica sob as moedas e o bloco de nível */
  transform: translate(calc((var(--col-r) - var(--col-l)) / 2), -8px); /* -20 + 12: anula a subida do palco */
}

.coins {
  display: grid;
  gap: 12px;
  justify-items: center;
  min-width: 0;
  position: relative;
  left: 10px; /* deslocamento óptico, sem mexer na grade */
  z-index: 2; /* acima do personagem */
}

.level {
  display: grid;
  justify-items: center;
  gap: 8px;
  min-width: 0;
  align-self: start;
  margin-top: -2px;
  position: relative;
  z-index: 2; /* acima do personagem */
}

.tierbtn {
  display: grid;
  justify-items: center;
  gap: 3px;
  padding: 2px;
  transition: transform 0.15s ease;
}
.tierbtn:active {
  transform: scale(0.95);
}

.lvl {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: -0.2px;
  color: var(--text);
  line-height: 1;
}

.xp {
  font-size: 9px;
  font-weight: 600;
  line-height: 1;
  color: rgba(255, 220, 180, 0.72);
}

.tier {
  margin-top: 2px;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 1.3px;
  text-transform: uppercase;
  line-height: 1;
  background: linear-gradient(180deg, #ffe1a3, #ff9c2b);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* mesma pastilha de vidro dos botões de config/notificação */
.link {
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 4px 9px;
  border-radius: var(--r-pill);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.28);
  transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
}
.link:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.45);
}
.link:active {
  transform: scale(0.94);
}

.identity {
  text-align: center;
  /* 15px abaixo dos pés do personagem: com só duas moedas o medalhão
     passou a ser o item mais alto do palco, então a margem = o gap. */
  margin-top: 15px;
}

.identity h2 {
  margin: 0;
  font-size: 19px;
  font-weight: 800;
  letter-spacing: -0.4px;
}

.identity p {
  margin: 3px 0 0;
  font-size: 11.5px;
  font-weight: 500;
  letter-spacing: 0.4px;
  color: var(--text-4);
}
</style>
