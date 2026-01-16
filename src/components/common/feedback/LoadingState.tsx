import { CircularProgress, Typography } from '@mui/material'
import { BRAND_COLORS } from '@/lib/colors'

interface LoadingStateProps {
  message?: string
  size?: number
  fullScreen?: boolean
}

export function LoadingState({
  message = 'Memuat data...',
  size = 36,
  fullScreen = true,
}: LoadingStateProps) {
  const containerClass = fullScreen
    ? 'flex items-center justify-center min-h-[60vh]'
    : 'flex items-center justify-center py-12'

  return (
    <div className={containerClass}>
      <div className="text-center">
        <CircularProgress size={size} sx={{ color: BRAND_COLORS.primary }} />
        <Typography variant="body2" sx={{ mt: 2, color: BRAND_COLORS.neutral500, fontWeight: 500 }}>
          {message}
        </Typography>
      </div>
    </div>
  )
}

export default LoadingState
