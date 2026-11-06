// One-time cleanup: remove old DOMINATOR 850 records (wrong name; FIPE uses DOMINATOR 650)
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'
const prisma = new PrismaClient()

async function main() {
  const tips = await prisma.tip.deleteMany({ where: { modelName: 'DOMINATOR 850' } })
  console.log('Deleted tips:', tips.count)

  const maint = await prisma.maintenanceItem.deleteMany({ where: { modelName: 'DOMINATOR 850' } })
  console.log('Deleted maintenance items:', maint.count)

  const tp = await prisma.tirePressure.deleteMany({ where: { modelName: 'DOMINATOR 850' } })
  console.log('Deleted tire pressures:', tp.count)

  const model = await prisma.vehicleModel.deleteMany({ where: { name: 'DOMINATOR 850' } })
  console.log('Deleted VehicleModel:', model.count)

  const newTips = await prisma.tip.count({ where: { modelName: 'DOMINATOR 650' } })
  console.log('DOMINATOR 650 tips currently in DB:', newTips)

  const newMaint = await prisma.maintenanceItem.count({ where: { modelName: 'DOMINATOR 650' } })
  console.log('DOMINATOR 650 maintenance items in DB:', newMaint)
}

main().catch(console.error).finally(() => prisma.$disconnect())
