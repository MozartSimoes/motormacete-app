import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSessionFromRequest } from '@/lib/session'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSessionFromRequest(_req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const vehicle = await prisma.userVehicle.findFirst({ where: { id, userId: session.userId } })
  if (!vehicle) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const logs = await prisma.maintenanceLog.findMany({
    where: { vehicleId: id },
    orderBy: { date: 'desc' },
  })

  return NextResponse.json({ logs })
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSessionFromRequest(request)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const vehicle = await prisma.userVehicle.findFirst({ where: { id, userId: session.userId } })
  if (!vehicle) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await request.json()
  const { date, km, category, description, cost, workshop, notes, nextKm, nextDate } = body

  if (!date || !category || !description) {
    return NextResponse.json({ error: 'date, category e description são obrigatórios' }, { status: 400 })
  }

  const log = await prisma.maintenanceLog.create({
    data: {
      vehicleId: id,
      date: new Date(date),
      km: km ? Number(km) : null,
      category,
      description,
      cost: cost ? Number(cost) : null,
      workshop: workshop || null,
      notes: notes || null,
      nextKm: nextKm ? Number(nextKm) : null,
      nextDate: nextDate ? new Date(nextDate) : null,
    },
  })

  // Update currentKm if this entry has a higher km
  if (km && Number(km) > (vehicle.currentKm ?? 0)) {
    await prisma.userVehicle.update({ where: { id }, data: { currentKm: Number(km) } })
  }

  return NextResponse.json({ log }, { status: 201 })
}
