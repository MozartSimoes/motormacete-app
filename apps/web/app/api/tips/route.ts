import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { parseModelYear } from '@/lib/data'
import type { Category } from '@/lib/types'

const validCategories: Category[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']

function matchesStoredName(fipeName: string, storedName: string): boolean {
  const esc = storedName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`\\b${esc}\\b`, 'i').test(fipeName)
}

function isElectric(yearName: string, modelName: string): boolean {
  const y = yearName.toLowerCase()
  const m = modelName.toLowerCase()
  return y.includes('elétric') || y.includes('eletric') || m.includes(' ev') || m.endsWith(' ev')
}

// EV-specific defaults served when no model-specific tips are found
const EV_DEFAULTS: Record<Category, { severity: string; title: string; body: string }[]> = {
  MACETES: [
    { severity: 'OK',   title: 'Limite de carga em 80-90%',           body: 'Para preservar as células da bateria no longo prazo, configure o limite de carga para 80-90% no menu do veículo. Reserve os 100% para viagens longas. Esta prática simples pode preservar até 15% da capacidade em 8 anos.' },
    { severity: 'OK',   title: 'Frenagem regenerativa maximizada',    body: 'Ative o nível máximo de recuperação regenerativa. Além de recuperar energia, o freio motor elétrico quase elimina o desgaste das pastilhas — em muitos EVs as pastilhas duram mais de 100.000 km.' },
    { severity: 'WARN', title: 'Evite carregamentos DC frequentes',   body: 'Carregadores rápidos DC (acima de 50 kW) geram calor dentro das células. Para o dia a dia, prefira o carregador AC de parede (7-22 kW). Use DC em viagens longas, não como rotina.' },
    { severity: 'OK',   title: 'Pré-condicionamento antes de sair',  body: 'Enquanto o carro ainda está carregando, ative o ar condicionado ou aquecimento pelo app. O carro usará energia da tomada, não da bateria, e você sairá com a temperatura já agradável.' },
    { severity: 'OK',   title: 'Rotação de pneus a cada 10.000 km',  body: 'EVs são mais pesados que equivalentes a combustão e têm torque instantâneo que desgasta mais os pneus dianteiros. Rotacione a cada 10.000 km para prolongar a vida útil.' },
  ],
  PROBLEMAS: [
    { severity: 'WARN', title: 'Degradação natural da bateria',       body: 'Baterias de EV perdem em média 2-3% de capacidade por ano em condições normais. Após 8 anos, é comum ter 80-85% da capacidade original. Carregamentos DC frequentes e exposição a calor intenso aceleram esse processo.' },
    { severity: 'WARN', title: 'Perda de autonomia no calor/frio',    body: 'Temperaturas extremas reduzem a autonomia temporariamente: frio intenso pode reduzir em 20-30%, calor acima de 40°C em 10-15%. É comportamento normal das células de lítio — a autonomia volta ao normal em temperatura ambiente.' },
    { severity: 'OK',   title: 'Atualizações OTA importantes',       body: 'Fabricantes corrigem bugs, melhoram a autonomia e ajustam o gerenciamento da bateria via atualizações remotas (OTA). Mantenha sempre o software atualizado e nunca cancele uma atualização pendente.' },
  ],
  MANUTENCAO: [
    { severity: 'OK',   title: 'Sem troca de óleo do motor',          body: 'Motores elétricos não usam óleo lubrificante. Esta é uma das principais vantagens de custo: sem óleo, sem filtro de óleo, sem velas, sem correia dentada. A revisão periódica de um EV é muito mais simples e barata.' },
    { severity: 'OK',   title: 'Fluido de freio a cada 2 anos',       body: 'Mesmo usando pouco os freios mecânicos (frenagem regenerativa faz o trabalho principal), o fluido de freio DOT 4 absorve umidade com o tempo. Troque a cada 2 anos independente da quilometragem.' },
    { severity: 'WARN', title: 'Fluido de arrefecimento da bateria',  body: 'O sistema de gerenciamento térmico usa fluido próprio para resfriar a bateria e o motor. Troque conforme o manual (geralmente a cada 100.000 km ou 5 anos). Fluido degradado afeta a vida da bateria.' },
    { severity: 'OK',   title: 'Freios: inspecione anualmente',       body: 'Pela frenagem regenerativa, as pastilhas são pouco usadas e podem oxidar por falta de uso. Inspecione uma vez por ano e acione os freios mecânicos intencionalmente em baixa velocidade periodicamente para limpar a oxidação.' },
    { severity: 'OK',   title: 'Pneus: prioridade máxima',            body: 'Para um EV, os pneus são o item de manutenção mais crítico. O peso e o torque instantâneo desgastam mais. Use pneus com rating de carga adequado ao peso do veículo e calibre semanalmente.' },
  ],
}

const MOTO_EXCLUDE_KEYWORDS = ['cabine', 'para-brisa', 'limpador', 'ar condicionado', 'ar-condicionado', 'câmbio automático', 'câmbio automatico']

function isMotoCompatible(tip: { title: string; body: string }): boolean {
  const text = `${tip.title} ${tip.body}`.toLowerCase()
  return !MOTO_EXCLUDE_KEYWORDS.some(kw => text.includes(kw))
}

export async function GET(request: NextRequest) {
  const modelName   = request.nextUrl.searchParams.get('modelName') ?? ''
  const category    = request.nextUrl.searchParams.get('category') as Category | null
  const yearCode    = request.nextUrl.searchParams.get('yearCode') ?? undefined
  const yearName    = request.nextUrl.searchParams.get('yearName') ?? ''
  const vehicleType = request.nextUrl.searchParams.get('vehicleType') ?? 'carro'
  const isMoto      = vehicleType === 'moto'

  if (!modelName || !category || !validCategories.includes(category)) {
    return NextResponse.json({ error: 'modelName and valid category required' }, { status: 400 })
  }

  const year = yearCode ? parseModelYear(yearCode) : null
  const isEV = isElectric(yearName, modelName)

  const yearFilter = year !== null ? {
    AND: [
      { OR: [{ yearFrom: null }, { yearFrom: { lte: year } }] },
      { OR: [{ yearTo: null }, { yearTo: { gte: year } }] },
    ],
  } : {}

  // Step 1: find all distinct stored modelNames for this category
  const knownNames = await prisma.tip.findMany({
    where: { category, modelName: { not: null } },
    select: { modelName: true },
    distinct: ['modelName'],
  })

  // Step 2: check which stored names appear inside the FIPE full model name
  const matchingNames = knownNames
    .map((r) => r.modelName!)
    .filter((name) => matchesStoredName(modelName, name))

  // Step 3: fetch specific tips for matched names
  const specific = matchingNames.length > 0
    ? await prisma.tip.findMany({
        where: { modelName: { in: matchingNames }, category, ...yearFilter },
        orderBy: { order: 'asc' },
      })
    : []

  // PROBLEMAS never falls back to defaults — only show verified specific data
  if (specific.length > 0 || category === 'PROBLEMAS') {
    return NextResponse.json({ tips: specific, isSpecific: specific.length > 0 })
  }

  // For EVs with no specific tips, serve EV-appropriate defaults
  if (isEV) {
    const evTips = EV_DEFAULTS[category].map((t, i) => ({
      id: `ev-default-${i}`,
      modelName: null,
      category,
      severity: t.severity,
      title: t.title,
      body: t.body,
      yearFrom: null,
      yearTo: null,
      order: i,
    }))
    return NextResponse.json({ tips: evTips, isSpecific: false })
  }

  // Combustion fallback defaults for MACETES / MANUTENCAO
  const defaults = await prisma.tip.findMany({
    where: { modelName: null, category },
    orderBy: { order: 'asc' },
  })

  const filteredDefaults = isMoto ? defaults.filter(isMotoCompatible) : defaults

  return NextResponse.json({ tips: filteredDefaults, isSpecific: false })
}
