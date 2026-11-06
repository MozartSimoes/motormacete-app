import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { createSession } from '@/lib/session'

export async function POST(request: Request) {
  try {
    const { email, password, keepSignedIn } = await request.json() as {
      email: string
      password: string
      keepSignedIn?: boolean
    }

    if (!email || !password) {
      return NextResponse.json({ error: 'E-mail e senha são obrigatórios.' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (!user) {
      return NextResponse.json({ error: 'E-mail ou senha incorretos.' }, { status: 401 })
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash)
    if (!passwordMatch) {
      return NextResponse.json({ error: 'E-mail ou senha incorretos.' }, { status: 401 })
    }

    if (!user.emailVerified) {
      return NextResponse.json(
        { error: 'Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada.' },
        { status: 403 },
      )
    }

    const token = await createSession(
      { userId: user.id, email: user.email, name: user.name, type: user.type },
      keepSignedIn ?? false,
    )

    return NextResponse.json({ success: true, token, user: { name: user.name, email: user.email, type: user.type } })
  } catch (error) {
    console.error('login error', error)
    return NextResponse.json({ error: 'Erro ao fazer login. Tente novamente.' }, { status: 500 })
  }
}
