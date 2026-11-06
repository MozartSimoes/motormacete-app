import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSessionFromRequest } from '@/lib/session'
import { randomBytes } from 'crypto'

const INCLUDE = {
  items: { orderBy: { order: 'asc' } },
  vehicle: { select: { brand: true, model: true, year: true, nickname: true } },
  members: {
    include: {
      items: { orderBy: { order: 'asc' } },
      user: { select: { name: true } },
    },
    orderBy: { createdAt: 'asc' },
  },
} as const

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const checklist = await prisma.tripChecklist.findUnique({ where: { id }, include: INCLUDE })
  if (!checklist) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(checklist)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getSessionFromRequest(req)

  const existing = await prisma.tripChecklist.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Logged-in checklist: only owner can edit
  if (existing.userId && existing.userId !== session?.userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const { title, departureAt, returnAt, enableSharing } = body

  const data: Record<string, unknown> = {}
  if (title !== undefined) data.title = title.trim()
  if (departureAt !== undefined) data.departureAt = departureAt ? new Date(departureAt) : null
  if (returnAt !== undefined) data.returnAt = returnAt ? new Date(returnAt) : null
  if (enableSharing === true && !existing.shareToken) data.shareToken = randomBytes(8).toString('hex')
  if (enableSharing === false) data.shareToken = null

  const updated = await prisma.tripChecklist.update({ where: { id }, data, include: INCLUDE })
  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getSessionFromRequest(req)

  const existing = await prisma.tripChecklist.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Logged-in checklist: only owner can delete
  if (existing.userId && existing.userId !== session?.userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await prisma.tripChecklist.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
