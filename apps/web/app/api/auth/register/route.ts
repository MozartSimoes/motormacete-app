import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { Resend } from 'resend'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, password, type, workshop } = body as {
      name: string
      email: string
      phone?: string
      password: string
      type: 'driver' | 'mechanic'
      workshop?: {
        name: string; phone?: string; description?: string; specialties?: string[]
        cep: string; street: string; number: string
        complement?: string; neighborhood: string; city: string; state: string
      }
    }

    if (!name?.trim() || !email?.trim() || !password?.trim() || !type) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 })
    }

    if (type === 'mechanic' && !workshop) {
      return NextResponse.json({ error: 'Dados da oficina são obrigatórios para mecânicos.' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (existing) {
      return NextResponse.json({ error: 'Este e-mail já está cadastrado.' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    // Trial de 15 dias com todas as funcionalidades Pro
    const trialEndsAt = new Date()
    trialEndsAt.setDate(trialEndsAt.getDate() + 15)

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        passwordHash,
        type: type === 'mechanic' ? 'MECHANIC' : 'DRIVER',
        trialEndsAt,
        ...(workshop
          ? {
              workshop: {
                create: {
                  name: workshop.name,
                  phone: workshop.phone?.trim() || null,
                  description: workshop.description?.trim() || null,
                  specialties: workshop.specialties ?? [],
                  cep: workshop.cep.replace(/\D/g, ''),
                  street: workshop.street,
                  number: workshop.number,
                  complement: workshop.complement || null,
                  neighborhood: workshop.neighborhood,
                  city: workshop.city,
                  state: workshop.state,
                },
              },
            }
          : {}),
      },
    })

    const code = String(Math.floor(1000 + Math.random() * 9000))
    await prisma.otpCode.create({
      data: {
        userId: user.id,
        code,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    })

    const apiKey = process.env.RESEND_API_KEY
    let emailSent = false
    if (apiKey) {
      try {
        const resend = new Resend(apiKey)
        const from = process.env.EMAIL_FROM ?? 'onboarding@resend.dev'
        await resend.emails.send({
          from: `MotorMacete <${from}>`,
          to: user.email,
          subject: 'Seu código de verificação - MotorMacete',
          headers: { 'X-Entity-Ref-ID': `motormacete-verify-${Date.now()}` },
          html: `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:system-ui,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
  <tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#1c1c22;border-radius:16px;overflow:hidden;">
      <tr><td style="background:#ff6600;padding:20px 32px;">
        <span style="color:#fff;font-size:1.25rem;font-weight:700;letter-spacing:0.05em;">MotorMacete</span>
      </td></tr>
      <tr><td style="padding:32px;">
        <p style="color:#f0ede8;margin:0 0 8px;font-size:0.95rem;">Seu código de verificação é:</p>
        <p style="color:#ff6600;font-size:2.5rem;font-weight:700;letter-spacing:0.3em;margin:16px 0;font-family:monospace;">${code}</p>
        <p style="color:#999;font-size:0.85rem;margin:0 0 24px;">Use esse código para concluir seu cadastro. Ele expira em 10 minutos.</p>
        <hr style="border:none;border-top:1px solid #222;margin:0 0 16px;"/>
        <p style="color:#555;font-size:0.75rem;margin:0;">Se você não solicitou este código, ignore este e-mail.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
        })
        emailSent = true
      } catch {}
    }

    return NextResponse.json({ success: true, emailSent })
  } catch (error) {
    console.error('register error', error)
    return NextResponse.json({ error: 'Erro ao criar conta. Tente novamente.' }, { status: 500 })
  }
}
