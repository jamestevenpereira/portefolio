# Portefólio — James Steven

Site pessoal em [Next.js](https://nextjs.org) (App Router) + Tailwind 4 +
Framer Motion, publicado no Netlify a partir do branch `main`.

- **Produção:** https://james-steven-portefolio.netlify.app
- **Painel Netlify:** https://app.netlify.com/projects/james-steven-portefolio
- **Sistema de design:** ver [`Design.md`](./Design.md)

## Desenvolvimento

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run lint
```

## Deploy

Deploy contínuo via Netlify (base directory `portefolio-app`, publish
`portefolio-app/.next`, plugin `@netlify/plugin-nextjs`). Qualquer push ao
`main` publica automaticamente.

## Variáveis de ambiente (Netlify → Environment variables)

| Variável | Obrigatória | Descrição |
|---|---|---|
| `RESEND_API_KEY` | para o formulário | Chave da API do [Resend](https://resend.com). Sem ela, o formulário de contacto devolve 503 e mostra os contactos diretos como fallback. |
| `CONTACT_FROM_EMAIL` | não | Remetente dos emails, ex. `James Steven <contacto@dominio.pt>`. Requer domínio verificado no Resend. Default: `onboarding@resend.dev` (modo de teste — só entrega ao dono da conta; a confirmação ao cliente fica pendente até haver domínio verificado). |
| `CONTACT_TO_EMAIL` | não | Destino das notificações do formulário. Default: `jamestevenpereira@gmail.com`. |
| `NEXT_PUBLIC_SITE_URL` | não | URL canónico do site quando houver domínio próprio, ex. `https://jamessteven.pt`. Default: URL do Netlify. Afeta sitemap, canonical, Open Graph e JSON-LD. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | não | Ativa o [Plausible Analytics](https://plausible.io) com o domínio indicado. Sem a variável, nenhum script de analytics é carregado. |

### Ativar o formulário de contacto (Resend)

1. Criar conta em https://resend.com (plano gratuito: 100 emails/dia)
2. Criar uma API key e defini-la como `RESEND_API_KEY` no Netlify
3. Redeploy — o formulário fica ativo (notificações chegam ao Gmail)
4. Quando houver domínio próprio: verificar o domínio no Resend e definir
   `CONTACT_FROM_EMAIL` — a partir daí o cliente também recebe o email de
   confirmação automática

## Open Graph

A imagem social (`public/og.png`, 1200×630) é gerada por screenshot da
página interna `/og` (não indexada). Para regenerar depois de mudar o
design:

```bash
npm run build && npm run start &   # servir localmente
npx playwright screenshot --viewport-size=1200,630 \
  http://localhost:3000/og public/og.png
```

(ou qualquer screenshot do elemento do cartão a 1200×630)

## Imagens dos projetos

Colocar em `public/projects/` com os nomes referidos em
`src/components/Work.tsx` (`silkadelics.jpg`, `conceicao-lopes.jpg`,
`irmaos-santos.jpg`, `the-t-lab.jpg`), formato 16:9, largura ≥ 1200px.
Enquanto não existirem, os cartões mostram o placeholder "imagem em breve".
