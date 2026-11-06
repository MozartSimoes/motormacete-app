import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/session'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session || session.type !== 'MECHANIC') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { plan: true, isAdmin: true, trialEndsAt: true },
  })
  const isPro = user?.isAdmin || user?.plan !== "FREE" || !!(user?.trialEndsAt && new Date() <= user.trialEndsAt)
  if (!isPro) return NextResponse.json({ alerts: [] })

  const workshop = await prisma.workshop.findUnique({
    where: { userId: session.userId },
    select: { id: true },
  })
  if (!workshop) return NextResponse.json({ alerts: [] })

  const now = new Date()
  const in30Days = new Date(now)
  in30Days.setDate(in30Days.getDate() + 30)

  const orders = await prisma.serviceOrder.findMany({
    where: {
      workshopId: workshop.id,
      nextMaintenanceDate: { gte: now, lte: in30Days },
    },
    orderBy: { nextMaintenanceDate: 'asc' },
    select: {
      id: true, number: true, clientName: true, clientPhone: true,
      vehicleBrand: true, vehicleModel: true, nextMaintenanceDate: true,
    },
  })

  const alerts = orders.map(o => ({
    ...o,
    daysLeft: Math.ceil((o.nextMaintenanceDate!.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
  }))

  return NextResponse.json({ alerts })
}
