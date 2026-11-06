import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/session'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session || session.type !== 'MECHANIC') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const workshop = await prisma.workshop.findUnique({
    where: { userId: session.userId },
    select: { id: true, name: true },
  })
  if (!workshop) return NextResponse.json({ error: 'Oficina não encontrada' }, { status: 404 })

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59)

  const [open, inProgress, monthlyOrders, lastMonthOrders, recentOS, totalOS] = await Promise.all([
    prisma.serviceOrder.count({ where: { workshopId: workshop.id, status: 'OPEN' } }),
    prisma.serviceOrder.count({ where: { workshopId: workshop.id, status: { in: ['IN_PROGRESS', 'WAITING_PARTS'] } } }),
    prisma.serviceOrder.findMany({
      where: { workshopId: workshop.id, createdAt: { gte: startOfMonth } },
      select: { total: true, status: true },
    }),
    prisma.serviceOrder.findMany({
      where: { workshopId: workshop.id, createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } },
      select: { total: true },
    }),
    prisma.serviceOrder.findMany({
      where: { workshopId: workshop.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, number: true, clientName: true, vehicleBrand: true, vehicleModel: true, status: true, total: true, createdAt: true },
    }),
    prisma.serviceOrder.count({ where: { workshopId: workshop.id } }),
  ])

  const monthlyRevenue = monthlyOrders
    .filter((o) => ['DONE', 'CLOSED'].includes(o.status))
    .reduce((s, o) => s + o.total, 0)
  const lastMonthRevenue = lastMonthOrders.reduce((s, o) => s + o.total, 0)

  return NextResponse.json({
    workshop,
    stats: {
      open,
      inProgress,
      monthlyCount: monthlyOrders.length,
      monthlyRevenue,
      lastMonthRevenue,
      totalOS,
    },
    recentOS,
  })
}
