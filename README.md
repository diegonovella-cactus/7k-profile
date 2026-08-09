# 7K · Perfil do Jogador

Tela de perfil de jogador (cassino iGaming) no frame padrão **430 × 932**.

- **Layout:** wireframe enviado (`public/refs/wireframe-profile.png`)
- **Visual:** referência `public/refs/estilo-visual.png` — dark navy + dourado
- **Avatar:** o castelo é **mascarado dentro do círculo**; o personagem fica **por cima, sem corte**, estourando a borda superior

## Rodar

```bash
npm install
npm run dev     # http://localhost:5180
npm run build   # type-check + build de produção
```

## Estrutura

```
src/
  styles/tokens.css       paleta, raios, sombras, --frame-w/--frame-h
  styles/base.css         reset + tipografia
  data/player.ts          mock: jogador, stats, série do gráfico, atalhos, menu
  components/
    ProfileHero.vue       topbar + moedas | medalhão | nível + nome/ID
    AvatarMedallion.vue   anel de XP + castelo mascarado + personagem por cima
    CoinChip.vue          orb de moeda (7Koins / Bônus / Diamantes)
    StatsRow.vue          Total vitórias · Apostas totais · Total apostado
    MiniChart.vue         linha neon dos últimos 14 dias, com tooltip por dia
    ShortcutRail.vue      Bônus · Promoções · Torneios · Missões · Mini games
    MenuList.vue          Carteira → Proteções
    SessionBlock.vue      Sair da conta + selo de segurança
    BottomSheet.vue       shell dos sheets: backdrop, 85% de altura, rodapé fixo
    sheets/               conteúdo de cada sheet (7Koins, Diamantes,
                          Configurações, Notificações, Níveis)
```

## Bottom sheets

Abertos por 7Koins, Diamantes, configurações, notificações e "Ver níveis".
`ProfileHero` só emite `open` com a chave; quem guarda o estado é o `App.vue`.

O `BottomSheet` é o shell compartilhado — backdrop, altura de 85%, cabeçalho com
título e fechar, corpo rolável e rodapé fixo de dois botões. Ele fica **dentro
do `.frame`**, não do viewport, para respeitar o formato 430×932. Fecha no
backdrop e no `Esc`.

As peças visuais repetidas (seção, card, linha, chip, botões) estão em
`styles/sheet.css` com prefixo `sh-`, global de propósito: são as mesmas formas
nos cinco conteúdos, e classes com escopo não atravessariam os componentes.

## Variantes de moeda

O visual atual (arte solta dentro de uma caixa de vidro) é um **teste**. A versão
anterior — moedas douradas com aro, sem caixa — está guardada em
`src/assets/variants/`. Para voltar:

```bash
cp src/assets/variants/v1-coin-7koins.png  src/assets/coin-7koins.png
cp src/assets/variants/v1-coin-diamante.png src/assets/coin-diamante.png
```

e remover o atributo `boxed` das duas tags `<CoinChip>` em `ProfileHero.vue`.

## Notas

- **Recolorir:** tudo sai de `src/styles/tokens.css`. Trocar `--gold` / `--lime` / superfícies recolore o app inteiro.
- **Tamanho do personagem no medalhão:** prop `heroScale` do `AvatarMedallion` (1.183). Diminuir revela mais castelo.
- **Responsivo abaixo de 390px:** o medalhão é dimensionado por `--s` no CSS do `AvatarMedallion`, não por prop, justamente para a media query poder encolhê-lo. Medidas internas (disco, botão da câmera) são percentuais e acompanham. Moedas e bloco de nível ficam em `z-index: 2` e o personagem em `1`, então em telas estreitas ele passa por trás em vez de cobrir.
- **`public/_shot.html`:** harness de captura — carrega o app num iframe. Hash `<scroll>,<faixaDoGráfico>,<cardDeStat>,<largura>`: `#0` topo, `#-1` fim, `#0,5` toca na 6ª faixa do gráfico, `#0,,2` seleciona o 3º stat card, `#0,,,360` renderiza a 360px.
- **Asset do personagem:** o PNG original vinha sem canal alpha (xadrez de transparência chapado). Foi recortado por flood fill a partir das bordas e salvo com alpha em `src/assets/personagem-avatar.png`.
