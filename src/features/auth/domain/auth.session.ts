import { ROUTES } from '@/constants/routes'
import { clearToken } from '@/lib/storage'

export function logout(): void {
  clearToken()
  window.location.href = ROUTES.LOGIN
}
