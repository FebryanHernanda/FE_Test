import { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import {
  TextField,
  Button,
  InputAdornment,
  Paper,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import type { Dayjs } from 'dayjs'
import {
  Search,
  RestartAlt,
  Download,
  PictureAsPdf,
  TableChart,
  KeyboardArrowDown,
} from '@mui/icons-material'
import { COLORS, RADIUS, SHADOWS } from '@/constants/theme'
import { BRAND_COLORS } from '@/lib/colors'
import FeatureUnavailableDialog from '@/components/common/feedback/FeatureUnavailableDialog'

interface LalinFilterProps {
  date: Dayjs | null
  search: string
  onDateChange: (date: Dayjs | null) => void
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onReset: () => void
}

export function LalinFilter({
  date,
  search,
  onDateChange,
  onSearchChange,
  onReset,
}: LalinFilterProps) {
  const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const isExportOpen = Boolean(exportAnchorEl)

  const handleExportClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setExportAnchorEl(event.currentTarget)
  }

  const handleExportClose = () => {
    setExportAnchorEl(null)
  }

  const handleExportOption = () => {
    handleExportClose()
    setIsDialogOpen(true)
  }

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          borderRadius: RADIUS.xl,
          backgroundColor: COLORS.bg.primary,
          border: `1px solid ${COLORS.border.light}`,
          boxShadow: SHADOWS.sm,
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          className="px-5 py-4"
          style={{
            backgroundColor: COLORS.bg.primary,
            borderBottom: `1px solid ${COLORS.border.light}`,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: BRAND_COLORS.neutral700,
              fontSize: '14px',
              letterSpacing: '-0.01em',
            }}
          >
            Filter Laporan
          </Typography>
          <Typography variant="caption" sx={{ color: BRAND_COLORS.neutral500, fontSize: '12px' }}>
            Pilih tanggal dan filter data yang ingin ditampilkan
          </Typography>
        </div>

        {/* Controls */}
        <div className="p-5">
          <div className="flex flex-col items-end gap-4 lg:flex-row">
            {/* Date Picker */}
            <div className="lg:w-50 w-full">
              <Typography
                variant="caption"
                className="mb-1.5 block"
                sx={{
                  color: BRAND_COLORS.neutral600,
                  fontWeight: 500,
                  fontSize: '12px',
                }}
              >
                Tanggal Laporan
              </Typography>
              <DatePicker
                value={date}
                onChange={onDateChange}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true,
                    placeholder: 'Pilih tanggal',
                    sx: {
                      '& .MuiOutlinedInput-root': {
                        borderRadius: RADIUS.lg,
                        height: '40px',
                        backgroundColor: COLORS.bg.primary,
                        fontSize: '13px',
                        fontWeight: 500,
                        '& fieldset': { borderColor: COLORS.border.light },
                        '&:hover fieldset': { borderColor: COLORS.border.default },
                        '&.Mui-focused fieldset': {
                          borderColor: BRAND_COLORS.primary,
                          borderWidth: '1.5px',
                        },
                      },
                    },
                  },
                }}
              />
            </div>

            {/* Search */}
            <div className="w-full lg:flex-1">
              <Typography
                variant="caption"
                className="mb-1.5 block"
                sx={{
                  color: BRAND_COLORS.neutral600,
                  fontWeight: 500,
                  fontSize: '12px',
                }}
              >
                Pencarian
              </Typography>
              <TextField
                placeholder="Cari Gerbang atau Ruas..."
                value={search}
                onChange={onSearchChange}
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: BRAND_COLORS.neutral400, fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: RADIUS.lg,
                    height: '40px',
                    backgroundColor: COLORS.bg.primary,
                    fontSize: '13px',
                    '& fieldset': { borderColor: COLORS.border.light },
                    '&:hover fieldset': { borderColor: COLORS.border.default },
                    '&.Mui-focused fieldset': {
                      borderColor: BRAND_COLORS.primary,
                      borderWidth: '1.5px',
                    },
                  },
                }}
              />
            </div>

            {/* Actions */}
            <div className="flex w-full justify-end gap-3 lg:w-auto">
              <Button
                variant="outlined"
                startIcon={<RestartAlt sx={{ fontSize: 18 }} />}
                onClick={onReset}
                sx={{
                  height: '40px',
                  px: 2.5,
                  textTransform: 'none',
                  borderColor: COLORS.border.default,
                  color: BRAND_COLORS.neutral600,
                  borderRadius: RADIUS.lg,
                  fontWeight: 600,
                  fontSize: '13px',
                  backgroundColor: COLORS.bg.primary,
                  minWidth: 100,
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    borderColor: BRAND_COLORS.neutral500,
                    backgroundColor: COLORS.bg.tertiary,
                  },
                }}
              >
                Reset
              </Button>

              <Button
                variant="contained"
                startIcon={<Download sx={{ fontSize: 18 }} />}
                endIcon={<KeyboardArrowDown sx={{ fontSize: 18 }} />}
                onClick={handleExportClick}
                sx={{
                  height: '40px',
                  px: 2.5,
                  textTransform: 'none',
                  backgroundColor: BRAND_COLORS.primary,
                  color: '#fff',
                  borderRadius: RADIUS.lg,
                  fontWeight: 600,
                  fontSize: '13px',
                  boxShadow: SHADOWS.sm,
                  minWidth: 140,
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    backgroundColor: BRAND_COLORS.primaryDark,
                    boxShadow: SHADOWS.md,
                  },
                }}
              >
                Export Data
              </Button>

              <Menu
                anchorEl={exportAnchorEl}
                open={isExportOpen}
                onClose={handleExportClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                  sx: {
                    mt: 1,
                    borderRadius: RADIUS.lg,
                    boxShadow: SHADOWS.lg,
                    border: `1px solid ${COLORS.border.light}`,
                    minWidth: 180,
                  },
                }}
              >
                <MenuItem
                  onClick={handleExportOption}
                  sx={{ py: 1.5, px: 2, '&:hover': { backgroundColor: COLORS.bg.tertiary } }}
                >
                  <ListItemIcon>
                    <PictureAsPdf sx={{ color: '#dc2626', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Export ke PDF"
                    primaryTypographyProps={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: BRAND_COLORS.neutral700,
                    }}
                  />
                </MenuItem>
                <MenuItem
                  onClick={handleExportOption}
                  sx={{ py: 1.5, px: 2, '&:hover': { backgroundColor: COLORS.bg.tertiary } }}
                >
                  <ListItemIcon>
                    <TableChart sx={{ color: '#059669', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Export ke Excel"
                    primaryTypographyProps={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: BRAND_COLORS.neutral700,
                    }}
                  />
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </Paper>

      <FeatureUnavailableDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </>
  )
}
