import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/session'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ user: null })

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { plan: true, isAdmin: true, trialEndsAt: true },
  })

  const now = new Date()
  const trialEndsAt = user?.trialEndsAt ?? null
  const isTrialing  = !!(trialEndsAt && now <= trialEndsAt && user?.plan === 'FREE' && !user?.isAdmin)
  const trialDaysLeft = isTrialing
    ? Math.ceil((trialEndsAt!.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    : 0

  return NextResponse.json({
    user: {
      ...session,
      plan:          user?.plan ?? 'FREE',
      isAdmin:       user?.isAdmin ?? false,
      trialEndsAt:   trialEndsAt?.toISOString() ?? null,
      isTrialing,
      trialDaysLeft,
    },
  })
}
