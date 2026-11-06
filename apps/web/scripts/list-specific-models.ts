import { PrismaClient } from '../lib/generated/prisma/index.js'

const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL })

async function main() {
  const rows = await prisma.maintenanceItem.groupBy({
    by: ['modelName'],
    where: { modelName: { not: null } },
    _count: { _all: true },
    orderBy: { modelName: 'asc' },
  })

  console.log(`\n📋 Modelos com manutenção ESPECÍFICA no banco (${rows.length} modelos)\n`)
  rows.forEach((r, i) => {
    console.log(`  ${String(i + 1).padStart(2, ' ')}. ${r.modelName} — ${r._count._all} itens`)
  })

  const generic = await prisma.maintenanceItem.count({ where: { modelName: null } })
  console.log(`\n  + 1 cronograma GENÉRICO com ${generic} itens (fallback para demais modelos)`)
  console.log(`\n  Total de itens no banco: ${rows.reduce((s, r) => s + r._count._all, 0) + generic}`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
