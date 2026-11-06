'use client'

import { useState, useEffect, use } from 'react'

interface ChecklistItem {
  id: string
  category: string
  label: string
  checked: boolean
  order: number
}

interface MemberChecklist {
  id: string
  userId: string | null
  memberName: string | null
  memberVehicle: string | null
  user: { name: string } | null
  items: ChecklistItem[]
}

interface GroupChecklist {
  id: string
  title: string
  vehicleType: string
  departureAt: string | null
  shareToken: string
  user: { name: string } | null
  vehicle: { brand: string; model: string; year: number; nickname: string | null } | null
  items: ChecklistItem[]
  members: MemberChecklist[]
}

function groupByCategory(items: ChecklistItem[]) {
  const map = new Map<string, ChecklistItem[]>()
  for (const item of items) {
    if (!map.has(item.category)) map.set(item.category, [])
    map.get(item.category)!.push(item)
  }
  return map
}

function ProgressRing({ pct, size = 48 }: { pct: number; size?: number }) {
  const r = (size - 6) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  const color = pct === 100 ? '#22c55e' : pct >= 60 ? '#ff6600' : '#ef4444'
  return (
    <svg width={size} height={size}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#2a2a32" strokeWidth={4} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={4}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.4s' }}
      />
      <text x={size / 2} y={size / 2 + 5} textAnchor="middle" fill={color} fontSize={10} fontWeight="bold">
        {pct}%
      </text>
    </svg>
  )
}

function MemberCard({ member, isMe, myChecklistId, onItemToggle }: {
  member: MemberChecklist
  isMe: boolean
  myChecklistId?: string
  onItemToggle?: (itemId: string, checked: boolean) => void
}) {
  const [expanded, setExpanded] = useState(isMe)
  const total = member.items.length
  const done = member.items.filter(i => i.checked).length
  const pct = total === 0 ? 0 : Math.round((done / total) * 100)
  const name = member.memberName ?? member.user?.name ?? 'Participante'
  const grouped = groupByCategory(member.items)

  return (
    <div style={{
      background: isMe ? 'rgba(255,102,0,0.06)' : '#111113',
      border: `1px solid ${isMe ? 'rgba(255,102,0,0.3)' : '#2a2a32'}`,
      borderRadius: 14, overflow: 'hidden',
    }}>
      <div
        onClick={() => setExpanded(e => !e)}
        style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', cursor: 'pointer' }}
      >
        <ProgressRing pct={pct} size={44} />
        <div style={{ flex: 1 }}>
          <p style={{ color: '#f0ede8', fontWeight: 700, fontSize: 14, margin: 0 }}>
            {name}
            {isMe && <span style={{ color: '#ff6600', fontSize: 11, marginLeft: 6, fontWeight: 600 }}>você</span>}
          </p>
          {member.memberVehicle && (
            <p style={{ color: '#666', fontSize: 12, margin: '2px 0 0' }}>{member.memberVehicle}</p>
          )}
          <p style={{ color: '#555', fontSize: 11, margin: '3px 0 0' }}>{done}/{total} itens</p>
        </div>
        <span style={{ color: '#444', fontSize: 18 }}>{expanded ? '▲' : '▼'}</span>
      </div>

      {expanded && (
        <div style={{ borderTop: '1px solid #2a2a32', padding: '14px 16px' }}>
          {Array.from(grouped.entries()).map(([category, items]) => (
            <div key={category} style={{ marginBottom: 14 }}>
              <p style={{ color: '#ff6600', fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 8px' }}>
                {category}
              </p>
              {items.map(item => (
                <label
                  key={item.id}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 10px', marginBottom: 3,
                    background: item.checked ? 'rgba(34,197,94,0.08)' : '#18181b',
                    border: `1px solid ${item.checked ? 'rgba(34,197,94,0.2)' : '#2a2a32'}`,
                    borderRadius: 8, cursor: isMe ? 'pointer' : 'default',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    disabled={!isMe}
                    onChange={e => isMe && onItemToggle?.(item.id, e.target.checked)}
                    style={{ width: 16, height: 16, accentColor: '#22c55e', flexShrink: 0 }}
                  />
                  <span style={{ color: item.checked ? '#22c55e' : '#ccc', fontSize: 13, textDecoration: item.checked ? 'line-through' : 'none', opacity: item.checked ? 0.7 : 1 }}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ViagemPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params)
  const [group, setGroup] = useState<GroupChecklist | null>(null)
  const [loading, setLoading] = useState(true)
  const [myMemberId, setMyMemberId] = useState<string | null>(null)
  const [joining, setJoining] = useState(false)
  const [showJoin, setShowJoin] = useState(false)
  const [joinVehicle, setJoinVehicle] = useState('')
  const [sessionUser, setSessionUser] = useState<{ userId: string; name: string } | null>(null)

  useEffect(() => {
    fetch(`/api/checklist/share/${token}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { setGroup(data); setLoading(false) })
  }, [token])

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.ok ? r.json() : null)
      .then(d => setSessionUser(d?.user ?? null))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (group && sessionUser) {
      const mine = group.members.find(m => m.userId === sessionUser.userId)
      if (mine) setMyMemberId(mine.id)
    }
  }, [group, sessionUser])

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault()
    setJoining(true)
    const res = await fetch(`/api/checklist/share/${token}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vehicleName: joinVehicle }),
    })
    if (res.ok) {
      const member = await res.json()
      setMyMemberId(member.id)
      setShowJoin(false)
      // Reload group data
      const r2 = await fetch(`/api/checklist/share/${token}`)
      if (r2.ok) setGroup(await r2.json())
    }
    setJoining(false)
  }

  async function handleItemToggle(itemId: string, checked: boolean) {
    if (!myMemberId) return
    setGroup(prev => {
      if (!prev) return prev
      return {
        ...prev,
        members: prev.members.map(m =>
          m.id === myMemberId
            ? { ...m, items: m.items.map(i => i.id === itemId ? { ...i, checked } : i) }
            : m
        ),
      }
    })
    await fetch(`/api/checklist/${myMemberId}/items`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([{ id: itemId, checked }]),
    })
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0e0e0f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: '#555' }}>Carregando...</span>
    </div>
  )

  if (!group) return (
    <div style={{ minHeight: '100vh', background: '#0e0e0f', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
      <span style={{ fontSize: 40 }}>🏍️</span>
      <p style={{ color: '#888', fontWeight: 600 }}>Grupo não encontrado</p>
      <p style={{ color: '#555', fontSize: 13 }}>O link pode ter expirado ou sido desativado.</p>
    </div>
  )

  const leaderName = group.user?.name ?? 'Organizador'
  const leaderTotal = group.items.length
  const leaderDone = group.items.filter(i => i.checked).length
  const leaderPct = leaderTotal === 0 ? 0 : Math.round((leaderDone / leaderTotal) * 100)
  const totalParticipants = 1 + group.members.length

  return (
    <div style={{ minHeight: '100vh', background: '#0e0e0f' }}>
      {/* Header */}
      <div style={{ background: '#ff6600', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#111', fontWeight: 900, fontSize: 16, letterSpacing: 1 }}>MOTORMACETE</span>
        <span style={{ color: 'rgba(0,0,0,0.6)', fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>Checklist pré-viagem</span>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '28px 20px' }}>
        {/* Trip info */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ color: '#f0ede8', fontWeight: 900, fontSize: 24, margin: '0 0 4px' }}>{group.title}</h1>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            {group.departureAt && (
              <span style={{ color: '#888', fontSize: 13 }}>
                Partida: {new Date(group.departureAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </span>
            )}
            <span style={{ color: '#555', fontSize: 13 }}>
              {totalParticipants} {totalParticipants === 1 ? 'participante' : 'participantes'}
            </span>
          </div>
        </div>

        {/* Overall progress */}
        <div style={{
          background: '#111113', border: '1px solid #2a2a32', borderRadius: 14,
          padding: '16px 20px', marginBottom: 24,
          display: 'grid', gridTemplateColumns: `repeat(${totalParticipants}, 1fr)`, gap: 12,
        }}>
          {/* Leader progress mini */}
          <div style={{ textAlign: 'center' }}>
            <ProgressRing pct={leaderPct} size={40} />
            <p style={{ color: '#888', fontSize: 10, margin: '4px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {leaderName.split(' ')[0]}
            </p>
          </div>
          {group.members.map(m => {
            const t = m.items.length
            const d = m.items.filter(i => i.checked).length
            const p = t === 0 ? 0 : Math.round((d / t) * 100)
            const n = m.memberName ?? m.user?.name ?? '?'
            return (
              <div key={m.id} style={{ textAlign: 'center' }}>
                <ProgressRing pct={p} size={40} />
                <p style={{ color: '#888', fontSize: 10, margin: '4px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {n.split(' ')[0]}
                </p>
              </div>
            )
          })}
        </div>

        {/* Leader card */}
        <div style={{ marginBottom: 10 }}>
          <p style={{ color: '#555', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 8px' }}>
            Organizador
          </p>
          <div style={{ background: '#111113', border: '1px solid #2a2a32', borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <ProgressRing pct={leaderPct} size={44} />
              <div>
                <p style={{ color: '#f0ede8', fontWeight: 700, fontSize: 14, margin: 0 }}>{leaderName}</p>
                {group.vehicle && (
                  <p style={{ color: '#666', fontSize: 12, margin: '2px 0 0' }}>
                    {group.vehicle.nickname ?? `${group.vehicle.brand} ${group.vehicle.model}`}
                  </p>
                )}
                <p style={{ color: '#555', fontSize: 11, margin: '3px 0 0' }}>{leaderDone}/{leaderTotal} itens</p>
              </div>
            </div>
          </div>
        </div>

        {/* Members */}
        {group.members.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <p style={{ color: '#555', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', margin: '16px 0 8px' }}>
              Participantes ({group.members.length})
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {group.members.map(m => (
                <MemberCard
                  key={m.id}
                  member={m}
                  isMe={m.id === myMemberId}
                  myChecklistId={myMemberId ?? undefined}
                  onItemToggle={handleItemToggle}
                />
              ))}
            </div>
          </div>
        )}

        {/* Join CTA */}
        {sessionUser && !myMemberId && (
          <div style={{
            background: 'rgba(255,102,0,0.08)', border: '1px solid rgba(255,102,0,0.25)',
            borderRadius: 14, padding: '20px', textAlign: 'center', marginTop: 16,
          }}>
            <p style={{ color: '#f0ede8', fontWeight: 700, margin: '0 0 6px' }}>Você está nessa viagem?</p>
            <p style={{ color: '#666', fontSize: 13, margin: '0 0 14px' }}>Entre no grupo e marque seu próprio checklist.</p>
            <button
              onClick={() => setShowJoin(true)}
              style={{
                background: '#ff6600', border: 'none', borderRadius: 100,
                color: '#111', fontWeight: 800, fontSize: 14, padding: '11px 28px', cursor: 'pointer',
              }}
            >
              Entrar no grupo
            </button>
          </div>
        )}

        {!sessionUser && (
          <div style={{
            background: '#111113', border: '1px solid #2a2a32',
            borderRadius: 14, padding: '20px', textAlign: 'center', marginTop: 16,
          }}>
            <p style={{ color: '#888', fontSize: 13, margin: '0 0 10px' }}>
              Faça login para entrar no grupo e marcar seu checklist.
            </p>
            <a
              href={`/auth/login?next=/viagem/${token}`}
              style={{
                display: 'inline-block', background: '#ff6600', borderRadius: 100,
                color: '#111', fontWeight: 800, fontSize: 14, padding: '11px 28px',
                textDecoration: 'none',
              }}
            >
              Entrar / Criar conta
            </a>
          </div>
        )}
      </div>

      {/* Join modal */}
      {showJoin && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
          onClick={e => { if (e.target === e.currentTarget) setShowJoin(false) }}
        >
          <form
            onSubmit={handleJoin}
            style={{ background: '#111113', border: '1px solid #2a2a32', borderRadius: 16, padding: 28, width: '100%', maxWidth: 380 }}
          >
            <h2 style={{ color: '#f0ede8', fontWeight: 800, fontSize: 18, margin: '0 0 6px' }}>Entrar no grupo</h2>
            <p style={{ color: '#666', fontSize: 13, margin: '0 0 20px' }}>Sua moto e nome serão exibidos para os outros participantes.</p>

            <label style={{ display: 'block', marginBottom: 20 }}>
              <span style={{ color: '#888', fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
                Sua moto (opcional)
              </span>
              <input
                type="text"
                placeholder="Ex: Honda CB 500 2022"
                value={joinVehicle}
                onChange={e => setJoinVehicle(e.target.value)}
                style={{
                  display: 'block', width: '100%', marginTop: 6, padding: '10px 12px',
                  background: '#18181b', border: '1px solid #3a3a42', borderRadius: 8,
                  color: '#f0ede8', fontSize: 14, outline: 'none', boxSizing: 'border-box',
                }}
              />
            </label>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                onClick={() => setShowJoin(false)}
                style={{ flex: 1, padding: '11px 0', borderRadius: 8, fontWeight: 700, background: 'none', border: '1px solid #3a3a42', color: '#666', cursor: 'pointer' }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={joining}
                style={{ flex: 2, padding: '11px 0', borderRadius: 8, fontWeight: 800, background: '#ff6600', border: 'none', color: '#111', cursor: 'pointer', opacity: joining ? 0.6 : 1 }}
              >
                {joining ? 'Entrando...' : 'Confirmar'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
