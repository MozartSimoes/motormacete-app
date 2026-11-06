import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Macetes e Dicas Automotivas — MotorMacete',
  description: 'Macetes, problemas crônicos e dicas de manutenção para carros e motos. Base com milhares de modelos catalogados.',
  alternates: { canonical: 'https://motormacete.com.br/home/macetes' },
  openGraph: {
    title: 'Macetes e Dicas Automotivas — MotorMacete',
    url: 'https://motormacete.com.br/home/macetes',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
