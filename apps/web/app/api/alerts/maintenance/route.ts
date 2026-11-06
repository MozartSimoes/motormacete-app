import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { prisma } from '@/lib/db'

const resend = new Resend(process.env.RESEND_API_KEY)

// Vercel Cron invoca via GET com header Authorization: Bearer {CRON_SECRET}
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  const in7Days = new Date(now)
  in7Days.setDate(in7Days.getDate() + 7)

  // Busca logs com nextDate nos próximos 7 dias, ainda não alertados,
  // de usuários Pro ou admin
  const logs = await prisma.maintenanceLog.findMany({
    where: {
      nextDate: { gte: now, lte: in7Days },
      alertSentAt: null,
      vehicle: {
        user: {
          OR: [
            { isAdmin: true },
            { plan: { in: ['DRIVER_PRO', 'MECHANIC_PRO'] } },
            { trialEndsAt: { gte: new Date() } },
          ],
        },
      },
    },
    include: {
      vehicle: {
        select: {
          brand: true, model: true, year: true, nickname: true, plate: true,
          user: { select: { name: true, email: true } },
        },
      },
    },
  })

  if (logs.length === 0) {
    return NextResponse.json({ sent: 0 })
  }

  let sent = 0
  const errors: string[] = []

  for (const log of logs) {
    const { vehicle } = log
    const userName = vehicle.user.name.split(' ')[0]
    const vehicleName = vehicle.nickname ?? `${vehicle.brand} ${vehicle.model} ${vehicle.year}`
    const dueDate = new Date(log.nextDate!).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    const daysLeft = Math.ceil((log.nextDate!.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    const urgency = daysLeft <= 2 ? '🔴 URGENTE' : daysLeft <= 4 ? '🟠 EM BREVE' : '🟡 PRÓXIMO'

    try {
      await resend.emails.send({
        from: `MotorMacete <${process.env.EMAIL_FROM ?? 'noreply@motormacete.com.br'}>`,
        to: vehicle.user.email,
        subject: `${urgency} — Manutenção do ${vehicleName} em ${daysLeft} dia${daysLeft !== 1 ? 's' : ''}`,
        html: `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="utf-8"/><title>Alerta de Manutenção</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:system-ui,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;background:#1c1c22;border-radius:16px;overflow:hidden;border:1px solid #2a2a32;">

        <!-- Header -->
        <tr><td style="background:#ff6600;padding:22px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td><span style="color:#fff;font-size:1.1rem;font-weight:800;letter-spacing:1px;">MOTORMACETE</span></td>
              <td align="right"><span style="color:rgba(255,255,255,0.8);font-size:0.8rem;font-weight:600;letter-spacing:2px;text-transform:uppercase;">Alerta Pro</span></td>
            </tr>
          </table>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:28px 32px;">
          <p style="color:#999;font-size:0.85rem;margin:0 0 6px;">Olá, ${userName} 👋</p>
          <h2 style="color:#f0ede8;font-size:1.4rem;font-weight:800;margin:0 0 20px;line-height:1.3;">
            Manutenção do seu veículo está se aproximando
          </h2>

          <!-- Vehicle card -->
          <div style="background:#28282e;border:1px solid #3a3a42;border-radius:12px;padding:18px 20px;margin-bottom:20px;">
            <p style="color:#ff6600;font-size:0.7rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 4px;">Veículo</p>
            <p style="color:#f0ede8;font-size:1rem;font-weight:700;margin:0;">${vehicleName}${vehicle.plate ? ` · ${vehicle.plate.toUpperCase()}` : ''}</p>
          </div>

          <!-- Maintenance card -->
          <div style="background:#28282e;border:1px solid ${daysLeft <= 2 ? '#ef4444' : daysLeft <= 4 ? '#f97316' : '#eab308'};border-radius:12px;padding:18px 20px;margin-bottom:20px;">
            <p style="color:#999;font-size:0.7rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 4px;">Serviço</p>
            <p style="color:#f0ede8;font-size:1rem;font-weight:700;margin:0 0 12px;">${log.category} — ${log.description}</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:50%;">
                  <p style="color:#666;font-size:0.75rem;margin:0 0 2px;">Data prevista</p>
                  <p style="color:#f0ede8;font-size:0.95rem;font-weight:600;margin:0;">${dueDate}</p>
                </td>
                <td align="right">
                  <span style="background:${daysLeft <= 2 ? '#ef4444' : daysLeft <= 4 ? '#f97316' : '#eab308'};color:#fff;font-size:0.8rem;font-weight:700;padding:6px 14px;border-radius:20px;">
                    ${daysLeft} dia${daysLeft !== 1 ? 's' : ''}
                  </span>
                </td>
              </tr>
            </table>
            ${log.nextKm ? `<p style="color:#666;font-size:0.8rem;margin:12px 0 0;">KM previsto: <strong style="color:#aaa;">${log.nextKm.toLocaleString('pt-BR')} km</strong></p>` : ''}
          </div>

          <!-- CTA -->
          <div style="text-align:center;margin-bottom:20px;">
            <a href="https://motormacete.com.br/home/garagem" style="display:inline-block;background:#ff6600;color:#111;font-size:0.875rem;font-weight:800;text-decoration:none;padding:14px 32px;border-radius:100px;letter-spacing:1px;text-transform:uppercase;">
              Ver minha garagem →
            </a>
          </div>

          <hr style="border:none;border-top:1px solid #2a2a32;margin:0 0 16px;" />
          <p style="color:#444;font-size:0.75rem;margin:0;text-align:center;">
            Você recebe este e-mail por ser assinante do <strong style="color:#666;">MotorMacete Pro</strong>.<br/>
            <a href="https://motormacete.com.br/home" style="color:#555;">Acessar o app</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
      })

      await prisma.maintenanceLog.update({
        where: { id: log.id },
        data: { alertSentAt: now },
      })

      sent++
    } catch (e) {
      errors.push(`${log.id}: ${e}`)
    }
  }

  return NextResponse.json({ sent, errors: errors.length ? errors : undefined })
}
