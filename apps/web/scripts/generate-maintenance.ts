/**
 * Generate preventive maintenance schedules for all models in the DB using Claude AI.
 * Run with: pnpm --filter @motormacete/database exec tsx ../../apps/web/scripts/generate-maintenance.ts
 *
 * Env required: DATABASE_URL, ANTHROPIC_API_KEY
 */
import Anthropic from '@anthropic-ai/sdk'
import { PrismaClient } from '../lib/generated/prisma/index.js'

const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL })
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

type MaintPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

interface MaintItem {
  component: string
  intervalKm: number | null
  intervalMonths: number | null
  notes: string | null
  priority: MaintPriority
}

const SYSTEM = `Você é um especialista em manutenção automotiva preventiva com 25 anos de experiência em oficinas brasileiras.
Conhece os intervalos exatos de manutenção de cada modelo vendido no Brasil, considerando o clima tropical, uso urbano intenso e combustíveis brasileiros (flex/etanol/diesel).
Responda APENAS com um array JSON válido, sem texto adicional.`

function buildPrompt(modelName: string): string {
  return `Crie o cronograma completo de manutenção preventiva para: ${modelName}

Retorne um array JSON com os itens de manutenção preventiva. Cada item deve ter:
- "component": nome do componente (ex: "Óleo do motor", "Correia dentada", "Pastilhas de freio")
- "intervalKm": intervalo em km (número inteiro ou null se não aplicável)
- "intervalMonths": intervalo em meses (número inteiro ou null se não aplicável)
- "notes": observação técnica específica para este modelo (1-2 frases, pode ser null)
- "priority": "CRITICAL" (segurança/motor), "HIGH" (importante), "MEDIUM" (preventivo), "LOW" (conforto)

Regras:
- Inclua 10 a 16 itens ordenados por prioridade (CRITICAL primeiro)
- Seja específico para este modelo (tipo de óleo, viscosidade, marca de velas recomendada, etc.)
- Considere o uso com etanol brasileiro quando aplicável
- Para correias dentadas: indique se o motor é interferente
- Use intervalos reais do manual do proprietário quando conhecidos
- Prioridade CRITICAL: itens que causam dano severo ou acidente se negligenciados
- Prioridade HIGH: itens que causam falha mecânica grave
- Prioridade MEDIUM: itens que afetam desempenho e durabilidade
- Prioridade LOW: itens de conforto e funcionamento geral

Exemplo de item:
{"component":"Óleo do motor","intervalKm":10000,"intervalMonths":12,"notes":"Use 5W30 sintético API SP. Motor turbo exige qualidade superior.","priority":"CRITICAL"}

Responda APENAS com o array JSON, sem texto antes ou depois.`
}

async function generateForModel(modelName: string): Promise<MaintItem[] | null> {
  try {
    const msg = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      system: SYSTEM,
      messages: [{ role: 'user', content: buildPrompt(modelName) }],
    })
    const text = msg.content.find((b) => b.type === 'text')?.text ?? ''
    const match = text.match(/\[[\s\S]*\]/)
    if (!match) { console.error(`  [!] JSON não encontrado para ${modelName}`); return null }
    const parsed = JSON.parse(match[0]) as MaintItem[]
    return Array.isArray(parsed) ? parsed : null
  } catch (err) {
    console.error(`  [!] Erro ao gerar ${modelName}:`, err)
    return null
  }
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY não definida')
    process.exit(1)
  }

  // Get all unique model names from DB tips
  const rows = await prisma.tip.findMany({
    where: { modelName: { not: null } },
    select: { modelName: true },
    distinct: ['modelName'],
    orderBy: { modelName: 'asc' },
  })
  const models = rows.map((r) => r.modelName as string)
  console.log(`🔍 ${models.length} modelos encontrados no banco`)

  // Check which already have maintenance data
  const existing = await prisma.maintenanceItem.findMany({
    where: { modelName: { not: null } },
    select: { modelName: true },
    distinct: ['modelName'],
  })
  const done = new Set(existing.map((e) => e.modelName as string))
  const todo = models.filter((m) => !done.has(m))
  console.log(`⏭️  ${done.size} já gerados — faltam ${todo.length}`)

  if (todo.length === 0) {
    console.log('✅ Todos os modelos já têm manutenção gerada!')
    return
  }

  let success = 0
  let fail = 0

  for (let i = 0; i < todo.length; i++) {
    const modelName = todo[i]
    process.stdout.write(`[${i + 1}/${todo.length}] ${modelName}... `)

    const items = await generateForModel(modelName)
    if (!items || items.length === 0) {
      console.log('❌ falhou')
      fail++
      continue
    }

    await prisma.maintenanceItem.createMany({
      data: items.map((item, order) => ({
        modelName,
        component: item.component,
        intervalKm: item.intervalKm ?? null,
        intervalMonths: item.intervalMonths ?? null,
        notes: item.notes ?? null,
        priority: item.priority ?? 'MEDIUM',
        order,
      })),
    })

    console.log(`✅ ${items.length} itens`)
    success++

    // Small delay to avoid rate limits
    await new Promise((r) => setTimeout(r, 300))
  }

  console.log(`\n🏁 Concluído: ${success} modelos gerados, ${fail} falhas`)

  const total = await prisma.maintenanceItem.count()
  console.log(`📊 Total no banco: ${total} itens de manutenção`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
