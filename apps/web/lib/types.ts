export type VehicleTypeSlug = 'carro' | 'moto'
export type Category = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'
export type Severity = 'OK' | 'WARN' | 'DANGER'

export interface Tip {
  id: string
  modelId: string | null
  category: Category
  severity: Severity
  title: string
  body: string
  order: number
}
