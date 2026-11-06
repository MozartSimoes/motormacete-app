import { useState, useEffect, useRef } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  ActivityIndicator, Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import PickerModal, { type PickerItem } from '../../components/PickerModal'

const API = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000'

const ACCENT = { A: '#ff6600', B: '#3b82f6' } as const

// ── helpers ───────────────────────────────────────────────────────────────────
function detectFuel(y: string) {
  const n = y.toUpperCase()
  if (n.includes('DIESEL'))  return 'Diesel'
  if (n.includes('ELÉTRIC') || n.includes('ELETRIC')) return 'Elétrico'
  if (n.includes('HÍBRID')  || n.includes('HIBRID'))  return 'Híbrido'
  if (n.includes('GASOLINA')) return 'Gasolina'
  return 'Flex'
}
function parseYear(y: string) { return parseInt(y.slice(0, 4)) || new Date().getFullYear() }
function fmtBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}
function estimateMonthly(fipe: number, vType: 'carro' | 'moto', yearName: string) {
  const age      = new Date().getFullYear() - parseYear(yearName)
  const isMoto   = vType === 'moto'
  const ipva     = (fipe * (isMoto ? 0.02 : 0.04)) / 12
  const insRate  = fipe < 30000 ? 0.040 : fipe < 60000 ? 0.050 : fipe < 100000 ? 0.060 : 0.075
  const seguro   = (fipe * insRate) / 12
  const licen    = 160 / 12
  const manut    = isMoto ? (age < 5 ? 90 : 140) : (age < 5 ? 180 : age < 10 ? 260 : 380)
  const depr     = fipe * ((age < 3 ? 0.13 : age < 7 ? 0.09 : age < 12 ? 0.06 : 0.04) / 12)
  const fuel     = isMoto ? 250 : 480
  return ipva + seguro + licen + manut + depr + fuel
}

// ── Vehicle selector component ────────────────────────────────────────────────
interface SideState {
  vType: 'carro' | 'moto'
  brands: PickerItem[]; brand: PickerItem | null
  models: PickerItem[]; model: PickerItem | null
  years:  PickerItem[]; year:  PickerItem | null
  fipe: number | null; fipeMonth: string
  loading: boolean
}
const emptySide = (vType: 'carro' | 'moto'): SideState => ({
  vType, brands: [], brand: null, models: [], model: null,
  years: [], year: null, fipe: null, fipeMonth: '', loading: false,
})

interface VehicleSelectorProps {
  sideKey: 'A' | 'B'
  side: SideState
  setSide: (fn: (s: SideState) => SideState) => void
  accent: string
  label: string
}

function VehicleSelector({ sideKey, side, setSide, accent, label }: VehicleSelectorProps) {
  // load brands when sideKey or vType changes (sideKey dep ensures B loads on first tab switch)
  useEffect(() => {
    if (side.brands.length > 0) return
    let cancelled = false
    const vType = side.vType
    setSide(s => ({ ...emptySide(s.vType), loading: true }))
    fetch(`${API}/api/vehicles?type=${vType}`)
      .then(r => r.json())
      .then(d => { if (!cancelled) setSide(s => ({ ...s, brands: d.brands ?? [], loading: false })) })
      .catch(() => { if (!cancelled) setSide(s => ({ ...s, loading: false })) })
    return () => { cancelled = true }
  }, [sideKey, side.vType])

  // load models (guard: skip if already loaded to avoid clearing on tab switch)
  useEffect(() => {
    if (!side.brand) return
    if (side.models.length > 0) return
    setSide(s => ({ ...s, models: [], model: null, years: [], year: null, fipe: null, loading: true }))
    fetch(`${API}/api/vehicles?type=${side.vType}&brandCode=${side.brand.code}`)
      .then(r => r.json())
      .then(d => setSide(s => ({ ...s, models: (d.models ?? []).map((m: any) => ({ code: m.id, name: m.name })), loading: false })))
  }, [side.brand?.code])

  // load years (guard: skip if already loaded)
  useEffect(() => {
    if (!side.brand || !side.model) return
    if (side.years.length > 0) return
    setSide(s => ({ ...s, years: [], year: null, fipe: null, loading: true }))
    fetch(`${API}/api/vehicles?type=${side.vType}&brandCode=${side.brand.code}&modelCode=${side.model.code}`)
      .then(r => r.json())
      .then(d => setSide(s => ({ ...s, years: d.years ?? [], loading: false })))
  }, [side.model?.code])

  // fetch FIPE (guard: skip if already loaded)
  useEffect(() => {
    if (!side.brand || !side.model || !side.year) return
    if (side.fipe !== null) return
    setSide(s => ({ ...s, loading: true }))
    fetch(`${API}/api/fipe/price?type=${side.vType}&brandCode=${side.brand!.code}&modelCode=${side.model!.code}&yearCode=${encodeURIComponent(side.year!.code)}`)
      .then(r => r.json())
      .then(d => setSide(s => ({ ...s, fipe: d.currentFipe ?? null, fipeMonth: d.referenceMonth ?? '', loading: false })))
  }, [side.year?.code])

  function handleTypeChange(t: 'carro' | 'moto') {
    if (t === side.vType) return
    if (side.brand || side.model) {
      Alert.alert(
        'Alterar tipo de veículo',
        'Isso vai limpar a pesquisa atual. Deseja continuar?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Continuar', onPress: () => setSide(() => emptySide(t)) },
        ]
      )
    } else {
      setSide(() => emptySide(t))
    }
  }

  const monthly = side.fipe && side.year ? estimateMonthly(side.fipe, side.vType, side.year.name) : null

  return (
    <View style={[vs.card, side.fipe ? { borderColor: accent + '55' } : {}]}>
      <Text style={[vs.sideLabel, { color: accent }]}>{label}</Text>

      {/* Type toggle */}
      <View style={vs.typeRow}>
        {(['carro', 'moto'] as const).map(t => (
          <TouchableOpacity key={t}
            style={[vs.typeBtn, side.vType === t && { backgroundColor: accent, borderColor: accent }]}
            onPress={() => handleTypeChange(t)}>
            {t === 'carro'
              ? <Ionicons name="car-outline" size={16} color={side.vType === t ? '#fff' : '#9a9a9a'} />
              : <Ionicons name="bicycle-outline" size={16} color={side.vType === t ? '#fff' : '#9a9a9a'} />}
            <Text style={[vs.typeBtnText, side.vType === t && { color: '#fff' }]}>
              {t === 'carro' ? 'Carro' : 'Moto'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {side.loading && <ActivityIndicator color={accent} style={{ marginVertical: 8 }} />}

      <PickerModal label="Marca" placeholder={side.loading ? 'Carregando...' : 'Selecione a marca'}
        items={side.brands} value={side.brand} disabled={side.loading || side.brands.length === 0}
        onChange={b => setSide(s => ({ ...s, brand: b, models: [], model: null, years: [], year: null, fipe: null }))} />

      <PickerModal label="Modelo" placeholder={side.brand ? 'Selecione o modelo' : 'Selecione a marca primeiro'}
        items={side.models} value={side.model} disabled={!side.brand}
        onChange={m => setSide(s => ({ ...s, model: m, years: [], year: null, fipe: null }))} />

      <PickerModal label="Ano" placeholder={side.model ? 'Selecione o ano' : 'Selecione o modelo primeiro'}
        items={side.years} value={side.year} disabled={!side.model} searchable={false}
        onChange={y => setSide(s => ({ ...s, year: y, fipe: null }))} />

      {/* FIPE result */}
      {side.fipe && side.year && monthly && (
        <View style={[vs.fipeCard, { backgroundColor: accent + '10', borderColor: accent + '33' }]}>
          <Text style={[vs.fipeLabel, { color: accent }]}>Tabela FIPE · {side.fipeMonth}</Text>
          <Text style={vs.fipeValue}>{fmtBRL(side.fipe)}</Text>
          <View style={vs.fipeDetails}>
            <View style={vs.fipeRow}><Text style={vs.fipeKey}>Combustível</Text><Text style={vs.fipeVal}>{detectFuel(side.year.name)}</Text></View>
            <View style={vs.fipeRow}><Text style={vs.fipeKey}>Idade aprox.</Text><Text style={vs.fipeVal}>{new Date().getFullYear() - parseYear(side.year.name)} anos</Text></View>
            <View style={vs.fipeRow}><Text style={vs.fipeKey}>Custo mensal est.</Text><Text style={vs.fipeVal}>{fmtBRL(monthly)}</Text></View>
            <View style={vs.fipeRow}><Text style={vs.fipeKey}>Custo anual est.</Text><Text style={vs.fipeVal}>{fmtBRL(monthly * 12)}</Text></View>
          </View>
        </View>
      )}
    </View>
  )
}

// ── Bar row ───────────────────────────────────────────────────────────────────
function CompareRow({ label, vA, vB, nameA, nameB }: { label: string; vA: number; vB: number; nameA: string; nameB: string }) {
  const max    = Math.max(vA, vB)
  const pctA   = (vA / max) * 100
  const pctB   = (vB / max) * 100
  const cheapA = vA <= vB
  return (
    <View style={cr.wrap}>
      <View style={cr.labelRow}>
        <Text style={cr.label}>{label}</Text>
        {vA !== vB && (
          <Text style={cr.winner}>{cheapA ? nameA : nameB} — {fmtBRL(Math.abs(vA - vB))}</Text>
        )}
      </View>
      <View style={cr.barRow}>
        <Text style={[cr.sideName, { color: ACCENT.A }]} numberOfLines={1}>{nameA}</Text>
        <View style={cr.track}>
          <View style={[cr.bar, { width: `${pctA}%`, backgroundColor: ACCENT.A }]} />
        </View>
        <Text style={cr.barValue}>{fmtBRL(vA)}</Text>
      </View>
      <View style={cr.barRow}>
        <Text style={[cr.sideName, { color: ACCENT.B }]} numberOfLines={1}>{nameB}</Text>
        <View style={cr.track}>
          <View style={[cr.bar, { width: `${pctB}%`, backgroundColor: ACCENT.B }]} />
        </View>
        <Text style={cr.barValue}>{fmtBRL(vB)}</Text>
      </View>
    </View>
  )
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function CompareScreen() {
  const [sideA, setSideA] = useState<SideState>(emptySide('carro'))
  const [sideB, setSideB] = useState<SideState>(emptySide('carro'))
  const [activeTab, setActiveTab] = useState<'A' | 'B'>('A')
  const scrollRef = useRef<ScrollView>(null)
  const compRef   = useRef<View>(null)

  const monthlyA = sideA.fipe && sideA.year ? estimateMonthly(sideA.fipe, sideA.vType, sideA.year.name) : null
  const monthlyB = sideB.fipe && sideB.year ? estimateMonthly(sideB.fipe, sideB.vType, sideB.year.name) : null
  const canCompare = !!(sideA.fipe && sideB.fipe && monthlyA && monthlyB)

  const nameA = sideA.brand && sideA.model ? `${sideA.brand.name} ${sideA.model.name}` : 'Veículo A'
  const nameB = sideB.brand && sideB.model ? `${sideB.brand.name} ${sideB.model.name}` : 'Veículo B'

  function scrollToComparison() {
    setTimeout(() => {
      compRef.current?.measureLayout(
        scrollRef.current?.getScrollableNode() as any,
        (_x, y) => scrollRef.current?.scrollTo({ y: y - 12, animated: true }),
        () => scrollRef.current?.scrollToEnd({ animated: true }),
      )
    }, 200)
  }

  useEffect(() => { if (canCompare) scrollToComparison() }, [canCompare])

  return (
    <ScrollView ref={scrollRef} style={s.container} contentContainerStyle={s.content}>

      {/* Tab switcher */}
      <View style={s.tabBar}>
        {(['A', 'B'] as const).map(tab => (
          <TouchableOpacity key={tab}
            style={[s.tabBtn,
              activeTab === tab && { borderColor: ACCENT[tab], backgroundColor: ACCENT[tab] + '15' }]}
            onPress={() => setActiveTab(tab)}>
            <View style={[s.tabDot, { backgroundColor: (tab === 'A' ? sideA.fipe : sideB.fipe) ? ACCENT[tab] : '#333' }]} />
            <Text style={[s.tabBtnText, activeTab === tab && { color: ACCENT[tab] }]}>
              {tab === 'A' ? nameA : nameB}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Active vehicle selector */}
      {activeTab === 'A'
        ? <VehicleSelector sideKey="A" side={sideA} setSide={setSideA} accent={ACCENT.A} label="Veículo A" />
        : <VehicleSelector sideKey="B" side={sideB} setSide={setSideB} accent={ACCENT.B} label="Veículo B" />}

      {/* Prompt to fill other side */}
      {sideA.fipe && !sideB.fipe && activeTab === 'A' && (
        <TouchableOpacity style={s.nextBtn} onPress={() => setActiveTab('B')}>
          <Text style={s.nextBtnText}>Agora configure o Veículo B →</Text>
        </TouchableOpacity>
      )}

      {/* Comparison */}
      {canCompare && monthlyA && monthlyB && (
        <View ref={compRef} style={s.compCard}>
          <Text style={s.compTitle}>Comparação</Text>

          {[
            { label: 'Valor FIPE',            vA: sideA.fipe!, vB: sideB.fipe! },
            { label: 'Custo Mensal Estimado', vA: monthlyA,    vB: monthlyB },
            { label: 'Custo Anual Estimado',  vA: monthlyA*12, vB: monthlyB*12 },
            { label: 'Custo em 5 Anos',       vA: monthlyA*60, vB: monthlyB*60 },
          ].map(row => (
            <CompareRow key={row.label} label={row.label} vA={row.vA} vB={row.vB} nameA={nameA} nameB={nameB} />
          ))}

          {/* Summary */}
          <View style={s.summary}>
            <Text style={s.summaryLabel}>Resumo</Text>
            <Text style={s.summaryText}>
              {monthlyA < monthlyB
                ? `O ${nameA} tem custo mensal ${fmtBRL(monthlyB - monthlyA)} menor. Em 5 anos a diferença acumulada é de ~${fmtBRL((monthlyB - monthlyA) * 60)}.`
                : monthlyB < monthlyA
                  ? `O ${nameB} tem custo mensal ${fmtBRL(monthlyA - monthlyB)} menor. Em 5 anos a diferença acumulada é de ~${fmtBRL((monthlyA - monthlyB) * 60)}.`
                  : 'Os dois veículos têm custos mensais estimados praticamente idênticos.'}
            </Text>
            <Text style={s.summaryNote}>
              * Estimativas baseadas em IPVA-SP, seguro médio, combustível médio (1.200 km/mês), manutenção por idade e depreciação FIPE.
            </Text>
          </View>
        </View>
      )}

      {!canCompare && (
        <View style={s.emptyComp}>
          <Text style={s.emptyIcon}>⚖️</Text>
          <Text style={s.emptyText}>Configure os dois veículos para ver a comparação</Text>
        </View>
      )}
    </ScrollView>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────
const vs = StyleSheet.create({
  card: { backgroundColor: '#141416', borderRadius: 16, borderWidth: 1, borderColor: '#2a2a2e', padding: 16, marginBottom: 16 },
  sideLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 },
  typeRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  typeBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: '#1a1a1c', borderWidth: 1, borderColor: '#2a2a2e', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6 },
  typeBtnText: { fontSize: 13, fontWeight: '700', color: '#9a9a9a' },
  fipeCard: { borderRadius: 12, borderWidth: 1, padding: 14, marginTop: 4 },
  fipeLabel: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  fipeValue: { fontSize: 32, fontWeight: '900', color: '#f0ede8', marginBottom: 10 },
  fipeDetails: { gap: 6 },
  fipeRow: { flexDirection: 'row', justifyContent: 'space-between' },
  fipeKey: { fontSize: 12, color: '#555' },
  fipeVal: { fontSize: 12, fontWeight: '600', color: '#aaa' },
})

const cr = StyleSheet.create({
  wrap: { marginBottom: 18 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, gap: 8 },
  label: { fontSize: 11, fontWeight: '700', color: '#555', textTransform: 'uppercase', letterSpacing: 0.5, flexShrink: 1 },
  winner: { fontSize: 10, fontWeight: '700', color: '#22c55e', flexShrink: 1, textAlign: 'right' },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  sideName: { fontSize: 10, fontWeight: '700', width: 80, flexShrink: 0 },
  track: { flex: 1, height: 18, borderRadius: 9, backgroundColor: '#111113', overflow: 'hidden' },
  bar: { height: '100%', borderRadius: 9 },
  barValue: { fontSize: 11, fontWeight: '700', color: '#f0ede8', width: 72, textAlign: 'right', flexShrink: 0 },
})

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0e0e0f' },
  content: { padding: 16, paddingBottom: 48 },
  tabBar: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  tabBtn: { flex: 1, paddingVertical: 11, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1, borderColor: '#2a2a2e', backgroundColor: '#141416', alignItems: 'center', flexDirection: 'row', gap: 6 },
  tabBtnText: { fontSize: 11, fontWeight: '700', color: '#9a9a9a', flex: 1 },
  tabDot: { width: 6, height: 6, borderRadius: 3, flexShrink: 0 },
  nextBtn: { backgroundColor: 'rgba(59,130,246,0.12)', borderRadius: 10, borderWidth: 1, borderColor: 'rgba(59,130,246,0.3)', padding: 14, alignItems: 'center', marginBottom: 16 },
  nextBtnText: { color: '#3b82f6', fontWeight: '700', fontSize: 14 },
  compCard: { backgroundColor: '#141416', borderRadius: 16, borderWidth: 1, borderColor: '#2a2a2e', padding: 16 },
  compTitle: { fontSize: 11, fontWeight: '700', color: '#ff6600', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20 },
  summary: { backgroundColor: '#111113', borderRadius: 10, padding: 14, marginTop: 4 },
  summaryLabel: { fontSize: 11, fontWeight: '700', color: '#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  summaryText: { fontSize: 13, color: '#888', lineHeight: 20 },
  summaryNote: { fontSize: 10, color: '#333', marginTop: 8, lineHeight: 16 },
  emptyComp: { alignItems: 'center', paddingVertical: 40 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 14, color: '#444', textAlign: 'center' },
})
