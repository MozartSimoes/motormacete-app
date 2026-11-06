# MotorMacete

Plataforma automotiva brasileira, web e mobile, em produção em [motormacete.com.br](https://motormacete.com.br).

- **Motoristas** gerenciam seus veículos: garagem, manutenção, abastecimentos, calibragem, checklist de viagem e consulta de recalls.
- **Mecânicos** gerenciam a oficina: ordens de serviço, clientes e financeiro.
- O **Mecânico Virtual** usa IA generativa (API da Anthropic) para responder dúvidas sobre o veículo do usuário e gerar dicas técnicas por marca, modelo e ano.

## Stack

| Camada | Tecnologia |
|---|---|
| Web e API | Next.js 15 (App Router + API Routes), React 19, TypeScript, Tailwind CSS 4 |
| Mobile | React Native, Expo, Expo Router |
| Banco de dados | PostgreSQL (Neon, serverless) com Prisma ORM, 20 entidades |
| IA | Anthropic SDK: chat contextualizado e geração de conteúdo técnico |
| Autenticação | JWT (jose), bcrypt e verificação por código (OTP) via e-mail |
| Integrações | Resend (e-mail), Mercado Pago (assinaturas), FIPE |
| Monorepo | pnpm workspaces + Turborepo |
| CI/CD | GitHub Actions (type check + build Android via EAS), deploy contínuo na Vercel |

## Arquitetura

```
motormacete/
├── apps/
│   ├── web/        # Next.js: site, painel e API REST consumida pelo app
│   └── mobile/     # App React Native (Expo)
└── packages/
    ├── database/   # Prisma: schema, migrations e seeds
    └── types/      # Tipos TypeScript compartilhados entre web e mobile
```

- A API fica em `apps/web/app/api`, organizada por recurso (`vehicles`, `maintenance`, `workshops`, `mecanico`...), e atende o site e o app mobile.
- Os tipos compartilhados em `packages/types` garantem o mesmo contrato entre backend e app.
- A integração com IA fica isolada em `apps/web/app/api/mecanico` e `apps/web/lib/generate-tips.ts`.

## Como rodar

Pré-requisitos: Node 20+, pnpm 9+ e um banco PostgreSQL.

```bash
pnpm install
cp .env.example .env    # preencha DATABASE_URL, AUTH_SECRET, ANTHROPIC_API_KEY etc.
pnpm --filter @motormacete/database exec prisma migrate dev
pnpm dev                # web + mobile em paralelo
```

## Autor

**Mozart Mota Simões**, desenvolvedor sênior e AWS Certified (Solutions Architect e Developer, Associate).
[LinkedIn](https://www.linkedin.com/in/mozart-mota-simoes/)
