import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    const email: string = body?.email?.trim()?.toLowerCase()
    const topics: string[] = Array.isArray(body?.topics) ? body.topics : []

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    await prisma.newsletterSubscription.upsert({
      where:  { email },
      create: { email, topics, active: true },
      update: { topics, active: true },
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')?.toLowerCase()
  if (!email) return NextResponse.json({ error: 'Email obrigatório' }, { status: 400 })

  await prisma.newsletterSubscription.updateMany({
    where: { email },
    data:  { active: false },
  })

  return NextResponse.json({ ok: true })
}
