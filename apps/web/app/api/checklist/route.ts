import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSessionFromRequest } from '@/lib/session'
import { DEFAULT_ITEMS } from '@/lib/checklist-defaults'

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  const { searchParams } = new URL(req.url)
  const guestIds = searchParams.get('ids')?.split(',').filter(Boolean) ?? []

  const include = {
    items: { select: { id: true, checked: true } },
    vehicle: { select: { brand: true, model: true, year: true, nickname: true } },
    members: { select: { id: true, memberName: true } },
  }

  if (!session) {
    if (guestIds.length === 0) return NextResponse.json([])
    const checklists = await prisma.tripChecklist.findMany({
      where: { id: { in: guestIds }, userId: null, parentId: null },
      include,
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(checklists)
  }

  const checklists = await prisma.tripChecklist.findMany({
    where: { userId: session.userId, parentId: null },
    include,
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(checklists)
}

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req)

  const body = await req.json()
  const { title, vehicleType = 'moto', vehicleId, departureAt } = body

  if (!title?.trim()) return NextResponse.json({ error: 'Título obrigatório' }, { status: 400 })

  const groups = DEFAULT_ITEMS[vehicleType] ?? DEFAULT_ITEMS.moto
  let order = 0
  const items = groups.flatMap(g => g.items.map(label => ({ category: g.category, label, order: order++ })))

  const { returnAt } = body

  const checklist = await prisma.tripChecklist.create({
    data: {
      userId: session?.userId ?? null,
      vehicleId: vehicleId || null,
      vehicleType,
      title: title.trim(),
      departureAt: departureAt ? new Date(departureAt) : null,
      returnAt: returnAt ? new Date(returnAt) : null,
      items: { create: items },
    },
    include: {
      items: { orderBy: { order: 'asc' } },
      vehicle: { select: { brand: true, model: true, year: true, nickname: true } },
    },
  })

  return NextResponse.json(checklist, { status: 201 })
}
