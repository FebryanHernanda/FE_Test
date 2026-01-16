import { dayjs, formatApiDate, formatDayName, formatShortDate } from '@/lib/date'
import type { 
  LalinItem, 
  LalinTableRow, 
  LalinPaymentMethod, 
  LalinKpiSummary 
} from '@/types/lalin'
import {
  type GerbangLookup,
  getRuasName,
  getGerbangName,
  calculateETollTotal,
  calculateKTPTotal
} from './lalin.utils'

// Types for grouping
interface GroupKey {
  ruas: string
  gerbang: string
  gardu: number
  shift: number
  hari: string
  tanggal: string
  tanggalRaw: string
}

interface PaymentGroup {
  gol: Record<number, number>
}

// Data normalization

export function normalizeData(
  rows: LalinItem[],
  gerbangLookup: GerbangLookup
): LalinTableRow[] {
  const groups: Record<string, Record<LalinPaymentMethod, PaymentGroup>> = {}
  const meta: Record<string, GroupKey> = {}
  let idCounter = 0

  rows.forEach((row) => {
    const dateObj = dayjs(row.Tanggal)
    const key = `${row.IdGerbang}-${row.IdGardu}-${row.Shift}-${formatApiDate(dateObj)}`

    // Initialize group if not exists
    if (!groups[key]) {
      groups[key] = {
        Tunai: { gol: {} },
        'E-Toll': { gol: {} },
        Flo: { gol: {} },
        KTP: { gol: {} },
      }
      meta[key] = {
        ruas: getRuasName(row.IdGerbang, gerbangLookup),
        gerbang: getGerbangName(row.IdGerbang, gerbangLookup),
        gardu: row.IdGardu,
        shift: row.Shift,
        hari: formatDayName(dateObj),
        tanggal: formatShortDate(dateObj),
        tanggalRaw: formatApiDate(dateObj),
      }
    }

    // Accumulate values
    const gol = row.Golongan
    const tunai = row.Tunai || 0
    const eToll = calculateETollTotal(row)
    const flo = row.eFlo || 0
    const ktp = calculateKTPTotal(row)

    if (tunai > 0) groups[key].Tunai.gol[gol] = (groups[key].Tunai.gol[gol] || 0) + tunai
    if (eToll > 0) groups[key]['E-Toll'].gol[gol] = (groups[key]['E-Toll'].gol[gol] || 0) + eToll
    if (flo > 0) groups[key].Flo.gol[gol] = (groups[key].Flo.gol[gol] || 0) + flo
    if (ktp > 0) groups[key].KTP.gol[gol] = (groups[key].KTP.gol[gol] || 0) + ktp
  })

  // Flatten to array
  const result: LalinTableRow[] = []

  Object.entries(groups).forEach(([key, methods]) => {
    const m = meta[key]

    Object.entries(methods).forEach(([method, data]) => {
      const gol = data.gol
      const total =
        (gol[1] || 0) + (gol[2] || 0) + (gol[3] || 0) + (gol[4] || 0) + (gol[5] || 0)

      if (total > 0) {
        idCounter++
        result.push({
          id: idCounter,
          Ruas: m.ruas,
          Gerbang: m.gerbang,
          Gardu: m.gardu,
          Shift: m.shift,
          Hari: m.hari,
          Tanggal: m.tanggal,
          TanggalRaw: m.tanggalRaw,
          MetodePembayaran: method as LalinPaymentMethod,
          Gol1: gol[1] || 0,
          Gol2: gol[2] || 0,
          Gol3: gol[3] || 0,
          Gol4: gol[4] || 0,
          Gol5: gol[5] || 0,
          TotalLalin: total,
        })
      }
    })
  })

  return result
}

// KPI and totals

export function calculateKpi(data: LalinTableRow[]): LalinKpiSummary {
  return data.reduce(
    (acc, row) => {
      switch (row.MetodePembayaran) {
        case 'Tunai':
          acc.totalTunai += row.TotalLalin
          break
        case 'E-Toll':
          acc.totalEToll += row.TotalLalin
          break
        case 'Flo':
          acc.totalFlo += row.TotalLalin
          break
        case 'KTP':
          acc.totalKTP += row.TotalLalin
          break
      }
      acc.totalAll += row.TotalLalin
      return acc
    },
    { totalTunai: 0, totalEToll: 0, totalFlo: 0, totalKTP: 0, totalAll: 0 }
  )
}

export function calculateSubtotals(data: LalinTableRow[]): Record<string, number> {
  const subtotals: Record<string, number> = {}
  data.forEach((row) => {
    subtotals[row.Ruas] = (subtotals[row.Ruas] || 0) + row.TotalLalin
  })
  return subtotals
}

export function calculateGrandTotal(data: LalinTableRow[]): number {
  return data.reduce((sum, row) => sum + row.TotalLalin, 0)
}
