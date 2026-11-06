import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

const MP_TOKEN = process.env.MP_ACCESS_TOKEN ?? ''

async function fetchSubscription(id: string) {
  const res = await fetch(`https://api.mercadopago.com/preapproval/${id}`, {
    headers: { Authorization: `Bearer ${MP_TOKEN}` },
  })
  if (!res.ok) return null
  return res.json()
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Mercado Pago envia tipo 'subscription_preapproval' para eventos de assinatura
    if (body.type !== 'subscription_preapproval') {
      return NextResponse.json({ ok: true })
    }

    const subscriptionId = body.data?.id as string
    if (!subscriptionId) return NextResponse.json({ ok: true })

    const subscription = await fetchSubscription(subscriptionId)
    if (!subscription) return NextResponse.json({ ok: true })

    const user = await prisma.user.findFirst({
      where: { stripeSubscriptionId: subscriptionId },
      select: { id: true, type: true },
    })
    if (!user) return NextResponse.json({ ok: true })

    // Determina o plano e duração pelo plano do MP
    const amount    = subscription.auto_recurring?.transaction_amount ?? 0
    const frequency = subscription.auto_recurring?.frequency ?? 1          // 1 = mensal, 12 = anual
    const isAnnual  = frequency === 12
    const newPlan   = (amount <= 10 || (isAnnual && amount <= 95))
      ? 'DRIVER_PRO'
      : 'MECHANIC_PRO'
    // Mensal: 35 dias | Anual: 370 dias (margem de segurança)
    const days = isAnnual ? 370 : 35

    if (subscription.status === 'authorized') {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          plan: newPlan,
          planExpiresAt: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
        },
      })
    } else if (['cancelled', 'paused'].includes(subscription.status)) {
      // Assinatura cancelada/pausada — reverte para FREE
      await prisma.user.update({
        where: { id: user.id },
        data: { plan: 'FREE', planExpiresAt: null },
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('webhook error', err)
    return NextResponse.json({ ok: true }) // sempre retorna 200 para MP não retentar
  }
}
