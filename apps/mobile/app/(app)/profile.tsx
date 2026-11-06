import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '../../lib/auth'
import { apiFetch } from '../../lib/api'

export default function ProfileScreen() {
  const { user, signOut, updateUser } = useAuth()
  const router = useRouter()

  const isPro = user?.isAdmin || user?.plan === "DRIVER_PRO" || user?.plan === "MECHANIC_PRO" || user?.isTrialing
  const isTrialing = user?.isTrialing ?? false
  const trialDaysLeft = user?.trialDaysLeft ?? 0
  const planLabel = user?.plan === 'MECHANIC_PRO' ? 'Mecânico Pro' : user?.plan === 'DRIVER_PRO' ? 'Motorista Pro' : isTrialing ? `Avaliação gratuita` : 'Grátis'

  // Edit name state
  const [editNameVisible, setEditNameVisible] = useState(false)
  const [newName, setNewName] = useState('')
  const [nameLoading, setNameLoading] = useState(false)
  const [nameError, setNameError] = useState('')

  // Delete account state
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')
  const [showDeletePassword, setShowDeletePassword] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  async function handleLogout() {
    await signOut()
    router.replace('/(auth)')
  }

  function openEditName() {
    setNewName(user?.name ?? '')
    setNameError('')
    setEditNameVisible(true)
  }

  async function handleSaveName() {
    const trimmed = newName.trim()
    if (!trimmed) { setNameError('Nome não pode ser vazio.'); return }
    if (trimmed === user?.name) { setEditNameVisible(false); return }
    setNameLoading(true)
    setNameError('')
    try {
      const res = await apiFetch('/api/auth/profile', { method: 'PATCH', body: JSON.stringify({ name: trimmed }) })
      const data = await res.json()
      if (data.error) { setNameError(data.error) }
      else { updateUser({ name: trimmed }); setEditNameVisible(false) }
    } catch {
      setNameError('Erro ao salvar. Tente novamente.')
    }
    setNameLoading(false)
  }

  function openDeleteAccount() {
    setDeletePassword('')
    setDeleteError('')
    setDeleteVisible(true)
  }

  async function handleDeleteAccount() {
    if (!deletePassword) { setDeleteError('Digite sua senha para confirmar.'); return }
    setDeleteLoading(true)
    setDeleteError('')
    try {
      const res = await apiFetch('/api/auth/delete', {
        method: 'POST',
        body: JSON.stringify({ email: user?.email, password: deletePassword }),
      })
      const data = await res.json()
      if (data.error) { setDeleteError(data.error) }
      else {
        setDeleteVisible(false)
        await signOut()
        router.replace('/(auth)')
      }
    } catch {
      setDeleteError('Erro ao excluir. Tente novamente.')
    }
    setDeleteLoading(false)
  }

  return (
    <>
      <ScrollView style={s.container} contentContainerStyle={s.content}>
        {/* Avatar block */}
        <View style={s.avatarBlock}>
          <View style={[s.avatar, isPro && s.avatarPro]}>
            <Text style={s.avatarText}>{user?.name?.charAt(0).toUpperCase()}</Text>
            {isPro && (
              <View style={s.proCrown}>
                <Text style={s.proCrownText}>⭐</Text>
              </View>
            )}
          </View>
          <Text style={s.userName}>{user?.name}</Text>
          <Text style={s.userEmail}>{user?.email}</Text>
          <View style={s.badgeRow}>
            <View style={s.badge}>
              <Ionicons name={user?.type === 'MECHANIC' ? 'construct-outline' : 'car-outline'} size={12} color="#ff6600" />
              <Text style={s.badgeText}>{user?.type === 'MECHANIC' ? 'Mecânico' : 'Motorista'}</Text>
            </View>
            {isPro && (
              <View style={s.proBadge}>
                <Text style={s.proBadgeText}>⭐ PRO</Text>
              </View>
            )}
            {user?.plan === 'MECHANIC_PRO' && (
              <View style={s.verifiedBadge}>
                <Text style={s.verifiedBadgeText}>✓ VERIFICADO</Text>
              </View>
            )}
          </View>
        </View>

        {/* Banner de trial */}
        {isTrialing && !isPro && (
          <View style={s.trialCard}>
            <View style={s.trialCardHeader}>
              <Text style={s.trialCardTitle}>🎉 Avaliação Gratuita — {trialDaysLeft} dia{trialDaysLeft !== 1 ? 's' : ''} restante{trialDaysLeft !== 1 ? 's' : ''}</Text>
              <View style={s.trialActiveBadge}><Text style={s.trialActiveBadgeText}>ATIVO</Text></View>
            </View>
            <Text style={s.trialCardDesc}>
              Você está aproveitando todos os recursos Pro gratuitamente. Após o período de avaliação, você poderá assinar o plano Pro para continuar com acesso completo.
            </Text>
            <TouchableOpacity style={s.trialCta} onPress={() => router.push('/(app)/plans' as any)}>
              <Text style={s.trialCtaText}>Ver planos Pro →</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Card PRO com benefícios */}
        {isPro && (
          <View style={s.proCard}>
            <View style={s.proCardHeader}>
              <Text style={s.proCardTitle}>⭐ {planLabel}</Text>
              <View style={s.proActiveBadge}><Text style={s.proActiveBadgeText}>ATIVO</Text></View>
            </View>
            <Text style={s.proCardDesc}>
              {user?.plan === 'MECHANIC_PRO'
                ? 'OS ilimitadas · Dashboard financeiro · PDF de faturamento · Badge Verificado'
                : 'Veículos ilimitados · Mecânico Virtual ilimitado · Laudo PDF · Gráficos · Alertas por e-mail'}
            </Text>
          </View>
        )}

        {/* Info cards */}
        <TouchableOpacity style={[s.card, s.cardEditable]} onPress={openEditName} activeOpacity={0.7}>
          <View style={s.cardRow}>
            <View>
              <Text style={s.cardLabel}>Nome</Text>
              <Text style={s.cardValue}>{user?.name}</Text>
            </View>
            <Ionicons name="pencil-outline" size={16} color="#ff6600" />
          </View>
        </TouchableOpacity>
        <View style={s.card}>
          <Text style={s.cardLabel}>E-mail</Text>
          <Text style={s.cardValue}>{user?.email}</Text>
        </View>
        <View style={s.card}>
          <Text style={s.cardLabel}>Tipo de conta</Text>
          <Text style={s.cardValue}>{user?.type === 'MECHANIC' ? 'Mecânico' : 'Motorista'}</Text>
        </View>
        <View style={s.card}>
          <Text style={s.cardLabel}>Plano</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={s.cardValue}>{planLabel}</Text>
            {isPro && <View style={s.planProPill}><Text style={s.planProPillText}>PRO</Text></View>}
          </View>
        </View>

        <Text style={s.sectionTitle}>Conta</Text>

        {!isPro && (
          <TouchableOpacity style={s.upgradeBtn} onPress={() => router.push('/(app)/plans' as any)}>
            <Text style={s.upgradeBtnText}>⭐ Assinar plano Pro</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={s.menuItem} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#e03030" />
          <Text style={s.menuItemLabelDanger}>Sair da conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[s.menuItem, s.menuItemDelete]} onPress={openDeleteAccount}>
          <Ionicons name="trash-outline" size={20} color="#c0392b" />
          <Text style={s.menuItemLabelDelete}>Excluir conta</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal — Editar nome */}
      <Modal visible={editNameVisible} transparent animationType="fade" onRequestClose={() => setEditNameVisible(false)}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.overlay}>
          <View style={s.modalBox}>
            <Text style={s.modalTitle}>Editar nome</Text>
            <TextInput
              style={s.input}
              value={newName}
              onChangeText={setNewName}
              placeholder="Seu nome completo"
              placeholderTextColor="#555"
              autoFocus
              returnKeyType="done"
              onSubmitEditing={handleSaveName}
            />
            {!!nameError && <Text style={s.errorText}>{nameError}</Text>}
            <View style={s.modalActions}>
              <TouchableOpacity style={s.cancelBtn} onPress={() => setEditNameVisible(false)} disabled={nameLoading}>
                <Text style={s.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.saveBtn} onPress={handleSaveName} disabled={nameLoading}>
                {nameLoading
                  ? <ActivityIndicator size="small" color="#fff" />
                  : <Text style={s.saveBtnText}>Salvar</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Modal — Excluir conta */}
      <Modal visible={deleteVisible} transparent animationType="fade" onRequestClose={() => setDeleteVisible(false)}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.overlay}>
          <View style={s.modalBox}>
            <Text style={s.modalTitle}>Excluir conta</Text>
            <Text style={s.modalDesc}>
              Esta ação é irreversível. Todos os seus dados (veículos, checklists, histórico) serão apagados permanentemente.
            </Text>
            <Text style={s.modalDesc}>Digite sua senha para confirmar:</Text>
            <View style={s.inputRow}>
              <TextInput
                style={s.inputFlex}
                value={deletePassword}
                onChangeText={setDeletePassword}
                placeholder="Sua senha"
                placeholderTextColor="#555"
                secureTextEntry={!showDeletePassword}
                autoFocus
                returnKeyType="done"
                onSubmitEditing={handleDeleteAccount}
              />
              <TouchableOpacity style={s.eyeBtn} onPress={() => setShowDeletePassword(!showDeletePassword)}>
                <Ionicons name={showDeletePassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#555" />
              </TouchableOpacity>
            </View>
            {!!deleteError && <Text style={s.errorText}>{deleteError}</Text>}
            <View style={s.modalActions}>
              <TouchableOpacity style={s.cancelBtn} onPress={() => setDeleteVisible(false)} disabled={deleteLoading}>
                <Text style={s.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.deleteBtnConfirm} onPress={handleDeleteAccount} disabled={deleteLoading}>
                {deleteLoading
                  ? <ActivityIndicator size="small" color="#fff" />
                  : <Text style={s.deleteBtnConfirmText}>Excluir</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0e0e0f' },
  content: { padding: 20, paddingBottom: 48 },

  avatarBlock: { alignItems: 'center', paddingVertical: 32, marginBottom: 8 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#ff6600', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarPro: { borderWidth: 3, borderColor: '#ff6600', shadowColor: '#ff6600', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 12, elevation: 8 },
  avatarText: { fontSize: 32, fontWeight: '900', color: '#fff' },
  proCrown: { position: 'absolute', top: -8, right: -8, backgroundColor: '#ff6600', borderRadius: 10, width: 20, height: 20, alignItems: 'center', justifyContent: 'center' },
  proCrownText: { fontSize: 10 },

  userName: { fontSize: 22, fontWeight: '800', color: '#f0ede8' },
  userEmail: { fontSize: 13, color: '#666', marginTop: 4 },
  badgeRow: { flexDirection: 'row', gap: 8, marginTop: 10, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { backgroundColor: 'rgba(255,102,0,0.12)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: 'rgba(255,102,0,0.3)', flexDirection: 'row', alignItems: 'center', gap: 4 },
  badgeText: { color: '#ff6600', fontSize: 12, fontWeight: '600' },
  proBadge: { backgroundColor: '#ff6600', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  proBadgeText: { color: '#fff', fontSize: 12, fontWeight: '800', letterSpacing: 1 },
  verifiedBadge: { backgroundColor: 'rgba(34,197,94,0.15)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: 'rgba(34,197,94,0.4)' },
  verifiedBadgeText: { color: '#22c55e', fontSize: 12, fontWeight: '800', letterSpacing: 1 },

  trialCard: { backgroundColor: 'rgba(34,197,94,0.06)', borderRadius: 14, borderWidth: 1, borderColor: 'rgba(34,197,94,0.3)', padding: 16, marginBottom: 16 },
  trialCardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  trialCardTitle: { fontSize: 13, fontWeight: '800', color: '#22c55e', flex: 1, marginRight: 8 },
  trialActiveBadge: { backgroundColor: 'rgba(34,197,94,0.15)', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1, borderColor: 'rgba(34,197,94,0.3)' },
  trialActiveBadgeText: { color: '#22c55e', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  trialCardDesc: { fontSize: 12, color: '#777', lineHeight: 18, marginBottom: 12 },
  trialCta: { backgroundColor: 'rgba(255,102,0,0.1)', borderRadius: 8, paddingVertical: 8, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,102,0,0.25)' },
  trialCtaText: { fontSize: 13, fontWeight: '700', color: '#ff6600' },
  proCard: { backgroundColor: 'rgba(255,102,0,0.07)', borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,102,0,0.3)', padding: 16, marginBottom: 16 },
  proCardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  proCardTitle: { fontSize: 15, fontWeight: '800', color: '#ff6600' },
  proActiveBadge: { backgroundColor: 'rgba(34,197,94,0.15)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3, borderWidth: 1, borderColor: 'rgba(34,197,94,0.3)' },
  proActiveBadgeText: { color: '#22c55e', fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  proCardDesc: { fontSize: 12, color: '#888', lineHeight: 18 },

  card: { backgroundColor: '#141416', borderRadius: 10, borderWidth: 1, borderColor: '#2a2a2e', padding: 16, marginBottom: 10 },
  cardEditable: { borderColor: '#2a2a2e' },
  cardRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardLabel: { fontSize: 11, fontWeight: '700', color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  cardValue: { fontSize: 15, color: '#f0ede8' },
  planProPill: { backgroundColor: '#ff6600', borderRadius: 8, paddingHorizontal: 7, paddingVertical: 2 },
  planProPillText: { color: '#fff', fontSize: 10, fontWeight: '800', letterSpacing: 1 },

  sectionTitle: { fontSize: 11, fontWeight: '700', color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginTop: 24, marginBottom: 12 },
  upgradeBtn: { backgroundColor: 'rgba(255,102,0,0.1)', borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,102,0,0.3)', padding: 16, alignItems: 'center', marginBottom: 10 },
  upgradeBtnText: { fontSize: 14, fontWeight: '700', color: '#ff6600' },
  menuItem: { backgroundColor: '#141416', borderRadius: 10, borderWidth: 1, borderColor: '#2a2a2e', padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 10 },
  menuItemLabelDanger: { fontSize: 15, fontWeight: '600', color: '#e03030' },
  menuItemDelete: { borderColor: 'rgba(192,57,43,0.25)', backgroundColor: 'rgba(192,57,43,0.06)' },
  menuItemLabelDelete: { fontSize: 15, fontWeight: '600', color: '#c0392b' },

  // Modal
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'center', padding: 24 },
  modalBox: { backgroundColor: '#18181b', borderRadius: 16, padding: 24, borderWidth: 1, borderColor: '#2a2a2e' },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#f0ede8', marginBottom: 12 },
  modalDesc: { fontSize: 13, color: '#888', lineHeight: 20, marginBottom: 8 },
  input: { backgroundColor: '#0e0e0f', borderWidth: 1, borderColor: '#2a2a2e', borderRadius: 10, padding: 14, color: '#f0ede8', fontSize: 15, marginTop: 8, marginBottom: 4 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0e0e0f', borderWidth: 1, borderColor: '#2a2a2e', borderRadius: 10, marginTop: 8, marginBottom: 4 },
  inputFlex: { flex: 1, padding: 14, color: '#f0ede8', fontSize: 15 },
  eyeBtn: { paddingHorizontal: 14, paddingVertical: 14 },
  errorText: { fontSize: 12, color: '#e03030', marginTop: 6, marginBottom: 2 },
  modalActions: { flexDirection: 'row', gap: 10, marginTop: 16 },
  cancelBtn: { flex: 1, backgroundColor: '#222226', borderRadius: 10, padding: 14, alignItems: 'center' },
  cancelBtnText: { fontSize: 14, fontWeight: '700', color: '#888' },
  saveBtn: { flex: 1, backgroundColor: '#ff6600', borderRadius: 10, padding: 14, alignItems: 'center' },
  saveBtnText: { fontSize: 14, fontWeight: '800', color: '#fff' },
  deleteBtnConfirm: { flex: 1, backgroundColor: '#c0392b', borderRadius: 10, padding: 14, alignItems: 'center' },
  deleteBtnConfirmText: { fontSize: 14, fontWeight: '800', color: '#fff' },
})
