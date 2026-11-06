import type { Metadata } from 'next'
import { Barlow, Barlow_Condensed, Bebas_Neue } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import WhatsAppFloat from '../components/WhatsAppFloat'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-barlow',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas-neue',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://motormacete.com.br'),
  title: 'MotorMacete — Seu veículo, sem segredos.',
  description:
    'Macetes, problemas crônicos e dicas de manutenção para o seu carro ou moto. IA treinada em 12 mil ordens de serviço. Encontre as informações certas para o seu veículo.',
  keywords: [
    'mecânica', 'manutenção', 'dicas', 'macetes', 'carro', 'moto', 'revisão',
    'IA automotiva', 'problemas crônicos', 'diagnóstico automotivo', 'oficina mecânica',
    'garagem digital', 'mecânico virtual', 'manutenção preventiva',
  ],
  openGraph: {
    title: 'MotorMacete — Seu veículo, sem segredos.',
    description:
      'IA treinada em 12 mil ordens de serviço. Macetes, problemas crônicos e dicas de manutenção para o seu carro ou moto.',
    url: 'https://motormacete.com.br',
    siteName: 'MotorMacete',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MotorMacete — Seu veículo, sem segredos.',
    description:
      'IA treinada em 12 mil ordens de serviço. Macetes, problemas crônicos e dicas de manutenção para o seu carro ou moto.',
  },
  other: {
    'google-adsense-account': 'ca-pub-7836996287771168',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${barlow.variable} ${barlowCondensed.variable} ${bebasNeue.variable}`}>
      <body className="min-h-screen antialiased">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7836996287771168"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Background grid */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,102,0,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,102,0,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Background glow */}
        <div
          className="fixed pointer-events-none z-0"
          style={{
            top: '-120px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '800px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(255,102,0,0.10) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10">{children}</div>
        <WhatsAppFloat />
      </body>
    </html>
  )
}
