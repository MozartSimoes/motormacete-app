import { useState, useEffect, useCallback } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  ActivityIndicator, RefreshControl, Modal, TextInput,
  Pressable, Alert, Share,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { apiFetch } from '../../lib/api'

const DEFAULT_ITEMS: Record<string, { category: string; items: string[] }[]> = {
  moto: [
    { category: 'Documentos', items: ['CNH', 'CRLV', 'Seguro obrigatório'] },
    { category: 'Pneus', items: ['Calibragem dianteiro', 'Calibragem traseiro', 'Desgaste dos pneus'] },
    { category: 'Motor', items: ['Nível de óleo', 'Corrente/transmissão', 'Nível do radiador'] },
    { category: 'Elétrica', items: ['Faróis dianteiro e traseiro', 'Pisca-pisca', 'Bateria'] },
    { category: 'Freios', items: ['Pastilhas dianteiras', 'Pastilhas traseiras', 'Fluido de freio'] },
    { category: 'Equipamentos', items: ['Capacete', 'Luvas', 'Jaqueta/proteções', 'Bota'] },
    { category: 'Bagagem', items: ['Fixação de baú/alforje', 'Peso distribuído'] },
  ],
  carro: [
    { category: 'Documentos', items: ['CNH', 'CRLV', 'Seguro obrigatório'] },
    { category: 'Pneus', items: ['Calibragem (incluindo estepe)', 'Desgaste', 'Fissuras/danos'] },
    { category: 'Motor', items: ['Nível de óleo', 'Nível do radiador', 'Nível da direção hidráulica'] },
    { category: 'Elétrica', items: ['Faróis', 'Lanternas', 'Pisca-pisca', 'Bateria'] },
    { category: 'Freios', items: ['Pastilhas', 'Fluido de freio'] },
    { category: 'Bagagem', items: ['Carga segura', 'Limite de peso respeitado'] },
  ],
}

interface ChecklistItem {
  id: string
  category: string
  label: string
  checked: boolean
  order: number
}

interface MemberSummary {
  id: string
  memberName: string | null
  user: { name: string } | null
  items: { id: string; checked: boolean }[]
}

interface ChecklistSummary {
  id: string
  title: string
  vehicleType: string
  departureAt: string | null
  shareToken: string | null
  items: { id: string; checked: boolean }[]
  members: MemberSummary[]
}

interface ChecklistDetail extends ChecklistSummary {
  items: ChecklistItem[]
}

function groupByCategory(items: ChecklistItem[]) {
  const map = new Map<string, ChecklistItem[]>()
  for (const item of items) {
    if (!map.has(item.category)) map.set(item.category, [])
    map.get(item.category)!.push(item)
  }
  return map
}

function ProgressBar({ total, done }: { total: number; done: number }) {
  const pct = total === 0 ? 0 : (done / total) * 100
  const color = pct === 100 ? '#22c55e' : pct >= 60 ? '#ff6600' : '#ef4444'
  return (
    <View style={{ marginTop: 8 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
        <Text style={{ color: '#666', fontSize: 11 }}>{done}/{total} itens</Text>
        <Text style={{ color, fontSize: 11, fontWeight: '700' }}>{Math.round(pct)}%</Text>
      </View>
      <View style={{ height: 4, backgroundColor: '#2a2a32', borderRadius: 2 }}>
        <View style={{ height: 4, width: `${pct}%` as any, backgroundColor: color, borderRadius: 2 }} />
      </View>
    </View>
  )
}

export default function ChecklistScreen() {
  const [checklists, setChecklists] = useState<ChecklistSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [saving, setSaving] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newType, setNewType] = useState<'moto' | 'carro'>('moto')
  const [newDeparture, setNewDeparture] = useState('')

  const [detailId, setDetailId] = useState<string | null>(null)
  const [detail, setDetail] = useState<ChecklistDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)

  const loadChecklists = useCallback(async () => {
    try {
      const res = await apiFetch('/api/checklist')
      const data = await res.json()
      setChecklists(Array.isArray(data) ? data : [])
    } catch {}
    setLoading(false)
    setRefreshing(false)
  }, [])

  useEffect(() => { loadChecklists() }, [loadChecklists])

  const loadDetail = useCallback(async (id: string) => {
    setDetailLoading(true)
    try {
      const res = await apiFetch(`/api/checklist/${id}`)
      if (res.ok) setDetail(await res.json())
    } catch {}
    setDetailLoading(false)
  }, [])

  async function handleCreate() {
    if (!newTitle.trim()) { Alert.alert('Informe um título'); return }
    setSaving(true)
    try {
      const res = await apiFetch('/api/checklist', {
        method: 'POST',
        body: JSON.stringify({ title: newTitle, vehicleType: newType, departureAt: newDeparture || null }),
      })
      if (res.ok) {
        const created = await res.json()
        setShowCreate(false)
        setNewTitle(''); setNewType('moto'); setNewDeparture('')
        await loadChecklists()
        setDetailId(created.id)
        loadDetail(created.id)
      }
    } catch {}
    setSaving(false)
  }

  async function handleToggleItem(checklistId: string, itemId: string, checked: boolean) {
    setDetail(prev => {
      if (!prev) return prev
      return { ...prev, items: prev.items.map(i => i.id === itemId ? { ...i, checked } : i) }
    })
    await apiFetch(`/api/checklist/${checklistId}/items`, {
      method: 'PATCH',
      body: JSON.stringify([{ id: itemId, checked }]),
    })
    // Update summary list too
    setChecklists(prev => prev.map(c => {
      if (c.id !== checklistId) return c
      const items = c.items.map(i => i.id === itemId ? { ...i, checked } : i)
      return { ...c, items }
    }))
  }

  async function handleToggleShare() {
    if (!detail) return
    const res = await apiFetch(`/api/checklist/${detail.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ enableSharing: !detail.shareToken }),
    })
    if (res.ok) {
      const updated = await res.json()
      setDetail(updated)
      setChecklists(prev => prev.map(c => c.id === updated.id ? { ...c, shareToken: updated.shareToken } : c))
    }
  }

  async function handleDelete(id: string) {
    Alert.alert('Excluir checklist', 'Tem certeza?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir', style: 'destructive',
        onPress: async () => {
          await apiFetch(`/api/checklist/${id}`, { method: 'DELETE' })
          setChecklists(prev => prev.filter(c => c.id !== id))
          if (detailId === id) { setDetailId(null); setDetail(null) }
        },
      },
    ])
  }

  async function shareLink() {
    if (!detail?.shareToken) return
    await Share.share({ message: `https://motormacete.com.br/viagem/${detail.shareToken}` })
  }

  // ─── Detail view ─────────────────────────────────────────────────────────────
  if (detailId && detail && !detailLoading) {
    const total = detail.items.length
    const done = detail.items.filter(i => i.checked).length
    const pct = total === 0 ? 0 : Math.round((done / total) * 100)
    const pctColor = pct === 100 ? '#22c55e' : pct >= 60 ? '#ff6600' : '#ef4444'
    const grouped = groupByCategory(detail.items)

    return (
      <View style={s.container}>
        <View style={s.detailHeader}>
          <TouchableOpacity onPress={() => { setDetailId(null); setDetail(null) }} style={{ padding: 4 }}>
            <Ionicons name="arrow-back" size={22} color="#f0ede8" />
          </TouchableOpacity>
          <Text style={s.detailTitle} numberOfLines={1}>{detail.title}</Text>
          <TouchableOpacity onPress={() => handleDelete(detail.id)}>
            <Ionicons name="trash-outline" size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
          {/* Progress */}
          <View style={s.progressCard}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <Text style={{ color: '#888', fontSize: 13 }}>
                {detail.vehicleType === 'moto' ? '🏍️ Moto' : '🚗 Carro'}
                {detail.departureAt ? ` · ${new Date(detail.departureAt).toLocaleDateString('pt-BR')}` : ''}
              </Text>
              <Text style={{ color: pctColor, fontWeight: '800', fontSize: 20 }}>{pct}%</Text>
            </View>
            <View style={{ height: 8, backgroundColor: '#2a2a32', borderRadius: 4 }}>
              <View style={{ height: 8, width: `${pct}%` as any, backgroundColor: pctColor, borderRadius: 4 }} />
            </View>
            <Text style={{ color: '#555', fontSize: 12, marginTop: 6 }}>
              {done} de {total} itens verificados
              {pct === 100 && <Text style={{ color: '#22c55e', fontWeight: '700' }}> · Pronto para partir!</Text>}
            </Text>
          </View>

          {/* Items */}
          {Array.from(grouped.entries()).map(([category, items]) => (
            <View key={category} style={{ marginBottom: 18 }}>
              <Text style={s.categoryLabel}>{category.toUpperCase()}</Text>
              {items.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={[s.itemRow, item.checked && s.itemChecked]}
                  onPress={() => handleToggleItem(detail.id, item.id, !item.checked)}
                  activeOpacity={0.7}
                >
                  <View style={[s.checkbox, item.checked && s.checkboxChecked]}>
                    {item.checked && <Ionicons name="checkmark" size={13} color="#111" />}
                  </View>
                  <Text style={[s.itemLabel, item.checked && s.itemLabelChecked]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}

          {/* Share */}
          <View style={s.shareCard}>
            <Text style={s.shareTitleText}>Compartilhar com o grupo</Text>
            <Text style={s.shareSubText}>Cada participante marca seu próprio checklist.</Text>
            {detail.shareToken ? (
              <View style={{ marginTop: 12, gap: 8 }}>
                <View style={s.linkRow}>
                  <Text style={s.linkText} numberOfLines={1}>
                    motormacete.com.br/viagem/{detail.shareToken}
                  </Text>
                </View>
                <TouchableOpacity style={s.shareBtn} onPress={shareLink}>
                  <Ionicons name="share-social-outline" size={16} color="#111" />
                  <Text style={s.shareBtnText}>Compartilhar link</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleToggleShare}>
                  <Text style={{ color: '#ef4444', fontSize: 12, textAlign: 'center' }}>Desativar link</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={[s.shareBtn, { marginTop: 12 }]} onPress={handleToggleShare}>
                <Ionicons name="link-outline" size={16} color="#111" />
                <Text style={s.shareBtnText}>Criar link de grupo</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Members */}
          {detail.members.length > 0 && (
            <View style={{ marginTop: 16, marginBottom: 24 }}>
              <Text style={s.categoryLabel}>MEMBROS DO GRUPO ({detail.members.length})</Text>
              {detail.members.map(m => {
                const mt = m.items?.length ?? 0
                const md = m.items?.filter((i: any) => i.checked).length ?? 0
                const mp = mt === 0 ? 0 : Math.round((md / mt) * 100)
                const mc = mp === 100 ? '#22c55e' : mp >= 60 ? '#ff6600' : '#ef4444'
                const name = m.memberName ?? m.user?.name ?? 'Participante'
                return (
                  <View key={m.id} style={s.memberCard}>
                    <Text style={s.memberName}>{name}</Text>
                    <Text style={[s.memberPct, { color: mc }]}>{md}/{mt}</Text>
                  </View>
                )
              })}
            </View>
          )}
        </ScrollView>
      </View>
    )
  }

  // ─── List view ───────────────────────────────────────────────────────────────
  return (
    <View style={s.container}>
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadChecklists() }} tintColor="#ff6600" />}
      >
        <View style={s.listHeader}>
          <View>
            <Text style={s.listTitle}>Checklist pré-viagem</Text>
            <Text style={s.listSubtitle}>Prepare-se antes de partir</Text>
          </View>
          <TouchableOpacity style={s.createBtn} onPress={() => setShowCreate(true)}>
            <Ionicons name="add" size={18} color="#111" />
            <Text style={s.createBtnText}>Novo</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator color="#ff6600" style={{ marginTop: 60 }} />
        ) : checklists.length === 0 ? (
          <View style={s.emptyState}>
            <Text style={{ fontSize: 40 }}>🏍️</Text>
            <Text style={s.emptyTitle}>Nenhum checklist ainda</Text>
            <Text style={s.emptyText}>Crie o primeiro e prepare sua viagem</Text>
            <TouchableOpacity style={[s.createBtn, { marginTop: 16 }]} onPress={() => setShowCreate(true)}>
              <Text style={s.createBtnText}>+ Criar checklist</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ gap: 12 }}>
            {checklists.map(c => {
              const total = c.items.length
              const done = c.items.filter(i => i.checked).length
              return (
                <TouchableOpacity
                  key={c.id}
                  style={s.card}
                  onPress={() => { setDetailId(c.id); loadDetail(c.id) }}
                  activeOpacity={0.8}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Text style={s.cardTitle} numberOfLines={1}>{c.title}</Text>
                    <TouchableOpacity onPress={() => handleDelete(c.id)} style={{ padding: 4 }}>
                      <Ionicons name="trash-outline" size={15} color="#444" />
                    </TouchableOpacity>
                  </View>
                  <Text style={s.cardSub}>
                    {c.vehicleType === 'moto' ? '🏍️ Moto' : '🚗 Carro'}
                    {c.departureAt ? ` · ${new Date(c.departureAt).toLocaleDateString('pt-BR')}` : ''}
                  </Text>
                  <ProgressBar total={total} done={done} />
                  {c.shareToken && (
                    <View style={s.groupBadge}>
                      <Text style={s.groupBadgeText}>
                        GRUPO {c.members.length > 0 ? `· ${c.members.length + 1} membros` : ''}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              )
            })}
          </View>
        )}
      </ScrollView>

      {/* Create modal */}
      <Modal visible={showCreate} transparent animationType="fade">
        <Pressable style={s.overlay} onPress={() => setShowCreate(false)}>
          <Pressable style={s.modal} onPress={e => e.stopPropagation()}>
            <Text style={s.modalTitle}>Novo checklist</Text>

            <Text style={s.inputLabel}>TÍTULO DA VIAGEM</Text>
            <TextInput
              style={s.input}
              placeholder="Ex: Serra da Canastra — Jun/2026"
              placeholderTextColor="#444"
              value={newTitle}
              onChangeText={setNewTitle}
            />

            <Text style={[s.inputLabel, { marginTop: 12 }]}>TIPO DE VEÍCULO</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 6 }}>
              {(['moto', 'carro'] as const).map(t => (
                <TouchableOpacity
                  key={t}
                  style={[s.typeBtn, newType === t && s.typeBtnActive]}
                  onPress={() => setNewType(t)}
                >
                  <Text style={[s.typeBtnText, newType === t && s.typeBtnTextActive]}>
                    {t === 'moto' ? '🏍️ Moto' : '🚗 Carro'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={[s.modalBtns, { marginTop: 24 }]}>
              <TouchableOpacity style={s.cancelBtn} onPress={() => setShowCreate(false)}>
                <Text style={s.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[s.confirmBtn, saving && { opacity: 0.6 }]} onPress={handleCreate} disabled={saving}>
                <Text style={s.confirmBtnText}>{saving ? 'Criando...' : 'Criar'}</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Loading detail overlay */}
      {detailId && detailLoading && (
        <View style={s.loadingOverlay}>
          <ActivityIndicator size="large" color="#ff6600" />
        </View>
      )}
    </View>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0e0e0f' },
  detailHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 16, paddingTop: 12, borderBottomWidth: 1, borderBottomColor: '#1a1a1c',
  },
  detailTitle: { flex: 1, color: '#f0ede8', fontSize: 17, fontWeight: '800' },
  progressCard: {
    backgroundColor: '#111113', borderWidth: 1, borderColor: '#2a2a32',
    borderRadius: 14, padding: 16, marginBottom: 20,
  },
  categoryLabel: {
    color: '#ff6600', fontSize: 10, fontWeight: '700', letterSpacing: 2,
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 12, marginBottom: 3,
    backgroundColor: '#111113', borderWidth: 1, borderColor: '#2a2a32',
    borderRadius: 10,
  },
  itemChecked: {
    backgroundColor: 'rgba(34,197,94,0.06)',
    borderColor: 'rgba(34,197,94,0.2)',
  },
  checkbox: {
    width: 20, height: 20, borderRadius: 5,
    borderWidth: 2, borderColor: '#3a3a42',
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  checkboxChecked: { backgroundColor: '#22c55e', borderColor: '#22c55e' },
  itemLabel: { color: '#f0ede8', fontSize: 14, flex: 1 },
  itemLabelChecked: { color: '#22c55e', textDecorationLine: 'line-through', opacity: 0.7 },
  shareCard: {
    backgroundColor: '#111113', borderWidth: 1, borderColor: '#2a2a32',
    borderRadius: 14, padding: 16, marginTop: 8,
  },
  shareTitleText: { color: '#f0ede8', fontWeight: '800', fontSize: 15 },
  shareSubText: { color: '#666', fontSize: 13, marginTop: 3 },
  linkRow: {
    backgroundColor: '#18181b', borderWidth: 1, borderColor: '#3a3a42',
    borderRadius: 8, padding: 10,
  },
  linkText: { color: '#888', fontSize: 12 },
  shareBtn: {
    backgroundColor: '#ff6600', borderRadius: 100,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    paddingVertical: 10,
  },
  shareBtnText: { color: '#111', fontWeight: '800', fontSize: 13 },
  memberCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#18181b', borderWidth: 1, borderColor: '#2a2a32',
    borderRadius: 10, padding: 12, marginBottom: 4,
  },
  memberName: { color: '#f0ede8', fontSize: 14, fontWeight: '600' },
  memberPct: { fontWeight: '700', fontSize: 14 },
  listHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20,
  },
  listTitle: { color: '#f0ede8', fontSize: 20, fontWeight: '900' },
  listSubtitle: { color: '#666', fontSize: 12, marginTop: 2 },
  createBtn: {
    backgroundColor: '#ff6600', borderRadius: 100,
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 14, paddingVertical: 8,
  },
  createBtnText: { color: '#111', fontWeight: '800', fontSize: 13 },
  emptyState: { alignItems: 'center', paddingTop: 60, gap: 6 },
  emptyTitle: { color: '#888', fontWeight: '700', fontSize: 16 },
  emptyText: { color: '#555', fontSize: 13 },
  card: {
    backgroundColor: '#111113', borderWidth: 1, borderColor: '#2a2a32',
    borderRadius: 14, padding: 16,
  },
  cardTitle: { color: '#f0ede8', fontWeight: '700', fontSize: 15, flex: 1 },
  cardSub: { color: '#666', fontSize: 12, marginTop: 2 },
  groupBadge: {
    marginTop: 10, alignSelf: 'flex-start',
    backgroundColor: 'rgba(34,197,94,0.1)', borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 3,
    borderWidth: 1, borderColor: 'rgba(34,197,94,0.25)',
  },
  groupBadgeText: { color: '#22c55e', fontSize: 10, fontWeight: '700' },
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center', justifyContent: 'center', padding: 20,
  },
  modal: {
    backgroundColor: '#111113', borderWidth: 1, borderColor: '#2a2a32',
    borderRadius: 16, padding: 24, width: '100%',
  },
  modalTitle: { color: '#f0ede8', fontWeight: '800', fontSize: 18, marginBottom: 20 },
  inputLabel: {
    color: '#888', fontSize: 11, fontWeight: '700', letterSpacing: 1,
    textTransform: 'uppercase', marginBottom: 6,
  },
  input: {
    backgroundColor: '#18181b', borderWidth: 1, borderColor: '#3a3a42',
    borderRadius: 8, padding: 12, color: '#f0ede8', fontSize: 14,
  },
  typeBtn: {
    flex: 1, padding: 10, borderRadius: 8,
    backgroundColor: '#18181b', borderWidth: 1, borderColor: '#3a3a42',
    alignItems: 'center',
  },
  typeBtnActive: { borderColor: '#ff6600', backgroundColor: 'rgba(255,102,0,0.12)' },
  typeBtnText: { color: '#666', fontWeight: '700', fontSize: 13 },
  typeBtnTextActive: { color: '#ff6600' },
  modalBtns: { flexDirection: 'row', gap: 10 },
  cancelBtn: {
    flex: 1, padding: 12, borderRadius: 8,
    borderWidth: 1, borderColor: '#3a3a42', alignItems: 'center',
  },
  cancelBtnText: { color: '#666', fontWeight: '700' },
  confirmBtn: {
    flex: 2, padding: 12, borderRadius: 8,
    backgroundColor: '#ff6600', alignItems: 'center',
  },
  confirmBtnText: { color: '#111', fontWeight: '800', fontSize: 14 },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center', justifyContent: 'center',
  },
})
