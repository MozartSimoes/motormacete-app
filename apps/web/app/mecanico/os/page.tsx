'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'

const STATUSES = [
  { key: '',              label: 'Todas'            },
  { key: 'OPEN',         label: 'Abertas'          },
  { key: 'IN_PROGRESS',  label: 'Em andamento'     },
  { key: 'WAITING_PARTS',label: 'Aguardando peças' },
  { key: 'DONE',         label: 'Concluídas'       },
  { key: 'CLOSED',       label: 'Fechadas'         },
  { key: 'CANCELLED',    label: 'Canceladas'       },
]

const STATUS_COLOR: Record<string, string> = {
  OPEN:          '#3b82f6',
  IN_PROGRESS:   '#ff8c00',
  WAITING_PARTS: '#a855f7',
  DONE:          '#22c55e',
  CLOSED:        '#555',
  CANCELLED:     '#ef4444',
}

interface OS {
  id: string; number: number; clientName: string; clientPhone: string | null
  plate: string | null; vehicleBrand: string; vehicleModel: string; vehicleYear: number | null
  status: string; total: number; createdAt: string; diagnosis: string | null
}

export default function OSListPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<OS[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus]   = useState('')
  const [search, setSearch]   = useState('')
  const [userPlan, setUserPlan] = useState<string>('FREE')
  const [isAdmin, setIsAdmin]   = useState(false)
  const [isTrialing, setIsTrialing] = useState(false)
  const [planLoaded, setPlanLoaded] = useState(false)
  const [osThisMonth, setOsThisMonth] = useState(0)

  const isPro = isAdmin || isTrialing || userPlan === "MECHANIC_PRO" || userPlan === "DRIVER_PRO"
  const OS_LIMIT = 10
  const atLimit = planLoaded && !isPro && osThisMonth >= OS_LIMIT
  const [exportingCsv, setExportingCsv] = useState(false)

  async function exportCsv() {
    setExportingCsv(true)
    try {
      const now = new Date()
      const params = new URLSearchParams({ month: String(now.getMonth() + 1), year: String(now.getFullYear()) })
      if (status) params.set('status', status)
      const res = await fetch(`/api/mecanico/export?${params}`)
      if (!res.ok) { alert('Erro ao exportar.'); return }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `os-${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } finally { setExportingCsv(false) }
  }

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => {
      if (d.user) { setUserPlan(d.user.plan ?? "FREE"); setIsAdmin(d.user.isAdmin ?? false); setIsTrialing(d.user.isTrialing ?? false) }
    }).catch(() => {}).finally(() => setPlanLoaded(true))
  }, [])

  const load = useCallback(() => {
    setLoading(true)
    const p = new URLSearchParams()
    if (status) p.set('status', status)
    if (search) p.set('search', search)
    fetch(`/api/mecanico/os?${p}`)
      .then((r) => {
        if (r.status === 401) { router.push('/home'); return null }
        return r.json()
      })
      .then((d) => {
        if (d) {
          setOrders(d.orders)
          // Conta OS criadas este mês para o gate FREE
          const startOfMonth = new Date(); startOfMonth.setDate(1); startOfMonth.setHours(0,0,0,0)
          setOsThisMonth(d.orders.filter((o: OS) => new Date(o.createdAt) >= startOfMonth).length)
        }
      })
      .finally(() => setLoading(false))
  }, [status, search, router])

  useEffect(() => { load() }, [load])

  const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  const fmtDate = (s: string) => new Date(s).toLocaleDateString('pt-BR')

  return (
    <div className="min-h-screen" style={{ background: '#1c1c22' }}>
      <Header />
      <div className="max-w-[980px] mx-auto px-4 py-10">

        {/* Title */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="text-[12px] font-bold tracking-[3px] uppercase mb-1"
              style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
              Gestão
            </p>
            <h1 className="text-[42px] leading-none"
              style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
              Ordens de Serviço
            </h1>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {!isPro && (
              <span className="text-[11px] font-bold" style={{ color: osThisMonth >= OS_LIMIT ? '#ef4444' : '#555' }}>
                {osThisMonth}/{OS_LIMIT} OS este mês
              </span>
            )}
            {isPro && (
              <button onClick={exportCsv} disabled={exportingCsv}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[12px] font-bold uppercase tracking-[1px] transition-all disabled:opacity-60"
                style={{ background: 'rgba(255,102,0,0.08)', border: '1px solid rgba(255,102,0,0.3)', color: '#ff8533', fontFamily: 'var(--font-barlow-condensed)' }}>
                {exportingCsv ? '⏳' : '⬇️'} Exportar CSV
              </button>
            )}
            <button
              onClick={() => atLimit ? router.push('/home/planos') : router.push('/mecanico/os/nova')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold uppercase tracking-[1px] transition-all active:scale-95"
              style={{ background: atLimit ? '#2a2a32' : '#ff6600', color: atLimit ? '#ff8533' : '#111', border: atLimit ? '1px solid rgba(255,102,0,0.3)' : 'none', fontFamily: 'var(--font-barlow-condensed)' }}>
              {atLimit ? '⭐ Assinar Pro' : '+ Nova OS'}
            </button>
          </div>
        </div>

        {/* Banner de limite FREE */}
        {atLimit && (
          <div className="flex items-center justify-between gap-4 mb-6 px-5 py-4 rounded-2xl"
            style={{ background: 'rgba(255,102,0,0.07)', border: '1px solid rgba(255,102,0,0.25)' }}>
            <div>
              <p className="text-[13px] font-bold" style={{ color: '#ff8533' }}>
                🔒 Limite de {OS_LIMIT} OS mensais atingido — Plano Grátis
              </p>
              <p className="text-[12px] mt-0.5" style={{ color: '#555' }}>
                Assine o Mecânico Pro para criar OS ilimitadas todo mês.
              </p>
            </div>
            <button onClick={() => router.push('/home/planos')}
              className="shrink-0 px-4 py-2 rounded-xl text-[12px] font-bold uppercase tracking-[1px] transition-all"
              style={{ background: '#ff6600', color: '#111', fontFamily: 'var(--font-barlow-condensed)' }}>
              ⭐ Ver planos
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            className="flex-1 px-4 py-2.5 rounded-xl text-[14px] outline-none"
            style={{ background: '#18181b', border: '1px solid #333338', color: '#f0ede8' }}
            placeholder="Buscar por cliente, placa ou modelo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && load()}
          />
          <button onClick={load}
            className="px-4 py-2.5 rounded-xl text-[13px] font-bold uppercase tracking-[1px] shrink-0"
            style={{ background: '#2a2a32', color: '#aaa', fontFamily: 'var(--font-barlow-condensed)' }}>
            Buscar
          </button>
        </div>

        {/* Status filter pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {STATUSES.map((s) => (
            <button key={s.key} onClick={() => setStatus(s.key)}
              className="px-3.5 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-[0.5px] transition-colors"
              style={{
                background: status === s.key ? '#ff6600' : '#222228',
                color:      status === s.key ? '#111'    : '#666',
                border:     `1px solid ${status === s.key ? '#ff6600' : '#3a3a42'}`,
                fontFamily: 'var(--font-barlow-condensed)',
              }}>
              {s.label}
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="py-16 text-center"><p style={{ color: '#555' }}>Carregando...</p></div>
        ) : orders.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-[48px] mb-3">📋</p>
            <p className="text-[20px] font-bold mb-2" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
              Nenhuma OS encontrada
            </p>
            <p className="text-[14px] mb-4" style={{ color: '#555' }}>Crie sua primeira ordem de serviço.</p>
            <button onClick={() => router.push('/mecanico/os/nova')}
              className="px-6 py-3 rounded-xl text-[13px] font-bold uppercase tracking-[1px] active:scale-95"
              style={{ background: '#ff6600', color: '#111', fontFamily: 'var(--font-barlow-condensed)' }}>
              + Nova OS
            </button>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #2a2a32' }}>
            {/* Header row */}
            <div className="hidden sm:grid grid-cols-[60px_1fr_140px_110px_100px_80px] gap-4 px-5 py-2.5"
              style={{ background: '#222228', borderBottom: '1px solid #2a2a32' }}>
              {['OS', 'Cliente / Veículo', 'Status', 'Data', 'Total', ''].map((h) => (
                <p key={h} className="text-[11px] font-bold uppercase tracking-[1px]"
                  style={{ color: '#555', fontFamily: 'var(--font-barlow-condensed)' }}>{h}</p>
              ))}
            </div>
            {orders.map((os, i) => (
              <div key={os.id}
                onClick={() => router.push(`/mecanico/os/${os.id}`)}
                className="px-5 py-4 cursor-pointer transition hover:bg-white/[0.03] sm:grid grid-cols-[60px_1fr_140px_110px_100px_80px] gap-4 items-center"
                style={{ borderTop: i > 0 ? '1px solid #30303a' : undefined, background: '#1c1c22' }}>
                <p className="text-[15px] font-black" style={{ color: '#ff6600', fontFamily: 'var(--font-bebas-neue)' }}>
                  #{os.number.toString().padStart(3, '0')}
                </p>
                <div>
                  <p className="text-[14px] font-semibold" style={{ color: '#f0ede8' }}>{os.clientName}</p>
                  <p className="text-[12px]" style={{ color: '#555' }}>
                    {os.vehicleBrand} {os.vehicleModel}{os.vehicleYear ? ` ${os.vehicleYear}` : ''}{os.plate ? ` · ${os.plate}` : ''}
                  </p>
                </div>
                <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.5px] w-fit"
                  style={{ background: `${STATUS_COLOR[os.status]}18`, color: STATUS_COLOR[os.status], border: `1px solid ${STATUS_COLOR[os.status]}30` }}>
                  {STATUSES.find((s) => s.key === os.status)?.label}
                </span>
                <p className="text-[13px]" style={{ color: '#666' }}>{fmtDate(os.createdAt)}</p>
                <p className="text-[14px] font-bold" style={{ color: '#f0ede8' }}>{fmt(os.total)}</p>
                <p className="text-[12px] text-right hidden sm:block" style={{ color: '#555' }}>Ver →</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
