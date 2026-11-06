import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Códigos OBD — MotorMacete',
  description: 'Consulte códigos de falha OBD (P0, P1, P2, P3, B, C, U) com diagnóstico e soluções para o seu veículo.',
  alternates: { canonical: 'https://motormacete.com.br/home/obd' },
  openGraph: {
    title: 'Códigos OBD — MotorMacete',
    url: 'https://motormacete.com.br/home/obd',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
