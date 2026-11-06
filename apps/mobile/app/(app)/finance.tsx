import { useState, useEffect, useCallback } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, RefreshControl, Modal } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import { apiFetch, getToken } from '../../lib/api'
import { useAuth } from '../../lib/auth'

type OSStatus = 'OPEN' | 'IN_PROGRESS' | 'WAITING_PARTS' | 'DONE' | 'CLOSED' | 'CANCELLED'

const STATUS_META: Record<OSStatus, { label: string; color: string }> = {
  OPEN:          { label: 'Aberta',        color: '#3b82f6' },
  IN_PROGRESS:   { label: 'Em andamento',  color: '#f59e0b' },
  WAITING_PARTS: { label: 'Aguard. peças', color: '#8b5cf6' },
  DONE:          { label: 'Concluída',     color: '#22c55e' },
  CLOSED:        { label: 'Fechada',       color: '#666'    },
  CANCELLED:     { label: 'Cancelada',     color: '#e03030' },
}

const MONTHS = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']

interface Stats {
  open: number; inProgress: number
  monthlyCount: number; monthlyRevenue: number
  lastMonthRevenue: number; totalOS: number
}
interface RecentOS {
  id: string; number: number; clientName: string
  vehicleBrand: string; vehicleModel: string
  status: OSStatus; total: number; createdAt: string
}

function fmtBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}
function growthPct(curr: number, prev: number) {
  if (prev === 0) return null
  return ((curr - prev) / prev) * 100
}

export default function FinanceScreen() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [workshopName, setWorkshopName] = useState('')
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentOS, setRecentOS] = useState<RecentOS[]>([])
  const [generatingPdf, setGeneratingPdf] = useState(false)
  const [infoModal, setInfoModal] = useState<{ title: string; message: string } | null>(null)
  const [clientAlerts, setClientAlerts] = useState<{id:string;clientName:string;clientPhone:string|null;vehicleBrand:string;vehicleModel:string;nextMaintenanceDate:string;number:number}[]>([])

  const now = new Date()
  const [pdfMonth, setPdfMonth] = useState(now.getMonth() + 1)
  const [pdfYear]  = useState(now.getFullYear())

  const isPro = user?.isAdmin || user?.plan === "MECHANIC_PRO" || user?.plan === "DRIVER_PRO" || user?.isTrialing

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    try {
      const res = await apiFetch('/api/mecanico/stats')
      const data = await res.json()
      setWorkshopName(data.workshop?.name ?? '')
      setStats(data.stats ?? null)
      setRecentOS(data.recentOS ?? [])
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    if (!isPro) return
    apiFetch('/api/alerts/clients/upcoming')
      .then(r => r.json())
      .then(d => setClientAlerts(d.alerts ?? []))
      .catch(() => {})
  }, [isPro])

  useEffect(() => { load() }, [load])

  async function handleDownloadRelatorio() {
    setGeneratingPdf(true)
    try {
      const token = await getToken()
      const API_BASE = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000'
      const url = `${API_BASE}/api/mecanico/relatorio?month=${pdfMonth}&year=${pdfYear}`
      const filename = `relatorio-faturamento-${pdfYear}-${String(pdfMonth).padStart(2,'0')}.pdf`
      const dest = `${FileSystem.cacheDirectory}${filename}`
      const result = await FileSystem.downloadAsync(url, dest, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      if (result.status !== 200) { setInfoModal({ title: 'Erro', message: 'Não foi possível gerar o relatório.' }); return }
      const canShare = await Sharing.isAvailableAsync()
      if (canShare) {
        await Sharing.shareAsync(result.uri, { mimeType: 'application/pdf', dialogTitle: `Relatório ${MONTHS[pdfMonth-1]}/${pdfYear}` })
      } else {
        setInfoModal({ title: 'PDF salvo', message: result.uri })
      }
    } catch {
      setInfoModal({ title: 'Erro', message: 'Falha ao gerar o relatório PDF.' })
    } finally {
      setGeneratingPdf(false)
    }
  }

  if (loading) {
    return <View style={s.center}><ActivityIndicator color="#ff6600" size="large" /></View>
  }

  const growth = stats ? growthPct(stats.monthlyRevenue, stats.lastMonthRevenue) : null
  const monthName = now.toLocaleDateString('pt-BR', { month: 'long' })

  return (
    <ScrollView
      style={s.root}
      contentContainerStyle={s.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(true) }} tintColor="#ff6600" />}
    >
      {/* Workshop header */}
      {workshopName ? (
        <View style={s.workshopRow}>
          <View style={s.workshopIcon}>
            <Ionicons name="business-outline" size={18} color="#ff6600" />
          </View>
          <Text style={s.workshopName}>{workshopName}</Text>
        </View>
      ) : null}

      {/* Monthly revenue hero */}
      <View style={s.heroCard}>
        <Text style={s.heroLabel}>Faturamento — {monthName}</Text>
        <Text style={s.heroValue}>{fmtBRL(stats?.monthlyRevenue ?? 0)}</Text>
        {growth !== null && (
          <View style={[s.growthBadge, { backgroundColor: growth >= 0 ? '#22c55e20' : '#e0303020', borderColor: growth >= 0 ? '#22c55e50' : '#e0303050' }]}>
            <Ionicons name={growth >= 0 ? 'trending-up-outline' : 'trending-down-outline'} size={13} color={growth >= 0 ? '#22c55e' : '#e03030'} />
            <Text style={[s.growthText, { color: growth >= 0 ? '#22c55e' : '#e03030' }]}>
              {growth >= 0 ? '+' : ''}{growth.toFixed(1)}% vs mês anterior
            </Text>
          </View>
        )}
        <Text style={s.heroSub}>Mês anterior: {fmtBRL(stats?.lastMonthRevenue ?? 0)}</Text>
      </View>

      {/* Stats grid */}
      <View style={s.grid}>
        <StatCard icon="document-text-outline" label="OS abertas"    value={String(stats?.open ?? 0)} accent="#3b82f6" />
        <StatCard icon="construct-outline"     label="Em andamento"  value={String(stats?.inProgress ?? 0)} accent="#f59e0b" />
        <StatCard icon="checkmark-circle-outline" label="OS este mês" value={String(stats?.monthlyCount ?? 0)} accent="#22c55e" />
        <StatCard icon="layers-outline"        label="Total OS"      value={String(stats?.totalOS ?? 0)} accent="#8b5cf6" />
      </View>

      {/* Relatório PDF — só Pro */}
      {isPro && (
        <View style={s.relatorioCard}>
          <View style={s.relatorioHeader}>
            <Ionicons name="document-text-outline" size={20} color="#ff6600" />
            <Text style={s.relatorioTitle}>⭐ Relatório de Faturamento PDF</Text>
          </View>
          <Text style={s.relatorioDesc}>Gere o relatório completo com todas as OS, faturamento por status e ticket médio.</Text>
          <View style={s.relatorioControls}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }}>
              <View style={{ flexDirection: 'row', gap: 6 }}>
                {MONTHS.map((m, i) => (
                  <TouchableOpacity key={i} style={[s.monthChip, pdfMonth === i+1 && s.monthChipActive]}
                    onPress={() => setPdfMonth(i+1)}>
                    <Text style={[s.monthChipText, pdfMonth === i+1 && s.monthChipTextActive]}>{m}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <TouchableOpacity style={[s.relatorioBtn, generatingPdf && s.relatorioBtnDisabled]}
              onPress={handleDownloadRelatorio} disabled={generatingPdf}>
              {generatingPdf
                ? <ActivityIndicator size="small" color="#111" />
                : <Text style={s.relatorioBtnText}>📄 Gerar PDF — {MONTHS[pdfMonth-1]}/{pdfYear}</Text>
              }
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Alertas de clientes — só Pro */}
      {isPro && clientAlerts.length > 0 && (
        <View style={s.clientAlertsSection}>
          <Text style={s.clientAlertsTitle}>⭐ Clientes com revisão próxima</Text>
          {clientAlerts.map(alert => (
            <View key={alert.id} style={[
              s.clientAlertCard,
              (alert as any).daysLeft <= 3 ? s.alertRed : (alert as any).daysLeft <= 7 ? s.alertOrange : s.alertYellow,
            ]}>
              <View style={{ flex: 1 }}>
                <Text style={s.clientAlertName}>{alert.clientName}</Text>
                <Text style={s.clientAlertVehicle}>{alert.vehicleBrand} {alert.vehicleModel}</Text>
                <Text style={s.clientAlertDate}>
                  {new Date(alert.nextMaintenanceDate).toLocaleDateString('pt-BR', { day:'2-digit', month:'short' })}
                  {alert.clientPhone ? ` · ${alert.clientPhone}` : ''}
                </Text>
              </View>
              <View style={[s.daysBadge, { backgroundColor: (alert as any).daysLeft <= 3 ? '#ef4444' : (alert as any).daysLeft <= 7 ? '#f97316' : '#eab308' }]}>
                <Text style={s.daysBadgeText}>{(alert as any).daysLeft}d</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Recent OS */}
      {recentOS.length > 0 && (
        <>
          <View style={s.sectionRow}>
            <Text style={s.sectionTitle}>Últimas OS</Text>
            <TouchableOpacity onPress={() => router.push('/(app)/orders' as any)}>
              <Text style={s.sectionLink}>Ver todas →</Text>
            </TouchableOpacity>
          </View>

          <View style={s.recentList}>
            {recentOS.map((os, idx) => {
              const meta = STATUS_META[os.status]
              return (
                <TouchableOpacity
                  key={os.id}
                  style={[s.recentCard, idx < recentOS.length - 1 && s.recentCardBorder]}
                  onPress={() => router.push('/(app)/orders' as any)}
                  activeOpacity={0.75}
                >
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Text style={s.recentNum}>OS #{os.number}</Text>
                      <View style={[s.statusDot, { backgroundColor: meta.color }]} />
                    </View>
                    <Text style={s.recentClient} numberOfLines={1}>{os.clientName}</Text>
                    <Text style={s.recentVehicle} numberOfLines={1}>{os.vehicleBrand} {os.vehicleModel}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={s.recentTotal}>{fmtBRL(os.total)}</Text>
                    <View style={[s.statusBadge, { backgroundColor: meta.color + '20', borderColor: meta.color + '50' }]}>
                      <Text style={[s.statusBadgeText, { color: meta.color }]}>{meta.label}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        </>
      )}

      <Modal visible={!!infoModal} transparent animationType="fade" onRequestClose={() => setInfoModal(null)}>
        <View style={s.modalOverlay}>
          <View style={s.modalBox}>
            <Text style={s.modalTitle}>{infoModal?.title}</Text>
            <Text style={s.modalMessage}>{infoModal?.message}</Text>
            <TouchableOpacity style={s.modalBtn} onPress={() => setInfoModal(null)} activeOpacity={0.85}>
              <Text style={s.modalBtnText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

function StatCard({ icon, label, value, accent }: { icon: any; label: string; value: string; accent: string }) {
  return (
    <View style={[st.card, { borderColor: accent + '30' }]}>
      <View style={[st.iconWrap, { backgroundColor: accent + '15' }]}>
        <Ionicons name={icon} size={20} color={accent} />
      </View>
      <Text style={st.value}>{value}</Text>
      <Text style={st.label}>{label}</Text>
    </View>
  )
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0e0e0f' },
  content: { padding: 16, paddingBottom: 48 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0e0e0f' },
  workshopRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  workshopIcon: { width: 34, height: 34, borderRadius: 9, backgroundColor: 'rgba(255,102,0,0.12)', borderWidth: 1, borderColor: 'rgba(255,102,0,0.25)', alignItems: 'center', justifyContent: 'center' },
  workshopName: { fontSize: 16, fontWeight: '700', color: '#f0ede8' },
  heroCard: { backgroundColor: '#141416', borderRadius: 16, borderWidth: 1, borderColor: '#2a2a2e', padding: 20, marginBottom: 16 },
  heroLabel: { fontSize: 11, fontWeight: '700', color: '#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  heroValue: { fontSize: 38, fontWeight: '900', color: '#ff6600', letterSpacing: -1 },
  growthBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, alignSelf: 'flex-start', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, marginTop: 10 },
  growthText: { fontSize: 12, fontWeight: '700' },
  heroSub: { fontSize: 12, color: '#444', marginTop: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },

  relatorioCard: { backgroundColor: 'rgba(255,102,0,0.06)', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,102,0,0.25)', padding: 16, marginBottom: 24 },
  relatorioHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  relatorioTitle: { fontSize: 14, fontWeight: '800', color: '#ff6600' },
  relatorioDesc: { fontSize: 12, color: '#888', marginBottom: 14, lineHeight: 18 },
  relatorioControls: { gap: 10 },
  monthChip: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, backgroundColor: '#1a1a1c', borderWidth: 1, borderColor: '#2a2a2e' },
  monthChipActive: { backgroundColor: '#ff6600', borderColor: '#ff6600' },
  monthChipText: { fontSize: 11, fontWeight: '700', color: '#666' },
  monthChipTextActive: { color: '#fff' },
  relatorioBtn: { backgroundColor: '#ff6600', borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  relatorioBtnDisabled: { opacity: 0.6 },
  relatorioBtnText: { fontSize: 13, fontWeight: '800', color: '#111' },

  clientAlertsSection: { marginBottom: 24 },
  clientAlertsTitle: { fontSize: 11, fontWeight: '700', color: '#ff6600', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 },
  clientAlertCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, borderWidth: 1, padding: 12, marginBottom: 8 },
  alertRed:    { backgroundColor: 'rgba(239,68,68,0.07)',   borderColor: 'rgba(239,68,68,0.25)'   },
  alertOrange: { backgroundColor: 'rgba(249,115,22,0.07)',  borderColor: 'rgba(249,115,22,0.25)'  },
  alertYellow: { backgroundColor: 'rgba(234,179,8,0.07)',   borderColor: 'rgba(234,179,8,0.25)'   },
  clientAlertName:    { fontSize: 13, fontWeight: '700', color: '#f0ede8' },
  clientAlertVehicle: { fontSize: 11, color: '#777', marginTop: 1 },
  clientAlertDate:    { fontSize: 11, color: '#555', marginTop: 2 },
  daysBadge:     { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5, marginLeft: 8 },
  daysBadgeText: { fontSize: 11, fontWeight: '800', color: '#fff' },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#f0ede8' },
  sectionLink: { fontSize: 12, color: '#ff6600', fontWeight: '600' },
  recentList: { backgroundColor: '#141416', borderRadius: 14, borderWidth: 1, borderColor: '#2a2a2e', overflow: 'hidden' },
  recentCard: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 10 },
  recentCardBorder: { borderBottomWidth: 1, borderBottomColor: '#1e1e20' },
  recentNum: { fontSize: 12, fontWeight: '800', color: '#ff6600' },
  recentClient: { fontSize: 14, fontWeight: '700', color: '#f0ede8', marginTop: 2 },
  recentVehicle: { fontSize: 11, color: '#555', marginTop: 1 },
  recentTotal: { fontSize: 15, fontWeight: '800', color: '#f0ede8', marginBottom: 5 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusBadge: { borderRadius: 5, paddingHorizontal: 7, paddingVertical: 2, borderWidth: 1 },
  statusBadgeText: { fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.3 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center', justifyContent: 'center', padding: 32 },
  modalBox: { backgroundColor: '#141416', borderRadius: 20, borderWidth: 1, borderColor: '#2a2a2e', padding: 24, alignItems: 'center', width: '100%' },
  modalTitle: { fontSize: 17, fontWeight: '800', color: '#f0ede8', textAlign: 'center', marginBottom: 8 },
  modalMessage: { fontSize: 13, color: '#888', textAlign: 'center', lineHeight: 20, marginBottom: 20 },
  modalBtn: { backgroundColor: '#ff6600', borderRadius: 12, paddingVertical: 13, paddingHorizontal: 40 },
  modalBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
})

const st = StyleSheet.create({
  card: { width: '47%', backgroundColor: '#141416', borderRadius: 14, borderWidth: 1, padding: 14, gap: 8 },
  iconWrap: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  value: { fontSize: 28, fontWeight: '900', color: '#f0ede8' },
  label: { fontSize: 11, color: '#555', fontWeight: '600' },
})
