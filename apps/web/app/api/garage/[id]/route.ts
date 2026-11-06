import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSessionFromRequest } from '@/lib/session'

async function ownsVehicle(userId: string, id: string) {
  const v = await prisma.userVehicle.findFirst({ where: { id, userId } })
  return v
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const vehicle = await prisma.userVehicle.findFirst({
    where: { id, userId: session.userId },
    include: {
      logs: { orderBy: { date: 'desc' } },
    },
  })

  if (!vehicle) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ vehicle })
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSessionFromRequest(request)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  if (!(await ownsVehicle(session.userId, id))) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const body = await request.json()
  const { nickname, vehicleType, brand, model, year, fuelType, color, plate, currentKm, notes, ipvaMonth, licensingMonth } = body

  const vehicle = await prisma.userVehicle.update({
    where: { id },
    data: {
      nickname: nickname ?? null,
      vehicleType: vehicleType || 'carro',
      brand,
      model,
      year: Number(year),
      fuelType: fuelType ?? null,
      color: color ?? null,
      plate: plate ?? null,
      currentKm: currentKm ? Number(currentKm) : null,
      notes: notes ?? null,
      ipvaMonth: ipvaMonth ? Number(ipvaMonth) : null,
      licensingMonth: licensingMonth ? Number(licensingMonth) : null,
    },
  })

  return NextResponse.json({ vehicle })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  if (!(await ownsVehicle(session.userId, id))) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  await prisma.userVehicle.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
