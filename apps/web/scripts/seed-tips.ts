/**
 * Seed all tips from data.ts into the Neon PostgreSQL database.
 * Run with: npx tsx apps/web/scripts/seed-tips.ts
 */
import path from 'path'
import { fileURLToPath } from 'url'

// Resolve tsconfig paths manually for this script
const __dirname = path.dirname(fileURLToPath(import.meta.url))
process.env.DATABASE_URL = process.env.DATABASE_URL ?? ''

import { PrismaClient } from '../lib/generated/prisma/index.js'
import { defaultTips, modelTips } from '../lib/data.js'
import type { Category } from '../lib/types.js'

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
})

async function main() {
  console.log('🗑️  Limpando tips existentes...')
  await prisma.tip.deleteMany()

  const rows: {
    modelName: string | null
    category: string
    severity: string
    title: string
    body: string
    yearFrom: number | null
    yearTo: number | null
    order: number
  }[] = []

  // Default tips (modelName = null)
  for (const [category, seeds] of Object.entries(defaultTips)) {
    for (let i = 0; i < seeds.length; i++) {
      const s = seeds[i]
      rows.push({
        modelName: null,
        category,
        severity: s.severity,
        title: s.title,
        body: s.body,
        yearFrom: s.yearRange?.from ?? null,
        yearTo: s.yearRange?.to ?? null,
        order: i,
      })
    }
  }

  // Model-specific tips
  for (const [modelName, categories] of Object.entries(modelTips)) {
    for (const [category, seeds] of Object.entries(categories ?? {})) {
      if (!seeds?.length) continue
      for (let i = 0; i < seeds.length; i++) {
        const s = seeds[i]
        rows.push({
          modelName,
          category,
          severity: s.severity,
          title: s.title,
          body: s.body,
          yearFrom: s.yearRange?.from ?? null,
          yearTo: s.yearRange?.to ?? null,
          order: i,
        })
      }
    }
  }

  console.log(`📝 Inserindo ${rows.length} tips...`)

  // Insert in batches of 100
  const batchSize = 100
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize)
    await (prisma.tip.createMany as any)({ data: batch })
    process.stdout.write(`  ${Math.min(i + batchSize, rows.length)}/${rows.length}\r`)
  }

  console.log(`\n✅ ${rows.length} tips inseridos com sucesso!`)

  const counts = await prisma.tip.groupBy({
    by: ['modelName'],
    _count: true,
  })
  const defaults = counts.find((c) => c.modelName === null)?._count ?? 0
  const models = counts.filter((c) => c.modelName !== null).length
  console.log(`   → ${defaults} tips padrão | ${models} modelos com dados específicos`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
