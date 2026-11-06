import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/session'
import { prisma } from '@/lib/db'
import { ItemType, OSStatus } from '@/lib/generated/prisma'

async function getWorkshopOS(userId: string, id: string) {
  const workshop = await prisma.workshop.findUnique({ where: { userId }, select: { id: true } })
  if (!workshop) return null
  const order = await prisma.serviceOrder.findFirst({
    where: { id, workshopId: workshop.id },
    include: { items: { orderBy: { id: 'asc' } } },
  })
  return order
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSessionFromRequest(_req)
  if (!session || session.type !== 'MECHANIC') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }
  const { id } = await params
  const order = await getWorkshopOS(session.userId, id)
  if (!order) return NextResponse.json({ error: 'OS não encontrada' }, { status: 404 })
  return NextResponse.json({ order })
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSessionFromRequest(req)
  if (!session || session.type !== 'MECHANIC') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }
  const { id } = await params
  const order = await getWorkshopOS(session.userId, id)
  if (!order) return NextResponse.json({ error: 'OS não encontrada' }, { status: 404 })

  const body = await req.json()
  const { clientName, clientPhone, clientEmail, plate, vehicleBrand, vehicleModel, vehicleYear, vehicleKm, vehicleFuel, status, diagnosis, notes, items, nextMaintenanceDate } = body

  const parsedItems = items
    ? (items as { type: string; description: string; quantity: number; unitPrice: number }[]).map((it) => ({
        type:        (it.type as ItemType),
        description: it.description,
        quantity:    Number(it.quantity),
        unitPrice:   Number(it.unitPrice),
        total:       Number(it.quantity) * Number(it.unitPrice),
      }))
    : null

  const total = parsedItems ? parsedItems.reduce((s, it) => s + it.total, 0) : order.total

  const closedAt = status === 'CLOSED' || status === 'DONE'
    ? (order.closedAt ?? new Date())
    : (status === 'OPEN' || status === 'IN_PROGRESS' ? null : order.closedAt)

  const updated = await prisma.$transaction(async (tx) => {
    if (parsedItems !== null) {
      await tx.serviceOrderItem.deleteMany({ where: { orderId: id } })
      await tx.serviceOrderItem.createMany({ data: parsedItems.map((it) => ({ ...it, orderId: id })) })
    }
    return tx.serviceOrder.update({
      where: { id },
      data: {
        ...(clientName   !== undefined ? { clientName:   clientName.trim()   } : {}),
        ...(clientPhone  !== undefined ? { clientPhone:  clientPhone?.trim() || null } : {}),
        ...(clientEmail  !== undefined ? { clientEmail:  clientEmail?.trim() || null } : {}),
        ...(plate        !== undefined ? { plate:        plate?.trim().toUpperCase() || null } : {}),
        ...(vehicleBrand !== undefined ? { vehicleBrand: vehicleBrand.trim() } : {}),
        ...(vehicleModel !== undefined ? { vehicleModel: vehicleModel.trim() } : {}),
        ...(vehicleYear  !== undefined ? { vehicleYear:  vehicleYear ? Number(vehicleYear) : null } : {}),
        ...(vehicleKm    !== undefined ? { vehicleKm:    vehicleKm   ? Number(vehicleKm)   : null } : {}),
        ...(vehicleFuel  !== undefined ? { vehicleFuel:  vehicleFuel?.trim() || null } : {}),
        ...(status       !== undefined ? { status: status as OSStatus, closedAt } : {}),
        ...(diagnosis    !== undefined ? { diagnosis:    diagnosis?.trim() || null } : {}),
        ...(notes               !== undefined ? { notes:               notes?.trim() || null } : {}),
        ...(nextMaintenanceDate !== undefined ? { nextMaintenanceDate: nextMaintenanceDate ? new Date(nextMaintenanceDate) : null, clientAlertSentAt: null } : {}),
        ...(parsedItems  !== null      ? { total } : {}),
      },
      include: { items: { orderBy: { id: 'asc' } } },
    })
  })

  return NextResponse.json({ order: updated })
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSessionFromRequest(_req)
  if (!session || session.type !== 'MECHANIC') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }
  const { id } = await params
  const order = await getWorkshopOS(session.userId, id)
  if (!order) return NextResponse.json({ error: 'OS não encontrada' }, { status: 404 })
  await prisma.serviceOrder.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
