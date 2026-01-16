import { Typography } from '@mui/material'
import { getCurrentDateTime } from '@/lib/date'
import { useLalin } from './hooks/useLalin'
import { LalinFilter } from './components/LalinFilter'
import { LalinKpiCards } from './components/LalinKpiCards'
import { LalinTable } from './components/LalinTable'
import { LoadingState, ErrorState } from '@/components/common/feedback'
import { COLORS } from '@/constants/theme'
import { BRAND_COLORS } from '@/lib/colors'
import { formatErrorMessage } from '@/lib/formatErrorMessage'

export default function LaporanLalinPage() {
  const {
    data,
    kpiSummary,
    subtotalsByRuas,
    grandTotal,
    loading,
    error,
    pagination,
    filter,
    actions,
  } = useLalin()

  // Initial Loading
  if (loading && data.length === 0) {
    return <LoadingState message="Memuat data laporan..." />
  }

  return (
    <div className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
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
          Laporan Lalu Lintas Harian
        </Typography>
        <Typography variant="body2" sx={{ color: BRAND_COLORS.neutral500, fontWeight: 500 }}>
          Pantau ringkasan dan detail transaksi lalu lintas per gerbang dan gardu
        </Typography>
      </header>

      {/* Error State */}
      {error && <ErrorState message={formatErrorMessage(error)} onRetry={actions.refresh} />}

      {/* Filter Section */}
      <section className="mb-6">
        <LalinFilter
          date={filter.date}
          search={filter.search}
          onDateChange={filter.onDateChange}
          onSearchChange={filter.onSearchChange}
          onReset={filter.onReset}
        />
      </section>

      {/* Content: Empty vs Data */}
      {/* Content */}
      <section className="mb-6">
        <LalinKpiCards kpiSummary={kpiSummary} />
      </section>

      {/* Table */}
      <section>
        <LalinTable
          data={data}
          tab={filter.tab}
          sortConfig={filter.sort}
          subtotalsByRuas={subtotalsByRuas}
          grandTotal={grandTotal}
          currentPage={pagination.page}
          pageSize={pagination.pageSize}
          totalItems={pagination.totalItems}
          totalPages={pagination.totalPages}
          isLoading={loading}
          onTabChange={filter.onTabChange}
          onSortChange={filter.onSortChange}
          onPageChange={pagination.onPageChange}
          onPageSizeChange={pagination.onPageSizeChange}
        />
      </section>

      {/* Footer */}
      <footer
        className="mt-8 flex flex-col justify-between gap-2 pt-4 text-center md:flex-row"
        style={{ borderTop: `1px solid ${COLORS.border.light}` }}
      >
        <Typography
          variant="caption"
          sx={{ color: BRAND_COLORS.neutral400, fontSize: '11px', fontWeight: 500 }}
        >
          Data terakhir diperbarui: {getCurrentDateTime()} WIB
        </Typography>

        <Typography variant="caption" sx={{ color: BRAND_COLORS.neutral400 }}>
          &copy; {new Date().getFullYear()} PT Jasa Marga (Persero) Tbk. All rights reserved.
        </Typography>
      </footer>
    </div>
  )
}
