<script setup lang="ts">
import AppIcon from './AppIcon.vue'
</script>

<template>
  <section class="block">
    <h3 class="section-title">Sessão</h3>

    <button class="logout" type="button">
      <span class="ico"><AppIcon name="logout" :size="19" /></span>
      <span class="txt">
        <span class="lbl">Sair da conta</span>
        <span class="desc">Encerrar acesso neste dispositivo</span>
      </span>
      <AppIcon name="chevron" :size="15" class="chev" />
    </button>

    <p class="foot">
      <AppIcon name="shield" :size="13" />
      Sua conta e dados estão protegidos
    </p>
  </section>
</template>

<style scoped>
.block {
  padding: 18px var(--gutter) 0;
}

.section-title {
  margin: 0 0 9px 2px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: var(--text-4);
}

.logout {
  width: 100%;
  display: grid;
  grid-template-columns: 38px 1fr auto;
  align-items: center;
  gap: 11px;
  padding: 11px 12px;
  border-radius: var(--r-md);
  background: rgba(255, 92, 116, 0.07);
  border: 1px solid rgba(255, 92, 116, 0.3);
  text-align: left;
  transition: transform 0.15s ease, background 0.15s ease;
}
.logout:active {
  transform: scale(0.985);
}
.logout:hover {
  background: rgba(255, 92, 116, 0.12);
}

.ico {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  color: var(--danger);
  background: rgba(255, 92, 116, 0.14);
}

.txt {
  display: grid;
  gap: 2px;
}

.lbl {
  font-size: 14px;
  font-weight: 700;
  color: var(--danger);
  letter-spacing: -0.2px;
}

.desc {
  font-size: 10.5px;
  font-weight: 500;
  color: var(--text-4);
}

.chev {
  color: var(--danger);
}

.foot {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin: 18px 0 0;
  font-size: 10.5px;
  font-weight: 500;
  color: var(--text-4);
}
</style>
