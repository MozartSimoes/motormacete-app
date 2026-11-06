'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'

interface ChecklistItem {
  id: string
  category: string
  label: string
  checked: boolean
  order: number
}

interface MemberChecklist {
  id: string
  memberName: string | null
  memberVehicle: string | null
  user: { name: string } | null
  items: ChecklistItem[]
}

interface Checklist {
  id: string
  title: string
  vehicleType: string
  departureAt: string | null
  returnAt: string | null
  shareToken: string | null
  vehicle: { brand: string; model: string; year: number; nickname: string | null } | null
  items: ChecklistItem[]
  members: MemberChecklist[]
}

function toDatetimeLocal(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function formatDatetime(iso: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function groupByCategory(items: ChecklistItem[]) {
  const map = new Map<string, ChecklistItem[]>()
  for (const item of items) {
    if (!map.has(item.category)) map.set(item.category, [])
    map.get(item.category)!.push(item)
  }
  return map
}

function MemberCard({ member }: { member: MemberChecklist }) {
  const total = member.items.length
  const done = member.items.filter(i => i.checked).length
  const pct = total === 0 ? 0 : Math.round((done / total) * 100)
  const color = pct === 100 ? '#22c55e' : pct >= 60 ? '#ff6600' : '#ef4444'
  const name = member.memberName ?? member.user?.name ?? 'Participante'

  return (
    <div style={{ background: '#18181b', border: '1px solid #2a2a32', borderRadius: 12, padding: '14px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ color: '#f0ede8', fontWeight: 700, fontSize: 14, margin: 0 }}>{name}</p>
          {member.memberVehicle && (
            <p style={{ color: '#555', fontSize: 12, margin: '2px 0 0' }}>{member.memberVehicle}</p>
          )}
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ color, fontWeight: 800, fontSize: 14 }}>{done}/{total}</span>
          {pct === 100 && <span style={{ color: '#22c55e', marginLeft: 6 }}>✓</span>}
        </div>
      </div>
      <div style={{ height: 3, background: '#2a2a32', borderRadius: 2, marginTop: 10 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 2, transition: 'width 0.3s' }} />
      </div>
    </div>
  )
}

const INPUT_STYLE: React.CSSProperties = {
  flex: 1, background: '#18181b', border: '1px solid #3a3a42', borderRadius: 8,
  padding: '8px 10px', color: '#f0ede8', fontSize: 13, outline: 'none',
  colorScheme: 'dark', minWidth: 0,
}

export default function ChecklistDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [checklist, setChecklist] = useState<Checklist | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [toggling, setToggling] = useState(false)
  const [shareLoading, setShareLoading] = useState(false)

  // Título inline edit
  const [editTitle, setEditTitle] = useState(false)
  const [titleInput, setTitleInput] = useState('')

  // Datas edit
  const [editDates, setEditDates] = useState(false)
  const [datesForm, setDatesForm] = useState({ departureAt: '', returnAt: '' })
  const [savingDates, setSavingDates] = useState(false)

  useEffect(() => {
    fetch(`/api/checklist/${id}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) {
          setChecklist(data)
          setTitleInput(data.title)
          setDatesForm({
            departureAt: toDatetimeLocal(data.departureAt),
            returnAt: toDatetimeLocal(data.returnAt),
          })
        }
        setLoading(false)
      })
  }, [id])

  async function toggleItem(itemId: string, checked: boolean) {
    if (toggling) return
    setToggling(true)
    setChecklist(prev => {
      if (!prev) return prev
      return { ...prev, items: prev.items.map(i => i.id === itemId ? { ...i, checked } : i) }
    })
    await fetch(`/api/checklist/${id}/items`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([{ id: itemId, checked }]),
    })
    setToggling(false)
  }

  async function toggleShare() {
    if (!checklist) return
    setShareLoading(true)
    const res = await fetch(`/api/checklist/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enableSharing: !checklist.shareToken }),
    })
    if (res.ok) setChecklist(await res.json())
    setShareLoading(false)
  }

  async function saveTitle() {
    if (!checklist || titleInput.trim() === checklist.title) { setEditTitle(false); return }
    const res = await fetch(`/api/checklist/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: titleInput }),
    })
    if (res.ok) setChecklist(await res.json())
    setEditTitle(false)
  }

  async function saveDates(e: React.FormEvent) {
    e.preventDefault()
    setSavingDates(true)
    const res = await fetch(`/api/checklist/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        departureAt: datesForm.departureAt || null,
        returnAt: datesForm.returnAt || null,
      }),
    })
    if (res.ok) {
      const updated = await res.json()
      setChecklist(updated)
      setDatesForm({
        departureAt: toDatetimeLocal(updated.departureAt),
        returnAt: toDatetimeLocal(updated.returnAt),
      })
    }
    setSavingDates(false)
    setEditDates(false)
  }

  function copyLink() {
    if (!checklist?.shareToken) return
    navigator.clipboard.writeText(`${window.location.origin}/viagem/${checklist.shareToken}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0e0e0f' }}>
      <Header />
      <div style={{ textAlign: 'center', color: '#555', paddingTop: 80 }}>Carregando...</div>
    </div>
  )

  if (!checklist) return (
    <div style={{ minHeight: '100vh', background: '#0e0e0f' }}>
      <Header />
      <div style={{ textAlign: 'center', color: '#555', paddingTop: 80 }}>Checklist não encontrado.</div>
    </div>
  )

  const total = checklist.items.length
  const done = checklist.items.filter(i => i.checked).length
  const pct = total === 0 ? 0 : Math.round((done / total) * 100)
  const pctColor = pct === 100 ? '#22c55e' : pct >= 60 ? '#ff6600' : '#ef4444'
  const grouped = groupByCategory(checklist.items)
  const shareUrl = checklist.shareToken
    ? `${typeof window !== 'undefined' ? window.location.origin : 'https://motormacete.com.br'}/viagem/${checklist.shareToken}`
    : ''

  return (
    <div style={{ minHeight: '100vh', background: '#0e0e0f' }}>
      <Header />

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '28px 20px' }}>
        {/* Back + título editável */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <button
            onClick={() => router.push('/home/checklist')}
            style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', padding: 4, fontSize: 20, lineHeight: 1 }}
          >
            ←
          </button>
          {editTitle ? (
            <div style={{ display: 'flex', gap: 8, flex: 1 }}>
              <input
                value={titleInput}
                onChange={e => setTitleInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') saveTitle(); if (e.key === 'Escape') setEditTitle(false) }}
                autoFocus
                style={{
                  flex: 1, background: '#18181b', border: '1px solid #ff6600', borderRadius: 8,
                  padding: '8px 12px', color: '#f0ede8', fontSize: 18, fontWeight: 800, outline: 'none',
                }}
              />
              <button onClick={saveTitle} style={{ background: '#ff6600', border: 'none', borderRadius: 8, color: '#111', fontWeight: 700, padding: '0 14px', cursor: 'pointer' }}>OK</button>
            </div>
          ) : (
            <h1
              onClick={() => setEditTitle(true)}
              style={{ fontSize: 20, fontWeight: 900, color: '#f0ede8', margin: 0, cursor: 'text', flex: 1 }}
              title="Clique para editar"
            >
              {checklist.title}
            </h1>
          )}
        </div>

        {/* Progresso */}
        <div style={{
          background: '#111113', border: '1px solid #2a2a32', borderRadius: 14,
          padding: '18px 20px', marginBottom: 16,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ color: '#888', fontSize: 13 }}>
              {checklist.vehicle
                ? (checklist.vehicle.nickname ?? `${checklist.vehicle.brand} ${checklist.vehicle.model} ${checklist.vehicle.year}`)
                : checklist.vehicleType === 'moto' ? 'Moto' : 'Carro'}
            </span>
            <span style={{ color: pctColor, fontWeight: 800, fontSize: 18 }}>{pct}%</span>
          </div>
          <div style={{ height: 8, background: '#2a2a32', borderRadius: 4 }}>
            <div style={{ height: '100%', width: `${pct}%`, background: pctColor, borderRadius: 4, transition: 'width 0.3s' }} />
          </div>
          <p style={{ color: '#555', fontSize: 12, margin: '8px 0 0' }}>
            {done} de {total} itens verificados
            {pct === 100 && <span style={{ color: '#22c55e', marginLeft: 8, fontWeight: 700 }}>Pronto para partir!</span>}
          </p>
        </div>

        {/* Card de datas */}
        <div style={{
          background: '#111113', border: '1px solid #2a2a32', borderRadius: 14,
          padding: '16px 20px', marginBottom: 28,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: editDates ? 14 : 0 }}>
            <span style={{ color: '#888', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>
              Datas da viagem
            </span>
            <button
              onClick={() => setEditDates(v => !v)}
              style={{ background: 'none', border: 'none', color: '#ff6600', fontSize: 12, fontWeight: 700, cursor: 'pointer', padding: 0 }}
            >
              {editDates ? 'Cancelar' : 'Editar'}
            </button>
          </div>

          {editDates ? (
            <form onSubmit={saveDates}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <label>
                  <span style={{ display: 'block', color: '#666', fontSize: 11, fontWeight: 600, marginBottom: 5, textTransform: 'uppercase', letterSpacing: 1 }}>
                    Partida
                  </span>
                  <input
                    type="datetime-local"
                    value={datesForm.departureAt}
                    onChange={e => setDatesForm(f => ({ ...f, departureAt: e.target.value }))}
                    style={INPUT_STYLE}
                  />
                </label>
                <label>
                  <span style={{ display: 'block', color: '#666', fontSize: 11, fontWeight: 600, marginBottom: 5, textTransform: 'uppercase', letterSpacing: 1 }}>
                    Retorno
                  </span>
                  <input
                    type="datetime-local"
                    value={datesForm.returnAt}
                    onChange={e => setDatesForm(f => ({ ...f, returnAt: e.target.value }))}
                    style={INPUT_STYLE}
                  />
                </label>
                <button
                  type="submit"
                  disabled={savingDates}
                  style={{
                    background: '#ff6600', border: 'none', borderRadius: 8,
                    color: '#111', fontWeight: 800, fontSize: 13,
                    padding: '9px 0', cursor: 'pointer', opacity: savingDates ? 0.6 : 1,
                  }}
                >
                  {savingDates ? 'Salvando...' : 'Salvar datas'}
                </button>
              </div>
            </form>
          ) : (
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 10 }}>
              <div>
                <span style={{ color: '#555', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>Partida</span>
                <p style={{ color: checklist.departureAt ? '#f0ede8' : '#444', fontSize: 13, margin: '3px 0 0', fontWeight: checklist.departureAt ? 600 : 400 }}>
                  {formatDatetime(checklist.departureAt) || 'Não definida'}
                </p>
              </div>
              <div>
                <span style={{ color: '#555', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>Retorno</span>
                <p style={{ color: checklist.returnAt ? '#f0ede8' : '#444', fontSize: 13, margin: '3px 0 0', fontWeight: checklist.returnAt ? 600 : 400 }}>
                  {formatDatetime(checklist.returnAt) || 'Não definido'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Itens por categoria */}
        {Array.from(grouped.entries()).map(([category, catItems]) => (
          <div key={category} style={{ marginBottom: 20 }}>
            <h3 style={{
              color: '#ff6600', fontSize: 11, fontWeight: 700, letterSpacing: 2,
              textTransform: 'uppercase', margin: '0 0 10px',
            }}>
              {category}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {catItems.map(item => (
                <label
                  key={item.id}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '11px 14px',
                    background: item.checked ? 'rgba(34,197,94,0.06)' : '#111113',
                    border: `1px solid ${item.checked ? 'rgba(34,197,94,0.2)' : '#2a2a32'}`,
                    borderRadius: 10, cursor: 'pointer', transition: 'all 0.15s',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={e => toggleItem(item.id, e.target.checked)}
                    style={{ width: 18, height: 18, accentColor: '#22c55e', cursor: 'pointer', flexShrink: 0 }}
                  />
                  <span style={{
                    color: item.checked ? '#22c55e' : '#f0ede8',
                    fontSize: 14,
                    textDecoration: item.checked ? 'line-through' : 'none',
                    opacity: item.checked ? 0.7 : 1,
                  }}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Compartilhar */}
        <div style={{
          background: '#111113', border: '1px solid #2a2a32', borderRadius: 14,
          padding: '18px 20px', marginTop: 32,
        }}>
          <h3 style={{ color: '#f0ede8', fontWeight: 800, fontSize: 15, margin: '0 0 6px' }}>
            Compartilhar com o grupo
          </h3>
          <p style={{ color: '#666', fontSize: 13, margin: '0 0 14px' }}>
            Crie um link e cada motociclista marca seu próprio checklist.
          </p>

          {checklist.shareToken ? (
            <div>
              <div style={{
                display: 'flex', gap: 8, alignItems: 'center',
                background: '#18181b', border: '1px solid #3a3a42', borderRadius: 8, padding: '8px 12px',
                marginBottom: 10,
              }}>
                <span style={{ flex: 1, color: '#888', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {shareUrl}
                </span>
                <button
                  onClick={copyLink}
                  style={{
                    background: copied ? '#22c55e' : '#ff6600', border: 'none', borderRadius: 6,
                    color: '#111', fontWeight: 700, fontSize: 12, padding: '6px 14px', cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  {copied ? '✓ Copiado!' : 'Copiar'}
                </button>
              </div>
              <button
                onClick={toggleShare}
                disabled={shareLoading}
                style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: 12, cursor: 'pointer', padding: 0 }}
              >
                Desativar link
              </button>
            </div>
          ) : (
            <button
              onClick={toggleShare}
              disabled={shareLoading}
              style={{
                background: 'rgba(255,102,0,0.12)', border: '1px solid rgba(255,102,0,0.3)',
                borderRadius: 8, color: '#ff6600', fontWeight: 700, fontSize: 13,
                padding: '10px 20px', cursor: 'pointer', opacity: shareLoading ? 0.6 : 1,
              }}
            >
              {shareLoading ? 'Gerando...' : 'Criar link de grupo'}
            </button>
          )}
        </div>

        {/* Membros */}
        {checklist.members.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ color: '#888', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 12px' }}>
              Membros do grupo ({checklist.members.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {checklist.members.map(m => <MemberCard key={m.id} member={m} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
