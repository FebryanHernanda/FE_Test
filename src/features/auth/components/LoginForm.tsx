import {
  Button,
  TextField,
  CircularProgress,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Controller, type UseFormReturn } from 'react-hook-form'
import type { LoginFormData } from '../domain/login.schema'
import { RADIUS } from '@/constants/theme'
import { BRAND_COLORS } from '@/lib/colors'

interface LoginFormProps {
  form: UseFormReturn<LoginFormData>
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  showPassword: boolean
  togglePasswordVisibility: () => void
  isSubmitting: boolean
}

export function LoginForm({
  form,
  onSubmit,
  showPassword,
  togglePasswordVisibility,
  isSubmitting,
}: LoginFormProps) {
  const {
    control,
    formState: { errors },
  } = form

  return (
    <>
      {/* Global Error Alert */}
      {errors.root && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: RADIUS.lg }}>
          {errors.root.message}
        </Alert>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        {/* Username */}
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Username"
              variant="outlined"
              fullWidth
              error={!!errors.username}
              helperText={errors.username?.message}
              disabled={isSubmitting}
              slotProps={{
                input: {
                  sx: { borderRadius: RADIUS.lg },
                },
              }}
            />
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={isSubmitting}
              slotProps={{
                input: {
                  sx: { borderRadius: RADIUS.lg },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                        edge="end"
                        disabled={isSubmitting}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={isSubmitting}
          sx={{
            mt: 2,
            py: 1.5,
            minHeight: 48,
            borderRadius: RADIUS.lg,
            backgroundColor: BRAND_COLORS.primary,
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: BRAND_COLORS.primaryDark,
              boxShadow: 'none',
            },
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Masuk'
          )}
        </Button>
      </form>
    </>
  )
}
