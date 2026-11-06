'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

const FUEL_LABELS: Record<string, string> = {
  FLEX: 'Flex', GASOLINA: 'Gasolina', DIESEL: 'Diesel', ELETRICO: 'Elétrico', HIBRIDO: 'Híbrido',
}

const MONTH_NAMES = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']

function getDaysUntilMonth(month: number): number {
  const now = new Date()
  const year = now.getMonth() + 1 >= month ? now.getFullYear() + 1 : now.getFullYear()
  const target = new Date(year, month - 1, 1)
  return Math.ceil((target.getTime() - now.getTime()) / 86400000)
}

const CATEGORIES = [
  'Óleo e Filtros', 'Pneus e Rodas', 'Freios', 'Motor / Correia',
  'Suspensão e Direção', 'Transmissão / Câmbio', 'Elétrica e Bateria',
  'Ar-Condicionado', 'Funilaria e Pintura', 'Revisão Geral', 'Outros',
]

const CAT_COLORS: Record<string, string> = {
  'Óleo e Filtros': '#f59e0b', 'Pneus e Rodas': '#3b82f6', 'Freios': '#ef4444',
  'Motor / Correia': '#ff6600', 'Suspensão e Direção': '#8b5cf6',
  'Transmissão / Câmbio': '#06b6d4', 'Elétrica e Bateria': '#eab308',
  'Ar-Condicionado': '#22d3ee', 'Funilaria e Pintura': '#ec4899',
  'Revisão Geral': '#22c55e', 'Outros': '#777',
}

interface Vehicle {
  id: string; nickname: string | null; vehicleType: string
  brand: string; model: string; year: number; fuelType: string | null
  color: string | null; plate: string | null; currentKm: number | null; notes: string | null
  ipvaMonth?: number | null; licensingMonth?: number | null
}

interface LogEntry {
  id: string; date: string; km: number | null; category: string
  description: string; cost: number | null; workshop: string | null
  notes: string | null; nextKm: number | null; nextDate: string | null
}

const emptyLog = {
  date: new Date().toISOString().slice(0, 10), km: '', category: CATEGORIES[0],
  description: '', cost: '', workshop: '', notes: '', nextKm: '', nextDate: '',
}

function fmtDate(d: string) { return new Date(d).toLocaleDateString('pt-BR') }
function fmtBRL(v: number) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }) }
function fmtKm(v: number) { return v.toLocaleString('pt-BR') + ' km' }

export default function VehicleDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [userPlan, setUserPlan] = useState<string>('FREE')
  const [isAdmin, setIsAdmin] = useState(false)
  const [isTrialing, setIsTrialing] = useState(false)
  const [showAddLog, setShowAddLog] = useState(false)
  const [showEditVehicle, setShowEditVehicle] = useState(false)
  const [logForm, setLogForm] = useState(emptyLog)
  const [savingLog, setSavingLog] = useState(false)
  const [logError, setLogError] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [vehicleForm, setVehicleForm] = useState<Record<string, string>>({})
  const [savingVehicle, setSavingVehicle] = useState(false)
  const [editingLogId, setEditingLogId] = useState<string | null>(null)
  const [editLogForm, setEditLogForm] = useState(emptyLog)
  const [savingEditLog, setSavingEditLog] = useState(false)
  const [editLogError, setEditLogError] = useState('')

  const load = useCallback(() => {
    fetch(`/api/garage/${id}`)
      .then((r) => { if (r.status === 401) { router.push('/home'); return null } if (r.status === 404) { router.push('/home/garagem'); return null } return r.json() })
      .then((d) => { if (d) { setVehicle(d.vehicle); setLogs(d.vehicle.logs) } })
      .finally(() => setLoading(false))
  }, [id, router])

  useEffect(() => {
    load()
    fetch('/api/auth/me').then(r => r.json()).then(d => {
      if (d.user) { setUserPlan(d.user.plan ?? "FREE"); setIsAdmin(d.user.isAdmin ?? false); setIsTrialing(d.user.isTrialing ?? false) }
    }).catch(() => {})
  }, [load])

  const isPro = isAdmin || isTrialing || userPlan === "DRIVER_PRO" || userPlan === "MECHANIC_PRO"

  function openEditVehicle() {
    if (!vehicle) return
    setVehicleForm({
      nickname: vehicle.nickname ?? '', vehicleType: vehicle.vehicleType,
      brand: vehicle.brand, model: vehicle.model, year: String(vehicle.year),
      fuelType: vehicle.fuelType ?? 'FLEX', color: vehicle.color ?? '',
      plate: vehicle.plate ?? '', currentKm: vehicle.currentKm ? String(vehicle.currentKm) : '', notes: vehicle.notes ?? '',
      ipvaMonth: vehicle.ipvaMonth ? String(vehicle.ipvaMonth) : '',
      licensingMonth: vehicle.licensingMonth ? String(vehicle.licensingMonth) : '',
    })
    setShowEditVehicle(true)
  }

  async function handleSaveVehicle() {
    setSavingVehicle(true)
    const res = await fetch(`/api/garage/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vehicleForm),
    })
    const data = await res.json()
    if (res.ok) { setVehicle(data.vehicle); setShowEditVehicle(false) }
    setSavingVehicle(false)
  }

  async function handleDeleteVehicle() {
    if (!confirm('Excluir este veículo e todo o histórico? Esta ação não pode ser desfeita.')) return
    await fetch(`/api/garage/${id}`, { method: 'DELETE' })
    router.push('/home/garagem')
  }

  async function handleSaveLog() {
    if (!logForm.description.trim() || !logForm.category) { setLogError('Descrição e categoria são obrigatórias.'); return }
    setSavingLog(true); setLogError('')
    const res = await fetch(`/api/garage/${id}/maintenance`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logForm),
    })
    const data = await res.json()
    if (!res.ok) { setLogError(data.error ?? 'Erro ao salvar.'); setSavingLog(false); return }
    setLogs((prev) => [data.log, ...prev])
    if (logForm.km && vehicle) {
      const km = Number(logForm.km)
      if (km > (vehicle.currentKm ?? 0)) setVehicle((v) => v ? { ...v, currentKm: km } : v)
    }
    setShowAddLog(false); setLogForm(emptyLog); setSavingLog(false)
  }

  function openEditLog(log: LogEntry) {
    setEditLogForm({
      date: log.date.slice(0, 10),
      km: log.km ? String(log.km) : '',
      category: log.category,
      description: log.description,
      cost: log.cost != null ? String(log.cost) : '',
      workshop: log.workshop ?? '',
      notes: log.notes ?? '',
      nextKm: log.nextKm ? String(log.nextKm) : '',
      nextDate: log.nextDate ? log.nextDate.slice(0, 10) : '',
    })
    setEditLogError('')
    setEditingLogId(log.id)
  }

  async function handleUpdateLog() {
    if (!editLogForm.description.trim() || !editLogForm.category) { setEditLogError('Descrição e categoria são obrigatórias.'); return }
    setSavingEditLog(true); setEditLogError('')
    const res = await fetch(`/api/garage/${id}/maintenance/${editingLogId}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editLogForm),
    })
    const data = await res.json()
    if (!res.ok) { setEditLogError(data.error ?? 'Erro ao salvar.'); setSavingEditLog(false); return }
    setLogs((prev) => prev.map((l) => l.id === editingLogId ? { ...l, ...data.log } : l))
    setEditingLogId(null); setSavingEditLog(false)
  }

  async function handleDeleteLog(logId: string) {
    setDeletingId(logId)
    await fetch(`/api/garage/${id}/maintenance/${logId}`, { method: 'DELETE' })
    setLogs((prev) => prev.filter((l) => l.id !== logId))
    setDeletingId(null)
  }

  const totalSpent = logs.reduce((s, l) => s + (l.cost ?? 0), 0)
  const lastLog = logs[0]
  const nextDue = logs.find((l) => l.nextKm || l.nextDate)

  // Custo por km: usa o km do primeiro log como ponto de partida
  const firstLogKm = [...logs].reverse().find(l => l.km)?.km
  const kmRodado = vehicle?.currentKm && firstLogKm ? vehicle.currentKm - firstLogKm : vehicle?.currentKm ?? 0
  const custoPorKm = totalSpent > 0 && kmRodado > 0 ? totalSpent / kmRodado : null

  const chartData = Object.entries(
    logs.reduce<Record<string, number>>((acc, l) => {
      if (l.cost) acc[l.category] = (acc[l.category] ?? 0) + l.cost
      return acc
    }, {})
  ).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)

  const CHART_COLORS = ['#ff6600','#f59e0b','#ef4444','#3b82f6','#8b5cf6','#22c55e','#06b6d4','#ec4899','#eab308','#777']

  const inputClass = 'w-full px-4 py-3.5 rounded-xl text-[15px] outline-none transition-colors'
  const inputStyle = { background: '#18181b', border: '1px solid #333338', color: '#f0ede8', fontFamily: 'var(--font-barlow)' }
  const labelStyle = { color: '#aaa', fontFamily: 'var(--font-barlow-condensed)' }
  const selLog = (f: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setLogForm((p) => ({ ...p, [f]: e.target.value }))

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0e0e0f' }}>
      <div className="w-6 h-6 rounded-full border-2" style={{ borderColor: '#2a2a2e', borderTopColor: '#ff6600', animation: 'spin 0.8s linear infinite' }} />
    </div>
  )

  if (!vehicle) return null

  const vehicleTitle = vehicle.nickname ?? `${vehicle.brand} ${vehicle.model}`

  return (
    <div className="min-h-screen" style={{ background: '#0e0e0f' }}>
      <Header />

      <div className="max-w-[980px] mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <button onClick={() => router.push('/home/garagem')} className="flex items-center gap-1.5 mb-6 text-[12px] font-semibold uppercase tracking-[1px] transition-colors hover:text-white" style={{ color: '#555', fontFamily: 'var(--font-barlow-condensed)' }}>
          ← Minha Garagem
        </button>

        {/* Vehicle header */}
        <div className="rounded-2xl p-6 mb-6" style={{ background: '#141416', border: '1px solid #2a2a2e' }}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <span style={{ color: '#ff6600' }}>
                {vehicle.vehicleType === 'moto'
                  ? <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h-5l-3 7"/><path d="m9 6 2 7h7"/><path d="M12 6V3"/></svg>
                  : <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5a2 2 0 0 1-2 2h-2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
                }
              </span>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-[32px] leading-none" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
                    {vehicleTitle}
                  </h1>
                  {vehicle.plate && (
                    <span className="text-[12px] font-bold tracking-[1px] px-2.5 py-1 rounded" style={{ background: '#1e1e22', color: '#bbb', fontFamily: 'var(--font-barlow-condensed)' }}>
                      {vehicle.plate}
                    </span>
                  )}
                </div>
                {vehicle.nickname && <p className="text-[14px]" style={{ color: '#777' }}>{vehicle.brand} {vehicle.model}</p>}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: '#1a1a1c', color: '#888', border: '1px solid #2a2a2e' }}>{vehicle.year}</span>
                  {vehicle.fuelType && <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: '#1a1a1c', color: '#888', border: '1px solid #2a2a2e' }}>{FUEL_LABELS[vehicle.fuelType] ?? vehicle.fuelType}</span>}
                  {vehicle.color && <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: '#1a1a1c', color: '#888', border: '1px solid #2a2a2e' }}>{vehicle.color}</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => router.push(`/home/garagem/${id}/abastecimento`)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-bold uppercase tracking-[1px] transition-all hover:bg-orange-500/10" style={{ border: '1px solid rgba(255,102,0,0.3)', color: '#ff8533', fontFamily: 'var(--font-barlow-condensed)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22V9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v13"/><path d="M13 11h4a2 2 0 0 1 2 2v9"/><path d="M3 22h18"/><path d="M15 22V9"/></svg>
                Abastecimento
              </button>
              {isPro && (
                <button onClick={() => router.push(`/home/garagem/${id}/imprimir`)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-bold uppercase tracking-[1px] transition-all hover:bg-orange-500/10" style={{ border: '1px solid rgba(255,102,0,0.3)', color: '#ff8533', fontFamily: 'var(--font-barlow-condensed)' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  Gerar Laudo PDF
                </button>
              )}
              <button onClick={openEditVehicle} className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-bold uppercase tracking-[1px] transition-all hover:bg-white/5" style={{ border: '1px solid #2a2a2e', color: '#888', fontFamily: 'var(--font-barlow-condensed)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Editar
              </button>
              <button onClick={() => router.push('/home/garagem')} className="w-9 h-9 rounded-xl flex items-center justify-center text-[16px] transition-all hover:bg-white/5" style={{ border: '1px solid #2a2a2e', color: '#555' }} title="Fechar">✕</button>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
            {[
              { label: 'KM Atual', value: vehicle.currentKm ? fmtKm(vehicle.currentKm) : '—' },
              { label: 'Total Gasto', value: totalSpent > 0 ? fmtBRL(totalSpent) : '—', accent: true },
              { label: 'Registros', value: String(logs.length) },
              { label: nextDue?.nextKm ? 'Próx. Revisão (km)' : 'Última Revisão', value: nextDue?.nextKm ? fmtKm(nextDue.nextKm) : (lastLog ? fmtDate(lastLog.date) : '—') },
            ].map((s) => (
              <div key={s.label} className="rounded-xl p-3" style={{ background: '#111113', border: '1px solid #1e1e22' }}>
                <p className="text-[10px] uppercase tracking-[1px] mb-1" style={{ color: '#555' }}>{s.label}</p>
                <p className="text-[18px] font-bold" style={{ color: s.accent ? '#ff6600' : '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* IPVA / Licenciamento */}
          {(vehicle.ipvaMonth || vehicle.licensingMonth) && (
            <div className="flex gap-3 mt-3 flex-wrap">
              {vehicle.ipvaMonth && (() => {
                const days = getDaysUntilMonth(vehicle.ipvaMonth!)
                const alert = days <= 60
                return (
                  <div className="flex-1 min-w-[130px] rounded-xl p-3" style={{ background: alert ? 'rgba(239,68,68,0.08)' : '#111113', border: `1px solid ${alert ? 'rgba(239,68,68,0.3)' : '#1e1e22'}` }}>
                    <p className="text-[10px] uppercase tracking-[1px] mb-1" style={{ color: alert ? '#f87171' : '#555' }}>IPVA</p>
                    <p className="text-[18px] font-bold" style={{ color: alert ? '#f87171' : '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>{MONTH_NAMES[vehicle.ipvaMonth! - 1]}</p>
                    {alert && <p className="text-[10px] uppercase font-bold mt-0.5" style={{ color: '#ef4444' }}>{days} dias</p>}
                  </div>
                )
              })()}
              {vehicle.licensingMonth && (() => {
                const days = getDaysUntilMonth(vehicle.licensingMonth!)
                const alert = days <= 60
                return (
                  <div className="flex-1 min-w-[130px] rounded-xl p-3" style={{ background: alert ? 'rgba(59,130,246,0.08)' : '#111113', border: `1px solid ${alert ? 'rgba(59,130,246,0.3)' : '#1e1e22'}` }}>
                    <p className="text-[10px] uppercase tracking-[1px] mb-1" style={{ color: alert ? '#60a5fa' : '#555' }}>CRLV / Licenciamento</p>
                    <p className="text-[18px] font-bold" style={{ color: alert ? '#60a5fa' : '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>{MONTH_NAMES[vehicle.licensingMonth! - 1]}</p>
                    {alert && <p className="text-[10px] uppercase font-bold mt-0.5" style={{ color: '#3b82f6' }}>{days} dias</p>}
                  </div>
                )
              })()}
            </div>
          )}

          {/* Custo por km — só Pro */}
          {isPro && custoPorKm !== null && (
            <div className="mt-3 rounded-xl px-4 py-3 flex items-center justify-between" style={{ background: 'rgba(255,102,0,0.06)', border: '1px solid rgba(255,102,0,0.2)' }}>
              <div>
                <p className="text-[10px] uppercase tracking-[1.5px] font-bold" style={{ color: '#ff8533', fontFamily: 'var(--font-barlow-condensed)' }}>⭐ Custo por km rodado</p>
                <p className="text-[11px] mt-0.5" style={{ color: '#555' }}>
                  {kmRodado.toLocaleString('pt-BR')} km rodados · R$ {totalSpent.toFixed(0)} investidos
                </p>
              </div>
              <p className="text-[28px] font-black" style={{ color: '#ff6600', fontFamily: 'var(--font-bebas-neue)' }}>
                R$ {custoPorKm.toFixed(2).replace('.', ',')}<span className="text-[14px] font-normal text-slate-500">/km</span>
              </p>
            </div>
          )}
        </div>

        {/* Maintenance history */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[24px]" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
            Histórico de Manutenção
          </h2>
          <button
            onClick={() => { setLogForm(emptyLog); setLogError(''); setShowAddLog(true) }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-bold uppercase tracking-[1px] transition-all active:scale-95"
            style={{ background: '#ff6600', color: '#111', fontFamily: 'var(--font-barlow-condensed)' }}
          >
            + Registrar Manutenção
          </button>
        </div>

        {/* Gráficos de gastos — só Pro */}
        {isPro && chartData.length > 0 && (
          <div className="rounded-2xl p-6 mb-6" style={{ background: '#141416', border: '1px solid #2a2a2e' }}>
            <p className="text-[11px] font-bold uppercase tracking-[2px] mb-5" style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
              ⭐ Gastos por categoria
            </p>
            <div className="flex flex-col md:flex-row gap-8 items-center">

              {/* Donut */}
              <div style={{ width: 200, height: 200, flexShrink: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={3}>
                      {chartData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v) => [`R$ ${Number(v ?? 0).toFixed(2).replace('.', ',')}`, '']} contentStyle={{ background: '#1a1a1c', border: '1px solid #2a2a2e', borderRadius: 8, color: '#f0ede8', fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Barras */}
              <div className="flex-1 w-full" style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2e" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: '#555', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={v => `R$${v}`} tick={{ fill: '#555', fontSize: 10 }} axisLine={false} tickLine={false} width={52} />
                    <Tooltip formatter={(v) => [`R$ ${Number(v ?? 0).toFixed(2).replace('.', ',')}`, 'Gasto']} contentStyle={{ background: '#1a1a1c', border: '1px solid #2a2a2e', borderRadius: 8, color: '#f0ede8', fontSize: 12 }} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {chartData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Legenda */}
              <div className="flex flex-col gap-2 min-w-[160px]">
                {chartData.map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                      <span className="text-[12px]" style={{ color: '#aaa' }}>{item.name}</span>
                    </div>
                    <span className="text-[12px] font-bold" style={{ color: '#f0ede8' }}>R$ {item.value.toFixed(0)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {logs.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center rounded-2xl" style={{ background: '#141416', border: '1px solid #2a2a2e' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            <p className="text-[20px]" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>Nenhum registro ainda</p>
            <p className="text-[13px]" style={{ color: '#555' }}>Registre a primeira manutenção para começar o histórico.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {logs.map((log) => {
              const catColor = CAT_COLORS[log.category] ?? '#777'
              const isExpanded = expandedId === log.id
              return (
                <div key={log.id} className="rounded-xl overflow-hidden" style={{ background: '#141416', border: '1px solid #2a2a2e' }}>
                  {/* Row */}
                  <div className="flex items-center gap-3 px-4 py-3 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : log.id)}>
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: catColor }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-bold tracking-[0.5px] px-2 py-0.5 rounded" style={{ background: `${catColor}20`, color: catColor, fontFamily: 'var(--font-barlow-condensed)' }}>
                          {log.category}
                        </span>
                        <p className="text-[14px] font-semibold truncate" style={{ color: '#f0ede8' }}>{log.description}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-[12px]" style={{ color: '#666' }}>{fmtDate(log.date)}</span>
                        {log.km && <span className="text-[12px]" style={{ color: '#666' }}>{fmtKm(log.km)}</span>}
                        {log.workshop && <span className="text-[12px]" style={{ color: '#666' }}>{log.workshop}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {log.cost != null && (
                        <span className="text-[14px] font-bold" style={{ color: '#ff8533', fontFamily: 'var(--font-bebas-neue)' }}>
                          {fmtBRL(log.cost)}
                        </span>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); openEditLog(log) }}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5"
                        style={{ color: '#666', border: '1px solid #2a2a2e' }}
                        title="Editar registro"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">{isExpanded ? <polyline points="18 15 12 9 6 15"/> : <polyline points="6 9 12 15 18 9"/>}</svg>
                    </div>
                  </div>

                  {/* Expanded */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 flex flex-col gap-3" style={{ borderTop: '1px solid #1e1e22' }}>
                      {log.notes && (
                        <p className="text-[13px] leading-relaxed flex items-start gap-2" style={{ color: '#999' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/></svg>
                          {log.notes}
                        </p>
                      )}
                      {(log.nextKm || log.nextDate) && (
                        <div className="flex items-center gap-4 rounded-lg px-3 py-2" style={{ background: '#0d0d10', border: '1px solid #1e1e22' }}>
                          <span className="text-[12px] font-bold uppercase tracking-[1px]" style={{ color: '#555', fontFamily: 'var(--font-barlow-condensed)' }}>Próxima revisão:</span>
                          {log.nextKm && <span className="text-[13px] font-bold flex items-center gap-1.5" style={{ color: '#ff8533' }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>{fmtKm(log.nextKm)}</span>}
                          {log.nextDate && <span className="text-[13px] font-bold flex items-center gap-1.5" style={{ color: '#ff8533' }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>{fmtDate(log.nextDate)}</span>}
                        </div>
                      )}
                      <div className="flex justify-end">
                        <button onClick={() => handleDeleteLog(log.id)} disabled={deletingId === log.id}
                          className="text-[11px] font-bold uppercase tracking-[1px] px-3 py-1 rounded-lg transition-colors"
                          style={{ color: '#e03030', background: 'rgba(224,48,48,0.08)', fontFamily: 'var(--font-barlow-condensed)' }}>
                          <span className="flex items-center gap-1.5">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                            {deletingId === log.id ? 'Excluindo...' : 'Excluir registro'}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Add Maintenance Modal */}
      {showAddLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)' }} onClick={() => setShowAddLog(false)}>
          <div className="w-full max-w-[780px] rounded-2xl overflow-hidden max-h-[92vh] flex flex-col" style={{ background: '#141416', border: '1px solid #2a2a2e' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-8 py-5 shrink-0" style={{ background: '#111113', borderBottom: '1px solid #2a2a2e' }}>
              <div>
                <p className="text-[12px] font-bold tracking-[2px] uppercase" style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>Novo registro</p>
                <p className="text-[28px]" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>Registrar Manutenção</p>
              </div>
              <button onClick={() => setShowAddLog(false)} className="w-9 h-9 rounded-full flex items-center justify-center text-[15px]" style={{ background: '#2a2a2e', color: '#aaa' }}>✕</button>
            </div>

            <div className="overflow-y-auto px-8 py-6 flex flex-col gap-5">
              {/* Data + KM */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelStyle}>Data *</p>
                  <input type="date" className={inputClass} style={inputStyle} value={logForm.date} onChange={selLog('date')} />
                </div>
                <div>
                  <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelStyle}>KM</p>
                  <input type="number" className={inputClass} style={inputStyle} placeholder="87500" value={logForm.km} onChange={selLog('km')} />
                </div>
              </div>

              {/* Categoria */}
              <div>
                <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelStyle}>Categoria *</p>
                <select className={inputClass} style={{ ...inputStyle, cursor: 'pointer' }} value={logForm.category} onChange={selLog('category')}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Descrição */}
              <div>
                <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelStyle}>Descrição *</p>
                <input className={inputClass} style={inputStyle} placeholder="Troca de óleo 5W30 Mobil + filtro" value={logForm.description} onChange={selLog('description')} />
              </div>

              {/* Custo + Oficina */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelStyle}>Custo (R$)</p>
                  <input type="number" className={inputClass} style={inputStyle} placeholder="350" value={logForm.cost} onChange={selLog('cost')} />
                </div>
                <div>
                  <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelStyle}>Oficina</p>
                  <input className={inputClass} style={inputStyle} placeholder="Auto Mecânica Silva" value={logForm.workshop} onChange={selLog('workshop')} />
                </div>
              </div>

              {/* Observações */}
              <div>
                <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelStyle}>Observações</p>
                <textarea className={inputClass} style={{ ...inputStyle, resize: 'none' }} rows={2} placeholder="Óleo 5W30 sintético. Próximo: 5.000 km." value={logForm.notes} onChange={selLog('notes')} />
              </div>

              {/* Próxima revisão */}
              <div className="rounded-xl p-4" style={{ background: '#111113', border: '1px solid #1e1e22' }}>
                <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-3" style={{ color: '#ff8533', fontFamily: 'var(--font-barlow-condensed)' }}>📅 Próxima Revisão (opcional)</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelStyle}>KM</p>
                    <input type="number" className={inputClass} style={inputStyle} placeholder="92500" value={logForm.nextKm} onChange={selLog('nextKm')} />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelStyle}>Data</p>
                    <input type="date" className={inputClass} style={inputStyle} value={logForm.nextDate} onChange={selLog('nextDate')} />
                  </div>
                </div>
              </div>

              {logError && <p className="text-[13px]" style={{ color: '#e03030' }}>{logError}</p>}
            </div>

            <div className="px-8 py-5 shrink-0 flex gap-3" style={{ borderTop: '1px solid #1e1e22' }}>
              <button onClick={() => setShowAddLog(false)} className="flex-1 py-3.5 rounded-xl text-[14px] font-bold uppercase tracking-[1px]" style={{ background: '#1a1a1c', color: '#888', fontFamily: 'var(--font-barlow-condensed)' }}>Cancelar</button>
              <button onClick={handleSaveLog} disabled={savingLog} className="flex-1 py-3.5 rounded-xl text-[14px] font-bold uppercase tracking-[1px] disabled:opacity-60 transition-all active:scale-95" style={{ background: '#ff6600', color: '#111', fontFamily: 'var(--font-barlow-condensed)' }}>
                {savingLog ? 'Salvando...' : 'Salvar Registro'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Maintenance Log Modal */}
      {editingLogId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)' }} onClick={() => setEditingLogId(null)}>
          <div className="w-full max-w-[780px] rounded-2xl overflow-hidden max-h-[92vh] flex flex-col" style={{ background: '#141416', border: '1px solid #2a2a2e' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-8 py-5 shrink-0" style={{ background: '#111113', borderBottom: '1px solid #2a2a2e' }}>
              <div>
                <p className="text-[12px] font-bold tracking-[2px] uppercase" style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>Editar registro</p>
                <p className="text-[28px]" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>Editar Manutenção</p>
              </div>
              <button onClick={() => setEditingLogId(null)} className="w-9 h-9 rounded-full flex items-center justify-center text-[15px]" style={{ background: '#2a2a2e', color: '#aaa' }}>✕</button>
            </div>

            <div className="overflow-y-auto px-8 py-6 flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelStyle}>Data *</p>
                  <input type="date" className={inputClass} style={inputStyle} value={editLogForm.date} onChange={(e) => setEditLogForm(f => ({ ...f, date: e.target.value }))} />
                </div>
                <div>
                  <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelStyle}>KM</p>
                  <input type="number" className={inputClass} style={inputStyle} value={editLogForm.km} onChange={(e) => setEditLogForm(f => ({ ...f, km: e.target.value }))} />
                </div>
              </div>

              <div>
                <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelStyle}>Categoria *</p>
                <select className={inputClass} style={{ ...inputStyle, cursor: 'pointer' }} value={editLogForm.category} onChange={(e) => setEditLogForm(f => ({ ...f, category: e.target.value }))}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelStyle}>Descrição *</p>
                <input className={inputClass} style={inputStyle} value={editLogForm.description} onChange={(e) => setEditLogForm(f => ({ ...f, description: e.target.value }))} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelStyle}>Custo (R$)</p>
                  <input type="number" className={inputClass} style={inputStyle} value={editLogForm.cost} onChange={(e) => setEditLogForm(f => ({ ...f, cost: e.target.value }))} />
                </div>
                <div>
                  <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelStyle}>Oficina</p>
                  <input className={inputClass} style={inputStyle} value={editLogForm.workshop} onChange={(e) => setEditLogForm(f => ({ ...f, workshop: e.target.value }))} />
                </div>
              </div>

              <div>
                <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelStyle}>Observações</p>
                <textarea className={inputClass} style={{ ...inputStyle, resize: 'none' }} rows={2} value={editLogForm.notes} onChange={(e) => setEditLogForm(f => ({ ...f, notes: e.target.value }))} />
              </div>

              <div className="rounded-xl p-4" style={{ background: '#111113', border: '1px solid #1e1e22' }}>
                <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-3" style={{ color: '#ff8533', fontFamily: 'var(--font-barlow-condensed)' }}>📅 Próxima Revisão (opcional)</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelStyle}>KM</p>
                    <input type="number" className={inputClass} style={inputStyle} value={editLogForm.nextKm} onChange={(e) => setEditLogForm(f => ({ ...f, nextKm: e.target.value }))} />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelStyle}>Data</p>
                    <input type="date" className={inputClass} style={inputStyle} value={editLogForm.nextDate} onChange={(e) => setEditLogForm(f => ({ ...f, nextDate: e.target.value }))} />
                  </div>
                </div>
              </div>

              {editLogError && <p className="text-[13px]" style={{ color: '#e03030' }}>{editLogError}</p>}
            </div>

            <div className="px-8 py-5 shrink-0 flex gap-3" style={{ borderTop: '1px solid #1e1e22' }}>
              <button onClick={() => setEditingLogId(null)} className="flex-1 py-3.5 rounded-xl text-[14px] font-bold uppercase tracking-[1px]" style={{ background: '#1a1a1c', color: '#888', fontFamily: 'var(--font-barlow-condensed)' }}>Cancelar</button>
              <button onClick={handleUpdateLog} disabled={savingEditLog} className="flex-1 py-3.5 rounded-xl text-[14px] font-bold uppercase tracking-[1px] disabled:opacity-60 transition-all active:scale-95" style={{ background: '#ff6600', color: '#111', fontFamily: 'var(--font-barlow-condensed)' }}>
                {savingEditLog ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Vehicle Modal */}
      {showEditVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)' }} onClick={() => setShowEditVehicle(false)}>
          <div className="w-full max-w-[780px] rounded-2xl overflow-hidden max-h-[92vh] flex flex-col" style={{ background: '#141416', border: '1px solid #2a2a2e' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-8 py-5 shrink-0" style={{ background: '#111113', borderBottom: '1px solid #2a2a2e' }}>
              <p className="text-[28px]" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>Editar Veículo</p>
              <button onClick={() => setShowEditVehicle(false)} className="w-9 h-9 rounded-full flex items-center justify-center text-[15px]" style={{ background: '#2a2a2e', color: '#aaa' }}>✕</button>
            </div>
            <div className="overflow-y-auto px-8 py-6 flex flex-col gap-5">
              {[
                { field: 'nickname', label: 'Apelido', placeholder: 'Meu Civic' },
                { field: 'brand', label: 'Marca *', placeholder: 'Honda' },
                { field: 'model', label: 'Modelo *', placeholder: 'Civic LXS 1.8' },
                { field: 'year', label: 'Ano *', placeholder: '2018', type: 'number' },
                { field: 'color', label: 'Cor', placeholder: 'Prata' },
                { field: 'plate', label: 'Placa', placeholder: 'ABC-1234' },
                { field: 'currentKm', label: 'KM Atual', placeholder: '87500', type: 'number' },
              ].map(({ field, label, placeholder, type }) => (
                <div key={field}>
                  <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-2" style={labelStyle}>{label}</p>
                  <input type={type ?? 'text'} className={inputClass} style={inputStyle} placeholder={placeholder}
                    value={vehicleForm[field] ?? ''} onChange={(e) => setVehicleForm((f) => ({ ...f, [field]: e.target.value }))} />
                </div>
              ))}

              {/* IPVA / Licenciamento */}
              <div className="rounded-xl p-4" style={{ background: '#0d0d10', border: '1px solid #1e1e22' }}>
                <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-4" style={{ color: '#ff8533', fontFamily: 'var(--font-barlow-condensed)' }}>
                  Impostos e Documentos
                </p>
                {(['ipvaMonth', 'licensingMonth'] as const).map((field) => (
                  <div key={field} className={field === 'licensingMonth' ? 'mt-4' : ''}>
                    <p className="text-[12px] font-bold tracking-[1px] uppercase mb-2" style={labelStyle}>
                      {field === 'ipvaMonth' ? 'Mês do IPVA' : 'Mês do Licenciamento (CRLV)'}
                      <span className="ml-2 text-[11px] normal-case tracking-normal font-normal" style={{ color: '#444' }}>Toque para selecionar / desselecionar</span>
                    </p>
                    <div className="grid grid-cols-6 gap-1.5">
                      {MONTH_NAMES.map((name, i) => {
                        const month = i + 1
                        const active = vehicleForm[field] === String(month)
                        return (
                          <button key={month} type="button"
                            onClick={() => setVehicleForm(f => ({ ...f, [field]: active ? '' : String(month) }))}
                            className="py-2 rounded-lg text-[12px] font-bold transition-all"
                            style={{ background: active ? '#ff6600' : '#18181b', color: active ? '#111' : '#555', border: `1px solid ${active ? '#ff6600' : '#2a2a2e'}`, fontFamily: 'var(--font-barlow-condensed)' }}>
                            {name}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-8 py-5 shrink-0 flex items-center gap-3" style={{ borderTop: '1px solid #1e1e22' }}>
              <button onClick={handleDeleteVehicle} className="px-4 py-3.5 rounded-xl text-[13px] font-bold uppercase tracking-[1px]" style={{ color: '#e03030', background: 'rgba(224,48,48,0.08)', fontFamily: 'var(--font-barlow-condensed)' }}>
                🗑 Excluir
              </button>
              <div className="flex-1" />
              <button onClick={() => setShowEditVehicle(false)} className="px-4 py-3.5 rounded-xl text-[14px] font-bold uppercase tracking-[1px]" style={{ background: '#1a1a1c', color: '#888', fontFamily: 'var(--font-barlow-condensed)' }}>Cancelar</button>
              <button onClick={handleSaveVehicle} disabled={savingVehicle} className="px-6 py-3.5 rounded-xl text-[14px] font-bold uppercase tracking-[1px] disabled:opacity-60 active:scale-95" style={{ background: '#ff6600', color: '#111', fontFamily: 'var(--font-barlow-condensed)' }}>
                {savingVehicle ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
