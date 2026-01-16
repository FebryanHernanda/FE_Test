import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material'
import {
  ChevronLeft,
  ChevronRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material'
import { COLORS, RADIUS, SHADOWS } from '@/constants/theme'
import { BRAND_COLORS } from '@/lib/colors'
import { formatNumber } from '@/lib/format'
import { LalinTabs } from './LalinTabs'
import type {
  LalinTableRow as LalinRow,
  LalinTabType,
  LalinSortField,
  LalinSortConfig,
} from '@/types/lalin'
import { LALIN_TABLE_COLUMNS } from '@/constants/lalinTable'

// Types

interface LalinTableProps {
  data: LalinRow[]
  tab: LalinTabType
  sortConfig: LalinSortConfig
  subtotalsByRuas: Record<string, number>
  grandTotal: number
  currentPage: number
  pageSize: number
  totalItems: number
  totalPages: number
  isLoading: boolean
  onTabChange: (tab: LalinTabType) => void
  onSortChange: (field: LalinSortField) => void
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

// Sub-components

function PaymentMethodChip({ method }: { method: string }) {
  const styles: Record<string, { bg: string; text: string }> = {
    'E-Toll': { bg: '#dbeafe', text: '#1e40af' },
    Tunai: { bg: '#d1fae5', text: '#065f46' },
    Flo: { bg: '#ede9fe', text: '#5b21b6' },
    KTP: { bg: '#ffedd5', text: '#9a3412' },
  }
  const s = styles[method] || { bg: '#f1f5f9', text: '#475569' }

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '3px 8px',
        borderRadius: '4px',
        fontSize: '10px',
        fontWeight: 600,
        backgroundColor: s.bg,
        color: s.text,
      }}
    >
      {method}
    </span>
  )
}

function SortIcon({ field, sortConfig }: { field: LalinSortField; sortConfig: LalinSortConfig }) {
  const isActive = field === sortConfig.field

  if (isActive) {
    return sortConfig.direction === 'asc' ? (
      <ArrowUpward sx={{ fontSize: 12, color: BRAND_COLORS.primary, ml: 0.5 }} />
    ) : (
      <ArrowDownward sx={{ fontSize: 12, color: BRAND_COLORS.primary, ml: 0.5 }} />
    )
  }

  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', marginLeft: 3, opacity: 0.4 }}>
      <ArrowUpward sx={{ fontSize: 8, color: BRAND_COLORS.neutral500, mb: '-2px' }} />
      <ArrowDownward sx={{ fontSize: 8, color: BRAND_COLORS.neutral500 }} />
    </span>
  )
}

// Main component

export function LalinTable({
  data,
  tab,
  sortConfig,
  subtotalsByRuas,
  grandTotal,
  currentPage,
  pageSize,
  totalItems,
  totalPages,
  isLoading,
  onTabChange,
  onSortChange,
  onPageChange,
  onPageSizeChange,
}: LalinTableProps) {
  const startItem = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0
  const endItem = Math.min(currentPage * pageSize, totalItems)

  const columns = LALIN_TABLE_COLUMNS

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        overflow: 'hidden',
        borderRadius: RADIUS.xl,
        border: `1px solid ${COLORS.border.light}`,
        boxShadow: SHADOWS.sm,
        bgcolor: COLORS.bg.primary,
      }}
    >
      {/* HEADER WITH TABS */}
      <div
        className="px-5 py-4"
        style={{
          backgroundColor: COLORS.bg.primary,
          borderBottom: `1px solid ${COLORS.border.light}`,
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: BRAND_COLORS.neutral800, fontSize: '14px' }}
            >
              Data Transaksi Lalu Lintas
            </Typography>
            <Typography variant="caption" sx={{ color: BRAND_COLORS.neutral500, fontSize: '11px' }}>
              {totalItems > 0 ? `${formatNumber(totalItems)} data · Filter: ${tab}` : 'Tidak ada data'}
            </Typography>
          </div>
          <LalinTabs activeTab={tab} onTabChange={onTabChange} />
        </div>
      </div>

      {/* TABLE */}
      <TableContainer sx={{ maxHeight: 480 }}>
        <Table stickyHeader size="small" sx={{ minWidth: 1050 }}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.label}
                  align={col.align}
                  onClick={col.field ? () => onSortChange(col.field!) : undefined}
                  sx={{
                    backgroundColor: COLORS.bg.secondary,
                    color: BRAND_COLORS.neutral600,
                    fontSize: '10px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 1.5,
                    px: 1,
                    borderBottom: `1px solid ${COLORS.border.light}`,
                    width: col.width,
                    whiteSpace: 'nowrap',
                    cursor: col.field ? 'pointer' : 'default',
                    userSelect: 'none',
                    '&:hover': col.field ? { color: BRAND_COLORS.primary } : {},
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent:
                        col.align === 'right'
                          ? 'flex-end'
                          : col.align === 'center'
                            ? 'center'
                            : 'flex-start',
                    }}
                  >
                    {col.label}
                    {col.field && <SortIcon field={col.field} sortConfig={sortConfig} />}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={14} align="center" sx={{ py: 8 }}>
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"
                      style={{ borderColor: `${BRAND_COLORS.primary} transparent` }}
                    />
                    <Typography variant="caption" sx={{ color: BRAND_COLORS.neutral500 }}>
                      Memuat data...
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={14} align="center" sx={{ py: 8 }}>
                  <Typography variant="caption" sx={{ color: BRAND_COLORS.neutral400 }}>
                    Tidak ada data untuk kategori "{tab}"
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    height: 44,
                    backgroundColor: index % 2 === 0 ? COLORS.bg.primary : COLORS.bg.secondary,
                    '&:hover': {
                      backgroundColor: 'rgba(30, 58, 95, 0.04)',
                    },
                    transition: 'background-color 0.15s ease',
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      color: BRAND_COLORS.neutral400,
                      fontSize: '11px',
                      py: 1,
                      px: 1,
                      borderBottom: `1px solid ${COLORS.border.light}`,
                    }}
                  >
                    {(currentPage - 1) * pageSize + index + 1}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 500,
                      color: BRAND_COLORS.neutral700,
                      fontSize: '11px',
                      py: 1,
                      px: 1,
                      borderBottom: `1px solid ${COLORS.border.light}`,
                    }}
                  >
                    {row.Ruas}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: BRAND_COLORS.neutral600,
                      fontSize: '11px',
                      py: 1,
                      px: 1,
                      borderBottom: `1px solid ${COLORS.border.light}`,
                    }}
                  >
                    {row.Gerbang}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: BRAND_COLORS.neutral600,
                      fontSize: '11px',
                      py: 1,
                      px: 1,
                      borderBottom: `1px solid ${COLORS.border.light}`,
                    }}
                  >
                    {row.Gardu}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: BRAND_COLORS.neutral600,
                      fontSize: '11px',
                      py: 1,
                      px: 1,
                      borderBottom: `1px solid ${COLORS.border.light}`,
                    }}
                  >
                    {row.Shift}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: BRAND_COLORS.neutral600,
                      fontSize: '11px',
                      py: 1,
                      px: 1,
                      borderBottom: `1px solid ${COLORS.border.light}`,
                    }}
                  >
                    {row.Hari}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: BRAND_COLORS.neutral600,
                      fontSize: '11px',
                      py: 1,
                      px: 1,
                      borderBottom: `1px solid ${COLORS.border.light}`,
                    }}
                  >
                    {row.Tanggal}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ py: 1, px: 1, borderBottom: `1px solid ${COLORS.border.light}` }}
                  >
                    <PaymentMethodChip method={row.MetodePembayaran} />
                  </TableCell>
                  {[row.Gol1, row.Gol2, row.Gol3, row.Gol4, row.Gol5].map((gol, i) => (
                    <TableCell
                      key={i}
                      align="center"
                      sx={{
                        color: BRAND_COLORS.neutral600,
                        fontFamily: 'monospace',
                        fontSize: '11px',
                        py: 1,
                        px: 1,
                        borderBottom: `1px solid ${COLORS.border.light}`,
                      }}
                    >
                      {formatNumber(gol)}
                    </TableCell>
                  ))}
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 600,
                      color: BRAND_COLORS.neutral800,
                      fontFamily: 'monospace',
                      fontSize: '11px',
                      py: 1,
                      px: 1,
                      borderBottom: `1px solid ${COLORS.border.light}`,
                    }}
                  >
                    {formatNumber(row.TotalLalin)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* SUBTOTAL & TOTAL */}
      {totalItems > 0 && (
        <div
          style={{
            backgroundColor: COLORS.bg.secondary,
            borderTop: `1px solid ${COLORS.border.light}`,
            padding: '12px 20px',
          }}
        >
          <div className="mb-3 flex flex-wrap items-center gap-4">
            <Typography
              variant="caption"
              sx={{
                color: BRAND_COLORS.neutral500,
                fontSize: '10px',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              Subtotal:
            </Typography>
            {Object.entries(subtotalsByRuas).map(([ruas, total]) => (
              <div key={ruas} className="flex items-center gap-2">
                <span style={{ fontSize: '11px', color: BRAND_COLORS.neutral600 }}>{ruas}</span>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: BRAND_COLORS.neutral800,
                    fontFamily: 'monospace',
                  }}
                >
                  {formatNumber(total)}
                </span>
              </div>
            ))}
          </div>
          <div
            className="flex items-center justify-between rounded-lg px-4 py-2.5"
            style={{
              backgroundColor: COLORS.bg.primary,
              border: `1px solid ${COLORS.border.light}`,
            }}
          >
            <Typography
              sx={{
                color: BRAND_COLORS.neutral600,
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              Total ({tab})
            </Typography>
            <Typography
              sx={{
                color: BRAND_COLORS.primary,
                fontSize: '16px',
                fontWeight: 700,
                fontFamily: 'monospace',
              }}
            >
              {formatNumber(grandTotal)}
            </Typography>
          </div>
        </div>
      )}

      {/* PAGINATION */}
      <div
        className="flex flex-wrap items-center justify-center gap-4 px-5 py-3 sm:justify-between"
        style={{
          borderTop: `1px solid ${COLORS.border.light}`,
          backgroundColor: COLORS.bg.primary,
        }}
      >
        <div className="flex items-center gap-2">
          <Typography variant="caption" sx={{ color: BRAND_COLORS.neutral500, fontSize: '12px' }}>
            Tampilkan:
          </Typography>
          <Select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            size="small"
            sx={{
              fontSize: '12px',
              fontWeight: 600,
              minWidth: 65,
              height: 32,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: COLORS.border.light,
                borderRadius: RADIUS.md,
              },
              '& .MuiSelect-select': { py: 0.75, px: 1.5 },
            }}
          >
            {[10, 25, 50, 100].map((opt) => (
              <MenuItem key={opt} value={opt} sx={{ fontSize: '12px' }}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <Typography variant="caption" sx={{ color: BRAND_COLORS.neutral500, fontSize: '12px' }}>
            {totalItems > 0 ? `${startItem}-${endItem} dari ${formatNumber(totalItems)}` : '0 data'}
          </Typography>
          <div className="flex items-center">
            <IconButton
              size="small"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              sx={{
                width: 28,
                height: 28,
                color: currentPage === 1 ? BRAND_COLORS.neutral300 : BRAND_COLORS.neutral600,
              }}
            >
              <KeyboardDoubleArrowLeft sx={{ fontSize: 18 }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              sx={{
                width: 28,
                height: 28,
                color: currentPage === 1 ? BRAND_COLORS.neutral300 : BRAND_COLORS.neutral600,
              }}
            >
              <ChevronLeft sx={{ fontSize: 18 }} />
            </IconButton>
            <Typography
              variant="caption"
              sx={{
                color: BRAND_COLORS.neutral700,
                fontSize: '12px',
                fontWeight: 600,
                mx: 1.5,
                minWidth: 60,
                textAlign: 'center',
              }}
            >
              {currentPage} / {totalPages}
            </Typography>
            <IconButton
              size="small"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              sx={{
                width: 28,
                height: 28,
                color:
                  currentPage >= totalPages ? BRAND_COLORS.neutral300 : BRAND_COLORS.neutral600,
              }}
            >
              <ChevronRight sx={{ fontSize: 18 }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage >= totalPages}
              sx={{
                width: 28,
                height: 28,
                color:
                  currentPage >= totalPages ? BRAND_COLORS.neutral300 : BRAND_COLORS.neutral600,
              }}
            >
              <KeyboardDoubleArrowRight sx={{ fontSize: 18 }} />
            </IconButton>
          </div>
        </div>
      </div>
    </Paper>
  )
}
