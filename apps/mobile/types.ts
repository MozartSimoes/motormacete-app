export type VehicleTypeSlug = 'carro' | 'moto'

export interface VehicleType {
  id: string
  slug: VehicleTypeSlug
  label: string
  brands?: Brand[]
}

export interface Brand {
  id: string
  name: string
  vehicleTypeId: string
  models?: VehicleModel[]
}

export interface VehicleModel {
  id: string
  name: string
  brandId: string
  brand?: Brand
  tips?: Tip[]
}

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

export interface VehiclesApiResponse {
  brands: Array<{
    name: string
    models: string[]
  }>
}

export interface TipsApiResponse {
  tips: Tip[]
  vehicle: string
}
