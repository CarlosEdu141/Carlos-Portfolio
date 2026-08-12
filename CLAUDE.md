# Portfólio — Carlos Eduardo Tiago

Vue 3 + Vite. Recriação em componentes reais de um handoff de design de alta fidelidade
(`design_handoff_portfolio_vue/`). O HTML de referência em `design_handoff_portfolio_vue/reference/Portfolio.dc.html`
continua sendo a fonte de verdade visual — abra-o no navegador para comparar cores, espaçamento
e comportamento dos efeitos antes de alterar algo.

## Convenções

- Composition API com `<script setup>` em todo componente. Sem TypeScript.
- Todo valor visual (cor, gradiente, raio, fonte) vem de `src/assets/styles/tokens.css`. Nenhum
  hex solto em componentes — para variações de opacidade de borda, use
  `rgba(var(--accent-rgb), X)` ou `rgba(var(--accent-light-rgb), X)`, nunca um hex novo.
- Todo composable que registra `requestAnimationFrame`, `addEventListener` ou `setInterval` deve
  expor `{ destroy() {...} }` que desfaz tudo, e o componente que o chama deve invocar esse
  `destroy` em `onUnmounted`. Veja `useParticleField.js` como referência.
- Todo efeito interativo (partículas, máscara, tilt, cursor) deve checar
  `window.matchMedia('(prefers-reduced-motion: reduce)').matches` e virar no-op quando verdadeiro.
- Conteúdo (textos, datas, links) vive em `src/data/*.js`, não hardcoded nos componentes.
- Exceção deliberada à regra de cor: `--gradient-fenrys` e `--brand-fenrys-rgb` (em `tokens.css`)
  são a identidade visual da Fenrys Tech, não do portfólio — usados só em `CompanySection.vue`
  para citar a marca. Não espalhe esses tokens para outros componentes.

## Comandos

- `npm run dev` — servidor de desenvolvimento.
- `npm run build` — build de produção; rode antes de considerar qualquer mudança concluída.
- `npm run preview` — serve o build de produção localmente.

## Pendências conhecidas

- Nenhuma foto real ainda: `ImagePlaceholder.vue` substitui a foto da bio e o print da plataforma
  CHARLES (o único card de projeto que ainda não tem imagem). Ao trocar por `<img>` real, mantenha
  o wrapper (`id`/`ref`) intacto — os composables `useCursorMask` dependem dele — e escreva um
  `alt` real descrevendo a imagem.
- `data/projects.js` tem 3 projetos reais (CHARLES em destaque, Olympus e Hydra Investimentos como
  cards padrão) vindos do portfólio antigo (`Novo_Portifolio/src/data/portfolio.js`). Os cards
  `standard` em `ProjectCard.vue` aceitam `project.icon` + `project.iconBg` + `project.iconBlend`
  para logos pequenos (ícone centralizado sobre um fundo colorido, com `mix-blend-mode` opcional
  pra remover fundo branco do arquivo original) — só usar esse caminho quando não houver print de
  verdade ainda.
- Logo da Fenrys Tech já está em `public/` (`FenrysIcon.webp` só o ícone, `Fenrys_transparente.webp`
  ícone + wordmark). Só o ícone é usado hoje, em `CompanySection.vue`.
- Portfólio antigo em `Novo_Portifolio/` (pasta irmã) ainda tem conteúdo não incorporado: um projeto
  "Landing Page FENRYS Tech" (não usado — achamos redundante com a CompanySection), percentuais de
  proficiência por skill, e "React + Vite" como tecnologia em aprendizado.
