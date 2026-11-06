import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { createSession } from '@/lib/session'

export async function POST(request: Request) {
  try {
    const { email, code, keepSignedIn } = await request.json() as {
      email: string
      code: string
      keepSignedIn?: boolean
    }

    if (!email || !code) {
      return NextResponse.json({ error: 'E-mail e código são obrigatórios.' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (!user) {
      return NextResponse.json({ error: 'Código inválido ou expirado.' }, { status: 400 })
    }

    const otp = await prisma.otpCode.findFirst({
      where: {
        userId: user.id,
        code,
        used: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    })

    if (!otp) {
      return NextResponse.json({ error: 'Código inválido ou expirado.' }, { status: 400 })
    }

    await prisma.$transaction([
      prisma.otpCode.update({ where: { id: otp.id }, data: { used: true } }),
      prisma.user.update({ where: { id: user.id }, data: { emailVerified: true } }),
    ])

    const token = await createSession(
      { userId: user.id, email: user.email, name: user.name, type: user.type },
      keepSignedIn ?? false,
    )

    return NextResponse.json({ success: true, token, user: { name: user.name, email: user.email, type: user.type } })
  } catch (error) {
    console.error('verify-otp error', error)
    return NextResponse.json({ error: 'Erro ao verificar código.' }, { status: 500 })
  }
}
