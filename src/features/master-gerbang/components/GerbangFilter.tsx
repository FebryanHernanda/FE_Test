import { TextField, InputAdornment, Paper, Typography, Button } from '@mui/material'
import { Search, Add, RestartAlt } from '@mui/icons-material'
import { COLORS, RADIUS, SHADOWS } from '@/constants/theme'
import { BRAND_COLORS } from '@/lib/colors'

interface GerbangFilterProps {
  search: string
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onReset: () => void
  onAddClick: () => void
  totalItems: number
}

export function GerbangFilter({
  search,
  onSearchChange,
  onReset,
  onAddClick,
  totalItems,
}: GerbangFilterProps) {
  return (
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
      {/* Card Header */}
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
              sx={{
                fontWeight: 600,
                color: BRAND_COLORS.neutral700,
                fontSize: '14px',
                letterSpacing: '-0.01em',
              }}
            >
              Kelola Data Gerbang
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: BRAND_COLORS.neutral500,
                fontSize: '12px',
              }}
            >
              {totalItems > 0 ? `Total ${totalItems} gerbang terdaftar` : 'Belum ada data gerbang'}
            </Typography>
          </div>

          {/* Add Button */}
          <Button
            variant="contained"
            startIcon={<Add sx={{ fontSize: 18 }} />}
            onClick={onAddClick}
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
              transition: 'all 0.15s ease',
              '&:hover': {
                backgroundColor: BRAND_COLORS.primaryDark,
                boxShadow: SHADOWS.md,
              },
            }}
          >
            Tambah Gerbang
          </Button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="p-5">
        <div className="flex flex-col items-end gap-4 sm:flex-row">
          {/* Search */}
          <div className="w-full sm:flex-1">
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
              placeholder="Cari Nama Gerbang atau Cabang..."
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
                  '& fieldset': {
                    borderColor: COLORS.border.light,
                  },
                  '&:hover fieldset': {
                    borderColor: COLORS.border.default,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: BRAND_COLORS.primary,
                    borderWidth: '1.5px',
                  },
                },
              }}
            />
          </div>

          {/* Reset Button */}
          <div className="w-full sm:w-auto">
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
          </div>
        </div>
      </div>
    </Paper>
  )
}
