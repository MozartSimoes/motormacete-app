import { useState, useEffect, useRef } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import PickerModal, { type PickerItem } from '../../components/PickerModal'
import CalibrationModal from '../../components/CalibrationModal'

const API_BASE = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000'

const CATEGORIES = [
  { key: 'MACETES',    label: 'Macetes',   icon: '💡' },
  { key: 'PROBLEMAS',  label: 'Problemas', icon: '⚠️' },
  { key: 'MANUTENCAO', label: 'Manutenção', icon: '🔧' },
] as const

type Category = typeof CATEGORIES[number]['key']

const SEV_CONFIG: Record<string, { color: string; label: string }> = {
  OK:     { color: '#ff6600', label: 'OK' },
  WARN:   { color: '#e0a020', label: 'Atenção' },
  DANGER: { color: '#e03030', label: 'Crítico' },
}

interface Tip { id: string; title: string; body: string; severity: string }

export default function SearchScreen() {
  const scrollRef   = useRef<ScrollView>(null)
  const resultsRef  = useRef<View>(null)

  const [vehicleType, setVehicleType] = useState<'carro' | 'moto'>('carro')
  const [brands, setBrands]           = useState<PickerItem[]>([])
  const [selectedBrand, setSelectedBrand] = useState<PickerItem | null>(null)
  const [loadingBrands, setLoadingBrands] = useState(false)
  const [models, setModels]           = useState<PickerItem[]>([])
  const [selectedModel, setSelectedModel] = useState<PickerItem | null>(null)
  const [loadingModels, setLoadingModels] = useState(false)
  const [years, setYears]             = useState<PickerItem[]>([])
  const [selectedYear, setSelectedYear]   = useState<PickerItem | null>(null)
  const [loadingYears, setLoadingYears]   = useState(false)
  const [activeCategory, setActiveCategory] = useState<Category>('MACETES')
  const [tips, setTips]               = useState<Tip[]>([])
  const [isSpecific, setIsSpecific]   = useState(false)
  const [loadingTips, setLoadingTips] = useState(false)
  const [searched, setSearched]       = useState(false)
  const [showCalibration, setShowCalibration] = useState(false)

  useEffect(() => {
    setSelectedBrand(null); setModels([]); setSelectedModel(null)
    setYears([]); setSelectedYear(null); setSearched(false)
    setLoadingBrands(true)
    fetch(`${API_BASE}/api/vehicles?type=${vehicleType}`)
      .then((r) => r.json())
      .then((data) => setBrands(data.brands ?? []))
      .catch(() => setBrands([]))
      .finally(() => setLoadingBrands(false))
  }, [vehicleType])

  useEffect(() => {
    if (!selectedBrand) return
    setSelectedModel(null); setYears([]); setSelectedYear(null); setSearched(false)
    setLoadingModels(true)
    fetch(`${API_BASE}/api/vehicles?type=${vehicleType}&brandCode=${selectedBrand.code}`)
      .then((r) => r.json())
      .then((data) => setModels((data.models ?? []).map((m: { id: string; name: string }) => ({ code: m.id, name: m.name }))))
      .finally(() => setLoadingModels(false))
  }, [selectedBrand])

  useEffect(() => {
    if (!selectedBrand || !selectedModel) return
    setSelectedYear(null); setSearched(false)
    setLoadingYears(true)
    fetch(`${API_BASE}/api/vehicles?type=${vehicleType}&brandCode=${selectedBrand.code}&modelCode=${selectedModel.code}`)
      .then((r) => r.json())
      .then((data) => setYears(data.years ?? []))
      .finally(() => setLoadingYears(false))
  }, [selectedModel])

  useEffect(() => {
    if (!searched || !selectedModel) return
    loadTips(activeCategory)
  }, [activeCategory])

  async function loadTips(category: Category) {
    if (!selectedModel) return
    setLoadingTips(true)
    try {
      const params = new URLSearchParams({
        modelName: selectedModel.name,
        category,
        ...(selectedYear ? { yearCode: selectedYear.code, yearName: selectedYear.name } : {}),
      })
      const res  = await fetch(`${API_BASE}/api/tips?${params}`)
      const data = await res.json()
      setTips(data.tips ?? [])
      setIsSpecific(data.isSpecific ?? false)
    } finally {
      setLoadingTips(false)
    }
  }

  async function handleSearch() {
    if (!selectedModel) return
    setSearched(true)
    await loadTips(activeCategory)
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 200)
  }

  function handleCategoryChange(cat: Category) {
    setActiveCategory(cat)
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100)
  }

  return (
    <>
      <ScrollView ref={scrollRef} style={s.container} contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">

        {/* Selection Card */}
        <View style={s.card}>
          <Text style={s.cardLabel}>Tipo de veículo</Text>
          <View style={s.typeRow}>
            {(['carro', 'moto'] as const).map((t) => (
              <TouchableOpacity
                key={t}
                style={[s.typeChip, vehicleType === t && s.typeChipActive]}
                onPress={() => setVehicleType(t)}
              >
                {t === 'carro'
                  ? <Ionicons name="car-outline" size={20} color={vehicleType === t ? '#ff6600' : '#9a9a9a'} />
                  : <MaterialCommunityIcons name="motorbike" size={20} color={vehicleType === t ? '#ff6600' : '#9a9a9a'} />}
                <Text style={[s.typeChipText, vehicleType === t && s.typeChipTextActive]}>
                  {t === 'carro' ? 'Carro' : 'Moto'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={s.divider} />

          {loadingBrands
            ? <ActivityIndicator color="#ff6600" style={{ marginVertical: 8 }} />
            : <PickerModal label="Marca" placeholder="Selecione a marca" items={brands} value={selectedBrand} onChange={setSelectedBrand} />}

          {loadingModels
            ? <ActivityIndicator color="#ff6600" style={{ marginVertical: 8 }} />
            : <PickerModal label="Modelo" placeholder={selectedBrand ? 'Selecione o modelo' : 'Selecione a marca primeiro'} items={models} value={selectedModel} onChange={setSelectedModel} disabled={!selectedBrand} />}

          {loadingYears
            ? <ActivityIndicator color="#ff6600" style={{ marginVertical: 8 }} />
            : <PickerModal label="Ano" placeholder={selectedModel ? 'Selecione o ano (opcional)' : 'Selecione o modelo primeiro'} items={years} value={selectedYear} onChange={setSelectedYear} disabled={!selectedModel} searchable={false} />}

          <View style={s.actionRow}>
            <TouchableOpacity
              style={[s.searchBtn, !selectedModel && s.searchBtnDisabled]}
              onPress={handleSearch}
              disabled={!selectedModel}
            >
              {loadingTips && !searched
                ? <ActivityIndicator color="#fff" />
                : <Text style={[s.searchBtnText, !selectedModel && s.searchBtnTextDisabled]}>Buscar Macetes</Text>}
            </TouchableOpacity>

            <TouchableOpacity
              style={[s.calibBtn, !selectedModel && s.calibBtnDisabled]}
              onPress={() => setShowCalibration(true)}
              disabled={!selectedModel}
            >
              <Text style={s.calibBtnIcon}>🔘</Text>
              <Text style={[s.calibBtnText, !selectedModel && s.calibBtnTextDisabled]}>Calibragem</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Results */}
        {searched && selectedModel && (
          <View ref={resultsRef} style={s.results}>
            <View style={s.resultsHeader}>
              <Text style={s.resultsTitle}>{selectedBrand?.name} {selectedModel.name}</Text>
              {selectedYear && <Text style={s.resultsYear}>{selectedYear.name}</Text>}
              {!isSpecific && (
                <View style={s.defaultsBadge}>
                  <Text style={s.defaultsBadgeText}>Dicas gerais para o tipo de veículo</Text>
                </View>
              )}
            </View>

            <View style={s.tabs}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.key}
                  style={[s.tab, activeCategory === cat.key && s.tabActive]}
                  onPress={() => handleCategoryChange(cat.key)}
                >
                  <Text style={s.tabIcon}>{cat.icon}</Text>
                  <Text style={[s.tabText, activeCategory === cat.key && s.tabTextActive]}>{cat.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {loadingTips ? (
              <View style={s.loadingBox}><ActivityIndicator color="#ff6600" size="large" /></View>
            ) : tips.length === 0 ? (
              <View style={s.emptyBox}>
                <Text style={s.emptyIcon}>{CATEGORIES.find((c) => c.key === activeCategory)?.icon}</Text>
                <Text style={s.emptyText}>Nenhuma informação disponível para esta categoria.</Text>
              </View>
            ) : (
              <View style={s.tipList}>
                {tips.map((tip) => {
                  const sev = SEV_CONFIG[tip.severity] ?? SEV_CONFIG.OK
                  return (
                    <View key={tip.id} style={[s.tipCard, { borderLeftColor: sev.color }]}>
                      <View style={s.tipHeader}>
                        <Text style={s.tipTitle} numberOfLines={3}>{tip.title}</Text>
                        <View style={[s.sevBadge, { backgroundColor: `${sev.color}20`, borderColor: `${sev.color}50` }]}>
                          <Text style={[s.sevText, { color: sev.color }]}>{sev.label}</Text>
                        </View>
                      </View>
                      <Text style={s.tipBody}>{tip.body}</Text>
                    </View>
                  )
                })}
              </View>
            )}
          </View>
        )}
      </ScrollView>

      <CalibrationModal
        visible={showCalibration}
        onClose={() => setShowCalibration(false)}
        vehicleType={vehicleType}
        modelName={selectedModel ? `${selectedBrand?.name} ${selectedModel.name}` : undefined}
      />
    </>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0e0e0f' },
  content: { padding: 16, paddingBottom: 48 },
  card: { backgroundColor: '#141416', borderRadius: 16, borderWidth: 1, borderColor: '#2a2a2e', padding: 16, marginBottom: 16 },
  cardLabel: { fontSize: 11, fontWeight: '700', color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 },
  typeRow: { flexDirection: 'row', gap: 10, marginBottom: 4 },
  typeChip: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#1a1a1c', borderRadius: 10, borderWidth: 1, borderColor: '#2a2a2e', paddingVertical: 12 },
  typeChipActive: { backgroundColor: 'rgba(255,102,0,0.12)', borderColor: '#ff6600' },
  typeChipIcon: { fontSize: 18 },
  typeChipText: { fontSize: 15, fontWeight: '600', color: '#9a9a9a' },
  typeChipTextActive: { color: '#ff6600' },
  divider: { height: 1, backgroundColor: '#1e1e20', marginVertical: 16 },
  actionRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
  searchBtn: { flex: 1, backgroundColor: '#ff6600', borderRadius: 10, paddingVertical: 15, alignItems: 'center' },
  searchBtnDisabled: { backgroundColor: '#1e1e20' },
  searchBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  searchBtnTextDisabled: { color: '#444' },
  calibBtn: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a1a1c', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: '#2a2a2e', gap: 3 },
  calibBtnDisabled: { opacity: 0.3 },
  calibBtnIcon: { fontSize: 20 },
  calibBtnText: { color: '#ff6600', fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  calibBtnTextDisabled: { color: '#444' },
  results: { backgroundColor: '#141416', borderRadius: 16, borderWidth: 1, borderColor: '#2a2a2e', overflow: 'hidden' },
  resultsHeader: { padding: 16, paddingBottom: 12, gap: 4 },
  resultsTitle: { fontSize: 20, fontWeight: '800', color: '#f0ede8' },
  resultsYear: { fontSize: 13, color: '#666' },
  defaultsBadge: { alignSelf: 'flex-start', backgroundColor: '#1e1e20', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3, marginTop: 4 },
  defaultsBadgeText: { fontSize: 11, color: '#555' },
  tabs: { flexDirection: 'row', backgroundColor: '#111113', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#1e1e20' },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 12, borderBottomWidth: 2, borderBottomColor: 'transparent', gap: 2 },
  tabActive: { borderBottomColor: '#ff6600' },
  tabIcon: { fontSize: 14 },
  tabText: { fontSize: 10, fontWeight: '700', color: '#9a9a9a', textTransform: 'uppercase', letterSpacing: 0.5 },
  tabTextActive: { color: '#ff6600' },
  tipList: { padding: 12, gap: 10 },
  tipCard: { backgroundColor: '#111113', borderRadius: 10, borderLeftWidth: 3, padding: 14 },
  tipHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 8 },
  tipTitle: { flex: 1, fontSize: 14, fontWeight: '700', color: '#dedad4', lineHeight: 20 },
  sevBadge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1, alignSelf: 'flex-start', flexShrink: 0 },
  sevText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  tipBody: { fontSize: 13, color: '#888', lineHeight: 20 },
  loadingBox: { paddingVertical: 40, alignItems: 'center' },
  emptyBox: { paddingVertical: 32, alignItems: 'center', gap: 10 },
  emptyIcon: { fontSize: 36 },
  emptyText: { fontSize: 13, color: '#555', textAlign: 'center' },
})
