Crie uma nova tela no app mobile (Expo Router) seguindo as convenções do MotorMacete.

## Entrada esperada

O usuário vai informar (peça caso não tenha fornecido):
- **Nome da tela** (ex: `historico`, `notificacoes`)
- **Área**: autenticada `(app)` | não autenticada `(auth)`
- **Tem formulário?** (sim/não — para KeyboardAvoidingView)
- **Precisa de autenticação?** (sim/não — quase sempre sim para `(app)`)
- **Descrição** do que a tela faz

## Passo 1 — Criar o arquivo

Caminho: `apps/mobile/app/<area>/<nome>.tsx`

**Template base (tela autenticada com ScrollView):**

```tsx
import { useState } from 'react'
import {
  View, Text, ScrollView, StyleSheet,
  ActivityIndicator, TouchableOpacity,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { apiFetch } from '../../lib/api'
import { useAuth } from '../../lib/auth'

export default function <Nome>Screen() {
  const insets = useSafeAreaInsets()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}><Título da Tela></Text>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* conteúdo */}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0e0e0f' },
  header:    { paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#2a2a2e' },
  title:     { fontSize: 22, fontWeight: '800', color: '#f0ede8' },
  scroll:    { flex: 1 },
  content:   { padding: 20, gap: 12 },
})
```

**Se tiver formulário**, adicionar KeyboardAvoidingView:

```tsx
import { KeyboardAvoidingView, Platform } from 'react-native'

// Envolver o ScrollView:
<KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>
  <ScrollView ...>
    {/* formulário */}
  </ScrollView>
</KeyboardAvoidingView>
```

## Design tokens obrigatórios

| Token | Valor |
|---|---|
| Background | `#0e0e0f` |
| Cards | `#141416` / `#1a1a1c` |
| Bordas | `#2a2a2e` |
| Texto principal | `#f0ede8` |
| Texto secundário | `#666` / `#777` |
| Accent laranja | `#ff6600` |
| Sucesso | `#22c55e` |
| Erro | `#e03030` |
| Border radius | 8–16px |
| Padding horizontal | 20px |
| Gap entre cards | 10–12px |

## Passo 2 — Registrar no Drawer (se necessário)

Se a tela deve aparecer no menu lateral, abrir `apps/mobile/app/(app)/_layout.tsx` e adicionar um `<Drawer.Screen>` seguindo o padrão existente.

## Passo 3 — Verificar

```bash
pnpm typecheck
pnpm --filter @motormacete/mobile start
```

Testar no Expo Go ou emulador: navegação, safe areas no iOS, teclado em formulários.
