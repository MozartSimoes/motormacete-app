# MotorMacete — Contexto do Projeto para Claude Code

## O que é o MotorMacete

Plataforma automotiva brasileira com web + app mobile. Permite motoristas gerenciarem seus veículos (garagem, manutenção, combustível, checklist, recall) e mecânicos gerenciarem sua oficina (ordens de serviço, financeiro, clientes). Tem integração com IA (Anthropic SDK) via "Mecânico Virtual".

---

## Stack Técnica

| Camada | Tecnologia |
|--------|------------|
| Web | Next.js 15, React 19, TypeScript, Tailwind CSS 4 |
| Mobile | React Native + Expo 53 + Expo Router, TypeScript |
| Backend | Next.js API Routes (dentro de apps/web) |
| Banco | PostgreSQL via Neon (serverless) + Prisma 6 |
| Monorepo | pnpm workspaces + Turborepo |
| Deploy web | Vercel (auto-deploy por branch) |
| Deploy mobile | EAS Build (Expo) |
| CI/CD | GitHub Actions |
| Auth | JWT (jose) + bcryptjs + OTP por e-mail |
| E-mail | Resend |
| Pagamentos | Stripe |
| IA | Anthropic SDK (`@anthropic-ai/sdk`) |

---

## Estrutura do Repositório

```
motormacete/
├── apps/
│   ├── web/          # Next.js 15 (App Router)
│   └── mobile/       # Expo / React Native
├── packages/
│   ├── database/     # Prisma client + schema + migrations + seeds
│   └── types/        # Tipos TypeScript compartilhados
├── scripts/          # Scripts utilitários (gen-icons, query-users)
├── turbo.json
├── pnpm-workspace.yaml
└── vercel.json
```

---

## Comandos Essenciais

```bash
# Desenvolvimento (roda web + mobile em paralelo)
pnpm dev

# Só web
pnpm --filter @motormacete/web dev

# Só mobile
pnpm --filter @motormacete/mobile start

# Build completo
pnpm build

# TypeScript check
pnpm typecheck

# Banco de dados
pnpm --filter @motormacete/database db:generate   # gera Prisma client
pnpm --filter @motormacete/database db:push       # aplica schema sem migration
pnpm --filter @motormacete/database db:migrate:dev # cria migration
pnpm --filter @motormacete/database db:studio     # Prisma Studio UI
pnpm --filter @motormacete/database db:seed       # seed principal
```

---

## Apps/Web — Next.js 15 App Router

### Rotas principais

| Rota | Acesso | Descrição |
|------|--------|-----------|
| `/` | Público | Landing page |
| `/home` | Logado | Dashboard do motorista |
| `/home/macetes` | Logado | Dicas por veículo |
| `/home/garagem` | Logado | Garagem do usuário |
| `/home/checklist` | Logado | Checklist de manutenção |
| `/home/mecanico` | Logado | Mecânico Virtual (IA) |
| `/home/recall` | Logado | Consulta de recalls |
| `/home/comparar` | Logado | Comparador de veículos |
| `/home/custos` | Logado | Calculadora de custos |
| `/home/oficinas` | Logado | Diretório de oficinas |
| `/home/obd` | Logado | Códigos OBD |
| `/home/planos` | Logado | Planos PRO |
| `/home/noticias` | Logado | Notícias automotivas |
| `/artigos` | Público | Artigos de manutenção (SEO) |
| `/artigos/[slug]` | Público | Artigo individual |
| `/macetes/[brand]` | Público | Macetes por marca (SEO) |
| `/mecanico` | Mecânico | Dashboard da oficina |
| `/mecanico/os` | Mecânico | Ordens de serviço |
| `/mecanico/financeiro` | Mecânico | Relatório financeiro |
| `/viagem/[token]` | Público | Checklist de viagem compartilhado |

### Arquivos lib importantes

- `apps/web/lib/artigos.ts` — dados estáticos dos artigos (conteúdo, metadata, SEO)
- `apps/web/lib/data.ts` — catálogo de veículos (marcas, modelos, anos) — arquivo grande ~300KB
- `apps/web/lib/session.ts` — leitura do cookie de sessão JWT
- `apps/web/lib/isPro.ts` — verifica se usuário tem plano PRO
- `apps/web/lib/db.ts` — instância singleton do Prisma
- `apps/web/middleware.ts` — proteção de rotas autenticadas

### Componentes de layout

- `apps/web/components/layout/Header.tsx` — `'use client'`, header sticky com nav completa + modal de auth (login/cadastro)
- `apps/web/components/layout/Footer.tsx` — Server Component, footer com links

**Padrão obrigatório para novas páginas:** importar `<Header />` e `<Footer />` de `@/components/layout/`.

### Autenticação (web)

- Login/cadastro via modal no `Header.tsx` (não há página separada de login)
- Cookie: `mm_session` (JWT, httpOnly)
- API: `GET /api/auth/me` retorna `{ user }` ou `{}`
- Tipos de usuário: `DRIVER` e `MECHANIC`
- Planos: `FREE`, `DRIVER_PRO`, `MECHANIC_PRO`

---

## Apps/Mobile — Expo 53 + Expo Router

### Configuração base

- **Package ID:** `com.motormacete.app` (iOS Bundle ID e Android package)
- **Versão:** 1.0.0 — orientação portrait, tema dark, background `#0e0e0f`
- **Owner EAS:** mozartsimoes — Project ID: `ed86c1f9-04ed-4dfd-bb43-e376192b4fc5`
- **New Architecture:** desabilitada (Android)
- **Env:** `EXPO_PUBLIC_API_URL=https://motormacete.com.br` (arquivo `apps/mobile/.env`)

### Estrutura completa de telas

```
apps/mobile/app/
├── _layout.tsx              # Root: AuthProvider, GestureHandler, RootRedirect, SplashScreen
├── (auth)/                  # Área não autenticada (Stack, sem header)
│   ├── index.tsx            # Landing (logo + botões entrar/cadastrar)
│   ├── login.tsx            # E-mail + senha
│   ├── register.tsx         # Cadastro motorista ou mecânico
│   ├── verify.tsx           # Verificação OTP por e-mail
│   └── forgot-password.tsx  # Recuperação de senha
└── (app)/                   # Área autenticada (Drawer 280px)
    ├── index.tsx            # Dashboard/busca de veículos (home)
    ├── search.tsx           # Busca de macetes por veículo
    ├── garage.tsx           # Minha garagem
    ├── mechanic.tsx         # Mecânico Virtual (IA)
    ├── compare.tsx          # Comparador de veículos
    ├── costs.tsx            # Rastreamento de gastos
    ├── workshops.tsx        # Encontrar oficinas próximas
    ├── plans.tsx            # Assinar plano PRO
    ├── profile.tsx          # Perfil, trial, deletar conta
    ├── contact.tsx          # Contato via WhatsApp
    ├── obd.tsx              # Base de códigos OBD (166 códigos)
    ├── orders.tsx           # Ordens de serviço (só MECHANIC)
    ├── finance.tsx          # Dashboard financeiro (só MECHANIC)
    ├── recall.tsx           # Consulta de recalls
    └── checklist.tsx        # Checklist de viagem
```

### Navegação

- **Root:** `Stack` com dois grupos — `(auth)` e `(app)`
- **RootRedirect:** componente que observa estado de auth e redireciona automaticamente
  - Sem usuário em `(app)` → vai para `(auth)`
  - Com usuário em `(auth)` → vai para `(app)`
- **App:** `Drawer Navigator` com largura 280px, overlay 60% opaco
- **Itens no Drawer:** Início, Checklist Viagem, Assinar Pro, Perfil, Falar conosco
- **Header:** Botão voltar em todas as telas exceto home; logotipo + badges no drawer

### Autenticação (mobile)

- **Token:** JWT armazenado no `expo-secure-store` (chave `mm_token`), **não** AsyncStorage
- **Lib:** `apps/mobile/lib/auth.tsx` — Context + Provider com:
  - `user`, `token`, `isLoading`
  - `signIn(token, user)` — salva token e busca plano atual no servidor
  - `signOut()` — remove token, limpa estado
  - `updateUser(patch)` — atualiza estado local sem refetch
- **Init:** na abertura do app, lê token do SecureStore → valida via `GET /api/auth/me`
- **Plano:** sempre buscado do servidor no login/init para garantir dados atualizados

### API Client (`apps/mobile/lib/api.ts`)

- **Base URL:** `EXPO_PUBLIC_API_URL` ou `http://localhost:3000`
- **Auth:** Bearer token automático em todas as requisições

| Função | Endpoint | Descrição |
|--------|----------|-----------|
| `apiFetch(path, opts)` | qualquer | Fetch genérico com auth header |
| `apiLogin(payload)` | POST `/api/auth/login` | Login e-mail/senha |
| `apiRegister(payload)` | POST `/api/auth/register` | Cadastro |
| `apiVerifyOtp(payload)` | POST `/api/auth/verify-otp` | Verificação OTP |
| `apiLogout()` | POST `/api/auth/logout` | Logout + remove token |
| `getToken()` | — | Lê token do SecureStore |
| `saveToken(token)` | — | Salva token no SecureStore |
| `removeToken()` | — | Remove token do SecureStore |

### Endpoints de veículos (mobile)

| Endpoint | Params | Retorno |
|----------|--------|---------|
| `GET /api/vehicles` | `type` | Marcas |
| `GET /api/vehicles` | `type, brandCode` | Modelos |
| `GET /api/vehicles` | `type, brandCode, modelCode` | Anos |
| `GET /api/fipe/price` | `type, brandCode, modelCode, yearCode` | Preço FIPE |
| `GET /api/tips` | `modelName, category, vehicleType, yearCode` | Dicas/macetes |

### Componentes (`apps/mobile/components/`)

| Componente | Descrição |
|-----------|-----------|
| `SplashScreen.tsx` | Animação de entrada (~3.2s): "Motor" + "Macete" slides + glow laranja |
| `WhatsAppFloat.tsx` | FAB verde (52×52); modal com rating + mensagem para WhatsApp 5521979281511 |
| `PickerModal.tsx` | Dropdown reutilizável com busca (marca/modelo/ano) |
| `CalibrationModal.tsx` | Modal de calibragem de pneus |

### Build e Deploy (EAS)

```bash
# Build preview (APK para testes)
eas build --platform android --profile preview

# Build produção (AAB para Play Store)
eas build --platform android --profile production

# Submit para Play Store
eas submit --platform android

# Verificar builds
eas build:list
```

**Perfis em `eas.json`:**
- `preview`: APK, API URL = `https://motormacete.com.br`
- `production`: AAB (App Bundle), API URL = `https://motormacete.com.br`

### Como rodar localmente

```bash
# Iniciar Expo (QR code para Expo Go)
pnpm --filter @motormacete/mobile start

# Android (emulador ou dispositivo USB)
pnpm --filter @motormacete/mobile android

# iOS (só macOS)
pnpm --filter @motormacete/mobile ios
```

> Metro configurado para monorepo — resolve symlinks do pnpm workspace automaticamente.

### Design System (mobile)

| Token | Valor |
|-------|-------|
| Background | `#0e0e0f` |
| Cards | `#141416`, `#1a1a1c` |
| Bordas | `#2a2a2e` |
| Texto principal | `#f0ede8` |
| Texto secundário | `#666`, `#777` |
| Accent (laranja) | `#ff6600` |
| Sucesso | `#22c55e` |
| Erro | `#e03030` |

- **Border radius:** 8–16px | **Espaçamento:** gaps 10px, padding 16–20px
- **Safe areas:** `useSafeAreaInsets` (iOS) | **Teclado:** `KeyboardAvoidingView` em formulários
- **Animações:** `react-native-reanimated` (spring physics no splash)

### Roles e funcionalidades por tipo de usuário

| Feature | DRIVER | MECHANIC |
|---------|--------|----------|
| Busca de macetes | ✅ | ✅ |
| Garagem | ✅ | — |
| Mecânico Virtual IA | ✅ | ✅ |
| OBD codes | ✅ | ✅ |
| Comparador | ✅ | — |
| Gastos | ✅ | — |
| Recalls | ✅ | — |
| Oficinas | ✅ | — |
| Ordens de serviço | — | ✅ |
| Dashboard financeiro | — | ✅ |

---

## Banco de Dados — Prisma + Neon PostgreSQL

### Modelos principais

- **Catálogo:** `Brand`, `VehicleModel`, `VehicleType`, `Tip`, `TirePressure`, `MaintenanceItem`, `RecallCampaign`
- **Usuários:** `User` (DRIVER/MECHANIC), `UserVehicle`, `OtpCode`
- **Manutenção:** `MaintenanceLog`, `FuelLog`
- **Oficina/Mecânico:** `Workshop`, `ServiceOrder`, `ServiceOrderItem`
- **Viagem:** `TripChecklist`, `TripChecklistItem`
- **Analytics:** `PageView`

Schema em: `packages/database/prisma/schema.prisma`

---

## Deploy e Branches

| Branch | Ambiente | URL |
|--------|----------|-----|
| `main` | Produção | `motormacete.com.br` |
| `staging` | Staging | `staging.motormacete.com.br` |

- **Vercel** faz deploy automático em push para qualquer branch
- `main` tem proteção — não aceita push direto, requer PR
- **Fluxo:** desenvolver em `staging` → PR para `main` → merge → deploy automático
- O `vercel.json` roda `db:migrate:deploy` antes do build em produção

---

## Variáveis de Ambiente (apps/web/.env.local)

```
DATABASE_URL              # Neon PostgreSQL connection string
JWT_SECRET                # Segredo para assinar tokens JWT
ANTHROPIC_API_KEY         # Claude AI (Mecânico Virtual)
RESEND_API_KEY            # E-mails transacionais
STRIPE_SECRET_KEY         # Pagamentos
STRIPE_WEBHOOK_SECRET     # Webhook do Stripe
NEXT_PUBLIC_APP_URL       # URL base da aplicação
```

---

## Convenções de Código

- **Server Components por padrão** no Next.js. Adicionar `'use client'` só quando necessário (eventos, hooks, estado).
- **Tailwind CSS 4** — usar classes utilitárias, evitar CSS custom quando Tailwind resolve.
- **Tema dark:** background `#050505` ou `#000`, texto branco, accent `#ff6600` (laranja MotorMacete).
- **Sem comentários desnecessários** — código auto-explicativo; comentários só para WHY não óbvio.
- **Importações absolutas** com alias `@/` (configurado no tsconfig de apps/web).
- **Tipos compartilhados** vão em `packages/types`.
- **Prisma client** importado de `@motormacete/database`, nunca instanciar diretamente.

---

## Analytics

`GET https://www.motormacete.com/api/visit` retorna `{ total, uniqueSessions, today, last7days }`.

---

## Artigos (SEO)

Artigos estáticos em `apps/web/lib/artigos.ts`. Para adicionar novo artigo: editar esse arquivo seguindo a interface `Article` já existente. As páginas `/artigos` e `/artigos/[slug]` são geradas estaticamente (`generateStaticParams`).
