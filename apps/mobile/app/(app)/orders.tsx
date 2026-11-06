import { useState, useEffect, useCallback } from 'react'
import {
  View, Text, ScrollView, FlatList, TouchableOpacity, StyleSheet,
  Modal, TextInput, ActivityIndicator, Alert, RefreshControl,
  KeyboardAvoidingView, Platform,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { useRouter } from 'expo-router'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import { apiFetch, getToken } from '../../lib/api'
import { useAuth } from '../../lib/auth'

type OSStatus = 'OPEN' | 'IN_PROGRESS' | 'WAITING_PARTS' | 'DONE' | 'CLOSED' | 'CANCELLED'
type ItemType = 'LABOR' | 'PART' | 'OTHER'

const STATUS_META: Record<OSStatus, { label: string; color: string }> = {
  OPEN:          { label: 'Aberta',        color: '#3b82f6' },
  IN_PROGRESS:   { label: 'Em andamento',  color: '#f59e0b' },
  WAITING_PARTS: { label: 'Aguard. peças', color: '#8b5cf6' },
  DONE:          { label: 'Concluída',     color: '#22c55e' },
  CLOSED:        { label: 'Fechada',       color: '#666'    },
  CANCELLED:     { label: 'Cancelada',     color: '#e03030' },
}

const ALL_STATUSES: OSStatus[] = ['OPEN', 'IN_PROGRESS', 'WAITING_PARTS', 'DONE', 'CLOSED', 'CANCELLED']

const ITEM_TYPES: { key: ItemType; label: string }[] = [
  { key: 'LABOR', label: 'Mão de obra' },
  { key: 'PART',  label: 'Peça'        },
  { key: 'OTHER', label: 'Outro'       },
]

const FILTERS = [
  { key: '',              label: 'Todas'       },
  { key: 'OPEN',          label: 'Abertas'     },
  { key: 'IN_PROGRESS',   label: 'Andamento'   },
  { key: 'WAITING_PARTS', label: 'Peças'       },
  { key: 'DONE',          label: 'Concluídas'  },
  { key: 'CLOSED',        label: 'Fechadas'    },
]

interface OSListItem {
  id: string; number: number; clientName: string; clientPhone: string | null
  plate: string | null; vehicleBrand: string; vehicleModel: string
  vehicleYear: number | null; status: OSStatus; total: number; createdAt: string
}
interface OSItem {
  id: string; type: ItemType; description: string
  quantity: number; unitPrice: number; total: number
}
interface OSDetail extends OSListItem {
  clientEmail: string | null; vehicleKm: number | null; vehicleFuel: string | null
  diagnosis: string | null; notes: string | null; items: OSItem[]
  nextMaintenanceDate: string | null
}
interface FormItem { type: ItemType; description: string; quantity: string; unitPrice: string }

const blankForm = {
  clientName: '', clientPhone: '', clientEmail: '',
  plate: '', vehicleBrand: '', vehicleModel: '',
  vehicleYear: '', vehicleKm: '', vehicleFuel: '',
  diagnosis: '', notes: '', status: 'OPEN' as OSStatus,
  nextMaintenanceDate: '',
  items: [] as FormItem[],
}
type FormState = typeof blankForm

function fmtBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}
function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })
}
function formTotal(items: FormItem[]) {
  return items.reduce((acc, it) => acc + (parseFloat(it.quantity || '0') * parseFloat(it.unitPrice || '0')), 0)
}

export default function OrdersScreen() {
  const { user } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<OSListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')

  const isPro = user?.isAdmin || user?.plan === "MECHANIC_PRO" || user?.plan === "DRIVER_PRO" || user?.isTrialing
  const OS_LIMIT = 10
  const startOfMonth = new Date(); startOfMonth.setDate(1); startOfMonth.setHours(0,0,0,0)
  const osThisMonth = orders.filter(o => new Date(o.createdAt) >= startOfMonth).length
  const atLimit = !isPro && osThisMonth >= OS_LIMIT
  const [exportingCsv, setExportingCsv] = useState(false)

  async function handleExportCsv() {
    setExportingCsv(true)
    try {
      const token = await getToken()
      const API_BASE = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000'
      const now = new Date()
      const url = `${API_BASE}/api/mecanico/export?month=${now.getMonth()+1}&year=${now.getFullYear()}`
      const filename = `os-${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}.csv`
      const dest = `${FileSystem.cacheDirectory}${filename}`
      const result = await FileSystem.downloadAsync(url, dest, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      if (result.status !== 200) { Alert.alert('Erro', 'Não foi possível exportar.'); return }
      const canShare = await Sharing.isAvailableAsync()
      if (canShare) {
        await Sharing.shareAsync(result.uri, { mimeType: 'text/csv', dialogTitle: 'Exportar OS como CSV' })
      } else {
        Alert.alert('CSV salvo', result.uri)
      }
    } catch {
      Alert.alert('Erro', 'Falha ao exportar.')
    } finally {
      setExportingCsv(false)
    }
  }

  const [detailOS, setDetailOS] = useState<OSDetail | null>(null)
  const [detailVisible, setDetailVisible] = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)

  const [formVisible, setFormVisible] = useState(false)
  const [formSaving, setFormSaving] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(blankForm)
  const [showDatePicker, setShowDatePicker] = useState(false)

  const loadOrders = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    try {
      const params = new URLSearchParams()
      if (statusFilter) params.set('status', statusFilter)
      if (search.trim()) params.set('search', search.trim())
      const res = await apiFetch(`/api/mecanico/os?${params}`)
      const data = await res.json()
      setOrders(data.orders ?? [])
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [statusFilter, search])

  useEffect(() => { loadOrders() }, [loadOrders])

  async function openDetail(id: string) {
    setDetailLoading(true)
    setDetailVisible(true)
    setDetailOS(null)
    try {
      const res = await apiFetch(`/api/mecanico/os/${id}`)
      const data = await res.json()
      setDetailOS(data.order ?? null)
    } finally {
      setDetailLoading(false)
    }
  }

  function openCreate() {
    setEditingId(null)
    setForm(blankForm)
    setFormVisible(true)
  }

  function openEdit(os: OSDetail) {
    setEditingId(os.id)
    setForm({
      clientName: os.clientName, clientPhone: os.clientPhone ?? '',
      clientEmail: os.clientEmail ?? '', plate: os.plate ?? '',
      vehicleBrand: os.vehicleBrand, vehicleModel: os.vehicleModel,
      vehicleYear: os.vehicleYear ? String(os.vehicleYear) : '',
      vehicleKm: os.vehicleKm ? String(os.vehicleKm) : '',
      vehicleFuel: os.vehicleFuel ?? '', diagnosis: os.diagnosis ?? '',
      notes: os.notes ?? '', status: os.status,
      nextMaintenanceDate: os.nextMaintenanceDate ? isoDateToBr(os.nextMaintenanceDate.slice(0,10)) : '',
      items: os.items.map(it => ({
        type: it.type, description: it.description,
        quantity: String(it.quantity), unitPrice: String(it.unitPrice),
      })),
    })
    setDetailVisible(false)
    setFormVisible(true)
  }

  function handleDateChange(event: DateTimePickerEvent, selectedDate?: Date) {
    setShowDatePicker(Platform.OS === 'ios')
    if (event.type === 'set' && selectedDate) {
      setForm(x => ({ ...x, nextMaintenanceDate: jsDateToBr(selectedDate) }))
    }
  }

  async function handleSave() {
    if (!form.clientName.trim() || !form.vehicleBrand.trim() || !form.vehicleModel.trim()) {
      Alert.alert('Campos obrigatórios', 'Nome do cliente, marca e modelo são obrigatórios.')
      return
    }
    const isoMaintDate = form.nextMaintenanceDate ? brDateToIso(form.nextMaintenanceDate) : null
    if (form.nextMaintenanceDate && !isoMaintDate) {
      Alert.alert('Data inválida', 'Use o formato DD/MM/AAAA para a próxima revisão do cliente.')
      return
    }
    setFormSaving(true)
    try {
      const body = {
        clientName: form.clientName, clientPhone: form.clientPhone || null,
        clientEmail: form.clientEmail || null, plate: form.plate || null,
        vehicleBrand: form.vehicleBrand, vehicleModel: form.vehicleModel,
        vehicleYear: form.vehicleYear ? Number(form.vehicleYear) : null,
        vehicleKm: form.vehicleKm ? Number(form.vehicleKm) : null,
        vehicleFuel: form.vehicleFuel || null, status: form.status,
        diagnosis: form.diagnosis || null, notes: form.notes || null,
        nextMaintenanceDate: isoMaintDate,
        items: form.items
          .filter(it => it.description.trim())
          .map(it => ({
            type: it.type, description: it.description,
            quantity: parseFloat(it.quantity) || 1,
            unitPrice: parseFloat(it.unitPrice) || 0,
          })),
      }
      const res = editingId
        ? await apiFetch(`/api/mecanico/os/${editingId}`, { method: 'PATCH', body: JSON.stringify(body) })
        : await apiFetch('/api/mecanico/os', { method: 'POST', body: JSON.stringify(body) })
      if (!res.ok) throw new Error()
      setFormVisible(false)
      await loadOrders(true)
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar a OS.')
    } finally {
      setFormSaving(false)
    }
  }

  async function changeStatus(id: string, newStatus: OSStatus) {
    try {
      const res = await apiFetch(`/api/mecanico/os/${id}`, {
        method: 'PATCH', body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setDetailOS(data.order)
      await loadOrders(true)
    } catch {
      Alert.alert('Erro', 'Não foi possível alterar o status.')
    }
  }

  function showStatusPicker(onSelect: (s: OSStatus) => void) {
    Alert.alert(
      'Alterar Status',
      'Selecione o novo status:',
      [
        ...ALL_STATUSES.map(s => ({
          text: STATUS_META[s].label,
          style: s === 'CANCELLED' ? 'destructive' as const : 'default' as const,
          onPress: () => onSelect(s),
        })),
        { text: 'Cancelar', style: 'cancel' as const },
      ]
    )
  }

  function handleDelete(id: string) {
    Alert.alert('Excluir OS', 'Tem certeza? Esta ação não pode ser desfeita.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir', style: 'destructive',
        onPress: async () => {
          await apiFetch(`/api/mecanico/os/${id}`, { method: 'DELETE' })
          setDetailVisible(false)
          setDetailOS(null)
          await loadOrders(true)
        },
      },
    ])
  }

  const setItem = (idx: number, field: keyof FormItem, value: string) =>
    setForm(f => { const items = [...f.items]; items[idx] = { ...items[idx], [field]: value }; return { ...f, items } })

  return (
    <View style={s.root}>
      {/* Search bar */}
      <View style={s.searchBar}>
        <Ionicons name="search-outline" size={16} color="#555" />
        <TextInput
          style={s.searchInput}
          placeholder="Buscar cliente, placa, modelo…"
          placeholderTextColor="#777"
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
          onSubmitEditing={() => loadOrders()}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={16} color="#555" />
          </TouchableOpacity>
        )}
      </View>

      {/* Botão de exportação CSV — só Pro */}
      {isPro && (
        <TouchableOpacity style={s.exportBtn} onPress={handleExportCsv} disabled={exportingCsv} activeOpacity={0.75}>
          {exportingCsv
            ? <ActivityIndicator size="small" color="#ff8533" />
            : <Ionicons name="download-outline" size={16} color="#ff8533" />}
          <Text style={s.exportBtnText}>{exportingCsv ? 'Exportando...' : 'Exportar CSV'}</Text>
        </TouchableOpacity>
      )}

      {/* Contador de OS do mês — só FREE */}
      {!isPro && (
        <View style={s.osCounter}>
          <Text style={[s.osCounterText, osThisMonth >= OS_LIMIT && s.osCounterLimit]}>
            {osThisMonth}/{OS_LIMIT} OS este mês
          </Text>
        </View>
      )}

      {/* Status filter chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.filterRow} contentContainerStyle={s.filterContent}>
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f.key}
            style={[s.chip, statusFilter === f.key && s.chipActive]}
            onPress={() => setStatusFilter(f.key)}
          >
            <Text style={[s.chipText, statusFilter === f.key && s.chipTextActive]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* List */}
      {loading ? (
        <View style={s.loadingBox}><ActivityIndicator color="#ff6600" size="large" /></View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          contentContainerStyle={s.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadOrders(true) }} tintColor="#ff6600" />}
          ListEmptyComponent={
            <View style={s.emptyBox}>
              <Ionicons name="clipboard-outline" size={48} color="#333" style={s.emptyIcon} />
              <Text style={s.emptyText}>Nenhuma OS encontrada</Text>
            </View>
          }
          renderItem={({ item }) => {
            const meta = STATUS_META[item.status]
            return (
              <TouchableOpacity style={s.osCard} onPress={() => openDetail(item.id)} activeOpacity={0.75}>
                <View style={s.osCardRow}>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                      <Text style={s.osNumber}>OS #{item.number}</Text>
                      <View style={[s.statusDot, { backgroundColor: meta.color }]} />
                    </View>
                    <Text style={s.osClient} numberOfLines={1}>{item.clientName}</Text>
                    <Text style={s.osVehicle} numberOfLines={1}>
                      {item.vehicleBrand} {item.vehicleModel}{item.plate ? ` · ${item.plate}` : ''}
                    </Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <View style={[s.statusBadge, { backgroundColor: meta.color + '20', borderColor: meta.color + '50' }]}>
                      <Text style={[s.statusBadgeText, { color: meta.color }]}>{meta.label}</Text>
                    </View>
                    <Text style={s.osTotal}>{fmtBRL(item.total)}</Text>
                    <Text style={s.osDate}>{fmtDate(item.createdAt)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      )}

      {/* Banner de limite FREE */}
      {atLimit && (
        <TouchableOpacity style={s.limitBanner} onPress={() => router.push('/(app)/plans' as any)} activeOpacity={0.85}>
          <View style={{ flex: 1 }}>
            <Text style={s.limitBannerTitle}>🔒 Limite de {OS_LIMIT} OS/mês atingido</Text>
            <Text style={s.limitBannerDesc}>Assine o Mecânico Pro para OS ilimitadas →</Text>
          </View>
          <Ionicons name="star" size={18} color="#ff6600" />
        </TouchableOpacity>
      )}

      {/* FAB — redireciona para planos se no limite */}
      <TouchableOpacity
        style={[s.fab, atLimit && s.fabLimited]}
        onPress={atLimit ? () => router.push('/(app)/plans' as any) : openCreate}
        activeOpacity={0.85}>
        <Ionicons name={atLimit ? 'star' : 'add'} size={28} color="#fff" />
      </TouchableOpacity>

      {/* ── Detail Modal ───────────────────────────────────── */}
      <Modal visible={detailVisible} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => { setDetailVisible(false); setDetailOS(null) }}>
        <View style={md.root}>
          <View style={md.header}>
            <TouchableOpacity onPress={() => { setDetailVisible(false); setDetailOS(null) }} style={{ padding: 4 }}>
              <Ionicons name="close" size={24} color="#f0ede8" />
            </TouchableOpacity>
            <Text style={md.title}>{detailOS ? `OS #${detailOS.number}` : 'Carregando…'}</Text>
            {detailOS ? (
              <TouchableOpacity onPress={() => handleDelete(detailOS.id)} style={{ padding: 4 }}>
                <Ionicons name="trash-outline" size={20} color="#e03030" />
              </TouchableOpacity>
            ) : <View style={{ width: 28 }} />}
          </View>

          {detailLoading ? (
            <View style={md.loading}><ActivityIndicator color="#ff6600" size="large" /></View>
          ) : detailOS ? (
            <ScrollView contentContainerStyle={md.content}>
              {/* Status + actions */}
              <View style={md.actionRow}>
                <View style={[md.statusBadge, { backgroundColor: STATUS_META[detailOS.status].color + '20', borderColor: STATUS_META[detailOS.status].color + '50' }]}>
                  <Text style={[md.statusText, { color: STATUS_META[detailOS.status].color }]}>{STATUS_META[detailOS.status].label}</Text>
                </View>
                <TouchableOpacity style={md.btn} onPress={() => showStatusPicker(s => changeStatus(detailOS.id, s))}>
                  <Text style={md.btnText}>Status</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[md.btn, md.btnOrange]} onPress={() => openEdit(detailOS)}>
                  <Ionicons name="pencil-outline" size={13} color="#ff6600" />
                  <Text style={[md.btnText, { color: '#ff6600' }]}>Editar</Text>
                </TouchableOpacity>
              </View>

              <SectionCard label="Cliente">
                <DRow label="Nome" value={detailOS.clientName} />
                {detailOS.clientPhone ? <DRow label="Telefone" value={detailOS.clientPhone} /> : null}
                {detailOS.clientEmail ? <DRow label="E-mail" value={detailOS.clientEmail} /> : null}
              </SectionCard>

              <SectionCard label="Veículo">
                <DRow label="Marca / Modelo" value={`${detailOS.vehicleBrand} ${detailOS.vehicleModel}`} />
                {detailOS.vehicleYear ? <DRow label="Ano" value={String(detailOS.vehicleYear)} /> : null}
                {detailOS.plate ? <DRow label="Placa" value={detailOS.plate} /> : null}
                {detailOS.vehicleKm ? <DRow label="KM" value={`${detailOS.vehicleKm.toLocaleString('pt-BR')} km`} /> : null}
                {detailOS.vehicleFuel ? <DRow label="Combustível" value={detailOS.vehicleFuel} /> : null}
              </SectionCard>

              {isPro && detailOS.nextMaintenanceDate && (
                <View style={mf.nextMaintCard}>
                  <View style={mf.nextMaintLabelRow}>
                    <Ionicons name="star" size={12} color="#ff8533" />
                    <Text style={mf.nextMaintLabel}>Próxima revisão do cliente</Text>
                  </View>
                  <Text style={mf.nextMaintDate}>
                    {new Date(detailOS.nextMaintenanceDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </Text>
                </View>
              )}
              {(detailOS.diagnosis || detailOS.notes) ? (
                <SectionCard label="Diagnóstico">
                  {detailOS.diagnosis ? <DRow label="Diagnóstico" value={detailOS.diagnosis} multi /> : null}
                  {detailOS.notes ? <DRow label="Obs. internas" value={detailOS.notes} multi /> : null}
                </SectionCard>
              ) : null}

              {detailOS.items.length > 0 ? (
                <SectionCard label="Itens">
                  {detailOS.items.map((it, idx) => (
                    <View key={it.id} style={[md.itemRow, idx < detailOS.items.length - 1 && md.itemRowBorder]}>
                      <View style={{ flex: 1 }}>
                        <Text style={md.itemDesc}>{it.description}</Text>
                        <Text style={md.itemMeta}>{ITEM_TYPES.find(t => t.key === it.type)?.label} · {it.quantity}× {fmtBRL(it.unitPrice)}</Text>
                      </View>
                      <Text style={md.itemTotal}>{fmtBRL(it.total)}</Text>
                    </View>
                  ))}
                  <View style={md.totalRow}>
                    <Text style={md.totalLabel}>Total</Text>
                    <Text style={md.totalValue}>{fmtBRL(detailOS.total)}</Text>
                  </View>
                </SectionCard>
              ) : null}

              <Text style={md.dateLabel}>
                Aberta em {new Date(detailOS.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </Text>
            </ScrollView>
          ) : null}
        </View>
      </Modal>

      {/* ── Create / Edit Modal ────────────────────────────── */}
      <Modal visible={formVisible} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setFormVisible(false)}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <View style={mf.root}>
            <View style={mf.header}>
              <TouchableOpacity onPress={() => setFormVisible(false)} style={{ padding: 4 }}>
                <Ionicons name="close" size={24} color="#f0ede8" />
              </TouchableOpacity>
              <Text style={mf.title}>{editingId ? 'Editar OS' : 'Nova OS'}</Text>
              <View style={{ width: 32 }} />
            </View>

            <ScrollView contentContainerStyle={mf.content} keyboardShouldPersistTaps="handled">
              {/* Status selector (create only) */}
              {!editingId && (
                <>
                  <Text style={mf.sectionLabel}>Status inicial</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                    {(['OPEN', 'IN_PROGRESS', 'DONE'] as OSStatus[]).map(st => (
                      <TouchableOpacity
                        key={st}
                        style={[mf.statusChip, form.status === st && { backgroundColor: STATUS_META[st].color + '25', borderColor: STATUS_META[st].color }]}
                        onPress={() => setForm(v => ({ ...v, status: st }))}
                      >
                        <Text style={[mf.statusChipText, form.status === st && { color: STATUS_META[st].color }]}>{STATUS_META[st].label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}

              <Text style={mf.sectionLabel}>Cliente</Text>
              <FField label="Nome *" value={form.clientName} onChange={v => setForm(x => ({ ...x, clientName: v }))} placeholder="Nome do cliente" />
              <FField label="Telefone" value={form.clientPhone} onChange={v => setForm(x => ({ ...x, clientPhone: v }))} placeholder="(11) 99999-9999" kb="phone-pad" />
              <FField label="E-mail" value={form.clientEmail} onChange={v => setForm(x => ({ ...x, clientEmail: v }))} placeholder="email@exemplo.com" kb="email-address" autoC="none" />

              <Text style={mf.sectionLabel}>Veículo</Text>
              <FField label="Marca *" value={form.vehicleBrand} onChange={v => setForm(x => ({ ...x, vehicleBrand: v }))} placeholder="Ex: Chevrolet" />
              <FField label="Modelo *" value={form.vehicleModel} onChange={v => setForm(x => ({ ...x, vehicleModel: v }))} placeholder="Ex: Onix 1.0 Turbo" />
              <View style={mf.fieldRow}>
                <View style={{ flex: 1 }}><FField label="Ano" value={form.vehicleYear} onChange={v => setForm(x => ({ ...x, vehicleYear: v }))} placeholder="2023" kb="number-pad" /></View>
                <View style={{ flex: 1 }}><FField label="KM" value={form.vehicleKm} onChange={v => setForm(x => ({ ...x, vehicleKm: v }))} placeholder="50000" kb="number-pad" /></View>
              </View>
              <View style={mf.fieldRow}>
                <View style={{ flex: 1 }}><FField label="Placa" value={form.plate} onChange={v => setForm(x => ({ ...x, plate: formatPlate(v) }))} placeholder="ABC1D23" autoC="characters" maxLength={7} /></View>
                <View style={{ flex: 1 }}><FField label="Combustível" value={form.vehicleFuel} onChange={v => setForm(x => ({ ...x, vehicleFuel: v }))} placeholder="Flex, Gasolina…" /></View>
              </View>

              <Text style={mf.sectionLabel}>Diagnóstico</Text>
              <FField label="Descrição do problema" value={form.diagnosis} onChange={v => setForm(x => ({ ...x, diagnosis: v }))} placeholder="Problema relatado e diagnóstico…" multi />
              <FField label="Obs. internas" value={form.notes} onChange={v => setForm(x => ({ ...x, notes: v }))} placeholder="Notas internas (não visíveis ao cliente)…" multi />
              {isPro && (
                <View style={mf.field}>
                  <View style={mf.fieldLabelRow}>
                    <Ionicons name="star" size={11} color="#ff8533" />
                    <Text style={mf.fieldLabel}>Próxima revisão do cliente</Text>
                  </View>
                  <TouchableOpacity style={mf.dateInput} onPress={() => setShowDatePicker(true)} activeOpacity={0.7}>
                    <Ionicons name="calendar-outline" size={16} color="#777" />
                    <Text style={[mf.dateInputText, !!form.nextMaintenanceDate && mf.dateInputTextFilled]}>
                      {form.nextMaintenanceDate || 'Selecionar data'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {showDatePicker && Platform.OS === 'ios' && (
                <Modal visible transparent animationType="fade" onRequestClose={() => setShowDatePicker(false)}>
                  <TouchableOpacity style={mf.datePickerOverlay} activeOpacity={1} onPress={() => setShowDatePicker(false)}>
                    <TouchableOpacity style={mf.datePickerBox} activeOpacity={1} onPress={() => {}}>
                      <DateTimePicker
                        value={form.nextMaintenanceDate ? brDateToJsDate(form.nextMaintenanceDate) : new Date()}
                        mode="date"
                        display="spinner"
                        onChange={handleDateChange}
                        themeVariant="dark"
                      />
                      <TouchableOpacity style={mf.datePickerDoneBtn} onPress={() => setShowDatePicker(false)}>
                        <Text style={mf.datePickerDoneBtnText}>Confirmar</Text>
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </TouchableOpacity>
                </Modal>
              )}
              {showDatePicker && Platform.OS !== 'ios' && (
                <DateTimePicker
                  value={form.nextMaintenanceDate ? brDateToJsDate(form.nextMaintenanceDate) : new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}

              <View style={mf.itemsHeader}>
                <Text style={mf.sectionLabel}>Itens</Text>
                <TouchableOpacity style={mf.addBtn} onPress={() => setForm(f => ({ ...f, items: [...f.items, { type: 'LABOR', description: '', quantity: '1', unitPrice: '' }] }))}>
                  <Ionicons name="add" size={15} color="#ff6600" />
                  <Text style={mf.addBtnText}>Adicionar item</Text>
                </TouchableOpacity>
              </View>

              {form.items.length === 0 && (
                <Text style={mf.noItems}>Nenhum item. Toque em "Adicionar item" para incluir peças e serviços.</Text>
              )}

              {form.items.map((item, idx) => (
                <View key={idx} style={mf.itemCard}>
                  <View style={mf.itemCardHead}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
                      <View style={{ flexDirection: 'row', gap: 6 }}>
                        {ITEM_TYPES.map(t => (
                          <TouchableOpacity key={t.key}
                            style={[mf.typeChip, item.type === t.key && mf.typeChipActive]}
                            onPress={() => setItem(idx, 'type', t.key)}>
                            <Text style={[mf.typeChipText, item.type === t.key && mf.typeChipTextActive]}>{t.label}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </ScrollView>
                    <TouchableOpacity onPress={() => setForm(f => ({ ...f, items: f.items.filter((_, i) => i !== idx) }))} style={{ padding: 6 }}>
                      <Ionicons name="trash-outline" size={15} color="#555" />
                    </TouchableOpacity>
                  </View>
                  <FField label="Descrição" value={item.description} onChange={v => setItem(idx, 'description', v)} placeholder="Ex: Troca de óleo 5W30" />
                  <View style={mf.fieldRow}>
                    <View style={{ flex: 1 }}><FField label="Qtd" value={item.quantity} onChange={v => setItem(idx, 'quantity', v)} placeholder="1" kb="decimal-pad" /></View>
                    <View style={{ flex: 1 }}><FField label="Valor unit. (R$)" value={item.unitPrice} onChange={v => setItem(idx, 'unitPrice', v)} placeholder="0.00" kb="decimal-pad" /></View>
                  </View>
                  {(parseFloat(item.quantity) > 0 && parseFloat(item.unitPrice) > 0) && (
                    <Text style={mf.subtotal}>Subtotal: {fmtBRL(parseFloat(item.quantity) * parseFloat(item.unitPrice))}</Text>
                  )}
                </View>
              ))}

              {form.items.length > 0 && (
                <View style={mf.totalRow}>
                  <Text style={mf.totalLabel}>Total da OS</Text>
                  <Text style={mf.totalValue}>{fmtBRL(formTotal(form.items))}</Text>
                </View>
              )}
            </ScrollView>

            <View style={mf.footer}>
              <TouchableOpacity style={[mf.saveFooterBtn, formSaving && mf.saveFooterBtnDisabled]} onPress={handleSave} disabled={formSaving}>
                {formSaving
                  ? <ActivityIndicator color="#fff" size="small" />
                  : <Text style={mf.saveFooterBtnText}>Salvar</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <Text style={md.sectionLabel}>{label}</Text>
      <View style={md.card}>{children}</View>
    </>
  )
}

function DRow({ label, value, multi }: { label: string; value: string; multi?: boolean }) {
  return (
    <View style={[md.dRow, multi && md.dRowMulti]}>
      <Text style={md.dLabel}>{label}</Text>
      <Text style={[md.dValue, multi && { flex: 1, flexWrap: 'wrap' }]}>{value}</Text>
    </View>
  )
}

// DD/MM/AAAA (exibido no formulário) → AAAA-MM-DD (ISO, esperado pela API/Prisma).
// Retorna null se a data estiver incompleta ou em formato inválido.
function brDateToIso(br: string): string | null {
  const m = br.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!m) return null
  const [, d, mo, y] = m
  return `${y}-${mo}-${d}`
}

// AAAA-MM-DD (ISO, vindo da API) → DD/MM/AAAA (exibido no formulário).
function isoDateToBr(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (!m) return ''
  const [, y, mo, d] = m
  return `${d}/${mo}/${y}`
}

function brDateToJsDate(br: string): Date {
  const iso = brDateToIso(br)
  if (!iso) return new Date()
  const [y, mo, d] = iso.split('-').map(Number)
  return new Date(y, mo - 1, d)
}

function jsDateToBr(date: Date): string {
  const d  = String(date.getDate()).padStart(2, '0')
  const mo = String(date.getMonth() + 1).padStart(2, '0')
  return `${d}/${mo}/${date.getFullYear()}`
}

// Aceita placa no padrão antigo (ABC1234) e Mercosul (ABC1D23) num único
// campo: posições 1-3 só letras, posição 4 só dígito, posição 5 aceita letra
// OU dígito (é onde os dois padrões divergem), posições 6-7 só dígitos.
function formatPlate(raw: string): string {
  const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7)
  let out = ''
  for (let i = 0; i < clean.length; i++) {
    const c = clean[i]
    if (i < 3) { if (/[A-Z]/.test(c)) out += c }
    else if (i === 4) { if (/[A-Z0-9]/.test(c)) out += c }
    else { if (/[0-9]/.test(c)) out += c }
  }
  return out
}

function FField({ label, value, onChange, placeholder, kb, multi, autoC, maxLength, icon }: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; kb?: any; multi?: boolean; autoC?: any; maxLength?: number; icon?: React.ComponentProps<typeof Ionicons>['name']
}) {
  return (
    <View style={mf.field}>
      <View style={mf.fieldLabelRow}>
        {icon && <Ionicons name={icon} size={11} color="#ff8533" />}
        <Text style={mf.fieldLabel}>{label}</Text>
      </View>
      <TextInput
        style={[mf.input, multi && mf.inputMulti]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#777"
        keyboardType={kb ?? 'default'}
        multiline={multi}
        autoCapitalize={autoC ?? 'words'}
        textAlignVertical={multi ? 'top' : 'auto'}
        maxLength={maxLength}
      />
    </View>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0e0e0f' },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 10, margin: 16, marginBottom: 10, backgroundColor: '#141416', borderRadius: 10, borderWidth: 1, borderColor: '#2a2a2e', paddingHorizontal: 12, paddingVertical: 10 },
  searchInput: { flex: 1, color: '#f0ede8', fontSize: 14 },
  filterRow: { marginBottom: 8, flexGrow: 0, flexShrink: 0 },
  filterContent: { paddingHorizontal: 16, gap: 8, alignItems: 'flex-start' },
  chip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1, borderColor: '#2a2a2e', backgroundColor: '#141416' },
  chipActive: { backgroundColor: 'rgba(255,102,0,0.12)', borderColor: '#ff6600' },
  chipText: { fontSize: 12, fontWeight: '600', color: '#9a9a9a' },
  chipTextActive: { color: '#ff6600' },
  loadingBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  listContent: { padding: 16, gap: 10, paddingBottom: 100 },
  osCard: { backgroundColor: '#141416', borderRadius: 14, borderWidth: 1, borderColor: '#2a2a2e', padding: 14 },
  osCardRow: { flexDirection: 'row', alignItems: 'center' },
  osNumber: { fontSize: 13, fontWeight: '800', color: '#ff6600' },
  osClient: { fontSize: 15, fontWeight: '700', color: '#f0ede8', marginTop: 2 },
  osVehicle: { fontSize: 12, color: '#555', marginTop: 2 },
  statusDot: { width: 7, height: 7, borderRadius: 4 },
  statusBadge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1, marginBottom: 6 },
  statusBadgeText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.4 },
  osTotal: { fontSize: 15, fontWeight: '800', color: '#f0ede8' },
  osDate: { fontSize: 11, color: '#444', marginTop: 2 },
  emptyBox: { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { marginBottom: 12 },
  emptyText: { fontSize: 14, color: '#444' },
  fab: { position: 'absolute', bottom: 28, right: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: '#ff6600', alignItems: 'center', justifyContent: 'center', shadowColor: '#ff6600', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 8 },
  fabLimited: { backgroundColor: '#2a2a2e' },
  exportBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, marginHorizontal: 16, marginBottom: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, backgroundColor: 'rgba(255,102,0,0.07)', borderWidth: 1, borderColor: 'rgba(255,102,0,0.25)', alignSelf: 'flex-end' },
  exportBtnText: { fontSize: 12, fontWeight: '700', color: '#ff8533' },
  osCounter: { paddingHorizontal: 16, paddingVertical: 6, alignItems: 'flex-end' },
  osCounterText: { fontSize: 11, fontWeight: '600', color: '#555' },
  osCounterLimit: { color: '#ef4444' },
  limitBanner: { marginHorizontal: 16, marginBottom: 80, padding: 14, borderRadius: 14, backgroundColor: 'rgba(255,102,0,0.08)', borderWidth: 1, borderColor: 'rgba(255,102,0,0.3)', flexDirection: 'row', alignItems: 'center', gap: 12 },
  limitBannerTitle: { fontSize: 13, fontWeight: '700', color: '#ff6600', marginBottom: 2 },
  limitBannerDesc: { fontSize: 12, color: '#888' },
})

const md = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0e0e0f' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#1a1a1c' },
  title: { fontSize: 17, fontWeight: '800', color: '#f0ede8' },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { padding: 16, paddingBottom: 48 },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20, flexWrap: 'wrap' },
  statusBadge: { borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1 },
  statusText: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  btn: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8, borderWidth: 1, borderColor: '#2a2a2e', backgroundColor: '#141416', flexDirection: 'row', alignItems: 'center', gap: 4 },
  btnOrange: { borderColor: 'rgba(255,102,0,0.4)' },
  btnText: { fontSize: 12, fontWeight: '600', color: '#aaa' },
  sectionLabel: { fontSize: 10, fontWeight: '700', color: '#555', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8, marginTop: 4 },
  card: { backgroundColor: '#141416', borderRadius: 12, borderWidth: 1, borderColor: '#2a2a2e', padding: 14, marginBottom: 16, gap: 10 },
  dRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  dRowMulti: { flexDirection: 'column', gap: 4 },
  dLabel: { fontSize: 12, color: '#555', flexShrink: 0 },
  dValue: { fontSize: 13, color: '#ccc', textAlign: 'right', flexShrink: 1 },
  itemRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 10 },
  itemRowBorder: { borderBottomWidth: 1, borderBottomColor: '#1e1e20' },
  itemDesc: { fontSize: 13, fontWeight: '600', color: '#dedad4' },
  itemMeta: { fontSize: 11, color: '#555', marginTop: 2 },
  itemTotal: { fontSize: 13, fontWeight: '700', color: '#f0ede8', flexShrink: 0 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#1e1e20', marginTop: 4 },
  totalLabel: { fontSize: 13, fontWeight: '700', color: '#555', textTransform: 'uppercase', letterSpacing: 0.5 },
  totalValue: { fontSize: 20, fontWeight: '900', color: '#ff6600' },
  dateLabel: { fontSize: 11, color: '#333', textAlign: 'center', marginTop: 8 },
})

const mf = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0e0e0f' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#1a1a1c' },
  title: { fontSize: 17, fontWeight: '800', color: '#f0ede8' },
  content: { padding: 16, paddingBottom: 60 },
  footer: { padding: 16, borderTopWidth: 1, borderTopColor: '#1a1a1c', backgroundColor: '#0e0e0f' },
  saveFooterBtn: { backgroundColor: '#ff6600', borderRadius: 12, paddingVertical: 15, alignItems: 'center' },
  saveFooterBtnDisabled: { opacity: 0.6 },
  saveFooterBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  nextMaintCard: { backgroundColor: 'rgba(255,102,0,0.07)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,102,0,0.25)', padding: 14, marginBottom: 12 },
  nextMaintLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 4 },
  nextMaintLabel: { fontSize: 11, fontWeight: '700', color: '#ff8533', letterSpacing: 1, textTransform: 'uppercase' },
  nextMaintDate: { fontSize: 15, fontWeight: '700', color: '#f0ede8' },
  sectionLabel: { fontSize: 10, fontWeight: '700', color: '#555', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 10, marginTop: 4 },
  statusChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#2a2a2e', backgroundColor: '#141416' },
  statusChipText: { fontSize: 13, fontWeight: '600', color: '#9a9a9a' },
  field: { marginBottom: 12 },
  fieldLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 6 },
  fieldLabel: { fontSize: 11, fontWeight: '700', color: '#555', letterSpacing: 0.5 },
  input: { backgroundColor: '#141416', borderRadius: 10, borderWidth: 1, borderColor: '#3a3a3e', paddingHorizontal: 12, paddingVertical: 10, color: '#f0ede8', fontSize: 14 },
  inputMulti: { minHeight: 80, paddingTop: 10 },
  dateInput: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#141416', borderRadius: 10, borderWidth: 1, borderColor: '#3a3a3e', paddingHorizontal: 12, paddingVertical: 10 },
  dateInputText: { color: '#777', fontSize: 14 },
  dateInputTextFilled: { color: '#f0ede8' },
  datePickerOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center', justifyContent: 'center', padding: 32 },
  datePickerBox: { backgroundColor: '#141416', borderRadius: 20, borderWidth: 1, borderColor: '#2a2a2e', padding: 16, alignItems: 'center', width: '100%' },
  datePickerDoneBtn: { backgroundColor: '#ff6600', borderRadius: 12, paddingVertical: 13, paddingHorizontal: 40, marginTop: 8 },
  datePickerDoneBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  fieldRow: { flexDirection: 'row', gap: 10 },
  itemsHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginTop: 4 },
  addBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,102,0,0.4)', backgroundColor: 'rgba(255,102,0,0.08)' },
  addBtnText: { fontSize: 12, fontWeight: '700', color: '#ff6600' },
  noItems: { fontSize: 12, color: '#444', textAlign: 'center', paddingVertical: 16, marginBottom: 8 },
  itemCard: { backgroundColor: '#141416', borderRadius: 12, borderWidth: 1, borderColor: '#2a2a2e', padding: 12, marginBottom: 10 },
  itemCardHead: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  typeChip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 16, borderWidth: 1, borderColor: '#2a2a2e' },
  typeChipActive: { backgroundColor: 'rgba(255,102,0,0.12)', borderColor: '#ff6600' },
  typeChipText: { fontSize: 11, fontWeight: '600', color: '#9a9a9a' },
  typeChipTextActive: { color: '#ff6600' },
  subtotal: { fontSize: 11, color: '#555', textAlign: 'right', marginTop: 2 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#141416', borderRadius: 10, borderWidth: 1, borderColor: '#2a2a2e', padding: 14, marginTop: 8 },
  totalLabel: { fontSize: 13, fontWeight: '700', color: '#555', textTransform: 'uppercase', letterSpacing: 0.5 },
  totalValue: { fontSize: 22, fontWeight: '900', color: '#ff6600' },
})
