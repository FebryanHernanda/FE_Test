import { Typography } from '@mui/material'
import { BRAND_COLORS } from '@/lib/colors'
import Illustration from '@/assets/images/login-illustration.jpg'
import Logo from '@/assets/logo/Logo.png'
import { useLogin } from './hooks/useLogin'
import { LoginForm } from './components/LoginForm'

export default function LoginPage() {
  const {
    form,
    showPassword,
    togglePasswordVisibility,
    handleLogin,
    isSubmitting,
  } = useLogin()

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Left Column: Form Section */}
      <div className="flex w-full flex-col px-6 py-8 lg:w-1/2 lg:px-16 xl:px-24">
        {/* Main Content Area */}
        <div className="flex flex-1 flex-col justify-center">
          <div className="mx-auto w-full max-w-md">
            {/* Logo */}
            <div className="mb-2 flex justify-center ">
              <img
                src={Logo}
                alt="Jasa Marga Logo"
                className="h-15 w-auto object-contain "
              />
            </div>

            {/* Header */}
            <div className="mb-8 text-center">
              <Typography
                variant="h5"
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: BRAND_COLORS.primary,
                  mb: 1,
                  letterSpacing: '-0.02em',
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                }}
              >
                Masuk ke Sistem
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: BRAND_COLORS.neutral500, fontWeight: 500 }}
              >
                Sistem Monitoring Lalu Lintas & Transaksi Tol
              </Typography>
            </div>

            {/* Login Form Component */}
            <LoginForm
              form={form}
              onSubmit={handleLogin}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="w-full pt-6 text-center">
          <Typography variant="caption" sx={{ color: BRAND_COLORS.neutral400 }}>
            &copy; {new Date().getFullYear()} PT Jasa Marga (Persero) Tbk. All
            rights reserved.
          </Typography>
        </div>
      </div>

      {/* Right Column: Illustration */}
      <div className="hidden lg:relative lg:block lg:w-1/2 bg-slate-900">
        <img
          src={Illustration}
          alt="Jasa Marga Toll Illustration"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>
    </div>
  )
}
