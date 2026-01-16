import type { LalinItem } from '@/types/lalin'
import type { MasterGerbang } from '@/types/masterGerbang'
import type { LalinViewData, LalinPipelineConfig } from '../types'

import { createGerbangLookup } from './lalin.utils'
import {
  normalizeData,
  calculateKpi,
  calculateSubtotals,
  calculateGrandTotal,
} from './lalin.calculate'
import { filterByDate, filterByTab, filterBySearch } from './lalin.filter'
import { sortData } from './lalin.sort'
import { paginateData } from './lalin.pagination'

export function mapLalinData(
  rawLalin: LalinItem[],
  gerbangs: MasterGerbang[],
  config: LalinPipelineConfig
): LalinViewData {
  // 1. Prepare Lookup
  const gerbangLookup = createGerbangLookup(gerbangs)

  // 2. Normalize (Raw -> Table Rows)
  const allRows = normalizeData(rawLalin, gerbangLookup)

  // 3. Apply Filters
  let filtered = filterByDate(allRows, config.filterDate)
  filtered = filterByTab(filtered, config.filterTab)
  filtered = filterBySearch(filtered, config.searchQuery)

  // 4. Sort
  const sorted = sortData(filtered, config.sortConfig)

  // 5. Paginate
  const paginated = paginateData(sorted, config.page, config.pageSize)

  // 6. Calculate Aggregates (on filtered data usually, or all data? Usually filtered)
  const kpi = calculateKpi(filtered)
  const subtotals = calculateSubtotals(filtered)
  const grandTotal = calculateGrandTotal(filtered)

  return {
    rows: filtered, // Full filtered list (for export/calculations)
    paginatedRows: paginated, // Shown on table
    totalRows: filtered.length,
    kpi,
    subtotals,
    grandTotal,
  }
}
