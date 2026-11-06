import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

const FIPE_BASE    = 'https://parallelum.com.br/fipe/api/v1'
const CURRENT_YEAR = new Date().getFullYear()

/** Numeric-only string → FIPE code; anything else → Prisma ID */
const isFipeCode = (code: string) => /^\d+$/.test(code)

// ── Fallback year list (when FIPE unavailable) ────────────────────────────────
function buildYears(vehicleType: string): { code: string; name: string }[] {
  const years: { code: string; name: string }[] = []
  for (let y = CURRENT_YEAR + 1; y >= 1990; y--) {
    if (vehicleType === 'moto') {
      years.push({ code: `${y} Gasolina`, name: `${y} Gasolina` })
    } else {
      years.push(
        { code: `${y} Flex`,      name: `${y} Flex`      },
        { code: `${y} Gasolina`,  name: `${y} Gasolina`  },
        { code: `${y} Diesel`,    name: `${y} Diesel`    },
        { code: `${y} Elétrico`,  name: `${y} Elétrico`  },
        { code: `${y} Híbrido`,   name: `${y} Híbrido`   },
      )
    }
  }
  return years
}

// ── FIPE helpers ──────────────────────────────────────────────────────────────

function isValidFipeYear(yearName: string): boolean {
  const num = parseInt(yearName.split(' ')[0], 10)
  return !isNaN(num) && num >= 1960 && num <= CURRENT_YEAR + 2
}

async function fipeFetch<T>(url: string): Promise<T | null> {
  try {
    const r = await fetch(url, { next: { revalidate: 86400 } })
    if (!r.ok) return null
    return r.json() as Promise<T>
  } catch { return null }
}

type FipeBrand = { codigo: string | number; nome: string }
type FipeModel = { codigo: string | number; nome: string }
type FipeYear  = { codigo: string | number; nome: string }

// ── Route ─────────────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  const type      = request.nextUrl.searchParams.get('type')
  const brandCode = request.nextUrl.searchParams.get('brandCode')
  const modelCode = request.nextUrl.searchParams.get('modelCode')
  const brandName = request.nextUrl.searchParams.get('brandName')

  if (!type || (type !== 'carro' && type !== 'moto')) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  }

  const ft = type === 'carro' ? 'carros' : 'motos'

  try {
    // ── Anos ───────────────────────────────────────────────────────────────
    if (brandCode && modelCode) {

      // Mixed case: FIPE brandCode + Prisma modelCode (model name may differ slightly from FIPE)
      if (isFipeCode(brandCode) && !isFipeCode(modelCode)) {
        const model = await prisma.vehicleModel.findUnique({ where: { id: modelCode } })
        if (model) {
          // Try to find this model in FIPE by name — the Prisma name may differ slightly
          const modelsData = await fipeFetch<{ modelos: FipeModel[] }>(
            `${FIPE_BASE}/${ft}/marcas/${brandCode}/modelos`,
          )
          const mn = model.name.toLowerCase()
          const mnSorted = mn.split(/\s+/).sort().join(' ')
          const matching = (modelsData?.modelos ?? []).filter(m => {
            const fn = m.nome.toLowerCase()
            if (fn === mn) return true
            if (fn.startsWith(mn + ' ') || fn.startsWith(mn + '/') || fn.startsWith(mn + '-')) return true
            if (fn.endsWith(' ' + mn)) return true
            if (mn.startsWith(fn + ' ') || mn.startsWith(fn + '/') || mn.startsWith(fn + '-')) return true
            if (mn.endsWith(' ' + fn)) return true
            // Same words, different order (e.g. Prisma "SHADOW VT 600 C" vs FIPE "VT 600 C SHADOW")
            const fnSorted = fn.split(/\s+/).sort().join(' ')
            return fnSorted === mnSorted
          })
          if (matching.length > 0) {
            const yearSets = await Promise.all(
              matching.slice(0, 3).map(async (m) => {
                const yrs = await fipeFetch<FipeYear[]>(
                  `${FIPE_BASE}/${ft}/marcas/${brandCode}/modelos/${m.codigo}/anos`,
                )
                return (yrs ?? []).filter(y => isValidFipeYear(y.nome)).map(y => ({ code: String(y.codigo), name: y.nome, fipeModelCode: String(m.codigo) }))
              }),
            )
            const seen   = new Set<string>()
            const result = yearSets.flat().filter(y => seen.has(y.code) ? false : (seen.add(y.code), true))
            result.sort((a, b) => b.name.localeCompare(a.name))
            if (result.length > 0) {
              return NextResponse.json({ years: result, fipeBrandCode: brandCode })
            }
          }

          // Truly not in FIPE — fall back to tip-based years
          const tipYears = await prisma.tip.findMany({
            where: { modelName: model.name, yearFrom: { not: null } },
            select: { yearFrom: true, yearTo: true },
          })
          if (tipYears.length > 0) {
            const minYear = Math.min(...tipYears.map(t => t.yearFrom!))
            const maxYear = Math.max(...tipYears.map(t => t.yearTo ?? new Date().getFullYear()))
            const years = []
            for (let y = maxYear; y >= minYear; y--) {
              years.push({ code: `${y} Gasolina`, name: `${y} Gasolina` })
            }
            return NextResponse.json({ years })
          }
        }
        return NextResponse.json({ years: buildYears(type) })
      }

      // Path A: both FIPE codes → direct lookup
      if (isFipeCode(brandCode) && isFipeCode(modelCode)) {
        const yrs = await fipeFetch<FipeYear[]>(
          `${FIPE_BASE}/${ft}/marcas/${brandCode}/modelos/${modelCode}/anos`,
        )
        if (yrs?.length) {
          return NextResponse.json({
            years:         yrs.filter(y => isValidFipeYear(y.nome)).map(y => ({ code: String(y.codigo), name: y.nome, fipeModelCode: modelCode })),
            fipeBrandCode: brandCode,
          })
        }
        // FIPE indisponível ou sem dados — não mostrar lista genérica de anos
        return NextResponse.json({ years: [], fipeUnavailable: true })
      }

      // Path B: both Prisma IDs → name-based FIPE lookup
      const [brand, model] = await Promise.all([
        prisma.brand.findUnique({ where: { id: brandCode } }),
        prisma.vehicleModel.findUnique({ where: { id: modelCode } }),
      ])
      if (brand && model) {
        // Find FIPE brand code by name
        const allBrands = await fipeFetch<FipeBrand[]>(`${FIPE_BASE}/${ft}/marcas`)
        const fipeBrand = allBrands?.find(b =>
          b.nome.toLowerCase() === brand.name.toLowerCase() ||
          b.nome.toLowerCase().includes(brand.name.toLowerCase()) ||
          brand.name.toLowerCase().includes(b.nome.toLowerCase()),
        )
        if (fipeBrand) {
          const modelsData = await fipeFetch<{ modelos: FipeModel[] }>(
            `${FIPE_BASE}/${ft}/marcas/${fipeBrand.codigo}/modelos`,
          )
          const mn = model.name.toLowerCase()
          const matching = (modelsData?.modelos ?? []).filter(m => {
            const fn = m.nome.toLowerCase()
            return fn === mn || fn.startsWith(mn + ' ') || fn.startsWith(mn + '/') || fn.startsWith(mn + '-')
          })
          if (matching.length > 0) {
            const yearSets = await Promise.all(
              matching.slice(0, 3).map(async (m) => {
                const yrs = await fipeFetch<FipeYear[]>(
                  `${FIPE_BASE}/${ft}/marcas/${fipeBrand.codigo}/modelos/${m.codigo}/anos`,
                )
                return (yrs ?? []).filter(y => isValidFipeYear(y.nome)).map(y => ({ code: String(y.codigo), name: y.nome, fipeModelCode: String(m.codigo) }))
              }),
            )
            const seen   = new Set<string>()
            const result = yearSets.flat().filter(y => seen.has(y.code) ? false : (seen.add(y.code), true))
            result.sort((a, b) => b.name.localeCompare(a.name))
            if (result.length > 0) {
              return NextResponse.json({ years: result, fipeBrandCode: String(fipeBrand.codigo) })
            }
          }
        }
      }

      // Prisma-only model (not in FIPE): build year list from tip year ranges
      if (brand && model) {
        const tipYears = await prisma.tip.findMany({
          where: { modelName: model.name, yearFrom: { not: null } },
          select: { yearFrom: true, yearTo: true },
        })
        if (tipYears.length > 0) {
          const minYear = Math.min(...tipYears.map(t => t.yearFrom!))
          const maxYear = Math.max(...tipYears.map(t => t.yearTo ?? new Date().getFullYear()))
          const years = []
          for (let y = maxYear; y >= minYear; y--) {
            years.push({ code: `${y} Gasolina`, name: `${y} Gasolina` })
          }
          return NextResponse.json({ years })
        }
      }

      return NextResponse.json({ years: buildYears(type) })
    }

    // ── Modelos ─────────────────────────────────────────────────────────────
    if (brandCode) {

      // FIPE brand code → get FIPE models, then merge with Prisma-only models
      if (isFipeCode(brandCode)) {
        const data = await fipeFetch<{ modelos: FipeModel[] }>(
          `${FIPE_BASE}/${ft}/marcas/${brandCode}/modelos`,
        )
        const fipeModels = (data?.modelos ?? []).map(m => ({ id: String(m.codigo), name: m.nome }))

        // Merge Prisma-only models (e.g. classic models not in FIPE)
        if (brandName) {
          const vehicleType = await prisma.vehicleType.findFirst({ where: { slug: type } })
          if (vehicleType) {
            const prismaBrand = await prisma.brand.findFirst({
              where: { name: { equals: brandName, mode: 'insensitive' }, vehicleTypeId: vehicleType.id },
            })
            if (prismaBrand) {
              const prismaModels = await prisma.vehicleModel.findMany({
                where: { brandId: prismaBrand.id },
                orderBy: { name: 'asc' },
              })
              const fipeNamesLower = new Set(fipeModels.map(m => m.name.toLowerCase()))
              // Além da igualdade exata, exclui também Prisma models cujo nome
              // aparece como substring/word-boundary dentro de algum nome FIPE
              // (mesmo padrão de apps/web/app/api/tips/route.ts::matchesStoredName)
              // — evita duplicar no seletor um modelo "auxiliar" (ex: "CROSSER",
              // "LANDER") que na verdade já é coberto por um nome FIPE real
              // (ex: "XTZ 150  CROSSER E/FLEX"), o que gerava uma opção extra no
              // dropdown sem código FIPE e sem preço/dados encontrados.
              const exclusivePrisma = prismaModels
                .filter(m => {
                  if (fipeNamesLower.has(m.name.toLowerCase())) return false
                  const esc = m.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
                  const re = new RegExp(`\\b${esc}\\b`, 'i')
                  return !fipeModels.some(fm => re.test(fm.name))
                })
                .map(m => ({ id: m.id, name: m.name }))
              if (exclusivePrisma.length > 0) {
                return NextResponse.json({ models: [...fipeModels, ...exclusivePrisma] })
              }
            }
          }
        }

        return NextResponse.json({ models: fipeModels })
      }

      // Prisma brand ID
      const models = await prisma.vehicleModel.findMany({
        where:   { brandId: brandCode },
        orderBy: { name: 'asc' },
      })
      return NextResponse.json({ models: models.map(m => ({ id: m.id, name: m.name })) })
    }

    // ── Marcas ──────────────────────────────────────────────────────────────
    const brands = await fipeFetch<FipeBrand[]>(`${FIPE_BASE}/${ft}/marcas`)
    if (brands?.length) {
      return NextResponse.json({ brands: brands.map(b => ({ code: String(b.codigo), name: b.nome })) })
    }

    // Prisma fallback
    const vehicleType = await prisma.vehicleType.findFirst({ where: { slug: type } })
    if (!vehicleType) return NextResponse.json({ brands: [] })
    const dbBrands = await prisma.brand.findMany({
      where:   { vehicleTypeId: vehicleType.id },
      orderBy: { name: 'asc' },
    })
    return NextResponse.json({ brands: dbBrands.map(b => ({ code: b.id, name: b.name })) })

  } catch {
    return NextResponse.json({ brands: [], models: [], years: [] }, { status: 502 })
  }
}
