import { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, Image,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { apiRegister } from '../../lib/api'

export default function RegisterScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [type, setType] = useState<'DRIVER' | 'MECHANIC'>('DRIVER')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Workshop fields (only for MECHANIC)
  const [workshopName, setWorkshopName] = useState('')
  const [workshopPhone, setWorkshopPhone] = useState('')
  const [cep, setCep] = useState('')
  const [street, setStreet] = useState('')
  const [addrNumber, setAddrNumber] = useState('')
  const [complement, setComplement] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [city, setCity] = useState('')
  const [workshopState, setWorkshopState] = useState('')

  async function handleCepChange(text: string) {
    const digits = text.replace(/\D/g, '')
    setCep(digits.length <= 5 ? digits : `${digits.slice(0, 5)}-${digits.slice(5, 8)}`)
    if (digits.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`)
        const data = await res.json()
        if (!data.erro) {
          setStreet(data.logradouro ?? '')
          setNeighborhood(data.bairro ?? '')
          setCity(data.localidade ?? '')
          setWorkshopState(data.uf ?? '')
        }
      } catch {}
    }
  }

  async function handleRegister() {
    if (!name || !email || !password) { setError('Preencha todos os campos.'); return }
    if (password.length < 6) { setError('A senha deve ter no mínimo 6 caracteres.'); return }
    if (type === 'MECHANIC') {
      if (!workshopName || !cep || !street || !addrNumber || !neighborhood || !city || !workshopState) {
        setError('Preencha todos os dados da oficina.'); return
      }
    }
    setLoading(true)
    setError('')
    try {
      const payload: any = {
        name,
        email,
        password,
        type: type.toLowerCase(),
        ...(type === 'MECHANIC' ? {
          workshop: {
            name: workshopName,
            ...(workshopPhone ? { phone: workshopPhone } : {}),
            cep: cep.replace(/\D/g, ''),
            street,
            number: addrNumber,
            ...(complement ? { complement } : {}),
            neighborhood,
            city,
            state: workshopState.toUpperCase(),
          },
        } : {}),
      }
      const res = await apiRegister(payload)
      if (res.success) {
        router.replace({ pathname: '/(auth)/verify', params: { email } })
      } else {
        setError(res.error ?? 'Erro ao criar conta.')
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
          <Text style={s.title}>Criar conta</Text>

          {error ? <View style={s.errorBox}><Text style={s.errorText}>{error}</Text></View> : null}

          <Text style={s.label}>Você é...</Text>
          <View style={s.typeRow}>
            <TouchableOpacity
              style={[s.typeCard, type === 'DRIVER' && s.typeCardActive]}
              onPress={() => setType('DRIVER')}
            >
              <Ionicons name="car-outline" size={32} color={type === 'DRIVER' ? '#ff6600' : '#9a9a9a'} />
              <Text style={[s.typeLabel, type === 'DRIVER' && s.typeLabelActive]}>Motorista</Text>
              <Text style={[s.typeDesc, type === 'DRIVER' && s.typeDescActive]}>Quero cuidar melhor do meu veículo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.typeCard, type === 'MECHANIC' && s.typeCardActive]}
              onPress={() => setType('MECHANIC')}
            >
              <Ionicons name="build-outline" size={32} color={type === 'MECHANIC' ? '#ff6600' : '#9a9a9a'} />
              <Text style={[s.typeLabel, type === 'MECHANIC' && s.typeLabelActive]}>Mecânico</Text>
              <Text style={[s.typeDesc, type === 'MECHANIC' && s.typeDescActive]}>Quero gerenciar minha oficina</Text>
            </TouchableOpacity>
          </View>

          <Text style={s.sectionTitle}>Dados pessoais</Text>

          <Text style={s.label}>Nome</Text>
          <TextInput
            style={s.input}
            placeholder="Seu nome"
            placeholderTextColor="#444"
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
          />

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
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor="#444"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={s.eyeBtn} onPress={() => setShowPassword(v => !v)}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#555" />
            </TouchableOpacity>
          </View>

          {type === 'MECHANIC' && (
            <>
              <View style={s.sectionDivider} />
              <Text style={s.sectionTitle}>Dados da Oficina</Text>

              <Text style={s.label}>Nome da Oficina</Text>
              <TextInput
                style={s.input}
                placeholder="Ex: Auto Mecânica do João"
                placeholderTextColor="#444"
                autoCapitalize="words"
                value={workshopName}
                onChangeText={setWorkshopName}
              />

              <Text style={s.label}>Telefone da Oficina (opcional)</Text>
              <TextInput
                style={s.input}
                placeholder="(11) 99999-9999"
                placeholderTextColor="#444"
                keyboardType="phone-pad"
                value={workshopPhone}
                onChangeText={setWorkshopPhone}
              />

              <View style={s.sectionDivider} />
              <Text style={s.sectionTitle}>Endereço</Text>

              <Text style={s.label}>CEP</Text>
              <TextInput
                style={s.input}
                placeholder="00000-000"
                placeholderTextColor="#444"
                keyboardType="numeric"
                maxLength={9}
                value={cep}
                onChangeText={handleCepChange}
              />

              <Text style={s.label}>Rua / Avenida</Text>
              <TextInput
                style={s.input}
                placeholder="Nome da rua"
                placeholderTextColor="#444"
                autoCapitalize="words"
                value={street}
                onChangeText={setStreet}
              />

              <View style={s.inlineRow}>
                <View style={{ flex: 1 }}>
                  <Text style={s.label}>Número</Text>
                  <TextInput
                    style={s.input}
                    placeholder="123"
                    placeholderTextColor="#444"
                    keyboardType="numeric"
                    value={addrNumber}
                    onChangeText={setAddrNumber}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.label}>Complemento</Text>
                  <TextInput
                    style={s.input}
                    placeholder="Sala, galpão..."
                    placeholderTextColor="#444"
                    autoCapitalize="words"
                    value={complement}
                    onChangeText={setComplement}
                  />
                </View>
              </View>

              <Text style={s.label}>Bairro</Text>
              <TextInput
                style={s.input}
                placeholder="Nome do bairro"
                placeholderTextColor="#444"
                autoCapitalize="words"
                value={neighborhood}
                onChangeText={setNeighborhood}
              />

              <View style={s.inlineRow}>
                <View style={{ flex: 2 }}>
                  <Text style={s.label}>Cidade</Text>
                  <TextInput
                    style={s.input}
                    placeholder="São Paulo"
                    placeholderTextColor="#444"
                    autoCapitalize="words"
                    value={city}
                    onChangeText={setCity}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.label}>Estado</Text>
                  <TextInput
                    style={s.input}
                    placeholder="SP"
                    placeholderTextColor="#444"
                    autoCapitalize="characters"
                    maxLength={2}
                    value={workshopState}
                    onChangeText={setWorkshopState}
                  />
                </View>
              </View>
            </>
          )}

          {/* Aviso de trial */}
          <View style={s.trialBox}>
            <Text style={s.trialTitle}>🎉 15 dias grátis com tudo liberado!</Text>
            <Text style={s.trialDesc}>
              Ao criar sua conta você terá <Text style={{ color: '#f0ede8', fontWeight: '700' }}>15 dias de avaliação gratuita</Text> com acesso completo a todas as funcionalidades Pro. Após esse período, você escolhe o plano Free (com limitações) ou assina o plano Pro para manter o acesso total.
            </Text>
          </View>

          <TouchableOpacity style={s.btn} onPress={handleRegister} disabled={loading}>
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={s.btnText}>Criar conta e verificar e-mail</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={s.linkRow} onPress={() => router.push('/(auth)/login')}>
            <Text style={s.linkText}>Já tem conta? <Text style={s.linkAccent}>Entrar</Text></Text>
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
  label: { fontSize: 11, fontWeight: '700', color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8, marginTop: 14 },
  typeRow: { flexDirection: 'row', gap: 10 },
  typeCard: { flex: 1, backgroundColor: '#141416', borderRadius: 12, borderWidth: 1, borderColor: '#2a2a2e', padding: 16, alignItems: 'center', gap: 6 },
  typeCardActive: { borderColor: '#ff6600', backgroundColor: 'rgba(255,102,0,0.08)' },
  typeLabel: { fontSize: 14, fontWeight: '700', color: '#777' },
  typeLabelActive: { color: '#ff6600' },
  typeDesc: { fontSize: 11, color: '#555', textAlign: 'center', lineHeight: 16 },
  typeDescActive: { color: '#ff6600' },
  sectionDivider: { height: 1, backgroundColor: '#1e1e20', marginTop: 24, marginBottom: 4 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#f0ede8', marginTop: 12, marginBottom: 4 },
  inlineRow: { flexDirection: 'row', gap: 10 },
  input: { backgroundColor: '#141416', borderRadius: 10, borderWidth: 1, borderColor: '#2a2a2e', padding: 14, color: '#f0ede8', fontSize: 15 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#141416', borderRadius: 10, borderWidth: 1, borderColor: '#2a2a2e' },
  inputFlex: { flex: 1, padding: 14, color: '#f0ede8', fontSize: 15 },
  eyeBtn: { paddingHorizontal: 14, paddingVertical: 14 },
  trialBox: { marginTop: 20, borderRadius: 12, padding: 14, backgroundColor: 'rgba(34,197,94,0.08)', borderWidth: 1, borderColor: 'rgba(34,197,94,0.3)' },
  trialTitle: { fontSize: 13, fontWeight: '800', color: '#22c55e', marginBottom: 6 },
  trialDesc: { fontSize: 12, color: '#888', lineHeight: 18 },
  btn: { marginTop: 16, backgroundColor: '#ff6600', borderRadius: 10, padding: 16, alignItems: 'center', justifyContent: 'center' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  linkRow: { marginTop: 20, alignItems: 'center' },
  linkText: { color: '#666', fontSize: 14 },
  linkAccent: { color: '#ff6600', fontWeight: '600' },
})
