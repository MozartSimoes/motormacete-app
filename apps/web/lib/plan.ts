// Utilitário central de planos — use em qualquer lugar do app

export type Plan = 'FREE' | 'DRIVER_PRO' | 'MECHANIC_PRO'

export const PLANS = {
  FREE: {
    name: 'Grátis',
    price: 0,
    maxVehicles: 1,
    mecanicoChatLimit: 5,  // consultas/mês
    pdfLaudo: false,
    alerts: false,
    financialCharts: false,
  },
  DRIVER_PRO: {
    name: 'Motorista Pro',
    price: 3.99,
    maxVehicles: Infinity,
    mecanicoChatLimit: Infinity,
    pdfLaudo: true,
    alerts: true,
    financialCharts: true,
  },
  MECHANIC_PRO: {
    name: 'Mecânico Pro',
    price: 6.99,
    maxVehicles: Infinity,
    mecanicoChatLimit: Infinity,
    pdfLaudo: true,
    alerts: true,
    financialCharts: true,
  },
} as const

export function isPro(plan: Plan): boolean {
  return plan === 'DRIVER_PRO' || plan === 'MECHANIC_PRO'
}

export function canAddVehicle(plan: Plan, currentCount: number): boolean {
  return currentCount < PLANS[plan].maxVehicles
}

export function canUseMecanico(plan: Plan, usedThisMonth: number): boolean {
  return usedThisMonth < PLANS[plan].mecanicoChatLimit
}
