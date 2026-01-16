import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material'
import { Warning, ErrorOutline, HelpOutline, CheckCircleOutline } from '@mui/icons-material'
import { COLORS, RADIUS, SHADOWS } from '@/constants/theme'
import { BRAND_COLORS } from '@/lib/colors'

type DialogVariant = 'danger' | 'warning' | 'info' | 'success'

interface ConfirmationDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string | React.ReactNode
  confirmText?: string
  cancelText?: string
  variant?: DialogVariant
  isLoading?: boolean
}

const VARIANT_CONFIG: Record<
  DialogVariant,
  {
    icon: typeof Warning
    iconBg: string
    iconColor: string
    confirmBg: string
    confirmHover: string
  }
> = {
  danger: {
    icon: ErrorOutline,
    iconBg: COLORS.status.errorBg,
    iconColor: COLORS.status.error,
    confirmBg: COLORS.status.error,
    confirmHover: '#dc2626',
  },
  warning: {
    icon: Warning,
    iconBg: COLORS.status.warningBg,
    iconColor: COLORS.status.warning,
    confirmBg: COLORS.status.warning,
    confirmHover: '#d97706',
  },
  info: {
    icon: HelpOutline,
    iconBg: '#eff6ff',
    iconColor: BRAND_COLORS.primary,
    confirmBg: BRAND_COLORS.primary,
    confirmHover: BRAND_COLORS.primaryDark,
  },
  success: {
    icon: CheckCircleOutline,
    iconBg: COLORS.status.successBg,
    iconColor: COLORS.status.success,
    confirmBg: COLORS.status.success,
    confirmHover: '#16a34a',
  },
}

export default function ConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Konfirmasi',
  cancelText = 'Batal',
  variant = 'danger',
  isLoading = false,
}: ConfirmationDialogProps) {
  const config = VARIANT_CONFIG[variant]
  const IconComponent = config.icon

  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <Dialog
      open={open}
      onClose={isLoading ? undefined : onClose}
      aria-labelledby="confirmation-dialog-title"
      PaperProps={{
        sx: {
          borderRadius: RADIUS.xl,
          boxShadow: SHADOWS.xl,
          minWidth: { xs: '90%', sm: 420 },
          maxWidth: 480,
          overflow: 'hidden',
        },
      }}
    >
      {/* Header */}
      <div className="flex flex-col items-center px-6 pb-2 pt-8 text-center">
        <div
          className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: config.iconBg }}
        >
          <IconComponent sx={{ fontSize: 32, color: config.iconColor }} />
        </div>

        <DialogTitle
          id="confirmation-dialog-title"
          sx={{
            p: 0,
            mb: 1,
            fontWeight: 700,
            color: BRAND_COLORS.neutral800,
            fontSize: '18px',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </DialogTitle>

        <DialogContent sx={{ px: 0, pb: 2 }}>
          <DialogContentText
            sx={{
              color: BRAND_COLORS.neutral600,
              fontSize: '14px',
              lineHeight: 1.6,
              textAlign: 'center',
            }}
          >
            {message}
          </DialogContentText>
        </DialogContent>
      </div>

      {/* Actions */}
      <DialogActions
        sx={{
          px: 4,
          pb: 4,
          pt: 0,
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Button
          onClick={onClose}
          disabled={isLoading}
          variant="outlined"
          sx={{
            borderRadius: RADIUS.lg,
            px: 4,
            py: 1.25,
            minWidth: 120,
            borderColor: COLORS.border.default,
            color: BRAND_COLORS.neutral600,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '14px',
            transition: 'all 0.15s ease',
            '&:hover': {
              borderColor: BRAND_COLORS.neutral500,
              backgroundColor: COLORS.bg.tertiary,
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={isLoading}
          variant="contained"
          sx={{
            borderRadius: RADIUS.lg,
            px: 4,
            py: 1.25,
            minWidth: 120,
            backgroundColor: config.confirmBg,
            color: '#fff',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '14px',
            boxShadow: 'none',
            transition: 'all 0.15s ease',
            '&:hover': {
              backgroundColor: config.confirmHover,
              boxShadow: SHADOWS.sm,
            },
            '&:disabled': {
              backgroundColor: BRAND_COLORS.neutral300,
              color: '#fff',
            },
          }}
        >
          {isLoading ? 'Memproses...' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
