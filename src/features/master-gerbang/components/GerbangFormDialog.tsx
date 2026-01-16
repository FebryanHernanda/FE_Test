import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  IconButton,
  Alert,
} from '@mui/material'
import { Close, Add, Edit } from '@mui/icons-material'
import { COLORS } from '@/constants/theme'
import { BRAND_COLORS } from '@/lib/colors'
import { MASTER_GERBANG } from '@/constants/masterGerbang'
import { formatErrorMessage } from '@/lib/formatErrorMessage'
import type { MasterGerbang, GerbangFormData } from '@/types/masterGerbang'
import { gerbangFormSchema } from '../domain/gerbang.schema'

interface GerbangFormDialogProps {
  open: boolean
  mode: 'create' | 'edit'
  initialData?: MasterGerbang | null
  isLoading: boolean
  error?: Error | null
  onClose: () => void
  onSubmit: (data: GerbangFormData) => Promise<void>
}

export function GerbangFormDialog({
  open,
  mode,
  initialData,
  isLoading,
  error,
  onClose,
  onSubmit,
}: GerbangFormDialogProps) {
  const isEdit = mode === 'edit'
  const TEXT = isEdit ? MASTER_GERBANG.DIALOG.EDIT : MASTER_GERBANG.DIALOG.CREATE

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GerbangFormData>({
    resolver: zodResolver(gerbangFormSchema),
  })

  useEffect(() => {
    if (open) {
      if (isEdit && initialData) {
        reset({ ...initialData })
      } else {
        reset({
          id: undefined,
          IdCabang: undefined,
          NamaCabang: '',
          NamaGerbang: '',
        })
      }
    }
  }, [open, isEdit, initialData, reset])

  const handleFormSubmit = async (data: GerbangFormData) => {
    await onSubmit(data)
  }

  return (
    <Dialog
      open={open}
      onClose={isLoading ? undefined : onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          maxWidth: '540px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* HEADER */}
        <DialogTitle sx={{ px: 3, pt: 3.5, pb: 2 }}>
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
              {isEdit ? <Edit fontSize="small" /> : <Add fontSize="small" />}
            </div>
            <div className="flex flex-col gap-1">
              <Typography
                variant="h6"
                fontWeight={700}
                fontSize={20}
                color={BRAND_COLORS.neutral800}
                sx={{ lineHeight: 1.2 }}
              >
                {TEXT.TITLE}
              </Typography>
              <Typography variant="body2" color={BRAND_COLORS.neutral500} fontSize={14}>
                {TEXT.SUBTITLE ||
                  (isEdit ? 'Perbarui informasi gerbang' : 'Input data gerbang baru')}
              </Typography>
            </div>
          </div>
          <IconButton
            onClick={onClose}
            disabled={isLoading}
            size="small"
            sx={{ position: 'absolute', right: 20, top: 20, color: BRAND_COLORS.neutral400 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ px: 3, py: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }}>
              {formatErrorMessage(error)}
            </Alert>
          )}

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
                <div className="col-span-12 sm:col-span-4">
                  <Controller
                    name="IdCabang"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ''}
                        label="ID Cabang"
                        type="number"
                        fullWidth
                        size="small"
                        disabled={isLoading || isEdit}
                        error={!!errors.IdCabang}
                        helperText={errors.IdCabang?.message}
                        InputProps={{
                          sx: {
                            bgcolor: isLoading || isEdit ? COLORS.bg.tertiary : 'white',
                            color: isLoading || isEdit ? BRAND_COLORS.neutral600 : 'inherit',
                          },
                        }}
                        onChange={(e) => {
                          const val = e.target.value
                          field.onChange(val === '' ? undefined : Number(val))
                        }}
                      />
                    )}
                  />
                </div>
                <div className="col-span-12 sm:col-span-8">
                  <Controller
                    name="NamaCabang"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ''}
                        label="Nama Cabang"
                        fullWidth
                        size="small"
                        disabled={isLoading}
                        error={!!errors.NamaCabang}
                        helperText={errors.NamaCabang?.message}
                        placeholder="Contoh: Jagorawi"
                        InputProps={{ sx: { bgcolor: 'white' } }}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            {/* DIVIDER HALUS */}
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
                <div className="col-span-12 sm:col-span-4">
                  <Controller
                    name="id"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ''}
                        label="ID Gerbang"
                        type="number"
                        fullWidth
                        size="small"
                        disabled={isEdit}
                        error={!!errors.id}
                        helperText={errors.id?.message}
                        InputProps={{
                          sx: {
                            bgcolor: isEdit ? COLORS.bg.tertiary : 'white',
                            color: isEdit ? BRAND_COLORS.neutral500 : 'inherit',
                          },
                        }}
                        onChange={(e) => {
                          const val = e.target.value
                          field.onChange(val === '' ? undefined : Number(val))
                        }}
                      />
                    )}
                  />
                </div>
                <div className="col-span-12 sm:col-span-8">
                  <Controller
                    name="NamaGerbang"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ''}
                        label="Nama Gerbang"
                        fullWidth
                        size="small"
                        disabled={isLoading}
                        error={!!errors.NamaGerbang}
                        helperText={errors.NamaGerbang?.message}
                        placeholder="Contoh: Ciawi"
                        InputProps={{ sx: { bgcolor: 'white' } }}
                      />
                    )}
                  />
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
            disabled={isLoading}
            variant="outlined"
            size="medium"
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              color: BRAND_COLORS.neutral600,
              borderColor: COLORS.border.default,
              px: 3,
            }}
          >
            Batal
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            size="medium"
            sx={{
              borderRadius: '8px',
              backgroundColor: BRAND_COLORS.primary,
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: BRAND_COLORS.primaryLight,
                boxShadow: 'none',
              },
            }}
          >
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
