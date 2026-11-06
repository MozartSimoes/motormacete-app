import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSessionFromRequest } from '@/lib/session'

export async function POST(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { token } = await params

  const parent = await prisma.tripChecklist.findUnique({
    where: { shareToken: token },
    include: { items: { orderBy: { order: 'asc' } } },
  })
  if (!parent) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const existing = await prisma.tripChecklist.findFirst({
    where: { parentId: parent.id, userId: session.userId },
  })
  if (existing) return NextResponse.json(existing)

  const { vehicleName } = await req.json().catch(() => ({}))

  const member = await prisma.tripChecklist.create({
    data: {
      userId: session.userId,
      parentId: parent.id,
      vehicleType: parent.vehicleType,
      title: parent.title,
      departureAt: parent.departureAt,
      memberName: session.name,
      memberVehicle: vehicleName?.trim() || null,
      items: {
        create: parent.items.map(item => ({
          category: item.category,
          label: item.label,
          order: item.order,
          checked: false,
        })),
      },
    },
    include: { items: { orderBy: { order: 'asc' } } },
  })

  return NextResponse.json(member, { status: 201 })
}
