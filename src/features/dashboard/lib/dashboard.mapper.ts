import type { LalinItem } from '@/types/lalin'
import type { MasterGerbang } from '@/types/masterGerbang'
import type { DashboardOverview } from '@/types/dashboard'

import { filterByDate } from './dashboard.utils'
import {
  calculateDashboardKpi,
  aggregatePaymentMethods,
  aggregateGateTraffic,
  aggregateShiftTraffic,
  aggregateBranchTraffic,
} from './dashboard.aggregate'
import { deriveDashboardInsights } from './dashboard.insight'

export function mapDashboardData(
  lalins: LalinItem[],
  gerbangs: MasterGerbang[],
  filterDate: string | null
): DashboardOverview {
  // 1. Filter Data
  const filteredData = filterByDate(lalins, filterDate)
  const activeGateIds = new Set(filteredData.map((row) => row.IdGerbang))
  const totalActiveGates = activeGateIds.size

  // 2. Aggregate Data
  const kpi = calculateDashboardKpi(filteredData, totalActiveGates)
  const paymentMethods = aggregatePaymentMethods(filteredData)
  const gateTraffic = aggregateGateTraffic(filteredData, gerbangs)
  const shiftTraffic = aggregateShiftTraffic(filteredData)
  const branchTraffic = aggregateBranchTraffic(filteredData, gerbangs)

  // 3. Generate Insights
  const insights = deriveDashboardInsights(
    kpi,
    paymentMethods,
    gateTraffic,
    shiftTraffic,
    branchTraffic
  )

  // 4. Return Final Structure
  return {
    kpi,
    paymentMethods,
    gateTraffic,
    shiftTraffic,
    branchTraffic,
    insights,
  }
}
