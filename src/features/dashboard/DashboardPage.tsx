import { useState } from 'react'
import { Typography } from '@mui/material'
import type { Dayjs } from '@/lib/date'
import { getCurrentDateTime } from '@/lib/date'
import { formatNumber } from '@/lib/format'

import { useDashboard } from '@/features/dashboard/hooks/useDashboard'
import { hasChartData } from '@/features/dashboard/lib/dashboard.utils'
import { StatCard, ChartContainer } from '@/components/common/data-display'
import { ErrorState, LoadingState } from '@/components/common/feedback'
import { BarChartComponent, DoughnutChart } from '@/components/common/charts'
import { DashboardFilter } from './components/DashboardFilter'
import {
  BRAND_COLORS,
  CHART_PALETTE_GATE_RANKING,
  CHART_PALETTE_CATEGORICAL,
  CHART_PALETTE_TEMPORAL,
  getPaymentColor,
} from '@/lib/colors'
import { COLORS } from '@/constants/theme'
import { formatErrorMessage } from '@/lib/formatErrorMessage'

function EmptyChartState({ message = 'Tidak ada data', height = 280 }: { message?: string; height?: number }) {
  return (
    <div 
      className="flex flex-col items-center justify-center text-center"
      style={{ height, minHeight: height }}
    >
      <Typography variant="body2" sx={{ color: BRAND_COLORS.neutral400, fontWeight: 500 }}>
        {message}
      </Typography>
    </div>
  )
}

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const { data, isLoading, error, refetch } = useDashboard({ selectedDate })

  const handleReset = () => setSelectedDate(null)

  // Loading
  if (isLoading && !data) {
    return <LoadingState message="Memuat data dashboard..." />
  }

  return (
    <div className="w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <header className="mb-8">
        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontWeight: 700,
            color: BRAND_COLORS.primary,
            letterSpacing: '-0.02em',
            mb: 0.5,
          }}
        >
          Dashboard Operasional
        </Typography>
        <Typography variant="body2" sx={{ color: BRAND_COLORS.neutral500, fontWeight: 500 }}>
          Monitoring lalu lintas dan transaksi tol
        </Typography>
      </header>

      {/* Error State */}
      {error && (
        <ErrorState message={formatErrorMessage(error)} onRetry={refetch} />
      )}


      {/* Filter Section */}
      <section className="mb-6">
        <DashboardFilter
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          onReset={handleReset}
        />
      </section>

      {/* Content */}
      {data && (
        <>
          {/* KPI Cards */}
          <section className="grid grid-cols-1 gap-5 mb-8 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
            <StatCard
              title="Total Lalu Lintas"
              value={formatNumber(data.kpi.totalTraffic)}
              subtitle="Kendaraan hari ini"
              insight="Total volume kendaraan yang melewati seluruh gerbang tol"
            />
            <StatCard
              title="Metode Pembayaran Dominan"
              value={data.kpi.dominantPaymentCluster}
              subtitle={
                <span>
                  <strong style={{ color: BRAND_COLORS.primary }}>{data.insights.paymentPercentage}%</strong> dari total transaksi
                </span>
              }
              insight="Metode pembayaran dengan volume transaksi tertinggi"
            />
            <StatCard
              title="Shift Tersibuk"
              value={data.kpi.dominantShift}
              subtitle={
                <span>
                  <strong style={{ color: BRAND_COLORS.primary }}>{data.insights.shiftPercentage}%</strong> lalu lintas harian
                </span>
              }
              insight="Shift operasional dengan volume lalu lintas tertinggi"
            />
            <StatCard
              title="Gerbang Aktif"
              value={data.kpi.totalActiveGates}
              subtitle="Gerbang beroperasi"
              insight="Jumlah gerbang tol yang aktif beroperasi"
            />
          </section>

          {/* Charts Row 1 */}
          <section className="grid grid-cols-1 gap-5 mb-8 lg:grid-cols-2 items-stretch">
            <div className="h-full">
              <ChartContainer
                title="Transaksi per Metode Pembayaran"
                insight={data.insights.payment}
                height={280}
                minHeight={400}
                className="h-full"
              >
                {hasChartData(data.paymentMethods, 'count') ? (
                  <BarChartComponent
                    data={data.paymentMethods}
                    dataKey="count"
                    nameKey="method"
                    layout="horizontal"
                    barSize={32}
                    height={280}
                    colorFn={(item) => getPaymentColor(item.method)}
                    xAxisLabel="Metode Pembayaran"
                    yAxisLabel="Jumlah Transaksi"
                  />
                ) : (
                  <EmptyChartState message="Tidak ada data transaksi" />
                )}
              </ChartContainer>
            </div>

            <div className="h-full">
              <ChartContainer
                title="Distribusi Lalu Lintas per Shift"
                insight={data.insights.shift}
                height={280}
                minHeight={400}
                className="h-full"
              >
                {hasChartData(data.shiftTraffic, 'traffic') ? (
                  <DoughnutChart
                    data={data.shiftTraffic}
                    dataKey="traffic"
                    nameKey="shiftName"
                    colors={[...CHART_PALETTE_TEMPORAL]}
                    innerRadius={70}
                    outerRadius={100}
                    height={280}
                  />
                ) : (
                  <EmptyChartState message="Tidak ada data shift" />
                )}
              </ChartContainer>
            </div>
          </section>

          {/* Charts Row 2 */}
          <section className="grid grid-cols-1 gap-5 lg:grid-cols-2 items-stretch">
            <div className="h-full">
              <ChartContainer
                title="Volume per Gerbang (Top 6)"
                insight={data.insights.gate}
                height={280}
                minHeight={360}
                className="h-full"
              >
                {hasChartData(data.gateTraffic, 'traffic') ? (
                  <BarChartComponent
                    data={data.gateTraffic.slice(0, 6)}
                    dataKey="traffic"
                    nameKey="gateName"
                    layout="horizontal"
                    barSize={32}
                    height={280}
                    colors={[...CHART_PALETTE_GATE_RANKING]}
                    xAxisLabel="Volume Kendaraan"
                    yAxisLabel="Gerbang Tol"
                  />
                ) : (
                  <EmptyChartState message="Tidak ada data gerbang" />
                )}
              </ChartContainer>
            </div>

            <div className="h-full">
              <ChartContainer
                title="Distribusi Lalu Lintas per Ruas"
                insight={data.insights.branch || ''}
                height={280}
                minHeight={360}
                className="h-full"
              >
                {hasChartData(data.branchTraffic, 'traffic') ? (
                  <DoughnutChart
                    data={data.branchTraffic}
                    dataKey="traffic"
                    nameKey="branchName"
                    colors={[...CHART_PALETTE_CATEGORICAL].slice(0, 3)}
                    innerRadius={70}
                    outerRadius={100}
                    height={280}
                  />
                ) : (
                  <EmptyChartState message="Tidak ada data ruas" />
                )}
              </ChartContainer>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="mt-8 pt-4 flex justify-between gap-2 text-center flex-col md:flex-row" style={{ borderTop: `1px solid ${COLORS.border.light}` }}>
        <Typography
          variant="caption"
          sx={{ color: BRAND_COLORS.neutral400, fontSize: '11px', fontWeight: 500 }}
        >
          Data terakhir diperbarui: {getCurrentDateTime()} WIB
        </Typography>

          <Typography variant="caption" sx={{ color: BRAND_COLORS.neutral400 }}>
            &copy; {new Date().getFullYear()} PT Jasa Marga (Persero) Tbk. All
            rights reserved.
          </Typography>
      </footer>
    </div>
  )
}
