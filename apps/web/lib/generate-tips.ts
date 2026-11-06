import Anthropic from '@anthropic-ai/sdk'
import type { Category, Severity } from '@/lib/types'

interface GeneratedTip {
  severity: Severity
  title: string
  body: string
}

type GeneratedResult = Record<Category, GeneratedTip[]>

const client = new Anthropic()

const SYSTEM = `Você é um especialista em manutenção automotiva com 20 anos de experiência em oficinas brasileiras.
Conhece os problemas crônicos, macetes e intervalos de manutenção específicos de cada modelo vendido no Brasil.
Responda APENAS com JSON válido, sem texto adicional fora do JSON.`

function buildPrompt(modelName: string, modelYear: string | null): string {
  const yearPart = modelYear ? ` (ano ${modelYear})` : ''
  return `Gere dicas técnicas para o veículo: ${modelName}${yearPart}

Retorne um objeto JSON com exatamente estas três chaves:
{
  "MACETES": [...],
  "PROBLEMAS": [...],
  "MANUTENCAO": [...]
}

Cada item deve ter:
- "severity": "OK" (normal/preventivo), "WARN" (atenção necessária) ou "DANGER" (crítico/urgente)
- "title": título curto, máximo 55 caracteres
- "body": 1 a 3 frases práticas e diretas, específicas para este modelo

Regras:
- 4 a 6 itens por categoria
- Seja específico para este modelo — não use dicas genéricas
- MACETES: truques do dia a dia usados por mecânicos experientes
- PROBLEMAS: falhas crônicas conhecidas e amplamente relatadas neste modelo
- MANUTENCAO: intervalos e cuidados específicos para este modelo
- Mencione gerações, anos ou motor específico no body quando relevante
- Idioma: português brasileiro`
}

export async function generateTipsForModel(
  modelName: string,
  modelYear: string | null,
): Promise<GeneratedResult | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.warn('[generate-tips] ANTHROPIC_API_KEY não definida — pulando geração')
    return null
  }

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      system: SYSTEM,
      messages: [{ role: 'user', content: buildPrompt(modelName, modelYear) }],
    })

    const text = message.content.find((b) => b.type === 'text')?.text ?? ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.error('[generate-tips] Resposta sem JSON válido:', text.slice(0, 200))
      return null
    }

    const parsed = JSON.parse(jsonMatch[0]) as Partial<GeneratedResult>

    const result: GeneratedResult = {
      MACETES:    Array.isArray(parsed.MACETES)    ? parsed.MACETES    : [],
      PROBLEMAS:  Array.isArray(parsed.PROBLEMAS)  ? parsed.PROBLEMAS  : [],
      MANUTENCAO: Array.isArray(parsed.MANUTENCAO) ? parsed.MANUTENCAO : [],
    }

    return result
  } catch (err) {
    console.error('[generate-tips] Erro ao chamar Claude API:', err)
    return null
  }
}
