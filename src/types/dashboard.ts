export type PaymentMethod =
  | 'BCA'
  | 'BRI'
  | 'BNI'
  | 'DKI'
  | 'Mandiri'
  | 'Mega'
  | 'Flo'
  | 'KTP'
  | 'Tunai'

export type PaymentCluster = 'E-Toll' | 'KTP' | 'Flo' | 'Tunai'

export interface DashboardKpi {
  totalTraffic: number
  dominantPaymentCluster: PaymentCluster
  dominantShift: string
  totalActiveGates: number
}

export interface PaymentMethodData {
  method: PaymentMethod
  cluster: PaymentCluster
  count: number
}

export interface GateTraffic {
  gateName: string
  traffic: number
}

export interface ShiftTraffic {
  shiftName: string
  traffic: number
}

export interface BranchTraffic {
  branchName: string
  traffic: number
}

export interface DashboardInsights {
  general: string[]
  payment: string
  shift: string
  gate: string
  branch?: string
  paymentPercentage: number
  shiftPercentage: number
}

export interface DashboardOverview {
  kpi: DashboardKpi
  paymentMethods: PaymentMethodData[]
  gateTraffic: GateTraffic[]
  shiftTraffic: ShiftTraffic[]
  branchTraffic: BranchTraffic[]
  insights: DashboardInsights
}

// Filter

export interface DashboardFilter {
  startDate: Date | null
  endDate: Date | null
  keyword: string
}
