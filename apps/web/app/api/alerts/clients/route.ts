import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { prisma } from '@/lib/db'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  const in7Days = new Date(now)
  in7Days.setDate(in7Days.getDate() + 7)

  // Busca OS com nextMaintenanceDate nos próximos 7 dias, não alertadas
  // de mecânicos Pro ou admin
  const orders = await prisma.serviceOrder.findMany({
    where: {
      nextMaintenanceDate: { gte: now, lte: in7Days },
      clientAlertSentAt: null,
      workshop: {
        user: {
          OR: [{ isAdmin: true }, { plan: { in: ['MECHANIC_PRO', 'DRIVER_PRO'] } }, { trialEndsAt: { gte: new Date() } }],
        },
      },
    },
    include: {
      workshop: {
        select: {
          name: true,
          user: { select: { name: true, email: true } },
        },
      },
    },
  })

  if (orders.length === 0) return NextResponse.json({ sent: 0 })

  let sent = 0
  const errors: string[] = []

  for (const order of orders) {
    const mechName  = order.workshop.user.name.split(' ')[0]
    const daysLeft  = Math.ceil((order.nextMaintenanceDate!.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    const dueDate   = order.nextMaintenanceDate!.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    const urgency   = daysLeft <= 2 ? '🔴 URGENTE' : daysLeft <= 4 ? '🟠 EM BREVE' : '🟡 PRÓXIMO'
    const vehicle   = `${order.vehicleBrand} ${order.vehicleModel}${order.vehicleYear ? ` ${order.vehicleYear}` : ''}`

    try {
      await resend.emails.send({
        from: `MotorMacete <${process.env.EMAIL_FROM ?? 'noreply@motormacete.com.br'}>`,
        to: order.workshop.user.email,
        subject: `${urgency} — Revisão de ${order.clientName} em ${daysLeft} dia${daysLeft !== 1 ? 's' : ''}`,
        html: `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="utf-8"/><title>Alerta de Cliente</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:system-ui,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;background:#1c1c22;border-radius:16px;overflow:hidden;border:1px solid #2a2a32;">
        <tr><td style="background:#ff6600;padding:22px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td><span style="color:#fff;font-size:1.1rem;font-weight:800;letter-spacing:1px;">MOTORMACETE</span></td>
              <td align="right"><span style="color:rgba(255,255,255,0.8);font-size:0.8rem;font-weight:600;letter-spacing:2px;text-transform:uppercase;">Alerta de Cliente</span></td>
            </tr>
          </table>
        </td></tr>
        <tr><td style="padding:28px 32px;">
          <p style="color:#999;font-size:0.85rem;margin:0 0 6px;">Olá, ${mechName} 👋</p>
          <h2 style="color:#f0ede8;font-size:1.3rem;font-weight:800;margin:0 0 20px;line-height:1.3;">
            Seu cliente tem manutenção próxima!
          </h2>

          <div style="background:#28282e;border:1px solid #3a3a42;border-radius:12px;padding:18px 20px;margin-bottom:16px;">
            <p style="color:#ff6600;font-size:0.7rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 4px;">Cliente</p>
            <p style="color:#f0ede8;font-size:1rem;font-weight:700;margin:0 0 4px;">${order.clientName}</p>
            ${order.clientPhone ? `<p style="color:#666;font-size:0.85rem;margin:0;">${order.clientPhone}</p>` : ''}
          </div>

          <div style="background:#28282e;border:1px solid ${daysLeft <= 2 ? '#ef4444' : daysLeft <= 4 ? '#f97316' : '#eab308'};border-radius:12px;padding:18px 20px;margin-bottom:20px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="color:#999;font-size:0.75rem;margin:0 0 2px;">Veículo</p>
                  <p style="color:#f0ede8;font-size:0.95rem;font-weight:700;margin:0 0 10px;">${vehicle}${order.plate ? ` · ${order.plate}` : ''}</p>
                  <p style="color:#999;font-size:0.75rem;margin:0 0 2px;">Última OS</p>
                  <p style="color:#aaa;font-size:0.85rem;margin:0;">#${order.number} — ${order.diagnosis ?? 'Serviço realizado'}</p>
                </td>
                <td align="right" style="vertical-align:top;">
                  <span style="background:${daysLeft <= 2 ? '#ef4444' : daysLeft <= 4 ? '#f97316' : '#eab308'};color:#fff;font-size:0.8rem;font-weight:700;padding:6px 14px;border-radius:20px;white-space:nowrap;">
                    ${daysLeft} dia${daysLeft !== 1 ? 's' : ''}
                  </span>
                </td>
              </tr>
            </table>
            <p style="color:#888;font-size:0.8rem;margin:14px 0 0;">Revisão prevista: <strong style="color:#f0ede8;">${dueDate}</strong></p>
          </div>

          <div style="text-align:center;margin-bottom:20px;">
            <a href="https://motormacete.com.br/mecanico/os" style="display:inline-block;background:#ff6600;color:#111;font-size:0.875rem;font-weight:800;text-decoration:none;padding:14px 32px;border-radius:100px;letter-spacing:1px;text-transform:uppercase;">
              Ver OS do cliente →
            </a>
          </div>

          <hr style="border:none;border-top:1px solid #2a2a32;margin:0 0 16px;"/>
          <p style="color:#444;font-size:0.75rem;margin:0;text-align:center;">
            ${order.workshop.name} · <strong style="color:#666;">MotorMacete Mecânico Pro</strong>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
      })

      await prisma.serviceOrder.update({
        where: { id: order.id },
        data: { clientAlertSentAt: now },
      })
      sent++
    } catch (e) {
      errors.push(`${order.id}: ${e}`)
    }
  }

  return NextResponse.json({ sent, errors: errors.length ? errors : undefined })
}
