export function Hero() {
  return (
    <section className="text-center px-6 pt-14 pb-6">
      <p
        className="text-[13px] font-medium tracking-[3px] uppercase mb-3.5"
        style={{ fontFamily: 'var(--font-barlow-condensed)', color: '#ff6600' }}
      >
        Dicas técnicas · Macetes · Problemas crônicos
      </p>
      <h1
        className="text-[76px] leading-[0.93] tracking-wide mb-4 max-sm:text-[52px]"
        style={{ fontFamily: 'var(--font-bebas-neue)', color: '#f0ede8' }}
      >
        Seu veículo,
        <br />
        <em className="not-italic" style={{ color: '#ff6600' }}>
          sem segredos.
        </em>
      </h1>
      <p className="text-[17px] max-w-[640px] mx-auto leading-relaxed" style={{ color: '#aaa' }}>
        IA treinada em 12 mil ordens de serviço, fóruns de mecânicos e relatos verificados. Diga marca, modelo e ano — devolvemos os macetes que só quem trabalha com aquele carro conhece.
      </p>

      <div className="mt-10 grid grid-cols-4 gap-3 text-left max-sm:grid-cols-2 max-[520px]:grid-cols-1">
        {[
          { icon: '🔧', label: 'Macetes de oficina' },
          { icon: '⚠️', label: 'Problemas crônicos' },
          { icon: '⚙️', label: 'Tabela de manutenção' },
          { icon: '🛞', label: 'Calibragem de pneus' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-[#3a3a42] bg-[#222228] px-5 py-5 text-center"
          >
            <p className="text-2xl mb-2">{stat.icon}</p>
            <p className="text-xs uppercase tracking-[0.25em]" style={{ color: '#999' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

    </section>
  )
}
