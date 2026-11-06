export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#000', borderTop: '1px solid #1a1a1a' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo + descrição */}
          <div>
            <a href="/home" className="flex items-center gap-2.5 mb-4 no-underline" style={{ textDecoration: 'none' }}>
              <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0">
                <img src="/logo.svg" alt="" width={36} height={36} />
              </div>
              <span className="text-[22px] tracking-wide" style={{ fontFamily: 'var(--font-bebas-neue)', color: '#f0ede8' }}>
                Motor<span style={{ color: '#ff6600' }}>Macete</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
              Sua plataforma completa para gestão de veículos e oficinas. Transparência e segurança para você cuidar melhor do seu veículo.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-bold mb-4" style={{ color: '#fff' }}>Links Rápidos</h4>
            {[
              { label: 'Home',      href: '/home' },
              { label: 'Notícias', href: '/home/noticias' },
              { label: 'Macetes',   href: '/home/macetes' },
              { label: 'Oficinas',  href: '/home/oficinas' },
            ].map(({ label, href }) => (
              <a key={href} href={href}
                className="block text-sm mb-2.5 transition hover:text-orange-400"
                style={{ color: '#6b7280', textDecoration: 'none' }}>
                {label}
              </a>
            ))}
          </div>

          {/* Serviços */}
          <div>
            <h4 className="font-bold mb-4" style={{ color: '#fff' }}>Serviços</h4>
            {[
              { label: 'Mecânico Virtual', href: '/home/mecanico' },
              { label: 'Comparador',       href: '/home/comparar' },
              { label: 'Calculadora',      href: '/home/custos' },
              { label: 'Códigos OBD',      href: '/home/obd' },
            ].map(({ label, href }) => (
              <a key={href} href={href}
                className="block text-sm mb-2.5 transition hover:text-orange-400"
                style={{ color: '#6b7280', textDecoration: 'none' }}>
                {label}
              </a>
            ))}
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-bold mb-4" style={{ color: '#fff' }}>Contato</h4>
            <div className="space-y-2.5">
              <a href="/contato" className="flex items-center gap-2 text-sm transition hover:text-orange-400"
                style={{ color: '#6b7280', textDecoration: 'none' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>contato@motormacete.com.br</span>
              </a>
              <a href="/sobre" className="flex items-center gap-2 text-sm transition hover:text-orange-400"
                style={{ color: '#6b7280', textDecoration: 'none' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span>Sobre o MotorMacete</span>
              </a>
              <a href="/privacidade" className="flex items-center gap-2 text-sm transition hover:text-orange-400"
                style={{ color: '#6b7280', textDecoration: 'none' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span>Privacidade</span>
              </a>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 text-center text-sm" style={{ borderTop: '1px solid #1e2a3a', color: '#4b5563' }}>
          © {year} MotorMacete. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
