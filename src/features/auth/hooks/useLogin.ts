import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { loginSchema, type LoginFormData } from '../domain/login.schema'
import { login } from '@/services/auth.service'
import { formatErrorMessage } from '@/lib/formatErrorMessage'
import { ROUTES } from '@/constants/routes'

export const useLogin = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const handleLogin = async (data: LoginFormData) => {
    try {
      await login(data)
      navigate(ROUTES.DASHBOARD)
    } catch (error) {
      const message = formatErrorMessage(error)
      form.setError('root', { message })
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return {
    form,
    showPassword,
    togglePasswordVisibility,
    handleLogin: form.handleSubmit(handleLogin),
    isSubmitting: form.formState.isSubmitting,
  }
}
