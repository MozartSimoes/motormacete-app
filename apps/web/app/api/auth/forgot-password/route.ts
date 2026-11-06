import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { email } = await request.json() as { email: string }

    if (!email?.trim()) {
      return NextResponse.json({ error: 'E-mail é obrigatório.' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })

    // Always respond success to avoid user enumeration
    if (!user) {
      return NextResponse.json({ success: true })
    }

    // Invalidate previous OTPs for this user
    await prisma.otpCode.updateMany({
      where: { userId: user.id, used: false },
      data: { used: true },
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
    if (apiKey) {
      try {
        const resend = new Resend(apiKey)
        const from = process.env.EMAIL_FROM ?? 'onboarding@resend.dev'
        await resend.emails.send({
          from: `MotorMacete <${from}>`,
          to: user.email,
          subject: 'Redefinição de senha - MotorMacete',
          headers: { 'X-Entity-Ref-ID': `motormacete-reset-${Date.now()}` },
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
        <p style="color:#f0ede8;margin:0 0 8px;font-size:0.95rem;">Seu código para redefinir a senha:</p>
        <p style="color:#ff6600;font-size:2.5rem;font-weight:700;letter-spacing:0.3em;margin:16px 0;font-family:monospace;">${code}</p>
        <p style="color:#999;font-size:0.85rem;margin:0 0 24px;">Use esse código no app para criar uma nova senha. Ele expira em 10 minutos.</p>
        <hr style="border:none;border-top:1px solid #222;margin:0 0 16px;"/>
        <p style="color:#555;font-size:0.75rem;margin:0;">Se você não solicitou a redefinição de senha, ignore este e-mail.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
        })
      } catch {}
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('forgot-password error', error)
    return NextResponse.json({ error: 'Erro ao processar solicitação.' }, { status: 500 })
  }
}
