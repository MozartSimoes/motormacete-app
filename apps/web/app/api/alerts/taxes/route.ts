import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { prisma } from '@/lib/db'

const resend = new Resend(process.env.RESEND_API_KEY)

const MONTH_NAMES_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']

function getDaysUntilMonth(month: number, now: Date): number {
  const currentMonth = now.getMonth() + 1
  const year = currentMonth >= month ? now.getFullYear() + 1 : now.getFullYear()
  const target = new Date(year, month - 1, 1)
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

async function sendExpoPush(token: string, title: string, body: string) {
  try {
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ to: token, title, body, sound: 'default', priority: 'high' }),
    })
  } catch {}
}

// Vercel Cron — GET com Authorization: Bearer {CRON_SECRET}
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  const elevenMonthsAgo = new Date(now)
  elevenMonthsAgo.setMonth(elevenMonthsAgo.getMonth() - 11)

  // Busca todos os veículos que têm mês de IPVA ou licenciamento configurado
  const vehicles = await prisma.userVehicle.findMany({
    where: {
      OR: [
        { ipvaMonth: { not: null } },
        { licensingMonth: { not: null } },
      ],
    },
    include: {
      user: {
        select: { name: true, email: true, expoPushToken: true },
      },
    },
  })

  let sent = 0
  const errors: string[] = []

  for (const vehicle of vehicles) {
    const vehicleName = vehicle.nickname ?? `${vehicle.brand} ${vehicle.model} ${vehicle.year}`
    const userName = vehicle.user.name.split(' ')[0]
    const plate = vehicle.plate ? ` · ${vehicle.plate.toUpperCase()}` : ''

    // ── IPVA ────────────────────────────────────────────────────────────────────
    if (vehicle.ipvaMonth) {
      const days = getDaysUntilMonth(vehicle.ipvaMonth, now)
      const alreadySent = vehicle.ipvaAlertSentAt && vehicle.ipvaAlertSentAt > elevenMonthsAgo

      if (days <= 30 && !alreadySent) {
        const monthName = MONTH_NAMES_PT[vehicle.ipvaMonth - 1]
        const urgency = days <= 7 ? '🔴 URGENTE' : days <= 15 ? '🟠 EM BREVE' : '🟡 ATENÇÃO'

        try {
          // Email
          await resend.emails.send({
            from: `MotorMacete <${process.env.EMAIL_FROM ?? 'noreply@motormacete.com.br'}>`,
            to: vehicle.user.email,
            subject: `${urgency} — IPVA do ${vehicleName} vence em ${monthName}`,
            html: taxEmailHtml({
              userName,
              vehicleName: vehicleName + plate,
              taxType: 'IPVA',
              monthName,
              days,
              urgency,
            }),
          })

          // Push Expo
          if (vehicle.user.expoPushToken) {
            await sendExpoPush(
              vehicle.user.expoPushToken,
              `IPVA — ${vehicleName}`,
              `Vence em ${monthName}! Faltam ${days} dias. Não deixe para a última hora.`,
            )
          }

          await prisma.userVehicle.update({
            where: { id: vehicle.id },
            data: { ipvaAlertSentAt: now },
          })
          sent++
        } catch (e) {
          errors.push(`ipva-${vehicle.id}: ${e}`)
        }
      }
    }

    // ── Licenciamento ────────────────────────────────────────────────────────────
    if (vehicle.licensingMonth) {
      const days = getDaysUntilMonth(vehicle.licensingMonth, now)
      const alreadySent = vehicle.licensingAlertSentAt && vehicle.licensingAlertSentAt > elevenMonthsAgo

      if (days <= 30 && !alreadySent) {
        const monthName = MONTH_NAMES_PT[vehicle.licensingMonth - 1]
        const urgency = days <= 7 ? '🔴 URGENTE' : days <= 15 ? '🟠 EM BREVE' : '🟡 ATENÇÃO'

        try {
          await resend.emails.send({
            from: `MotorMacete <${process.env.EMAIL_FROM ?? 'noreply@motormacete.com.br'}>`,
            to: vehicle.user.email,
            subject: `${urgency} — Licenciamento (CRLV) do ${vehicleName} vence em ${monthName}`,
            html: taxEmailHtml({
              userName,
              vehicleName: vehicleName + plate,
              taxType: 'Licenciamento (CRLV)',
              monthName,
              days,
              urgency,
            }),
          })

          if (vehicle.user.expoPushToken) {
            await sendExpoPush(
              vehicle.user.expoPushToken,
              `Licenciamento — ${vehicleName}`,
              `CRLV vence em ${monthName}! Faltam ${days} dias. Regularize antes do prazo.`,
            )
          }

          await prisma.userVehicle.update({
            where: { id: vehicle.id },
            data: { licensingAlertSentAt: now },
          })
          sent++
        } catch (e) {
          errors.push(`licensing-${vehicle.id}: ${e}`)
        }
      }
    }
  }

  return NextResponse.json({ sent, errors: errors.length ? errors : undefined })
}

function taxEmailHtml({ userName, vehicleName, taxType, monthName, days, urgency }: {
  userName: string
  vehicleName: string
  taxType: string
  monthName: string
  days: number
  urgency: string
}) {
  const urgencyColor = days <= 7 ? '#ef4444' : days <= 15 ? '#f97316' : '#eab308'
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="utf-8"/><title>Alerta de ${taxType}</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:system-ui,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;background:#1c1c22;border-radius:16px;overflow:hidden;border:1px solid #2a2a32;">

        <tr><td style="background:#ff6600;padding:22px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td><span style="color:#fff;font-size:1.1rem;font-weight:800;letter-spacing:1px;">MOTORMACETE</span></td>
              <td align="right"><span style="color:rgba(255,255,255,0.8);font-size:0.8rem;font-weight:600;letter-spacing:2px;text-transform:uppercase;">Alerta Fiscal</span></td>
            </tr>
          </table>
        </td></tr>

        <tr><td style="padding:28px 32px;">
          <p style="color:#999;font-size:0.85rem;margin:0 0 6px;">Olá, ${userName} 👋</p>
          <h2 style="color:#f0ede8;font-size:1.4rem;font-weight:800;margin:0 0 20px;line-height:1.3;">
            ${taxType} do seu veículo vence em breve
          </h2>

          <div style="background:#28282e;border:1px solid #3a3a42;border-radius:12px;padding:18px 20px;margin-bottom:20px;">
            <p style="color:#ff6600;font-size:0.7rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 4px;">Veículo</p>
            <p style="color:#f0ede8;font-size:1rem;font-weight:700;margin:0;">${vehicleName}</p>
          </div>

          <div style="background:#28282e;border:1px solid ${urgencyColor};border-radius:12px;padding:18px 20px;margin-bottom:20px;">
            <p style="color:#999;font-size:0.7rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 4px;">Documento</p>
            <p style="color:#f0ede8;font-size:1rem;font-weight:700;margin:0 0 12px;">${taxType}</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="color:#666;font-size:0.75rem;margin:0 0 2px;">Mês de vencimento</p>
                  <p style="color:#f0ede8;font-size:0.95rem;font-weight:600;margin:0;">${monthName}</p>
                </td>
                <td align="right">
                  <span style="background:${urgencyColor};color:#fff;font-size:0.8rem;font-weight:700;padding:6px 14px;border-radius:20px;">
                    ${days} dia${days !== 1 ? 's' : ''}
                  </span>
                </td>
              </tr>
            </table>
          </div>

          <div style="text-align:center;margin-bottom:20px;">
            <a href="https://motormacete.com.br/home/garagem" style="display:inline-block;background:#ff6600;color:#111;font-size:0.875rem;font-weight:800;text-decoration:none;padding:14px 32px;border-radius:100px;letter-spacing:1px;text-transform:uppercase;">
              Ver minha garagem →
            </a>
          </div>

          <hr style="border:none;border-top:1px solid #2a2a32;margin:0 0 16px;" />
          <p style="color:#444;font-size:0.75rem;margin:0;text-align:center;">
            Você recebe este alerta por ter cadastrado os vencimentos no <strong style="color:#666;">MotorMacete</strong>.<br/>
            <a href="https://motormacete.com.br/home" style="color:#555;">Acessar o app</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}
