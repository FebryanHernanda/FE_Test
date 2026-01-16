// Lalin feature types

import type { LalinTableRow, LalinSortConfig, LalinTabType, LalinKpiSummary } from '@/types/lalin'

// Pipeline configuration for data transformation
export interface LalinPipelineConfig {
  filterDate: string | null
  filterTab: LalinTabType
  searchQuery: string
  sortConfig: LalinSortConfig
  page: number
  pageSize: number
}

// Output structure from mapper
export interface LalinViewData {
  rows: LalinTableRow[]
  paginatedRows: LalinTableRow[]
  totalRows: number
  kpi: LalinKpiSummary
  subtotals: Record<string, number>
  grandTotal: number
}
