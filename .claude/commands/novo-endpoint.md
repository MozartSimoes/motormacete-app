Crie uma nova API Route no Next.js (apps/web) seguindo as convenções do MotorMacete.

## Entrada esperada

O usuário vai informar (peça caso não tenha fornecido):
- **Caminho** do endpoint (ex: `/api/recalls`, `/api/vehicles/search`)
- **Métodos HTTP** necessários (GET, POST, PUT, DELETE)
- **Requer autenticação?** (sim/não)
- **O que faz** o endpoint

## Passo 1 — Criar o arquivo

Caminho: `apps/web/app/api/<rota>/route.ts`

**Template com autenticação:**

```ts
import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const param = searchParams.get('param')

  // lógica aqui

  return NextResponse.json({ data })
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()

  // validar body aqui

  // lógica aqui

  return NextResponse.json({ success: true })
}
```

**Template sem autenticação (endpoint público):**

```ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  // lógica aqui
  return NextResponse.json({ data })
}
```

## Convenções obrigatórias

- **Prisma**: importar de `@motormacete/database`, nunca instanciar diretamente. Use o singleton de `@/lib/db`
- **Erros**: sempre retornar `{ error: 'mensagem' }` com status HTTP correto (400, 401, 403, 404, 500)
- **Validação**: validar todos os inputs na borda — não confiar em dados do cliente
- **Sem comentários**: código auto-explicativo via nomes descritivos

## Passo 2 — Verificar

```bash
pnpm typecheck
```

Testar o endpoint com a extensão REST Client do VSCode ou curl.
