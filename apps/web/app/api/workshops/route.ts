import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const city         = searchParams.get('city')?.trim() ?? ''
  const neighborhood = searchParams.get('neighborhood')?.trim() ?? ''
  const specialty    = searchParams.get('specialty')?.trim() ?? ''

  const raw = await prisma.workshop.findMany({
    where: {
      active: true,
      ...(city         ? { city:         { contains: city,         mode: 'insensitive' } } : {}),
      ...(neighborhood ? { neighborhood: { contains: neighborhood, mode: 'insensitive' } } : {}),
      ...(specialty    ? { specialties:  { has: specialty } }                               : {}),
    },
    select: {
      id:           true,
      name:         true,
      phone:        true,
      description:  true,
      specialties:  true,
      street:       true,
      number:       true,
      complement:   true,
      neighborhood: true,
      city:         true,
      state:        true,
      user: { select: { name: true, plan: true, isAdmin: true } },
    },
    orderBy: [{ city: 'asc' }, { name: 'asc' }],
    take: 100,
  })

  // Adiciona isPro e ordena: Pro primeiro
  const workshops = raw
    .map(w => ({
      ...w,
      isPro: w.user.isAdmin || w.user.plan === 'MECHANIC_PRO' || w.user.plan === 'DRIVER_PRO',
    }))
    .sort((a, b) => (b.isPro ? 1 : 0) - (a.isPro ? 1 : 0))

  return NextResponse.json({ workshops })
}
