import { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, Image,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuth } from '../../lib/auth'
import { apiLogin } from '../../lib/api'

export default function LoginScreen() {
  const router = useRouter()
  const { signIn } = useAuth()
  const insets = useSafeAreaInsets()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [keepSignedIn, setKeepSignedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin() {
    if (!email || !password) { setError('Preencha e-mail e senha.'); return }
    setLoading(true)
    setError('')
    try {
      const res = await apiLogin({ email, password, keepSignedIn })
      if (res.success && res.token && res.user) {
        await signIn(res.token, { plan: 'FREE', isAdmin: false, isTrialing: false, trialDaysLeft: 0, trialEndsAt: null, ...res.user })
        router.replace('/(app)')
      } else {
        setError(res.error ?? 'Erro ao entrar.')
      }
    } catch {
      setError('Erro de conexão. Verifique sua internet.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={s.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={[s.scroll, { paddingTop: insets.top + 20 }]} keyboardShouldPersistTaps="handled">
          <TouchableOpacity style={s.back} onPress={() => router.back()}>
            <Text style={s.backText}>← Voltar</Text>
          </TouchableOpacity>

          <View style={s.logoRow}>
            <View style={s.iconWrap}>
              <Image source={require('../../assets/icon.png')} style={s.iconImg} />
            </View>
            <Text style={s.logo}>Motor<Text style={s.accent}>Macete</Text></Text>
          </View>
          <Text style={s.title}>Entrar na conta</Text>

          {error ? <View style={s.errorBox}><Text style={s.errorText}>{error}</Text></View> : null}

          <Text style={s.label}>E-mail</Text>
          <TextInput
            style={s.input}
            placeholder="seu@email.com"
            placeholderTextColor="#444"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={s.label}>Senha</Text>
          <View style={s.inputRow}>
            <TextInput
              style={s.inputFlex}
              placeholder="Sua senha"
              placeholderTextColor="#444"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={handleLogin}
            />
            <TouchableOpacity style={s.eyeBtn} onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#555" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={s.checkRow} onPress={() => setKeepSignedIn(!keepSignedIn)}>
            <View style={[s.checkbox, keepSignedIn && s.checkboxOn]}>
              {keepSignedIn && <Text style={s.checkmark}>✓</Text>}
            </View>
            <Text style={s.checkLabel}>Manter conectado por 30 dias</Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.forgotRow} onPress={() => router.push('/(auth)/forgot-password')}>
            <Text style={s.forgotText}>Esqueci a senha</Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.btn} onPress={handleLogin} disabled={loading}>
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={s.btnText}>Entrar</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={s.linkRow} onPress={() => router.push('/(auth)/register')}>
            <Text style={s.linkText}>Não tem conta? <Text style={s.linkAccent}>Criar conta</Text></Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0e0e0f' },
  scroll: { padding: 24, paddingBottom: 48 },
  back: { marginBottom: 32 },
  backText: { color: '#666', fontSize: 14 },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 4 },
  iconWrap: { width: 44, height: 44, borderRadius: 11, overflow: 'hidden' },
  iconImg: { width: 44, height: 44 },
  logo: { fontSize: 28, fontWeight: '900', color: '#f0ede8' },
  accent: { color: '#ff6600' },
  title: { fontSize: 22, fontWeight: '700', color: '#f0ede8', marginBottom: 28 },
  errorBox: { backgroundColor: 'rgba(224,48,48,0.12)', borderRadius: 8, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: '#e03030' },
  errorText: { color: '#e03030', fontSize: 13 },
  label: { fontSize: 11, fontWeight: '700', color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: '#141416', borderRadius: 10, borderWidth: 1, borderColor: '#2a2a2e', padding: 14, color: '#f0ede8', fontSize: 15 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#141416', borderRadius: 10, borderWidth: 1, borderColor: '#2a2a2e' },
  inputFlex: { flex: 1, padding: 14, color: '#f0ede8', fontSize: 15 },
  eyeBtn: { paddingHorizontal: 14, paddingVertical: 14 },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16, gap: 10 },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1, borderColor: '#2a2a2e', backgroundColor: '#141416', alignItems: 'center', justifyContent: 'center' },
  checkboxOn: { backgroundColor: '#ff6600', borderColor: '#ff6600' },
  checkmark: { color: '#fff', fontSize: 12, fontWeight: '700' },
  checkLabel: { color: '#777', fontSize: 13 },
  forgotRow: { marginTop: 12, alignSelf: 'flex-start' },
  forgotText: { color: '#ff6600', fontSize: 13, fontWeight: '600' },
  btn: { marginTop: 28, backgroundColor: '#ff6600', borderRadius: 10, padding: 16, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  linkRow: { marginTop: 20, alignItems: 'center' },
  linkText: { color: '#666', fontSize: 14 },
  linkAccent: { color: '#ff6600', fontWeight: '600' },
})
