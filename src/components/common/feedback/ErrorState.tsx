import { Alert, Button } from '@mui/material'
import { RADIUS } from '@/constants/theme'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  message = 'Terjadi kesalahan. Silakan coba lagi.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="mb-6">
      <Alert
        severity="error"
        onClose={onRetry}
        sx={{
          borderRadius: RADIUS.lg,
          '& .MuiAlert-message': { fontWeight: 500 },
        }}
        action={
          onRetry && (
            <Button color="inherit" size="small" onClick={onRetry}>
              Coba Lagi
            </Button>
          )
        }
      >
        {message}
      </Alert>
    </div>
  )
}

export default ErrorState
