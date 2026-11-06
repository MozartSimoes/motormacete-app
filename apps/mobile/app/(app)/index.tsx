import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '../../lib/auth'

type IoniconName = React.ComponentProps<typeof Ionicons>['name']

const DRIVER_FEATURES: { screen: string; icon: IoniconName; title: string; desc: string }[] = [
  { screen: 'search',    icon: 'search-outline',               title: 'Buscar Veículo',     desc: 'Macetes, problemas e manutenção do seu carro' },
  { screen: 'garage',    icon: 'car-outline',                  title: 'Minha Garagem',      desc: 'Gerencie seus veículos e histórico' },
  { screen: 'mechanic',  icon: 'chatbubble-ellipses-outline',  title: 'Mecânico Virtual',   desc: 'Diagnóstico inteligente por IA' },
  { screen: 'obd',       icon: 'alert-circle-outline',         title: 'Códigos OBD',        desc: '166 códigos de falha com causas e custos' },
  { screen: 'compare',   icon: 'scale-outline',                title: 'Comparador',         desc: 'Compare modelos lado a lado' },
  { screen: 'costs',     icon: 'wallet-outline',               title: 'Custos',             desc: 'Registre e acompanhe gastos' },
  { screen: 'workshops', icon: 'build-outline',                title: 'Encontrar Oficinas', desc: 'Oficinas próximas de você' },
  { screen: 'recall',    icon: 'warning-outline',              title: 'Recall',             desc: 'Verifique se seu veículo tem recall ativo' },
]

const MECHANIC_FEATURES: { screen: string; icon: IoniconName; title: string; desc: string }[] = [
  { screen: 'orders',   icon: 'document-text-outline',        title: 'Ordens de Serviço',  desc: 'Gerencie as OS da sua oficina' },
  { screen: 'finance',  icon: 'wallet-outline',               title: 'Financeiro',         desc: 'Faturamento e métricas da oficina' },
  { screen: 'search',   icon: 'search-outline',               title: 'Buscar Veículo',     desc: 'Consulte macetes e problemas' },
  { screen: 'obd',      icon: 'alert-circle-outline',         title: 'Códigos OBD',        desc: '166 códigos de falha com causas e custos' },
  { screen: 'mechanic', icon: 'chatbubble-ellipses-outline',  title: 'Mecânico Virtual',   desc: 'Diagnóstico inteligente por IA' },
]

export default function HomeScreen() {
  const router = useRouter()
  const { user } = useAuth()
  const features = user?.type === 'MECHANIC' ? MECHANIC_FEATURES : DRIVER_FEATURES

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <View style={s.greeting}>
        <Text style={s.hi}>Olá, <Text style={s.name}>{user?.name?.split(' ')[0]}</Text></Text>
        <Text style={s.sub}>O que vamos resolver hoje?</Text>
      </View>

      <View style={s.grid}>
        {features.map((f) => (
          <TouchableOpacity
            key={f.screen}
            style={s.card}
            onPress={() => router.push(`/(app)/${f.screen}` as any)}
            activeOpacity={0.75}
          >
            <View style={s.iconWrap}>
              <Ionicons name={f.icon} size={26} color="#ff6600" />
            </View>
            <View style={s.cardText}>
              <Text style={s.cardTitle}>{f.title}</Text>
              <Text style={s.cardDesc}>{f.desc}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#333" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0e0e0f' },
  content: { padding: 20, paddingBottom: 40 },
  greeting: { marginBottom: 24 },
  hi: { fontSize: 24, fontWeight: '700', color: '#f0ede8' },
  name: { color: '#ff6600' },
  sub: { fontSize: 13, color: '#666', marginTop: 4 },
  grid: { gap: 10 },
  card: {
    backgroundColor: '#141416', borderRadius: 14, borderWidth: 1, borderColor: '#2a2a2e',
    padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14,
  },
  iconWrap: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: 'rgba(255,102,0,0.1)', borderWidth: 1, borderColor: 'rgba(255,102,0,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#f0ede8' },
  cardDesc: { fontSize: 12, color: '#555', marginTop: 2 },
})
