Crie um Pull Request de `staging` → `main` no MotorMacete.

## Processo

### 1. Verificar estado atual

```bash
git status
git log main..staging --oneline
git diff main..staging --stat
```

### 2. Garantir que staging está limpo

Se houver mudanças não commitadas, pergunte ao usuário se deve commitar antes de abrir o PR.

### 3. Criar o PR via gh CLI

```bash
gh pr create \
  --base main \
  --head staging \
  --title "<título descritivo das mudanças>" \
  --body "$(cat <<'EOF'
## O que muda

- <bullet com cada mudança relevante>

## Como testar

- [ ] Abrir staging.motormacete.com.br e verificar as mudanças
- [ ] Confirmar que não há regressões nas páginas principais

## Checklist

- [ ] TypeScript sem erros (`pnpm typecheck`)
- [ ] Build passa (`pnpm build`)
- [ ] Variáveis de ambiente necessárias já estão na Vercel

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

### 4. Se gh CLI não estiver autenticado

Informe o usuário e forneça o link direto para abrir o PR no browser:
```
https://github.com/MozartSimoes/motormacete/compare/main...staging
```

## Contexto do projeto

- **Branch de dev:** `staging`
- **Branch de produção:** `main` (protegida — não aceita push direto)
- **Deploy:** Vercel faz deploy automático após merge
- **Produção:** `motormacete.com.br`
- **Staging:** `staging.motormacete.com.br`
