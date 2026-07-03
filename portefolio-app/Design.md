# Design.md — Sistema de Design do Portefólio

> Fonte de verdade para todas as decisões visuais e de interação do site.
> Qualquer componente novo deve seguir estas regras. Os tokens vivem em
> `src/app/globals.css` (`:root`) e as primitivas de animação em
> `src/components/motion/primitives.tsx`.

---

## 1. Identidade

**Conceito:** "engenheiro que também desenha" — estética de terminal quente.
Fundo escuro acastanhado (não preto puro), tipografia serif expressiva para
títulos, mono técnica para metadados, e um único acento azul frio que
contrasta com a base quente.

**Personalidade:** técnico, direto, artesanal. Nada de gradientes arco-íris,
glassmorphism gratuito ou stock photos.

**Tom de escrita:** primeira pessoa, frases curtas, português de Portugal,
minúsculas nos metadados (`viseu · gmt+1`), sem travessões.

---

## 2. Cor

Todos os valores são variáveis CSS em `:root`. **Nunca** usar hex direto em
componentes — sempre `var(--token)`.

### Fundos e superfícies

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#0F0C0A` | fundo da página |
| `--bg-2` | `#14100C` | faixas alternadas, células de grelha |
| `--surface` | `#1A1511` | cartões |
| `--surface-2` | `#231C15` | cartões elevados, hover de superfícies |

### Bordas

| Token | Valor | Uso |
|---|---|---|
| `--border` | `#2C241C` | borda padrão de cartões e botões |
| `--border-soft` | `#211A14` | separadores, bordas discretas |

### Texto

| Token | Valor | Uso |
|---|---|---|
| `--text` | `#F3ECE2` | títulos e texto principal |
| `--text-dim` | `#C9BEAF` | parágrafos |
| `--muted` | `#978A7B` | metadados, legendas |
| `--muted-2` | `#6E645A` | numeração, texto decorativo |

### Acento e estados

| Token | Valor | Uso |
|---|---|---|
| `--ac` | `#60B8FF` | acento principal (links, CTAs, itálicos destacados) |
| `--ac-hot` | `#85CDFF` | hover do acento |
| `--ac-deep` | `#3A9FD6` | acento discreto (numeração de projetos, bordas hover) |
| `--ok` | `#62BC85` | disponibilidade, sucesso |
| `--warn` | `#E8923D` | avisos, segunda aurora do fundo |
| `--bad` | `#E5604D` | erros |

**Regras:**
- Um só acento por bloco visual. O azul `--ac` marca *a* palavra importante,
  não três.
- Texto sobre `--ac`: sempre `#15100a` (escuro), nunca branco.
- Transparências: usar `color-mix(in srgb, var(--token) N%, transparent)`.

---

## 3. Tipografia

| Papel | Fonte | Variável | Pesos |
|---|---|---|---|
| Títulos | Instrument Serif | `--serif` | 400 (normal + itálico) |
| Corpo | Hanken Grotesk | `--sans` | 300–700 |
| Técnico | JetBrains Mono | `--mono` | 400–600 |

### Escala

| Elemento | Tamanho | Line-height | Notas |
|---|---|---|---|
| H1 (hero) | `clamp(46px, 7vw, 88px)` | 1.04 | serif, `letter-spacing: -.015em` |
| H2 (secção) | `clamp(34px, 4.5vw, 54px)` | 1.08 | serif, `letter-spacing: -.01em` |
| H2 (contacto) | `clamp(42px, 6.5vw, 76px)` | 1.06 | serif |
| H3 (cartão) | 25–30px | 1.1–1.15 | serif |
| Lead | 19px | 1.6 | `--text-dim`, máx. `50ch` |
| Corpo | 17–18px | 1.6–1.65 | máx. `58ch` |
| Secundário | 15px | 1.55 | `--muted` / `--text-dim` |
| Kicker/meta | 12–13px | — | mono, uppercase, `letter-spacing: .08em–.14em` |

**Regras:**
- Serif nos títulos, sempre peso 400. A ênfase faz-se com *itálico + cor de
  acento*, nunca com bold.
- Mono é exclusiva de metadados, kickers, numeração, tags e elementos de
  "terminal". Nunca em parágrafos.
- Largura de leitura: parágrafos limitados a `50–58ch`.

---

## 4. Espaçamento e layout

- **Container:** `max-width: 1180px`, padding lateral `32px` (desktop) /
  `20px` (mobile).
- **Ritmo vertical de secções:** `96–104px` de topo em desktop, `60–72px`
  em mobile. Fecho de secção `30px` (o espaçamento pertence ao topo da
  secção seguinte).
- **Grelhas:** 2 colunas em desktop, 1 em mobile. Colunas assimétricas
  usam proporções `.85fr/1.15fr` ou `1.22fr/.92fr`.
- **Gaps:** 14–18px entre cartões, 54px entre colunas de conteúdo.
- **Breakpoint único:** 768px (`useIsMobile`), 640px para a Nav.

### Raios de curvatura

| Raio | Uso |
|---|---|
| `16px` | cartões e blocos grandes |
| `10–11px` | botões, itens de lista |
| `999px` | pills e tags |

### Sombras

- Cartões elevados: `0 34px 90px -46px rgba(0,0,0,.85)`
- Hover de cartão: `0 28px 64px -38px rgba(0,0,0,.75)`
- CTA primário: `0 12px 34px -14px color-mix(in srgb, var(--ac) 75%, transparent)`

---

## 5. Movimento

Primitivas em `src/components/motion/primitives.tsx`. **Não criar variantes
ad-hoc** — usar estas.

### Constantes

| Nome | Valor | Uso |
|---|---|---|
| `EASE` | `cubic-bezier(0.16, 1, 0.3, 1)` | ease-out expressivo, padrão do site |
| `SPRING_SOFT` | `spring(260, 22)` | entradas de cartões |

### Primitivas

| Componente | O que faz | Onde se usa |
|---|---|---|
| `TextReveal` | reveal palavra a palavra com máscara vertical | H1 do hero (`immediate`), H2 de secções |
| `Reveal` | fade-up ao entrar no viewport | blocos genéricos |
| `Magnetic` | elemento atrai-se ao cursor (só rato) | CTAs |
| `Tilt` | tilt 3D + spotlight que segue o cursor | cartões de projeto, terminal do hero |
| `ScrollProgress` | barra de progresso de leitura no topo | Nav (global) |
| `SectionHeader` | kicker numerado + linha + título com reveal | todas as secções |

### Durações e orquestração

- Micro-interações (hover, cor, borda): `0.2–0.3s`.
- Entradas de conteúdo: `0.55–0.75s` com `EASE`.
- Reveal de título: `0.75s` por palavra, stagger `0.05–0.09s`.
- Stagger de listas/cartões: `0.08–0.14s` entre filhos.
- Sequência do hero: kicker `0.05s` → saudação `0.2s` → H1 `0.3s` →
  lead `0.65s` → parágrafo `0.78s` → CTAs `0.92s` → marquee `1.1s`.
- Ambiente (auroras, float): `7–32s`, sempre subtil.

### Regras de movimento

1. **Só propriedades aceleradas por GPU:** `opacity`, `transform`, `filter`.
   Nunca animar `width`/`height`/`top`/`left`.
2. **`prefers-reduced-motion` é obrigatório:** todo o componente animado
   usa `useReducedMotion()` (JS) e/ou a media query (CSS). Com movimento
   reduzido: fades simples, sem deslocações, ambient estático.
3. **Animações de scroll disparam uma vez** (`viewport={{ once: true }}`).
4. **Interações de cursor** (tilt, magnetic, spotlight) só com
   `pointerType === "mouse"` / `(pointer: fine)` — nunca em touch.
5. O movimento comunica hierarquia: o que anima primeiro é o que deve ser
   lido primeiro.

---

## 6. Fundo ambiente (`Ambient.tsx`)

Camada fixa, decorativa (`aria-hidden`, `pointer-events: none`, `z-index: 0`;
conteúdo em `z-index: 1`):

1. **Grelha técnica** — linhas de 76px, opacidade 0.5, mascarada a partir
   do topo do viewport.
2. **Auroras** — dois blobs com `blur(80px)`: azul (`--ac` a 13%) no topo
   direito, âmbar (`--warn` a 7%) no fundo esquerdo. Deriva de 26s/32s.
3. **Spotlight** — gradiente radial de 560px que segue o cursor com spring
   suave (desktop apenas).
4. **Grão** — ruído SVG, opacidade 0.05, `mix-blend-mode: overlay`.

Intensidades máximas: acento ≤ 15%, grão ≤ 0.06. O fundo nunca compete com
o conteúdo.

---

## 7. Componentes

### Botões

- **Primário:** fundo `--ac`, texto `#15100a`, peso 600, raio 11px, padding
  `15–16px 26–30px`, sombra azul, classe `.shine` (varrimento de brilho em
  hover), embrulhado em `<Magnetic>`.
- **Secundário:** borda `--border`, texto `--text`; hover muda borda e texto
  para a cor de contexto (`--ac` para navegação, `--ok` para WhatsApp).
- Hover nunca cresce o botão (`scale` proibido em botões); o movimento vem
  do magnetismo.

### Cartões

- `--surface`, borda `--border`, raio 16px, `overflow: hidden`.
- Hover (desktop): borda `--ac-deep`, sombra elevada, `Tilt` máx. 4–6°,
  spotlight interno a 10%.
- Cartões de projeto: imagem 16/9 com zoom 1.04 em hover + selo "visitar ↗".

### Cabeçalho de secção (`SectionHeader`)

Sempre: kicker mono uppercase com número (`01`–`06`) em `--muted-2`, rótulo
em `--ac`, linha decorativa que se estende, e H2 serif com `TextReveal` e
*uma* palavra em itálico + `--ac`.

### Nav

Fixa, 52px, transparente no topo; com scroll ganha fundo
`color-mix(--bg 85%)` + blur 14px + borda inferior. Links mono 12px com
sublinhado animado. `ScrollProgress` de 2px acima de tudo.

### Grelhas de células (Proof, Principles)

Células `--bg-2` separadas por gap de 1px sobre fundo `--border` (efeito de
tabela técnica), contentor com borda + raio 16px.

---

## 8. Acessibilidade

- Contraste mínimo AA: texto principal sobre `--bg` ≥ 7:1; `--muted` só em
  tamanhos ≥ 12px uppercase mono.
- `:focus-visible` global: outline 2px `--ac`, offset 3px.
- Elementos decorativos: `aria-hidden` (auroras, spotlights, linhas,
  duplicado do marquee).
- Links externos: `rel="noopener noreferrer"` + `aria-label` descritivo.
- Alvos de toque ≥ 44px em mobile.
- `prefers-reduced-motion` respeitado em 100% das animações.

---

## 9. Performance

- Animações apenas com `transform`/`opacity`/`filter`.
- `will-change: transform` só nas auroras (elementos permanentes).
- Fontes via `next/font` com `display: swap`.
- Efeitos de cursor desligados em touch — zero custo em mobile.
- Imagens de projeto: 16/9, ideal ≥ 1200px de largura, JPG otimizado.

---

## 10. Checklist para novos componentes

- [ ] Usa tokens (`var(--…)`) — zero cores hardcoded
- [ ] Serif só em títulos; mono só em metadados
- [ ] Animação com `EASE` ou `SPRING_SOFT` das primitivas
- [ ] `useReducedMotion` respeitado
- [ ] `viewport={{ once: true }}` em animações de scroll
- [ ] Interações de cursor desligadas em touch
- [ ] Decorativos com `aria-hidden`
- [ ] Testado a 360px, 768px e 1280px de largura
