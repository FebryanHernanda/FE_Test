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
  Tooltip,
  CircularProgress,
} from '@mui/material'
import {
  ChevronLeft,
  ChevronRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  ArrowUpward,
  ArrowDownward,
  Visibility,
  Edit,
  Delete,
  ErrorOutline,
} from '@mui/icons-material'
import type { MasterGerbang, SortConfig, SortField } from '@/types/masterGerbang'
import { COLORS, RADIUS, SHADOWS } from '@/constants/theme'
import { BRAND_COLORS } from '@/lib/colors'
import { MASTER_GERBANG } from '@/constants/masterGerbang'

const TABLE = MASTER_GERBANG.TABLE
const PAGINATION = MASTER_GERBANG.PAGINATION

interface GerbangTableProps {
  data: MasterGerbang[]
  sortConfig: SortConfig
  currentPage: number
  pageSize: number
  totalItems: number
  totalPages: number
  isLoading: boolean
  onSortChange: (field: SortField) => void
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  onView: (gerbang: MasterGerbang) => void
  onEdit: (gerbang: MasterGerbang) => void
  onDelete: (gerbang: MasterGerbang) => void
}

const SortIcon = ({ field, sortConfig }: { field: SortField; sortConfig: SortConfig }) => {
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

export function GerbangTable({
  data,
  sortConfig,
  currentPage,
  pageSize,
  totalItems,
  totalPages,
  isLoading,
  onSortChange,
  onPageChange,
  onPageSizeChange,
  onView,
  onEdit,
  onDelete,
}: GerbangTableProps) {
  const startItem = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0
  const endItem = Math.min(currentPage * pageSize, totalItems)

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
      {/* TABLE HEADER */}
      <div
        className="px-5 py-4"
        style={{
          backgroundColor: COLORS.bg.primary,
          borderBottom: `1px solid ${COLORS.border.light}`,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: BRAND_COLORS.neutral800, fontSize: '14px' }}
        >
          Data Gerbang Tol
        </Typography>
        <Typography variant="caption" sx={{ color: BRAND_COLORS.neutral500, fontSize: '11px' }}>
          {totalItems > 0 ? `${totalItems} ${TABLE.TOTAL_PREFIX}` : 'Tidak ada data'}
        </Typography>
      </div>

      {/* TABLE */}
      <TableContainer sx={{ maxHeight: 520 }}>
        <Table stickyHeader size="small" sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              {TABLE.COLUMNS.map((col) => (
                <TableCell
                  key={col.label}
                  align={col.align as 'left' | 'center' | 'right'}
                  onClick={col.field ? () => onSortChange(col.field as SortField) : undefined}
                  sx={{
                    backgroundColor: COLORS.bg.secondary,
                    color: BRAND_COLORS.neutral600,
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    py: 1.5,
                    px: 2,
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
                    {col.field && (
                      <SortIcon field={col.field as SortField} sortConfig={sortConfig} />
                    )}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={TABLE.COLUMNS.length} align="center" sx={{ py: 10 }}>
                  <div className="flex flex-col items-center gap-2">
                    <CircularProgress size={28} sx={{ color: BRAND_COLORS.primary }} />
                    <Typography variant="caption" sx={{ color: BRAND_COLORS.neutral500 }}>
                      Memuat data gerbang...
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={TABLE.COLUMNS.length} align="center" sx={{ py: 10 }}>
                  <div className="flex flex-col items-center gap-2">
                    <ErrorOutline sx={{ fontSize: 48, color: BRAND_COLORS.neutral300, mb: 1 }} />
                    <Typography
                      variant="subtitle2"
                      sx={{ color: BRAND_COLORS.neutral600, fontWeight: 600 }}
                    >
                      {TABLE.EMPTY_STATE.TITLE}
                    </Typography>
                    <Typography variant="caption" sx={{ color: BRAND_COLORS.neutral400 }}>
                      {TABLE.EMPTY_STATE.subtitle}
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow
                  key={`${row.id}-${row.IdCabang}-${index}`}
                  sx={{
                    height: 52,
                    backgroundColor: index % 2 === 0 ? COLORS.bg.primary : COLORS.bg.secondary,
                    '&:hover': {
                      backgroundColor: 'rgba(30, 58, 95, 0.04)',
                    },
                    transition: 'background-color 0.15s ease',
                  }}
                >
                  {/* No */}
                  <TableCell
                    align="center"
                    sx={{
                      color: BRAND_COLORS.neutral400,
                      fontSize: '12px',
                      py: 1.5,
                      px: 2,
                      borderBottom: `1px solid ${COLORS.border.light}`,
                    }}
                  >
                    {(currentPage - 1) * pageSize + index + 1}
                  </TableCell>

                  {/* Nama Gerbang */}
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 600,
                      color: BRAND_COLORS.neutral700,
                      fontSize: '13px',
                      py: 1.5,
                      px: 2,
                      borderBottom: `1px solid ${COLORS.border.light}`,
                    }}
                  >
                    {row.NamaGerbang}
                  </TableCell>

                  {/* Ruas (Nama Cabang) */}
                  <TableCell
                    align="center"
                    sx={{
                      color: BRAND_COLORS.neutral600,
                      fontSize: '12px',
                      py: 1.5,
                      px: 2,
                      borderBottom: `1px solid ${COLORS.border.light}`,
                    }}
                  >
                    {row.NamaCabang}
                  </TableCell>

                  {/* Actions */}
                  <TableCell
                    align="center"
                    sx={{
                      py: 1,
                      px: 2,
                      borderBottom: `1px solid ${COLORS.border.light}`,
                    }}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <Tooltip title="Lihat Detail" arrow>
                        <IconButton
                          size="small"
                          onClick={() => onView(row)}
                          sx={{
                            color: BRAND_COLORS.neutral500,
                            '&:hover': {
                              color: BRAND_COLORS.primary,
                              backgroundColor: 'rgba(30, 58, 95, 0.08)',
                            },
                          }}
                        >
                          <Visibility sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Edit" arrow>
                        <IconButton
                          size="small"
                          onClick={() => onEdit(row)}
                          sx={{
                            color: BRAND_COLORS.neutral500,
                            '&:hover': {
                              color: '#059669',
                              backgroundColor: 'rgba(5, 150, 105, 0.08)',
                            },
                          }}
                        >
                          <Edit sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Hapus" arrow>
                        <IconButton
                          size="small"
                          onClick={() => onDelete(row)}
                          sx={{
                            color: BRAND_COLORS.neutral500,
                            '&:hover': {
                              color: COLORS.status.error,
                              backgroundColor: 'rgba(239, 68, 68, 0.08)',
                            },
                          }}
                        >
                          <Delete sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

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
            {PAGINATION.LABEL_PER_PAGE}
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
            {PAGINATION.OPTIONS.map((opt) => (
              <MenuItem key={opt} value={opt} sx={{ fontSize: '12px' }}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <Typography variant="caption" sx={{ color: BRAND_COLORS.neutral500, fontSize: '12px' }}>
            {totalItems > 0 ? `${startItem}-${endItem} dari ${totalItems}` : '0 data'}
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
