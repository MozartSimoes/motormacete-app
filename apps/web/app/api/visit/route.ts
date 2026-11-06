import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const sessionId: string | null = typeof body.sessionId === 'string' ? body.sessionId : null
    const userId: string | null = typeof body.userId === 'string' ? body.userId : null

    await prisma.pageView.create({
      data: { page: '/', sessionId, userId },
    })
  } catch {
    // silently ignore — analytics must never break the UX
  }

  return NextResponse.json({ ok: true })
}

export async function GET() {
  const [total, uniqueSessions, today, last7days] = await Promise.all([
    prisma.pageView.count({ where: { page: '/' } }),
    prisma.pageView.groupBy({ by: ['sessionId'], where: { page: '/', sessionId: { not: null } }, _count: true }).then((r) => r.length),
    prisma.pageView.count({
      where: { page: '/', createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
    }),
    prisma.pageView.count({
      where: { page: '/', createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    }),
  ])

  return NextResponse.json({ total, uniqueSessions, today, last7days })
}
