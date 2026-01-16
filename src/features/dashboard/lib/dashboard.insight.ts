import type {
  DashboardKpi,
  PaymentMethodData,
  GateTraffic,
  ShiftTraffic,
  BranchTraffic,
  DashboardInsights,
} from '@/types/dashboard'

const formatter = new Intl.NumberFormat('id-ID')

// Generate insight strings
export function deriveDashboardInsights(
  kpi: DashboardKpi,
  paymentMethods: PaymentMethodData[],
  gateTraffic: GateTraffic[],
  shiftTraffic: ShiftTraffic[],
  branchTraffic: BranchTraffic[]
): DashboardInsights {
  const totalTraffic = kpi.totalTraffic

  // Payment insight
  const maxPayment = paymentMethods.reduce(
    (prev, curr) => (prev.count > curr.count ? prev : curr),
    paymentMethods[0]
  )
  const paymentPercentage =
    totalTraffic > 0 ? Math.round((maxPayment.count / totalTraffic) * 100) : 0
  const payment = `${maxPayment?.method || '-'} menyumbang ${paymentPercentage}% dari total transaksi`

  // Gate insight
  const maxGate = gateTraffic[0]
  const gate = maxGate
    ? `${maxGate.gateName} mencatat volume tertinggi dengan ${formatter.format(maxGate.traffic)} kendaraan`
    : ''

  // Shift insight
  const maxShift = shiftTraffic.reduce(
    (prev, curr) => (prev.traffic > curr.traffic ? prev : curr),
    shiftTraffic[0]
  )
  const shiftPercentage = totalTraffic > 0 ? Math.round((maxShift.traffic / totalTraffic) * 100) : 0
  const shift = `${maxShift?.shiftName || '-'} menangani ${shiftPercentage}% lalu lintas harian`

  // Branch insight
  const maxBranch = branchTraffic[0]
  const branch = maxBranch ? `${maxBranch.branchName} menjadi ruas dengan volume tertinggi` : ''

  return {
    general: [payment, shift, gate],
    payment,
    shift,
    gate,
    branch,
    paymentPercentage,
    shiftPercentage,
  }
}
