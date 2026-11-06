'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'

// ── IPVA rates by state (2024, approximate) ────────────────────────────────────
const IPVA: Record<string, { car: number; moto: number }> = {
  AC: { car: 2.0, moto: 2.0 }, AL: { car: 2.5, moto: 1.5 }, AM: { car: 3.0, moto: 2.0 },
  AP: { car: 2.0, moto: 1.5 }, BA: { car: 3.5, moto: 2.0 }, CE: { car: 3.0, moto: 1.5 },
  DF: { car: 3.5, moto: 2.5 }, ES: { car: 2.0, moto: 1.0 }, GO: { car: 3.5, moto: 2.0 },
  MA: { car: 2.5, moto: 1.5 }, MG: { car: 4.0, moto: 2.0 }, MS: { car: 2.5, moto: 1.5 },
  MT: { car: 3.0, moto: 1.5 }, PA: { car: 2.5, moto: 1.5 }, PB: { car: 3.0, moto: 2.0 },
  PE: { car: 3.0, moto: 1.5 }, PI: { car: 2.5, moto: 1.5 }, PR: { car: 3.5, moto: 2.0 },
  RJ: { car: 4.0, moto: 2.0 }, RN: { car: 3.0, moto: 2.0 }, RO: { car: 2.0, moto: 1.5 },
  RR: { car: 2.0, moto: 2.0 }, RS: { car: 3.0, moto: 1.5 }, SC: { car: 2.0, moto: 1.0 },
  SE: { car: 2.5, moto: 1.5 }, SP: { car: 4.0, moto: 2.0 }, TO: { car: 2.5, moto: 1.5 },
}
const UFS = Object.keys(IPVA).sort()

// ── Fuel label helpers ─────────────────────────────────────────────────────────
function detectFuel(yearName: string): 'FLEX' | 'GASOLINA' | 'DIESEL' | 'ELETRICO' | 'HIBRIDO' {
  const n = yearName.toUpperCase()
  if (n.includes('DIESEL'))  return 'DIESEL'
  if (n.includes('ELÉTRIC') || n.includes('ELETRIC')) return 'ELETRICO'
  if (n.includes('HÍBRID')  || n.includes('HIBRID'))  return 'HIBRIDO'
  if (n.includes('GASOLINA')) return 'GASOLINA'
  return 'FLEX'
}
function parseYear(yearName: string) { return parseInt(yearName.slice(0, 4)) || new Date().getFullYear() }

// ── Cost calculation ───────────────────────────────────────────────────────────
interface CostInput {
  fipeValue:   number
  vType:       string
  state:       string
  yearNumber:  number
  kmMonth:     number
  kmLiter:     number
  fuelPrice:   number
  fuelType:    string
  useFlex:     'gas' | 'etanol'
}
interface CostResult {
  ipva:          number
  licenciamento: number
  seguro:        number
  combustivel:   number
  manutencao:    number
  depreciacao:   number
  total:         number
}

function calcCosts(i: CostInput): CostResult {
  const ipvaRate    = (IPVA[i.state]?.[i.vType === 'moto' ? 'moto' : 'car'] ?? 3.0) / 100
  const ipva        = (i.fipeValue * ipvaRate) / 12
  const licencia    = 160 / 12
  const insRate     = i.fipeValue < 30000 ? 0.040 : i.fipeValue < 60000 ? 0.050 : i.fipeValue < 100000 ? 0.060 : 0.075
  const seguro      = (i.fipeValue * insRate) / 12
  const liters      = i.kmLiter > 0 ? i.kmMonth / i.kmLiter : 0
  const combustivel = liters * i.fuelPrice
  const age         = new Date().getFullYear() - i.yearNumber
  const manutencao  = i.vType === 'moto' ? (age < 5 ? 90 : 140) : (age < 5 ? 180 : age < 10 ? 260 : 380)
  const deprRate    = (age < 3 ? 0.13 : age < 7 ? 0.09 : age < 12 ? 0.06 : 0.04) / 12
  const depreciacao = i.fipeValue * deprRate
  const total       = ipva + licencia + seguro + combustivel + manutencao + depreciacao
  return { ipva, licenciamento: licencia, seguro, combustivel, manutencao, depreciacao, total }
}

function fmtBRL(v: number) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }) }
function fmtPct(v: number) { return v.toFixed(1) + '%' }

// ── Reusable select wrapper ────────────────────────────────────────────────────
const FS = { background: '#222228', border: '1px solid #3a3a42', color: '#f0ede8', fontFamily: 'var(--font-barlow)' }
const LB = { color: '#666', fontFamily: 'var(--font-barlow-condensed)' }

interface BrandOption { code: string; name: string }
interface ModelOption { id: string;   name: string }
interface YearOption  { code: string; name: string }

// ── Page ───────────────────────────────────────────────────────────────────────
export default function CustosPage() {
  const router = useRouter()

  // Vehicle selection
  const [vType,         setVType]         = useState<'carro'|'moto'>('carro')
  const [brands,        setBrands]        = useState<BrandOption[]>([])
  const [selBrand,      setSelBrand]      = useState<BrandOption | null>(null)
  const [models,        setModels]        = useState<ModelOption[]>([])
  const [selModel,      setSelModel]      = useState<ModelOption | null>(null)
  const [years,         setYears]         = useState<YearOption[]>([])
  const [selYear,       setSelYear]       = useState<YearOption | null>(null)
  const [loadingB,      setLoadingB]      = useState(false)
  const [loadingM,      setLoadingM]      = useState(false)
  const [loadingY,      setLoadingY]      = useState(false)

  // FIPE price
  const [fipeValue,     setFipeValue]     = useState<number | null>(null)
  const [fipeMonth,     setFipeMonth]     = useState('')
  const [loadingFipe,   setLoadingFipe]   = useState(false)
  const [manualFipe,    setManualFipe]    = useState('')
  const [fipeFailed,    setFipeFailed]    = useState(false)

  // Inputs
  const [state,         setState]         = useState('SP')
  const [kmMonth,       setKmMonth]       = useState(1500)
  const [kmLiter,       setKmLiter]       = useState(12)
  const [fuelPrice,     setFuelPrice]     = useState(6.09)
  const [useFlex,       setUseFlex]       = useState<'gas'|'etanol'>('gas')

  // ── Cascading fetches ──────────────────────────────────────────────────────
  useEffect(() => {
    setBrands([]); setSelBrand(null); setModels([]); setSelModel(null); setYears([]); setSelYear(null); setFipeValue(null)
    setLoadingB(true)
    fetch(`/api/vehicles?type=${vType}`).then(r => r.json()).then(d => { setBrands(d.brands ?? []); setLoadingB(false) })
  }, [vType])

  useEffect(() => {
    if (!selBrand) { setModels([]); setSelModel(null); setYears([]); setSelYear(null); setFipeValue(null); return }
    setLoadingM(true)
    fetch(`/api/vehicles?type=${vType}&brandCode=${selBrand.code}`).then(r => r.json()).then(d => { setModels(d.models ?? []); setSelModel(null); setYears([]); setSelYear(null); setFipeValue(null); setLoadingM(false) })
  }, [selBrand, vType])

  useEffect(() => {
    if (!selModel || !selBrand) { setYears([]); setSelYear(null); setFipeValue(null); return }
    setLoadingY(true)
    fetch(`/api/vehicles?type=${vType}&brandCode=${selBrand.code}&modelCode=${selModel.id}`).then(r => r.json()).then(d => { setYears(d.years ?? []); setSelYear(null); setFipeValue(null); setLoadingY(false) })
  }, [selModel, selBrand, vType])

  useEffect(() => {
    if (!selYear || !selBrand || !selModel) { setFipeValue(null); setFipeFailed(false); setManualFipe(''); return }
    setLoadingFipe(true); setFipeFailed(false); setFipeValue(null)
    fetch(`/api/fipe/price?type=${vType}&brandCode=${selBrand.code}&modelCode=${selModel.id}&yearCode=${encodeURIComponent(selYear.code)}`)
      .then(r => r.json())
      .then(d => {
        if (!d.error) { setFipeValue(d.currentFipe); setFipeMonth(d.referenceMonth ?? ''); setFipeFailed(false) }
        else { setFipeFailed(true) }
        setLoadingFipe(false)
      })
      .catch(() => { setFipeFailed(true); setLoadingFipe(false) })
  }, [selYear, selBrand, selModel, vType])

  // ── Derived ────────────────────────────────────────────────────────────────
  const effectiveFipeValue = fipeValue ?? (fipeFailed && manualFipe ? parseFloat(manualFipe.replace(/\D/g, '')) || null : null)
  const fuel       = selYear ? detectFuel(selYear.name) : 'FLEX'
  const yearNumber = selYear ? parseYear(selYear.name) : new Date().getFullYear()
  const effectivePrice = fuel === 'FLEX' && useFlex === 'etanol' ? fuelPrice * 0.7 : fuelPrice

  const costs: CostResult | null = effectiveFipeValue ? calcCosts({
    fipeValue: effectiveFipeValue, vType, state, yearNumber, kmMonth, kmLiter,
    fuelPrice: effectivePrice, fuelType: fuel, useFlex,
  }) : null

  const pct = (v: number) => costs ? fmtPct((v / costs.total) * 100) : ''

  const items = costs ? [
    { label: 'IPVA',            tip: `${IPVA[state]?.[vType === 'moto' ? 'moto' : 'car'] ?? 3}% a.a. sobre FIPE · ${state}`, value: costs.ipva,          color: '#ef4444', icon: '🏛️' },
    { label: 'Seguro (est.)',   tip: 'Estimativa com base no valor FIPE. Cotação real pode variar.',                            value: costs.seguro,        color: '#f59e0b', icon: '🛡️' },
    { label: 'Combustível',     tip: `${kmMonth.toLocaleString()} km ÷ ${kmLiter} km/l × R$${fuelPrice.toFixed(2)}/L`,         value: costs.combustivel,   color: '#3b82f6', icon: '⛽' },
    { label: 'Manutenção',      tip: 'Revisões, peças e imprevistos. Estimado por idade e tipo.',                               value: costs.manutencao,    color: '#22c55e', icon: '🔧' },
    { label: 'Licenciamento',   tip: 'Licenciamento + DPVAT estimados (varia por estado e ano).',                               value: costs.licenciamento, color: '#8b5cf6', icon: '📋' },
    { label: 'Depreciação',     tip: 'Perda de valor mensal estimada (não é saída de caixa, mas é custo real).',                value: costs.depreciacao,   color: '#64748b', icon: '📉' },
  ] : []

  const selCls = 'w-full px-4 py-[13px] rounded-xl text-[14px] outline-none appearance-none cursor-pointer disabled:cursor-not-allowed transition-colors'
  const numCls = 'w-full px-4 py-[13px] rounded-xl text-[14px] outline-none transition-colors'

  return (
    <div className="min-h-screen" style={{ background: '#1c1c22' }}>
      <Header />

      <div className="max-w-[980px] mx-auto px-4 py-10">
        {/* Page title */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="text-[12px] font-bold tracking-[3px] uppercase mb-1" style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
              Ferramenta
            </p>
            <h1 className="text-[42px] leading-none mb-2" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
              Custo Real de Propriedade
            </h1>
            <p className="text-[14px] max-w-xl" style={{ color: '#666' }}>
              Descubra o custo mensal real de ter um veículo — além da prestação, o que realmente sai do bolso todo mês.
            </p>
          </div>
          <button onClick={() => router.push('/home')} className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-[16px] transition-all hover:bg-white/5" style={{ border: '1px solid #3a3a42', color: '#555' }} title="Fechar">✕</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
          {/* ── LEFT: Selector + Inputs ────────────────────────────────────── */}
          <div className="flex flex-col gap-5">

            {/* Vehicle selector card */}
            <div className="rounded-2xl p-6" style={{ background: '#28282e', border: '1px solid #3a3a42' }}>
              <p className="text-[13px] font-bold tracking-[2px] uppercase mb-4" style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
                1. Selecione o veículo
              </p>

              {/* Tipo */}
              <div className="flex gap-2 mb-4">
                {(['carro','moto'] as const).map((v) => (
                  <button key={v} onClick={() => setVType(v)}
                    className="flex-1 py-2.5 rounded-xl text-[13px] font-bold transition-colors flex items-center gap-1.5 justify-center"
                    style={{ background: vType === v ? '#ff6600' : '#222228', color: vType === v ? '#111' : '#666', border: `1px solid ${vType === v ? '#ff6600' : '#3a3a42'}`, fontFamily: 'var(--font-barlow-condensed)' }}>
                    {v === 'carro'
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5a2 2 0 0 1-2 2h-2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
                      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h-5l-3 7"/><path d="m9 6 2 7h7"/><path d="M12 6V3"/></svg>
                    }
                    {v === 'carro' ? 'Carro' : 'Moto'}
                  </button>
                ))}
              </div>

              {/* Marca */}
              <div className="mb-3">
                <p className="text-[11px] font-bold tracking-[1.5px] uppercase mb-2" style={LB}>Marca</p>
                <div className="relative">
                  <select className={selCls} style={{ ...FS, opacity: loadingB ? 0.5 : 1 }} value={selBrand?.code ?? ''} disabled={!brands.length || loadingB}
                    onChange={e => setSelBrand(brands.find(b => b.code === e.target.value) ?? null)}>
                    <option value="">{loadingB ? 'Carregando...' : !brands.length ? 'Aguardando tipo...' : 'Selecione a marca'}</option>
                    {brands.map(b => <option key={b.code} value={b.code}>{b.name}</option>)}
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[12px]" style={{ color: '#444' }}>▾</span>
                </div>
              </div>

              {/* Modelo */}
              <div className="mb-3">
                <p className="text-[11px] font-bold tracking-[1.5px] uppercase mb-2" style={LB}>Modelo</p>
                <div className="relative">
                  <select className={selCls} style={{ ...FS, opacity: !selBrand || loadingM ? 0.5 : 1 }} value={selModel?.id ?? ''} disabled={!selBrand || !models.length || loadingM}
                    onChange={e => setSelModel(models.find(m => m.id === e.target.value) ?? null)}>
                    <option value="">{loadingM ? 'Carregando...' : !selBrand ? 'Selecione a marca' : !models.length ? 'Nenhum modelo' : 'Selecione o modelo'}</option>
                    {models.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[12px]" style={{ color: '#444' }}>▾</span>
                </div>
              </div>

              {/* Ano */}
              <div>
                <p className="text-[11px] font-bold tracking-[1.5px] uppercase mb-2" style={LB}>Ano / Combustível</p>
                <div className="relative">
                  <select className={selCls} style={{ ...FS, opacity: !selModel || loadingY ? 0.5 : 1 }} value={selYear?.code ?? ''} disabled={!selModel || !years.length || loadingY}
                    onChange={e => setSelYear(years.find(y => y.code === e.target.value) ?? null)}>
                    <option value="">{loadingY ? 'Carregando...' : !selModel ? 'Selecione o modelo' : !years.length ? 'Nenhum ano' : 'Selecione o ano'}</option>
                    {years.map(y => <option key={y.code} value={y.code}>{y.name}</option>)}
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[12px]" style={{ color: '#444' }}>▾</span>
                </div>
              </div>

              {/* FIPE price feedback */}
              {loadingFipe && (
                <div className="mt-3 flex items-center gap-2 text-[12px]" style={{ color: '#555' }}>
                  <div className="w-3 h-3 rounded-full border-2 shrink-0" style={{ borderColor: '#3a3a42', borderTopColor: '#ff6600', animation: 'spin 0.8s linear infinite' }} />
                  Buscando valor FIPE...
                </div>
              )}
              {fipeValue && !loadingFipe && (
                <div className="mt-3 flex items-center gap-3 rounded-xl px-4 py-2.5" style={{ background: 'rgba(255,102,0,0.08)', border: '1px solid rgba(255,102,0,0.2)' }}>
                  <span className="text-[18px]">📊</span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[1px]" style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>Tabela FIPE · {fipeMonth}</p>
                    <p className="text-[18px] font-black" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>{fmtBRL(fipeValue)}</p>
                  </div>
                </div>
              )}
              {fipeFailed && !loadingFipe && !fipeValue && (
                <div className="mt-3 rounded-xl px-4 py-3" style={{ background: 'rgba(255,102,0,0.05)', border: '1px solid rgba(255,102,0,0.2)' }}>
                  <p className="text-[11px] font-bold uppercase tracking-[1px] mb-2" style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>Valor do veículo (R$)</p>
                  <input
                    type="number" min={0} step={1000}
                    placeholder="Ex: 85000"
                    value={manualFipe}
                    onChange={e => setManualFipe(e.target.value)}
                    className="w-full rounded-lg px-3 py-2 text-[14px] font-bold outline-none"
                    style={{ background: '#222228', border: '1px solid #3a3a42', color: '#f0ede8' }}
                  />
                  <p className="text-[10px] mt-1.5" style={{ color: '#555' }}>Consulte a tabela FIPE e informe o valor do seu modelo para calcular os custos.</p>
                </div>
              )}
            </div>

            {/* Inputs card */}
            <div className="rounded-2xl p-6" style={{ background: '#28282e', border: '1px solid #3a3a42' }}>
              <p className="text-[13px] font-bold tracking-[2px] uppercase mb-4" style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
                2. Seus dados de uso
              </p>

              <div className="grid grid-cols-2 gap-4">
                {/* Estado */}
                <div>
                  <p className="text-[11px] font-bold tracking-[1.5px] uppercase mb-2" style={LB}>Estado (IPVA)</p>
                  <div className="relative">
                    <select className={selCls} style={FS} value={state} onChange={e => setState(e.target.value)}>
                      {UFS.map(uf => <option key={uf} value={uf}>{uf} — {IPVA[uf]?.car ?? 0}% carros</option>)}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[12px]" style={{ color: '#444' }}>▾</span>
                  </div>
                </div>

                {/* KM/mês */}
                <div>
                  <p className="text-[11px] font-bold tracking-[1.5px] uppercase mb-2" style={LB}>KM por mês</p>
                  <input type="number" className={numCls} style={FS} value={kmMonth} min={0} onChange={e => setKmMonth(Number(e.target.value))} />
                </div>

                {/* Consumo */}
                <div>
                  <p className="text-[11px] font-bold tracking-[1.5px] uppercase mb-2" style={LB}>Consumo (km/L)</p>
                  <input type="number" className={numCls} style={FS} value={kmLiter} min={1} step={0.5} onChange={e => setKmLiter(Number(e.target.value))} />
                </div>

                {/* Combustível */}
                <div>
                  <p className="text-[11px] font-bold tracking-[1.5px] uppercase mb-2" style={LB}>
                    Preço/L {fuel === 'FLEX' ? `(${useFlex === 'gas' ? 'Gasolina' : 'Etanol'})` : fuel === 'DIESEL' ? '(Diesel)' : ''}
                  </p>
                  <input type="number" className={numCls} style={FS} value={fuelPrice} min={0} step={0.01} onChange={e => setFuelPrice(Number(e.target.value))} />
                </div>
              </div>

              {/* Flex toggle */}
              {fuel === 'FLEX' && (
                <div className="mt-3 flex rounded-lg p-1 self-start" style={{ background: '#222228', border: '1px solid #3a3a42' }}>
                  {(['gas','etanol'] as const).map(f => (
                    <button key={f} onClick={() => setUseFlex(f)}
                      className="px-4 py-1.5 text-[12px] font-bold uppercase tracking-[1px] rounded-md transition-colors"
                      style={{ background: useFlex === f ? '#ff6600' : 'transparent', color: useFlex === f ? '#111' : '#666' }}>
                      {f === 'gas' ? 'Gasolina' : 'Etanol'}
                    </button>
                  ))}
                  {useFlex === 'etanol' && (
                    <span className="self-center ml-2 text-[11px]" style={{ color: '#666' }}>
                      ≈ R${(fuelPrice * 0.7).toFixed(2)}/L
                    </span>
                  )}
                </div>
              )}

              <p className="mt-4 text-[11px] flex items-start gap-1.5" style={{ color: '#444' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>
                Para veículos Flex, use gasolina se a eficiência do etanol for abaixo de 70% da gasolina.
              </p>
            </div>
          </div>

          {/* ── RIGHT: Results ─────────────────────────────────────────────── */}
          <div className="lg:sticky lg:top-6">
            {!effectiveFipeValue ? (
              <div className="rounded-2xl p-8 flex flex-col items-center gap-4 text-center" style={{ background: '#28282e', border: '1px solid #3a3a42' }}>
                <div style={{ color: '#ff6600' }}>
                  <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                    <line x1="3" y1="20" x2="21" y2="20"/>
                  </svg>
                </div>
                <p className="text-[20px]" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
                  Selecione o veículo
                </p>
                <p className="text-[13px]" style={{ color: '#555' }}>
                  Escolha marca, modelo e ano para ver o custo real de propriedade.
                </p>
              </div>
            ) : costs ? (
              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #3a3a42' }}>
                {/* Total header */}
                <div className="px-6 py-5 text-center" style={{ background: 'linear-gradient(135deg, #1a0a00, #28282e)' }}>
                  <p className="text-[11px] font-bold tracking-[2px] uppercase mb-1" style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
                    Custo Mensal Estimado
                  </p>
                  <p className="text-[52px] leading-none font-black" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
                    {fmtBRL(costs.total)}
                  </p>
                  <p className="text-[13px] mt-1" style={{ color: '#888' }}>
                    {fmtBRL(costs.total * 12)} <span style={{ color: '#555' }}>/ ano</span>
                  </p>
                </div>

                {/* Vehicle label */}
                <div className="px-6 py-3 flex items-center gap-2" style={{ background: '#222228', borderBottom: '1px solid #2a2a32' }}>
                  <span className="shrink-0">{vType === 'moto'
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h-5l-3 7"/><path d="m9 6 2 7h7"/><path d="M12 6V3"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5a2 2 0 0 1-2 2h-2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
                  }</span>
                  <p className="text-[13px] font-semibold truncate" style={{ color: '#aaa' }}>
                    {selBrand?.name} {selModel?.name} · {yearNumber} · {effectiveFipeValue ? fmtBRL(effectiveFipeValue) : '—'}
                  </p>
                </div>

                {/* Cost breakdown */}
                <div className="flex flex-col" style={{ background: '#28282e' }}>
                  {items.map((item, idx) => (
                    <div key={item.label} className="group relative" title={item.tip}
                      style={{ borderBottom: idx < items.length - 1 ? '1px solid #30303a' : 'none' }}>
                      <div className="flex items-center gap-3 px-6 py-3.5">
                        <span className="text-[16px] shrink-0">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-bold uppercase tracking-[0.5px]" style={{ color: '#888', fontFamily: 'var(--font-barlow-condensed)' }}>{item.label}</p>
                          {/* Progress bar */}
                          <div className="mt-1 h-1 rounded-full overflow-hidden" style={{ background: '#2a2a32' }}>
                            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(item.value / costs.total) * 100}%`, background: item.color }} />
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[15px] font-bold" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>{fmtBRL(item.value)}</p>
                          <p className="text-[10px]" style={{ color: '#444' }}>{pct(item.value)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer note */}
                <div className="px-6 py-4" style={{ background: '#222228', borderTop: '1px solid #2a2a32' }}>
                  <p className="text-[11px] leading-relaxed" style={{ color: '#444' }}>
                    * Valores estimados com base em médias de mercado. IPVA, seguro, consumo e manutenção variam conforme perfil do motorista, cidade e ano do veículo. A depreciação é custo real, mas não saída de caixa imediata.
                  </p>
                </div>
              </div>
            ) : null}

            {/* Cost awareness card */}
            {costs && (
              <div className="mt-4 rounded-2xl p-5 flex flex-col gap-3" style={{ background: '#28282e', border: '1px solid #3a3a42' }}>
                <p className="text-[13px] font-bold uppercase tracking-[1px] flex items-center gap-1.5" style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>
                  Resumo financeiro
                </p>
                {[
                  { label: 'Custo por km rodado',   value: kmMonth > 0 ? `R$ ${(costs.total / kmMonth).toFixed(2)}/km` : '—' },
                  { label: 'Custo anual total',      value: fmtBRL(costs.total * 12) },
                  { label: 'Custo em 5 anos (est.)', value: fmtBRL(costs.total * 60) },
                  { label: 'Renda mín. recomendada', value: `${fmtBRL(costs.total * 3)}/mês` },
                ].map(s => (
                  <div key={s.label} className="flex justify-between items-center">
                    <p className="text-[12px]" style={{ color: '#666' }}>{s.label}</p>
                    <p className="text-[13px] font-bold" style={{ color: '#f0ede8' }}>{s.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
