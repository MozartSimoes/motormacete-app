Crie uma nova página no Next.js (apps/web) seguindo as convenções do MotorMacete.

## Entrada esperada

O usuário vai informar (peça caso não tenha fornecido):
- **Rota** da página (ex: `/home/custos`, `/artigos/especial`)
- **Acesso**: público | autenticado (DRIVER) | mecânico (MECHANIC)
- **Descrição** do que a página faz

## Passo 1 — Criar o arquivo da página

Caminho: `apps/web/app/<rota>/page.tsx`

**Template base (Server Component — padrão):**

```tsx
import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: '<Título da Página> | MotorMacete',
  description: '<Descrição para SEO>',
}

export default function <NomePage>() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Header />
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* conteúdo */}
      </div>
      <Footer />
    </main>
  )
}
```

**Se precisar de estado/interatividade**, adicione `'use client'` no topo e remova o `metadata` export (metadata só funciona em Server Components).

## Passo 2 — Proteção de rota (se autenticada)

Rotas autenticadas já são protegidas automaticamente pelo `middleware.ts`. Não há nada para configurar — só garanta que a rota começa com `/home/` (para DRIVER) ou `/mecanico/` (para MECHANIC).

Para verificar se o usuário é PRO dentro da página:
```ts
import { isPro } from '@/lib/isPro'
// uso dentro de Server Component:
const pro = await isPro()
```

## Passo 3 — Adicionar no CLAUDE.md

Se for uma rota nova importante, adicione-a na tabela de rotas do `CLAUDE.md`.

## Design tokens obrigatórios

| Token | Valor |
|---|---|
| Background | `#050505` |
| Cards | `bg-[#0f0f12]` ou `bg-[#141416]` |
| Bordas | `border-white/10` |
| Texto principal | `text-white` |
| Texto secundário | `text-slate-400` |
| Accent laranja | `#ff6600` / `text-orange-600` |
| Border radius cards | `rounded-2xl` ou `rounded-xl` |

## Verificar

```bash
pnpm typecheck
```
