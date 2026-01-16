import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material'
import ConstructionIcon from '@mui/icons-material/Construction'

interface FeatureUnavailableProps {
  open: boolean
  onClose: () => void
}

export default function FeatureUnavailableDialog({ open, onClose }: FeatureUnavailableProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="feature-unavailable-title"
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.1)',
          minWidth: 400,
        },
      }}
    >
      <div className="flex flex-col items-center px-6 pb-2 pt-8 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-orange-500">
          <ConstructionIcon fontSize="large" />
        </div>

        <DialogTitle
          id="feature-unavailable-title"
          sx={{
            p: 0,
            mb: 1,
            fontWeight: 700,
            color: '#1f2937',
          }}
        >
          Fitur Dalam Pengembangan
        </DialogTitle>

        <DialogContent sx={{ px: 0, pb: 2 }}>
          <DialogContentText sx={{ color: '#6b7280', fontSize: '0.95rem' }}>
            Fitur ini masih dalam pengembangan dan belum tersedia saat ini.
          </DialogContentText>
        </DialogContent>
      </div>

      <DialogActions sx={{ px: 3, pb: 4, justifyContent: 'center' }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1,
            backgroundColor: '#1e3a5f',
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#152c4a',
              boxShadow: 'none',
            },
          }}
        >
          Mengerti
        </Button>
      </DialogActions>
    </Dialog>
  )
}
