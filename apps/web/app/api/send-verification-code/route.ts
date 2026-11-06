import { NextResponse } from 'next/server'
import { Resend } from 'resend'

type RequestBody = {
  email: string
  code: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody
    if (!body?.email || !body?.code) {
      return NextResponse.json({ success: false, error: 'E-mail e código são obrigatórios.' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    const emailFrom = process.env.EMAIL_FROM ?? 'onboarding@resend.dev'

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'RESEND_API_KEY não configurada.' },
        { status: 500 },
      )
    }

    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: `MotorMacete <${emailFrom}>`,
      to: body.email,
      subject: 'Seu codigo de verificacao - MotorMacete',
      headers: {
        'X-Entity-Ref-ID': `motormacete-verify-${Date.now()}`,
      },
      html: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Codigo de verificacao - MotorMacete</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:system-ui,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#1c1c22;border-radius:16px;overflow:hidden;">
        <tr>
          <td style="background:#ff6600;padding:20px 32px;">
            <span style="color:#fff;font-size:1.25rem;font-weight:700;letter-spacing:0.05em;">MotorMacete</span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <p style="color:#f0ede8;margin:0 0 8px;font-size:0.95rem;">Seu codigo de verificacao e:</p>
            <p style="color:#ff6600;font-size:2.5rem;font-weight:700;letter-spacing:0.3em;margin:16px 0;font-family:monospace;">${body.code}</p>
            <p style="color:#999;font-size:0.85rem;margin:0 0 24px;">Use esse codigo para concluir seu cadastro. Ele expira em 10 minutos.</p>
            <hr style="border:none;border-top:1px solid #222;margin:0 0 16px;" />
            <p style="color:#555;font-size:0.75rem;margin:0;">Se voce nao solicitou este codigo, ignore este e-mail.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('send-verification-code error', error)
    return NextResponse.json({ success: false, error: 'Falha ao enviar o e-mail de verificação.' }, { status: 500 })
  }
}
