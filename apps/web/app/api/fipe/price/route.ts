import { NextRequest, NextResponse } from 'next/server'

const FIPE_V1   = 'https://parallelum.com.br/fipe/api/v1'
const FIPE_SITE = 'https://veiculos.fipe.org.br/api/veiculos/'
const TYPE_MAP:  Record<string, string> = { carro: 'carros', moto: 'motos' }
const TYPE_CODE: Record<string, string> = { carro: '1',      moto:  '2'    }

const MONTHS_PT = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']

const SITE_HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Referer':      'https://veiculos.fipe.org.br/',
  'Origin':       'https://veiculos.fipe.org.br',
  'Accept':       'application/json, text/plain, */*',
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function parseBRL(valor: string): number {
  return parseFloat(valor.replace('R$', '').replace(/[\s.]/g, '').replace(',', '.'))
}

/** "maio/2025" → "Mai/25" */
function monthLabel(mes: string): string {
  const MAP: Record<string, string> = {
    janeiro:'Jan', fevereiro:'Fev', março:'Mar', abril:'Abr',
    maio:'Mai', junho:'Jun', julho:'Jul', agosto:'Ago',
    setembro:'Set', outubro:'Out', novembro:'Nov', dezembro:'Dez',
  }
  const [m, y] = mes.replace(' de ', '/').split('/')
  return `${MAP[m?.toLowerCase()] ?? m?.slice(0, 3) ?? '?'}/${(y ?? '??').slice(-2)}`
}

/** Label for a month N months ago relative to today */
function calLabel(monthsAgo: number): string {
  const d = new Date()
  d.setDate(1)
  d.setMonth(d.getMonth() - monthsAgo)
  return `${MONTHS_PT[d.getMonth()]}/${String(d.getFullYear()).slice(2)}`
}

// ── Official FIPE API (POST) ──────────────────────────────────────────────────

interface FipeRef { Codigo: number; Mes: string }

async function fetchFipeRefs(): Promise<FipeRef[] | null> {
  try {
    const r = await fetch(`${FIPE_SITE}ConsultarTabelaDeReferencia`, {
      method: 'POST',
      headers: SITE_HEADERS,
      body: '',
      cache: 'no-store',
    })
    if (!r.ok) return null
    const d = await r.json()
    return Array.isArray(d) && d.length > 0 ? d as FipeRef[] : null
  } catch {
    return null
  }
}

async function fetchFipePrice(
  tableCode: number,
  brandCode: string,
  modelCode: string,
  yearCode:  string,
  type:      string,
): Promise<number | null> {
  const [anoModelo, fuelCode = '1'] = yearCode.split('-')

  const body = new URLSearchParams({
    codigoTabelaReferencia: String(tableCode),
    codigoMarca:            brandCode,
    codigoModelo:           modelCode,
    codigoTipoVeiculo:      TYPE_CODE[type] ?? '1',
    anoModelo,
    codigoTipoCombustivel:  fuelCode,
    tipoVeiculo:            type,
    modeloCodigoExterno:    '',
    tipoConsulta:           'codigo',
  })

  try {
    const r = await fetch(`${FIPE_SITE}ConsultarValorComTodosParametros`, {
      method: 'POST',
      headers: SITE_HEADERS,
      body: body.toString(),
      cache: 'no-store',
    })
    if (!r.ok) return null
    const d = await r.json()
    return typeof d?.Valor === 'string' ? parseBRL(d.Valor) : null
  } catch {
    return null
  }
}

// ── Route ─────────────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const sp        = req.nextUrl.searchParams
  const type      = sp.get('type')      ?? ''
  const brandCode = sp.get('brandCode') ?? ''
  const modelCode = sp.get('modelCode') ?? ''

  if (!type || !brandCode || !modelCode || !TYPE_MAP[type]) {
    return NextResponse.json({ error: 'invalid params' }, { status: 400 })
  }

  const yearCode = sp.get('yearCode') ?? ''
  const ft       = TYPE_MAP[type]
  const base     = `${FIPE_V1}/${ft}/marcas/${brandCode}/modelos/${modelCode}`

  try {
    // 1. Resolve year via Parallelum
    let resolvedYear = yearCode
    if (!resolvedYear) {
      const yr  = await fetch(`${base}/anos`, { next: { revalidate: 86400 } })
      const yrs: { codigo: string; nome: string }[] = await yr.json()
      if (!Array.isArray(yrs) || !yrs.length) {
        return NextResponse.json({ error: 'no years' }, { status: 404 })
      }
      resolvedYear = yrs[0].codigo
    }

    // 2. Current price via Parallelum
    const priceRes = await fetch(`${base}/anos/${resolvedYear}`, { next: { revalidate: 86400 } })
    const price    = await priceRes.json()
    if (!price?.Valor) return NextResponse.json({ error: 'no price' }, { status: 404 })

    const currentFipe = parseBRL(price.Valor as string)

    // 3. Reference tables from official FIPE
    const fipeRefs = await fetchFipeRefs()

    // 4. Determine view type based on vehicle year
    const now         = new Date()
    const currentYear = now.getFullYear()
    const currentMon  = now.getMonth() // 0-based

    const [anoModelo] = resolvedYear.split('-')
    const vehicleYear = parseInt(anoModelo) || 0
    const isCurrentYear = vehicleYear >= currentYear

    let history: { month: string; fipe: number }[] = []
    let viewType: 'monthly-ytd' | 'annual-3yr'

    if (isCurrentYear) {
      // Zero km / current year: Jan → current month
      viewType = 'monthly-ytd'
      const monthCount = currentMon + 1 // e.g. May = 5

      if (fipeRefs && fipeRefs.length >= monthCount) {
        // fipeRefs sorted newest→oldest, slice monthCount then reverse = Jan..current
        const refs = fipeRefs.slice(0, monthCount).reverse()
        history = await Promise.all(
          refs.map(async (ref) => {
            const val = await fetchFipePrice(ref.Codigo, brandCode, modelCode, resolvedYear, type)
            return { month: monthLabel(ref.Mes), fipe: val ?? currentFipe }
          })
        )
      } else {
        // Fallback: just repeat current price for each month since Jan
        history = Array.from({ length: monthCount }, (_, idx) => ({
          month: `${MONTHS_PT[idx]}/${String(currentYear).slice(2)}`,
          fipe: currentFipe,
        }))
      }
    } else {
      // Previous years: annual data points — 3 years ago, 2 years, 1 year, now
      viewType = 'annual-3yr'
      const annualIndices = [36, 24, 12, 0]

      // Depreciation fallback: cars appreciate going back in time
      // ~10% per year average depreciation for Brazilian market
      const deprFallback = (yearsAgo: number) =>
        Math.round(currentFipe / Math.pow(0.90, yearsAgo))

      const raw = await Promise.all(
        annualIndices.map(async (monthsAgo) => {
          const ref = fipeRefs?.[monthsAgo]
          if (ref) {
            const val = await fetchFipePrice(ref.Codigo, brandCode, modelCode, resolvedYear, type)
            const label = monthLabel(ref.Mes)
            // Only use API value if meaningfully different from current (avoid stuck-cache responses)
            if (val !== null) return { month: label, fipe: val, real: true }
            return { month: label, fipe: deprFallback(monthsAgo / 12), real: false }
          }
          return { month: calLabel(monthsAgo), fipe: deprFallback(monthsAgo / 12), real: false }
        })
      )

      // If ALL real values returned the same price (API stuck), switch to full estimate
      const realVals = raw.filter(p => p.real).map(p => p.fipe)
      const allSame  = realVals.length > 0 && realVals.every(v => v === currentFipe)

      history = raw.map((p, i) => ({
        month: p.month,
        fipe:  (p.real && !allSame) ? p.fipe : deprFallback(annualIndices[i] / 12),
      }))
    }

    return NextResponse.json({
      currentFipe,
      fipeCode:       price.CodigoFipe as string,
      modelYear:      `${price.AnoModelo as number} ${price.Combustivel as string}`,
      referenceMonth: fipeRefs ? monthLabel(fipeRefs[0].Mes) : calLabel(0),
      history,
      viewType,
    })
  } catch {
    return NextResponse.json({ error: 'fipe api error' }, { status: 502 })
  }
}
