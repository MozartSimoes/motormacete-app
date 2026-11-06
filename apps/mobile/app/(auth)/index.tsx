import { useState, useEffect, useRef } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  ActivityIndicator, SafeAreaView, Image,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import PickerModal, { type PickerItem } from '../../components/PickerModal'
import CalibrationModal from '../../components/CalibrationModal'
import WhatsAppFloat from '../../components/WhatsAppFloat'

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

function fmtBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
function detectFuel(yearName: string) {
  const u = yearName.toUpperCase()
  if (u.includes('DIESEL')) return 'Diesel'
  if (u.includes('FLEX')) return 'Flex'
  if (u.includes('ÁLCOOL') || u.includes('ALCOOL')) return 'Álcool'
  return 'Gasolina'
}

export default function LandingScreen() {
  const router = useRouter()
  const scrollRef         = useRef<ScrollView>(null)
  const resultsRef        = useRef<View>(null)
  const resultsSectionYRef = useRef(0)
  const fipeScrolled      = useRef(false)
  const [vehicleType, setVehicleType] = useState<'carro' | 'moto'>('carro')
  const [showCalibration, setShowCalibration] = useState(false)

  const [brands, setBrands] = useState<PickerItem[]>([])
  const [selectedBrand, setSelectedBrand] = useState<PickerItem | null>(null)
  const [loadingBrands, setLoadingBrands] = useState(false)

  const [models, setModels] = useState<PickerItem[]>([])
  const [selectedModel, setSelectedModel] = useState<PickerItem | null>(null)
  const [loadingModels, setLoadingModels] = useState(false)

  const [years, setYears] = useState<PickerItem[]>([])
  const [selectedYear, setSelectedYear] = useState<PickerItem | null>(null)
  const [loadingYears, setLoadingYears] = useState(false)

  const [fipe, setFipe] = useState<number | null>(null)
  const [fipeMonth, setFipeMonth] = useState('')
  const [loadingFipe, setLoadingFipe] = useState(false)

  const [activeCategory, setActiveCategory] = useState<Category>('MACETES')
  const [tips, setTips] = useState<any[]>([])
  const [loadingTips, setLoadingTips] = useState(false)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    setSelectedBrand(null); setModels([]); setSelectedModel(null)
    setYears([]); setSelectedYear(null); setSearched(false)
    setLoadingBrands(true)
    fetch(`${API_BASE}/api/vehicles?type=${vehicleType}`)
      .then((r) => r.json())
      .then((data) => setBrands(data.brands ?? []))
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
    fipeScrolled.current = false
    if (!selectedBrand || !selectedModel || !selectedYear) {
      setFipe(null); setFipeMonth(''); return
    }
    setLoadingFipe(true)
    fetch(`${API_BASE}/api/fipe/price?type=${vehicleType}&brandCode=${selectedBrand.code}&modelCode=${selectedModel.code}&yearCode=${encodeURIComponent(selectedYear.code)}`)
      .then(r => r.json())
      .then(d => { setFipe(d.currentFipe ?? null); setFipeMonth(d.referenceMonth ?? '') })
      .catch(() => { setFipe(null); setFipeMonth('') })
      .finally(() => setLoadingFipe(false))
  }, [selectedYear])

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
        vehicleType,
        ...(selectedYear ? { yearCode: selectedYear.code, yearName: selectedYear.name } : {}),
      })
      const res = await fetch(`${API_BASE}/api/tips?${params}`)
      const data = await res.json()
      setTips(data.tips ?? [])
    } finally {
      setLoadingTips(false)
    }
  }

  async function handleSearch() {
    if (!selectedModel) return
    setSearched(true)
    await loadTips(activeCategory)
    setTimeout(() => {
      const y = resultsSectionYRef.current
      scrollRef.current?.scrollTo({ y: y > 0 ? y - 16 : 400, animated: true })
    }, 300)
  }

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView ref={scrollRef} contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* Hero */}
        <View style={s.hero}>
          <View style={s.iconWrap}>
            <Image source={require('../../assets/icon.png')} style={s.iconImg} />
          </View>
          <Text style={s.logo}>Motor<Text style={s.accent}>Macete</Text></Text>
          <Text style={s.tagline}>Os macetes que os mecânicos não contam.</Text>
        </View>

        {/* Auth CTA */}
        <View style={s.authRow}>
          <TouchableOpacity style={s.btnPrimary} onPress={() => router.push('/(auth)/login')}>
            <Text style={s.btnPrimaryText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.btnSecondary} onPress={() => router.push('/(auth)/register')}>
            <Text style={s.btnSecondaryText}>Criar conta</Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={s.dividerRow}>
          <View style={s.dividerLine} />
          <Text style={s.dividerText}>pesquise grátis</Text>
          <View style={s.dividerLine} />
        </View>

        {/* Search card */}
        <View style={s.card}>
          <Text style={s.cardSectionLabel}>Tipo de veículo</Text>
          <View style={s.typeRow}>
            {(['carro', 'moto'] as const).map((t) => (
              <TouchableOpacity
                key={t}
                style={[s.typeChip, vehicleType === t && s.typeChipActive]}
                onPress={() => setVehicleType(t)}
              >
                {t === 'carro'
                  ? <Ionicons name="car-outline" size={20} color={vehicleType === t ? '#ff6600' : '#9a9a9a'} />
                  : <Ionicons name="bicycle-outline" size={20} color={vehicleType === t ? '#ff6600' : '#9a9a9a'} />}
                <Text style={[s.typeChipText, vehicleType === t && s.typeChipTextActive]}>
                  {t === 'carro' ? 'Carro' : 'Moto'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={s.innerDivider} />

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
            <TouchableOpacity style={[s.searchBtn, !selectedModel && s.searchBtnDisabled]} onPress={handleSearch} disabled={!selectedModel}>
              <Text style={[s.searchBtnText, !selectedModel && s.searchBtnTextDisabled]}>Buscar Macetes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.calibBtn, !selectedModel && s.calibBtnDisabled]} onPress={() => setShowCalibration(true)} disabled={!selectedModel}>
              <Text style={s.calibBtnIcon}>🔘</Text>
              <Text style={[s.calibBtnText, !selectedModel && s.calibBtnTextDisabled]}>Calibragem</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FIPE Card */}
        {selectedYear && (
          <View
            style={s.fipeCard}
            onLayout={(e) => {
              if (fipeScrolled.current) return
              fipeScrolled.current = true
              scrollRef.current?.scrollTo({ y: e.nativeEvent.layout.y - 16, animated: true })
            }}
          >
            <View style={s.fipeRow}>
              <View style={{ flex: 1 }}>
                <Text style={s.fipeLabel}>Tabela FIPE</Text>
                {fipeMonth ? <Text style={s.fipeMonth}>{fipeMonth}</Text> : null}
              </View>
              {loadingFipe
                ? <ActivityIndicator color="#ff6600" size="small" />
                : fipe !== null
                  ? <Text style={s.fipeValue}>{fmtBRL(fipe)}</Text>
                  : <Text style={s.fipeNotFound}>Não encontrado</Text>
              }
            </View>
            {!loadingFipe && fipe !== null && (
              <Text style={s.fipeSub}>{selectedBrand?.name} {selectedModel?.name} · {detectFuel(selectedYear.name)}</Text>
            )}
          </View>
        )}

        {/* Results */}
        {searched && selectedModel && (
          <View
            ref={resultsRef}
            onLayout={(e) => { resultsSectionYRef.current = e.nativeEvent.layout.y }}
            style={s.results}
          >
            <View style={s.resultsHeader}>
              <Text style={s.resultsTitle}>{selectedBrand?.name} {selectedModel.name}</Text>
              {selectedYear && <Text style={s.resultsYear}>{selectedYear.name}</Text>}
            </View>

            <View style={s.tabs}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity key={cat.key} style={[s.tab, activeCategory === cat.key && s.tabActive]} onPress={() => setActiveCategory(cat.key)}>
                  <Text style={s.tabIcon}>{cat.icon}</Text>
                  <Text style={[s.tabText, activeCategory === cat.key && s.tabTextActive]}>{cat.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {loadingTips ? (
              <View style={s.loadingBox}><ActivityIndicator color="#ff6600" size="large" /></View>
            ) : tips.length === 0 ? (
              <View style={s.emptyBox}>
                <Text style={s.emptyText}>Nenhuma informação disponível.</Text>
              </View>
            ) : (
              <View style={s.tipList}>
                {tips.map((tip) => {
                  const sev = SEV_CONFIG[tip.severity] ?? SEV_CONFIG.OK
                  return (
                    <View key={tip.id} style={[s.tipCard, { borderLeftColor: sev.color }]}>
                      <View style={s.tipHeader}>
                        <Text style={s.tipTitle} numberOfLines={2}>{tip.title}</Text>
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
      <WhatsAppFloat />
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0e0e0f' },
  scroll: { padding: 20, paddingBottom: 48 },
  hero: { alignItems: 'center', paddingVertical: 28, gap: 10 },
  iconWrap: { width: 72, height: 72, borderRadius: 18, overflow: 'hidden', marginBottom: 4 },
  iconImg: { width: 72, height: 72 },
  logo: { fontSize: 36, fontWeight: '900', color: '#f0ede8', letterSpacing: -1 },
  accent: { color: '#ff6600' },
  tagline: { fontSize: 13, color: '#666', marginTop: 6 },
  authRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  btnPrimary: { flex: 1, backgroundColor: '#ff6600', borderRadius: 10, padding: 14, alignItems: 'center' },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  btnSecondary: { flex: 1, borderRadius: 10, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: '#2a2a2e' },
  btnSecondaryText: { color: '#f0ede8', fontWeight: '600', fontSize: 15 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 10 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#2a2a2e' },
  dividerText: { fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: 1 },
  card: { backgroundColor: '#141416', borderRadius: 16, borderWidth: 1, borderColor: '#2a2a2e', padding: 16, marginBottom: 16 },
  cardSectionLabel: { fontSize: 11, fontWeight: '700', color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 },
  typeRow: { flexDirection: 'row', gap: 10, marginBottom: 4 },
  typeChip: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#1a1a1c', borderRadius: 10, borderWidth: 1, borderColor: '#2a2a2e', paddingVertical: 12 },
  typeChipActive: { backgroundColor: 'rgba(255,102,0,0.12)', borderColor: '#ff6600' },
  typeChipIcon: { fontSize: 18 },
  typeChipText: { fontSize: 15, fontWeight: '600', color: '#9a9a9a' },
  typeChipTextActive: { color: '#ff6600' },
  innerDivider: { height: 1, backgroundColor: '#1e1e20', marginVertical: 16 },
  actionRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
  searchBtn: { flex: 1, backgroundColor: '#ff6600', borderRadius: 10, paddingVertical: 15, alignItems: 'center', justifyContent: 'center' },
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
  emptyBox: { paddingVertical: 32, alignItems: 'center' },
  emptyText: { fontSize: 13, color: '#555' },
  fipeCard: { backgroundColor: '#141416', borderRadius: 16, borderWidth: 1, borderColor: '#2a2a2e', padding: 16, marginBottom: 16 },
  fipeRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  fipeLabel: { fontSize: 11, fontWeight: '700', color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  fipeMonth: { fontSize: 11, color: '#444' },
  fipeValue: { fontSize: 26, fontWeight: '900', color: '#ff6600', letterSpacing: -0.5 },
  fipeNotFound: { fontSize: 13, color: '#444' },
  fipeSub: { fontSize: 12, color: '#555', marginTop: 8 },
})
