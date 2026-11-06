import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/session'
import { prisma } from '@/lib/db'

export async function PATCH(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })

  const { name } = await req.json() as { name?: string }

  if (!name || !name.trim()) {
    return NextResponse.json({ error: 'Nome não pode ser vazio.' }, { status: 400 })
  }

  const trimmed = name.trim()

  await prisma.user.update({
    where: { id: session.userId },
    data: { name: trimmed },
  })

  return NextResponse.json({ success: true, name: trimmed })
}
