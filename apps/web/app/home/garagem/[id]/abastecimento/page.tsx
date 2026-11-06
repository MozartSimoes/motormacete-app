'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Area, AreaChart,
} from 'recharts'

// ── Types ─────────────────────────────────────────────────────────────────────
interface FuelLog {
  id: string
  date: string
  odometer: number
  liters: number
  pricePerLiter: number | null
  totalCost: number | null
  fuelType: string | null
  fullTank: boolean
  station: string | null
  notes: string | null
  kmPerLiter: number | null
}

interface Stats {
  avgKmL: number | null
  bestKmL: number | null
  worstKmL: number | null
  totalLiters: number
  totalSpent: number
  avgPricePerLiter: number | null
  count: number
}

interface Vehicle {
  id: string; nickname: string | null; brand: string; model: string
  year: number; fuelType: string | null; currentKm: number | null; vehicleType: string
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const FUEL_TYPES = ['Gasolina', 'Gasolina Aditivada', 'Etanol', 'Diesel', 'GNV', 'Elétrico']
const FUEL_COLORS: Record<string, string> = {
  Gasolina: '#f59e0b', 'Gasolina Aditivada': '#fb923c', Etanol: '#22c55e',
  Diesel: '#60a5fa', GNV: '#a78bfa', Elétrico: '#34d399',
}
const FIPE_TO_LABEL: Record<string, string> = {
  FLEX: 'Etanol', GASOLINA: 'Gasolina', DIESEL: 'Diesel',
  ELETRICO: 'Elétrico', HIBRIDO: 'Gasolina Aditivada',
}

function fmt(n: number | null, decimals = 2) { return n != null ? n.toFixed(decimals).replace('.', ',') : '—' }
function fmtBRL(n: number) { return 'R$ ' + n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }
function fmtDate(s: string) { return new Date(s).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: '2-digit' }) }
function fmtKm(n: number) { return n.toLocaleString('pt-BR') + ' km' }

// ── StatCard ──────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className="rounded-xl p-4" style={{ background: '#111113', border: '1px solid #1e1e22' }}>
      <p className="text-[10px] uppercase tracking-[1.5px] mb-1" style={{ color: '#555' }}>{label}</p>
      <p className="text-[22px] font-black leading-none" style={{ color: accent ? '#ff6600' : '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>{value}</p>
      {sub && <p className="text-[11px] mt-0.5" style={{ color: '#555' }}>{sub}</p>}
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AbastecimentoPage() {
  const router = useRouter()
  const params = useParams()
  const vehicleId = params.id as string

  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [logs, setLogs] = useState<FuelLog[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // form
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    odometer: '', liters: '', pricePerLiter: '', totalCost: '',
    fuelType: '', fullTank: true, station: '', notes: '',
  })

  const load = useCallback(() => {
    Promise.all([
      fetch(`/api/garage/${vehicleId}`).then(r => r.json()),
      fetch(`/api/garage/${vehicleId}/fuel-logs`).then(r => r.json()),
    ]).then(([vData, fData]) => {
      if (vData.vehicle) {
        setVehicle(vData.vehicle)
        const defaultFuel = FIPE_TO_LABEL[vData.vehicle.fuelType ?? ''] ?? 'Gasolina'
        setForm(f => ({ ...f, fuelType: f.fuelType || defaultFuel }))
      }
      if (fData.logs) { setLogs(fData.logs); setStats(fData.stats) }
    }).finally(() => setLoading(false))
  }, [vehicleId])

  useEffect(() => { load() }, [load])

  const sel = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
  }

  // auto-calc totalCost when pricePerLiter + liters are set
  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const price = e.target.value
    setForm(f => ({
      ...f,
      pricePerLiter: price,
      totalCost: price && f.liters ? (Number(price) * Number(f.liters)).toFixed(2) : f.totalCost,
    }))
  }
  function handleLitersChange(e: React.ChangeEvent<HTMLInputElement>) {
    const liters = e.target.value
    setForm(f => ({
      ...f,
      liters,
      totalCost: liters && f.pricePerLiter ? (Number(liters) * Number(f.pricePerLiter)).toFixed(2) : f.totalCost,
    }))
  }
  function handleTotalCostChange(e: React.ChangeEvent<HTMLInputElement>) {
    const total = e.target.value
    setForm(f => ({
      ...f,
      totalCost: total,
      pricePerLiter: total && f.liters ? (Number(total) / Number(f.liters)).toFixed(3) : f.pricePerLiter,
    }))
  }

  async function handleSave() {
    if (!form.date || !form.odometer || !form.liters) {
      setError('Data, odômetro e litros são obrigatórios.'); return
    }
    setSaving(true); setError('')
    const res = await fetch(`/api/garage/${vehicleId}/fuel-logs`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error ?? 'Erro ao salvar.'); setSaving(false); return }
    setForm(f => ({ ...f, date: new Date().toISOString().slice(0, 10), odometer: '', liters: '', pricePerLiter: '', totalCost: '', station: '', notes: '' }))
    load()
    setSaving(false)
  }

  async function handleDelete(logId: string) {
    setDeletingId(logId)
    await fetch(`/api/garage/${vehicleId}/fuel-logs/${logId}`, { method: 'DELETE' })
    setLogs(prev => prev.filter(l => l.id !== logId))
    load()
    setDeletingId(null)
  }

  // chart data: chronological order
  const chartData = [...logs]
    .sort((a, b) => a.odometer - b.odometer)
    .filter(l => l.kmPerLiter !== null)
    .map(l => ({
      date: fmtDate(l.date),
      kmL: parseFloat((l.kmPerLiter ?? 0).toFixed(2)),
      price: l.pricePerLiter ? parseFloat(l.pricePerLiter.toFixed(3)) : null,
    }))

  const avgKmL = stats?.avgKmL ?? null

  const inputClass = 'w-full px-3 py-3 rounded-xl text-[14px] outline-none transition-colors'
  const inputStyle = { background: '#18181b', border: '1px solid #2a2a2e', color: '#f0ede8' }
  const labelStyle = { color: '#666', fontSize: 11, fontFamily: 'var(--font-barlow-condensed)', textTransform: 'uppercase' as const, letterSpacing: '1px', fontWeight: 700 }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0e0e0f' }}>
      <div className="w-6 h-6 rounded-full border-2" style={{ borderColor: '#2a2a2e', borderTopColor: '#ff6600', animation: 'spin 0.8s linear infinite' }} />
    </div>
  )

  const vehicleTitle = vehicle ? (vehicle.nickname ?? `${vehicle.brand} ${vehicle.model}`) : '...'

  return (
    <div className="min-h-screen" style={{ background: '#0e0e0f' }}>
      <Header />

      <div className="max-w-[980px] mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <button onClick={() => router.push('/home/garagem')} className="text-[11px] font-bold uppercase tracking-[1px] transition hover:text-white" style={{ color: '#444', fontFamily: 'var(--font-barlow-condensed)' }}>Garagem</button>
          <span style={{ color: '#333' }}>›</span>
          <button onClick={() => router.push(`/home/garagem/${vehicleId}`)} className="text-[11px] font-bold uppercase tracking-[1px] transition hover:text-white" style={{ color: '#444', fontFamily: 'var(--font-barlow-condensed)' }}>{vehicleTitle}</button>
          <span style={{ color: '#333' }}>›</span>
          <span className="text-[11px] font-bold uppercase tracking-[1px]" style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>Abastecimentos</span>
        </div>

        {/* Vehicle Header */}
        <div className="rounded-2xl px-6 py-5 mb-6 flex items-center justify-between gap-4" style={{ background: '#141416', border: '1px solid #2a2a2e' }}>
          <div className="flex items-center gap-3">
            <span style={{ color: '#ff6600' }}>
              {vehicle?.vehicleType === 'moto'
                ? <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h-5l-3 7"/><path d="m9 6 2 7h7"/><path d="M12 6V3"/></svg>
                : <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22V9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v13"/><path d="M13 11h4a2 2 0 0 1 2 2v9"/><path d="M3 22h18"/><path d="M15 22V9"/></svg>
              }
            </span>
            <div>
              <h1 className="text-[28px] leading-none" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
                Abastecimentos — {vehicleTitle}
              </h1>
              {vehicle && <p className="text-[12px] mt-0.5" style={{ color: '#555' }}>{vehicle.brand} {vehicle.model} · {vehicle.year}</p>}
            </div>
          </div>
          {vehicle?.currentKm && (
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[1px]" style={{ color: '#555' }}>Odômetro atual</p>
              <p className="text-[20px] font-black" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>{fmtKm(vehicle.currentKm)}</p>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        {stats && stats.count > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            <StatCard label="Média km/L" value={fmt(stats.avgKmL, 1) + ' km/L'} accent />
            <StatCard label="Melhor fill" value={fmt(stats.bestKmL, 1) + ' km/L'} sub="abastecimento" />
            <StatCard label="Pior fill" value={fmt(stats.worstKmL, 1) + ' km/L'} sub="abastecimento" />
            <StatCard label="Total litros" value={fmt(stats.totalLiters, 0) + ' L'} sub={`${stats.count} abastec.`} />
            <StatCard label="Total gasto" value={'R$ ' + fmt(stats.totalSpent, 0)} />
            <StatCard label="Preço médio" value={'R$ ' + fmt(stats.avgPricePerLiter, 3) + '/L'} />
          </div>
        )}

        {/* Charts */}
        {chartData.length >= 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Consumo km/L */}
            <div className="rounded-2xl p-5" style={{ background: '#141416', border: '1px solid #2a2a2e' }}>
              <p className="text-[11px] font-bold uppercase tracking-[2px] mb-4" style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
                Consumo km/L
              </p>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradKmL" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff6600" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ff6600" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e1e22" vertical={false} />
                  <XAxis dataKey="date" tick={{ fill: '#444', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#444', fontSize: 10 }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                  {avgKmL && <ReferenceLine y={avgKmL} stroke="#555" strokeDasharray="4 4" label={{ value: `méd ${fmt(avgKmL, 1)}`, fill: '#555', fontSize: 10 }} />}
                  <Tooltip
                    formatter={(v) => [`${fmt(Number(v ?? 0), 2)} km/L`, 'Consumo']}
                    contentStyle={{ background: '#1a1a1c', border: '1px solid #2a2a2e', borderRadius: 8, color: '#f0ede8', fontSize: 12 }}
                  />
                  <Area type="monotone" dataKey="kmL" stroke="#ff6600" strokeWidth={2} fill="url(#gradKmL)" dot={{ fill: '#ff6600', r: 3 }} activeDot={{ r: 5 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Preço por litro */}
            {chartData.some(d => d.price) && (
              <div className="rounded-2xl p-5" style={{ background: '#141416', border: '1px solid #2a2a2e' }}>
                <p className="text-[11px] font-bold uppercase tracking-[2px] mb-4" style={{ color: '#3b82f6', fontFamily: 'var(--font-barlow-condensed)' }}>
                  Preço por Litro (R$)
                </p>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e1e22" vertical={false} />
                    <XAxis dataKey="date" tick={{ fill: '#444', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#444', fontSize: 10 }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                    <Tooltip
                      formatter={(v) => [`R$ ${fmt(Number(v ?? 0), 3)}/L`, 'Preço']}
                      contentStyle={{ background: '#1a1a1c', border: '1px solid #2a2a2e', borderRadius: 8, color: '#f0ede8', fontSize: 12 }}
                    />
                    <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 3 }} activeDot={{ r: 5 }} connectNulls />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">

          {/* ── FORM ── */}
          <div className="rounded-2xl overflow-hidden" style={{ background: '#141416', border: '1px solid #2a2a2e' }}>
            <div className="px-6 py-4" style={{ background: '#111113', borderBottom: '1px solid #2a2a2e' }}>
              <p className="text-[11px] font-bold uppercase tracking-[2px]" style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>Novo abastecimento</p>
              <p className="text-[22px] leading-tight" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>Registrar Abastecimento</p>
            </div>

            <div className="p-6 flex flex-col gap-4">
              {/* Data + Odômetro */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p style={labelStyle} className="mb-1.5">Data *</p>
                  <input type="date" className={inputClass} style={inputStyle} value={form.date} onChange={sel('date')} />
                </div>
                <div>
                  <p style={labelStyle} className="mb-1.5">Odômetro (km) *</p>
                  <input type="number" className={inputClass} style={inputStyle} placeholder="87.500" value={form.odometer} onChange={sel('odometer')} />
                </div>
              </div>

              {/* Litros */}
              <div>
                <p style={labelStyle} className="mb-1.5">Litros abastecidos *</p>
                <input type="number" step="0.01" className={inputClass} style={inputStyle} placeholder="40,00" value={form.liters} onChange={handleLitersChange} />
              </div>

              {/* Preço + Total */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p style={labelStyle} className="mb-1.5">Preço/L (R$)</p>
                  <input type="number" step="0.001" className={inputClass} style={inputStyle} placeholder="5,899" value={form.pricePerLiter} onChange={handlePriceChange} />
                </div>
                <div>
                  <p style={labelStyle} className="mb-1.5">Total (R$)</p>
                  <input type="number" step="0.01" className={inputClass} style={inputStyle} placeholder="235,96" value={form.totalCost} onChange={handleTotalCostChange} />
                </div>
              </div>

              {/* Combustível */}
              <div>
                <p style={labelStyle} className="mb-1.5">Tipo de combustível</p>
                <select className={inputClass} style={{ ...inputStyle, cursor: 'pointer' }} value={form.fuelType} onChange={sel('fuelType')}>
                  {FUEL_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>

              {/* Posto */}
              <div>
                <p style={labelStyle} className="mb-1.5">Posto</p>
                <input className={inputClass} style={inputStyle} placeholder="Posto BR Centro" value={form.station} onChange={sel('station')} />
              </div>

              {/* Tanque cheio */}
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div
                  className="w-10 h-5 rounded-full relative transition-colors"
                  style={{ background: form.fullTank ? '#ff6600' : '#2a2a2e' }}
                  onClick={() => setForm(f => ({ ...f, fullTank: !f.fullTank }))}
                >
                  <div className="absolute top-0.5 w-4 h-4 rounded-full transition-all" style={{ background: '#fff', left: form.fullTank ? 22 : 2 }} />
                </div>
                <span className="text-[13px]" style={{ color: '#aaa' }}>
                  Tanque cheio <span className="text-[11px]" style={{ color: '#555' }}>(necessário para calcular consumo)</span>
                </span>
              </label>

              {/* Observações */}
              <div>
                <p style={labelStyle} className="mb-1.5">Observações</p>
                <input className={inputClass} style={inputStyle} placeholder="Ex: viagem SP-RJ, chuva..." value={form.notes} onChange={sel('notes')} />
              </div>

              {error && <p className="text-[12px] px-3 py-2 rounded-lg" style={{ color: '#fca5a5', background: 'rgba(220,38,38,0.1)' }}>{error}</p>}

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full py-4 rounded-xl font-bold uppercase tracking-[1.5px] text-[14px] transition-all active:scale-95 disabled:opacity-60"
                style={{ background: '#ff6600', color: '#111', fontFamily: 'var(--font-barlow-condensed)' }}
              >
                {saving ? 'Salvando...' : (
                  <span className="flex items-center justify-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22V9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v13"/><path d="M13 11h4a2 2 0 0 1 2 2v9"/><path d="M3 22h18"/><path d="M15 22V9"/></svg>
                    Registrar Abastecimento
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* ── LOG LIST ── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[22px]" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
                Histórico ({logs.length})
              </h2>
            </div>

            {logs.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 rounded-2xl py-16" style={{ background: '#141416', border: '1px solid #2a2a2e' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22V9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v13"/><path d="M13 11h4a2 2 0 0 1 2 2v9"/><path d="M3 22h18"/><path d="M15 22V9"/></svg>
                <p className="text-[18px]" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>Nenhum abastecimento</p>
                <p className="text-[13px]" style={{ color: '#555' }}>Registre o primeiro para começar a acompanhar o consumo.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {logs.map((log) => {
                  const fuelColor = FUEL_COLORS[log.fuelType ?? ''] ?? '#ff6600'
                  return (
                    <div key={log.id} className="rounded-xl px-4 py-3 flex items-center gap-3" style={{ background: '#141416', border: '1px solid #2a2a2e' }}>
                      {/* Fuel dot */}
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: fuelColor }} />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded" style={{ background: `${fuelColor}20`, color: fuelColor, fontFamily: 'var(--font-barlow-condensed)' }}>
                            {log.fuelType ?? 'Combustível'}
                          </span>
                          {!log.fullTank && <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: '#1e1e22', color: '#666' }}>parcial</span>}
                          <span className="text-[13px] font-semibold" style={{ color: '#f0ede8' }}>
                            {log.liters.toFixed(1).replace('.', ',')} L
                          </span>
                          {log.station && <span className="text-[12px] truncate" style={{ color: '#666' }}>{log.station}</span>}
                        </div>
                        <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                          <span className="text-[11px]" style={{ color: '#555' }}>{fmtDate(log.date)}</span>
                          <span className="text-[11px]" style={{ color: '#555' }}>{fmtKm(log.odometer)}</span>
                          {log.pricePerLiter && <span className="text-[11px]" style={{ color: '#555' }}>R$ {fmt(log.pricePerLiter, 3)}/L</span>}
                        </div>
                      </div>

                      {/* Right: consumption + cost */}
                      <div className="text-right shrink-0 flex flex-col items-end gap-1">
                        {log.kmPerLiter !== null ? (
                          <span className="text-[16px] font-black" style={{ color: '#ff6600', fontFamily: 'var(--font-bebas-neue)' }}>
                            {fmt(log.kmPerLiter, 1)} km/L
                          </span>
                        ) : (
                          <span className="text-[11px]" style={{ color: '#444' }}>—</span>
                        )}
                        {log.totalCost && (
                          <span className="text-[12px] font-bold" style={{ color: '#888' }}>{fmtBRL(log.totalCost)}</span>
                        )}
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(log.id)}
                        disabled={deletingId === log.id}
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-[14px] transition hover:bg-red-500/10"
                        style={{ color: '#555', border: '1px solid #2a2a2e' }}
                        title="Excluir"
                      >
                        {deletingId === log.id ? '…' : '×'}
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
