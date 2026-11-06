import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Drawer } from 'expo-router/drawer'
import { DrawerContentScrollView, type DrawerContentComponentProps } from '@react-navigation/drawer'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '../../lib/auth'

type IoniconName = React.ComponentProps<typeof Ionicons>['name']

const MENU_ITEMS: { name: string; title: string; icon: IoniconName }[] = [
  { name: 'index',     title: 'Início',            icon: 'home-outline' },
  { name: 'checklist', title: 'Checklist Viagem',  icon: 'checkmark-circle-outline' },
  { name: 'plans',     title: 'Assinar Pro',       icon: 'star-outline' },
  { name: 'profile',   title: 'Perfil',            icon: 'person-outline' },
  { name: 'contact',   title: 'Falar conosco',     icon: 'mail-outline' },
]

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const items = MENU_ITEMS

  return (
    <DrawerContentScrollView {...props} style={s.drawer}>
      {/* Header */}
      <View style={s.drawerHeader}>
        <View style={s.logoRow}>
          <Image source={require('../../assets/icon.png')} style={s.logoIcon} />
          <Text style={s.drawerLogo}>Motor<Text style={s.accent}>Macete</Text></Text>
        </View>
        <Text style={s.drawerUser}>{user?.name}</Text>
        <View style={s.badgeRow}>
          <View style={s.badge}>
            <Text style={s.badgeText}>{user?.type === 'MECHANIC' ? 'Mecânico' : 'Motorista'}</Text>
          </View>
          {(user as any)?.plan === 'MECHANIC_PRO' && (
            <View style={s.verifiedBadge}>
              <Text style={s.verifiedBadgeText}>✓ Verificado</Text>
            </View>
          )}
          {((user as any)?.plan === 'DRIVER_PRO' || (user as any)?.isAdmin) && (
            <View style={s.proBadge}>
              <Text style={s.proBadgeText}>⭐ Pro</Text>
            </View>
          )}
        </View>
      </View>

      {/* Nav items */}
      {items.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={s.drawerItem}
          onPress={() => router.push(`/(app)/${item.name === 'index' ? '' : item.name}` as any)}
        >
          <Ionicons name={item.icon} size={20} color="#ff6600" style={s.itemIcon} />
          <Text style={s.itemLabel}>{item.title}</Text>
        </TouchableOpacity>
      ))}

      {/* Logout */}
      <TouchableOpacity
        style={[s.drawerItem, s.logoutItem]}
        onPress={async () => { await signOut(); router.replace('/(auth)') }}
      >
        <Ionicons name="log-out-outline" size={20} color="#e03030" style={s.itemIcon} />
        <Text style={[s.itemLabel, s.logoutLabel]}>Sair</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  )
}

function BackButton() {
  const router = useRouter()
  return (
    <TouchableOpacity onPress={() => router.push('/(app)/' as any)} style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
      <Ionicons name="arrow-back" size={22} color="#f0ede8" />
    </TouchableOpacity>
  )
}

const backBtn = { headerLeft: () => <BackButton /> }

export default function AppLayout() {
  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerStyle: { backgroundColor: '#0e0e0f' },
        headerTintColor: '#f0ede8',
        headerTitleStyle: { fontWeight: '700' },
        drawerStyle: { backgroundColor: '#0e0e0f', width: 280 },
        drawerType: 'slide',
        overlayColor: 'rgba(0,0,0,0.6)',
        sceneStyle: { backgroundColor: '#0e0e0f' },
      }}
    >
      <Drawer.Screen name="index" options={{ title: 'Início' }} />
      <Drawer.Screen name="search"    options={{ title: 'Buscar Veículo',      ...backBtn }} />
      <Drawer.Screen name="garage"    options={{ title: 'Minha Garagem',       ...backBtn }} />
      <Drawer.Screen name="mechanic"  options={{ title: 'Mecânico Virtual',    ...backBtn }} />
      <Drawer.Screen name="compare"   options={{ title: 'Comparador',          ...backBtn }} />
      <Drawer.Screen name="costs"     options={{ title: 'Custos',              ...backBtn }} />
      <Drawer.Screen name="workshops" options={{ title: 'Encontrar Oficinas',  ...backBtn }} />
      <Drawer.Screen name="plans"     options={{ title: 'Planos Pro',          ...backBtn }} />
      <Drawer.Screen name="profile"   options={{ title: 'Meu Perfil',          ...backBtn }} />
      <Drawer.Screen name="contact"   options={{ title: 'Falar Conosco',       ...backBtn }} />
      <Drawer.Screen name="obd"       options={{ title: 'Códigos OBD',         ...backBtn }} />
      <Drawer.Screen name="orders"    options={{ title: 'Ordens de Serviço',   ...backBtn }} />
      <Drawer.Screen name="finance"   options={{ title: 'Financeiro',          ...backBtn }} />
      <Drawer.Screen name="recall"     options={{ title: 'Recall',              ...backBtn }} />
      <Drawer.Screen name="checklist" options={{ title: 'Checklist de Viagem', ...backBtn }} />
    </Drawer>
  )
}

const s = StyleSheet.create({
  drawer: { backgroundColor: '#0e0e0f' },
  drawerHeader: { padding: 20, paddingTop: 16, borderBottomWidth: 1, borderBottomColor: '#1a1a1c', marginBottom: 8 },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 2 },
  logoIcon: { width: 36, height: 36, borderRadius: 9 },
  drawerLogo: { fontSize: 22, fontWeight: '900', color: '#f0ede8' },
  accent: { color: '#ff6600' },
  drawerUser: { fontSize: 15, fontWeight: '600', color: '#f0ede8', marginTop: 12 },
  badgeRow: { flexDirection: 'row', marginTop: 6 },
  badge: { backgroundColor: 'rgba(255,102,0,0.12)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: 'rgba(255,102,0,0.3)' },
  badgeText: { color: '#ff6600', fontSize: 11, fontWeight: '600' },
  verifiedBadge: { backgroundColor: 'rgba(34,197,94,0.12)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: 'rgba(34,197,94,0.35)' },
  verifiedBadgeText: { color: '#22c55e', fontSize: 11, fontWeight: '700' },
  proBadge: { backgroundColor: 'rgba(255,102,0,0.12)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: 'rgba(255,102,0,0.3)' },
  proBadgeText: { color: '#ff6600', fontSize: 11, fontWeight: '700' },
  drawerItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, gap: 14 },
  itemIcon: { width: 24, textAlign: 'center' },
  itemLabel: { fontSize: 15, color: '#ccc', fontWeight: '500' },
  logoutItem: { marginTop: 8, borderTopWidth: 1, borderTopColor: '#1a1a1c' },
  logoutLabel: { color: '#e03030' },
})
