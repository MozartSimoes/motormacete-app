'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Header } from '@/components/layout/Header'

const STATUS_LABEL: Record<string, string> = {
  OPEN:          'Aberta',
  IN_PROGRESS:   'Em andamento',
  WAITING_PARTS: 'Aguardando peças',
  DONE:          'Concluída',
  CLOSED:        'Fechada',
  CANCELLED:     'Cancelada',
}
const STATUS_COLOR: Record<string, string> = {
  OPEN:          '#3b82f6',
  IN_PROGRESS:   '#ff8c00',
  WAITING_PARTS: '#a855f7',
  DONE:          '#22c55e',
  CLOSED:        '#555',
  CANCELLED:     '#ef4444',
}
const ITEM_LABEL: Record<string, string> = { LABOR: 'Mão de obra', PART: 'Peça', OTHER: 'Outro' }

interface Item { id: string; type: string; description: string; quantity: number; unitPrice: number; total: number }
interface OS {
  id: string; number: number; clientName: string; clientPhone: string | null; clientEmail: string | null
  plate: string | null; vehicleBrand: string; vehicleModel: string; vehicleYear: number | null; vehicleKm: number | null; vehicleFuel: string | null
  status: string; diagnosis: string | null; notes: string | null
  items: Item[]; total: number; createdAt: string; closedAt: string | null
  nextMaintenanceDate: string | null
}

const fieldSt = { background: '#18181b', border: '1px solid #333338', color: '#f0ede8', fontFamily: 'var(--font-barlow)' }
const labelSt = { color: '#aaa', fontFamily: 'var(--font-barlow-condensed)' }
const cls = 'w-full px-4 py-3 rounded-xl text-[14px] outline-none transition-colors'

export default function OSDetailPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [os, setOs]         = useState<OS | null>(null)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving]  = useState(false)
  const [error, setError]    = useState('')
  const [form, setForm]      = useState<Partial<OS>>({})
  const [userPlan, setUserPlan] = useState<string>('FREE')
  const [isAdmin, setIsAdmin]   = useState(false)
  const [isTrialing, setIsTrialing] = useState(false)

  const isPro = isAdmin || isTrialing || userPlan === "MECHANIC_PRO" || userPlan === "DRIVER_PRO"

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => {
      if (d.user) { setUserPlan(d.user.plan ?? "FREE"); setIsAdmin(d.user.isAdmin ?? false); setIsTrialing(d.user.isTrialing ?? false) }
    }).catch(() => {})
  }, [])

  useEffect(() => {
    fetch(`/api/mecanico/os/${id}`)
      .then((r) => {
        if (r.status === 401) { router.push('/home'); return null }
        return r.json()
      })
      .then((d) => { if (d?.order) { setOs(d.order); setForm(d.order) } })
  }, [id, router])

  const set = (f: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [f]: e.target.value }))

  async function handleSave() {
    setSaving(true); setError('')
    const res = await fetch(`/api/mecanico/os/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error ?? 'Erro ao salvar.'); setSaving(false); return }
    setOs(data.order); setForm(data.order); setEditing(false); setSaving(false)
  }

  async function handleStatusChange(status: string) {
    const res = await fetch(`/api/mecanico/os/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    const data = await res.json()
    if (res.ok) { setOs(data.order); setForm(data.order) }
  }

  async function handleDelete() {
    if (!confirm('Tem certeza que deseja excluir esta OS? Esta ação não pode ser desfeita.')) return
    await fetch(`/api/mecanico/os/${id}`, { method: 'DELETE' })
    router.push('/mecanico/os')
  }

  const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  const fmtDate = (s: string) => new Date(s).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })

  if (!os) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0e0e0f' }}>
      <p style={{ color: '#555' }}>Carregando...</p>
    </div>
  )

  const cur = editing ? form : os

  return (
    <div className="min-h-screen" style={{ background: '#0e0e0f' }}>
      <Header />
      <div className="max-w-[860px] mx-auto px-4 py-10">

        {/* Title */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="text-[12px] font-bold tracking-[3px] uppercase mb-1"
              style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
              OS #{os.number.toString().padStart(3, '0')}
            </p>
            <h1 className="text-[40px] leading-none mb-1"
              style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
              {os.clientName}
            </h1>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full text-[12px] font-bold uppercase tracking-[0.5px]"
                style={{ background: `${STATUS_COLOR[os.status]}18`, color: STATUS_COLOR[os.status], border: `1px solid ${STATUS_COLOR[os.status]}30` }}>
                {STATUS_LABEL[os.status]}
              </span>
              <span className="text-[13px]" style={{ color: '#555' }}>Aberta em {fmtDate(os.createdAt)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl text-[12px] font-bold uppercase tracking-[1px] transition hover:bg-white/5"
              style={{ border: '1px solid #2a2a2e', color: '#aaa', fontFamily: 'var(--font-barlow-condensed)' }}>
              🖨 Imprimir
            </button>
            {editing ? (
              <>
                <button onClick={() => { setEditing(false); setForm(os) }}
                  className="px-3.5 py-2 rounded-xl text-[12px] font-bold uppercase tracking-[1px]"
                  style={{ background: '#1a1a1c', color: '#888', fontFamily: 'var(--font-barlow-condensed)' }}>
                  Cancelar
                </button>
                <button onClick={handleSave} disabled={saving}
                  className="px-4 py-2 rounded-xl text-[12px] font-bold uppercase tracking-[1px] disabled:opacity-60 active:scale-95"
                  style={{ background: '#ff6600', color: '#111', fontFamily: 'var(--font-barlow-condensed)' }}>
                  {saving ? 'Salvando...' : '💾 Salvar'}
                </button>
              </>
            ) : (
              <button onClick={() => setEditing(true)}
                className="px-4 py-2 rounded-xl text-[12px] font-bold uppercase tracking-[1px] transition hover:bg-white/5"
                style={{ border: '1px solid #2a2a2e', color: '#aaa', fontFamily: 'var(--font-barlow-condensed)' }}>
                ✏️ Editar
              </button>
            )}
          </div>
        </div>

        {error && <p className="mb-4 text-[13px]" style={{ color: '#ef4444' }}>{error}</p>}

        <div className="flex flex-col gap-5">

          {/* Status changer */}
          <section className="rounded-2xl p-5" style={{ background: '#111113', border: '1px solid #1e1e22' }}>
            <p className="text-[12px] font-bold tracking-[1.5px] uppercase mb-3" style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
              Atualizar Status
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(STATUS_LABEL).map(([key, label]) => (
                <button key={key} onClick={() => handleStatusChange(key)}
                  className="px-3.5 py-1.5 rounded-xl text-[12px] font-bold uppercase tracking-[0.5px] transition-colors"
                  style={{
                    background: os.status === key ? STATUS_COLOR[key] : '#18181b',
                    color:      os.status === key ? '#111' : '#555',
                    border:     `1px solid ${os.status === key ? STATUS_COLOR[key] : '#2a2a2e'}`,
                    fontFamily: 'var(--font-barlow-condensed)',
                  }}>
                  {label}
                </button>
              ))}
            </div>
          </section>

          {/* Client + Vehicle */}
          <div className="grid sm:grid-cols-2 gap-5">
            <section className="rounded-2xl p-5" style={{ background: '#111113', border: '1px solid #1e1e22' }}>
              <p className="text-[12px] font-bold tracking-[1.5px] uppercase mb-4" style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
                👤 Cliente
              </p>
              {editing ? (
                <div className="flex flex-col gap-3">
                  <div><p className="text-[11px] font-bold tracking-[1.5px] uppercase mb-1.5" style={labelSt}>Nome *</p>
                    <input className={cls} style={fieldSt} value={form.clientName ?? ''} onChange={set('clientName')} /></div>
                  <div><p className="text-[11px] font-bold tracking-[1.5px] uppercase mb-1.5" style={labelSt}>Telefone</p>
                    <input className={cls} style={fieldSt} value={form.clientPhone ?? ''} onChange={set('clientPhone')} /></div>
                  <div><p className="text-[11px] font-bold tracking-[1.5px] uppercase mb-1.5" style={labelSt}>E-mail</p>
                    <input className={cls} style={fieldSt} value={form.clientEmail ?? ''} onChange={set('clientEmail')} /></div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <p className="text-[16px] font-bold" style={{ color: '#f0ede8' }}>{os.clientName}</p>
                  {os.clientPhone && <p className="text-[13px]" style={{ color: '#888' }}>📞 {os.clientPhone}</p>}
                  {os.clientEmail && <p className="text-[13px]" style={{ color: '#888' }}>✉️ {os.clientEmail}</p>}
                </div>
              )}
            </section>

            <section className="rounded-2xl p-5" style={{ background: '#111113', border: '1px solid #1e1e22' }}>
              <p className="text-[12px] font-bold tracking-[1.5px] uppercase mb-4" style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
                🚗 Veículo
              </p>
              {editing ? (
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { f: 'plate',        label: 'Placa'   },
                    { f: 'vehicleBrand', label: 'Marca *' },
                    { f: 'vehicleModel', label: 'Modelo *'},
                    { f: 'vehicleYear',  label: 'Ano'     },
                    { f: 'vehicleKm',    label: 'KM'      },
                    { f: 'vehicleFuel',  label: 'Combust.'},
                  ].map(({ f, label }) => (
                    <div key={f}>
                      <p className="text-[11px] font-bold tracking-[1.5px] uppercase mb-1.5" style={labelSt}>{label}</p>
                      <input className={cls} style={fieldSt} value={(form as Record<string, string>)[f] ?? ''} onChange={set(f)} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-1.5">
                  <p className="text-[16px] font-bold" style={{ color: '#f0ede8' }}>
                    {os.vehicleBrand} {os.vehicleModel} {os.vehicleYear ?? ''}
                  </p>
                  {os.plate && <p className="text-[13px]" style={{ color: '#888' }}>🔖 Placa: {os.plate}</p>}
                  {os.vehicleKm && <p className="text-[13px]" style={{ color: '#888' }}>📏 {os.vehicleKm.toLocaleString('pt-BR')} km</p>}
                  {os.vehicleFuel && <p className="text-[13px]" style={{ color: '#888' }}>⛽ {os.vehicleFuel}</p>}
                </div>
              )}
            </section>
          </div>

          {/* Diagnosis */}
          <section className="rounded-2xl p-5" style={{ background: '#111113', border: '1px solid #1e1e22' }}>
            <p className="text-[12px] font-bold tracking-[1.5px] uppercase mb-4" style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
              🔧 Diagnóstico
            </p>
            {editing ? (
              <div className="flex flex-col gap-3">
                <textarea className={cls} style={{ ...fieldSt, resize: 'none' }} rows={3}
                  placeholder="Diagnóstico técnico..." value={form.diagnosis ?? ''} onChange={set('diagnosis')} />
                <textarea className={cls} style={{ ...fieldSt, resize: 'none' }} rows={2}
                  placeholder="Observações internas..." value={form.notes ?? ''} onChange={set('notes')} />
                {isPro && (
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[1.5px] mb-2"
                      style={{ color: '#ff8533', fontFamily: 'var(--font-barlow-condensed)' }}>
                      ⭐ Próxima revisão do cliente
                    </p>
                    <input type="date" className={cls} style={{ ...fieldSt }}
                      value={form.nextMaintenanceDate ? form.nextMaintenanceDate.slice(0, 10) : ''}
                      onChange={set('nextMaintenanceDate')} />
                    <p className="text-[11px] mt-1" style={{ color: '#555' }}>
                      Você receberá um alerta por e-mail 7 dias antes desta data.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {os.diagnosis
                  ? <p className="text-[14px] leading-relaxed" style={{ color: '#ccc' }}>{os.diagnosis}</p>
                  : <p className="text-[13px]" style={{ color: '#444' }}>Nenhum diagnóstico registrado.</p>}
                {os.notes && (
                  <div className="rounded-xl px-4 py-3" style={{ background: '#18181b', border: '1px solid #2a2a2e' }}>
                    <p className="text-[11px] font-bold uppercase tracking-[1px] mb-1" style={{ color: '#555', fontFamily: 'var(--font-barlow-condensed)' }}>Obs. internas</p>
                    <p className="text-[13px]" style={{ color: '#888' }}>{os.notes}</p>
                  </div>
                )}
                {isPro && os.nextMaintenanceDate && (
                  <div className="rounded-xl px-4 py-3 flex items-center gap-3"
                    style={{ background: 'rgba(255,102,0,0.07)', border: '1px solid rgba(255,102,0,0.25)' }}>
                    <span>⭐</span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[1px]" style={{ color: '#ff8533', fontFamily: 'var(--font-barlow-condensed)' }}>Próxima revisão do cliente</p>
                      <p className="text-[13px] font-semibold mt-0.5" style={{ color: '#f0ede8' }}>
                        {new Date(os.nextMaintenanceDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Items */}
          <section className="rounded-2xl p-5" style={{ background: '#111113', border: '1px solid #1e1e22' }}>
            <p className="text-[12px] font-bold tracking-[1.5px] uppercase mb-4" style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
              💰 Peças e Serviços
            </p>
            {os.items.length === 0 ? (
              <p className="text-[13px]" style={{ color: '#444' }}>Nenhum item registrado.</p>
            ) : (
              <>
                <div className="hidden sm:grid grid-cols-[110px_1fr_80px_110px_100px] gap-3 mb-2">
                  {['Tipo', 'Descrição', 'Qtd', 'Unitário', 'Total'].map((h) => (
                    <p key={h} className="text-[11px] font-bold uppercase tracking-[1px]"
                      style={{ color: '#555', fontFamily: 'var(--font-barlow-condensed)' }}>{h}</p>
                  ))}
                </div>
                {os.items.map((it, i) => (
                  <div key={it.id}
                    className="grid grid-cols-[110px_1fr_80px_110px_100px] gap-3 py-2.5 items-center"
                    style={{ borderTop: i > 0 ? '1px solid #1a1a1e' : undefined }}>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase w-fit"
                      style={{ background: it.type === 'LABOR' ? 'rgba(255,102,0,0.10)' : 'rgba(59,130,246,0.10)', color: it.type === 'LABOR' ? '#ff8533' : '#60a5fa' }}>
                      {ITEM_LABEL[it.type]}
                    </span>
                    <p className="text-[14px]" style={{ color: '#f0ede8' }}>{it.description}</p>
                    <p className="text-[13px]" style={{ color: '#888' }}>{it.quantity}x</p>
                    <p className="text-[13px]" style={{ color: '#888' }}>{fmt(it.unitPrice)}</p>
                    <p className="text-[14px] font-bold" style={{ color: '#f0ede8' }}>{fmt(it.total)}</p>
                  </div>
                ))}
                <div className="mt-4 pt-4 flex justify-between items-center" style={{ borderTop: '1px solid #2a2a2e' }}>
                  <p className="text-[13px] uppercase tracking-[1px] font-bold" style={{ color: '#555', fontFamily: 'var(--font-barlow-condensed)' }}>Total da OS</p>
                  <p className="text-[28px] font-black" style={{ color: '#ff6600', fontFamily: 'var(--font-bebas-neue)' }}>
                    {fmt(os.total)}
                  </p>
                </div>
              </>
            )}
          </section>

          {/* Danger zone */}
          <div className="flex justify-end pt-2">
            <button onClick={handleDelete}
              className="px-4 py-2.5 rounded-xl text-[12px] font-bold uppercase tracking-[1px] transition hover:bg-red-500/10"
              style={{ color: '#ef4444', border: '1px solid rgba(239,68,68,0.20)', fontFamily: 'var(--font-barlow-condensed)' }}>
              🗑 Excluir OS
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
