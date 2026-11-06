Crie um novo artigo SEO no MotorMacete seguindo o processo abaixo.

## Entrada esperada

O usuário vai informar (peça caso não tenha fornecido):
- **Tema/título** do artigo
- **Categoria**: `motor` | `freios` | `suspensao` | `eletrica` | `transmissao` | `manutencao`

## Passo 1 — Gerar o conteúdo

Escreva um artigo técnico automotivo em português brasileiro com:
- `slug`: kebab-case do título, sem acentos
- `title`: título completo
- `description`: resumo de 1-2 frases (usado no SEO)
- `category` + `categoryLabel`: conforme tabela abaixo
- `readingTime`: estimativa realista em minutos
- `publishedAt` / `updatedAt`: data de hoje no formato `YYYY-MM-DD`
- `content`: array de Section usando os helpers `p()`, `h2()`, `h3()`, `ul()`, `ol()`, `box()`

**Categorias disponíveis:**
| category | categoryLabel |
|---|---|
| motor | Motor |
| freios | Freios |
| suspensao | Suspensão |
| eletrica | Elétrica |
| transmissao | Transmissão |
| manutencao | Manutenção |

**Tipos de Section:**
- `p('texto')` — parágrafo
- `h2('título')` — seção principal
- `h3('subtítulo')` — subseção
- `ul(['item1', 'item2'])` — lista com bullets laranja
- `ol(['passo1', 'passo2'])` — lista numerada
- `box('tip' | 'warn' | 'danger', 'texto')` — caixa de destaque

## Passo 2 — Inserir em artigos.ts

Abra `apps/web/lib/artigos.ts` e adicione o novo objeto no array `ARTICLES`. Mantenha a ordem cronológica (mais recente no início ou no final — siga o padrão já existente no arquivo).

## Passo 3 — Verificar

Confirme que o TypeScript não tem erros:
```bash
pnpm typecheck
```

Se passar, informe o slug gerado para o usuário testar em `/artigos/<slug>`.

## Padrão de qualidade

- Mínimo 600 palavras de conteúdo real (não genérico)
- Pelo menos 2 `h2`, 1 `ul` ou `ol`, 1 `box`
- Foco em veículos populares no Brasil (Fiat, VW, Chevrolet, Hyundai, Toyota, Renault)
- Tom direto, técnico mas acessível — sem jargão desnecessário
- Não mencionar marcas de peças fictícias — mencionar Gates, Dayco, Contitech, Bosch, Mahle quando relevante
