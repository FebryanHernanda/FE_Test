import { Typography, Button } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { RestartAlt } from '@mui/icons-material'
import { Dayjs } from 'dayjs'
import { BRAND_COLORS } from '@/lib/colors'
import { COLORS, RADIUS, SHADOWS } from '@/constants/theme'

interface DashboardFilterProps {
  selectedDate: Dayjs | null
  onDateChange: (date: Dayjs | null) => void
  onReset: () => void
}

export function DashboardFilter({ selectedDate, onDateChange, onReset }: DashboardFilterProps) {
  return (
    <div
      style={{
        borderRadius: RADIUS.xl,
        backgroundColor: COLORS.bg.primary,
        border: `1px solid ${COLORS.border.light}`,
        boxShadow: SHADOWS.sm,
        overflow: 'hidden',
      }}
    >
      <div
        className="px-5 py-4"
        style={{
          backgroundColor: COLORS.bg.primary,
          borderBottom: `1px solid ${COLORS.border.light}`,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: BRAND_COLORS.neutral700, fontSize: '14px' }}
        >
          Filter Dashboard
        </Typography>
        <Typography variant="caption" sx={{ color: BRAND_COLORS.neutral500, fontSize: '12px' }}>
          Pilih tanggal untuk melihat data operasional
        </Typography>
      </div>

      <div className="p-5">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="w-full sm:w-52">
            <Typography
              variant="caption"
              className="block mb-1.5"
              sx={{ color: BRAND_COLORS.neutral600, fontWeight: 500, fontSize: '12px' }}
            >
              Filter Tanggal
            </Typography>
            <DatePicker
              value={selectedDate}
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
    </div>
  )
}
