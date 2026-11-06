import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Comparador de Veículos — MotorMacete',
  description: 'Compare carros e motos lado a lado. Consumo, manutenção, custos e problemas crônicos em uma única tela.',
  alternates: { canonical: 'https://motormacete.com.br/home/comparar' },
  openGraph: {
    title: 'Comparador de Veículos — MotorMacete',
    url: 'https://motormacete.com.br/home/comparar',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
