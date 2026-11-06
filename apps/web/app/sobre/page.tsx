import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre o MotorMacete — IA Automotiva Brasileira',
  description:
    'Conheça o MotorMacete: a plataforma de inteligência automotiva que ajuda motoristas brasileiros a entender e cuidar melhor dos seus veículos.',
}

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-orange-300 transition mb-10"
        >
          ← Voltar ao início
        </Link>

        <p className="text-xs uppercase tracking-[0.35em] text-orange-300 mb-3">Sobre nós</p>
        <h1 className="text-5xl font-black leading-tight text-white mb-4 max-sm:text-4xl">
          O que é o <span className="text-orange-600">MotorMacete?</span>
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mb-12">
          Uma plataforma de inteligência automotiva criada para democratizar o conhecimento mecânico no Brasil.
        </p>

        <div className="rounded-[32px] border border-white/10 bg-[#0f0f12]/90 p-8 mb-8">
          <p className="text-xs uppercase tracking-[0.35em] text-orange-300 mb-4">Nossa Missão</p>
          <p className="text-base leading-8 text-slate-300">
            Acreditamos que todo motorista brasileiro merece ter acesso à mesma qualidade de informação que mecânicos
            experientes têm. Por isso, treinamos nossa inteligência artificial em mais de 12.000 ordens de serviço,
            fóruns especializados e relatos verificados de profissionais da área — para que você nunca mais saia de uma
            oficina sem entender o que foi feito no seu carro.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 mb-8">
          {[
            {
              title: 'IA Automotiva',
              text: 'Treinada em 12 mil ordens de serviço reais, nossa IA conhece os problemas mais comuns por marca e modelo.',
            },
            {
              title: 'Macetes de Oficina',
              text: 'Compilamos o conhecimento prático de mecânicos veteranos sobre truques, substituições e manutenções preventivas.',
            },
            {
              title: 'Garagem Digital',
              text: 'Cadastre seus veículos e mantenha um histórico completo de manutenções, custos e revisões.',
            },
            {
              title: 'Rede de Mecânicos',
              text: 'Conectamos motoristas com oficinas cadastradas e mecânicos verificados em todo o Brasil.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-[28px] border border-white/10 bg-[#28282e] p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-orange-300 mb-3">{item.title}</p>
              <p className="text-sm text-slate-300 leading-7">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[32px] border border-white/10 bg-[#0f0f12]/90 p-8 mb-8">
          <p className="text-xs uppercase tracking-[0.35em] text-orange-300 mb-6">Nossos Valores</p>
          <div className="space-y-5">
            {[
              {
                title: 'Transparência',
                text: 'Informação técnica clara, sem jargão desnecessário e sem esconder custos.',
              },
              {
                title: 'Precisão',
                text: 'Cada macete é verificado antes de chegar até você. Não publicamos o que não podemos confirmar.',
              },
              {
                title: 'Acessibilidade',
                text: 'Conhecimento automotivo de qualidade para todos os brasileiros, independente da marca ou modelo do veículo.',
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-orange-500/20 bg-orange-500/5 p-8 text-center mb-12">
          <h2 className="text-2xl font-black text-white mb-3">Pronto para descobrir os segredos do seu carro?</h2>
          <p className="text-slate-400 mb-6 text-sm">
            Crie sua conta gratuita e acesse todos os recursos do MotorMacete.
          </p>
          <Link
            href="/"
            className="inline-block rounded-full bg-orange-600 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 transition hover:bg-orange-500"
          >
            Começar grátis →
          </Link>
        </div>

        <footer className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 border-t border-white/5 pt-8">
          <Link href="/" className="hover:text-orange-300 transition">Início</Link>
          <Link href="/sobre" className="text-orange-300">Sobre</Link>
          <Link href="/contato" className="hover:text-orange-300 transition">Contato</Link>
        </footer>
      </div>
    </main>
  )
}
