import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSessionFromRequest } from '@/lib/session'

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const vehicles = await prisma.userVehicle.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: 'asc' },
    include: {
      _count: { select: { logs: true } },
      logs: { orderBy: { date: 'desc' }, take: 1, select: { date: true, km: true } },
    },
  })

  return NextResponse.json({ vehicles })
}

export async function POST(request: NextRequest) {
  const session = await getSessionFromRequest(request)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { nickname, vehicleType, brand, model, year, fuelType, color, plate, currentKm, notes } = body

  if (!brand || !model || !year) {
    return NextResponse.json({ error: 'brand, model e year são obrigatórios' }, { status: 400 })
  }

  // Valida limite de veículos por plano (FREE: 1 veículo; admin e Pro: ilimitado)
  const user = await prisma.user.findUnique({ where: { id: session.userId }, select: { plan: true, isAdmin: true, trialEndsAt: true } })
  const isTrialing = !!(user?.trialEndsAt && new Date() <= user.trialEndsAt)
  if (!user?.isAdmin && user?.plan === 'FREE' && !isTrialing) {
    const count = await prisma.userVehicle.count({ where: { userId: session.userId } })
    if (count >= 1) {
      return NextResponse.json({ error: 'Limite de veículos atingido. Assine o plano Pro para adicionar mais.', code: 'PLAN_LIMIT' }, { status: 403 })
    }
  }

  const vehicle = await prisma.userVehicle.create({
    data: {
      userId: session.userId,
      nickname: nickname || null,
      vehicleType: vehicleType || 'carro',
      brand,
      model,
      year: Number(year),
      fuelType: fuelType || null,
      color: color || null,
      plate: plate || null,
      currentKm: currentKm ? Number(currentKm) : null,
      notes: notes || null,
    },
  })

  return NextResponse.json({ vehicle }, { status: 201 })
}
