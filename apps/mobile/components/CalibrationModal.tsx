import { View, Text, Modal, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'

interface Props {
  visible: boolean
  onClose: () => void
  vehicleType: 'carro' | 'moto'
  modelName?: string
}

const DATA = {
  carro: {
    front: { label: 'Dianteiro', low: 28, recommended: 32, high: 36, unit: 'PSI' },
    rear:  { label: 'Traseiro',  low: 28, recommended: 33, high: 38, unit: 'PSI' },
    loadNote: 'Com carga total ou reboque, aumente 2–4 PSI na traseira.',
    checkNote: 'Sempre calibre com o pneu FRIO (carro parado há +3h ou rodando menos de 3 km).',
    kpa: { front: '220 kPa', rear: '228 kPa' },
    bar: { front: '2,2 bar', rear: '2,3 bar' },
  },
  moto: {
    front: { label: 'Dianteiro', low: 26, recommended: 30, high: 34, unit: 'PSI' },
    rear:  { label: 'Traseiro',  low: 32, recommended: 36, high: 42, unit: 'PSI' },
    loadNote: 'Com garupa, aumente 4–6 PSI na traseira. Verifique o manual da moto.',
    checkNote: 'Sempre calibre com o pneu FRIO (moto parada há +3h ou rodando menos de 3 km).',
    kpa: { front: '207 kPa', rear: '248 kPa' },
    bar: { front: '2,1 bar', rear: '2,5 bar' },
  },
}

function PressureGauge({ config }: { config: typeof DATA['carro']['front'] }) {
  const range = config.high - config.low
  const recStart = (config.recommended - 2 - config.low) / range
  const recEnd   = (config.recommended + 2 - config.low) / range
  const pointer  = (config.recommended - config.low) / range

  return (
    <View style={g.gaugeWrap}>
      <Text style={g.gaugeLabel}>{config.label}</Text>

      {/* Big PSI value */}
      <View style={g.bigValRow}>
        <Text style={g.bigVal}>{config.recommended}</Text>
        <Text style={g.bigUnit}>PSI</Text>
      </View>

      {/* Bar gauge */}
      <View style={g.barTrack}>
        {/* Low zone */}
        <View style={[g.barZone, g.barLow, { flex: recStart }]} />
        {/* Recommended zone */}
        <View style={[g.barZone, g.barRec, { flex: recEnd - recStart }]}>
          <Text style={g.barRecLabel}>ideal</Text>
        </View>
        {/* High zone */}
        <View style={[g.barZone, g.barHigh, { flex: 1 - recEnd }]} />
      </View>

      {/* Scale labels */}
      <View style={g.scaleRow}>
        <Text style={g.scaleMin}>{config.low}</Text>
        <Text style={g.scaleRec}>{config.recommended} PSI</Text>
        <Text style={g.scaleMax}>{config.high}</Text>
      </View>

      {/* Zones legend */}
      <View style={g.legendRow}>
        <View style={g.legendItem}>
          <View style={[g.legendDot, { backgroundColor: '#e03030' }]} />
          <Text style={g.legendText}>Baixo</Text>
        </View>
        <View style={g.legendItem}>
          <View style={[g.legendDot, { backgroundColor: '#ff6600' }]} />
          <Text style={g.legendText}>Ideal</Text>
        </View>
        <View style={g.legendItem}>
          <View style={[g.legendDot, { backgroundColor: '#e09020' }]} />
          <Text style={g.legendText}>Alto</Text>
        </View>
      </View>
    </View>
  )
}

export default function CalibrationModal({ visible, onClose, vehicleType, modelName }: Props) {
  const data = DATA[vehicleType]

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={s.safe}>
        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={s.headerTitle}>Calibragem de Pneus</Text>
            {modelName && <Text style={s.headerSub}>{modelName}</Text>}
          </View>
          <TouchableOpacity onPress={onClose} style={s.closeBtn}>
            <Text style={s.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={s.content}>
          {/* Alert box */}
          <View style={s.alertBox}>
            <Text style={s.alertIcon}>🌡️</Text>
            <Text style={s.alertText}>{data.checkNote}</Text>
          </View>

          {/* Gauges */}
          <PressureGauge config={data.front} />
          <PressureGauge config={data.rear} />

          {/* Unit conversion */}
          <View style={s.convCard}>
            <Text style={s.convTitle}>Equivalências</Text>
            <View style={s.convRow}>
              <View style={s.convItem}>
                <Text style={s.convLabel}>Dianteiro</Text>
                <Text style={s.convPsi}>{data.front.recommended} PSI</Text>
                <Text style={s.convOther}>{data.kpa.front}</Text>
                <Text style={s.convOther}>{data.bar.front}</Text>
              </View>
              <View style={s.convDivider} />
              <View style={s.convItem}>
                <Text style={s.convLabel}>Traseiro</Text>
                <Text style={s.convPsi}>{data.rear.recommended} PSI</Text>
                <Text style={s.convOther}>{data.kpa.rear}</Text>
                <Text style={s.convOther}>{data.bar.rear}</Text>
              </View>
            </View>
          </View>

          {/* Load note */}
          <View style={s.noteCard}>
            <Text style={s.noteIcon}>⚖️</Text>
            <Text style={s.noteText}>{data.loadNote}</Text>
          </View>

          {/* Dicas extra */}
          <View style={s.tipsCard}>
            <Text style={s.tipsTitle}>Dicas importantes</Text>
            {[
              'Verifique a calibragem pelo menos 1x por mês.',
              'O adesivo na coluna da porta do motorista mostra a pressão exata para o seu veículo.',
              'Pneus murchos aumentam consumo de combustível e desgastam mais rápido.',
              'Pneus calibrados demais reduzem a aderência e o conforto.',
            ].map((tip, i) => (
              <View key={i} style={s.tipRow}>
                <View style={s.tipDot} />
                <Text style={s.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  )
}

const g = StyleSheet.create({
  gaugeWrap: { backgroundColor: '#141416', borderRadius: 14, borderWidth: 1, borderColor: '#2a2a2e', padding: 16, marginBottom: 12 },
  gaugeLabel: { fontSize: 11, fontWeight: '700', color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 },
  bigValRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', marginBottom: 16, gap: 4 },
  bigVal: { fontSize: 56, fontWeight: '900', color: '#ff6600', lineHeight: 64 },
  bigUnit: { fontSize: 18, fontWeight: '700', color: '#ff6600' },
  barTrack: { height: 28, borderRadius: 14, overflow: 'hidden', flexDirection: 'row', marginBottom: 6 },
  barZone: { height: '100%', alignItems: 'center', justifyContent: 'center' },
  barLow: { backgroundColor: '#e0303040' },
  barRec: { backgroundColor: '#ff6600' },
  barHigh: { backgroundColor: '#e0902040' },
  barRecLabel: { fontSize: 10, fontWeight: '700', color: '#fff', textTransform: 'uppercase', letterSpacing: 0.5 },
  scaleRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  scaleMin: { fontSize: 11, color: '#e03030' },
  scaleRec: { fontSize: 11, color: '#ff6600', fontWeight: '700' },
  scaleMax: { fontSize: 11, color: '#e09020' },
  legendRow: { flexDirection: 'row', justifyContent: 'center', gap: 20 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 11, color: '#666' },
})

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0e0e0f' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#1a1a1c' },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#f0ede8' },
  headerSub: { fontSize: 12, color: '#666', marginTop: 2 },
  closeBtn: { padding: 6 },
  closeText: { color: '#666', fontSize: 18 },
  content: { padding: 16, paddingBottom: 48, gap: 12 },
  alertBox: { flexDirection: 'row', backgroundColor: 'rgba(255,102,0,0.08)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,102,0,0.25)', padding: 14, gap: 10, alignItems: 'flex-start' },
  alertIcon: { fontSize: 20 },
  alertText: { flex: 1, fontSize: 13, color: '#ccc', lineHeight: 20 },
  convCard: { backgroundColor: '#141416', borderRadius: 14, borderWidth: 1, borderColor: '#2a2a2e', padding: 16 },
  convTitle: { fontSize: 11, fontWeight: '700', color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 },
  convRow: { flexDirection: 'row', alignItems: 'center' },
  convItem: { flex: 1, alignItems: 'center', gap: 4 },
  convDivider: { width: 1, height: 60, backgroundColor: '#2a2a2e' },
  convLabel: { fontSize: 11, color: '#555', fontWeight: '600' },
  convPsi: { fontSize: 20, fontWeight: '800', color: '#ff6600' },
  convOther: { fontSize: 12, color: '#777' },
  noteCard: { flexDirection: 'row', backgroundColor: '#141416', borderRadius: 12, borderWidth: 1, borderColor: '#2a2a2e', padding: 14, gap: 10, alignItems: 'flex-start' },
  noteIcon: { fontSize: 18 },
  noteText: { flex: 1, fontSize: 13, color: '#999', lineHeight: 20 },
  tipsCard: { backgroundColor: '#141416', borderRadius: 14, borderWidth: 1, borderColor: '#2a2a2e', padding: 16, gap: 10 },
  tipsTitle: { fontSize: 11, fontWeight: '700', color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  tipDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#ff6600', marginTop: 7, flexShrink: 0 },
  tipText: { flex: 1, fontSize: 13, color: '#888', lineHeight: 20 },
})
