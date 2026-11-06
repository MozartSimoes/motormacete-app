import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSessionFromRequest } from '@/lib/session'

type Params = { params: Promise<{ id: string; logId: string }> }

export async function DELETE(req: NextRequest, { params }: Params) {
  const { id, logId } = await params
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const vehicle = await prisma.userVehicle.findFirst({ where: { id, userId: session.userId } })
  if (!vehicle) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await prisma.fuelLog.delete({ where: { id: logId, vehicleId: id } })
  return NextResponse.json({ ok: true })
}
