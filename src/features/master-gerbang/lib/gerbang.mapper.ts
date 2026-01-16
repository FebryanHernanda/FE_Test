import type { MasterGerbang, SortConfig } from '@/types/masterGerbang'
import { filterGerbang, sortGerbang, paginateGerbang } from './gerbang.utils'

interface GerbangPipelineConfig {
  searchQuery: string
  sortConfig: SortConfig
  page: number
  pageSize: number
}

interface GerbangViewData {
  paginatedData: MasterGerbang[]
  totalItems: number
}

export function processGerbangData(
  rawData: MasterGerbang[],
  config: GerbangPipelineConfig
): GerbangViewData {
  // 1. Filter
  const filtered = filterGerbang(rawData, config.searchQuery)

  // 2. Sort
  const sorted = sortGerbang(filtered, config.sortConfig)

  // 3. Paginate
  const paginated = paginateGerbang(sorted, config.page, config.pageSize)

  return {
    paginatedData: paginated,
    totalItems: filtered.length,
  }
}
