import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/session'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ plan: 'FREE', expiresAt: null })

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { plan: true, planExpiresAt: true },
  })
  if (!user) return NextResponse.json({ plan: 'FREE', expiresAt: null })

  // Se o plano expirou, trata como FREE
  const expired = user.planExpiresAt && user.planExpiresAt < new Date()
  if (expired) {
    await prisma.user.update({ where: { id: session.userId }, data: { plan: 'FREE', planExpiresAt: null } })
    return NextResponse.json({ plan: 'FREE', expiresAt: null })
  }

  return NextResponse.json({ plan: user.plan, expiresAt: user.planExpiresAt })
}
