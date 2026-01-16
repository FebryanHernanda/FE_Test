import React from 'react'
import { Paper, Typography, Tooltip } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { BRAND_COLORS } from '@/lib/colors'
import { COLORS, RADIUS, SHADOWS } from '@/constants/theme'

interface ChartContainerProps {
  title: string
  insight?: string
  children: React.ReactNode
  height?: number | string
  minHeight?: number | string
  className?: string
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  insight,
  children,
  height = 320,
  minHeight,
  className = '',
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: RADIUS.xl,
        backgroundColor: COLORS.bg.primary,
        border: `1px solid ${COLORS.border.light}`,
        boxShadow: SHADOWS.sm,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: minHeight,
        transition: 'box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out',
        '&:hover': {
          borderColor: COLORS.border.default,
          boxShadow: SHADOWS.md,
        },
      }}
      className={className}
    >
      {/* Header  */}
      <div className="flex items-center justify-between px-5 pb-3 pt-5" style={{ minHeight: 48 }}>
        <Typography
          variant="subtitle2"
          component="h3"
          sx={{
            color: BRAND_COLORS.neutral700,
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: 1.4,
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
                  maxWidth: 260,
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

      {/* Chart Area - Flexible height to fill valid space */}
      <div
        className="flex w-full flex-1 flex-col justify-center px-5 pb-5"
        style={{ minHeight: typeof height === 'number' ? `${height}px` : height }}
      >
        {children}
      </div>
    </Paper>
  )
}

export default ChartContainer
