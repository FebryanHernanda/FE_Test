import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from '@mui/material'
import { Close, LocationOn } from '@mui/icons-material'
import { COLORS } from '@/constants/theme'
import { BRAND_COLORS } from '@/lib/colors'
import type { MasterGerbang } from '@/types/masterGerbang'

interface GerbangViewDialogProps {
  open: boolean
  onClose: () => void
  data: MasterGerbang | null
}

export function GerbangViewDialog({ open, onClose, data }: GerbangViewDialogProps) {
  if (!data) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '16px',
          maxWidth: '540px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      {/* HEADER */}
      <DialogTitle sx={{ px: 3, pt: 3.5, pb: 2 }}>
        <div className="flex items-start gap-4">
          <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
            <LocationOn fontSize="small" />
          </div>
          <div className="flex flex-col gap-1">
            <Typography
              variant="h6"
              fontWeight={700}
              fontSize={20}
              color={BRAND_COLORS.neutral800}
              sx={{ lineHeight: 1.2 }}
            >
              Detail Gerbang
            </Typography>
            <Typography variant="body2" color={BRAND_COLORS.neutral500} fontSize={14}>
              Informasi lengkap data gerbang tol
            </Typography>
          </div>
        </div>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ position: 'absolute', right: 20, top: 20, color: BRAND_COLORS.neutral400 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 3 }}>
        <div className="space-y-6">
          {/* SECTION 1: INFORMASI CABANG */}
          <div>
            <Typography
              variant="caption"
              fontWeight={700}
              color={BRAND_COLORS.neutral500}
              sx={{ display: 'block', mb: 2, letterSpacing: '0.5px' }}
            >
              INFORMASI CABANG
            </Typography>
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-4">
                <Typography
                  variant="caption"
                  color={BRAND_COLORS.neutral500}
                  display="block"
                  mb={0.5}
                >
                  ID CABANG
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color={BRAND_COLORS.neutral900}
                  fontSize={15}
                >
                  {data.IdCabang}
                </Typography>
              </div>
              <div className="col-span-8">
                <Typography
                  variant="caption"
                  color={BRAND_COLORS.neutral500}
                  display="block"
                  mb={0.5}
                >
                  NAMA CABANG
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color={BRAND_COLORS.neutral900}
                  fontSize={15}
                >
                  {data.NamaCabang}
                </Typography>
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-slate-100" />

          {/* SECTION 2: INFORMASI GERBANG */}
          <div>
            <Typography
              variant="caption"
              fontWeight={700}
              color={BRAND_COLORS.neutral500}
              sx={{ display: 'block', mb: 2, letterSpacing: '0.5px' }}
            >
              INFORMASI GERBANG
            </Typography>
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-4">
                <Typography
                  variant="caption"
                  color={BRAND_COLORS.neutral500}
                  display="block"
                  mb={0.5}
                >
                  ID GERBANG
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color={BRAND_COLORS.neutral900}
                  fontSize={15}
                >
                  {data.id}
                </Typography>
              </div>
              <div className="col-span-8">
                <Typography
                  variant="caption"
                  color={BRAND_COLORS.neutral500}
                  display="block"
                  mb={0.5}
                >
                  NAMA GERBANG
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color={BRAND_COLORS.neutral900}
                  fontSize={15}
                >
                  {data.NamaGerbang}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>

      {/* FOOTER */}
      <DialogActions
        sx={{
          p: 3,
          pt: 2,
          backgroundColor: COLORS.bg.secondary,
          borderTop: `1px solid ${COLORS.border.light}`,
          justifyContent: 'flex-end',
        }}
      >
        <Button
          onClick={onClose}
          variant="contained"
          size="medium"
          sx={{
            borderRadius: '8px',
            backgroundColor: BRAND_COLORS.primary,
            textTransform: 'none',
            fontWeight: 600,
            px: 4,
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: BRAND_COLORS.primaryLight,
              boxShadow: 'none',
            },
          }}
        >
          Tutup
        </Button>
      </DialogActions>
    </Dialog>
  )
}
