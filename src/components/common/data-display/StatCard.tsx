import React from 'react'
import { Paper, Typography, Tooltip } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import { BRAND_COLORS } from '@/lib/colors'
import { COLORS, RADIUS, SHADOWS } from '@/constants/theme'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: React.ReactNode
  insight?: string
  trend?: {
    direction: 'up' | 'down' | 'neutral'
    value: string
  }
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, insight, trend }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: RADIUS.xl,
        backgroundColor: COLORS.bg.primary,
        border: `1px solid ${COLORS.border.light}`,
        boxShadow: SHADOWS.sm,
        height: '100%',
        minHeight: { xs: 140, sm: 'auto' },
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out',
        '&:hover': {
          borderColor: COLORS.border.default,
          boxShadow: SHADOWS.md,
        },
      }}
    >
      {/* Header  */}
      <div className="mb-4 flex items-center justify-between" style={{ minHeight: 20 }}>
        <Typography
          variant="overline"
          component="h3"
          sx={{
            color: BRAND_COLORS.neutral600,
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.5px',
            lineHeight: 1.4,
            textTransform: 'uppercase',
          }}
        >
          {title}
        </Typography>
        {insight && (
          <Tooltip
            title={insight}
            placement="top"
            arrow
            slotProps={{
              tooltip: {
                sx: {
                  backgroundColor: BRAND_COLORS.neutral800,
                  borderRadius: RADIUS.md,
                  padding: '10px 14px',
                  fontSize: '12px',
                  maxWidth: 240,
                  lineHeight: 1.5,
                },
              },
            }}
          >
            <InfoOutlinedIcon
              sx={{
                fontSize: 16,
                color: BRAND_COLORS.neutral400,
                cursor: 'help',
                flexShrink: 0,
                '&:hover': { color: BRAND_COLORS.neutral500 },
              }}
            />
          </Tooltip>
        )}
      </div>

      {/* Value  */}
      <div className="flex grow items-baseline gap-2">
        <Typography
          variant="h4"
          sx={{
            color: BRAND_COLORS.primary,
            fontWeight: 700,
            fontSize: { xs: '24px', sm: '28px' },
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}
        >
          {value}
        </Typography>
        {trend && (
          <span
            className={`flex items-center gap-0.5 text-xs font-semibold ${
              trend.direction === 'up'
                ? 'text-emerald-600'
                : trend.direction === 'down'
                  ? 'text-rose-500'
                  : 'text-slate-400'
            }`}
          >
            {trend.direction === 'up' && <TrendingUpIcon sx={{ fontSize: 14 }} />}
            {trend.direction === 'down' && <TrendingDownIcon sx={{ fontSize: 14 }} />}
            {trend.value}
          </span>
        )}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <Typography
          variant="caption"
          component="div"
          sx={{
            color: BRAND_COLORS.neutral500,
            fontSize: '12px',
            fontWeight: 500,
            mt: 1.5,
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Paper>
  )
}

export default StatCard
