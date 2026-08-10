export interface Player {
  name: string
  id: string
  level: number
  tier: string
  xp: number
  xpToNext: number
  koins: number
  koinsBonus: number
  diamonds: number
}

export const player: Player = {
  name: 'Wesley Andrade',
  id: 'ID 7K-284193',
  level: 7,
  tier: 'Bronze',
  xp: 3800,
  xpToNext: 10000,
  koins: 256,
  koinsBonus: 128,
  diamonds: 2654,
}

export interface Metric {
  key: string
  /** rótulo do card */
  label: string
  /** valor acumulado, exibido no card */
  value: string
  hint: string
  trendUp: boolean
  /** cor do gráfico quando esta métrica está ativa */
  color: string
  /** legenda do gráfico */
  cap: string
  /** variação do período contra os 14 dias anteriores */
  delta: number
  /** sufixo do tooltip ('' para valores em dinheiro) */
  unit: string
  money: boolean
  /** últimos 14 dias */
  days: { d: string; v: number }[]
}

const DIAS = [
  '27/07', '28/07', '29/07', '30/07', '31/07', '01/08', '02/08',
  '03/08', '04/08', '05/08', '06/08', '07/08', '08/08', '09/08',
]

const serie = (vals: number[]) => vals.map((v, i) => ({ d: DIAS[i], v }))

export const metrics: Metric[] = [
  {
    key: 'vitorias',
    label: 'Total vitórias',
    value: '284',
    hint: '+12 hoje',
    trendUp: true,
    color: '#7ee787',
    cap: 'Vitórias · últimos 14 dias',
    delta: 6.94,
    unit: 'vitórias',
    money: false,
    days: serie([12, 15, 13, 19, 16, 14, 18, 15, 21, 17, 16, 25, 22, 31]),
  },
  {
    key: 'apostas',
    label: 'Apostas totais',
    value: '1.947',
    hint: '68 esta semana',
    trendUp: false,
    color: '#58b6ff',
    cap: 'Apostas · últimos 14 dias',
    delta: 4.12,
    unit: 'apostas',
    money: false,
    days: serie([8, 11, 9, 14, 12, 10, 13, 11, 16, 12, 11, 18, 15, 22]),
  },
  {
    key: 'ganho',
    label: 'Total ganho',
    value: 'R$ 42,8k',
    hint: '+8,4%',
    trendUp: true,
    color: '#ff7ab8',
    cap: 'Ganho · últimos 14 dias',
    delta: 8.4,
    unit: '',
    money: true,
    days: serie([
      1200, 1650, 1380, 2100, 1740, 1520, 1980,
      1610, 2400, 1830, 1720, 2950, 2480, 3760,
    ]),
  },
]

export interface Shortcut {
  key: string
  label: string
  icon: string
  badge?: string
  accent: string
}

export const shortcuts: Shortcut[] = [
  { key: 'bonus', label: 'Bônus', icon: 'gift', badge: '3', accent: '#e8b563' },
  { key: 'promos', label: 'Promoções', icon: 'tag', accent: '#b4f03c' },
  { key: 'torneios', label: 'Torneios', icon: 'trophy', badge: 'ao vivo', accent: '#6fd8f5' },
  { key: 'missoes', label: 'Missões', icon: 'target', badge: '2', accent: '#ff8ab5' },
  { key: 'minigames', label: 'Mini games', icon: 'gamepad', accent: '#9b8bff' },
  { key: 'loja', label: 'Loja', icon: 'store', accent: '#ffb347' },
]

export interface MenuItem {
  key: string
  label: string
  desc: string
  icon: string
  meta?: string
}

export const menu: MenuItem[] = [
  { key: 'carteira', label: 'Carteira', desc: 'Depósitos, saques e saldo', icon: 'wallet', meta: 'R$ 1.240,00' },
  { key: 'historico', label: 'Histórico completo', desc: 'Apostas, rodadas e transações', icon: 'clock' },
  { key: 'dados', label: 'Dados pessoais', desc: 'Cadastro, contato e verificação', icon: 'user', meta: 'Verificado' },
  { key: 'indique', label: 'Indique e ganhe', desc: 'Convide amigos e receba 7Koins', icon: 'gift' },
  { key: 'irpf', label: 'Informe de rendimento', desc: 'Documento anual para o IRPF', icon: 'doc' },
  { key: 'protecoes', label: 'Proteções', desc: 'Limites e jogo responsável', icon: 'shield' },
]

/* ─────────────────────────  Conteúdo dos bottom sheets  ───────────────────────── */

export interface Tier {
  key: string
  name: string
  range: string
  color: string
  perks: string[]
  state: 'done' | 'current' | 'locked'
}

export const tiers: Tier[] = [
  {
    key: 'bronze',
    name: 'Bronze',
    range: 'Níveis 1–10',
    color: '#d39a66',
    state: 'current',
    perks: ['Cashback semanal de 2%', 'Giros grátis no aniversário', 'Suporte padrão'],
  },
  {
    key: 'prata',
    name: 'Prata',
    range: 'Níveis 11–25',
    color: '#c7d0e0',
    state: 'locked',
    perks: ['Cashback semanal de 5%', 'Saques prioritários', 'Bônus de recarga mensal'],
  },
  {
    key: 'ouro',
    name: 'Ouro',
    range: 'Níveis 26–45',
    color: '#e8b563',
    state: 'locked',
    perks: ['Cashback semanal de 8%', 'Gerente de conta', 'Torneios exclusivos'],
  },
  {
    key: 'platina',
    name: 'Platina',
    range: 'Níveis 46–70',
    color: '#9fd8f5',
    state: 'locked',
    perks: ['Cashback semanal de 12%', 'Limites de saque ampliados', 'Convites para eventos'],
  },
  {
    key: 'diamante',
    name: 'Diamante',
    range: 'Níveis 71+',
    color: '#7ee787',
    state: 'locked',
    perks: ['Cashback semanal de 15%', 'Gerente 24/7', 'Presentes personalizados'],
  },
]

export interface KoinTask {
  icon: string
  label: string
  desc: string
  reward: string
}

export const koinTasks: KoinTask[] = [
  { icon: 'target', label: 'Missões diárias', desc: 'Até 3 missões por dia', reward: '+15' },
  { icon: 'bolt', label: 'Sequência de login', desc: '7 dias seguidos', reward: '+50' },
  { icon: 'trophy', label: 'Ranking semanal', desc: 'Top 100 da semana', reward: '+120' },
  { icon: 'gift', label: 'Indicar um amigo', desc: 'Após o 1º depósito dele', reward: '+200' },
]

export interface KoinReward {
  icon: string
  label: string
  desc: string
  cost: number
}

export const koinRewards: KoinReward[] = [
  { icon: 'sparkle', label: '20 giros grátis', desc: 'Válido em slots selecionados', cost: 150 },
  { icon: 'wallet', label: 'Bônus de R$ 25', desc: 'Rollover de 3x', cost: 400 },
  { icon: 'diamond', label: '500 diamantes', desc: 'Crédito imediato', cost: 800 },
]

export interface DiamondPack {
  id: string
  amount: number
  price: string
  bonus?: string
  best?: boolean
}

export const diamondPacks: DiamondPack[] = [
  { id: 'p1', amount: 500, price: 'R$ 9,90' },
  { id: 'p2', amount: 1500, price: 'R$ 24,90', bonus: '+10%' },
  { id: 'p3', amount: 4000, price: 'R$ 59,90', bonus: '+25%', best: true },
  { id: 'p4', amount: 10000, price: 'R$ 129,90', bonus: '+40%' },
]

export interface DiamondUse {
  icon: string
  label: string
  desc: string
}

export const diamondUses: DiamondUse[] = [
  { icon: 'store', label: 'Loja de itens', desc: 'Avatares, molduras e emblemas' },
  { icon: 'trophy', label: 'Entrada em torneios', desc: 'Buy-in de eventos especiais' },
  { icon: 'gamepad', label: 'Mini games', desc: 'Tentativas extras na roleta' },
]

export interface Notice {
  id: number
  icon: string
  accent: string
  title: string
  text: string
  time: string
  unread: boolean
}

export const notices: Notice[] = [
  {
    id: 1,
    icon: 'gift',
    accent: '#e8b563',
    title: 'Seu bônus está esperando',
    text: '50 giros grátis liberados em Gates of Olympus.',
    time: 'agora',
    unread: true,
  },
  {
    id: 2,
    icon: 'trophy',
    accent: '#6fd8f5',
    title: 'Torneio ao vivo',
    text: 'Você está em 34º no Weekend Rush. Faltam 2h.',
    time: '12 min',
    unread: true,
  },
  {
    id: 3,
    icon: 'coin',
    accent: '#b4f03c',
    title: '+120 7Koins creditados',
    text: 'Recompensa do ranking semanal.',
    time: '3 h',
    unread: false,
  },
  {
    id: 4,
    icon: 'wallet',
    accent: '#7ee787',
    title: 'Saque aprovado',
    text: 'R$ 480,00 enviados via Pix.',
    time: 'ontem',
    unread: false,
  },
  {
    id: 5,
    icon: 'shield',
    accent: '#ff8ab5',
    title: 'Novo acesso detectado',
    text: 'Login no iPhone 15 · São Paulo, BR.',
    time: '2 dias',
    unread: false,
  },
]

export interface Toggle {
  key: string
  icon: string
  label: string
  desc: string
  on: boolean
}

export interface SettingsGroup {
  title: string
  items: Toggle[]
}

export const settingsGroups: SettingsGroup[] = [
  {
    title: 'Notificações',
    items: [
      { key: 'push', icon: 'bell', label: 'Push', desc: 'Bônus, torneios e missões', on: true },
      { key: 'email', icon: 'doc', label: 'E-mail', desc: 'Resumos e promoções', on: true },
      { key: 'sms', icon: 'volume', label: 'SMS', desc: 'Apenas alertas de segurança', on: false },
    ],
  },
  {
    title: 'Preferências',
    items: [
      { key: 'som', icon: 'volume', label: 'Som dos jogos', desc: 'Efeitos e trilha', on: true },
      { key: 'tema', icon: 'moon', label: 'Tema escuro', desc: 'Sempre ativo', on: true },
      { key: 'saldo', icon: 'lock', label: 'Ocultar saldo', desc: 'Esconde valores na tela', on: false },
    ],
  },
]
