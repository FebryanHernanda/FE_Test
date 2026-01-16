export interface MasterGerbang {
  id: number
  IdCabang: number
  NamaGerbang: string
  NamaCabang: string
}

export interface MasterGerbangPayload {
  id?: number
  IdCabang: number
  NamaGerbang: string
  NamaCabang: string
}

export interface DeleteGerbangPayload {
  id: number
  IdCabang: number
}

export type SortField = keyof MasterGerbang | null

export interface SortConfig {
  field: SortField
  direction: 'asc' | 'desc'
}

export interface GerbangFormData {
  id: number
  IdCabang: number
  NamaCabang: string
  NamaGerbang: string
}

export interface GerbangApiResponse {
  status: boolean
  message: string
  code: number
  data: {
    total_pages: number
    current_page: number
    count: number
    rows: {
      count: number
      rows: MasterGerbang[]
    }
  }
}
