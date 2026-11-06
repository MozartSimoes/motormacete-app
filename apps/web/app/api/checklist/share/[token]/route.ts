import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params

  const checklist = await prisma.tripChecklist.findUnique({
    where: { shareToken: token },
    include: {
      items: { orderBy: { order: 'asc' } },
      vehicle: { select: { brand: true, model: true, year: true, nickname: true } },
      user: { select: { name: true } },
      members: {
        include: {
          items: { orderBy: { order: 'asc' } },
          user: { select: { name: true } },
        },
        orderBy: { createdAt: 'asc' },
      },
    },
  })

  if (!checklist) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(checklist)
}
