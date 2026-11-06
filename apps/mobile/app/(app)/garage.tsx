import { useState, useEffect, useCallback } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  ActivityIndicator, RefreshControl, Modal, TextInput,
  KeyboardAvoidingView, Platform, Pressable, Alert, Dimensions,
} from 'react-native'
import { BarChart } from 'react-native-chart-kit'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import * as Notifications from 'expo-notifications'
import { apiFetch } from '../../lib/api'
import { useAuth } from '../../lib/auth'
import { getToken } from '../../lib/api'

interface Vehicle {
  id: string; brand: string; model: string; year: number
  plate?: string; vehicleType?: string; color?: string
  fuelType?: string; currentKm?: number; nickname?: string
  ipvaMonth?: number | null; licensingMonth?: number | null
}

const MONTH_NAMES = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']

interface TaxAlert {
  vehicleId: string
  vehicleName: string
  type: 'ipva' | 'licensing'
  month: number
  daysLeft: number
}

function getDaysUntilMonth(month: number): number {
  const now = new Date()
  const year = now.getMonth() + 1 >= month ? now.getFullYear() + 1 : now.getFullYear()
  const target = new Date(year, month - 1, 1)
  return Math.ceil((target.getTime() - now.getTime()) / 86400000)
}

function getTaxAlerts(vehicles: Vehicle[]): TaxAlert[] {
  const alerts: TaxAlert[] = []
  for (const v of vehicles) {
    const name = v.nickname ?? `${v.brand} ${v.model}`
    if (v.ipvaMonth) {
      const daysLeft = getDaysUntilMonth(v.ipvaMonth)
      if (daysLeft <= 60) alerts.push({ vehicleId: v.id, vehicleName: name, type: 'ipva', month: v.ipvaMonth, daysLeft })
    }
    if (v.licensingMonth) {
      const daysLeft = getDaysUntilMonth(v.licensingMonth)
      if (daysLeft <= 60) alerts.push({ vehicleId: v.id, vehicleName: name, type: 'licensing', month: v.licensingMonth, daysLeft })
    }
  }
  return alerts.sort((a, b) => a.daysLeft - b.daysLeft)
}

async function scheduleVehicleAlerts(vehicles: Vehicle[]) {
  try {
    const { status } = await Notifications.getPermissionsAsync()
    if (status !== 'granted') return

    const scheduled = await Notifications.getAllScheduledNotificationsAsync()
    for (const n of scheduled) {
      if (n.identifier.startsWith('ipva-') || n.identifier.startsWith('licensing-')) {
        await Notifications.cancelScheduledNotificationAsync(n.identifier)
      }
    }

    for (const v of vehicles) {
      const name = v.nickname ?? `${v.brand} ${v.model}`
      if (v.ipvaMonth) {
        const alertMonth = v.ipvaMonth === 1 ? 12 : v.ipvaMonth - 1
        await Notifications.scheduleNotificationAsync({
          identifier: `ipva-${v.id}`,
          content: {
            title: `IPVA — ${name}`,
            body: `Falta 1 mês para o vencimento do IPVA! Não deixe para a última hora.`,
            sound: true,
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
            month: alertMonth,
            day: 1,
            hour: 9,
            minute: 0,
            repeats: true,
          } as Notifications.CalendarTriggerInput,
        })
      }
      if (v.licensingMonth) {
        const alertMonth = v.licensingMonth === 1 ? 12 : v.licensingMonth - 1
        await Notifications.scheduleNotificationAsync({
          identifier: `licensing-${v.id}`,
          content: {
            title: `Licenciamento — ${name}`,
            body: `Falta 1 mês para o vencimento do licenciamento (CRLV).`,
            sound: true,
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
            month: alertMonth,
            day: 1,
            hour: 9,
            minute: 0,
            repeats: true,
          } as Notifications.CalendarTriggerInput,
        })
      }
    }
  } catch {}
}

interface MaintenanceLog {
  id: string; date: string; km?: number; category: string
  description: string; cost?: number; workshop?: string; notes?: string
}

interface FuelLog {
  id: string; date: string; odometer: number; liters: number
  pricePerLiter?: number | null; totalCost?: number | null
  fuelType?: string | null; fullTank: boolean
  station?: string | null; kmPerLiter?: number | null
}

interface FuelStats {
  avgKmL: number | null; totalLiters: number; totalSpent: number
  avgPricePerLiter: number | null; count: number
}

const VEHICLE_TYPES = [
  { value: 'carro', label: 'Carro' },
  { value: 'moto', label: 'Moto' },
  { value: 'caminhonete', label: 'Caminhonete' },
  { value: 'caminhao', label: 'Caminhão' },
]

const MAINTENANCE_CATEGORIES = [
  'Troca de óleo', 'Freios', 'Pneus', 'Filtros', 'Correia/corrente',
  'Suspensão', 'Elétrica', 'Revisão geral', 'Outros',
]

const FUEL_TYPES = ['Gasolina', 'Etanol', 'Diesel', 'Flex', 'GNV', 'Elétrico']

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function formatCurrency(val: number) {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// ─── Add Vehicle Modal ───────────────────────────────────────────────────────

interface AddVehicleModalProps {
  visible: boolean
  onClose: () => void
  onSaved: () => void
}

function AddVehicleModal({ visible, onClose, onSaved }: AddVehicleModalProps) {
  const [saving, setSaving] = useState(false)
  const [vehicleType, setVehicleType] = useState('carro')
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [plate, setPlate] = useState('')

  function reset() {
    setBrand(''); setModel(''); setYear(''); setPlate(''); setVehicleType('carro')
  }

  async function handleAdd() {
    if (!brand.trim() || !model.trim() || !year.trim()) {
      Alert.alert('Atenção', 'Preencha marca, modelo e ano.')
      return
    }
    const yearNum = parseInt(year, 10)
    if (isNaN(yearNum) || yearNum < 1950 || yearNum > new Date().getFullYear() + 1) {
      Alert.alert('Atenção', 'Informe um ano válido.')
      return
    }
    setSaving(true)
    try {
      const res = await apiFetch('/api/garage', {
        method: 'POST',
        body: JSON.stringify({ vehicleType, brand: brand.trim(), model: model.trim(), year: yearNum, plate: plate.trim() || undefined }),
      })
      if (res.ok) { reset(); onSaved() }
      else { const d = await res.json(); Alert.alert('Erro', d.error ?? 'Não foi possível adicionar.') }
    } catch {
      Alert.alert('Erro', 'Erro de conexão.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={s.overlay} onPress={onClose} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.modalWrapper}>
        <View style={s.modalSheet}>
          <View style={s.modalHandle} />
          <View style={s.modalHeader}>
            <Text style={s.modalTitle}>Adicionar veículo</Text>
            <TouchableOpacity onPress={onClose}><Ionicons name="close" size={22} color="#666" /></TouchableOpacity>
          </View>

          <Text style={s.fieldLabel}>Tipo</Text>
          <View style={s.typeRow}>
            {VEHICLE_TYPES.map((t) => (
              <TouchableOpacity key={t.value} style={[s.typeBtn, vehicleType === t.value && s.typeBtnActive]} onPress={() => setVehicleType(t.value)}>
                <Text style={[s.typeBtnText, vehicleType === t.value && s.typeBtnTextActive]}>{t.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={s.fieldLabel}>Marca *</Text>
          <TextInput style={s.input} placeholder="Ex: Volkswagen" placeholderTextColor="#444" value={brand} onChangeText={setBrand} autoCapitalize="words" />

          <Text style={s.fieldLabel}>Modelo *</Text>
          <TextInput style={s.input} placeholder="Ex: Gol" placeholderTextColor="#444" value={model} onChangeText={setModel} autoCapitalize="words" />

          <View style={s.row}>
            <View style={{ flex: 1 }}>
              <Text style={s.fieldLabel}>Ano *</Text>
              <TextInput style={s.input} placeholder="Ex: 2018" placeholderTextColor="#444" value={year} onChangeText={setYear} keyboardType="number-pad" maxLength={4} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={s.fieldLabel}>Placa</Text>
              <TextInput style={s.input} placeholder="Ex: ABC1D23" placeholderTextColor="#444" value={plate} onChangeText={(t) => setPlate(t.toUpperCase())} autoCapitalize="characters" maxLength={8} />
            </View>
          </View>

          <TouchableOpacity style={[s.saveBtn, saving && s.saveBtnDisabled]} onPress={handleAdd} disabled={saving}>
            {saving ? <ActivityIndicator color="#fff" size="small" /> : <Text style={s.saveBtnText}>Adicionar veículo</Text>}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

// ─── Vehicle Detail Modal ────────────────────────────────────────────────────

interface VehicleDetailModalProps {
  vehicle: Vehicle | null
  onClose: () => void
  onDeleted: () => void
  onUpdated: (v: Vehicle) => void
}

function VehicleDetailModal({ vehicle, onClose, onDeleted, onUpdated }: VehicleDetailModalProps) {
  const { user } = useAuth()
  const [logs, setLogs] = useState<MaintenanceLog[]>([])
  const [loadingLogs, setLoadingLogs] = useState(false)
  const [showAddLog, setShowAddLog] = useState(false)
  const [generatingPdf, setGeneratingPdf] = useState(false)

  const isPro = user?.isAdmin || user?.plan === "DRIVER_PRO" || user?.plan === "MECHANIC_PRO" || user?.isTrialing

  async function handleGeneratePdf() {
    if (!vehicle) return
    setGeneratingPdf(true)
    try {
      const token = await getToken()
      const API_BASE = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000'
      const url = `${API_BASE}/api/garage/pdf?vehicleId=${vehicle.id}`
      const filename = `laudo-${vehicle.brand}-${vehicle.model}-${vehicle.year}.pdf`
        .toLowerCase().replace(/\s+/g, '-')
      const dest = `${FileSystem.cacheDirectory}${filename}`

      const result = await FileSystem.downloadAsync(url, dest, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })

      if (result.status !== 200) {
        Alert.alert('Erro', 'Não foi possível gerar o laudo.')
        return
      }

      const canShare = await Sharing.isAvailableAsync()
      if (canShare) {
        await Sharing.shareAsync(result.uri, { mimeType: 'application/pdf', dialogTitle: `Laudo — ${vehicle.brand} ${vehicle.model}` })
      } else {
        Alert.alert('PDF salvo', `Arquivo salvo em:\n${result.uri}`)
      }
    } catch {
      Alert.alert('Erro', 'Falha ao gerar o laudo PDF.')
    } finally {
      setGeneratingPdf(false)
    }
  }

  // Edit vehicle form
  const [showEdit, setShowEdit] = useState(false)
  const [editType, setEditType] = useState('carro')
  const [editBrand, setEditBrand] = useState('')
  const [editModel, setEditModel] = useState('')
  const [editYear, setEditYear] = useState('')
  const [editPlate, setEditPlate] = useState('')
  const [editNickname, setEditNickname] = useState('')
  const [editIpvaMonth, setEditIpvaMonth] = useState<number | null>(null)
  const [editLicensingMonth, setEditLicensingMonth] = useState<number | null>(null)
  const [savingEdit, setSavingEdit] = useState(false)

  // Edit log form
  const [editingLogId, setEditingLogId] = useState<string | null>(null)
  const [editLogCategory, setEditLogCategory] = useState('Troca de óleo')
  const [editLogDesc, setEditLogDesc] = useState('')
  const [editLogDate, setEditLogDate] = useState('')
  const [editLogKm, setEditLogKm] = useState('')
  const [editLogCost, setEditLogCost] = useState('')
  const [editLogWorkshop, setEditLogWorkshop] = useState('')
  const [savingEditLog, setSavingEditLog] = useState(false)

  // Add log form
  const [logCategory, setLogCategory] = useState('Troca de óleo')
  const [logDesc, setLogDesc] = useState('')
  const [logDate, setLogDate] = useState(new Date().toISOString().slice(0, 10))
  const [logKm, setLogKm] = useState('')
  const [logCost, setLogCost] = useState('')
  const [logWorkshop, setLogWorkshop] = useState('')
  const [savingLog, setSavingLog] = useState(false)

  // Abastecimento
  const [activeTab, setActiveTab] = useState<'manutencao' | 'abastecimento'>('manutencao')
  const [fuelLogs, setFuelLogs] = useState<FuelLog[]>([])
  const [fuelStats, setFuelStats] = useState<FuelStats | null>(null)
  const [loadingFuelLogs, setLoadingFuelLogs] = useState(false)
  const [showAddFuelLog, setShowAddFuelLog] = useState(false)
  const [fuelDate, setFuelDate] = useState(new Date().toISOString().slice(0, 10))
  const [fuelOdometer, setFuelOdometer] = useState('')
  const [fuelLiters, setFuelLiters] = useState('')
  const [fuelPrice, setFuelPrice] = useState('')
  const [fuelTotal, setFuelTotal] = useState('')
  const [fuelType, setFuelType] = useState('')
  const [fuelFullTank, setFuelFullTank] = useState(true)
  const [fuelStation, setFuelStation] = useState('')
  const [savingFuel, setSavingFuel] = useState(false)

  function openEdit() {
    if (!vehicle) return
    setEditType(vehicle.vehicleType ?? 'carro')
    setEditBrand(vehicle.brand)
    setEditModel(vehicle.model)
    setEditYear(String(vehicle.year))
    setEditPlate(vehicle.plate ?? '')
    setEditNickname(vehicle.nickname ?? '')
    setEditIpvaMonth(vehicle.ipvaMonth ?? null)
    setEditLicensingMonth(vehicle.licensingMonth ?? null)
    setShowEdit(true)
  }

  async function handleSaveEdit() {
    if (!editBrand.trim() || !editModel.trim() || !editYear.trim()) {
      Alert.alert('Atenção', 'Preencha marca, modelo e ano.'); return
    }
    const yearNum = parseInt(editYear, 10)
    if (isNaN(yearNum) || yearNum < 1950 || yearNum > new Date().getFullYear() + 1) {
      Alert.alert('Atenção', 'Informe um ano válido.'); return
    }
    setSavingEdit(true)
    try {
      const res = await apiFetch(`/api/garage/${vehicle!.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          vehicleType: editType,
          brand: editBrand.trim(),
          model: editModel.trim(),
          year: yearNum,
          plate: editPlate.trim() || null,
          nickname: editNickname.trim() || null,
          ipvaMonth: editIpvaMonth,
          licensingMonth: editLicensingMonth,
        }),
      })
      if (res.ok) {
        const data = await res.json()
        setShowEdit(false)
        onUpdated(data.vehicle)
      } else {
        const d = await res.json(); Alert.alert('Erro', d.error ?? 'Não foi possível salvar.')
      }
    } catch {
      Alert.alert('Erro', 'Erro de conexão.')
    } finally {
      setSavingEdit(false)
    }
  }

  async function loadLogs() {
    if (!vehicle) return
    setLoadingLogs(true)
    try {
      const res = await apiFetch(`/api/garage/${vehicle.id}/maintenance`)
      const data = await res.json()
      setLogs(data.logs ?? [])
    } catch {}
    finally { setLoadingLogs(false) }
  }

  async function loadFuelLogs() {
    if (!vehicle) return
    setLoadingFuelLogs(true)
    try {
      const res = await apiFetch(`/api/garage/${vehicle.id}/fuel-logs`)
      const data = await res.json()
      setFuelLogs(data.logs ?? [])
      setFuelStats(data.stats ?? null)
    } catch {}
    finally { setLoadingFuelLogs(false) }
  }

  useEffect(() => {
    if (vehicle) {
      loadLogs(); loadFuelLogs()
      setShowAddLog(false); setShowEdit(false); setActiveTab('manutencao')
    }
  }, [vehicle?.id])

  function resetLogForm() {
    setLogCategory('Troca de óleo'); setLogDesc(''); setLogKm(''); setLogCost(''); setLogWorkshop('')
    setLogDate(new Date().toISOString().slice(0, 10))
  }

  function resetFuelForm() {
    setFuelDate(new Date().toISOString().slice(0, 10))
    setFuelOdometer(''); setFuelLiters(''); setFuelPrice(''); setFuelTotal('')
    setFuelType(''); setFuelFullTank(true); setFuelStation('')
  }

  function onFuelLitersChange(val: string) {
    setFuelLiters(val)
    const liters = parseFloat(val.replace(',', '.'))
    if (!isNaN(liters) && liters > 0) {
      const price = parseFloat(fuelPrice.replace(',', '.'))
      const total = parseFloat(fuelTotal.replace(',', '.'))
      if (!isNaN(price) && price > 0) {
        setFuelTotal((price * liters).toFixed(2).replace('.', ','))
      } else if (!isNaN(total) && total > 0) {
        setFuelPrice((total / liters).toFixed(3).replace('.', ','))
      }
    }
  }

  function onFuelPriceChange(val: string) {
    setFuelPrice(val)
    const price = parseFloat(val.replace(',', '.'))
    const liters = parseFloat(fuelLiters.replace(',', '.'))
    if (!isNaN(price) && !isNaN(liters) && price > 0 && liters > 0) {
      setFuelTotal((price * liters).toFixed(2).replace('.', ','))
    }
  }

  function onFuelTotalChange(val: string) {
    setFuelTotal(val)
    const total = parseFloat(val.replace(',', '.'))
    const liters = parseFloat(fuelLiters.replace(',', '.'))
    if (!isNaN(total) && !isNaN(liters) && total > 0 && liters > 0) {
      setFuelPrice((total / liters).toFixed(3).replace('.', ','))
    }
  }

  async function handleAddFuelLog() {
    if (!fuelOdometer.trim() || !fuelLiters.trim()) {
      Alert.alert('Atenção', 'Odômetro e litros são obrigatórios.'); return
    }
    setSavingFuel(true)
    try {
      const res = await apiFetch(`/api/garage/${vehicle!.id}/fuel-logs`, {
        method: 'POST',
        body: JSON.stringify({
          date: fuelDate,
          odometer: parseInt(fuelOdometer, 10),
          liters: parseFloat(fuelLiters.replace(',', '.')),
          pricePerLiter: fuelPrice ? parseFloat(fuelPrice.replace(',', '.')) : undefined,
          totalCost: fuelTotal ? parseFloat(fuelTotal.replace(',', '.')) : undefined,
          fuelType: fuelType || undefined,
          fullTank: fuelFullTank,
          station: fuelStation.trim() || undefined,
        }),
      })
      if (res.ok) {
        resetFuelForm(); setShowAddFuelLog(false); await loadFuelLogs()
      } else {
        const d = await res.json(); Alert.alert('Erro', d.error ?? 'Não foi possível salvar.')
      }
    } catch {
      Alert.alert('Erro', 'Erro de conexão.')
    } finally {
      setSavingFuel(false)
    }
  }

  async function handleDeleteFuelLog(logId: string) {
    try {
      await apiFetch(`/api/garage/${vehicle!.id}/fuel-logs/${logId}`, { method: 'DELETE' })
      await loadFuelLogs()
    } catch {
      Alert.alert('Erro', 'Não foi possível excluir.')
    }
  }

  function openEditLog(log: MaintenanceLog) {
    setEditingLogId(log.id)
    setEditLogCategory(log.category)
    setEditLogDesc(log.description)
    setEditLogDate(log.date.slice(0, 10))
    setEditLogKm(log.km != null ? String(log.km) : '')
    setEditLogCost(log.cost != null ? String(log.cost) : '')
    setEditLogWorkshop(log.workshop ?? '')
    setShowAddLog(false)
  }

  async function handleSaveEditLog() {
    if (!editLogDesc.trim()) { Alert.alert('Atenção', 'Descreva o serviço realizado.'); return }
    setSavingEditLog(true)
    try {
      const res = await apiFetch(`/api/garage/${vehicle!.id}/maintenance/${editingLogId}`, {
        method: 'PUT',
        body: JSON.stringify({
          date: editLogDate,
          category: editLogCategory,
          description: editLogDesc.trim(),
          km: editLogKm ? parseInt(editLogKm, 10) : undefined,
          cost: editLogCost ? parseFloat(editLogCost.replace(',', '.')) : undefined,
          workshop: editLogWorkshop.trim() || undefined,
        }),
      })
      if (res.ok) {
        setEditingLogId(null); await loadLogs()
      } else {
        const d = await res.json(); Alert.alert('Erro', d.error ?? 'Não foi possível salvar.')
      }
    } catch {
      Alert.alert('Erro', 'Erro de conexão.')
    } finally {
      setSavingEditLog(false)
    }
  }

  async function handleAddLog() {
    if (!logDesc.trim()) { Alert.alert('Atenção', 'Descreva o serviço realizado.'); return }
    setSavingLog(true)
    try {
      const res = await apiFetch(`/api/garage/${vehicle!.id}/maintenance`, {
        method: 'POST',
        body: JSON.stringify({
          date: logDate,
          category: logCategory,
          description: logDesc.trim(),
          km: logKm ? parseInt(logKm, 10) : undefined,
          cost: logCost ? parseFloat(logCost.replace(',', '.')) : undefined,
          workshop: logWorkshop.trim() || undefined,
        }),
      })
      if (res.ok) {
        resetLogForm(); setShowAddLog(false); await loadLogs()
      } else {
        const d = await res.json(); Alert.alert('Erro', d.error ?? 'Não foi possível salvar.')
      }
    } catch {
      Alert.alert('Erro', 'Erro de conexão.')
    } finally {
      setSavingLog(false)
    }
  }

  if (!vehicle) return null

  return (
    <Modal visible={!!vehicle} animationType="slide" onRequestClose={onClose}>
      <View style={d.container}>
        {/* Header */}
        <View style={d.header}>
          <TouchableOpacity onPress={showEdit ? () => setShowEdit(false) : onClose} style={d.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#f0ede8" />
          </TouchableOpacity>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={d.headerTitle}>
              {showEdit ? 'Editar veículo' : `${vehicle.brand} ${vehicle.model}`}
            </Text>
            {!showEdit && <Text style={d.headerSub}>{vehicle.year}{vehicle.plate ? ` · ${vehicle.plate.toUpperCase()}` : ''}</Text>}
          </View>
          {!showEdit && <>
            {isPro && (
              <TouchableOpacity style={d.pdfBtn} onPress={handleGeneratePdf} disabled={generatingPdf}>
                {generatingPdf
                  ? <ActivityIndicator size="small" color="#ff6600" />
                  : <Ionicons name="document-text-outline" size={20} color="#ff6600" />}
              </TouchableOpacity>
            )}
            <TouchableOpacity style={d.editVehicleBtn} onPress={openEdit}>
              <Ionicons name="pencil-outline" size={20} color="#ff6600" />
            </TouchableOpacity>
            <TouchableOpacity
              style={d.deleteVehicleBtn}
              onPress={() => Alert.alert('Excluir veículo', `Remover ${vehicle.brand} ${vehicle.model} e todo seu histórico?`, [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Excluir', style: 'destructive', onPress: async () => {
                  try {
                    await apiFetch(`/api/garage/${vehicle.id}`, { method: 'DELETE' })
                    onDeleted()
                  } catch {
                    Alert.alert('Erro', 'Não foi possível excluir o veículo.')
                  }
                }},
              ])}
            >
              <Ionicons name="trash-outline" size={20} color="#e03030" />
            </TouchableOpacity>
          </>}
        </View>

        {/* Edit form */}
        {showEdit ? (
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={d.content}>
              <Text style={d.fieldLabel}>Tipo</Text>
              <View style={s.typeRow}>
                {VEHICLE_TYPES.map((t) => (
                  <TouchableOpacity key={t.value} style={[s.typeBtn, editType === t.value && s.typeBtnActive]} onPress={() => setEditType(t.value)}>
                    <Text style={[s.typeBtnText, editType === t.value && s.typeBtnTextActive]}>{t.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={d.fieldLabel}>Marca *</Text>
              <TextInput style={d.input} placeholder="Ex: Volkswagen" placeholderTextColor="#444" value={editBrand} onChangeText={setEditBrand} autoCapitalize="words" />

              <Text style={d.fieldLabel}>Modelo *</Text>
              <TextInput style={d.input} placeholder="Ex: Gol" placeholderTextColor="#444" value={editModel} onChangeText={setEditModel} autoCapitalize="words" />

              <View style={d.formRow}>
                <View style={{ flex: 1 }}>
                  <Text style={d.fieldLabel}>Ano *</Text>
                  <TextInput style={d.input} placeholder="Ex: 2018" placeholderTextColor="#444" value={editYear} onChangeText={setEditYear} keyboardType="number-pad" maxLength={4} />
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={d.fieldLabel}>Placa</Text>
                  <TextInput style={d.input} placeholder="Ex: ABC1D23" placeholderTextColor="#444" value={editPlate} onChangeText={(t) => setEditPlate(t.toUpperCase())} autoCapitalize="characters" maxLength={8} />
                </View>
              </View>

              <Text style={d.fieldLabel}>Apelido (opcional)</Text>
              <TextInput style={d.input} placeholder="Ex: Fusca da família" placeholderTextColor="#444" value={editNickname} onChangeText={setEditNickname} />

              {/* ── IPVA ── */}
              <Text style={d.fieldLabel}>IPVA — mês de vencimento</Text>
              <Text style={d.fieldHint}>Vamos te avisar 30 dias antes</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 4 }}>
                <View style={{ flexDirection: 'row', gap: 8, paddingBottom: 4, paddingTop: 2 }}>
                  {MONTH_NAMES.map((name, i) => (
                    <TouchableOpacity
                      key={i}
                      style={[d.monthChip, editIpvaMonth === i + 1 && d.monthChipActive]}
                      onPress={() => setEditIpvaMonth(editIpvaMonth === i + 1 ? null : i + 1)}
                    >
                      <Text style={[d.monthChipText, editIpvaMonth === i + 1 && d.monthChipTextActive]}>{name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              {/* ── Licenciamento ── */}
              <Text style={d.fieldLabel}>Licenciamento — mês de vencimento</Text>
              <Text style={d.fieldHint}>Vamos te avisar 30 dias antes</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 4 }}>
                <View style={{ flexDirection: 'row', gap: 8, paddingBottom: 4, paddingTop: 2 }}>
                  {MONTH_NAMES.map((name, i) => (
                    <TouchableOpacity
                      key={i}
                      style={[d.monthChip, editLicensingMonth === i + 1 && d.monthChipActive]}
                      onPress={() => setEditLicensingMonth(editLicensingMonth === i + 1 ? null : i + 1)}
                    >
                      <Text style={[d.monthChipText, editLicensingMonth === i + 1 && d.monthChipTextActive]}>{name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              <TouchableOpacity style={[d.saveBtn, savingEdit && d.saveBtnDisabled]} onPress={handleSaveEdit} disabled={savingEdit}>
                {savingEdit ? <ActivityIndicator color="#fff" size="small" /> : <Text style={d.saveBtnText}>Salvar alterações</Text>}
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        ) : (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={d.content}>
          {/* Tabs */}
          <View style={d.tabBar}>
            <TouchableOpacity style={[d.tab, activeTab === 'manutencao' && d.tabActive]} onPress={() => setActiveTab('manutencao')}>
              <Text style={[d.tabText, activeTab === 'manutencao' && d.tabTextActive]}>Manutenções</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[d.tab, activeTab === 'abastecimento' && d.tabActive]} onPress={() => setActiveTab('abastecimento')}>
              <Text style={[d.tabText, activeTab === 'abastecimento' && d.tabTextActive]}>Abastecimentos</Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'manutencao' ? (<>
          {/* Maintenance logs section */}
          <View style={d.sectionHeader}>
            <Text style={d.sectionTitle}>Manutenções</Text>
            <TouchableOpacity style={d.addLogBtn} onPress={() => setShowAddLog(!showAddLog)}>
              <Ionicons name={showAddLog ? 'remove' : 'add'} size={18} color="#ff6600" />
              <Text style={d.addLogText}>{showAddLog ? 'Cancelar' : 'Registrar'}</Text>
            </TouchableOpacity>
          </View>

          {/* Add log form */}
          {showAddLog && (
            <View style={d.addLogForm}>
              <Text style={d.fieldLabel}>Categoria</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 4 }}>
                <View style={{ flexDirection: 'row', gap: 8, paddingBottom: 4 }}>
                  {MAINTENANCE_CATEGORIES.map((cat) => (
                    <TouchableOpacity key={cat} style={[d.catChip, logCategory === cat && d.catChipActive]} onPress={() => setLogCategory(cat)}>
                      <Text style={[d.catChipText, logCategory === cat && d.catChipTextActive]}>{cat}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              <Text style={d.fieldLabel}>Descrição *</Text>
              <TextInput style={d.input} placeholder="Ex: Troca óleo 5W30 + filtro" placeholderTextColor="#444" value={logDesc} onChangeText={setLogDesc} multiline />

              <View style={d.formRow}>
                <View style={{ flex: 1 }}>
                  <Text style={d.fieldLabel}>Data</Text>
                  <TextInput style={d.input} placeholder="AAAA-MM-DD" placeholderTextColor="#444" value={logDate} onChangeText={setLogDate} />
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={d.fieldLabel}>KM</Text>
                  <TextInput style={d.input} placeholder="Ex: 45000" placeholderTextColor="#444" value={logKm} onChangeText={setLogKm} keyboardType="number-pad" />
                </View>
              </View>

              <View style={d.formRow}>
                <View style={{ flex: 1 }}>
                  <Text style={d.fieldLabel}>Custo (R$)</Text>
                  <TextInput style={d.input} placeholder="Ex: 180,00" placeholderTextColor="#444" value={logCost} onChangeText={setLogCost} keyboardType="decimal-pad" />
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={d.fieldLabel}>Oficina</Text>
                  <TextInput style={d.input} placeholder="Nome da oficina" placeholderTextColor="#444" value={logWorkshop} onChangeText={setLogWorkshop} />
                </View>
              </View>

              <TouchableOpacity style={[d.saveBtn, savingLog && d.saveBtnDisabled]} onPress={handleAddLog} disabled={savingLog}>
                {savingLog ? <ActivityIndicator color="#fff" size="small" /> : <Text style={d.saveBtnText}>Salvar manutenção</Text>}
              </TouchableOpacity>
            </View>
          )}

          {/* Log list */}
          {loadingLogs ? (
            <View style={d.center}><ActivityIndicator color="#ff6600" /></View>
          ) : logs.length === 0 ? (
            <View style={d.emptyLogs}>
              <Ionicons name="clipboard-outline" size={40} color="#2a2a2e" style={{ marginBottom: 10 }} />
              <Text style={d.emptyLogsText}>Nenhuma manutenção registrada ainda.</Text>
              <Text style={d.emptyLogsSub}>Toque em "Registrar" para adicionar.</Text>
            </View>
          ) : (
            logs.map((log) => (
              <View key={log.id} style={d.logCard}>
                {editingLogId === log.id ? (
                  /* ── Inline edit form ── */
                  <View>
                    <Text style={d.fieldLabel}>Categoria</Text>
                    <View style={{ marginBottom: 10 }}>
                      <View style={[d.catChip, d.catChipActive, { alignSelf: 'flex-start' }]}>
                        <Text style={[d.catChipText, d.catChipTextActive]}>{editLogCategory}</Text>
                      </View>
                    </View>

                    <Text style={d.fieldLabel}>Descrição *</Text>
                    <TextInput style={d.input} placeholderTextColor="#444" value={editLogDesc} onChangeText={setEditLogDesc} multiline />

                    <View style={d.formRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={d.fieldLabel}>Data</Text>
                        <TextInput style={d.input} placeholder="AAAA-MM-DD" placeholderTextColor="#444" value={editLogDate} onChangeText={setEditLogDate} />
                      </View>
                      <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={d.fieldLabel}>KM</Text>
                        <TextInput style={d.input} placeholderTextColor="#444" value={editLogKm} onChangeText={setEditLogKm} keyboardType="number-pad" />
                      </View>
                    </View>

                    <View style={d.formRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={d.fieldLabel}>Custo (R$)</Text>
                        <TextInput style={d.input} placeholderTextColor="#444" value={editLogCost} onChangeText={setEditLogCost} keyboardType="decimal-pad" />
                      </View>
                      <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={d.fieldLabel}>Oficina</Text>
                        <TextInput style={d.input} placeholderTextColor="#444" value={editLogWorkshop} onChangeText={setEditLogWorkshop} />
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
                      <TouchableOpacity style={[d.saveBtn, { flex: 1, backgroundColor: '#1a1a1c', marginTop: 0 }]} onPress={() => setEditingLogId(null)}>
                        <Text style={[d.saveBtnText, { color: '#888' }]}>Cancelar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[d.saveBtn, { flex: 2, marginTop: 0 }, savingEditLog && d.saveBtnDisabled]} onPress={handleSaveEditLog} disabled={savingEditLog}>
                        {savingEditLog ? <ActivityIndicator color="#fff" size="small" /> : <Text style={d.saveBtnText}>Salvar</Text>}
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  /* ── Log view ── */
                  <>
                    <View style={d.logHeader}>
                      <View style={d.logCatBadge}>
                        <Text style={d.logCatText}>{log.category}</Text>
                      </View>
                      <Text style={[d.logDate, { flex: 1, textAlign: 'right', marginRight: 4 }]}>{formatDate(log.date)}</Text>
                      <TouchableOpacity style={{ padding: 8 }} onPress={() => openEditLog(log)}>
                        <Ionicons name="pencil-outline" size={17} color="#ff6600" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ padding: 8, marginLeft: 4 }}
                        onPress={() => Alert.alert('Excluir registro', 'Remover este registro de manutenção?', [
                          { text: 'Cancelar', style: 'cancel' },
                          { text: 'Excluir', style: 'destructive', onPress: async () => {
                            try {
                              await apiFetch(`/api/garage/${vehicle!.id}/maintenance/${log.id}`, { method: 'DELETE' })
                              await loadLogs()
                            } catch {
                              Alert.alert('Erro', 'Não foi possível excluir.')
                            }
                          }},
                        ])}
                      >
                        <Ionicons name="trash-outline" size={17} color="#555" />
                      </TouchableOpacity>
                    </View>
                    <Text style={d.logDesc}>{log.description}</Text>
                    <View style={d.logMeta}>
                      {log.km != null && (
                        <View style={d.metaItem}>
                          <Ionicons name="speedometer-outline" size={12} color="#555" />
                          <Text style={d.metaText}>{log.km.toLocaleString('pt-BR')} km</Text>
                        </View>
                      )}
                      {log.cost != null && (
                        <View style={d.metaItem}>
                          <Ionicons name="cash-outline" size={12} color="#555" />
                          <Text style={d.metaText}>{formatCurrency(log.cost)}</Text>
                        </View>
                      )}
                      {log.workshop && (
                        <View style={d.metaItem}>
                          <Ionicons name="business-outline" size={12} color="#555" />
                          <Text style={d.metaText}>{log.workshop}</Text>
                        </View>
                      )}
                    </View>
                  </>
                )}
              </View>
            ))
          )}

          {/* Custo por km — só Pro */}
          {isPro && (() => {
            const totalCost = logs.reduce((s, l) => s + (l.cost ?? 0), 0)
            const firstLogKm = [...logs].reverse().find(l => l.km)?.km
            const kmRodado = vehicle?.currentKm && firstLogKm ? vehicle.currentKm - firstLogKm : vehicle?.currentKm ?? 0
            const custoPorKm = totalCost > 0 && kmRodado > 0 ? totalCost / kmRodado : null
            if (!custoPorKm) return null
            return (
              <View style={d.custoPorKmCard}>
                <View style={{ flex: 1 }}>
                  <Text style={d.custoPorKmLabel}>⭐ Custo por km rodado</Text>
                  <Text style={d.custoPorKmSub}>{kmRodado.toLocaleString('pt-BR')} km · R$ {totalCost.toFixed(0)}</Text>
                </View>
                <Text style={d.custoPorKmValue}>
                  R$ {custoPorKm.toFixed(2).replace('.', ',')}
                  <Text style={d.custoPorKmUnit}>/km</Text>
                </Text>
              </View>
            )
          })()}

          {/* Gráfico de gastos por categoria — só Pro */}
          {isPro && (() => {
            const chartRaw = logs.reduce<Record<string, number>>((acc, l) => {
              if (l.cost) acc[l.category] = (acc[l.category] ?? 0) + l.cost
              return acc
            }, {})
            const entries = Object.entries(chartRaw).sort((a, b) => b[1] - a[1]).slice(0, 6)
            if (entries.length === 0) return null
            const screenW = Dimensions.get('window').width
            return (
              <View style={d.chartSection}>
                <Text style={d.chartTitle}>⭐ Gastos por categoria</Text>
                <BarChart
                  data={{
                    labels: entries.map(([k]) => k.split(' ')[0]),
                    datasets: [{ data: entries.map(([, v]) => v) }],
                  }}
                  width={screenW - 64}
                  height={180}
                  fromZero
                  showValuesOnTopOfBars
                  withInnerLines={false}
                  chartConfig={{
                    backgroundGradientFrom: '#141416',
                    backgroundGradientTo: '#141416',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 102, 0, ${opacity})`,
                    labelColor: () => '#666',
                    style: { borderRadius: 8 },
                    propsForLabels: { fontSize: 9 },
                  }}
                  style={{ borderRadius: 8, marginTop: 8 }}
                  yAxisLabel=""
                  yAxisSuffix=""
                />
                <View style={d.chartLegend}>
                  {entries.map(([cat, val], i) => (
                    <View key={cat} style={d.chartLegendRow}>
                      <View style={[d.chartDot, { opacity: 1 - i * 0.12 }]} />
                      <Text style={d.chartLegendLabel} numberOfLines={1}>{cat}</Text>
                      <Text style={d.chartLegendValue}>R$ {val.toFixed(0)}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )
          })()}
          </>) : (<>

          {/* ─── Abastecimentos ─── */}
          {fuelStats && fuelStats.count > 0 && (
            <View style={d.fuelStatsRow}>
              <View style={d.fuelStat}>
                <Text style={d.fuelStatValue}>
                  {fuelStats.avgKmL != null ? fuelStats.avgKmL.toFixed(1).replace('.', ',') : '—'}
                </Text>
                <Text style={d.fuelStatLabel}>km/L médio</Text>
              </View>
              <View style={d.fuelStatDivider} />
              <View style={d.fuelStat}>
                <Text style={d.fuelStatValue}>{fuelStats.totalLiters.toFixed(0)} L</Text>
                <Text style={d.fuelStatLabel}>total litros</Text>
              </View>
              <View style={d.fuelStatDivider} />
              <View style={d.fuelStat}>
                <Text style={d.fuelStatValue}>R$ {fuelStats.totalSpent.toFixed(0)}</Text>
                <Text style={d.fuelStatLabel}>total gasto</Text>
              </View>
            </View>
          )}

          <View style={d.sectionHeader}>
            <Text style={d.sectionTitle}>Abastecimentos</Text>
            <TouchableOpacity style={d.addLogBtn} onPress={() => setShowAddFuelLog(!showAddFuelLog)}>
              <Ionicons name={showAddFuelLog ? 'remove' : 'add'} size={18} color="#ff6600" />
              <Text style={d.addLogText}>{showAddFuelLog ? 'Cancelar' : 'Registrar'}</Text>
            </TouchableOpacity>
          </View>

          {showAddFuelLog && (
            <View style={d.addLogForm}>
              <View style={d.formRow}>
                <View style={{ flex: 1 }}>
                  <Text style={d.fieldLabel}>Data</Text>
                  <TextInput style={d.input} placeholder="AAAA-MM-DD" placeholderTextColor="#444" value={fuelDate} onChangeText={setFuelDate} />
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={d.fieldLabel}>Odômetro (km) *</Text>
                  <TextInput style={d.input} placeholder="Ex: 45000" placeholderTextColor="#444" value={fuelOdometer} onChangeText={setFuelOdometer} keyboardType="number-pad" />
                </View>
              </View>

              <View style={d.formRow}>
                <View style={{ flex: 1 }}>
                  <Text style={d.fieldLabel}>Litros *</Text>
                  <TextInput style={d.input} placeholder="Ex: 40,5" placeholderTextColor="#444" value={fuelLiters} onChangeText={onFuelLitersChange} keyboardType="decimal-pad" />
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={d.fieldLabel}>Preço/L (R$)</Text>
                  <TextInput style={d.input} placeholder="Ex: 6,29" placeholderTextColor="#444" value={fuelPrice} onChangeText={onFuelPriceChange} keyboardType="decimal-pad" />
                </View>
              </View>

              <Text style={d.fieldLabel}>Total gasto (R$)</Text>
              <TextInput style={d.input} placeholder="Ex: 254,75" placeholderTextColor="#444" value={fuelTotal} onChangeText={onFuelTotalChange} keyboardType="decimal-pad" />

              <Text style={d.fieldLabel}>Tipo de combustível</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 4 }}>
                <View style={{ flexDirection: 'row', gap: 8, paddingBottom: 4 }}>
                  {FUEL_TYPES.map((ft) => (
                    <TouchableOpacity key={ft} style={[d.catChip, fuelType === ft && d.catChipActive]} onPress={() => setFuelType(fuelType === ft ? '' : ft)}>
                      <Text style={[d.catChipText, fuelType === ft && d.catChipTextActive]}>{ft}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              <View style={{ marginTop: 12, marginBottom: 4 }}>
                <TouchableOpacity style={[d.toggleBtn, fuelFullTank && d.toggleBtnActive]} onPress={() => setFuelFullTank(!fuelFullTank)}>
                  <Ionicons name={fuelFullTank ? 'checkmark-circle' : 'ellipse-outline'} size={16} color={fuelFullTank ? '#ff6600' : '#9a9a9a'} />
                  <Text style={[d.toggleText, fuelFullTank && d.toggleTextActive]}>Tanque cheio</Text>
                </TouchableOpacity>
              </View>

              <Text style={d.fieldLabel}>Posto (opcional)</Text>
              <TextInput style={d.input} placeholder="Ex: Shell Paulista" placeholderTextColor="#444" value={fuelStation} onChangeText={setFuelStation} />

              <TouchableOpacity style={[d.saveBtn, savingFuel && d.saveBtnDisabled]} onPress={handleAddFuelLog} disabled={savingFuel}>
                {savingFuel ? <ActivityIndicator color="#fff" size="small" /> : <Text style={d.saveBtnText}>Salvar abastecimento</Text>}
              </TouchableOpacity>
            </View>
          )}

          {loadingFuelLogs ? (
            <View style={d.center}><ActivityIndicator color="#ff6600" /></View>
          ) : fuelLogs.length === 0 ? (
            <View style={d.emptyLogs}>
              <Ionicons name="water-outline" size={40} color="#2a2a2e" style={{ marginBottom: 10 }} />
              <Text style={d.emptyLogsText}>Nenhum abastecimento registrado.</Text>
              <Text style={d.emptyLogsSub}>Toque em "Registrar" para adicionar.</Text>
            </View>
          ) : (
            fuelLogs.map((log) => (
              <View key={log.id} style={d.logCard}>
                <View style={d.logHeader}>
                  {log.kmPerLiter != null ? (
                    <View style={d.kmLBadge}>
                      <Text style={d.kmLText}>{log.kmPerLiter.toFixed(1).replace('.', ',')} km/L</Text>
                    </View>
                  ) : (
                    <View style={[d.kmLBadge, { backgroundColor: 'rgba(80,80,80,0.12)', borderColor: '#2a2a2e' }]}>
                      <Text style={[d.kmLText, { color: '#555' }]}>— km/L</Text>
                    </View>
                  )}
                  <Text style={[d.logDate, { flex: 1, textAlign: 'right', marginRight: 4 }]}>{formatDate(log.date)}</Text>
                  <TouchableOpacity
                    style={{ padding: 8 }}
                    onPress={() => Alert.alert('Excluir', 'Remover este abastecimento?', [
                      { text: 'Cancelar', style: 'cancel' },
                      { text: 'Excluir', style: 'destructive', onPress: () => handleDeleteFuelLog(log.id) },
                    ])}
                  >
                    <Ionicons name="trash-outline" size={17} color="#555" />
                  </TouchableOpacity>
                </View>
                <View style={d.logMeta}>
                  <View style={d.metaItem}>
                    <Ionicons name="speedometer-outline" size={12} color="#555" />
                    <Text style={d.metaText}>{log.odometer.toLocaleString('pt-BR')} km</Text>
                  </View>
                  <View style={d.metaItem}>
                    <Ionicons name="beaker-outline" size={12} color="#555" />
                    <Text style={d.metaText}>{log.liters.toFixed(1).replace('.', ',')} L</Text>
                  </View>
                  {log.pricePerLiter != null && (
                    <View style={d.metaItem}>
                      <Ionicons name="pricetag-outline" size={12} color="#555" />
                      <Text style={d.metaText}>R$ {log.pricePerLiter.toFixed(3).replace('.', ',')}/L</Text>
                    </View>
                  )}
                  {log.totalCost != null && (
                    <View style={d.metaItem}>
                      <Ionicons name="cash-outline" size={12} color="#555" />
                      <Text style={d.metaText}>{formatCurrency(log.totalCost)}</Text>
                    </View>
                  )}
                </View>
                {(log.fullTank || log.fuelType || log.station) && (
                  <View style={[d.logMeta, { marginTop: 6 }]}>
                    {log.fullTank && (
                      <View style={d.logCatBadge}>
                        <Text style={d.logCatText}>Tanque cheio</Text>
                      </View>
                    )}
                    {log.fuelType && (
                      <View style={[d.logCatBadge, { backgroundColor: 'rgba(80,80,100,0.12)', borderColor: '#2a2a2e' }]}>
                        <Text style={[d.logCatText, { color: '#888' }]}>{log.fuelType}</Text>
                      </View>
                    )}
                    {log.station && (
                      <View style={d.metaItem}>
                        <Ionicons name="location-outline" size={12} color="#555" />
                        <Text style={d.metaText}>{log.station}</Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            ))
          )}
          </>)}

        </ScrollView>
        )}
      </View>
    </Modal>
  )
}

// ─── Main Screen ─────────────────────────────────────────────────────────────

interface MaintenanceAlert {
  id: string
  vehicleName: string
  category: string
  description: string
  nextDate: string
  nextKm: number | null
  daysLeft: number
}

export default function GarageScreen() {
  const { user } = useAuth()
  const router = useRouter()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [alerts, setAlerts] = useState<MaintenanceAlert[]>([])
  const [taxAlerts, setTaxAlerts] = useState<TaxAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)

  const isPro = user?.isAdmin || user?.plan === "DRIVER_PRO" || user?.plan === "MECHANIC_PRO" || user?.isTrialing
  const atFreeLimit = !isPro && vehicles.length >= 1

  useEffect(() => {
    async function initNotifications() {
      try {
        const { status } = await Notifications.requestPermissionsAsync()
        if (status !== 'granted') return
        const tokenData = await Notifications.getExpoPushTokenAsync({
          projectId: 'ed86c1f9-04ed-4dfd-bb43-e376192b4fc5',
        })
        await apiFetch('/api/push-token', {
          method: 'POST',
          body: JSON.stringify({ token: tokenData.data }),
        })
      } catch {}
    }
    initNotifications()
  }, [])

  async function load() {
    try {
      const [garageRes, alertsRes] = await Promise.all([
        apiFetch('/api/garage'),
        isPro ? apiFetch('/api/alerts/upcoming') : Promise.resolve(null),
      ])
      const garageData = await garageRes.json()
      const loadedVehicles: Vehicle[] = garageData.vehicles ?? []
      setVehicles(loadedVehicles)
      setTaxAlerts(getTaxAlerts(loadedVehicles))
      scheduleVehicleAlerts(loadedVehicles)
      if (alertsRes) {
        const alertsData = await alertsRes.json()
        setAlerts(alertsData.alerts ?? [])
      }
    } catch {}
    finally { setLoading(false); setRefreshing(false) }
  }

  useEffect(() => { load() }, [])
  const onRefresh = useCallback(() => { setRefreshing(true); load() }, [])

  if (loading) {
    return <View style={s.center}><ActivityIndicator color="#ff6600" size="large" /></View>
  }

  return (
    <View style={s.root}>
      <ScrollView
        style={s.container}
        contentContainerStyle={s.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#ff6600" />}
      >
        {/* Alertas de IPVA e Licenciamento */}
        {taxAlerts.length > 0 && (
          <View style={s.alertsSection}>
            <Text style={s.alertsSectionTitle}>IMPOSTOS & DOCUMENTOS</Text>
            {taxAlerts.map(alert => (
              <View key={`${alert.type}-${alert.vehicleId}`} style={[
                s.taxAlertCard,
                alert.daysLeft <= 7 ? s.alertRed : alert.daysLeft <= 30 ? s.alertOrange : s.alertYellow,
              ]}>
                <View style={s.alertTop}>
                  <View style={[s.taxTypeBadge, { backgroundColor: alert.type === 'ipva' ? 'rgba(59,130,246,0.2)' : 'rgba(168,85,247,0.2)' }]}>
                    <Text style={[s.taxTypeBadgeText, { color: alert.type === 'ipva' ? '#60a5fa' : '#c084fc' }]}>
                      {alert.type === 'ipva' ? 'IPVA' : 'CRLV'}
                    </Text>
                  </View>
                  <Text style={[s.alertVehicle, { marginLeft: 8 }]}>{alert.vehicleName}</Text>
                  <View style={[s.alertBadge, { backgroundColor: alert.daysLeft <= 7 ? '#ef4444' : alert.daysLeft <= 30 ? '#f97316' : '#eab308' }]}>
                    <Text style={s.alertBadgeText}>
                      {alert.daysLeft === 0 ? 'Hoje' : alert.daysLeft < 0 ? 'Vencido' : `${alert.daysLeft}d`}
                    </Text>
                  </View>
                </View>
                <Text style={s.alertDate}>
                  Vence em {MONTH_NAMES[alert.month - 1]}
                  {alert.daysLeft > 0 ? ` — ${alert.daysLeft} dias` : alert.daysLeft === 0 ? ' — hoje!' : ' — já venceu!'}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Alertas de manutenção próxima — só Pro */}
        {isPro && alerts.length > 0 && (
          <View style={s.alertsSection}>
            <Text style={s.alertsSectionTitle}>MANUTENÇOES PRÓXIMAS</Text>
            {alerts.map(alert => (
              <View key={alert.id} style={[
                s.alertCard,
                alert.daysLeft <= 2 ? s.alertRed : alert.daysLeft <= 4 ? s.alertOrange : s.alertYellow,
              ]}>
                <View style={s.alertTop}>
                  <Text style={s.alertVehicle}>{alert.vehicleName}</Text>
                  <View style={[
                    s.alertBadge,
                    { backgroundColor: alert.daysLeft <= 2 ? '#ef4444' : alert.daysLeft <= 4 ? '#f97316' : '#eab308' },
                  ]}>
                    <Text style={s.alertBadgeText}>
                      {alert.daysLeft === 0 ? 'Hoje' : `${alert.daysLeft}d`}
                    </Text>
                  </View>
                </View>
                <Text style={s.alertDesc}>{alert.category} — {alert.description}</Text>
                <Text style={s.alertDate}>
                  {new Date(alert.nextDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
                  {alert.nextKm ? ` · ${alert.nextKm.toLocaleString('pt-BR')} km` : ''}
                </Text>
              </View>
            ))}
          </View>
        )}

        {vehicles.length === 0 ? (
          <View style={s.empty}>
            <Ionicons name="car-outline" size={56} color="#333" style={{ marginBottom: 16 }} />
            <Text style={s.emptyTitle}>Sua garagem está vazia</Text>
            <Text style={s.emptyDesc}>Toque no botão abaixo para adicionar seu veículo.</Text>
          </View>
        ) : (
          vehicles.map((v) => {
            const vTaxAlerts = taxAlerts.filter(a => a.vehicleId === v.id)
            return (
            <TouchableOpacity key={v.id} style={s.card} onPress={() => setSelectedVehicle(v)} activeOpacity={0.75}>
              <View style={s.cardLeft}>
                <Text style={s.cardTitle}>{v.nickname ?? `${v.brand} ${v.model}`}</Text>
                {v.nickname && <Text style={s.cardModelSub}>{v.brand} {v.model}</Text>}
                <Text style={s.cardSub}>{v.year}{v.plate ? ` · ${v.plate.toUpperCase()}` : ''}</Text>
                {vTaxAlerts.length > 0 && (
                  <View style={{ flexDirection: 'row', gap: 6, marginTop: 6 }}>
                    {vTaxAlerts.map(a => (
                      <View key={a.type} style={[s.taxChip, { backgroundColor: a.daysLeft <= 7 ? 'rgba(239,68,68,0.15)' : a.daysLeft <= 30 ? 'rgba(249,115,22,0.15)' : 'rgba(234,179,8,0.12)' }]}>
                        <Text style={[s.taxChipText, { color: a.daysLeft <= 7 ? '#ef4444' : a.daysLeft <= 30 ? '#f97316' : '#ca8a04' }]}>
                          {a.type === 'ipva' ? 'IPVA' : 'CRLV'} {MONTH_NAMES[a.month - 1]}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
              <View style={s.cardRight}>
                <Ionicons name={v.vehicleType === 'moto' ? 'bicycle-outline' : 'car-outline'} size={24} color="#444" />
                <Ionicons name="chevron-forward" size={14} color="#333" style={{ marginTop: 4 }} />
              </View>
            </TouchableOpacity>
            )
          })
        )}

        {/* Card "adicionar veículo" — sempre visível */}
        {atFreeLimit ? (
          <TouchableOpacity style={s.addProCard} onPress={() => router.push('/(app)/plans' as any)} activeOpacity={0.8}>
            <View style={s.addProIconBox}>
              <Ionicons name="add" size={22} color="#ff6600" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.addProTitle}>Para mais de um veículo</Text>
              <Text style={s.addProDesc}>obtenha o plano Pro →</Text>
            </View>
            <Ionicons name="star" size={16} color="#ff6600" />
          </TouchableOpacity>
        ) : null}
      </ScrollView>

      {/* FAB — só aparece quando pode adicionar */}
      {!atFreeLimit && (
        <TouchableOpacity style={s.fab} onPress={() => setShowAdd(true)} activeOpacity={0.85}>
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      )}

      <AddVehicleModal
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        onSaved={() => { setShowAdd(false); load() }}
      />

      <VehicleDetailModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        onDeleted={() => { setSelectedVehicle(null); load() }}
        onUpdated={(v) => { setSelectedVehicle(v); load() }}
      />
    </View>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0e0e0f' },
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 100 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0e0e0f' },
  empty: { alignItems: 'center', paddingVertical: 60 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#f0ede8', marginBottom: 8 },
  emptyDesc: { fontSize: 13, color: '#555', textAlign: 'center', lineHeight: 20 },
  card: { backgroundColor: '#141416', borderRadius: 12, borderWidth: 1, borderColor: '#2a2a2e', padding: 18, flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  cardLeft: { flex: 1 },
  cardRight: { alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#f0ede8' },
  cardModelSub: { fontSize: 12, color: '#666', marginTop: 1 },
  cardSub: { fontSize: 13, color: '#666', marginTop: 2 },
  fab: {
    position: 'absolute', bottom: 28, right: 24,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#ff6600', alignItems: 'center', justifyContent: 'center',
    shadowColor: '#ff6600', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 8,
  },
  alertsSection: { marginBottom: 16 },
  alertsSectionTitle: { fontSize: 12, fontWeight: '700', color: '#888', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 },
  alertCard: { borderRadius: 12, padding: 14, marginBottom: 8, borderWidth: 1 },
  alertRed:    { backgroundColor: 'rgba(239,68,68,0.08)',   borderColor: 'rgba(239,68,68,0.3)'   },
  alertOrange: { backgroundColor: 'rgba(249,115,22,0.08)',  borderColor: 'rgba(249,115,22,0.3)'  },
  alertYellow: { backgroundColor: 'rgba(234,179,8,0.08)',   borderColor: 'rgba(234,179,8,0.3)'   },
  alertTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  alertVehicle: { fontSize: 13, fontWeight: '700', color: '#f0ede8', flex: 1, marginRight: 8 },
  alertBadge: { borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3 },
  alertBadgeText: { fontSize: 11, fontWeight: '800', color: '#fff' },
  alertDesc: { fontSize: 13, color: '#ccc', marginBottom: 2 },
  alertDate: { fontSize: 11, color: '#666' },
  taxAlertCard: { borderRadius: 12, padding: 14, marginBottom: 8, borderWidth: 1 },
  taxTypeBadge: { borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3 },
  taxTypeBadgeText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  taxChip: { borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3 },
  taxChipText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.3 },
  addProCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: '#0f0f11', borderRadius: 14,
    borderWidth: 1, borderColor: 'rgba(255,102,0,0.25)',
    borderStyle: 'dashed', padding: 16, marginBottom: 10,
  },
  addProIconBox: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,102,0,0.1)', borderWidth: 1,
    borderColor: 'rgba(255,102,0,0.3)', alignItems: 'center', justifyContent: 'center',
  },
  addProTitle: { fontSize: 14, fontWeight: '700', color: '#f0ede8' },
  addProDesc: { fontSize: 12, color: '#ff6600', marginTop: 2 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' },
  modalWrapper: { justifyContent: 'flex-end', flex: 1 },
  modalSheet: { backgroundColor: '#141416', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40, borderTopWidth: 1, borderTopColor: '#2a2a2e' },
  modalHandle: { width: 40, height: 4, backgroundColor: '#333', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#f0ede8' },
  fieldLabel: { fontSize: 11, fontWeight: '700', color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8, marginTop: 14 },
  typeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  typeBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#2a2a2e', backgroundColor: '#0e0e0f' },
  typeBtnActive: { backgroundColor: 'rgba(255,102,0,0.15)', borderColor: 'rgba(255,102,0,0.5)' },
  typeBtnText: { color: '#777', fontSize: 13, fontWeight: '600' },
  typeBtnTextActive: { color: '#ff6600' },
  input: { backgroundColor: '#0e0e0f', borderRadius: 10, borderWidth: 1, borderColor: '#2a2a2e', padding: 13, color: '#f0ede8', fontSize: 15 },
  row: { flexDirection: 'row' },
  saveBtn: { marginTop: 20, backgroundColor: '#ff6600', borderRadius: 10, padding: 16, alignItems: 'center' },
  saveBtnDisabled: { opacity: 0.6 },
  saveBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
})

const d = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0e0e0f' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, paddingTop: 52, borderBottomWidth: 1, borderBottomColor: '#1a1a1c', gap: 8 },
  pdfBtn: { padding: 6 },
  editVehicleBtn: { padding: 6 },
  deleteVehicleBtn: { padding: 6 },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#f0ede8' },
  headerSub: { fontSize: 12, color: '#666', marginTop: 2 },
  content: { padding: 16, paddingBottom: 48 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#555', letterSpacing: 1, textTransform: 'uppercase' },
  custoPorKmCard: { flexDirection: 'row', alignItems: 'center', marginTop: 16, padding: 14, borderRadius: 14, backgroundColor: 'rgba(255,102,0,0.06)', borderWidth: 1, borderColor: 'rgba(255,102,0,0.2)' },
  custoPorKmLabel: { fontSize: 11, fontWeight: '700', color: '#ff8533', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 },
  custoPorKmSub: { fontSize: 11, color: '#555' },
  custoPorKmValue: { fontSize: 26, fontWeight: '900', color: '#ff6600' },
  custoPorKmUnit: { fontSize: 13, fontWeight: '400', color: '#666' },
  chartSection: { marginTop: 24, padding: 16, backgroundColor: '#0f0f11', borderRadius: 14, borderWidth: 1, borderColor: '#2a2a2e' },
  chartTitle: { fontSize: 11, fontWeight: '700', color: '#ff6600', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 },
  chartLegend: { marginTop: 12, gap: 6 },
  chartLegendRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  chartDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ff6600', flexShrink: 0 },
  chartLegendLabel: { flex: 1, fontSize: 12, color: '#aaa' },
  chartLegendValue: { fontSize: 12, fontWeight: '700', color: '#f0ede8' },
  addLogBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,102,0,0.4)', backgroundColor: 'rgba(255,102,0,0.08)' },
  addLogText: { color: '#ff6600', fontSize: 13, fontWeight: '700' },
  addLogForm: { backgroundColor: '#141416', borderRadius: 14, borderWidth: 1, borderColor: '#2a2a2e', padding: 16, marginBottom: 16 },
  fieldLabel: { fontSize: 10, fontWeight: '700', color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6, marginTop: 10 },
  input: { backgroundColor: '#0e0e0f', borderRadius: 8, borderWidth: 1, borderColor: '#2a2a2e', padding: 11, color: '#f0ede8', fontSize: 14 },
  monthChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#2a2a2e', backgroundColor: '#0e0e0f' },
  monthChipActive: { backgroundColor: 'rgba(255,102,0,0.15)', borderColor: 'rgba(255,102,0,0.5)' },
  monthChipText: { color: '#777', fontSize: 13, fontWeight: '600' },
  monthChipTextActive: { color: '#ff6600', fontWeight: '700' },
  fieldHint: { fontSize: 11, color: '#444', marginTop: -6, marginBottom: 8 },
  catChip: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, borderWidth: 1, borderColor: '#2a2a2e', backgroundColor: '#0e0e0f' },
  catChipActive: { backgroundColor: 'rgba(255,102,0,0.15)', borderColor: 'rgba(255,102,0,0.5)' },
  catChipText: { color: '#777', fontSize: 12, fontWeight: '600' },
  catChipTextActive: { color: '#ff6600' },
  formRow: { flexDirection: 'row' },
  saveBtn: { marginTop: 14, backgroundColor: '#ff6600', borderRadius: 10, padding: 14, alignItems: 'center' },
  saveBtnDisabled: { opacity: 0.6 },
  saveBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  center: { paddingVertical: 32, alignItems: 'center' },
  emptyLogs: { alignItems: 'center', paddingVertical: 40 },
  emptyLogsText: { fontSize: 14, color: '#444', fontWeight: '600', textAlign: 'center' },
  emptyLogsSub: { fontSize: 12, color: '#333', marginTop: 4, textAlign: 'center' },
  logCard: { backgroundColor: '#141416', borderRadius: 12, borderWidth: 1, borderColor: '#2a2a2e', padding: 14, marginBottom: 10 },
  logHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  logCatBadge: { backgroundColor: 'rgba(255,102,0,0.1)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3, borderWidth: 1, borderColor: 'rgba(255,102,0,0.25)' },
  logCatText: { color: '#ff6600', fontSize: 11, fontWeight: '700' },
  logDate: { fontSize: 12, color: '#555' },
  logDesc: { fontSize: 14, color: '#ccc', lineHeight: 20, marginBottom: 10 },
  logMeta: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12, color: '#555' },
  tabBar: { flexDirection: 'row', backgroundColor: '#0a0a0b', borderRadius: 10, padding: 3, marginBottom: 16, borderWidth: 1, borderColor: '#1a1a1c' },
  tab: { flex: 1, paddingVertical: 9, alignItems: 'center', borderRadius: 8 },
  tabActive: { backgroundColor: '#141416' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#9a9a9a' },
  tabTextActive: { color: '#ff6600' },
  fuelStatsRow: { flexDirection: 'row', backgroundColor: '#141416', borderRadius: 12, borderWidth: 1, borderColor: '#2a2a2e', padding: 14, marginBottom: 16, alignItems: 'center' },
  fuelStat: { flex: 1, alignItems: 'center' },
  fuelStatValue: { fontSize: 16, fontWeight: '800', color: '#f0ede8', marginBottom: 2 },
  fuelStatLabel: { fontSize: 10, color: '#555', fontWeight: '600', textAlign: 'center' },
  fuelStatDivider: { width: 1, height: 28, backgroundColor: '#2a2a2e', marginHorizontal: 6 },
  kmLBadge: { backgroundColor: 'rgba(255,102,0,0.12)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3, borderWidth: 1, borderColor: 'rgba(255,102,0,0.3)' },
  kmLText: { color: '#ff6600', fontSize: 12, fontWeight: '700' },
  toggleBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 20, borderWidth: 1, borderColor: '#2a2a2e', backgroundColor: '#0e0e0f', alignSelf: 'flex-start' },
  toggleBtnActive: { backgroundColor: 'rgba(255,102,0,0.1)', borderColor: 'rgba(255,102,0,0.4)' },
  toggleText: { color: '#9a9a9a', fontSize: 13, fontWeight: '600' },
  toggleTextActive: { color: '#ff6600' },
})
