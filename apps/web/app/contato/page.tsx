import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fale Conosco — MotorMacete',
  description:
    'Entre em contato com a equipe do MotorMacete. Tire dúvidas, envie sugestões ou reporte problemas técnicos.',
}

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-orange-300 transition mb-10"
        >
          ← Voltar ao início
        </Link>

        <p className="text-xs uppercase tracking-[0.35em] text-orange-300 mb-3">Fale Conosco</p>
        <h1 className="text-5xl font-black leading-tight text-white mb-4 max-sm:text-4xl">
          Entre em <span className="text-orange-600">contato</span>
        </h1>
        <p className="text-base text-slate-300 leading-relaxed mb-12">
          Tem dúvidas, sugestões ou encontrou algum problema? Nossa equipe está pronta para ajudar.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 mb-8">
          <div className="rounded-[28px] border border-white/10 bg-[#28282e] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-orange-300 mb-3">E-mail Geral</p>
            <a
              href="mailto:contato@motormacete.com.br"
              className="text-white hover:text-orange-300 transition text-sm font-semibold"
            >
              contato@motormacete.com.br
            </a>
            <p className="mt-2 text-xs text-slate-500">Respondemos em até 48 horas úteis.</p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-[#28282e] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-orange-300 mb-3">Suporte Técnico</p>
            <a
              href="mailto:suporte@motormacete.com.br"
              className="text-white hover:text-orange-300 transition text-sm font-semibold"
            >
              suporte@motormacete.com.br
            </a>
            <p className="mt-2 text-xs text-slate-500">Para problemas técnicos e dúvidas sobre sua conta.</p>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-[#0f0f12]/90 p-8 mb-8">
          <p className="text-xs uppercase tracking-[0.35em] text-orange-300 mb-6">Perguntas Frequentes</p>
          <div className="space-y-6">
            {[
              {
                q: 'O MotorMacete é gratuito?',
                a: 'Sim! O acesso básico ao MotorMacete é totalmente gratuito. Crie sua conta e comece a usar agora.',
              },
              {
                q: 'Posso cadastrar mais de um veículo?',
                a: 'Sim. Você pode cadastrar todos os veículos que quiser na sua garagem digital.',
              },
              {
                q: 'Como a IA foi treinada?',
                a: 'Nossa IA foi treinada em mais de 12.000 ordens de serviço reais, fóruns especializados e relatos verificados de mecânicos profissionais.',
              },
              {
                q: 'Sou mecânico. Como me cadastrar?',
                a: 'Na tela inicial, clique em "Criar conta como Mecânico". Você poderá cadastrar sua oficina e gerenciar ordens de serviço.',
              },
              {
                q: 'Meus dados estão seguros?',
                a: 'Sim. Utilizamos criptografia para proteger seus dados e nunca compartilhamos informações pessoais com terceiros.',
              },
            ].map((item) => (
              <div key={item.q} className="border-b border-white/5 pb-5 last:border-0 last:pb-0">
                <p className="text-sm font-semibold text-white mb-2">{item.q}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-orange-500/20 bg-orange-500/5 p-8 text-center mb-12">
          <h2 className="text-xl font-black text-white mb-2">Ainda tem dúvidas?</h2>
          <p className="text-slate-400 mb-5 text-sm">
            Envie um e-mail para{' '}
            <a href="mailto:contato@motormacete.com.br" className="text-orange-400 hover:underline">
              contato@motormacete.com.br
            </a>{' '}
            e responderemos em breve.
          </p>
          <Link
            href="/"
            className="inline-block rounded-full bg-orange-600 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 transition hover:bg-orange-500"
          >
            Voltar ao início →
          </Link>
        </div>

        <footer className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 border-t border-white/5 pt-8">
          <Link href="/" className="hover:text-orange-300 transition">Início</Link>
          <Link href="/sobre" className="hover:text-orange-300 transition">Sobre</Link>
          <Link href="/contato" className="text-orange-300">Contato</Link>
        </footer>
      </div>
    </main>
  )
}
