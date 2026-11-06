import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json() as { email: string; password: string }

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

    await prisma.user.delete({ where: { id: user.id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('delete account error', error)
    return NextResponse.json({ error: 'Erro ao excluir conta. Tente novamente.' }, { status: 500 })
  }
}
