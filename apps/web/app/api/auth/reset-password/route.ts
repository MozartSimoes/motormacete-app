import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { email, code, newPassword } = await request.json() as {
      email: string
      code: string
      newPassword: string
    }

    if (!email?.trim() || !code?.trim() || !newPassword?.trim()) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'A senha deve ter pelo menos 6 caracteres.' }, { status: 400 })
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

    const passwordHash = await bcrypt.hash(newPassword, 12)

    await prisma.$transaction([
      prisma.otpCode.update({ where: { id: otp.id }, data: { used: true } }),
      prisma.user.update({ where: { id: user.id }, data: { passwordHash } }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('reset-password error', error)
    return NextResponse.json({ error: 'Erro ao redefinir senha.' }, { status: 500 })
  }
}
