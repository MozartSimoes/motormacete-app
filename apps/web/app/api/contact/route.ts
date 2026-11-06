import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getSessionFromRequest } from '@/lib/session'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const message: string = (body?.message ?? '').trim().slice(0, 500)
    if (!message) {
      return NextResponse.json({ success: false, error: 'Mensagem vazia.' }, { status: 400 })
    }

    const session = await getSessionFromRequest(req)
    const userName = session?.name ?? 'Visitante'
    const userEmail = session?.email ?? 'não informado'
    const userType = session?.type === 'MECHANIC' ? 'Mecânico' : 'Motorista'

    const apiKey = process.env.RESEND_API_KEY
    const emailFrom = process.env.EMAIL_FROM ?? 'onboarding@resend.dev'
    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'RESEND_API_KEY não configurada.' }, { status: 500 })
    }

    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: `MotorMacete <${emailFrom}>`,
      to: process.env.ADMIN_EMAIL ?? '',
      subject: `[MotorMacete] Contato de ${userName}`,
      html: `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="utf-8" /><title>Contato MotorMacete</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:system-ui,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#1c1c22;border-radius:16px;overflow:hidden;">
        <tr><td style="background:#ff6600;padding:20px 32px;">
          <span style="color:#fff;font-size:1.25rem;font-weight:700;">MotorMacete — Contato</span>
        </td></tr>
        <tr><td style="padding:28px 32px;">
          <p style="color:#aaa;font-size:0.85rem;margin:0 0 4px;">De:</p>
          <p style="color:#f0ede8;font-size:1rem;font-weight:600;margin:0 0 4px;">${userName} (${userType})</p>
          <p style="color:#666;font-size:0.85rem;margin:0 0 24px;">${userEmail}</p>
          <hr style="border:none;border-top:1px solid #1e1e20;margin:0 0 20px;" />
          <p style="color:#aaa;font-size:0.85rem;margin:0 0 8px;">Mensagem:</p>
          <p style="color:#f0ede8;font-size:1rem;line-height:1.6;margin:0;white-space:pre-wrap;">${message}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('contact error', error)
    return NextResponse.json({ success: false, error: 'Falha ao enviar.' }, { status: 500 })
  }
}
