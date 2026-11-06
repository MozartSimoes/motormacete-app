import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSessionFromRequest } from '@/lib/session'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; logId: string }> },
) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, logId } = await params

  const vehicle = await prisma.userVehicle.findFirst({ where: { id, userId: session.userId } })
  if (!vehicle) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { date, category, description, km, cost, workshop, notes } = await req.json()

  const log = await prisma.maintenanceLog.update({
    where: { id: logId },
    data: {
      date: new Date(date),
      category,
      description,
      km: km ? Number(km) : null,
      cost: cost ? Number(cost) : null,
      workshop: workshop ?? null,
      notes: notes ?? null,
    },
  })

  return NextResponse.json({ log })
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; logId: string }> },
) {
  const session = await getSessionFromRequest(_req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, logId } = await params

  const vehicle = await prisma.userVehicle.findFirst({ where: { id, userId: session.userId } })
  if (!vehicle) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await prisma.maintenanceLog.deleteMany({ where: { id: logId, vehicleId: id } })
  return NextResponse.json({ ok: true })
}
