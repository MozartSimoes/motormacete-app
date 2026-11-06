import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/session'
import { prisma } from '@/lib/db'
import { ItemType, OSStatus } from '@/lib/generated/prisma'

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session || session.type !== 'MECHANIC') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const workshop = await prisma.workshop.findUnique({ where: { userId: session.userId }, select: { id: true } })
  if (!workshop) return NextResponse.json({ error: 'Oficina não encontrada' }, { status: 404 })

  const { searchParams } = new URL(req.url)
  const status   = searchParams.get('status') ?? ''
  const search   = searchParams.get('search')?.trim() ?? ''

  const orders = await prisma.serviceOrder.findMany({
    where: {
      workshopId: workshop.id,
      ...(status ? { status: status as never } : {}),
      ...(search ? {
        OR: [
          { clientName:   { contains: search, mode: 'insensitive' } },
          { plate:        { contains: search, mode: 'insensitive' } },
          { vehicleModel: { contains: search, mode: 'insensitive' } },
        ],
      } : {}),
    },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true, number: true, clientName: true, clientPhone: true,
      plate: true, vehicleBrand: true, vehicleModel: true, vehicleYear: true,
      status: true, total: true, createdAt: true, diagnosis: true,
    },
  })

  return NextResponse.json({ orders })
}

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session || session.type !== 'MECHANIC') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const workshop = await prisma.workshop.findUnique({ where: { userId: session.userId }, select: { id: true } })
  if (!workshop) return NextResponse.json({ error: 'Oficina não encontrada' }, { status: 404 })

  // Valida limite de OS mensais (FREE: 10/mês; Pro e admin: ilimitado)
  const user = await prisma.user.findUnique({ where: { id: session.userId }, select: { plan: true, isAdmin: true, trialEndsAt: true } })
  const isPro = user?.isAdmin || user?.plan !== 'FREE' || !!(user?.trialEndsAt && new Date() <= user.trialEndsAt)
  if (!isPro) {
    const startOfMonth = new Date(); startOfMonth.setDate(1); startOfMonth.setHours(0, 0, 0, 0)
    const countThisMonth = await prisma.serviceOrder.count({
      where: { workshopId: workshop.id, createdAt: { gte: startOfMonth } },
    })
    if (countThisMonth >= 10) {
      return NextResponse.json({
        error: 'Limite de 10 OS mensais atingido. Assine o Mecânico Pro para OS ilimitadas.',
        code: 'PLAN_LIMIT', used: countThisMonth, limit: 10,
      }, { status: 403 })
    }
  }

  const body = await req.json()
  const { clientName, clientPhone, clientEmail, plate, vehicleBrand, vehicleModel, vehicleYear, vehicleKm, vehicleFuel, status, diagnosis, notes, items, nextMaintenanceDate } = body

  if (!clientName?.trim() || !vehicleBrand?.trim() || !vehicleModel?.trim()) {
    return NextResponse.json({ error: 'Cliente, marca e modelo são obrigatórios.' }, { status: 400 })
  }

  const lastOS = await prisma.serviceOrder.findFirst({
    where: { workshopId: workshop.id },
    orderBy: { number: 'desc' },
    select: { number: true },
  })
  const number = (lastOS?.number ?? 0) + 1

  const parsedItems = (items ?? []).map((it: { type: string; description: string; quantity: number; unitPrice: number }) => ({
    type:        (it.type as ItemType),
    description: it.description,
    quantity:    Number(it.quantity),
    unitPrice:   Number(it.unitPrice),
    total:       Number(it.quantity) * Number(it.unitPrice),
  }))
  const total = parsedItems.reduce((s: number, it: { total: number }) => s + it.total, 0)

  const order = await prisma.serviceOrder.create({
    data: {
      workshopId:  workshop.id,
      number,
      clientName:  clientName.trim(),
      clientPhone: clientPhone?.trim() || null,
      clientEmail: clientEmail?.trim() || null,
      plate:       plate?.trim().toUpperCase() || null,
      vehicleBrand: vehicleBrand.trim(),
      vehicleModel: vehicleModel.trim(),
      vehicleYear:  vehicleYear ? Number(vehicleYear) : null,
      vehicleKm:    vehicleKm  ? Number(vehicleKm)   : null,
      vehicleFuel:  vehicleFuel?.trim() || null,
      status:       (status ?? 'OPEN') as OSStatus,
      diagnosis:    diagnosis?.trim() || null,
      notes:        notes?.trim()     || null,
      nextMaintenanceDate: nextMaintenanceDate ? new Date(nextMaintenanceDate) : null,
      total,
      items: { create: parsedItems },
    },
    include: { items: true },
  })

  return NextResponse.json({ order }, { status: 201 })
}
