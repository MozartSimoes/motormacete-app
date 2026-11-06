import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const checklist = await prisma.tripChecklist.findUnique({ where: { id } })
  if (!checklist) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const updates: { id: string; checked: boolean }[] = await req.json()

  await Promise.all(
    updates.map(({ id: itemId, checked }) =>
      prisma.tripChecklistItem.update({
        where: { id: itemId, checklistId: id },
        data: { checked },
      })
    )
  )

  return NextResponse.json({ ok: true })
}
