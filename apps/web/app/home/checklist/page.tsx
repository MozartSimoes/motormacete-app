'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'

interface ChecklistSummary {
  id: string
  title: string
  vehicleType: string
  departureAt: string | null
  shareToken: string | null
  createdAt: string
  vehicle: { brand: string; model: string; year: number; nickname: string | null } | null
  items: { id: string; checked: boolean }[]
  members: { id: string; memberName: string | null }[]
}

const GUEST_KEY = 'mm_guest_checklists'
const VEHICLE_TYPE_LABEL: Record<string, string> = { moto: 'Moto', carro: 'Carro' }

function getGuestIds(): string[] {
  try { return JSON.parse(localStorage.getItem(GUEST_KEY) ?? '[]') } catch { return [] }
}
function addGuestId(id: string) {
  localStorage.setItem(GUEST_KEY, JSON.stringify([...getGuestIds().filter(i => i !== id), id]))
}
function removeGuestId(id: string) {
  localStorage.setItem(GUEST_KEY, JSON.stringify(getGuestIds().filter(i => i !== id)))
}

function ProgressBar({ total, done }: { total: number; done: number }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100)
  const color = pct === 100 ? '#22c55e' : pct >= 60 ? '#ff6600' : '#ef4444'
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: '#666' }}>{done}/{total} itens</span>
        <span style={{ fontSize: 11, color, fontWeight: 700 }}>{pct}%</span>
      </div>
      <div style={{ height: 4, background: '#2a2a32', borderRadius: 2 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 2, transition: 'width 0.3s' }} />
      </div>
    </div>
  )
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function ChecklistListPage() {
  const router = useRouter()
  const [items, setItems] = useState<ChecklistSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [saving, setSaving] = useState(false)
  const [createError, setCreateError] = useState('')
  const [form, setForm] = useState({ title: '', vehicleType: 'moto', departureAt: '', returnAt: '' })

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(async d => {
        const loggedIn = !!d.user
        setIsLoggedIn(loggedIn)

        if (loggedIn) {
          const res = await fetch('/api/checklist')
          const data = res.ok ? await res.json() : []
          setItems(Array.isArray(data) ? data : [])
        } else {
          const guestIds = getGuestIds()
          if (guestIds.length > 0) {
            const res = await fetch(`/api/checklist?ids=${guestIds.join(',')}`)
            const data = res.ok ? await res.json() : []
            setItems(Array.isArray(data) ? data : [])
          }
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) return
    setCreateError('')
    setSaving(true)
    try {
      const res = await fetch('/api/checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const d = await res.json()
        setCreateError(d.error ?? 'Erro ao criar checklist.')
        return
      }
      const created = await res.json()
      if (!isLoggedIn) addGuestId(created.id)
      setShowCreate(false)
      setForm({ title: '', vehicleType: 'moto', departureAt: '', returnAt: '' })
      router.push(`/home/checklist/${created.id}`)
    } catch {
      setCreateError('Erro de conexão. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string, e: React.MouseEvent) {
    e.stopPropagation()
    if (!confirm('Excluir este checklist?')) return
    await fetch(`/api/checklist/${id}`, { method: 'DELETE' })
    if (!isLoggedIn) removeGuestId(id)
    setItems(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0e0e0f' }}>
      <Header />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px' }}>
        {/* Hero */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 900, color: '#f0ede8', margin: 0 }}>
              Checklist pré-viagem
            </h1>
            <p style={{ color: '#666', marginTop: 6, margin: '6px 0 0' }}>
              Verifique tudo antes de partir. Crie um grupo e compartilhe com os colegas.
            </p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            style={{
              background: '#ff6600', color: '#111', border: 'none', borderRadius: 100,
              padding: '10px 22px', fontWeight: 700, fontSize: 14, cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            + Novo checklist
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: '#555', paddingTop: 60 }}>Carregando...</div>
        ) : items.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            border: '1px dashed #2a2a32', borderRadius: 16, color: '#555',
          }}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 12 }}>
              <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>
            </svg>
            <p style={{ fontWeight: 600, color: '#888', margin: '0 0 6px' }}>Nenhum checklist ainda</p>
            <p style={{ fontSize: 13 }}>Crie seu primeiro checklist e prepare-se para a viagem</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {items.map(c => {
              const total = c.items.length
              const done = c.items.filter(i => i.checked).length
              const vehicleLabel = c.vehicle
                ? (c.vehicle.nickname ?? `${c.vehicle.brand} ${c.vehicle.model}`)
                : VEHICLE_TYPE_LABEL[c.vehicleType] ?? c.vehicleType
              return (
                <div
                  key={c.id}
                  onClick={() => router.push(`/home/checklist/${c.id}`)}
                  style={{
                    background: '#111113', border: '1px solid #2a2a32', borderRadius: 14,
                    padding: '18px 20px', cursor: 'pointer', transition: 'border-color 0.15s',
                    position: 'relative',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#ff6600')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#2a2a32')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: '#f0ede8', fontWeight: 700, fontSize: 15, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {c.title}
                      </p>
                      <p style={{ color: '#666', fontSize: 12, margin: '3px 0 0' }}>{vehicleLabel}</p>
                    </div>
                    <button
                      onClick={e => handleDelete(c.id, e)}
                      style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer', padding: '0 0 0 8px', fontSize: 16, lineHeight: 1 }}
                    >
                      ✕
                    </button>
                  </div>

                  {c.departureAt && (
                    <p style={{ color: '#555', fontSize: 11, margin: '6px 0 0' }}>
                      Partida: {formatDate(c.departureAt)}
                    </p>
                  )}

                  <ProgressBar total={total} done={done} />

                  <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                    {c.shareToken && (
                      <span style={{
                        background: 'rgba(34,197,94,0.1)', color: '#22c55e',
                        borderRadius: 20, padding: '2px 9px', fontSize: 10, fontWeight: 700,
                        border: '1px solid rgba(34,197,94,0.25)',
                      }}>
                        GRUPO {c.members.length > 0 ? `· ${c.members.length + 1} membros` : ''}
                      </span>
                    )}
                    {done === total && total > 0 && (
                      <span style={{
                        background: 'rgba(34,197,94,0.1)', color: '#22c55e',
                        borderRadius: 20, padding: '2px 9px', fontSize: 10, fontWeight: 700,
                      }}>
                        ✓ COMPLETO
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Modal criar checklist */}
      {showCreate && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
          }}
          onClick={e => { if (e.target === e.currentTarget) setShowCreate(false) }}
        >
          <form
            onSubmit={handleCreate}
            style={{
              background: '#111113', border: '1px solid #2a2a32', borderRadius: 16,
              padding: 28, width: '100%', maxWidth: 400,
            }}
          >
            <h2 style={{ color: '#f0ede8', fontWeight: 800, margin: '0 0 20px', fontSize: 18 }}>
              Novo checklist
            </h2>

            <label style={{ display: 'block', marginBottom: 14 }}>
              <span style={{ color: '#888', fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
                Título da viagem
              </span>
              <input
                type="text"
                placeholder="Ex: Serra da Canastra — Jun/2026"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                required
                style={{
                  display: 'block', width: '100%', marginTop: 6, padding: '10px 12px',
                  background: '#18181b', border: '1px solid #3a3a42', borderRadius: 8,
                  color: '#f0ede8', fontSize: 14, outline: 'none', boxSizing: 'border-box',
                }}
              />
            </label>

            <label style={{ display: 'block', marginBottom: 14 }}>
              <span style={{ color: '#888', fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
                Tipo de veículo
              </span>
              <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                {['moto', 'carro'].map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, vehicleType: t }))}
                    style={{
                      flex: 1, padding: '9px 0', borderRadius: 8, fontWeight: 700, fontSize: 13,
                      border: `1px solid ${form.vehicleType === t ? '#ff6600' : '#3a3a42'}`,
                      background: form.vehicleType === t ? 'rgba(255,102,0,0.15)' : '#18181b',
                      color: form.vehicleType === t ? '#ff6600' : '#666',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                      {t === 'moto' ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/>
                          <path d="M15 6h-4l-3 6h10l-1-4h-2z"/><path d="M8 12l-2.5 5.5"/><path d="M15 6l2 3.5"/>
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                        </svg>
                      )}
                      {t === 'moto' ? 'Moto' : 'Carro'}
                    </span>
                  </button>
                ))}
              </div>
            </label>

            <div style={{ display: 'flex', gap: 10, marginBottom: 22 }}>
              <label style={{ flex: 1 }}>
                <span style={{ display: 'block', color: '#888', fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
                  Partida
                </span>
                <input
                  type="datetime-local"
                  value={form.departureAt}
                  onChange={e => setForm(f => ({ ...f, departureAt: e.target.value }))}
                  style={{
                    display: 'block', width: '100%', padding: '9px 10px',
                    background: '#18181b', border: '1px solid #3a3a42', borderRadius: 8,
                    color: '#f0ede8', fontSize: 13, outline: 'none', boxSizing: 'border-box',
                    colorScheme: 'dark',
                  }}
                />
              </label>
              <label style={{ flex: 1 }}>
                <span style={{ display: 'block', color: '#888', fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
                  Retorno
                </span>
                <input
                  type="datetime-local"
                  value={form.returnAt}
                  onChange={e => setForm(f => ({ ...f, returnAt: e.target.value }))}
                  style={{
                    display: 'block', width: '100%', padding: '9px 10px',
                    background: '#18181b', border: '1px solid #3a3a42', borderRadius: 8,
                    color: '#f0ede8', fontSize: 13, outline: 'none', boxSizing: 'border-box',
                    colorScheme: 'dark',
                  }}
                />
              </label>
            </div>

            {createError && (
              <p style={{ color: '#ef4444', fontSize: 13, margin: '0 0 12px', textAlign: 'center' }}>
                {createError}
              </p>
            )}

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                onClick={() => { setShowCreate(false); setCreateError('') }}
                style={{
                  flex: 1, padding: '11px 0', borderRadius: 8, fontWeight: 700,
                  background: 'none', border: '1px solid #3a3a42', color: '#666', cursor: 'pointer',
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                style={{
                  flex: 2, padding: '11px 0', borderRadius: 8, fontWeight: 800,
                  background: '#ff6600', border: 'none', color: '#111', cursor: 'pointer',
                  opacity: saving ? 0.6 : 1,
                }}
              >
                {saving ? 'Criando...' : 'Criar checklist'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
