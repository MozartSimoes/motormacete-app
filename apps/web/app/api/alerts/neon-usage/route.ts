import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { prisma } from '@/lib/db'

const resend = new Resend(process.env.RESEND_API_KEY)

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? ''

// Limites de transferência de dados (GB) do período de faturamento atual —
// dispara 1 alerta na primeira execução do cron que encontrar o uso acima de
// cada um, evitando repetir o mesmo aviso. O plano Launch inclui 500GB/mês.
const THRESHOLDS_GB = [1, 5, 10, 25, 50, 100, 200, 350]

async function sendExpoPush(token: string, title: string, body: string) {
  try {
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ to: token, title, body, sound: 'default', priority: 'high' }),
    })
  } catch {}
}

function formatGb(bytes: number): string {
  return (bytes / 1024 ** 3).toFixed(2)
}

// Vercel Cron — GET com Authorization: Bearer {CRON_SECRET}
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = process.env.NEON_API_KEY
  const projectId = process.env.NEON_PROJECT_ID
  if (!apiKey || !projectId) {
    return NextResponse.json({ error: 'NEON_API_KEY ou NEON_PROJECT_ID nao configurados' }, { status: 500 })
  }

  const neonRes = await fetch(`https://console.neon.tech/api/v2/projects/${projectId}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  })
  if (!neonRes.ok) {
    return NextResponse.json({ error: `Neon API retornou ${neonRes.status}` }, { status: 502 })
  }

  const { project } = await neonRes.json() as {
    project: {
      data_transfer_bytes: number
      compute_time_seconds: number
      active_time_seconds: number
      data_storage_bytes_hour: number
      consumption_period_start: string
      consumption_period_end: string
    }
  }

  const periodStart = new Date(project.consumption_period_start)
  const dataTransferBytes = project.data_transfer_bytes

  const state = await prisma.neonUsageAlert.findFirst()
  const isNewPeriod = !state || state.periodStart.getTime() !== periodStart.getTime()
  const lastThresholdBytes = isNewPeriod ? 0 : Number(state!.lastThresholdBytes)

  const crossedGb = THRESHOLDS_GB
    .filter(gb => dataTransferBytes >= gb * 1024 ** 3 && gb * 1024 ** 3 > lastThresholdBytes)
    .pop() // maior limite recem-cruzado

  if (crossedGb === undefined) {
    return NextResponse.json({ alerted: false, dataTransferGb: formatGb(dataTransferBytes) })
  }

  const subject = `⚠️ Neon: transferência de dados passou de ${crossedGb}GB neste período`
  const bodyText = `Transferência de dados: ${formatGb(dataTransferBytes)}GB (limite avisado: ${crossedGb}GB)
Compute: ${(project.compute_time_seconds / 3600).toFixed(1)}h
Storage: ${formatGb(project.data_storage_bytes_hour)}GB
Período: ${periodStart.toLocaleDateString('pt-BR')} até ${new Date(project.consumption_period_end).toLocaleDateString('pt-BR')}

Painel: https://console.neon.tech`

  try {
    await resend.emails.send({
      from: `MotorMacete <${process.env.EMAIL_FROM ?? 'noreply@motormacete.com.br'}>`,
      to: ADMIN_EMAIL,
      subject,
      text: bodyText,
    })
  } catch {}

  const admin = await prisma.user.findFirst({ where: { isAdmin: true, expoPushToken: { not: null } } })
  if (admin?.expoPushToken) {
    await sendExpoPush(admin.expoPushToken, subject, `${formatGb(dataTransferBytes)}GB usados neste período de faturamento.`)
  }

  await prisma.neonUsageAlert.upsert({
    where: { id: state?.id ?? '__singleton__' },
    create: { id: '__singleton__', periodStart, lastThresholdBytes: BigInt(crossedGb * 1024 ** 3) },
    update: { periodStart, lastThresholdBytes: BigInt(crossedGb * 1024 ** 3) },
  })

  return NextResponse.json({ alerted: true, crossedGb, dataTransferGb: formatGb(dataTransferBytes) })
}
