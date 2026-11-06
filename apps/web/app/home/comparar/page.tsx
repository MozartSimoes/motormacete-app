'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'

interface BrandOption { code: string; name: string }
interface ModelOption { id: string;   name: string }
interface YearOption  { code: string; name: string }

interface Side {
  vType:    'carro' | 'moto'
  brands:   BrandOption[]
  selBrand: BrandOption | null
  models:   ModelOption[]
  selModel: ModelOption | null
  years:    YearOption[]
  selYear:  YearOption | null
  fipe:     number | null
  month:    string
  loading:  boolean
}

const EMPTY_SIDE: Side = {
  vType: 'carro', brands: [], selBrand: null, models: [], selModel: null,
  years: [], selYear: null, fipe: null, month: '', loading: false,
}

function detectFuel(yearName: string): 'Flex' | 'Gasolina' | 'Diesel' | 'Elétrico' | 'Híbrido' {
  const n = yearName.toUpperCase()
  if (n.includes('DIESEL')) return 'Diesel'
  if (n.includes('ELÉTRIC') || n.includes('ELETRIC')) return 'Elétrico'
  if (n.includes('HÍBRID') || n.includes('HIBRID')) return 'Híbrido'
  if (n.includes('GASOLINA')) return 'Gasolina'
  return 'Flex'
}
function parseYear(yearName: string) { return parseInt(yearName.slice(0, 4)) || new Date().getFullYear() }
function fmtBRL(v: number) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }) }

const IPVA_SP = { carro: 0.04, moto: 0.02 }

function estimateMonthly(s: Side): number | null {
  if (!s.fipe || !s.selYear) return null
  const age       = new Date().getFullYear() - parseYear(s.selYear.name)
  const isMoto    = s.vType === 'moto'
  const ipva      = (s.fipe * IPVA_SP[isMoto ? 'moto' : 'carro']) / 12
  const insRate   = s.fipe < 30000 ? 0.040 : s.fipe < 60000 ? 0.050 : s.fipe < 100000 ? 0.060 : 0.075
  const seguro    = (s.fipe * insRate) / 12
  const licen     = 160 / 12
  const manut     = isMoto ? (age < 5 ? 90 : 140) : (age < 5 ? 180 : age < 10 ? 260 : 380)
  const deprRate  = (age < 3 ? 0.13 : age < 7 ? 0.09 : age < 12 ? 0.06 : 0.04) / 12
  const depr      = s.fipe * deprRate
  const fuel      = isMoto ? 250 : 480
  return ipva + seguro + licen + manut + depr + fuel
}

// ── Cascade hook ───────────────────────────────────────────────────────────────
function useSide(side: Side, setSide: (fn: (s: Side) => Side) => void) {
  useEffect(() => {
    setSide(s => ({ ...s, brands: [], selBrand: null, models: [], selModel: null, years: [], selYear: null, fipe: null, loading: true }))
    fetch(`/api/vehicles?type=${side.vType}`)
      .then(r => r.json())
      .then(d => setSide(s => ({ ...s, brands: d.brands ?? [], loading: false })))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [side.vType])

  useEffect(() => {
    if (!side.selBrand) { setSide(s => ({ ...s, models: [], selModel: null, years: [], selYear: null, fipe: null })); return }
    setSide(s => ({ ...s, loading: true }))
    fetch(`/api/vehicles?type=${side.vType}&brandCode=${side.selBrand.code}`)
      .then(r => r.json())
      .then(d => setSide(s => ({ ...s, models: d.models ?? [], selModel: null, years: [], selYear: null, fipe: null, loading: false })))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [side.selBrand?.code])

  useEffect(() => {
    if (!side.selModel || !side.selBrand) { setSide(s => ({ ...s, years: [], selYear: null, fipe: null })); return }
    setSide(s => ({ ...s, loading: true }))
    fetch(`/api/vehicles?type=${side.vType}&brandCode=${side.selBrand.code}&modelCode=${side.selModel.id}`)
      .then(r => r.json())
      .then(d => setSide(s => ({ ...s, years: d.years ?? [], selYear: null, fipe: null, loading: false })))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [side.selModel?.id])

  useEffect(() => {
    if (!side.selYear || !side.selBrand || !side.selModel) { setSide(s => ({ ...s, fipe: null })); return }
    setSide(s => ({ ...s, loading: true }))
    fetch(`/api/fipe/price?type=${side.vType}&brandCode=${side.selBrand!.code}&modelCode=${side.selModel!.id}&yearCode=${encodeURIComponent(side.selYear.code)}`)
      .then(r => r.json())
      .then(d => setSide(s => ({ ...s, fipe: d.currentFipe ?? null, month: d.referenceMonth ?? '', loading: false })))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [side.selYear?.code])
}

const SEL = 'w-full px-4 py-[13px] rounded-xl text-[13px] outline-none appearance-none cursor-pointer disabled:cursor-not-allowed'
const FS  = { background: '#222228', border: '1px solid #3a3a42', color: '#f0ede8' }
const LB  = 'text-[10px] font-bold uppercase tracking-[1.5px] mb-1.5 block'

interface SidePanelProps { s: Side; label: string; accent: string; set: (fn: (s: Side) => Side) => void }

function SidePanel({ s, label, accent, set }: SidePanelProps) {
  useSide(s, set)
  const monthly = estimateMonthly(s)
  const age     = s.selYear ? new Date().getFullYear() - parseYear(s.selYear.name) : null

  return (
    <div className="flex flex-col gap-4 rounded-2xl p-6" style={{ background: '#28282e', border: `1px solid ${s.fipe ? accent + '44' : '#3a3a42'}` }}>
      <p className="text-[11px] font-bold uppercase tracking-[2px]"
        style={{ color: accent, fontFamily: 'var(--font-barlow-condensed)' }}>
        {label}
      </p>

      {/* vType toggle */}
      <div className="flex gap-2">
        {(['carro', 'moto'] as const).map(t => (
          <button key={t} onClick={() => set(s => ({ ...EMPTY_SIDE, vType: t }))}
            className="flex-1 py-2 rounded-xl text-[12px] font-bold uppercase tracking-[1px] transition-all"
            style={{
              fontFamily: 'var(--font-barlow-condensed)',
              background: s.vType === t ? accent : '#222228',
              color: s.vType === t ? '#fff' : '#555',
              border: `1px solid ${s.vType === t ? 'transparent' : '#3a3a42'}`,
            }}>
            <span className="flex items-center gap-1.5 justify-center">
              {t === 'carro'
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5a2 2 0 0 1-2 2h-2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
                : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h-5l-3 7"/><path d="m9 6 2 7h7"/><path d="M12 6V3"/></svg>
              }
              {t === 'carro' ? 'Carro' : 'Moto'}
            </span>
          </button>
        ))}
      </div>

      {/* Cascades */}
      {[
        { label: 'Marca', val: s.selBrand?.name ?? '', options: s.brands.map(b => b.name), onChange: (n: string) => set(s => ({ ...s, selBrand: s.brands.find(b => b.name === n) ?? null, models: [], selModel: null, years: [], selYear: null, fipe: null })) },
        { label: 'Modelo', val: s.selModel?.name ?? '', options: s.models.map(m => m.name), onChange: (n: string) => set(s => ({ ...s, selModel: s.models.find(m => m.name === n) ?? null, years: [], selYear: null, fipe: null })), disabled: !s.selBrand },
        { label: 'Ano/Versão', val: s.selYear?.name ?? '', options: s.years.map(y => y.name), onChange: (n: string) => set(s => ({ ...s, selYear: s.years.find(y => y.name === n) ?? null, fipe: null })), disabled: !s.selModel },
      ].map(({ label: lb, val, options, onChange, disabled }) => (
        <div key={lb}>
          <span className={LB} style={{ color: '#555', fontFamily: 'var(--font-barlow-condensed)' }}>{lb}</span>
          <select className={SEL} style={FS} disabled={disabled || s.loading}
            value={val} onChange={e => onChange(e.target.value)}>
            <option value="">— Selecione —</option>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      ))}

      {/* Result card */}
      {s.fipe && (
        <div className="rounded-xl p-4 mt-1" style={{ background: accent + '10', border: `1px solid ${accent}33` }}>
          <p className="text-[10px] font-bold uppercase tracking-[1.5px] mb-1"
            style={{ color: accent, fontFamily: 'var(--font-barlow-condensed)' }}>
            Valor FIPE · {s.month}
          </p>
          <p className="text-[32px] font-black leading-none mb-3"
            style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
            {fmtBRL(s.fipe)}
          </p>
          <div className="flex flex-col gap-1.5">
            {[
              { k: 'Combustível', v: s.selYear ? detectFuel(s.selYear.name) : '—' },
              { k: 'Idade aprox.',  v: age !== null ? `${age} ${age === 1 ? 'ano' : 'anos'}` : '—' },
              { k: 'Custo mensal est.', v: monthly ? fmtBRL(monthly) : '—' },
              { k: 'Custo anual est.', v: monthly ? fmtBRL(monthly * 12) : '—' },
            ].map(({ k, v }) => (
              <div key={k} className="flex justify-between text-[12px]">
                <span style={{ color: '#555' }}>{k}</span>
                <span style={{ color: '#aaa', fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function CompararPage() {
  const router = useRouter()
  const [sideA, setSideA] = useState<Side>({ ...EMPTY_SIDE })
  const [sideB, setSideB] = useState<Side>({ ...EMPTY_SIDE, vType: 'carro' })

  const canCompare = !!(sideA.fipe && sideB.fipe)
  const monthlyA   = estimateMonthly(sideA)
  const monthlyB   = estimateMonthly(sideB)

  const labelA = sideA.selBrand && sideA.selModel ? `${sideA.selBrand.name} ${sideA.selModel.name}` : 'Veículo A'
  const labelB = sideB.selBrand && sideB.selModel ? `${sideB.selBrand.name} ${sideB.selModel.name}` : 'Veículo B'

  return (
    <div className="min-h-screen" style={{ background: '#1c1c22' }}>
      <Header />

      <div className="max-w-[980px] mx-auto px-4 py-10">

        {/* Title */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="text-[12px] font-bold tracking-[3px] uppercase mb-1"
              style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
              Ferramentas
            </p>
            <h1 className="text-[42px] leading-none mb-2"
              style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
              Comparador de Veículos
            </h1>
            <p className="text-[14px] max-w-xl" style={{ color: '#666' }}>
              Compare dois veículos lado a lado: valor FIPE, custo mensal estimado de propriedade e depreciação.
            </p>
          </div>
          <button onClick={() => router.push('/home')}
            className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-[16px] transition-all hover:bg-white/5"
            style={{ border: '1px solid #3a3a42', color: '#555' }} title="Fechar">✕</button>
        </div>

        {/* Two selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <SidePanel s={sideA} label="Veículo A" accent="#ff6600" set={setSideA} />
          <SidePanel s={sideB} label="Veículo B" accent="#3b82f6" set={setSideB} />
        </div>

        {/* Comparison result */}
        {canCompare && monthlyA && monthlyB && (
          <div className="rounded-2xl p-6" style={{ background: '#28282e', border: '1px solid #3a3a42' }}>
            <p className="text-[13px] font-bold uppercase tracking-[2px] mb-6"
              style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
              Comparação
            </p>

            <div className="flex flex-col gap-5">
              {/* FIPE bar */}
              {[
                { label: 'Valor FIPE',           vA: sideA.fipe!, vB: sideB.fipe!,   fmt: fmtBRL },
                { label: 'Custo Mensal Estimado',vA: monthlyA,    vB: monthlyB,       fmt: fmtBRL },
                { label: 'Custo Anual Estimado', vA: monthlyA*12, vB: monthlyB*12,    fmt: fmtBRL },
                { label: 'Custo em 5 Anos',      vA: monthlyA*60, vB: monthlyB*60,    fmt: fmtBRL },
              ].map(({ label, vA, vB, fmt }) => {
                const max  = Math.max(vA, vB)
                const pctA = (vA / max) * 100
                const pctB = (vB / max) * 100
                const cheaperA = vA <= vB
                return (
                  <div key={label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-[1px]"
                        style={{ color: '#555', fontFamily: 'var(--font-barlow-condensed)' }}>
                        {label}
                      </span>
                      {vA !== vB && (
                        <span className="text-[11px] font-bold"
                          style={{ color: '#22c55e', fontFamily: 'var(--font-barlow-condensed)' }}>
                          {cheaperA ? labelA : labelB} mais barato
                          &nbsp;({fmtBRL(Math.abs(vA - vB))})
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] w-[120px] shrink-0 truncate" style={{ color: '#ff6600' }}>{labelA}</span>
                        <div className="flex-1 h-5 rounded-full overflow-hidden" style={{ background: '#222228' }}>
                          <div className="h-full rounded-full transition-all" style={{ width: `${pctA}%`, background: '#ff6600' }} />
                        </div>
                        <span className="text-[12px] font-bold w-[88px] text-right shrink-0" style={{ color: '#f0ede8' }}>{fmt(vA)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] w-[120px] shrink-0 truncate" style={{ color: '#3b82f6' }}>{labelB}</span>
                        <div className="flex-1 h-5 rounded-full overflow-hidden" style={{ background: '#222228' }}>
                          <div className="h-full rounded-full transition-all" style={{ width: `${pctB}%`, background: '#3b82f6' }} />
                        </div>
                        <span className="text-[12px] font-bold w-[88px] text-right shrink-0" style={{ color: '#f0ede8' }}>{fmt(vB)}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Summary */}
            <div className="mt-6 pt-5 rounded-xl px-4 py-3" style={{ background: '#222228', border: '1px solid #2a2a32' }}>
              <p className="text-[11px] font-bold uppercase tracking-[1.5px] mb-2"
                style={{ color: '#555', fontFamily: 'var(--font-barlow-condensed)' }}>
                Resumo
              </p>
              <p className="text-[13px] leading-relaxed" style={{ color: '#888' }}>
                {monthlyA < monthlyB
                  ? `O ${labelA} tem custo mensal ${fmtBRL(monthlyB - monthlyA)} menor que o ${labelB}. Em 5 anos, a diferença acumulada é de aproximadamente ${fmtBRL((monthlyB - monthlyA) * 60)}.`
                  : monthlyB < monthlyA
                    ? `O ${labelB} tem custo mensal ${fmtBRL(monthlyA - monthlyB)} menor que o ${labelA}. Em 5 anos, a diferença acumulada é de aproximadamente ${fmtBRL((monthlyA - monthlyB) * 60)}.`
                    : `Os dois veículos têm custos mensais estimados praticamente idênticos.`
                }
              </p>
              <p className="text-[11px] mt-2" style={{ color: '#3a3a42' }}>
                * Estimativas baseadas em IPVA-SP, seguro médio, combustível médio (1.200 km/mês), manutenção por idade e depreciação FIPE. Para análise detalhada, use a Calculadora de Custo de Propriedade.
              </p>
            </div>
          </div>
        )}

        {!canCompare && (
          <div className="text-center py-14" style={{ color: '#3a3a42' }}>
            <div className="flex justify-center mb-4" style={{ color: '#FF6B35', opacity: 0.4 }}>
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="2" x2="12" y2="22"/>
                <path d="M5 22h14"/>
                <path d="M5 7l-4 8h8l-4-8z"/>
                <path d="M19 7l-4 8h8l-4-8z"/>
                <line x1="5" y1="7" x2="12" y2="4"/>
                <line x1="19" y1="7" x2="12" y2="4"/>
              </svg>
            </div>
            <p className="text-[16px]" style={{ color: '#3a3a42' }}>Selecione os dois veículos acima para comparar</p>
          </div>
        )}
      </div>
    </div>
  )
}
