// Single row from /api/lalins endpoint
export interface LalinItem {
  id: number
  IdCabang: number
  IdGerbang: number
  IdGardu: number
  Tanggal: string
  Shift: number
  Golongan: number
  IdAsalGerbang?: number
  // Payment methods
  Tunai: number
  eMandiri: number
  eBri: number
  eBni: number
  eBca: number
  eNobu: number
  eDKI: number
  eMega: number
  eFlo: number
  // Dinas (KTP)
  DinasOpr: number
  DinasMitra: number
  DinasKary: number
  // Timestamps
  CreatedAt?: string
  UpdatedAt?: string
}

// API response from GET /api/lalins
export interface LalinResponse {
  status: boolean
  message: string
  code?: number
  data: {
    total_pages?: number
    current_page?: number
    count?: number
    rows: {
      current_page?: number
      total_pages?: number
      count: number
      rows: LalinItem[]
    }
  }
}

// Payment method categories
export type LalinPaymentMethod = 'Tunai' | 'E-Toll' | 'Flo' | 'KTP'

// Tab categories for filtering
export type LalinTabType = 'Semua' | 'E-Toll' | 'Tunai' | 'Flo' | 'KTP' | 'E-Toll + Tunai + Flo'

// Normalized row for table display
export interface LalinTableRow {
  id: number
  Ruas: string
  Gerbang: string
  Gardu: number
  Shift: number
  Hari: string
  Tanggal: string
  TanggalRaw: string
  MetodePembayaran: LalinPaymentMethod
  Gol1: number
  Gol2: number
  Gol3: number
  Gol4: number
  Gol5: number
  TotalLalin: number
}

// Filter state types
export type LalinSortField =
  | 'Ruas'
  | 'Gerbang'
  | 'Gardu'
  | 'Shift'
  | 'Hari'
  | 'Tanggal'
  | 'Gol1'
  | 'Gol2'
  | 'Gol3'
  | 'Gol4'
  | 'Gol5'
  | 'TotalLalin'

export type SortDirection = 'asc' | 'desc'

export interface LalinSortConfig {
  field: LalinSortField
  direction: SortDirection
}

export interface LalinFilterState {
  date: string | null
  tab: LalinTabType
  search: string
  sort: LalinSortConfig
  page: number
  pageSize: number
}

// KPI and summary types
export interface LalinKpiSummary {
  totalTunai: number
  totalEToll: number
  totalFlo: number
  totalKTP: number
  totalAll: number
}

export interface LalinSubtotal {
  ruas: string
  total: number
}
