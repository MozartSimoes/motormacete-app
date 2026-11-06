import type { Metadata } from 'next'
import Link from 'next/link'
import { VehicleSearch } from '@/components/home/VehicleSearch'
import { getPublicVehicleCatalog } from '@/lib/vehicleCatalog'

// Sem isso, a leitura via Prisma não é detectada como dinâmica e a lista de
// marcas/modelos fica congelada no snapshot do build.
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Macetes Automotivos — Dicas Técnicas por Marca e Modelo | MotorMacete',
  description:
    'Pesquise macetes de mecânicos, problemas crônicos, tabela de manutenção e calibragem de pneus para o seu carro ou moto. Grátis, sem cadastro, por marca, modelo e ano.',
  keywords: [
    'macetes automotivos', 'dicas mecânica', 'problemas crônicos carro', 'manutenção preventiva',
    'calibragem pneus', 'honda civic macetes', 'gol volkswagen problemas', 'ford ka manutenção',
    'hyundai hb20 dicas', 'chevrolet onix revisão', 'toyota corolla macetes',
  ],
  openGraph: {
    title: 'Macetes Automotivos por Marca e Modelo — MotorMacete',
    description:
      'Encontre os macetes que só mecânicos experientes conhecem. Pesquise por marca, modelo e ano — grátis e sem cadastro.',
    url: 'https://motormacete.com.br/macetes',
    siteName: 'MotorMacete',
    locale: 'pt_BR',
    type: 'website',
  },
}

const MARCAS_POPULARES = [
  { nome: 'Volkswagen', modelos: 'Gol, Polo, T-Cross, Virtus, Fox' },
  { nome: 'Fiat',       modelos: 'Uno, Palio, Argo, Pulse, Cronos' },
  { nome: 'Chevrolet',  modelos: 'Onix, Tracker, Prisma, Celta, Classic' },
  { nome: 'Ford',       modelos: 'Ka, EcoSport, Ranger, Focus, Fiesta' },
  { nome: 'Honda',      modelos: 'Civic, Fit, HR-V, City, CR-V' },
  { nome: 'Hyundai',    modelos: 'HB20, Creta, Tucson, i30, Santa Fe' },
  { nome: 'Toyota',     modelos: 'Corolla, Hilux, Yaris, SW4, RAV4' },
  { nome: 'Renault',    modelos: 'Sandero, Logan, Kwid, Duster, Captur' },
]

const TIPOS_INFORMACAO = [
  {
    icon: '🔧',
    titulo: 'Macetes de Oficina',
    descricao:
      'Truques práticos que mecânicos veteranos usam no dia a dia: ordem correta de montagem, peças alternativas que encaixam, ferramentas que facilitam o serviço e atalhos que economizam tempo e dinheiro.',
  },
  {
    icon: '⚠️',
    titulo: 'Problemas Crônicos',
    descricao:
      'Defeitos conhecidos e recorrentes por marca e modelo: falhas no motor, problemas elétricos, desgaste prematuro de peças, recalls documentados e pontos fracos que todo dono precisa conhecer antes que virem dor de cabeça.',
  },
  {
    icon: '⚙️',
    titulo: 'Tabela de Manutenção',
    descricao:
      'Intervalos reais de troca de óleo, correia dentada, filtros, pastilhas, velas e fluidos — baseados na experiência de oficinas, não apenas no que o manual diz. Saiba o que realmente precisa ser feito e quando.',
  },
  {
    icon: '🛞',
    titulo: 'Calibragem de Pneus',
    descricao:
      'Pressão correta para o seu modelo específico: eixo dianteiro, traseiro, pneu sobressalente e configuração com carga. Calibragem errada aumenta consumo, desgasta pneus de forma irregular e compromete a segurança.',
  },
]

const COMO_FUNCIONA = [
  { passo: '1', titulo: 'Selecione o tipo', desc: 'Escolha entre carro ou moto.' },
  { passo: '2', titulo: 'Escolha a marca', desc: 'Volkswagen, Fiat, Honda, Chevrolet e muitas outras.' },
  { passo: '3', titulo: 'Informe o modelo e ano', desc: 'Quanto mais específico, mais preciso o resultado.' },
  { passo: '4', titulo: 'Veja os macetes', desc: 'Resultados imediatos sem precisar de cadastro.' },
]

export default async function MacetesPublicPage() {
  const catalog = await getPublicVehicleCatalog()

  const byBrand = new Map<string, { marcaName: string; items: { href: string; label: string }[] }>()
  for (const v of catalog) {
    const anoCanonico = v.anos[Math.floor(v.anos.length / 2)]
    const entry = byBrand.get(v.marcaSlug) ?? { marcaName: v.marcaName, items: [] }
    entry.items.push({
      href: `/macetes/${v.marcaSlug}/${v.modeloSlug}/${anoCanonico}`,
      label: `${v.marcaName} ${v.modeloName}`,
    })
    byBrand.set(v.marcaSlug, entry)
  }
  const brandGroups = Array.from(byBrand.values()).sort((a, b) => a.marcaName.localeCompare(b.marcaName))

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* ── Header ── */}
      <header className="border-b border-white/5 bg-[#050505]/95">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl overflow-hidden shrink-0">
              <img src="/logo.svg" alt="" width={36} height={36} />
            </div>
            <div>
              <span className="text-sm font-bold text-white">Motor<span className="text-orange-400">Macete</span></span>
            </div>
          </Link>
          <nav className="flex items-center gap-5">
            <Link href="/macetes" className="text-sm font-semibold text-orange-300 transition hidden sm:block">
              Macetes
            </Link>
            <Link href="/artigos" className="text-sm font-semibold text-slate-400 hover:text-orange-300 transition hidden sm:block">
              Artigos
            </Link>
            <Link
              href="/"
              className="rounded-full border border-orange-600 px-5 py-2 text-sm font-semibold text-orange-300 transition hover:bg-orange-600/20"
            >
              Criar conta grátis →
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-12">

        {/* ── Hero ── */}
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-orange-300 mb-3">
            Pesquisa gratuita · Sem cadastro
          </p>
          <h1 className="text-5xl font-black leading-tight text-white mb-4 max-sm:text-4xl">
            Macetes e Dicas<br />
            <span className="text-orange-600">para o seu veículo</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Selecione marca, modelo e ano para encontrar macetes de mecânicos experientes,
            problemas crônicos documentados, tabela de manutenção e calibragem de pneus.
            Gratuito e sem necessidade de cadastro.
          </p>
        </div>

        {/* ── VehicleSearch (interativo) ── */}
        <div className="mb-16">
          <VehicleSearch />
        </div>

        {/* ── O que você vai encontrar ── */}
        <section className="mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-orange-300 mb-2">Informações disponíveis</p>
          <h2 className="text-3xl font-black text-white mb-8">O que você vai encontrar</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {TIPOS_INFORMACAO.map((item) => (
              <div
                key={item.titulo}
                className="rounded-[28px] border border-white/10 bg-[#28282e] p-6"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-300 mb-2">
                  {item.titulo}
                </p>
                <p className="text-sm text-slate-300 leading-7">{item.descricao}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Como funciona ── */}
        <section className="mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-orange-300 mb-2">Simples e rápido</p>
          <h2 className="text-3xl font-black text-white mb-8">Como funciona</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COMO_FUNCIONA.map((item) => (
              <div
                key={item.passo}
                className="rounded-[24px] border border-white/10 bg-[#0f0f12] p-6"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white mb-4"
                  style={{ background: 'rgba(255,102,0,0.2)', border: '1px solid rgba(255,102,0,0.4)' }}
                >
                  {item.passo}
                </div>
                <p className="text-sm font-bold text-white mb-1">{item.titulo}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Marcas populares ── */}
        <section className="mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-orange-300 mb-2">Cobertura ampla</p>
          <h2 className="text-3xl font-black text-white mb-3">Marcas populares no Brasil</h2>
          <p className="text-slate-400 text-sm mb-8">
            Nossa base cobre as principais marcas e modelos do mercado nacional, com dados de manutenção e macetes verificados por profissionais.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MARCAS_POPULARES.map((marca) => (
              <div
                key={marca.nome}
                className="rounded-[24px] border border-white/10 bg-[#28282e] p-5"
              >
                <p className="text-sm font-bold text-white mb-1">{marca.nome}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{marca.modelos}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Links diretos por modelo (SEO — todos os modelos com conteúdo no banco) ── */}
        {brandGroups.length > 0 && (
          <section className="mb-16">
            <p className="text-xs uppercase tracking-[0.35em] text-orange-300 mb-2">Acesso rápido</p>
            <h2 className="text-3xl font-black text-white mb-3">Guias por marca e modelo</h2>
            <p className="text-slate-400 text-sm mb-8">
              Acesse diretamente o guia técnico completo do seu veículo — macetes, problemas crônicos, manutenção e calibragem de pneus.
              {' '}{catalog.length} modelos catalogados em {brandGroups.length} marcas.
            </p>
            <div className="space-y-8">
              {brandGroups.map((group) => (
                <div key={group.marcaName}>
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-orange-300 mb-3">
                    {group.marcaName} <span className="text-slate-600 font-normal normal-case tracking-normal">({group.items.length})</span>
                  </h3>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {group.items.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0f0f12] px-4 py-2.5 text-sm font-medium text-slate-300 hover:border-orange-600/40 hover:text-orange-300 transition-colors group"
                      >
                        <span>{label}</span>
                        <span className="text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity text-xs">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Artigos editoriais ── */}
        <section className="mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-orange-300 mb-2">Aprenda mais</p>
          <h2 className="text-3xl font-black text-white mb-3">Guias e artigos de manutenção</h2>
          <p className="text-slate-400 text-sm mb-8">
            Artigos técnicos completos sobre os principais itens de manutenção, escritos por mecânicos profissionais.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-6">
            {[
              { href: '/artigos/correia-dentada-quando-trocar', label: 'Correia dentada: quando trocar' },
              { href: '/artigos/oleo-motor-qual-trocar',        label: 'Óleo do motor: viscosidade e intervalos' },
              { href: '/artigos/pastilhas-freio-quando-trocar', label: 'Pastilhas de freio: sinais de desgaste' },
              { href: '/artigos/calibragem-pneus-como-fazer',   label: 'Calibragem de pneus: como fazer certo' },
              { href: '/artigos/bateria-carro-vida-util',        label: 'Bateria do carro: vida útil e testes' },
              { href: '/artigos/revisao-preventiva-checklist',  label: 'Revisão preventiva: checklist completo' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between rounded-[20px] border border-white/10 bg-[#0f0f12] px-5 py-3.5 text-sm font-medium text-slate-300 hover:border-orange-600/40 hover:text-orange-300 transition-colors group"
              >
                <span>{label}</span>
                <span className="text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity text-xs">→</span>
              </Link>
            ))}
          </div>
          <Link
            href="/artigos"
            className="inline-flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 transition"
          >
            Ver todos os 15 artigos →
          </Link>
        </section>

        {/* ── Por que usar ── */}
        <section className="mb-16 rounded-[32px] border border-white/10 bg-[#0f0f12]/90 p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-orange-300 mb-2">Sobre o MotorMacete</p>
          <h2 className="text-2xl font-black text-white mb-6">Informação técnica para o motorista brasileiro</h2>
          <div className="space-y-5">
            {[
              {
                titulo: 'Baseado em experiência real de oficina',
                texto:
                  'Os macetes e dicas disponíveis no MotorMacete são compilados a partir de experiência prática de mecânicos profissionais, fóruns especializados e ordens de serviço reais — não apenas do manual do proprietário.',
              },
              {
                titulo: 'Problemas crônicos documentados por modelo',
                texto:
                  'Cada modelo de carro tem seus pontos fracos conhecidos. Nossa base reúne os problemas crônicos mais documentados por proprietários e especialistas, com classificação por gravidade para você saber o que realmente precisa de atenção.',
              },
              {
                titulo: 'Manutenção preventiva com intervalos reais',
                texto:
                  'A tabela de manutenção mostra intervalos de troca baseados no que realmente acontece no dia a dia, levando em conta as condições de uso típicas no Brasil — trânsito, combustível e clima.',
              },
              {
                titulo: 'Calibragem correta por modelo e configuração',
                texto:
                  'A pressão correta dos pneus varia por modelo, versão e até pela condição de uso (vazio ou com carga). Calibragem errada afeta consumo, segurança e durabilidade dos pneus.',
              },
            ].map((item) => (
              <div key={item.titulo} className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white">{item.titulo}</p>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">{item.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA registro ── */}
        <section className="mb-12 rounded-[32px] border border-orange-500/20 bg-orange-500/5 p-8 text-center">
          <h2 className="text-2xl font-black text-white mb-3">Quer mais recursos? Crie sua conta grátis.</h2>
          <p className="text-slate-400 mb-6 text-sm max-w-xl mx-auto">
            Com uma conta gratuita você acessa a Garagem Digital para registrar seus veículos,
            o Mecânico Virtual com IA para tirar dúvidas, o Comparador de Veículos e o
            histórico completo de manutenções.
          </p>
          <Link
            href="/"
            className="inline-block rounded-full bg-orange-600 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 transition hover:bg-orange-500"
          >
            Criar conta gratuita →
          </Link>
        </section>

        {/* ── Footer ── */}
        <footer className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 border-t border-white/5 pt-8">
          <Link href="/" className="hover:text-orange-300 transition">Início</Link>
          <Link href="/macetes" className="text-orange-300">Pesquisar macetes</Link>
          <Link href="/sobre" className="hover:text-orange-300 transition">Sobre</Link>
          <Link href="/contato" className="hover:text-orange-300 transition">Contato</Link>
          <Link href="/privacidade" className="hover:text-orange-300 transition">Privacidade</Link>
        </footer>
      </div>
    </main>
  )
}
