import { StatCard } from '@/components/common/data-display'
import { formatNumber } from '@/lib/format'
import type { LalinKpiSummary } from '@/types/lalin'

interface LalinKpiCardsProps {
  kpiSummary: LalinKpiSummary
}

export function LalinKpiCards({ kpiSummary }: LalinKpiCardsProps) {
  return (
    <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-5">
      <StatCard
        title="Tunai"
        value={formatNumber(kpiSummary.totalTunai)}
        subtitle="Total transaksi tunai"
        insight="Jumlah transaksi pembayaran tunai pada filter aktif"
      />
      <StatCard
        title="E-Toll"
        value={formatNumber(kpiSummary.totalEToll)}
        subtitle="Total transaksi E-Toll"
        insight="Jumlah transaksi E-Toll (Mandiri, BRI, BNI, BCA, dll)"
      />
      <StatCard
        title="Flo"
        value={formatNumber(kpiSummary.totalFlo)}
        subtitle="Total transaksi Flo"
        insight="Jumlah transaksi menggunakan sistem Flo (OBU)"
      />
      <StatCard
        title="KTP"
        value={formatNumber(kpiSummary.totalKTP)}
        subtitle="Total transaksi dinas"
        insight="Jumlah transaksi dinas operasional dan karyawan"
      />
      <StatCard
        title="Total Lalin"
        value={formatNumber(kpiSummary.totalAll)}
        subtitle="Total keseluruhan"
        insight="Volume lalu lintas total sesuai filter aktif"
      />
    </div>
  )
}
