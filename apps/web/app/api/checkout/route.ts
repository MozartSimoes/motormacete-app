import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/session'
import { prisma } from '@/lib/db'

const MP_BASE = 'https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id='

const PLAN_IDS = {
  driver:        process.env.MP_PLAN_DRIVER_ID        ?? '',
  mechanic:      process.env.MP_PLAN_MECHANIC_ID      ?? '',
  driver_year:   process.env.MP_PLAN_DRIVER_YEAR_ID   ?? '',
  mechanic_year: process.env.MP_PLAN_MECHANIC_YEAR_ID ?? '',
}

type PlanKey = keyof typeof PLAN_IDS

export async function POST(req: NextRequest) {
  if (!process.env.MP_ACCESS_TOKEN || !PLAN_IDS.driver) {
    return NextResponse.json({ error: 'Pagamentos ainda não configurados.' }, { status: 503 })
  }

  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ error: 'Faça login para assinar.' }, { status: 401 })

  const { type, billing } = await req.json() as { type: 'driver' | 'mechanic'; billing: 'monthly' | 'annual' }
  if (!['driver','mechanic'].includes(type) || !['monthly','annual'].includes(billing)) {
    return NextResponse.json({ error: 'Parâmetros inválidos.' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { id: session.userId }, select: { plan: true } })
  if (!user) return NextResponse.json({ error: 'Usuário não encontrado.' }, { status: 404 })
  if (user.plan !== 'FREE') return NextResponse.json({ error: 'Você já tem um plano Pro ativo.' }, { status: 400 })

  const key: PlanKey = billing === 'annual' ? `${type}_year` : type
  const planId = PLAN_IDS[key]
  if (!planId) return NextResponse.json({ error: 'Plano não encontrado.' }, { status: 404 })

  return NextResponse.json({ checkoutUrl: `${MP_BASE}${planId}` })
}
