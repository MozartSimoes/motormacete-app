// backfill-vehiclemodel-triumph-dafra-sundown.ts — corrige uma lacuna: os seeds de
// TRIUMPH, DAFRA e SUNDOWN (baseados no template seed-kasinski-comet.ts) só
// criaram Tip/TirePressure/MaintenanceItem, mas nunca inseriram VehicleModel.
// Como as páginas SEO estáticas (/macetes/[marca]/[modelo]/[ano]) e o sitemap
// dependem de VehicleModel (via generate-catalog.ts), esses modelos nunca
// apareciam nelas — mesmo já funcionando normalmente na busca ao vivo do
// usuário (que casa contra o nome FIPE direto, sem depender de VehicleModel).
// Upsert é aditivo/idempotente — não apaga nada.
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

const allSeedFiles = readdirSync(__dirname).filter((f) => f.startsWith('seed-') && f.endsWith('.ts'))

const BRAND_FILES: Record<string, string[]> = {
  TRIUMPH: allSeedFiles.filter((f) => f.startsWith('seed-triumph-')).map((f) => join(__dirname, f)),
  DAFRA: allSeedFiles.filter((f) => f.startsWith('seed-dafra')).map((f) => join(__dirname, f)),
  SUNDOWN: allSeedFiles.filter((f) => f.startsWith('seed-sundown-')).map((f) => join(__dirname, f)),
}

function extractModelNames(filePath: string): string[] {
  const content = readFileSync(filePath, 'utf8')
  const names = new Set<string>()
  const re = /modelName:\s*'([^']+)'/g
  let m: RegExpExecArray | null
  while ((m = re.exec(content))) names.add(m[1])
  return [...names]
}

async function main() {
  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  for (const [brandName, files] of Object.entries(BRAND_FILES)) {
    const brand = await prisma.brand.upsert({
      where: { name_vehicleTypeId: { name: brandName, vehicleTypeId: motoType.id } },
      update: {},
      create: { name: brandName, vehicleTypeId: motoType.id },
    })

    const allNames = new Set<string>()
    for (const f of files) for (const n of extractModelNames(f)) allNames.add(n)

    let created = 0
    for (const name of allNames) {
      const res = await prisma.vehicleModel.upsert({
        where: { name_brandId: { name, brandId: brand.id } },
        update: {},
        create: { name, brandId: brand.id },
      })
      created++
      void res
    }
    console.log(`✅ ${brandName}: ${created} VehicleModel upsertados (de ${files.length} arquivos)`)
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
