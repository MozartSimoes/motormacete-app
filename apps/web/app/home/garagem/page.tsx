'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'

const FUEL_LABELS: Record<string, string> = {
  FLEX: 'Flex', GASOLINA: 'Gasolina', DIESEL: 'Diesel',
  ELETRICO: 'Elétrico', HIBRIDO: 'Híbrido',
}

const MONTH_NAMES = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']

function getDaysUntilMonth(month: number): number {
  const now = new Date()
  const year = now.getMonth() + 1 >= month ? now.getFullYear() + 1 : now.getFullYear()
  const target = new Date(year, month - 1, 1)
  return Math.ceil((target.getTime() - now.getTime()) / 86400000)
}

interface Vehicle {
  id: string
  nickname: string | null
  vehicleType: string
  brand: string
  model: string
  year: number
  fuelType: string | null
  color: string | null
  plate: string | null
  currentKm: number | null
  ipvaMonth?: number | null
  licensingMonth?: number | null
  _count: { logs: number }
  logs: { date: string; km: number | null }[]
}

interface BrandOption  { code: string; name: string }
interface ModelOption  { id: string;   name: string }
interface YearOption   { code: string; name: string }

const emptyExtra = { color: '', plate: '', currentKm: '', notes: '', nickname: '' }

function detectFuel(yearName: string): string {
  const n = yearName.toUpperCase()
  if (n.includes('FLEX'))    return 'FLEX'
  if (n.includes('DIESEL'))  return 'DIESEL'
  if (n.includes('ELÉTRIC') || n.includes('ELETRIC')) return 'ELETRICO'
  if (n.includes('HÍBRID')  || n.includes('HIBRID'))  return 'HIBRIDO'
  if (n.includes('GASOLINA')) return 'GASOLINA'
  return 'FLEX'
}

function parseYear(yearName: string): number {
  return parseInt(yearName.slice(0, 4)) || new Date().getFullYear()
}

export default function GaragemPage() {
  const router = useRouter()
  const [vehicles,   setVehicles]   = useState<Vehicle[]>([])
  const [loading,    setLoading]    = useState(true)
  const [showModal,    setShowModal]    = useState(false)
  const [saving,       setSaving]       = useState(false)
  const [error,        setError]        = useState('')
  const [authRequired, setAuthRequired] = useState(false)
  const [userPlan, setUserPlan] = useState<string>('FREE')
  const [isAdmin, setIsAdmin] = useState(false)
  const [isTrialing, setIsTrialing] = useState(false)
  const [planLoaded, setPlanLoaded] = useState(false)
  const [generatingPdf, setGeneratingPdf] = useState<string | null>(null)

  // Cascading dropdowns state
  const [vType,          setVType]          = useState<'carro' | 'moto'>('carro')
  const [brands,         setBrands]         = useState<BrandOption[]>([])
  const [selectedBrand,  setSelectedBrand]  = useState<BrandOption | null>(null)
  const [models,         setModels]         = useState<ModelOption[]>([])
  const [selectedModel,  setSelectedModel]  = useState<ModelOption | null>(null)
  const [years,          setYears]          = useState<YearOption[]>([])
  const [selectedYear,   setSelectedYear]   = useState<YearOption | null>(null)
  const [loadingBrands,  setLoadingBrands]  = useState(false)
  const [loadingModels,  setLoadingModels]  = useState(false)
  const [loadingYears,   setLoadingYears]   = useState(false)

  // Extra fields
  const [extra, setExtra] = useState(emptyExtra)

  // ── Load user vehicles ───────────────────────────────────────────────────────
  function loadVehicles() {
    setLoading(true)
    fetch('/api/garage')
      .then((r) => { if (r.status === 401) { setAuthRequired(true); setLoading(false); return null } return r.json() })
      .then((d) => { if (d) { setVehicles(d.vehicles); setAuthRequired(false) } })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadVehicles()
    fetch('/api/auth/me').then(r => r.json()).then(d => { if (d.user) { setUserPlan(d.user.plan ?? 'FREE'); setIsAdmin(d.user.isAdmin ?? false); setIsTrialing(d.user.isTrialing ?? false) } }).catch(() => {}).finally(() => setPlanLoaded(true))
    window.addEventListener('mm:logged-in', loadVehicles)
    return () => window.removeEventListener('mm:logged-in', loadVehicles)
  }, [])

  // ── Cascading: vType → brands ────────────────────────────────────────────────
  useEffect(() => {
    if (!showModal) return
    setBrands([]); setSelectedBrand(null)
    setModels([]); setSelectedModel(null)
    setYears([]); setSelectedYear(null)
    setLoadingBrands(true)
    fetch(`/api/vehicles?type=${vType}`)
      .then((r) => r.json())
      .then((d) => { setBrands(d.brands ?? []); setLoadingBrands(false) })
  }, [vType, showModal])

  // ── Cascading: brand → models ────────────────────────────────────────────────
  useEffect(() => {
    if (!selectedBrand) { setModels([]); setSelectedModel(null); setYears([]); setSelectedYear(null); return }
    setLoadingModels(true)
    fetch(`/api/vehicles?type=${vType}&brandCode=${selectedBrand.code}`)
      .then((r) => r.json())
      .then((d) => { setModels(d.models ?? []); setSelectedModel(null); setYears([]); setSelectedYear(null); setLoadingModels(false) })
  }, [selectedBrand, vType])

  // ── Cascading: model → years ─────────────────────────────────────────────────
  useEffect(() => {
    if (!selectedModel || !selectedBrand) { setYears([]); setSelectedYear(null); return }
    setLoadingYears(true)
    fetch(`/api/vehicles?type=${vType}&brandCode=${selectedBrand.code}&modelCode=${selectedModel.id}`)
      .then((r) => r.json())
      .then((d) => { setYears(d.years ?? []); setSelectedYear(null); setLoadingYears(false) })
  }, [selectedModel, selectedBrand, vType])

  // ── Open / close modal ───────────────────────────────────────────────────────
  function openModal() {
    setVType('carro'); setExtra(emptyExtra); setError('')
    setBrands([]); setSelectedBrand(null); setModels([])
    setSelectedModel(null); setYears([]); setSelectedYear(null)
    setShowModal(true)
  }

  // ── Save vehicle ─────────────────────────────────────────────────────────────
  async function handleSave() {
    if (!selectedBrand || !selectedModel || !selectedYear) {
      setError('Selecione marca, modelo e ano.'); return
    }
    setSaving(true); setError('')
    const year  = parseYear(selectedYear.name)
    const fuel  = detectFuel(selectedYear.name)
    const res = await fetch('/api/garage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nickname:    extra.nickname   || null,
        vehicleType: vType,
        brand:       selectedBrand.name,
        model:       selectedModel.name,
        year,
        fuelType:    fuel,
        color:       extra.color     || null,
        plate:       extra.plate     || null,
        currentKm:   extra.currentKm ? Number(extra.currentKm) : null,
        notes:       extra.notes     || null,
      }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error ?? 'Erro ao salvar.'); setSaving(false); return }
    setVehicles((prev) => [...prev, { ...data.vehicle, _count: { logs: 0 }, logs: [] }])
    setShowModal(false); setSaving(false)
  }

  const isPro = isAdmin || isTrialing || userPlan === "DRIVER_PRO" || userPlan === "MECHANIC_PRO"
  const atFreeLimit = planLoaded && !isPro && vehicles.length >= 1

  async function downloadPdf(vehicleId: string, vehicleName: string) {
    setGeneratingPdf(vehicleId)
    try {
      const res = await fetch(`/api/garage/pdf?vehicleId=${vehicleId}`)
      if (!res.ok) { alert('Erro ao gerar laudo.'); return }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `laudo-${vehicleName.toLowerCase().replace(/\s+/g, '-')}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch { alert('Erro de conexão.') }
    finally { setGeneratingPdf(null) }
  }

  const sel = (f: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setExtra((p) => ({ ...p, [f]: e.target.value }))

  const selectCls = 'w-full px-4 py-3.5 rounded-xl text-[15px] outline-none transition-colors appearance-none cursor-pointer disabled:cursor-not-allowed'
  const inputCls  = 'w-full px-4 py-3.5 rounded-xl text-[15px] outline-none transition-colors'
  const fieldStyle = { background: '#18181b', border: '1px solid #333338', color: '#f0ede8', fontFamily: 'var(--font-barlow)' }
  const labelSt   = { color: '#aaa', fontFamily: 'var(--font-barlow-condensed)' }

  return (
    <div className="min-h-screen" style={{ background: '#1c1c22' }}>
      <Header />

      <div className="max-w-[980px] mx-auto px-4 py-10">
        {/* Page header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-[12px] font-bold tracking-[3px] uppercase mb-1" style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
              Minha Garagem
            </p>
            <h1 className="text-[42px] leading-none" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
              Seus Veículos
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {!authRequired && !atFreeLimit && (
              <button onClick={openModal} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold uppercase tracking-[1.5px] transition-all active:scale-95" style={{ background: '#ff6600', color: '#111', fontFamily: 'var(--font-barlow-condensed)' }}>
                + Adicionar Veículo
              </button>
            )}
            <button onClick={() => router.push('/home')} className="w-9 h-9 rounded-xl flex items-center justify-center text-[16px] transition-all hover:bg-white/5" style={{ border: '1px solid #3a3a42', color: '#555' }} title="Fechar">
              ✕
            </button>
          </div>
        </div>

        {/* Auth required */}
        {authRequired && (
          <div className="flex flex-col items-center gap-5 py-20 text-center max-w-md mx-auto">
            <div>
              <p className="text-[32px] mb-2" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
                Para cadastrar seu veículo, cadastre seus dados básicos
              </p>
              <p className="text-[14px] leading-relaxed" style={{ color: '#666' }}>
                Crie sua conta gratuita em segundos e comece a registrar seus veículos e histórico de manutenção.
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full mt-2">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('mm:open-auth', { detail: { step: 'register', type: 'driver' } }))}
                className="w-full py-3.5 rounded-xl text-[14px] font-bold uppercase tracking-[1.5px] transition-all active:scale-95"
                style={{ background: '#ff6600', color: '#111', fontFamily: 'var(--font-barlow-condensed)' }}
              >
                Criar conta como Motorista
              </button>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('mm:open-auth', { detail: { step: 'register', type: 'mechanic' } }))}
                className="w-full py-3.5 rounded-xl text-[14px] font-bold uppercase tracking-[1.5px] transition-all active:scale-95 border"
                style={{ background: 'transparent', borderColor: 'rgba(255,102,0,0.35)', color: '#ff8533', fontFamily: 'var(--font-barlow-condensed)' }}
              >
                Criar conta como Mecânico
              </button>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('mm:open-auth', { detail: { step: 'login' } }))}
                className="w-full py-3.5 rounded-xl text-[14px] font-bold uppercase tracking-[1.5px] transition-all active:scale-95 border"
                style={{ background: 'transparent', borderColor: 'rgba(255,255,255,0.10)', color: '#888', fontFamily: 'var(--font-barlow-condensed)' }}
              >
                Já tenho conta — Entrar
              </button>
            </div>
          </div>
        )}

        {/* Loading */}
        {!authRequired && loading && (
          <div className="flex items-center gap-3 py-16 justify-center" style={{ color: '#555' }}>
            <div className="w-5 h-5 rounded-full border-2 shrink-0" style={{ borderColor: '#3a3a42', borderTopColor: '#ff6600', animation: 'spin 0.8s linear infinite' }} />
            Carregando sua garagem...
          </div>
        )}

        {/* Empty state */}
        {!authRequired && !loading && vehicles.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <div style={{ color: '#444' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5a2 2 0 0 1-2 2h-2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
            </div>
            <p className="text-[28px]" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>Garagem vazia</p>
            <p className="text-[14px] max-w-sm" style={{ color: '#555' }}>Adicione seu primeiro veículo para começar a registrar o histórico de manutenção.</p>
            <button onClick={openModal} className="mt-2 px-6 py-3 rounded-xl text-[14px] font-bold uppercase tracking-[1.5px] transition-all active:scale-95" style={{ background: '#ff6600', color: '#111', fontFamily: 'var(--font-barlow-condensed)' }}>
              + Adicionar meu primeiro veículo
            </button>
          </div>
        )}

        {/* Tax alerts */}
        {!authRequired && !loading && (() => {
          const alerts = vehicles.flatMap(v => {
            const name = v.nickname ?? `${v.brand} ${v.model}`
            const out: { name: string; type: string; month: number; days: number; id: string }[] = []
            if (v.ipvaMonth) { const d = getDaysUntilMonth(v.ipvaMonth); if (d <= 60) out.push({ name, type: 'IPVA', month: v.ipvaMonth, days: d, id: v.id }) }
            if (v.licensingMonth) { const d = getDaysUntilMonth(v.licensingMonth); if (d <= 60) out.push({ name, type: 'CRLV', month: v.licensingMonth, days: d, id: v.id }) }
            return out
          }).sort((a, b) => a.days - b.days)
          if (!alerts.length) return null
          return (
            <div className="mb-6 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,102,0,0.3)' }}>
              <div className="px-5 py-3 flex items-center gap-2" style={{ background: 'rgba(255,102,0,0.08)', borderBottom: '1px solid rgba(255,102,0,0.15)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff8533" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <p className="text-[12px] font-bold tracking-[2px] uppercase" style={{ color: '#ff8533', fontFamily: 'var(--font-barlow-condensed)' }}>Impostos e Documentos — Atenção</p>
              </div>
              {alerts.map((a, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-3 gap-3 cursor-pointer hover:bg-white/5 transition-colors" style={{ background: '#1c1c22', borderBottom: i < alerts.length - 1 ? '1px solid #28282e' : 'none' }} onClick={() => router.push(`/home/garagem/${a.id}`)}>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded" style={{ background: a.type === 'IPVA' ? 'rgba(239,68,68,0.15)' : 'rgba(59,130,246,0.15)', color: a.type === 'IPVA' ? '#f87171' : '#60a5fa', fontFamily: 'var(--font-barlow-condensed)' }}>{a.type}</span>
                    <span className="text-[14px] font-semibold" style={{ color: '#f0ede8' }}>{a.name}</span>
                    <span className="text-[13px]" style={{ color: '#888' }}>{MONTH_NAMES[a.month - 1]}</span>
                  </div>
                  <span className="text-[13px] font-bold shrink-0" style={{ color: '#ff6600' }}>{a.days} dias</span>
                </div>
              ))}
            </div>
          )
        })()}

        {/* Vehicle grid */}
        {!authRequired && !loading && vehicles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {vehicles.map((v) => {
              const lastLog = v.logs[0]
              return (
                <div key={v.id} onClick={() => router.push(`/home/garagem/${v.id}`)} className="rounded-2xl p-5 cursor-pointer transition-all duration-150 hover:border-orange-600/40 group" style={{ background: '#28282e', border: '1px solid #3a3a42' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="shrink-0" style={{ color: '#ff6600' }}>{v.vehicleType === 'moto'
                        ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h-5l-3 7"/><path d="m9 6 2 7h7"/><path d="M12 6V3"/></svg>
                        : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5a2 2 0 0 1-2 2h-2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
                      }</span>
                      <div>
                        <p className="text-[11px] font-bold tracking-[1.5px] uppercase" style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
                          {v.nickname || `${v.brand} ${v.model}`}
                        </p>
                        {v.nickname && <p className="text-[13px]" style={{ color: '#777' }}>{v.brand} {v.model}</p>}
                      </div>
                    </div>
                    {v.plate && <span className="text-[11px] font-bold tracking-[1px] px-2 py-0.5 rounded" style={{ background: '#2a2a32', color: '#aaa', fontFamily: 'var(--font-barlow-condensed)' }}>{v.plate}</span>}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: '#30303a', color: '#888', border: '1px solid #3a3a42' }}>{v.year}</span>
                    {v.fuelType && <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: '#30303a', color: '#888', border: '1px solid #3a3a42' }}>{FUEL_LABELS[v.fuelType] ?? v.fuelType}</span>}
                    {v.color && <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: '#30303a', color: '#888', border: '1px solid #3a3a42' }}>{v.color}</span>}
                    {v.ipvaMonth && getDaysUntilMonth(v.ipvaMonth) <= 60 && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full font-bold" style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.25)', fontFamily: 'var(--font-barlow-condensed)' }}>
                        IPVA {MONTH_NAMES[v.ipvaMonth - 1]}
                      </span>
                    )}
                    {v.licensingMonth && getDaysUntilMonth(v.licensingMonth) <= 60 && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full font-bold" style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.25)', fontFamily: 'var(--font-barlow-condensed)' }}>
                        CRLV {MONTH_NAMES[v.licensingMonth - 1]}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #2a2a32' }}>
                    <div>
                      <p className="text-[10px] uppercase tracking-[1px]" style={{ color: '#555' }}>KM atual</p>
                      <p className="text-[15px] font-bold" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>{v.currentKm ? v.currentKm.toLocaleString('pt-BR') : '—'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] uppercase tracking-[1px]" style={{ color: '#555' }}>Registros</p>
                      <p className="text-[15px] font-bold" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>{v._count.logs}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-[1px]" style={{ color: '#555' }}>Última revisão</p>
                      <p className="text-[13px] font-semibold" style={{ color: lastLog ? '#aaa' : '#444' }}>{lastLog ? new Date(lastLog.date).toLocaleDateString('pt-BR') : '—'}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[12px] font-semibold" style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>Ver histórico →</span>
                    {isPro && (
                      <button
                        onClick={e => { e.stopPropagation(); downloadPdf(v.id, v.nickname ?? `${v.brand} ${v.model} ${v.year}`) }}
                        disabled={generatingPdf === v.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-[1px] transition-all hover:bg-orange-500/20 disabled:opacity-50"
                        style={{ background: 'rgba(255,102,0,0.1)', color: '#ff8533', border: '1px solid rgba(255,102,0,0.25)', fontFamily: 'var(--font-barlow-condensed)' }}
                      >
                          {generatingPdf === v.id ? (
                          <>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 0.8s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                            Gerando...
                          </>
                        ) : (
                          <>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                            Laudo PDF
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
            {atFreeLimit ? (
              <a href="/home/planos" className="rounded-2xl p-5 cursor-pointer transition-all duration-150 flex flex-col items-center justify-center gap-3 min-h-[180px] hover:border-orange-500/40 no-underline" style={{ background: '#0e0e10', border: '2px dashed rgba(255,102,0,0.25)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#ff6600" stroke="#ff6600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <div className="text-center">
                  <p className="text-[13px] font-bold uppercase tracking-[1px]" style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>Para mais de um veículo</p>
                  <p className="text-[12px] mt-1" style={{ color: '#555', fontFamily: 'var(--font-barlow-condensed)' }}>obtenha o plano Pro</p>
                </div>
              </a>
            ) : (
              <div onClick={openModal} className="rounded-2xl p-5 cursor-pointer transition-all duration-150 flex flex-col items-center justify-center gap-3 min-h-[180px] hover:border-orange-600/30" style={{ background: '#0e0e10', border: '2px dashed #3a3a42' }}>
                <span className="text-[32px] opacity-40">+</span>
                <p className="text-[13px] font-bold uppercase tracking-[1px]" style={{ color: '#444', fontFamily: 'var(--font-barlow-condensed)' }}>Adicionar veículo</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Add Vehicle Modal ─────────────────────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)' }} onClick={() => setShowModal(false)}>
          <div className="w-full max-w-[780px] rounded-2xl overflow-hidden max-h-[92vh] flex flex-col" style={{ background: '#28282e', border: '1px solid #3a3a42' }} onClick={(e) => e.stopPropagation()}>

            {/* Modal header */}
            <div className="flex items-center justify-between px-8 py-5 shrink-0" style={{ background: '#222228', borderBottom: '1px solid #3a3a42' }}>
              <div>
                <p className="text-[12px] font-bold tracking-[2px] uppercase" style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>Nova entrada</p>
                <p className="text-[28px]" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>Adicionar Veículo</p>
              </div>
              <button onClick={() => setShowModal(false)} className="w-9 h-9 rounded-full flex items-center justify-center text-[15px]" style={{ background: '#3a3a42', color: '#aaa' }}>✕</button>
            </div>

            {/* Modal body */}
            <div className="overflow-y-auto px-8 py-6 flex flex-col gap-5">

              {/* Tipo */}
              <div>
                <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelSt}>Tipo</p>
                <div className="flex gap-2">
                  {(['carro', 'moto'] as const).map((val) => (
                    <button key={val} onClick={() => setVType(val)}
                      className="flex-1 py-3 rounded-xl text-[15px] font-bold transition-colors flex items-center gap-1.5 justify-center"
                      style={{ background: vType === val ? '#ff6600' : '#222228', color: vType === val ? '#111' : '#666', border: `1px solid ${vType === val ? '#ff6600' : '#3a3a42'}`, fontFamily: 'var(--font-barlow-condensed)' }}>
                      {val === 'carro'
                        ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5a2 2 0 0 1-2 2h-2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
                        : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h-5l-3 7"/><path d="m9 6 2 7h7"/><path d="M12 6V3"/></svg>
                      }
                      {val === 'carro' ? 'Carro' : 'Moto'}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Marca ───────────────────────────────────────────────────── */}
              <div>
                <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelSt}>Marca *</p>
                <div className="relative">
                  <select
                    className={selectCls}
                    style={{ ...fieldStyle, opacity: loadingBrands ? 0.5 : 1 }}
                    value={selectedBrand?.code ?? ''}
                    disabled={brands.length === 0 || loadingBrands}
                    onChange={(e) => {
                      const b = brands.find((b) => b.code === e.target.value) ?? null
                      setSelectedBrand(b)
                    }}
                  >
                    <option value="">
                      {loadingBrands ? 'Carregando marcas...' : brands.length === 0 ? 'Aguardando tipo...' : 'Selecione a marca'}
                    </option>
                    {brands.map((b) => <option key={b.code} value={b.code}>{b.name}</option>)}
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#555' }}>▾</span>
                </div>
              </div>

              {/* ── Modelo ──────────────────────────────────────────────────── */}
              <div>
                <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelSt}>Modelo *</p>
                <div className="relative">
                  <select
                    className={selectCls}
                    style={{ ...fieldStyle, opacity: !selectedBrand || loadingModels ? 0.5 : 1 }}
                    value={selectedModel?.id ?? ''}
                    disabled={!selectedBrand || models.length === 0 || loadingModels}
                    onChange={(e) => {
                      const m = models.find((m) => m.id === e.target.value) ?? null
                      setSelectedModel(m)
                    }}
                  >
                    <option value="">
                      {loadingModels ? 'Carregando modelos...' : !selectedBrand ? 'Selecione a marca primeiro' : models.length === 0 ? 'Nenhum modelo encontrado' : 'Selecione o modelo'}
                    </option>
                    {models.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#555' }}>▾</span>
                </div>
              </div>

              {/* ── Ano / Combustível ────────────────────────────────────────── */}
              <div>
                <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelSt}>Ano / Combustível *</p>
                <div className="relative">
                  <select
                    className={selectCls}
                    style={{ ...fieldStyle, opacity: !selectedModel || loadingYears ? 0.5 : 1 }}
                    value={selectedYear?.code ?? ''}
                    disabled={!selectedModel || years.length === 0 || loadingYears}
                    onChange={(e) => {
                      const y = years.find((y) => y.code === e.target.value) ?? null
                      setSelectedYear(y)
                    }}
                  >
                    <option value="">
                      {loadingYears ? 'Carregando anos...' : !selectedModel ? 'Selecione o modelo primeiro' : years.length === 0 ? 'Nenhum ano encontrado' : 'Selecione o ano'}
                    </option>
                    {years.map((y) => <option key={y.code} value={y.code}>{y.name}</option>)}
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#555' }}>▾</span>
                </div>
                {selectedYear && (
                  <p className="text-[11px] mt-1.5 px-1" style={{ color: '#666' }}>
                    ✓ {selectedBrand?.name} {selectedModel?.name} · {parseYear(selectedYear.name)} · {FUEL_LABELS[detectFuel(selectedYear.name)]}
                  </p>
                )}
              </div>

              {/* ── Extra fields ─────────────────────────────────────────────── */}
              <div>
                <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelSt}>Apelido <span style={{ color: '#444' }}>(opcional)</span></p>
                <input className={inputCls} style={fieldStyle} placeholder='Ex: "Meu Civic"' value={extra.nickname} onChange={sel('nickname')} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelSt}>Cor</p>
                  <input className={inputCls} style={fieldStyle} placeholder="Prata" value={extra.color} onChange={sel('color')} />
                </div>
                <div>
                  <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelSt}>Placa</p>
                  <input className={inputCls} style={fieldStyle} placeholder="ABC-1234" value={extra.plate} onChange={sel('plate')} />
                </div>
              </div>

              <div>
                <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelSt}>KM Atual</p>
                <input type="number" className={inputCls} style={fieldStyle} placeholder="87500" value={extra.currentKm} onChange={sel('currentKm')} />
              </div>

              <div>
                <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelSt}>Observações</p>
                <textarea className={inputCls} style={{ ...fieldStyle, resize: 'none' }} rows={2} placeholder="Informações adicionais..." value={extra.notes} onChange={sel('notes')} />
              </div>

              {error && <p className="text-[13px]" style={{ color: '#e03030' }}>{error}</p>}
            </div>

            {/* Modal footer */}
            <div className="px-8 py-5 shrink-0 flex gap-3" style={{ borderTop: '1px solid #2a2a32' }}>
              <button onClick={() => setShowModal(false)} className="flex-1 py-3.5 rounded-xl text-[14px] font-bold uppercase tracking-[1px]" style={{ background: '#30303a', color: '#888', fontFamily: 'var(--font-barlow-condensed)' }}>Cancelar</button>
              <button onClick={handleSave} disabled={saving || !selectedYear} className="flex-1 py-3.5 rounded-xl text-[14px] font-bold uppercase tracking-[1px] disabled:opacity-50 transition-all active:scale-95" style={{ background: selectedYear ? '#ff6600' : '#30303a', color: selectedYear ? '#111' : '#444', fontFamily: 'var(--font-barlow-condensed)' }}>
                {saving ? 'Salvando...' : 'Salvar Veículo'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
