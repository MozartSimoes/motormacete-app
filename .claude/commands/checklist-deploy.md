Execute o checklist completo antes de fazer merge de `staging` → `main` no MotorMacete.

## Checklist automático

Execute cada etapa e reporte o resultado.

### 1. TypeScript

```bash
pnpm typecheck
```

Esperado: sem erros. Se houver erros, **não prosseguir** — corrigir antes.

### 2. Build web

```bash
pnpm --filter @motormacete/web build
```

Esperado: build concluído sem erros. Avisos são OK.

### 3. Verificar mudanças

```bash
git log main..staging --oneline
git diff main..staging --stat
```

Revisar o que está entrando em produção. Identificar:
- Novas rotas criadas (estão no `middleware.ts` se precisam de auth?)
- Novas variáveis de ambiente (estão na Vercel?)
- Alterações no schema do banco (migration necessária?)

### 4. Schema do banco

```bash
git diff main..staging -- packages/database/prisma/schema.prisma
```

Se houver mudanças no schema, verificar se existe a migration correspondente:
```bash
ls packages/database/prisma/migrations/
```

O `vercel.json` roda `db:migrate:deploy` automaticamente no deploy — mas só funciona se a migration foi criada com `db:migrate:dev`.

### 5. Variáveis de ambiente novas

Verificar se o código usa alguma `process.env.NOVA_VAR` que não estava antes. Se sim, adicionar na Vercel antes do merge.

## Resultado esperado

Ao final, informe:
- ✅ TypeScript: OK
- ✅ Build: OK  
- ✅ Mudanças revisadas: X commits, Y arquivos
- ✅ / ⚠️ Schema: sem mudanças / migration criada
- ✅ / ⚠️ Env vars: sem novas / adicionadas na Vercel

Se tudo OK, sugerir executar `/pr` para criar o Pull Request.
