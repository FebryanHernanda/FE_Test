import type { LalinItem } from '@/types/lalin'
import type { MasterGerbang } from '@/types/masterGerbang'
import type {
  DashboardKpi,
  PaymentCluster,
  PaymentMethodData,
  PaymentMethod,
  GateTraffic,
  ShiftTraffic,
  BranchTraffic,
} from '@/types/dashboard'
import {
  createGerbangLookup,
  getETollTotal,
  getKTPTotal,
  getTotalTraffic,
} from './dashboard.utils'

interface ClusterTotals {
  etoll: number
  flo: number
  tunai: number
  ktp: number
}

// Calculate high-level KPI metrics
export function calculateDashboardKpi(
  data: LalinItem[],
  totalActiveGates: number
): DashboardKpi {
  const clusterTotals: ClusterTotals = { etoll: 0, flo: 0, tunai: 0, ktp: 0 }
  const shiftTotals: Record<number, number> = {}
  let totalTraffic = 0

  data.forEach((row) => {
    const etoll = getETollTotal(row)
    const flo = row.eFlo || 0
    const tunai = row.Tunai || 0
    const ktp = getKTPTotal(row)
    const rowTotal = etoll + flo + tunai + ktp

    clusterTotals.etoll += etoll
    clusterTotals.flo += flo
    clusterTotals.tunai += tunai
    clusterTotals.ktp += ktp
    totalTraffic += rowTotal

    shiftTotals[row.Shift] = (shiftTotals[row.Shift] || 0) + rowTotal
  })

  const clusterMap: Record<string, PaymentCluster> = {
    etoll: 'E-Toll',
    flo: 'Flo',
    tunai: 'Tunai',
    ktp: 'KTP',
  }
  
  let dominantPaymentCluster: PaymentCluster = 'E-Toll'
  let maxClusterCount = -1
  
  Object.entries(clusterTotals).forEach(([key, count]) => {
    if (count > maxClusterCount) {
      maxClusterCount = count
      dominantPaymentCluster = clusterMap[key]
    }
  })

  // Find dominant shift
  let dominantShift = 'Shift 1'
  let maxShiftCount = -1
  
  Object.entries(shiftTotals).forEach(([shift, count]) => {
    if (count > maxShiftCount) {
      maxShiftCount = count
      dominantShift = `Shift ${shift}`
    }
  })

  return {
    totalTraffic,
    dominantPaymentCluster,
    dominantShift,
    totalActiveGates,
  }
}

// Aggregate traffic by payment method
export function aggregatePaymentMethods(data: LalinItem[]): PaymentMethodData[] {
  const methodTotals: Record<PaymentMethod, number> = {
    BCA: 0,
    BRI: 0,
    BNI: 0,
    DKI: 0,
    Mandiri: 0,
    Mega: 0,
    Flo: 0,
    KTP: 0,
    Tunai: 0,
  }

  const methodToCluster: Record<PaymentMethod, PaymentCluster> = {
    BCA: 'E-Toll',
    BRI: 'E-Toll',
    BNI: 'E-Toll',
    DKI: 'E-Toll',
    Mandiri: 'E-Toll',
    Mega: 'E-Toll',
    Flo: 'Flo',
    KTP: 'KTP',
    Tunai: 'Tunai',
  }

  data.forEach((row) => {
    methodTotals.BCA += row.eBca || 0
    methodTotals.BRI += row.eBri || 0
    methodTotals.BNI += row.eBni || 0
    methodTotals.DKI += row.eDKI || 0
    methodTotals.Mandiri += row.eMandiri || 0
    methodTotals.Mega += row.eMega || 0
    methodTotals.Flo += row.eFlo || 0
    methodTotals.KTP += getKTPTotal(row)
    methodTotals.Tunai += row.Tunai || 0
  })

  return Object.entries(methodTotals).map(([method, count]) => ({
    method: method as PaymentMethod,
    count,
    cluster: methodToCluster[method as PaymentMethod],
  }))
}

// Aggregate traffic by shift
export function aggregateShiftTraffic(data: LalinItem[]): ShiftTraffic[] {
  const shiftTotals: Record<number, number> = {}

  data.forEach((row) => {
    const traffic = getTotalTraffic(row)
    shiftTotals[row.Shift] = (shiftTotals[row.Shift] || 0) + traffic
  })

  return Object.entries(shiftTotals)
    .map(([shift, traffic]) => ({
      shiftName: `Shift ${shift}`,
      traffic,
    }))
    .sort((a, b) => {
      const aNum = parseInt(a.shiftName.replace('Shift ', ''))
      const bNum = parseInt(b.shiftName.replace('Shift ', ''))
      return aNum - bNum
    })
}

// Aggregate traffic per gate
export function aggregateGateTraffic(
  data: LalinItem[],
  gerbangs: MasterGerbang[],
  topN: number = 6
): GateTraffic[] {
  const lookup = createGerbangLookup(gerbangs)
  const gateTotals: Record<number, number> = {}

  data.forEach((row) => {
    const traffic = getTotalTraffic(row)
    gateTotals[row.IdGerbang] = (gateTotals[row.IdGerbang] || 0) + traffic
  })

  return Object.entries(gateTotals)
    .map(([gateId, traffic]) => {
      const gerbang = lookup.get(Number(gateId))
      return {
        gateName: gerbang?.NamaGerbang || `Gerbang ${gateId}`,
        traffic,
      }
    })
    .sort((a, b) => b.traffic - a.traffic)
    .slice(0, topN)
}

// Aggregate traffic per branch (ruas)
export function aggregateBranchTraffic(
  data: LalinItem[],
  gerbangs: MasterGerbang[]
): BranchTraffic[] {
  const lookup = createGerbangLookup(gerbangs)
  const branchTotals: Record<string, number> = {}

  data.forEach((row) => {
    const traffic = getTotalTraffic(row)
    const gerbang = lookup.get(row.IdGerbang)
    const branchName = gerbang?.NamaCabang || `Ruas ${row.IdCabang}`
    branchTotals[branchName] = (branchTotals[branchName] || 0) + traffic
  })

  return Object.entries(branchTotals)
    .map(([branchName, traffic]) => ({ branchName, traffic }))
    .sort((a, b) => b.traffic - a.traffic)
}
