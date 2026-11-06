import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/session'
import { prisma } from '@/lib/db'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  const user = await prisma.user.findUnique({ where: { id: session.userId }, select: { plan: true, trialEndsAt: true } })
  const startOfMonth = new Date(); startOfMonth.setDate(1); startOfMonth.setHours(0, 0, 0, 0)
  const used = await prisma.pageView.count({
    where: { userId: session.userId, page: 'mechanic_chat', createdAt: { gte: startOfMonth } },
  })
  return NextResponse.json({ plan: user?.plan ?? 'FREE', used, limit: 5, isTrialing: !!(user?.trialEndsAt && new Date() <= user.trialEndsAt) })
}

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req)

  // Usuários logados: valida limite de consultas mensais (FREE: 5/mês; admin e Pro: ilimitado)
  if (session) {
    const user = await prisma.user.findUnique({ where: { id: session.userId }, select: { plan: true, isAdmin: true, trialEndsAt: true } })
    const isTrialing = !!(user?.trialEndsAt && new Date() <= user.trialEndsAt)
    if (!user?.isAdmin && user?.plan === 'FREE' && !isTrialing) {
      const startOfMonth = new Date(); startOfMonth.setDate(1); startOfMonth.setHours(0, 0, 0, 0)
      const used = await prisma.pageView.count({
        where: { userId: session.userId, page: 'mechanic_chat', createdAt: { gte: startOfMonth } },
      })
      if (used >= 5) {
        return new Response(JSON.stringify({ error: 'Limite de 5 consultas mensais atingido. Assine o plano Pro para consultas ilimitadas.', code: 'PLAN_LIMIT', used, limit: 5 }), { status: 403 })
      }
      await prisma.pageView.create({ data: { userId: session.userId, page: 'mechanic_chat' } })
    }
  }
  // Usuários anônimos: limite de 3 consultas controlado pelo frontend via localStorage

  const { vehicle, messages } = await req.json()

  const vehicleInfo = vehicle?.brand && vehicle?.model && vehicle?.year
    ? `\n\nVeículo em consulta: ${vehicle.brand} ${vehicle.model} ${vehicle.year}${vehicle.fuel ? ` — ${vehicle.fuel}` : ''}`
    : '\n\nNenhum veículo específico foi informado. Peça ao usuário para descrever o veículo quando relevante.'

  const system = `Você é o MecânicoBot do MotorMacete — um mecânico automotivo brasileiro experiente com mais de 20 anos de prática em oficinas e concessionárias do Brasil.${vehicleInfo}

Diretrizes:
- Responda APENAS perguntas relacionadas a veículos, mecânica, manutenção, peças, diagnósticos, revisões, combustível, pneus, elétrica automotiva, trânsito ou transporte. Se a pergunta não tiver nenhuma relação com esses temas, responda SOMENTE: "Só consigo ajudar com assuntos relacionados a veículos e mecânica. Tem alguma dúvida sobre seu carro ou moto?"
- Responda SEMPRE em português brasileiro informal e direto ao ponto
- Use parágrafos curtos (máximo 3 linhas cada)
- Para diagnósticos, sempre liste as causas mais prováveis primeiro (da mais para a menos comum)
- Indique claramente: 🔧 DIY (o dono pode fazer) ou 🏪 Oficina (precisa de profissional)
- Cite custo estimado em R$ quando relevante (mão de obra + peça)
- Considere o contexto brasileiro: combustível flex, calor, estradas ruins, peças nacionais x importadas
- Mencione marcas de peças confiáveis e acessíveis no Brasil (Bosch, NGK, Cofap, Monroe, etc.)
- Se a informação for insuficiente para diagnóstico, faça perguntas objetivas para entender melhor
- Nunca invente diagnósticos sem evidência — seja honesto sobre incertezas
- Comece respostas complexas com um resumo de 1 linha do provável problema`

  const stream = await client.messages.stream({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    system,
    messages,
  })

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
          controller.enqueue(encoder.encode(chunk.delta.text))
        }
      }
      controller.close()
    },
  })

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
