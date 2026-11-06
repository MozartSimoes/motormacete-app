import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSessionFromRequest } from '@/lib/session'

type Params = { params: Promise<{ id: string }> }

function calcConsumption(logs: { odometer: number; liters: number; fullTank: boolean }[]) {
  // sort ascending by odometer
  const sorted = [...logs].sort((a, b) => a.odometer - b.odometer)
  const result: (number | null)[] = new Array(logs.length).fill(null)

  for (let i = 1; i < sorted.length; i++) {
    if (!sorted[i].fullTank) continue
    // find last full fill before this
    let j = i - 1
    while (j >= 0 && !sorted[j].fullTank) j--
    if (j < 0) continue
    const km = sorted[i].odometer - sorted[j].odometer
    if (km > 0) result[i] = km / sorted[i].liters
  }
  return result
}

export async function GET(req: NextRequest, { params }: Params) {
  const { id } = await params
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const vehicle = await prisma.userVehicle.findFirst({ where: { id, userId: session.userId } })
  if (!vehicle) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const logs = await prisma.fuelLog.findMany({
    where: { vehicleId: id },
    orderBy: { date: 'desc' },
  })

  // compute consumption (km/l) for each entry
  const consumptions = calcConsumption(logs.map(l => ({ odometer: l.odometer, liters: l.liters, fullTank: l.fullTank })))
  const sorted = [...logs].sort((a, b) => a.odometer - b.odometer)
  const consumptionMap = new Map(sorted.map((l, i) => [l.id, consumptions[i]]))

  const enriched = logs.map(l => ({ ...l, kmPerLiter: consumptionMap.get(l.id) ?? null }))

  // aggregate stats
  const fullFills = enriched.filter(l => l.fullTank && l.kmPerLiter !== null)
  const avgKmL = fullFills.length > 0 ? fullFills.reduce((s, l) => s + (l.kmPerLiter ?? 0), 0) / fullFills.length : null
  const bestKmL = fullFills.length > 0 ? Math.max(...fullFills.map(l => l.kmPerLiter ?? 0)) : null
  const worstKmL = fullFills.length > 0 ? Math.min(...fullFills.map(l => l.kmPerLiter ?? 0)) : null
  const totalLiters = logs.reduce((s, l) => s + l.liters, 0)
  const totalSpent = logs.reduce((s, l) => s + (l.totalCost ?? 0), 0)
  const avgPricePerLiter = logs.filter(l => l.pricePerLiter).length > 0
    ? logs.filter(l => l.pricePerLiter).reduce((s, l) => s + (l.pricePerLiter ?? 0), 0) / logs.filter(l => l.pricePerLiter).length
    : null

  return NextResponse.json({
    logs: enriched,
    stats: { avgKmL, bestKmL, worstKmL, totalLiters, totalSpent, avgPricePerLiter, count: logs.length },
  })
}

export async function POST(req: NextRequest, { params }: Params) {
  const { id } = await params
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const vehicle = await prisma.userVehicle.findFirst({ where: { id, userId: session.userId } })
  if (!vehicle) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await req.json()
  const { date, odometer, liters, pricePerLiter, totalCost, fuelType, fullTank, station, notes } = body

  if (!date || !odometer || !liters) {
    return NextResponse.json({ error: 'Data, odômetro e litros são obrigatórios.' }, { status: 400 })
  }

  const odometerNum = Number(odometer)
  const litersNum = Number(liters)
  const priceNum = pricePerLiter ? Number(pricePerLiter) : null
  const costNum = totalCost ? Number(totalCost) : (priceNum && litersNum ? priceNum * litersNum : null)

  const log = await prisma.fuelLog.create({
    data: {
      vehicleId: id,
      date: new Date(date),
      odometer: odometerNum,
      liters: litersNum,
      pricePerLiter: priceNum ?? (costNum && litersNum ? costNum / litersNum : null),
      totalCost: costNum,
      fuelType: fuelType || vehicle.fuelType || null,
      fullTank: fullTank !== false,
      station: station || null,
      notes: notes || null,
    },
  })

  // update vehicle currentKm if higher
  if (odometerNum > (vehicle.currentKm ?? 0)) {
    await prisma.userVehicle.update({ where: { id }, data: { currentKm: odometerNum } })
  }

  return NextResponse.json({ log }, { status: 201 })
}
