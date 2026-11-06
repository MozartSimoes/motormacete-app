import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/session'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { plan: true, isAdmin: true, trialEndsAt: true },
  })

  const isPro = user?.isAdmin || user?.plan !== 'FREE' || !!(user?.trialEndsAt && new Date() <= user.trialEndsAt)
  if (!isPro) return NextResponse.json({ alerts: [] })

  const now = new Date()
  const in7Days = new Date(now)
  in7Days.setDate(in7Days.getDate() + 7)

  const logs = await prisma.maintenanceLog.findMany({
    where: {
      nextDate: { gte: now, lte: in7Days },
      vehicle: { userId: session.userId },
    },
    include: {
      vehicle: { select: { brand: true, model: true, year: true, nickname: true } },
    },
    orderBy: { nextDate: 'asc' },
  })

  const alerts = logs.map(log => ({
    id: log.id,
    vehicleName: log.vehicle.nickname ?? `${log.vehicle.brand} ${log.vehicle.model} ${log.vehicle.year}`,
    category: log.category,
    description: log.description,
    nextDate: log.nextDate,
    nextKm: log.nextKm,
    daysLeft: Math.ceil((log.nextDate!.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
  }))

  return NextResponse.json({ alerts })
}
