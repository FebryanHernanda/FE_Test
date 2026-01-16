import { formatApiDate } from '@/lib/date'
import type { LalinItem } from '@/types/lalin'
import type { MasterGerbang } from '@/types/masterGerbang'
import {
  calculateETollTotal,
  calculateKTPTotal,
  calculateTotalTraffic,
} from '@/lib/trafficCalculations'

export function createGerbangLookup(gerbangs: MasterGerbang[]): Map<number, MasterGerbang> {
  return new Map(gerbangs.map((g) => [g.id, g]))
}

export const getETollTotal = calculateETollTotal
export const getKTPTotal = calculateKTPTotal
export const getTotalTraffic = calculateTotalTraffic

export function filterByDate(data: LalinItem[], date: string | null): LalinItem[] {
  if (!date) return data
  return data.filter((row) => formatApiDate(row.Tanggal) === date)
}

export function hasChartData<T>(arr: T[], valueKey: keyof T): boolean {
  if (!arr || arr.length === 0) return false
  return arr.some((item) => {
    const val = item[valueKey]
    return typeof val === 'number' && val > 0
  })
}
